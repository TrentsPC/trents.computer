// Thin TMDB (themoviedb.org) client. Server-only: it reads the API key from the
// environment and is imported exclusively from `~/server/cinema` server
// functions, so the key never reaches the client bundle.

import { getCloudflareEnv } from "./cloudflare";

const BASE = "https://api.themoviedb.org/3";
export const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export type TmdbMediaType = "movie" | "tv";

export type TmdbSearchResult = {
  tmdbId: number;
  mediaType: TmdbMediaType;
  title: string;
  year: string | null;
  posterPath: string | null;
  overview: string;
};

export type TmdbDetails = TmdbSearchResult & {
  genres: string[];
  contentRating: string | null;
  contentRatingDetail: string | null;
  // The complete, unmodified TMDB details response, kept for future use.
  raw: unknown;
};

async function tmdb<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  // Nitro loads `.env` into process.env in dev; in the deployed Worker the key
  // comes from the Cloudflare env binding (set via `wrangler secret put`).
  const key =
    (typeof process !== "undefined" ? process.env.TMDB_API_KEY : undefined) ||
    (await getCloudflareEnv())?.TMDB_API_KEY;

  if (!key) {
    throw new Error(
      "TMDB_API_KEY is not set. Add it to .env (dev) and as a Worker secret (prod).",
    );
  }

  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  // TMDB accepts two auth styles. A v4 read access token is a JWT (starts with
  // "eyJ") and goes in the Authorization header; a v3 key is a 32-char hex
  // string and must be passed as the `api_key` query param.
  const isV4Token = key.startsWith("eyJ");
  const headers: Record<string, string> = { accept: "application/json" };
  if (isV4Token) {
    headers.Authorization = `Bearer ${key}`;
  } else {
    url.searchParams.set("api_key", key);
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status}): ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

function yearOf(date: string | undefined): string | null {
  return date && date.length >= 4 ? date.slice(0, 4) : null;
}

type RawSearchItem = {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  overview?: string;
};

export async function searchMedia(query: string): Promise<TmdbSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const data = await tmdb<{ results: RawSearchItem[] }>("/search/multi", {
    query: trimmed,
    include_adult: "false",
  });

  return data.results
    .filter((r) => r.media_type === "movie" || r.media_type === "tv")
    .map((r) => ({
      tmdbId: r.id,
      mediaType: r.media_type as TmdbMediaType,
      title: (r.title ?? r.name ?? "Untitled").trim(),
      year: yearOf(r.release_date ?? r.first_air_date),
      posterPath: r.poster_path ?? null,
      overview: r.overview ?? "",
    }));
}

type RawDetails = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  overview?: string;
  genres?: { name: string }[];
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string; note?: string }[];
    }[];
  };
  content_ratings?: {
    results: { iso_3166_1: string; rating: string; descriptors?: string[] }[];
  };
};

function movieRating(d: RawDetails): {
  rating: string | null;
  detail: string | null;
} {
  const us = d.release_dates?.results.find((r) => r.iso_3166_1 === "US");
  const entry = us?.release_dates.find((e) => e.certification);
  if (!entry) return { rating: null, detail: null };
  return {
    rating: entry.certification || null,
    detail: entry.note?.trim() || null,
  };
}

function tvRating(d: RawDetails): {
  rating: string | null;
  detail: string | null;
} {
  const us = d.content_ratings?.results.find(
    (r) => r.iso_3166_1 === "US" && r.rating,
  );
  if (!us) return { rating: null, detail: null };
  const detail = us.descriptors?.length ? us.descriptors.join(", ") : null;
  return { rating: us.rating || null, detail };
}

export async function getDetails(
  mediaType: TmdbMediaType,
  tmdbId: number,
): Promise<TmdbDetails> {
  const path = mediaType === "movie" ? `/movie/${tmdbId}` : `/tv/${tmdbId}`;
  const append = mediaType === "movie" ? "release_dates" : "content_ratings";
  const d = await tmdb<RawDetails>(path, { append_to_response: append });

  const { rating, detail } =
    mediaType === "movie" ? movieRating(d) : tvRating(d);

  return {
    tmdbId: d.id,
    mediaType,
    title: (d.title ?? d.name ?? "Untitled").trim(),
    year: yearOf(d.release_date ?? d.first_air_date),
    posterPath: d.poster_path ?? null,
    overview: d.overview ?? "",
    genres: (d.genres ?? []).map((g) => g.name),
    contentRating: rating,
    contentRatingDetail: detail,
    raw: d,
  };
}
