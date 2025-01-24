import { createSignal, For } from "solid-js";
import { createGameBoy, GameBoy } from "./gameBoy";
import { Log } from "./logger";

const SCALE_FACTOR = 4;

function getColor(byte: number) {
  switch (byte) {
    case 0:
      return "#9CBC10";
    case 1:
      return "#8CAC0D";
    case 2:
      return "#316231";
    case 3:
      return "#0F3810";
    default:
      return "#9CBC10";
  }
}

export function GameBoyEmulator() {
  let canvas: HTMLCanvasElement = undefined!;
  const gameBoy = createGameBoy({ getCanvas: () => canvas });

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
            ref={canvas}
            width={160}
            height={144}
            css={{
              background: "white",
              width: 160 * 4,
              height: 144 * 4,
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          gameBoy.advanceFrame();
          console.log(gameBoy.logs());
        }}
      >
        Step by 1 frame
      </button>
      <button
        onClick={async () => {
          for (let i = 0; i < 10; i++) {
            gameBoy.advanceFrame();
            await raf();
          }
          console.log(gameBoy.logs());
        }}
      >
        Step by 10 frames
      </button>
      <button
        onClick={async () => {
          const initialPoint = performance.now();
          for (let i = 0; i < 60; i++) {
            gameBoy.advanceFrame();
            await raf();
          }
          const endPoint = performance.now();
          console.log(
            `Running at a blazing fast ${(
              60 /
              ((endPoint - initialPoint) / 1000)
            ).toFixed(3)}fps`
          );
          console.log(gameBoy.logs());
        }}
      >
        Step by 60 frames
      </button>
      <button
        onClick={async () => {
          const fakeCanvas = (<canvas />) as HTMLCanvasElement;
          const fakeGameBoy = createGameBoy({
            getCanvas: () => fakeCanvas,
            isGBDoctor: true,
          });
          let result = "";

          function printLn() {
            const registers = fakeGameBoy.gameBoy.cpu.getRegisters();
            const addr = fakeGameBoy.gameBoy.addressBus;
            const pc = registers.pc.get();
            const fmtByte = (byte: number, length = 2) =>
              byte.toString(16).padStart(length, "0").toUpperCase();
            result += `A:${fmtByte(registers.a.get())} `;
            result += `F:${fmtByte(registers.f.get())} `;
            result += `B:${fmtByte(registers.b.get())} `;
            result += `C:${fmtByte(registers.c.get())} `;
            result += `D:${fmtByte(registers.d.get())} `;
            result += `E:${fmtByte(registers.e.get())} `;
            result += `H:${fmtByte(registers.h.get())} `;
            result += `L:${fmtByte(registers.l.get())} `;
            result += `SP:${fmtByte(registers.sp.get(), 4)} `;
            result += `PC:${fmtByte(registers.pc.get(), 4)} `;
            result += `PCMEM:${fmtByte(addr.readByte(pc))}`;
            result += `,${fmtByte(addr.readByte(pc + 1))}`;
            result += `,${fmtByte(addr.readByte(pc + 2))}`;
            result += `,${fmtByte(addr.readByte(pc + 3))}`;
            result += "\n";
          }

          for (let frame = 0; frame < 60; frame++) {
            // One frame worth of CPU cycles
            for (let i = 0; i < 17556; i++) {
              // fakeGameBoy.advanceFrame();
              printLn();
              fakeGameBoy.gameBoy.cpu.step();
            }
            await raf();
          }
          printLn();
          console.log("DONE!");
          download("my-logs.txt", result);
        }}
      >
        GBDoctor
      </button>
      <EnabledInterrupts gameBoy={gameBoy.gameBoy} />
      {/* <Terminal logs={gameBoy.logs()} /> */}
      <TileMap gameBoy={gameBoy.gameBoy} />
      <TileData gameBoy={gameBoy.gameBoy} />
      <VRAMMap gameBoy={gameBoy.gameBoy} />
      <AddressSpaceMap gameBoy={gameBoy.gameBoy} />
      {/* <Terminal logs={gameBoy.cpuLogs()} /> */}
    </div>
  );
}

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const raf = async () => {
  return new Promise((resolve) => requestAnimationFrame(resolve));
};

