import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import { parseLevelSet, Sokoban } from "~/modules/sokoban";
import { MICROBAN1 } from "~/modules/sokoban/levelsets/microban";
import { MICROBAN2 } from "~/modules/sokoban/levelsets/microban-2";
import { MICROBAN3 } from "~/modules/sokoban/levelsets/microban-3";
import { MICROBAN4 } from "~/modules/sokoban/levelsets/microban-4";
import { ORIGINAL } from "~/modules/sokoban/levelsets/original";
import { SASQUATCH } from "~/modules/sokoban/levelsets/sasquatch";

const LEVEL_SETS = {
  Microban: parseLevelSet(MICROBAN1),
  "Microban II": parseLevelSet(MICROBAN2),
  "Microban III": parseLevelSet(MICROBAN3),
  "Microban IV": parseLevelSet(MICROBAN4),
  Original: parseLevelSet(ORIGINAL),
  Sasquatch: parseLevelSet(SASQUATCH),
};

type LevelSet = keyof typeof LEVEL_SETS;

export function SokobanPage() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));
  return (
    <Show when={mounted()}>
      <PageInner />
    </Show>
  );
}

function PageInner() {
  const sokoban = new Sokoban();

  const [levelSet, setLevelSet] = createSignal<LevelSet>("Microban");
  const [levelIdx, setLevelIdx] = createSignal(0);

  const level = createMemo(() => LEVEL_SETS[levelSet()][levelIdx()]);

  const [sokobanGrid, setSokobanGrid] = createSignal("");
  function render() {
    setSokobanGrid(recolor(sokoban.render()));
  }

  createEffect(() => {
    sokoban.loadLevel(level());
    render();
  });

  onMount(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp" || event.key === "w") {
        sokoban.up();
      }
      if (event.key === "ArrowDown" || event.key === "s") {
        sokoban.down();
      }
      if (event.key === "ArrowLeft" || event.key === "a") {
        sokoban.left();
      }
      if (event.key === "ArrowRight" || event.key === "d") {
        sokoban.right();
      }
      if (event.key === "r") {
        sokoban.loadLevel(level());
      }
      setSokobanGrid(recolor(sokoban.render()));
      if (sokoban.checkWin()) {
        if (levelIdx() === LEVEL_SETS[levelSet()].length - 1) {
          alert("You win! Try another level pack maybe?");
          setLevelIdx(0);
          render();
          return;
        }
        setLevelIdx((level) => level + 1);
        render();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    });
  });

  const gridWidth = () =>
    level()
      .level.slice()
      .sort((a, b) => b.length - a.length)[0].length;

  const pixelSize = () => {
    const grid = level();
    const gridHeight = grid.level.length;
    const gridWidth = grid.level.slice().sort((a, b) => b.length - a.length)[0].length;
    const width = window.innerWidth - 0;
    const height = window.innerHeight - 64;
    const widthScale = width / gridWidth;
    const heightScale = height / gridHeight;
    const scale = Math.min(widthScale, heightScale);
    return scale;
  };

  return (
    <div
      style={{
        "min-height": "100%",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          "align-items": "center",
        }}
      >
        <select
          style={{
            "font-size": "1.5rem",
            "font-weight": 600,
          }}
          value={levelSet()}
          onChange={(e) => {
            setLevelIdx(0);
            setLevelSet(e.target.value as LevelSet);
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {Object.keys(LEVEL_SETS).map((set, i) => (
            <option value={set}>{set}</option>
          ))}
        </select>
        <select
          style={{
            "font-size": "1.5rem",
            "font-weight": 600,
          }}
          value={levelIdx()}
          onChange={(e) => {
            setLevelIdx(+e.target.value);
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {LEVEL_SETS[levelSet()].map((level, i) => (
            <option value={i}>Level {i + 1}</option>
          ))}
        </select>
      </div>
      <pre
        style={{
          "line-height": 1,
          "font-size": `${pixelSize()}px`,
        }}
      >
        {sokobanGrid()}
      </pre>
    </div>
  );
}

function recolor(str: string) {
  return str
    .split("\n")
    .map((line) =>
      line
        .split("")
        .map((char) => recolorMap[char] || char)
        .join(""),
    )
    .join("\n");
}

const recolorMap = {
  // Empty
  " ": "⬜️",
  x: "⬜️",
  // Hole
  ".": "🔘",
  // Player
  "@": "😎",
  // Wall
  "#": "⬛️",
  // Crate
  $: "📦",
  // Crate on hole
  "*": "🎁",
  // Player on hole
  "+": "😳",
} as Record<string, string>;
