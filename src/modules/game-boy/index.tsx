import { createSignal, For, Show } from "solid-js";
import { createGameBoy, GameBoy } from "./gameBoy";
import { Log } from "./logger";
import { CPU_INSTR } from "./roms/blargg/cpu_instr";
import { CPU_INSTR_01_SPECIAL } from "./roms/blargg/cpu_instr_01_special";
import { CPU_INSTR_02_INTERRUPTS } from "./roms/blargg/cpu_instr_02_interrupts";
import { CPU_INSTR_03_SP_HL } from "./roms/blargg/cpu_instr_03_sp_hl";
import { CPU_INSTR_04_R_IMM } from "./roms/blargg/cpu_instr_04_r_imm";
import { CPU_INSTR_05_RP } from "./roms/blargg/cpu_instr_05_rp";
import { CPU_INSTR_06_LD } from "./roms/blargg/cpu_instr_06_ld";
import { CPU_INSTR_07_JP } from "./roms/blargg/cpu_instr_07_JP";
import { CPU_INSTR_08_MISC } from "./roms/blargg/cpu_instr_08_MISC";
import { CPU_INSTR_09_r_r } from "./roms/blargg/cpu_instr_09_r_r";
import { CPU_INSTR_10_BIT } from "./roms/blargg/cpu_instr_10_bit";
import { CPU_INSTR_11_A_HL } from "./roms/blargg/cpu_instr_11_A_HL";
import { SUPER_MARIO_LAND } from "./roms/super-mario-land";
import { TETRIS } from "./roms/tetris";

const SCALE_FACTOR = 4;

function getColor(byte: number): [number, number, number] {
  switch (byte) {
    case 0:
      return [163, 179, 52];
    // return "#a3b334";
    case 1:
      return [107, 136, 46];
    // return "#6B882E";
    case 2:
      return [58, 97, 34];
    // return "#3A6122";
    case 3:
      return [15, 56, 16];
    // return "#0F3810";
    default:
      return [163, 179, 52];
    // return "#a3b334";
  }
}

export function GameBoyEmulator() {
  let canvas: HTMLCanvasElement = undefined!;
  const gameBoy = createGameBoy({ getCanvas: () => canvas, getColor });
  gameBoy.gameBoy.addressBus.writeByte(0xff50, 1);
  gameBoy.gameBoy.addressBus.writeByte(0xffff, 0x00);
  gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
  const [fps, setFPS] = createSignal(0);
  const [running, setRunning] = createSignal(false);

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
            padding: 22 * 4,
            borderRadius: 10 * 4,
            backgroundColor: "#dcdce2",
          }}
        >
          <div
            css={{
              d: "flex",
              flexDir: "column",
              width: "min-content",
              px: 48 * 4,
              py: 24 * 4,
              borderRadius: 10 * 4,
              bg: "#928EA3",
              borderBottomRightRadius: `${40 * 4}px ${35 * 4}px`,
            }}
          >
            <div
              css={{
                padding: 2 * 4,
                backgroundColor: "#a3b334",
                position: "relative",
              }}
            >
              <canvas
                ref={canvas}
                width={160}
                height={144}
                css={{
                  background: "#a3b334",
                  width: 160 * 4,
                  height: 144 * 4,
                  imageRendering: "pixelated",
                }}
              />
              <div css={{ position: "absolute", top: "100%", left: 0, pt: 8 }}>
                FPS: {fps().toFixed()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div css={{ spaceX: 10 }}>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          full test (needs rom bank switching)
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_01_SPECIAL);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 1
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_02_INTERRUPTS);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 2
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_03_SP_HL);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 3
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_04_R_IMM);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 4
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_05_RP);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 5
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_06_LD);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 6
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_07_JP);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 7
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_08_MISC);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 8
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_09_r_r);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 9
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_10_BIT);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 10
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_11_A_HL);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          test 11
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(TETRIS);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          Tetris
        </button>
        <button
          onClick={() => {
            gameBoy.gameBoy.cartridge.insertCartridge(SUPER_MARIO_LAND);
            gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
          }}
        >
          Super Mario Land
        </button>
      </div>
      <div css={{ spaceX: 10 }}>
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
            const fps = 60 / ((endPoint - initialPoint) / 1000);
            setFPS(fps);
          }}
        >
          Step by 60 frames
        </button>
        <button
          onClick={async () => {
            setRunning(true);
            while (running()) {
              const initialPoint = performance.now();
              for (let i = 0; i < 60; i++) {
                gameBoy.advanceFrame();
                await raf();
              }
              const endPoint = performance.now();
              const fps = 60 / ((endPoint - initialPoint) / 1000);
              setFPS(fps);
            }
          }}
        >
          Run forever
        </button>
        <Show when={running()}>
          <button onClick={() => setRunning(false)}>stop</button>
        </Show>
        <button
          onClick={async () => {
            const fakeCanvas = (<canvas />) as HTMLCanvasElement;
            const fakeGameBoy = createGameBoy({
              getCanvas: () => fakeCanvas,
              isGBDoctor: true,
              getColor,
            });
            fakeGameBoy.gameBoy.cartridge.insertCartridge(CPU_INSTR_09_r_r);
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

            for (let seconds = 0; seconds < 3; seconds++) {
              for (let frame = 0; frame < 60; frame++) {
                // One frame worth of CPU cycles
                for (let i = 0; i < 17556; i++) {
                  // fakeGameBoy.advanceFrame();
                  printLn();
                  fakeGameBoy.gameBoy.cpu.step();
                }
                await raf();
              }
            }
            printLn();
            console.log("DONE!");
            download("my-logs.txt", result);
          }}
        >
          GBDoctor
        </button>
      </div>
      <EnabledInterrupts gameBoy={gameBoy.gameBoy} />
      <OAMMap gameBoy={gameBoy.gameBoy} />
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
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
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
    gameBoy.addressBus.readByte(0xffff),
  );
  const [requested, setRequested] = createSignal(
    gameBoy.addressBus.readByte(0xff0f),
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

function OAMMap({ gameBoy }: { gameBoy: GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  function render() {
    for (let i = 0; i <= 0x9f; i++) {
      const byte = gameBoy.addressBus.readByte(0xfe00 + i);
      const x = i % 4;
      const y = Math.floor(i / 4);
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
      <button onClick={render}>render OAM</button>
      <canvas
        width="4"
        height="40"
        ref={ref}
        style={{
          "image-rendering": "pixelated",
          width: 4 * 4 + "px",
          height: 40 * 4 + "px",
        }}
      />
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

        const [r, g, b] = gameBoy.getColor(color);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

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

        const [r, g, b] = gameBoy.getColor(color);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

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
