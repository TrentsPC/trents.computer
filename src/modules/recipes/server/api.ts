"use server";

import { eq } from "drizzle-orm";
import * as schema from "~/db/schema";
import { getRecipeDB } from "./database";

export async function getRecipeBooks() {
  const db = await getRecipeDB();
  const result = await db.query.recipeBooks.findMany({
    with: { image: true },
  });
  return result;
}

export async function getRecipeBook(bookId: number) {
  const db = await getRecipeDB();
  const result = await db.query.recipeBooks.findFirst({
    with: { image: true },
    where: eq(schema.recipeBooks.id, bookId),
  });
  return result;
}

export async function createRecipeBook(title: string) {
  const db = await getRecipeDB();
  const result = await db
    .insert(schema.recipeBooks)
    .values({
      title: title,
      created_at: new Date().toISOString(),
    })
    .returning();
  return result;
}

export async function getRecipes(bookId: number) {
  const db = await getRecipeDB();
  const result = await db.query.recipes.findMany({
    where: eq(schema.recipes.book_id, bookId),
    with: { image: true },
  });
  return result;
}

export async function getRecipe(recipeId: number) {
  const db = await getRecipeDB();
  const result = await db.query.recipes.findFirst({
    with: {
      image: true,
      sections: {
        with: {
          ingredientGroups: {
            with: {
              ingredients: true,
            },
          },
          steps: true,
        },
      },
    },
    where: eq(schema.recipes.id, recipeId),
  });
  return result;
}

export async function createRecipe(name: string, bookId: number) {
  const db = await getRecipeDB();
  const result = await db
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

export async function updateRecipe(
  recipeId: number,
  data: typeof schema.recipes.$inferSelect
) {
  const { id, created_at, ...permittedData } = data;
  const db = await getRecipeDB();
  const result = await db
    .update(schema.recipes)
    .set(permittedData)
    .where(eq(schema.recipes.id, recipeId))
    .returning();
  return result;
}
