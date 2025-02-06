import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipeBooks = sqliteTable("recipe_books", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  created_at: text().notNull(),
  image_id: int(),
});

export const recipeBooksRelations = relations(recipeBooks, ({ one }) => ({
  image: one(images, {
    fields: [recipeBooks.image_id],
    references: [images.id],
  }),
}));

export const recipes = sqliteTable("recipes", {
  id: int().primaryKey({ autoIncrement: true }),
  created_at: text().notNull(),
  book_id: int(),
  image_id: int(),
  name: text().notNull(),
  description: text().notNull(),
});

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  image: one(images, {
    fields: [recipes.image_id],
    references: [images.id],
  }),
  book: one(recipeBooks, {
    fields: [recipes.book_id],
    references: [recipeBooks.id],
  }),
  sections: many(recipeSections),
}));

export const images = sqliteTable("images", {
  id: int().primaryKey({ autoIncrement: true }),
  storage_path: text().notNull(),
  created_at: text().notNull(),
  width: int(),
  height: int(),
});

export const recipeSections = sqliteTable("recipe_sections", {
  id: int().primaryKey({ autoIncrement: true }),
  recipe_id: int().notNull(),
  name: text().notNull(),
  sequence: int().notNull(),
});

export const recipeSectionsRelations = relations(
  recipeSections,
  ({ one, many }) => ({
    recipe: one(recipes, {
      fields: [recipeSections.recipe_id],
      references: [recipes.id],
    }),
    ingredientGroups: many(ingredientGroups),
    steps: many(steps),
  })
);

export const ingredientGroups = sqliteTable("recipe_ingredient_groups", {
  id: int().primaryKey({ autoIncrement: true }),
  recipe_section_id: int().notNull(),
  name: text().notNull(),
  sequence: int().notNull(),
});

export const ingredientGroupsRelations = relations(
  ingredientGroups,
  ({ one, many }) => ({
    recipeSection: one(recipeSections, {
      fields: [ingredientGroups.recipe_section_id],
      references: [recipeSections.id],
    }),
    ingredients: many(ingredients),
  })
);

export const ingredients = sqliteTable("recipe_ingredients", {
  id: int().primaryKey({ autoIncrement: true }),
  ingredient_group_id: int().notNull(),
  ingredient: text().notNull(),
  sequence: int().notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  ingredientGroup: one(ingredientGroups, {
    fields: [ingredients.ingredient_group_id],
    references: [ingredientGroups.id],
  }),
}));

export const steps = sqliteTable("recipe_steps", {
  id: int().primaryKey({ autoIncrement: true }),
  recipe_section_id: int().notNull(),
  step: text().notNull(),
  sequence: int().notNull(),
});

export const stepsRelations = relations(steps, ({ one }) => ({
  recipeSection: one(recipeSections, {
    fields: [steps.recipe_section_id],
    references: [recipeSections.id],
  }),
}));
