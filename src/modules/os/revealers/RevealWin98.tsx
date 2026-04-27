import { css } from "@hypergood/css";

const button = css({
  background: "#c0c0c0",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "rgb(255, 255, 255) rgb(10, 10, 10) rgb(10, 10, 10)rgb(255, 255, 255)",
  boxShadow: " rgb(132, 133, 132) -1px -1px 0px 1px inset,rgb(224, 224, 224) 1px 1px 0px 1px inset",
  width: 32,
  height: 28,
  margin: 0,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export function RevealWin98() {
  return (
    <div
      css={{
        // position: "fixed",
        // bottom: 0,
        // right: 0,
        padding: 4,
        d: "flex",
      }}
      onMouseEnter={preload}
    >
      <button class={button} onClick={reveal}>
        <svg width="24px" height="20px" viewBox="0 0 12 10">
          <path d="M 2 7 L 8 7 L 8 9 L 2 9 Z" />
        </svg>
      </button>
      <button class={button} onClick={reveal}>
        <svg width="24px" height="20px" viewBox="0 0 12 10">
          <path d="M 1 0 L 10 0 L 10 9 L 1 9 Z M 9 2 L 2 2 L 2 8 L 9 8 Z" />
        </svg>
      </button>
      <div css={{ ml: 4 }} />
      <button class={button} onClick={reveal}>
        <svg width="24px" height="20px" viewBox="0 0 12 10">
          <path d="M 2 1 L 4 1 L 4 2 L 5 2 L 5 3 L 7 3 L 7 2 L 8 2 L 8 1 L 10 1 L 10 2 L 9 2 L 9 3 L 8 3 L 8 4 L 7 4 L 7 5 L 8 5 L 8 6 L 9 6 L 9 7 L 10 7 L 10 8 L 8 8 L 8 7 L 7 7 L 7 6 L 5 6 L 5 7 L 4 7 L 4 8 L 2 8 L 2 7 L 3 7 L 3 6 L 4 6 L 4 5 L 5 5 L 5 4 L 4 4 L 4 3 L 3 3 L 3 2 L 2 2 Z" />
        </svg>
      </button>
    </div>
  );
}

function preload() {
  import("~/modules/os/win98");
}

async function reveal() {
  const { TrentOS } = await import("~/modules/os/win98");
  const element = TrentOS();
  const container = document.getElementById("app")!;
  container.innerHTML = "";
  container.appendChild(element as HTMLElement);
}
