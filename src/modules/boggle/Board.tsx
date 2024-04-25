import { For, Show, createEffect } from "solid-js";
import { useSquircle } from "~/utils/squircle";
import { getValidWordPath } from "./utils";
import { createSpring } from "../spring";
import { colors } from "~/theme.styles";

// 52.5 pixel per cm

export function Board(props: {
  board: string[][];
  word: string;
  rotations: number;
}) {
  const path = () => getValidWordPath(props.board, props.word) || [];
  const rotationSpring = createSpring(() => ({
    value: props.rotations,
    period: 0.5,
    damping: 0.7,
  }));

  return (
    <div
      ref={useSquircle()}
      css={{
        flex: "1 0 0px",
        aspectRatio: "1",
        d: "grid",
        gridCols: 4,
        gap: 16,
        maxW: 500,
        padding: 25,
        bg: "rgba(0,0,0,0.1)",
        r: 25,
        fontSize: 52.5,
      }}
      style={{
        transform: `rotate(${rotationSpring() * 90}deg)`,
      }}
    >
      <For each={props.board}>
        {(row, y) => (
          <For each={row}>
            {(letter, x) => {
              const pathIdx = () =>
                path().findIndex((pos) => pos.x === x() && pos.y === y());
              const hasLine = () =>
                pathIdx() !== -1 && pathIdx() !== path().length - 1;

              return (
                <div
                  ref={useSquircle()}
                  css={{
                    aspectRatio: "1",
                    w: "100%",
                    d: "flex",
                    items: "center",
                    justify: "center",
                    r: 8,
                    bg: "white",
                    zIndex: 1,
                  }}
                  style={{
                    "background-color":
                      pathIdx() !== -1 ? colors.green8 : undefined,

                    "grid-column": x() + 1 + " / span 1",
                    "grid-row": y() + 1 + " / span 1",
                  }}
                >
                  <span
                    css={{
                      fontWeight: "bold",
                      font: "monospace",
                      userSelect: "none",
                    }}
                    style={{
                      transform: `rotate(${-rotationSpring() * 90}deg)`,
                    }}
                  >
                    {letter}
                  </span>
                </div>
              );
            }}
          </For>
        )}
      </For>

      <For each={path()}>
        {(coord, i) => {
          const lastCoord = () =>
            i() === 0 ? { x: 0, y: 0 } : path()[i() - 1];
          const dx = () => lastCoord().x - coord.x;
          const dy = () => lastCoord().y - coord.y;

          const rotation = () => {
            if (dx() === 1 && dy() === 0) return 0;
            if (dx() === 1 && dy() === 1) return 45;
            if (dx() === 0 && dy() === 1) return 90;
            if (dx() === -1 && dy() === 1) return 135;
            if (dx() === -1 && dy() === 0) return 180;
            if (dx() === -1 && dy() === -1) return 225;
            if (dx() === 0 && dy() === -1) return 270;
            if (dx() === 1 && dy() === -1) return 315;
            return 0;
          };

          return (
            <Show when={i() !== 0}>
              <div
                css={{
                  alignSelf: "center",
                  zIndex: 0,
                }}
                style={{
                  transform: `rotate(${rotation()}deg)`,
                  "grid-column": coord.x + 1 + " / span 1",
                  "grid-row": coord.y + 1 + " / span 1",
                }}
              >
                <div
                  style={{
                    transform: `translateX(50%)`,
                  }}
                  css={{
                    width: "100%",
                    height: 10,
                    bg: colors.green7,
                    // opacity: 0.5,
                  }}
                />
              </div>
            </Show>
          );
        }}
      </For>
    </div>
  );
}
