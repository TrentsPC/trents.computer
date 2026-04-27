import { getRouteApi, useRouter } from "@tanstack/solid-router";
import { For, Index, Show, createEffect, createSignal } from "solid-js";
import { HeartFilledIcon, HeartIcon } from "solid-radix-icons";
import { colors } from "~/theme.styles";
import { createBeatRacer } from "../beat-racer";
import { createSpring } from "../spring";

const GAP = 36;
const MARGIN = 22;

const route = getRouteApi("/");

export function HistoryRacer() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const router = useRouter();
  const [maxX, setMaxX] = createSignal(0);
  const x = () => {
    let num = search().x || 0;
    if (isFinite(num)) {
      return num;
    }
    return 0;
  };

  const { status, notes, currentBeat, play, stop, chart } = createBeatRacer({
    column: x,
    gridSize: () => GAP,
  });

  const currentLyric = () => chart().lyrics?.findLast?.((l) => l.start <= currentBeat());

  function reset() {
    setMaxX(0);
    stop();
  }

  createEffect(() => {
    if (x() === maxX() && maxX() < 5) {
      // setTimeout(() => {
      //   navigate({
      //     to: "/",
      //     search: { x: x() + 1 },
      //     mask: {
      //       to: "/",
      //     },
      //   });
      //   setTimeout(() => {
      //     router.history.back();
      //   }, 100);
      // }, 250);
    }
    setMaxX(Math.max(x(), maxX()));
  });

  createEffect(() => {
    if (x() === 0 && maxX() !== 0) {
      reset();
    }
  });

  return (
    <>
      <Lines x={x()} maxX={maxX()} />
      <LineAcross maxX={maxX()} />
      {status() === "playing" && (
        <For each={notes}>
          {(note) => (
            <div
              style={{
                position: "absolute",
                top: `${GAP * -0.5 + GAP}px`,
                left: `${MARGIN + GAP * 0.5}px`,
                width: `${GAP}px`,
                height: `${GAP}px`,
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                fill: note.parried()
                  ? "var(--color-brand-vibrant)"
                  : note.caught()
                    ? colors.secondaryLabel
                    : "var(--color-brand)",
                transform: `translate(${note.transformX()}px, ${note.transformY()}px)`,
                opacity: note.transformY() > 450 ? 0 : 1,
                transition: "opacity 0.3s linear",
              }}
            >
              {note.parried() ? (
                <>😎</>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    // fill="var(--color-brand)"
                    d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
                  />
                </svg>
              )}
            </div>
          )}
        </For>
      )}

      <div
        style={{
          left: MARGIN + GAP * 6 + "px",
          top: GAP * 0.5 + "px",
        }}
        css={{
          position: "fixed",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
        }}
      >
        {maxX() === 5 && status() === "idle" && (
          <button style={{ height: GAP + "px", padding: "0 12px" }} onClick={() => play()}>
            play
          </button>
        )}
      </div>
      {currentLyric() && (
        <div
          css={{
            position: "absolute",
            width: 500,
          }}
          style={{
            top: GAP * 0.5 + "px",
            "line-height": GAP + "px",
            left: MARGIN + GAP * 6 + "px",
          }}
          // style={{
          //   animation:
          //     currentLyric()!.end && currentLyric()!.end! < currentBeat()
          //       ? `${lyricExit} 1000ms running forwards`
          //       : undefined,
          // }}
        >
          <Index each={currentLyric()?.words}>
            {(word) => (
              <span
                style={{
                  color:
                    word().start <= currentBeat()
                      ? "var(--color-brand-vibrant)"
                      : colors.secondaryLabel,
                  "font-weight": word().start <= currentBeat() ? 600 : 400,
                }}
              >
                {word().word}{" "}
              </span>
            )}
          </Index>
        </div>
      )}
    </>
  );
}

function Lines(props: { x: number; maxX: number }) {
  const maxXSpring = createSpring(() => ({
    value: props.maxX === 0 ? -GAP : props.maxX * GAP + MARGIN,
    period: 0.2,
  }));

  return (
    <For each={[1, 2, 3, 4, 5]}>
      {(index) => (
        <div
          css={{
            position: "absolute",
            top: 0,
            height: "500px",
            width: `1px`,
            bg: `linear-gradient(to bottom, ${colors.secondaryLabel}, ${colors.secondaryLabel}, transparent)`,
          }}
          style={{
            left: `${Math.min(maxXSpring(), index * GAP + MARGIN)}px`,
          }}
        >
          <div
            css={{
              position: "absolute",
              left: 0,
              transform: `translate(-50%, -40%)`,
              width: "22.5px",
              height: "22.5px",
            }}
            style={{
              top: GAP + "px",
            }}
          >
            {props.x === index ? (
              <HeartFilledIcon css={{ w: "100%", h: "100%", zIndex: 100 }} />
            ) : (
              <HeartIcon
                css={{
                  color: colors.secondaryLabel,
                  w: "100%",
                  h: "100%",
                }}
              />
            )}
          </div>
        </div>
      )}
    </For>
  );
}

function LineAcross(props: { maxX: number }) {
  const maxXSpring = createSpring(() => ({
    value: props.maxX === 0 ? -5 : props.maxX * GAP,
    period: 0.2,
  }));

  return (
    <Show when={props.maxX > 0}>
      <div
        css={{
          position: "absolute",
          height: "1px",
          bg: "black",
        }}
        style={{
          top: GAP + "px",
          left: `${1 * GAP + MARGIN}px`,
          width: `${Math.min(maxXSpring() - GAP)}px`,
        }}
      />
    </Show>
  );
}
