import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import {
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import {
  addToWatchlist,
  getWatchlist,
  searchCinema,
  type WatchlistItem,
} from "~/server/cinema";
import type { TmdbSearchResult } from "~/server/tmdb";

export const Route = createFileRoute("/absolute-cinema")({
  component: Page,
});

const NAME_KEY = "absolute-cinema-name";

function Page() {
  const [name, setName] = createSignal<string | null>(null);

  onMount(() => {
    const stored = localStorage.getItem(NAME_KEY);
    if (stored) setName(stored);

    // Keep this page out of search engines. It's a client-rendered SPA, so we
    // inject a robots meta tag on mount (Googlebot renders JS and honors it)
    // and remove it when navigating away so other routes stay indexable.
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    onCleanup(() => robots.remove());
  });

  const saveName = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    localStorage.setItem(NAME_KEY, trimmed);
    setName(trimmed);
  };

  return (
    <div
      css={{
        minHeight: "100vh",
        background: "#ffb8e8",
        color: "#5c357c",
        fontFamily: "'Times New Roman', sans-serif",
        padding: 24,
      }}
    >
      <div css={{ maxWidth: 1080, margin: "0 auto" }}>
        <Show when={name()} fallback={<NameGate onSubmit={saveName} />}>
          {(currentName) => (
            <Watchlist
              name={currentName()}
              onChangeName={() => setName(null)}
            />
          )}
        </Show>
      </div>
    </div>
  );
}

