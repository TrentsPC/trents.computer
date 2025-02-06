import { useParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { drizzle } from "drizzle-orm/d1";
import { createSignal, For } from "solid-js";
import * as schema from "~/db/schema";
import { recipeBookQuery, recipesQuery } from "~/modules/recipes/queries";
import { getRemoteDatabase } from "~/server/database";
import { getResizedImageUrl } from "~/utils/images";

export default function Page() {
  const params = useParams<{ bookId: string }>();
  const book = createQuery(() => recipeBookQuery(Number(params.bookId)));
  const recipes = createQuery(() => recipesQuery(Number(params.bookId)));

  return (
    <div css={{ padding: 20 }}>
      <NewRecipe />
      <div
        css={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "flex-end",
          }
        }
      >
        <img
          src={
            book.data?.image?.storage_path
              ? getResizedImageUrl(book.data.image.storage_path, 320)
              : ""
          }
        />
        {book.data?.title}
      </div>
      <div css={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <For each={recipes.data}>
          {(recipe) => (
            <a href={`/recipes/recipes/${recipe.id}`}>
              <img
                src={
                  recipe?.image?.storage_path
                    ? getResizedImageUrl(recipe.image.storage_path, 320)
                    : ""
                }
              />
              {recipe.name}
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
  const params = useParams<{ bookId: string }>();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipe(name(), Number(params.bookId));
        setName("");
      }}
    >
      <input
        type="text"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
      />
      <button>Create Recipe</button>
    </form>
  );
}
