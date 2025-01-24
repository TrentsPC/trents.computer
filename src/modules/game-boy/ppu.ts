import type { GameBoy } from "./gameBoy";

export type PPU = {
  step: () => void;
  getLCDX: () => number;
  getLCDY: () => number;
};

export function createPPU(
  gameBoy: GameBoy,
  getCanvas: () => HTMLCanvasElement,
  isGBDoctor?: boolean
): PPU {
  let lcdX = 0;
  let lcdY = 0;

  function step() {
    lcdX++;
    if (lcdX > 455) {
      lcdX = 0;
      lcdY++;
      if (lcdY === 144) {
        renderScreen(gameBoy, getCanvas());
        gameBoy.addressBus.writeByte(
          0xff0f,
          gameBoy.addressBus.readByte(0xff0f) | 0x01
        );
      }
      if (lcdY > 153) {
        lcdY = 0;
      }
    }
  }

  function getLCDX() {
    return lcdX;
  }

  function getLCDY() {
    if (isGBDoctor) {
      return 0x90;
    }
    return lcdY;
  }

  return { step, getLCDX, getLCDY };
}
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

function renderTile(gameBoy: GameBoy, address: number) {
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

function renderTileMap(gameBoy: GameBoy) {
  const canvas = new OffscreenCanvas(256, 256);
  const ctx = canvas.getContext("2d")!;

  const tileCache = new Map<number, OffscreenCanvas>();

  function getTile(startingAddress: number) {
    if (tileCache.has(startingAddress)) {
      return tileCache.get(startingAddress)!;
    }
    const tileCanvas = renderTile(gameBoy, startingAddress);
    tileCache.set(startingAddress, tileCanvas);
    return tileCanvas;
  }

  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const address = 0x9800 + y * 32 + x;
      const tileNumber = gameBoy.addressBus.readByte(address);
      const tileAddress = 0x8000 + tileNumber * 16;
      const tileCanvas = getTile(tileAddress);
      ctx.drawImage(tileCanvas, x * 8, y * 8);
    }
  }
  return canvas;
}

function renderQuadTileMap(gameBoy: GameBoy) {
  const canvas = new OffscreenCanvas(256 * 4, 256 * 4);
  const ctx = canvas.getContext("2d")!;
  const tileMap = renderTileMap(gameBoy);
  ctx.drawImage(tileMap, 0, 0);
  ctx.drawImage(tileMap, 256, 0);
  ctx.drawImage(tileMap, 0, 256);
  ctx.drawImage(tileMap, 256, 256);
  return canvas;
}

function renderScreen(gameBoy: GameBoy, ref: HTMLCanvasElement) {
  const ctx = ref.getContext("2d")!;

  const tileMap = renderQuadTileMap(gameBoy);

  const SCY = gameBoy.addressBus.readByte(0xff42);
  const SCX = gameBoy.addressBus.readByte(0xff43);

  ctx.drawImage(tileMap, -SCX, -SCY);
}
