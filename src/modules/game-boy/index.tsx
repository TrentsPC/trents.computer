import { For } from "solid-js";
import { createGameBoy, GameBoy } from "./gameBoy";
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
      <button
        onClick={() => {
          gameBoy.advanceFrame();
          // console.log(gameBoy.gameBoy.vram._getArray());
        }}
      >
        Step by 1 frame
      </button>
      <Terminal logs={gameBoy.logs()} />
      <VRAMMap gameBoy={gameBoy.gameBoy} />
      <AddressSpaceMap gameBoy={gameBoy.gameBoy} />
      {/* <Terminal logs={gameBoy.cpuLogs()} /> */}
    </div>
  );
}

function AddressSpaceMap({ gameBoy }: { gameBoy: GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  function render() {
    for (let i = 0; i <= 0xffff; i++) {
      const byte = gameBoy.addressBus.readByte(i);
      const x = i % 256;
      const y = Math.floor(i / 256);
      const ctx = ref.getContext("2d")!;
      if (byte === 0) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = `rgb(${byte}, ${byte}, ${byte})`;
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return (
    <div>
      <button onClick={render}>render address space</button>
      <canvas
        width="256"
        height="256"
        ref={ref}
        style={{
          "image-rendering": "pixelated",
          width: 256 * 4 + "px",
          height: 256 * 4 + "px",
        }}
      />
    </div>
  );
}

function VRAMMap({ gameBoy }: { gameBoy: GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  function render() {
    for (let i = 0; i < 0x2000; i++) {
      const address = i + 0x8000;
      const byte = gameBoy.addressBus.readByte(address);
      const x = i % 64;
      const y = Math.floor(i / 64);
      const ctx = ref.getContext("2d")!;
      if (byte === 0) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = `rgb(${byte}, ${byte}, ${byte})`;
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return (
    <div>
      <button onClick={render}>render VRAM</button>
      <canvas
        width="64"
        height="128"
        ref={ref}
        style={{
          "image-rendering": "pixelated",
          width: 64 * 4 + "px",
          height: 128 * 4 + "px",
        }}
      />
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
