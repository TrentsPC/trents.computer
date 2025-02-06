import { createAsync } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { createSignal, For } from "solid-js";
import * as schema from "~/db/schema";
import { getRemoteDatabase } from "~/server/database";
import { getResizedImageUrl } from "~/utils/images";

async function getCloudflare() {
  // "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz.query.recipeBooks.findMany({
    with: { image: true },
  });
  return result;
}

async function createRecipeBook(title: string) {
  "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz
    .insert(schema.recipeBooks)
    .values({
      title: title,
      created_at: new Date().toISOString(),
    })
    .returning();
}

async function updateRecipeBookImage(bookId: number, imageId: number) {
  "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz
    .update(schema.recipeBooks)
    .set({
      image_id: imageId,
    })
    .where(eq(schema.recipeBooks.id, bookId))
    .returning();
  return result;
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

export default function Page() {
  const thing = createAsync(getCloudflare);

  return (
    <div>
      <h1>Cloudflare binding test</h1>
      <small>
        <pre>
          <code>{JSON.stringify(thing(), null, 2)}</code>
        </pre>
      </small>
      <div css={{ display: "flex" }}>
        <For each={thing()}>
          {(book) => (
            <div css={{ border: `1px solid black`, padding: 8 }}>
              {book.title}: {book.image_id || "no image"}
              <img
                src={
                  book.image?.storage_path
                    ? getResizedImageUrl(book.image?.storage_path, 320)
                    : ""
                }
              />
              <button
                onClick={() => {
                  updateRecipeBookImage(book.id, 4);
                }}
              >
                set to image id 4
              </button>
            </div>
          )}
        </For>
      </div>
      <button onClick={getCloudflare}>go</button>
      <NewBook />
      <UploadImages />
    </div>
  );
}

function NewBook() {
  const [title, setTitle] = createSignal("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeBook(title());
        setTitle("");
      }}
    >
      <input
        type="text"
        value={title()}
        onInput={(e) => setTitle(e.currentTarget.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

function UploadImages() {
  const [file, setFile] = createSignal<File | undefined>(undefined);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // const body = new FormData();
        // body.append("file", file()!);
        if (file()) {
          uploadRecipeImage(file()!);
        }
      }}
    >
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

async function uploadRecipeImage(file: File) {
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

function getImageDimensions(image: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
  });
}
