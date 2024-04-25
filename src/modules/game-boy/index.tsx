import { For, createEffect } from "solid-js";
import { createGameBoy } from "./gameBoy";
import { Log } from "./logger";

const SCALE_FACTOR = 4;

export function GameBoyEmulator() {
  const gameBoy = createGameBoy();

  return (
    <div css={{ spaceY: 24 }}>
      <div
        css={{
          d: "flex",
          justifyContent: "center",
        }}
      >
        <div
          css={{
            d: "flex",
            flexDir: "column",
            width: "min-content",
            p: 16,
            bg: "#616c7a",
          }}
        >
          <canvas
            width={160 * SCALE_FACTOR}
            height={144 * SCALE_FACTOR}
            css={{ background: "white" }}
          />
        </div>
      </div>
      <Terminal logs={gameBoy.logs()} />
      <Terminal logs={gameBoy.cpuLogs()} />
    </div>
  );
}

function Terminal(props: { logs: Log[] }) {
  const getLastLine = () => {
    const logs = props.logs;
    return logs[logs.length - 1];
  };
  return (
    <div css={{ spaceY: 16 }}>
      <div
        css={{
          bg: "black",
          color: "white",
          p: 4,
          r: 4,
          w: 160 * 5,
          mx: "auto",
          fontFamily: "monospace",
          textAlign: "left",
          h: 200,
          overflowY: "scroll",
          whiteSpace: "pre-wrap",
        }}
      >
        <For each={props.logs}>{(line) => <div>{line.message}</div>}</For>
      </div>
      <div
        css={{
          bg: "black",
          color: "white",
          p: 4,
          r: 4,
          w: 160 * 5,
          mx: "auto",
          fontFamily: "monospace",
          textAlign: "left",
          overflowY: "scroll",
          whiteSpace: "pre-wrap",
        }}
      >
        <div>{getLastLine()?.message}</div>
      </div>
    </div>
  );
}
