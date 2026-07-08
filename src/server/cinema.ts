"use server";

// Server functions backing the public "/absolute-cinema" watchlist. These run
// on the server (SolidStart RPC) and are the only entry points the client uses.
// No authentication — every mutation just carries a visitor-supplied name.

import { asc } from "drizzle-orm";
import {
  integer,
  maxLength,
  minLength,
  number,
  object,
  parse,
  picklist,
  pipe,
  string,
  trim,
} from "valibot";
import { getDb } from "~/db";
import { cinemaAddedBy, cinemaItems } from "~/db/schema";
import { getDetails, POSTER_BASE, searchMedia, type TmdbSearchResult } from "./tmdb";

export type WatchlistPerson = { name: string; addedAt: string };

export type WatchlistItem = {
  id: number;
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  year: string | null;
  posterUrl: string | null;
  genres: string[];
  contentRating: string | null;
  contentRatingDetail: string | null;
  overview: string | null;
  people: WatchlistPerson[];
};

const nameSchema = pipe(string(), trim(), minLength(1, "Please enter a name."), maxLength(60));

const addSchema = object({
  tmdbId: pipe(number(), integer()),
  mediaType: picklist(["movie", "tv"]),
  personName: nameSchema,
});

function posterUrl(path: string | null): string | null {
  return path ? POSTER_BASE + path : null;
}

/** Search TMDB for movies and TV shows matching `query`. */
export async function searchCinema(query: string): Promise<TmdbSearchResult[]> {
  return searchMedia(parse(pipe(string(), trim()), query));
}

/** Return every watchlist item with the list of people who added it. */
export async function getWatchlist(): Promise<WatchlistItem[]> {
  const db = await getDb();

  const [items, added] = await Promise.all([
    db.select().from(cinemaItems).orderBy(asc(cinemaItems.createdAt)),
    db.select().from(cinemaAddedBy).orderBy(asc(cinemaAddedBy.createdAt)),
  ]);

  const peopleByItem = new Map<number, WatchlistPerson[]>();
  for (const row of added) {
    const list = peopleByItem.get(row.itemId) ?? [];
    list.push({ name: row.personName, addedAt: row.createdAt.toISOString() });
    peopleByItem.set(row.itemId, list);
  }

  return items.map((item) => ({
    id: item.id,
    tmdbId: item.tmdbId,
    mediaType: item.mediaType as "movie" | "tv",
    title: item.title,
    year: item.year,
    posterUrl: posterUrl(item.posterPath),
    genres: item.genres,
    contentRating: item.contentRating,
    contentRatingDetail: item.contentRatingDetail,
    overview: item.overview,
    people: peopleByItem.get(item.id) ?? [],
  }));
}

/**
 * Add a title to the shared watchlist under `personName`. If the title already
 * exists, the person is recorded alongside whoever added it before. Refreshes
 * the cached TMDB metadata on every add. Returns the updated watchlist.
 */
export async function addToWatchlist(input: {
  tmdbId: number;
  mediaType: "movie" | "tv";
  personName: string;
}): Promise<WatchlistItem[]> {
  const { tmdbId, mediaType, personName } = parse(addSchema, input);
  const db = await getDb();

  const details = await getDetails(mediaType, tmdbId);

  const [item] = await db
    .insert(cinemaItems)
    .values({
      tmdbId: details.tmdbId,
      mediaType: details.mediaType,
      title: details.title,
      year: details.year,
      posterPath: details.posterPath,
      genres: details.genres,
      contentRating: details.contentRating,
      contentRatingDetail: details.contentRatingDetail,
      overview: details.overview,
      raw: details.raw,
    })
    .onConflictDoUpdate({
      target: [cinemaItems.tmdbId, cinemaItems.mediaType],
      set: {
        title: details.title,
        year: details.year,
        posterPath: details.posterPath,
        genres: details.genres,
        contentRating: details.contentRating,
        contentRatingDetail: details.contentRatingDetail,
        overview: details.overview,
        raw: details.raw,
      },
    })
    .returning({ id: cinemaItems.id });

  await db
    .insert(cinemaAddedBy)
    .values({ itemId: item.id, personName })
    .onConflictDoNothing({ target: [cinemaAddedBy.itemId, cinemaAddedBy.personName] });

  return getWatchlist();
}
