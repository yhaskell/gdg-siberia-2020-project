import knex from "knex";
import * as fs from "fs";

import { POSTGRES_URI } from "./constants";

function readdirAsync(path: fs.PathLike, options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | undefined | null): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (error, files) => {
      if (!!error) reject(error);
      else resolve(files);
    });
  });
}

interface Migration {
  name: string;
  value: {
    up(k: knex): Promise<void>;
    down(k: knex): Promise<void>;
  }
}

class MigrationSource {
  async getMigrations(loadExtensions: readonly string[]) {
    const result = [];

    const files = await readdirAsync("./migrations");

    for (let file of files) {
      if (!file.match(/\.[jt]s$/)) continue;

      result.push({
        name: file.replace(/\.[jt]s$/, ""),
        value: await import(`${__dirname}/../migrations/${file}`),
      });
    }

    return result;
  }

  getMigrationName(migration: Migration) {
    return migration.name;
  }

  getMigration(migration: Migration) {
    return migration.value;
  }
}

export async function connect(): Promise<knex<any, unknown[]>> {
  try {
    const connection = knex({
      client: "pg",
      version: "12.1",
      connection: POSTGRES_URI,
      migrations: {
        tableName: "__knex_migrations",
      },
    });

    await connection.raw("select 1");

    return connection;
  } catch (err) {
    console.error("Cannot initialize DB Connection:", err.message);
    throw err;
  }
}

export default async function initializeDatabase() {
  const connection = await connect();
  await connection.migrate.latest({ migrationSource: new MigrationSource() });
  console.info("Successfully migrated database");
  
  return connection;
}
