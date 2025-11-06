import { createSignal, onMount, Show } from "solid-js";
import { createGameBoy, GameBoy } from "./gameBoy";
import { CPU_INSTR } from "./roms/blargg/cpu_instr";
import dmgAcid from "./roms/dmg-acid2.gb?url";
import { POKEMON_RED } from "./roms/pokemon-red";
import prehistorikMan from "./roms/prehistorik-man.gb?url";
import { SUPER_MARIO_LAND } from "./roms/super-mario-land";
import { TETRIS } from "./roms/tetris";

const COLOR_PALETTE = ["#a3b334", "#6B882E", "#3A6122", "#0F3810"];

export function GameBoyEmulator() {
  let canvas: HTMLCanvasElement = undefined!;
  let gameBoy = createGameBoy({
    getCanvas: () => canvas,
    colors: COLOR_PALETTE,
  });
  gameBoy.gameBoy.cartridge.insertCartridge(TETRIS);
  gameBoy.gameBoy.cpu.getRegisters().pc.set(0x0000);
  // gameBoy.gameBoy.addressBus.writeByte(0xff50, 1);
  // gameBoy.gameBoy.addressBus.writeByte(0xffff, 0x00);
  // gameBoy.gameBoy.cpu.getRegisters().pc.set(0x100);
  const [fps, setFPS] = createSignal(0);
  const [running, setRunning] = createSignal(false);

  async function runForever() {
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
  }

  onMount(() => {
    document.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (!files) return;
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const buffer = e.target?.result;
        gameBoy = createGameBoy({
          getCanvas: () => canvas,
          colors: COLOR_PALETTE,
        });
        gameBoy.gameBoy.cartridge.insertCartridge(buffer as ArrayBuffer);
        gameBoy.gameBoy.cpu.getRegisters().pc.set(0x0000);
        runForever();
      };
      reader.readAsArrayBuffer(file);
    });
  });

  function restartWithRom(rom: ArrayBuffer) {
    gameBoy = createGameBoy({
      getCanvas: () => canvas,
      colors: COLOR_PALETTE,
    });
    gameBoy.gameBoy.cartridge.insertCartridge(rom);
    gameBoy.gameBoy.cpu.getRegisters().pc.set(0x0000);
    runForever();
  }

  return (
    <div css={{}}>
      <div
        css={{
          d: "flex",
          justifyContent: "center",
          pb: 48,
        }}
      >
        <div
          css={{
            padding: 1 * 3,
            backgroundColor: "#a3b334",

            width: 162 * 3,
            height: 146 * 3,
            position: "relative",
          }}
        >
          <canvas
            ref={canvas}
            width={160}
            height={144}
            css={{
              background: "#a3b334",
              width: 160 * 3,
              height: 144 * 3,
              imageRendering: "pixelated",
            }}
          />
          <div css={{ position: "absolute", top: "100%", right: 0, pt: 8 }}>
            FPS: {fps().toFixed()}
          </div>
        </div>
      </div>
      <p css={{ textAlign: "center", pb: 12 }}>
        WASD {"->"} arrows
        <br />Z / X {"->"} A / B<br /> Shift {"->"} Select
        <br /> Enter {"->"} Start
      </p>
      <p css={{ textAlign: "center", pb: 12 }}>
        This runs best in Firefox. Like, significantly faster than other engines
        (on mac at least).
      </p>

      <p css={{ textAlign: "center", pb: 12 }}>
        Drag and drop your own .gb files onto the screen to load them, or use
        the buttons below to load a few examples.
      </p>
      <div css={{ spaceX: 10, display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            restartWithRom(TETRIS);
          }}
        >
          Tetris
        </button>
        <button
          onClick={() => {
            restartWithRom(SUPER_MARIO_LAND);
          }}
        >
          Super Mario Land
        </button>
        <button
          onClick={() => {
            restartWithRom(POKEMON_RED);
          }}
        >
          Pokemon Red
        </button>
        <button
          onClick={() => {
            fetch(prehistorikMan)
              .then((res) => res.arrayBuffer())
              .then(restartWithRom);
          }}
        >
          Prehistorik Man
        </button>
      </div>
      <div css={{ spaceX: 10, display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            restartWithRom(CPU_INSTR);
          }}
        >
          Blargg Test ROM
        </button>
        <button
          onClick={() => {
            fetch(dmgAcid)
              .then((res) => res.arrayBuffer())
              .then(restartWithRom);
          }}
        >
          DMG Acid Test ROM
        </button>
      </div>
      <details>
        <summary>Shitty Devtools</summary>

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
        </div>
        <EnabledInterrupts gameBoy={gameBoy.gameBoy} />
        <OAMMap gameBoy={() => gameBoy.gameBoy} />
        <TileMap gameBoy={() => gameBoy.gameBoy} />
        <TileData gameBoy={() => gameBoy.gameBoy} />
      </details>
    </div>
  );
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

function OAMMap({ gameBoy }: { gameBoy: () => GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  function render() {
    for (let i = 0; i <= 0x9f; i++) {
      const byte = gameBoy().addressBus.readByte(0xfe00 + i);
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

function TileMap({ gameBoy }: { gameBoy: () => GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  const TILE_WIDTH = 8;
  const TILE_HEIGHT = 8;
  const TILES_PER_ROW = 32;
  const ROWS = 64;

  function renderTile(address: number) {
    const canvas = new OffscreenCanvas(8, 8);
    for (let y = 0; y < 8; y++) {
      const byte1 = gameBoy().addressBus.readByte(address + y * 2);
      const byte2 = gameBoy().addressBus.readByte(address + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const bit1 = (byte1 >> (7 - x)) & 1;
        const bit2 = (byte2 >> (7 - x)) & 1;
        const color = bit1 + bit2 * 2;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = gameBoy().colors[color];

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
        const tileNumber = gameBoy().addressBus.readByte(startingAddress);
        const startingAddress2 = 0x8000 + tileNumber * 0x10;

        const tileCanvas = renderTile(startingAddress2);
        ctx.drawImage(tileCanvas, x * TILE_WIDTH, y * TILE_HEIGHT);
      }
    }
    const SCY = gameBoy().addressBus.readByte(0xff42);
    const SCX = gameBoy().addressBus.readByte(0xff43);
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

function TileData({ gameBoy }: { gameBoy: () => GameBoy }) {
  let ref: HTMLCanvasElement = undefined!;

  const TILE_WIDTH = 8;
  const TILE_HEIGHT = 8;
  const TILES_PER_ROW = 16;
  const TOTAL_TILES = (0x97ff - 0x8000) / 16;
  const ROWS = Math.ceil(TOTAL_TILES / TILES_PER_ROW);

  function renderTile(address: number) {
    const canvas = new OffscreenCanvas(8, 8);
    for (let y = 0; y < 8; y++) {
      const byte1 = gameBoy().addressBus.readByte(address + y * 2);
      const byte2 = gameBoy().addressBus.readByte(address + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const bit1 = (byte1 >> (7 - x)) & 1;
        const bit2 = (byte2 >> (7 - x)) & 1;
        const color = bit1 + bit2 * 2;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = gameBoy().colors[color];

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
