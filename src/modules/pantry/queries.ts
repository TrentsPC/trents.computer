import { queryOptions } from "@tanstack/solid-query";
import {
  getRecipe,
  getRecipeBook,
  getRecipeBooks,
  getRecipes,
} from "./server/api";

export const recipeBooksQuery = queryOptions({
  queryKey: ["recipes", "books", "list"],
  queryFn: async () => {
    return await getRecipeBooks();
  },
});

export const recipeBookQuery = (bookId: number) =>
  queryOptions({
    queryKey: ["recipes", "books", bookId],
    queryFn: () => getRecipeBook(bookId),
  });

export const recipesQuery = (bookId: number) =>
  queryOptions({
    queryKey: ["recipes", "recipes", "list", bookId],
    queryFn: () => getRecipes(bookId),
  });

export const recipeQuery = (recipeId: number) =>
  queryOptions({
    queryKey: ["recipes", "recipes", recipeId],
    queryFn: () => getRecipe(recipeId),
  });
