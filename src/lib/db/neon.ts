import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add your Neon PostgreSQL connection string to .env.local.",
    );
  }

  sqlClient ??= neon(databaseUrl);

  return sqlClient;
}
