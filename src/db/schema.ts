// Drizzle schema for the Postgres database fronted by the Hyperdrive binding.

import { integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * A movie or TV show on the shared "/absolute-cinema" watchlist.
 *
 * One row per (tmdbId, mediaType) — the same title added by multiple people is
 * a single item; the people who want to see it live in `cinemaAddedBy`.
 */
export const cinemaItems = pgTable(
  "cinema_items",
  {
    id: serial("id").primaryKey(),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: text("media_type").notNull(), // "movie" | "tv"
    title: text("title").notNull(),
    year: text("year"), // release/first-air year, e.g. "1999"
    posterPath: text("poster_path"), // TMDB poster path, e.g. "/abc.jpg"
    genres: text("genres").array().notNull().default([]),
    contentRating: text("content_rating"), // US certification, e.g. "PG-13", "TV-MA"
    contentRatingDetail: text("content_rating_detail"), // descriptors / note, if any
    overview: text("overview"),
    // Full TMDB details response (with appended release_dates / content_ratings),
    // stored verbatim so any field can be used later without a new migration.
    raw: jsonb("raw"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("cinema_items_tmdb_unique").on(table.tmdbId, table.mediaType)],
);

/** Records that `personName` added `itemId` to the watchlist. */
export const cinemaAddedBy = pgTable(
  "cinema_added_by",
  {
    id: serial("id").primaryKey(),
    itemId: integer("item_id")
      .notNull()
      .references(() => cinemaItems.id, { onDelete: "cascade" }),
    personName: text("person_name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("cinema_added_by_unique").on(table.itemId, table.personName)],
);

export type CinemaItem = typeof cinemaItems.$inferSelect;
export type CinemaAddedBy = typeof cinemaAddedBy.$inferSelect;
