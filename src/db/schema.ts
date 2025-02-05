import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipeBooks = sqliteTable("recipe_books", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  created_at: int().notNull(),
});
