"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getCloudflareEnv } from "~/server/cloudflare";
import * as schema from "./schema";

/**
 * Create a Drizzle client backed by the Hyperdrive connection declared in
 * wrangler.toml (`[[hyperdrive]] binding = "HYPERDRIVE"`).
 *
 * Hyperdrive exposes a pooled Postgres connection string on the binding; we
 * open a short-lived postgres.js client per request. `fetch_types: false` is
 * required on Workers because postgres.js otherwise issues an extra round-trip
 * to introspect types, and `max` is kept small since Hyperdrive already pools
 * connections on the origin side.
 */
export async function getDb() {
  const { HYPERDRIVE } = await getCloudflareEnv();
  const sql = postgres(HYPERDRIVE.connectionString, {
    max: 5,
    fetch_types: false,
  });
  return drizzle(sql, { schema });
}

export type Database = Awaited<ReturnType<typeof getDb>>;
