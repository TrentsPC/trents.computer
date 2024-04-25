import { JSX } from "solid-js";

export function Prose(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      css={{
        maxWidth: "40em",
        margin: "0 auto",
        padding: "0 1em",
        "& h1": {
          fontSize: 36,
        },
      }}
      {...props}
    />
  );
}
