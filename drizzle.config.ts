import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Drizzle Kit (migrations / introspection) talks to the origin Postgres
// directly rather than through Hyperdrive, so it needs the database's own
// connection string. Put it in a local .env as DATABASE_URL — this file is
// only used by the `drizzle-kit` CLI, never bundled into the Worker.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
