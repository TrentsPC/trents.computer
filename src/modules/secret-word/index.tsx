import { ComponentProps, createSignal, splitProps } from "solid-js";

export type Card = {
  from: string;
  genre: string;
  title: string;
  points: string;
  description: string;
};

export function SecretWordGame(props: { cards: Card[] }) {
  const [currentCard, setCurrentCard] = createSignal<Card | undefined>();

  function handleNewCard() {
    setCurrentCard(props.cards[Math.floor(Math.random() * props.cards.length)]);
  }

  return (
    <div css={{ pt: 64 }}>
      {currentCard() ? (
        <Card card={currentCard()!} onClick={handleNewCard} />
      ) : (
        <Card
          card={{
            title: "Click to pick up a card",
            description: "",
            points: "",
            genre: "",
            from: "",
          }}
          onClick={handleNewCard}
        />
      )}
    </div>
  );
}

function Card(props: ComponentProps<"div"> & { card: Card }) {
  const [, divProps] = splitProps(props, ["card"]);
  return (
    <div
      {...divProps}
      css={{
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        align: "center",
        mx: "auto",
        w: "100%",
        maxW: 350,
        boxShadow:
          "0px 10px 100px rgba(0, 0, 0, 0.3), 0px 0px 3px rgba(0, 0, 0, 0.55)",
        background: "white",
        px: "2.5rem",
        borderRadius: 20,
      }}
    >
      <h1 css={{ fontScale: 4, my: "3rem" }}>{props.card.title}</h1>
      <p>{props.card.description}</p>
      <hr
        css={{
          my: "2.5rem",
          width: 100,
          height: 1,
          border: 0,
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        }}
      />
      {props.card.genre && (
        <p
          css={{
            textTransform: "uppercase",
            fontScale: 0,
            letterSpacing: "0.05em",
            fontWeight: 500,
          }}
          style={{ color: getGenreColor(props.card.genre) }}
        >
          {props.card.genre}
        </p>
      )}
      <p css={{ my: "1rem", fontScale: -1 }}>From {props.card.from}</p>
    </div>
  );
}

function getGenreColor(genre: string) {
  switch (genre.toLowerCase()) {
    case "person":
    case "celebrity":
    case "fictional character":
    case "historical figure":
      return "#FFCA05";
    case "world":
      return "#015F96";
    case "object":
      return "#0099DA";
    case "action":
      return "#F47026";
    case "nature":
      return "#038752";
    case "random":
    case "et cetera":
      return "#ED1C25";
    default:
      return "black";
  }
}
