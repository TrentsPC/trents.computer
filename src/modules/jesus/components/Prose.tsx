import { JSX } from "solid-js";
import { createSquircle } from "~/utils/squircle";

export function Prose(props: { children?: JSX.Element }) {
  return (
    <div
      css={{
        fontSize: "4vw",
        textAlign: "left",
        lineHeight: 1.333,
        w: "100%",
        pl: "8vw",
        pr: "4vw",
        fontFamily: '"Söhne"',
        "& h1": {
          fontSize: "9vw",
          lineHeight: 40 / 36,
          fontWeight: "bold",
          textWrap: "balance",
        },
        "& h2": {
          fontSize: "6vw",
          lineHeight: 32 / 24,
          fontWeight: "bold",
          textWrap: "balance",
          marginBottom: "6vw",
        },
        "& img": {
          float: "right",
          maxH: "66vh",
          maxW: "33.333vw",
          r: "1vw",
        },
        "& ul": {
          spaceY: "2vw",
        },
      }}
      ref={(el) => {
        requestAnimationFrame(() => {
          const images = el.querySelectorAll("img");
          for (const img of images) {
            createSquircle(img);
          }
        });
      }}
    >
      {props.children}
    </div>
  );
}
