import type { APIEvent } from "@solidjs/start/server";
import { json } from "~/server/json";

export async function GET(event: APIEvent) {
  return json({
    hello: "world",
  });
}
