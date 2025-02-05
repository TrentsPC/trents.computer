import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { getDatabase } from "~/server/database";

export async function POST({ request, nativeEvent }: APIEvent) {
  const { query, params, mode } = await request.json();
  const db = await getDatabase();

  const result = await db
    .prepare(query)
    .bind(...params)
    [mode === "raw" ? "raw" : "all"]({ columnNames: true });

  return json(result);
}
