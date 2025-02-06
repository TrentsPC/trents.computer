import { json } from "@solidjs/router";
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
  const value = event.request.body;
  if (!value) return new Response("No body found!", { status: 400 });
  const contentType = event.request.headers.get("content-type");
  if (!contentType || !contentType.includes("image")) {
    return new Response("Content type must be an image!", { status: 400 });
  }
  const imagePath = `recipes/${id}${getExtensionForContentType(contentType)}`;
  // while (env.IMAGES.list({prefix: imagePath})) {}
  // Inefficient, but i don't care
  const blob = await readableStreamToBlob(value);

  console.log("value", blob, imagePath);
  await env.IMAGES.put(imagePath, blob as any);

  const db = drizzle(env.DB, { schema });
  const image = await db
    .insert(schema.images)
    .values({
      storage_path: imagePath,
      created_at: new Date().toISOString(),
    })
    .returning();
  return json(image);
}

async function readableStreamToBlob(readableStream: ReadableStream) {
  const reader = readableStream.getReader();
  const read = await reader.read();
  if (read.done) {
    return new Blob();
  }
  const chunks = [];
  chunks.push(read.value);
  return new Blob(chunks);
}

function getExtensionForContentType(contentType: string) {
  if (contentType.includes("jpeg")) return ".jpg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("webp")) return ".webp";
  return "";
}
