import { For } from "solid-js";
import { Prose } from "~/components/ui/Prose";
import { colors } from "~/theme.styles";

export function WordsPage() {
  return (
    <Prose
      css={{
        "font-family":
          'ui-serif, "New York", Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      <h1
        css={{
          fontSize: "28px !important",
        }}
      >
        Words that i think are yummy :)
      </h1>
      <For each={WORDS}>{(entry) => <Definition entry={entry} />}</For>
    </Prose>
  );
}

type Entry = {
  word: string;
  partOfSpeech?: string;
  pronunciation?: string;
  definition?: string;
};

const WORDS: Entry[] = [
  {
    word: "fugly",
    partOfSpeech: "adjective",
    definition: "Fucking ugly.",
  },
  {
    word: "panic",
    partOfSpeech: "noun",
    definition: "a very strong feeling of anxiety or fear.",
  },
  {
    word: "rancid",
    partOfSpeech: "adjective",
    definition: "idk",
  },
  {
    word: "rank",
    partOfSpeech: "adjective",
    definition: "Offensively gross.",
  },
  {
    word: "Scomo",
    partOfSpeech: "noun",
    definition: "Scott Morrison, derogratory.",
  },
  {
    word: "scroggin",
    partOfSpeech: "noun",
    definition: "Tramping snacks.",
  },
  {
    word: "scromit",
    partOfSpeech: "verb",
    definition: "Portmanteau of scream and vomit.",
  },
  {
    word: "stroad",
    partOfSpeech: "noun",
    definition: "A street that is also a road. The worst of both worlds.",
  },
];

function Definition({ entry }: { entry: Entry }) {
  return (
    <div>
      <h2
        css={{
          fontSize: 56,
          fontWeight: 500,
        }}
      >
        {entry.word}{" "}
        <span
          css={{
            fontSize: 38,
            color: colors.secondaryLabel,
          }}
        >
          {entry.partOfSpeech}
        </span>
      </h2>
      <p
        css={{
          fontSize: 20,
        }}
      >
        {entry.definition}
      </p>
    </div>
  );
}
