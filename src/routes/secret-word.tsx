import { createSignal, onMount } from "solid-js";
import { parse } from "csv/browser/esm";
import { Title } from "@solidjs/meta";
import { Card, SecretWordGame } from "~/modules/secret-word";

export default function Page() {
  const [cards, setCards] = createSignal<Card[]>([]);
  onMount(async () => {
    const res = await fetch("/api/secret-words.csv");
    const text = await res.text();
    parse(
      text,
      {
        columns: true,
      },
      (error, data) => {
        setCards(data);
      }
    );
  });

  return (
    <div>
      <Title>Secret Word</Title>
      <h1 css={{ mx: "auto", fontScale: 1, align: "center", fontWeight: 700 }}>
        Secret Word
      </h1>
      {cards().length > 0 ? (
        <SecretWordGame cards={cards()} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
