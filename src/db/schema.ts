import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipeBooks = sqliteTable("recipe_books", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  created_at: int().notNull(),
});

export const images = sqliteTable("images", {
  id: int().primaryKey({ autoIncrement: true }),
  storage_path: text().notNull(),
  created_at: text().notNull(),
});