function EnabledInterrupts({ gameBoy }: { gameBoy: GameBoy }) {
  const [ime, setIME] = createSignal(gameBoy.cpu.getRegisters().ime.get());
  const [enabled, setEnabled] = createSignal(
    gameBoy.addressBus.readByte(0xffff)
  );
  const [requested, setRequested] = createSignal(
    gameBoy.addressBus.readByte(0xff0f)
  );

  function update() {
    setIME(gameBoy.cpu.getRegisters().ime.get());
    setEnabled(gameBoy.addressBus.readByte(0xffff));
    setRequested(gameBoy.addressBus.readByte(0xff0f));
  }
  return (
    <div>
      <button onClick={() => update()}>update</button>
      <div>
        Master interrupts: <code>{ime() ? "TRUE" : "FALSE"}</code>
      </div>
      <div>
        enabled: <code>{enabled().toString(2).padStart(8, "0")}</code>
      </div>
      <div>
        requested: <code>{requested().toString(2).padStart(8, "0")}</code>
      </div>
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

function TileMap({ gameBoy }: { gameBoy: GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  const TILE_WIDTH = 8;
  const TILE_HEIGHT = 8;
  const TILES_PER_ROW = 32;
  const ROWS = 64;

  function renderTile(address: number) {
    const canvas = new OffscreenCanvas(8, 8);
    for (let y = 0; y < 8; y++) {
      const byte1 = gameBoy.addressBus.readByte(address + y * 2);
      const byte2 = gameBoy.addressBus.readByte(address + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const bit1 = (byte1 >> (7 - x)) & 1;
        const bit2 = (byte2 >> (7 - x)) & 1;
        const color = bit1 + bit2 * 2;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = getColor(color);

        ctx.fillRect(x, y, 1, 1);
      }
    }
    return canvas;
  }

  function render() {
    const ctx = ref.getContext("2d")!;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < TILES_PER_ROW; x++) {
        const tileIndex = y * TILES_PER_ROW + x;
        const startingAddress = 0x9800 + tileIndex;
        const tileNumber = gameBoy.addressBus.readByte(startingAddress);
        const startingAddress2 = 0x8000 + tileNumber * 0x10;

        const tileCanvas = renderTile(startingAddress2);
        ctx.drawImage(tileCanvas, x * TILE_WIDTH, y * TILE_HEIGHT);
      }
    }
    const SCY = gameBoy.addressBus.readByte(0xff42);
    const SCX = gameBoy.addressBus.readByte(0xff43);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeRect(SCX, SCY, 160, 144);
    // ctx.strokeRect(SCX - 255, SCY, 160, 144);
  }

  return (
    <div>
      <button onClick={render}>render Tile Map</button>
      <canvas
        width={TILE_WIDTH * TILES_PER_ROW}
        height={TILE_HEIGHT * ROWS}
        ref={ref}
        style={{
          "image-rendering": "pixelated",
          width: TILE_WIDTH * TILES_PER_ROW * 4 + "px",
          height: TILE_HEIGHT * ROWS * 4 + "px",
        }}
      />
    </div>
  );
}

function TileData({ gameBoy }: { gameBoy: GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  const TILE_WIDTH = 8;
  const TILE_HEIGHT = 8;
  const TILES_PER_ROW = 16;
  const TOTAL_TILES = (0x97ff - 0x8000) / 16;
  const ROWS = Math.ceil(TOTAL_TILES / TILES_PER_ROW);

  function renderTile(address: number) {
    const canvas = new OffscreenCanvas(8, 8);
    for (let y = 0; y < 8; y++) {
      const byte1 = gameBoy.addressBus.readByte(address + y * 2);
      const byte2 = gameBoy.addressBus.readByte(address + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const bit1 = (byte1 >> (7 - x)) & 1;
        const bit2 = (byte2 >> (7 - x)) & 1;
        const color = bit1 + bit2 * 2;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = getColor(color);

        ctx.fillRect(x, y, 1, 1);
      }
    }
    return canvas;
  }

  function render() {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < TILES_PER_ROW; x++) {
        const tileIndex = y * TILES_PER_ROW + x;
        if (tileIndex >= TOTAL_TILES) {
          return;
        }
        const startingAddress = 0x8000 + tileIndex * 0x10;

        const tileCanvas = renderTile(startingAddress);
        const ctx = ref.getContext("2d")!;
        ctx.drawImage(tileCanvas, x * TILE_WIDTH, y * TILE_HEIGHT);
      }
    }
  }
  return (
    <div>
      <button onClick={render}>render Tile Data</button>
      <canvas
        width={TILE_WIDTH * TILES_PER_ROW}
        height={TILE_HEIGHT * ROWS}
        ref={ref}
        style={{
          "image-rendering": "pixelated",
          width: TILE_WIDTH * TILES_PER_ROW * 4 + "px",
          height: TILE_HEIGHT * ROWS * 4 + "px",
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
