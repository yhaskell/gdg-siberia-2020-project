import dotenv from "dotenv";

const missing: string[] = [];

/**
 * Ensures that an environment variable has a value
 * @param name name or a variable
 * @returns {string} value of an environment variable
 */
function surely(name: string): string {
  const result = process.env[name];
  if (result === undefined) {
    missing.push(name);

    return "";
  }

  return result;
}

dotenv.config();

export const POSTGRES_URI = surely("POSTGRES_URI");

if (missing.length > 0) {
  console.error("Cannot start an application without those variables set up:");
  missing.forEach(env => console.error("-", env));
  process.exit(1);
}
