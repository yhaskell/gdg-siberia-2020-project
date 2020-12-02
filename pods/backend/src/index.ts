import initializeServer from "./app-with-apollo";
import initializeDatabase from "./db";

async function main() {
  const connection = await initializeDatabase();
  await initializeServer(connection);
}


main().catch(console.error);