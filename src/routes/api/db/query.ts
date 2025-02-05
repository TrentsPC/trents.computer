import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { setResponseHeaders } from "vinxi/http";
import { getDatabase } from "~/server/database";

export async function OPTIONS({ request, nativeEvent }: APIEvent) {
  setResponseHeaders(nativeEvent, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
  return new Response(null, { status: 204 });
}

export async function POST({ request, nativeEvent }: APIEvent) {
  const { query, params, mode } = await request.json();
  const db = await getDatabase();

  const result = await db
    .prepare(query)
    .bind(...params)
    [mode === "raw" ? "raw" : "all"]({ columnNames: true });

  return json(result);
}
