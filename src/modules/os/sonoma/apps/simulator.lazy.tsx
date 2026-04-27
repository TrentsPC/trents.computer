import { createSignal, JSX, onCleanup, onMount, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Frame, FrameDragArea } from "~/modules/desktop-environment";
import { FrameContextType } from "~/modules/desktop-environment/frame";
import { createGameBoy } from "~/modules/game-boy/gameBoy";
import "~/modules/zork";
import { useSquircle } from "~/utils/squircle";
import { MacOSWindowProps, TrafficLights } from "../../base-windows/MacOSWindow";
import { OSContext, useMenuBar } from "../provider";

const TOOLBAR_HEIGHT = 52;

type Device = {
  id: string;
  title: string;
  width: number;
  height: number;
  component: () => JSX.Element;
};

const IPHONE: Device = {
  id: "iphone-16",
  title: "iPhone 16",
  width: 393,
  height: 852,
  component: IPhone,
};

const GAME_BOY: Device = {
  id: "game-boy",
  title: "Game Boy",
  width: (160 + 2) * 3,
  height: (144 + 2) * 3,
  component: GameBoy,
};

const DEVICES: Device[] = [IPHONE, GAME_BOY];

export function SimulatorWindow(props: MacOSWindowProps) {
  const { closeApplication } = useContext(OSContext);
  const [activeDeviceId, setActiveDeviceId] = createSignal("iphone-16");
  const activeDevice = () => DEVICES.find((device) => device.id === activeDeviceId())!;
  const ActiveDeviceComponent = () => activeDevice().component;
  let ref: FrameContextType;

  useMenuBar("simulator", () => [
    {
      title: "Simulator",
      items: [
        {
          label: "Quit Simulator",
          action: () => {
            closeApplication("simulator");
          },
        },
      ],
    },
    {
      title: "File",
      items: [
        {
          label: "Open Simulator",
          submenu: [
            {
              label: "iPhone 16",
              action: () => {
                const { setRect, rect } = ref;
                setActiveDeviceId(IPHONE.id);
                setRect({
                  width: IPHONE.width,
                  height: IPHONE.height + TOOLBAR_HEIGHT,
                  x: rect().x,
                  y: rect().y,
                });
              },
            },
            {
              label: "Game Boy",
              action: () => {
                const { setRect, rect } = ref;
                setActiveDeviceId(GAME_BOY.id);
                setRect({
                  width: GAME_BOY.width,
                  height: GAME_BOY.height + TOOLBAR_HEIGHT,
                  x: rect().x,
                  y: rect().y,
                });
              },
            },
          ],
        },
      ],
    },
  ]);

  return (
    <Frame
      initialHeight={activeDevice().height + TOOLBAR_HEIGHT + 20}
      initialWidth={activeDevice().width}
      ref={(v) => (ref = v)}
    >
      <FrameDragArea
        css={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#202020",
          borderRadius: 10,
          color: "rgba(255, 255, 255, 0.85)",
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
          filter:
            "drop-shadow(0px 36px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.4))",
        }}
      >
        <div css={{ padding: 20 }}>
          <TrafficLights applicationId="simulator" />
        </div>
        {activeDevice().title}
      </FrameDragArea>
      <div css={{ height: 20 }} />

      <div
        css={{
          filter:
            "drop-shadow(0px 36px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.4))",
        }}
      >
        <Dynamic component={ActiveDeviceComponent()} />
      </div>
    </Frame>
  );
}

function IPhone() {
  return (
    <div
      ref={useSquircle()}
      css={{
        backgroundColor: "black",
        borderRadius: 55,
        position: "relative",
      }}
      style={{
        width: 393 + "px",
        height: 852 + "px",
      }}
    >
      <iframe
        css={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        src="/os/ios"
      />
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
        padding: 1 * 3,
        backgroundColor: "#a3b334",
        borderRadius: 10,
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
    </div>
  );
}
