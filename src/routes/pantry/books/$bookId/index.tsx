import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { drizzle } from "drizzle-orm/d1";
import { createSignal, For, Show } from "solid-js";
import * as schema from "~/db/schema";
import { recipeBookQuery, recipesQuery } from "~/modules/pantry/queries";
import { getRemoteDatabase } from "~/server/database";
import { getResizedImageUrl } from "~/utils/images";

export const Route = createFileRoute("/pantry/books/$bookId/")({
  component: Page,
});

function Page() {
  const params = Route.useParams();
  const book = createQuery(() => recipeBookQuery(Number(params().bookId)));
  const recipes = createQuery(() => recipesQuery(Number(params().bookId)));

  return (
    <div
      css={{
        // fontFamily: "Signifier, sans-serif",
        // fontSize: 18,
        // lineHeight: 1.75,
        backgroundColor: "#fffbe6",
        color: "#356859",
        padding: 16,
      }}
    >
      <NewRecipe />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          items: "center",
        }}
      >
        <Show when={book.data?.image} fallback={<div>{book.data?.title}</div>}>
          <img
            css={{ borderRadius: 3 }}
            src={
              book.data?.image?.storage_path
                ? getResizedImageUrl(book.data.image.storage_path, 320)
                : ""
            }
          />
        </Show>
      </div>
      <div css={{ height: 64 }} />
      <div
        css={{
          display: "grid",
          gridCols: 2,
          columnGap: 8,
          rowGap: 16,
          "@sm": {
            gridCols: 4,
          },
          "@md": {
            gridCols: 5,
          },
          "@lg": {
            gridCols: 6,
          },
        }}
      >
        <For each={recipes.data}>
          {(recipe) => (
            <a href={`/pantry/recipes/${recipe.id}`}>
              <img
                src={
                  recipe?.image?.storage_path
                    ? getResizedImageUrl(recipe.image.storage_path, 320)
                    : ""
                }
                css={{ borderRadius: 3 }}
              />
              <div css={{ fontSize: 12 }}>{recipe.name}</div>
            </a>
          )}
        </For>
      </div>
    </div>
  );
}

async function createRecipe(name: string, bookId: number) {
  "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz
    .insert(schema.recipes)
    .values({
      name,
      book_id: bookId,
      description: "",
      created_at: new Date().toISOString(),
    })
    .returning();
  return result;
}

function NewRecipe() {
  const [name, setName] = createSignal("");
  const params = Route.useParams();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipe(name(), Number(params().bookId));
        setName("");
      }}
    >
      <input type="text" value={name()} onInput={(e) => setName(e.currentTarget.value)} />
      <button>Create Recipe</button>
    </form>
  );
}
