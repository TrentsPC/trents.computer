import { clientOnly } from "@solidjs/start";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, onMount } from "solid-js";
import { fallback, object, optional, parse, string } from "valibot";
import "~/modules/boggle";

export const Route = createFileRoute("/boggle")({
  component: Page,
  validateSearch: (params) =>
    parse(
      object({
        board: fallback(optional(string()), undefined),
      }),
      params
    ),
});

const Thing = clientOnly(() =>
  import("~/modules/boggle").then((m) => ({ default: m.BoggleGame }))
);

function Page() {
  const [words, setWords] = createSignal<string[]>([]);

  onMount(async () => {
    const hash = window.location.hash;
    let dictionaryName = "scrabble-cleaned.txt";
    if (hash) {
      dictionaryName = hash.slice(1);
    }
    let url = `/word-lists/${dictionaryName}`;
    if (dictionaryName.startsWith("http")) {
      url = dictionaryName;
    }
    const response = await fetch(url);
    const text = await response.text();
    setWords(text.toUpperCase().split("\n"));
  });

  return (
    <>
      {/* <Title>Boogle</Title> */}
      {words().length ? (
        <Thing dictionary={words()} />
      ) : (
        <p>loading dictionary</p>
      )}
    </>
  );
}
