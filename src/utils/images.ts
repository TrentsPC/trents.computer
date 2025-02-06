// https://trents.computer/cdn-cgi/image/width=80,quality=75/https://images.trents.computer/recipes/QTUUFn6hnA.png

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/db/schema";
import { getRemoteDatabase } from "~/server/database";

function getImageUrl(path: string) {
  return `https://images.trents.computer/${path}`;
}

export function getResizedImageUrl(path: string, width: number) {
  return `https://trents.computer/cdn-cgi/image/width=${width},quality=100/${getImageUrl(
    path
  )}`;
}

export function getImageJsonUrl(path: string) {
  return `https://trents.computer/cdn-cgi/image/format=json/${getImageUrl(
    path
  )}`;
}

export async function uploadRecipeImage(file: File) {
  const dimensions = await getImageDimensions(file);
  const res = await fetch("https://wwwwwww.trents.computer/api/recipe-image", {
    method: "POST",
    body: file,
  });
  if (!res.ok) {
    throw new Error("Failed to upload image");
  }
  const json = await res.json();
  const imageId = json?.[0]?.id as number;
  if (!imageId) {
    throw new Error("Failed to upload image");
  }
  await updateImageDimensions(imageId, dimensions.width, dimensions.height);
  return imageId;
}

async function updateImageDimensions(
  imageId: number,
  width: number,
  height: number
) {
  "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz
    .update(schema.images)
    .set({
      width,
      height,
    })
    .where(eq(schema.images.id, imageId))
    .returning();
  return result;
}

function getImageDimensions(image: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
  });
}
