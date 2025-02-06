import { ReadableStream } from "@cloudflare/workers-types";
import type { APIEvent } from "@solidjs/start/server";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/db/schema";
import { getCloudflareEnv } from "~/server/cloudflare";
import { customAlphabet } from "~/utils/nanoid";

const randomImageId = customAlphabet(
  "1234567890abcdefhiklmnorstuvwxzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10
);

export async function POST(event: APIEvent) {
  const env = await getCloudflareEnv();
  const id = randomImageId();
  const imagePath = `/recipes/${id}`;
  const value = event.request.body;
  if (!value) return new Response("No body found!", { status: 400 });
  await env.IMAGES.put(imagePath, value as unknown as ReadableStream);
  const db = drizzle(env.DB, { schema });
  await db.insert(schema.images).values({
    storage_path: imagePath,
    created_at: new Date().toISOString(),
  });
  return new Response(`Put ${imagePath} successfully!`);
}
