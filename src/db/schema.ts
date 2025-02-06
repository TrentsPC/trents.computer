import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipeBooks = sqliteTable("recipe_books", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  created_at: text().notNull(),
  image_id: int(),
});

export const images = sqliteTable("images", {
  id: int().primaryKey({ autoIncrement: true }),
  storage_path: text().notNull(),
  created_at: text().notNull(),
  width: int(),
  height: int(),
});

export const recipeBooksRelations = relations(recipeBooks, ({ one }) => ({
  image: one(images, {
    fields: [recipeBooks.image_id],
    references: [images.id],
  }),
}));
