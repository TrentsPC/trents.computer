"use server";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/db/schema";
import { getRemoteDatabase } from "~/server/database";

export async function getRecipeDB() {
  const d1 = await getRemoteDatabase();
  const db = drizzle(d1, {
    schema,
  });
  return db;
}