function NameGate(props: { onSubmit: (name: string) => void }) {
  const [value, setValue] = createSignal("");

  return (
    <div
      css={{
        // background: "#15151d",
        // border: `1px solid ${"#2a2a38"}`,
        borderRadius: 16,
        padding: 32,
        maxWidth: 440,
        margin: "48px auto",
      }}
    >
      <h2 css={{ fontSize: 22, fontWeight: 600, margin: 0 }}>What's ur gay ass name?</h2>
      <form
        css={{ display: "flex", gap: 8, marginTop: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(value());
        }}
      >
        <input
          autofocus
          placeholder="e.g. Jonkler"
          value={value()}
          onInput={(e) => setValue(e.currentTarget.value)}
          css={{
            flex: 1,
            // background: "#0b0b0f",
            border: `1px solid ${"#2a2a38"}`,
            borderRadius: 10,
            padding: "12px 14px",
            // color: "#f3f3f7",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={!value().trim()}
          css={{
            // background: "#e5b769",
            // color: "#0b0b0f",
            border: "none",
            borderRadius: 10,
            padding: "0 18px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
          style={{
            opacity: value().trim() ? 1 : 0.5,
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}

function Watchlist(props: { name: string; onChangeName: () => void }) {
  const queryClient = useQueryClient();

  const watchlist = useQuery(() => ({
    queryKey: ["watchlist"],
    queryFn: () => getWatchlist(),
    // Shared list — poll so additions from other visitors show up on their own.
    refetchInterval: 30_000,
  }));

  const addMutation = useMutation(() => ({
    mutationFn: (media: { tmdbId: number; mediaType: "movie" | "tv" }) =>
      addToWatchlist({ ...media, personName: props.name }),
    onSuccess: (data) => {
      queryClient.setQueryData(["watchlist"], data);
    },
  }));

  const add = (media: TmdbSearchResult) =>
    addMutation.mutateAsync({
      tmdbId: media.tmdbId,
      mediaType: media.mediaType,
    });

  return (
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span css={{  fontSize: 16 }}>
          Watching as <strong css={{ color: "black" }}>{props.name}</strong>
        </span>
        <button
          onClick={props.onChangeName}
          css={{
            background: "transparent",
            border: `1px solid ${"#2a2a38"}`,
            // color: "#9a9aae",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Change name
        </button>
      </div>

      <SearchBar onAdd={add} pending={addMutation.isPending} />

      <Show when={addMutation.isError}>
        <p css={{ color: "#ff7676", fontSize: 14, marginTop: 12 }}>
          Couldn't add that: {(addMutation.error as Error)?.message}
        </p>
      </Show>

      <div css={{ marginTop: 28 }}>
        <Switch>
          <Match when={watchlist.isPending}>
            <p css={{ color: "#9a9aae" }}>Loading the watchlist…</p>
          </Match>
          <Match when={watchlist.isError}>
            <p css={{ color: "#ff7676" }}>
              Failed to load: {(watchlist.error as Error)?.message}
            </p>
          </Match>
          <Match when={watchlist.data && watchlist.data.length === 0}>
            <p css={{ color: "#9a9aae" }}>
              Nothing here yet. Search above to add the first title.
            </p>
          </Match>
          <Match when={watchlist.data}>
            <WatchlistTable items={watchlist.data!} />
          </Match>
        </Switch>
      </div>
    </>
  );
}

function SearchBar(props: {
  onAdd: (media: TmdbSearchResult) => Promise<unknown>;
  pending: boolean;
}) {
  const [term, setTerm] = createSignal("");
  const [debounced, setDebounced] = createSignal("");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let inputRef: HTMLInputElement | undefined;

  const onInput = (value: string) => {
    setTerm(value);
    clearTimeout(timer);
    timer = setTimeout(() => setDebounced(value.trim()), 300);
  };

  // Add, then clear and refocus the search field so the next title can be
  // typed immediately. Leaves the field untouched if the add fails.
  const handleAdd = async (media: TmdbSearchResult) => {
    await props.onAdd(media);
    clearTimeout(timer);
    setTerm("");
    setDebounced("");
    inputRef?.focus();
  };

  const results = useQuery(() => ({
    queryKey: ["cinema-search", debounced()],
    queryFn: () => searchCinema(debounced()),
    enabled: debounced().length > 1,
    staleTime: 60_000,
  }));

  return (
    <div css={{ position: "relative" }}>
      <input
        ref={inputRef}
        placeholder="Search for a movie or TV show…"
        value={term()}
        onInput={(e) => onInput(e.currentTarget.value)}
        css={{
          width: "100%",
          // background: "#15151d",
          border: `1px solid ${"#2a2a38"}`,
          borderRadius: 12,
          padding: "14px 16px",
          // color: "#f3f3f7",
          fontSize: 16,
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <Show when={debounced().length > 1}>
        <div
          css={{
            marginTop: 8,
            // background: "#15151d",
            border: `1px solid ${"#2a2a38"}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Switch>
            <Match when={results.isPending}>
              <p css={{  padding: 16, margin: 0 }}>
                Searching…
              </p>
            </Match>
            <Match when={results.data && results.data.length === 0}>
              <p css={{  padding: 16, margin: 0 }}>
                No matches.
              </p>
            </Match>
            <Match when={results.data}>
              <For each={results.data!.slice(0, 8)}>
                {(media) => (
                  <SearchResultRow
                    media={media}
                    onAdd={handleAdd}
                    pending={props.pending}
                  />
                )}
              </For>
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  );
}

function SearchResultRow(props: {
  media: TmdbSearchResult;
  onAdd: (media: TmdbSearchResult) => void;
  pending: boolean;
}) {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 10,
        borderBottom: `1px solid ${"#2a2a38"}`,
      }}
    >
      <Show
        when={props.media.posterPath}
        fallback={
          <div
            css={{
              width: 40,
              height: 60,
              background: "#1e1e29",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
        }
      >
        <img
          src={`https://image.tmdb.org/t/p/w92${props.media.posterPath}`}
          alt=""
          css={{
            width: 40,
            height: 60,
            objectFit: "cover",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      </Show>
      <div css={{ flex: 1, minWidth: 0 }}>
        <div css={{ fontSize: 15, fontWeight: 500 }}>
          {props.media.title}
          <Show when={props.media.year}>
            <span css={{  fontWeight: 400 }}>
              {" "}
              ({props.media.year})
            </span>
          </Show>
        </div>
        <div
          css={{
            // color: "#9a9aae",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {props.media.mediaType === "movie" ? "Movie" : "TV"}
        </div>
      </div>
      <button
        disabled={props.pending}
        onClick={() => props.onAdd(props.media)}
        css={{
          background: "rebeccapurple",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
        style={{
          cursor: props.pending ? "default" : "pointer",
          opacity: props.pending ? 0.5 : 1,
        }}
      >
        Add
      </button>
    </div>
  );
}

function WatchlistTable(props: { items: WatchlistItem[] }) {
  const th = {
    textAlign: "left" as const,
    padding: "12px 14px",
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    // color: "#9a9aae",
    borderBottom: `1px solid ${"#2a2a38"}`,
  };
  const td = {
    padding: "14px",
    borderBottom: `1px solid ${"#2a2a38"}`,
    verticalAlign: "top" as const,
    fontSize: "14px",
  };

  return (
    <div
      css={{
        overflowX: "auto",
        // border: `1px solid ${"#2a2a38"}`,
        // borderRadius: 12,
      }}
    >
      <table css={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
        <thead>
          <tr>
            <th style={{ ...th, width: "153px", "min-width": "153px" }}>Art</th>
            <th style={th}>Title</th>
            <th style={th}>Genre</th>
            <th style={th}>Rating</th>
            <th style={th}>Added by</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.items}>
            {(item) => (
              <tr>
                <td style={td}>
                  <Show
                    when={item.posterUrl}
                    fallback={
                      <div
                        css={{
                          width: 125,
                          height: 125*1.5,
                          background: "#1e1e29",
                          borderRadius: 6,
                        }}
                      />
                    }
                  >
                    <img
                      src={item.posterUrl!}
                      alt={`${item.title} poster`}
                      css={{
                          width: 125,
                          height: 125*1.5,
                        objectFit: "cover",
                        borderRadius: 3,
                        display: "block",
                      }}
                    />
                  </Show>
                </td>
                <td style={td}>
                  <div css={{ fontWeight: 600 }}>
                    {item.title}
                    <Show when={item.year}>
                      <span css={{  fontWeight: 400 }}>
                        {" "}
                        ({item.year})
                      </span>
                    </Show>
                  </div>
                  <div css={{ fontSize: 12, marginTop: 2 }}>
                    {item.mediaType === "movie" ? "Movie" : "TV Show"}
                  </div>
                </td>
                <td style={{ ...td,  }}>
                  <Show when={item.genres.length} fallback={<span>—</span>}>
                    {item.genres.join(", ")}
                  </Show>
                </td>
                <td style={td}>
                  <Show
                    when={item.contentRating}
                    fallback={<span css={{  }}>NR</span>}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        border: `1px solid ${"#2a2a38"}`,
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {item.contentRating}
                    </span>
                  </Show>
                </td>
                <td style={td}>
                  <div css={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <For each={item.people}>
                      {(person) => (
                        <span
                          css={{
                            // background: "#1e1e29", 
                            // border: `1px solid ${"#2a2a38"}`,
                            borderRadius: 999,
                            padding: "3px 10px",
                            fontSize: 13,
                          }}
                        >
                          {person.name}
                        </span>
                      )}
                    </For>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
