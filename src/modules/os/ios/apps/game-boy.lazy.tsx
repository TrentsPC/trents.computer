import { createSignal, onCleanup, onMount } from "solid-js";
import { createGameBoy } from "~/modules/game-boy/gameBoy";

export default function GameBoyComponent() {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        pt: "var(--safe-area-inset-top)",
        pb: "var(--safe-area-inset-bottom)",
        backgroundColor: "#DDDDE2",
        px: 20,
      }}
    >
      <div>
        <GameBoy />
      </div>
    </div>
  );
}

const COLOR_PALETTE = ["#a3b334", "#6B882E", "#3A6122", "#0F3810"];
const raf = async () => {
  return new Promise((resolve) => requestAnimationFrame(resolve));
};
function GameBoy() {
  let canvas: HTMLCanvasElement = undefined!;
  let gameBoy = createGameBoy({
    getCanvas: () => canvas,
    colors: COLOR_PALETTE,
  });
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
    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
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
    };

    document.addEventListener("dragover", handleDragover);
    document.addEventListener("drop", handleDrop);

    onCleanup(() => {
      document.removeEventListener("dragover", handleDragover);
      document.removeEventListener("drop", handleDrop);
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
    <div
      css={{
        padding: `${(1 / 162) * 100}%`,
        aspectRatio: 162 / 146,
        backgroundColor: "#a3b334",
        // borderRadius: 10,
      }}
    >
      <canvas
        ref={canvas}
        width={160}
        height={144}
        css={{
          background: "#a3b334",
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
