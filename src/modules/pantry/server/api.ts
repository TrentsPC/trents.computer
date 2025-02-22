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
      book: true,
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
  data: Partial<typeof schema.recipes.$inferSelect>
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

export async function createRecipeSection(opts: {
  recipeId: number;
  name: string;
  sequence: number;
}) {
  const db = await getRecipeDB();
  const result = await db
    .insert(schema.recipeSections)
    .values({
      recipe_id: opts.recipeId,
      name: opts.name,
      sequence: opts.sequence,
    })
    .returning();
  return result;
}

export async function createRecipeIngredientGroup(opts: {
  sectionId: number;
  name: string;
  sequence: number;
}) {
  const db = await getRecipeDB();
  const result = await db
    .insert(schema.ingredientGroups)
    .values({
      recipe_section_id: opts.sectionId,
      sequence: opts.sequence,
      name: opts.name,
    })
    .returning();
  return result;
}

export async function createRecipeIngredient(opts: {
  groupId: number;
  ingredient: string;
  sequence: number;
}) {
  const db = await getRecipeDB();
  const result = await db
    .insert(schema.ingredients)
    .values({
      ingredient_group_id: opts.groupId,
      sequence: opts.sequence,
      ingredient: opts.ingredient,
    })
    .returning();
  return result;
}

export async function createRecipeStep(opts: {
  sectionId: number;
  step: string;
  sequence: number;
}) {
  const db = await getRecipeDB();
  const result = await db
    .insert(schema.steps)
    .values({
      recipe_section_id: opts.sectionId,
      sequence: opts.sequence,
      step: opts.step,
    })
    .returning();
  return result;
}

export async function updateRecipeStep(
  stepId: number,
  data: Partial<typeof schema.steps.$inferSelect>
) {
  const { id, ...permittedData } = data;
  const db = await getRecipeDB();
  const result = await db
    .update(schema.steps)
    .set(permittedData)
    .where(eq(schema.steps.id, stepId))
    .returning();
  return result;
}
