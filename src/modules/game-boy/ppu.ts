import { Address } from "./addresses";
import type { GameBoy } from "./gameBoy";

export type PPU = {
  step: () => void;
  getLCDX: () => number;
  getLCDY: () => number;
  invalidateTileDataCache: (address: number) => void;
};

export function createPPU(
  gameBoy: GameBoy,
  getCanvas: () => HTMLCanvasElement,
  isGBDoctor?: boolean,
): PPU {
  let lcdX = 0;
  let lcdY = 0;

  function step() {
    lcdX++;
    if (lcdX > 455) {
      lcdX = 0;
      lcdY++;
      if (lcdY > 153) {
        lcdY = 0;
      }
      const lyc = gameBoy.addressBus.readByte(Address.LYC);
      if (lcdY === lyc) {
        gameBoy.addressBus.writeByte(
          Address.STAT,
          gameBoy.addressBus.readByte(Address.STAT) | 0x04,
        );
        // If the LYC=LY coincidence interrupt is enabled
        if (gameBoy.addressBus.readByte(Address.STAT) & 0x40) {
          gameBoy.addressBus.writeByte(
            Address.IF,
            gameBoy.addressBus.readByte(Address.IF) | 0x02,
          );
        }
      } else {
        gameBoy.addressBus.writeByte(
          Address.STAT,
          gameBoy.addressBus.readByte(Address.STAT) & ~0x04,
        );
      }
      if (lcdY === 144) {
        renderScreen(gameBoy, getCanvas());
        gameBoy.addressBus.writeByte(
          0xff0f,
          gameBoy.addressBus.readByte(0xff0f) | 0x01,
        );
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

  // UH OH RENDERING STUFF

  /**
   * get cached tile data from starating address of tile
   */
  const tileDataCache = new Map<number, OffscreenCanvas>();

  function invalidateTileDataCache(address: number) {
    const startingAddress = address & 0xfff0;
    tileDataCache.delete(startingAddress);
  }

  function renderTile(gameBoy: GameBoy, startingAddress: number) {
    const canvas = new OffscreenCanvas(8, 8);
    const ctx = canvas.getContext("2d")!;
    for (let y = 0; y < 8; y++) {
      const lowByte = gameBoy.addressBus.readByte(startingAddress + y * 2);
      const highByte = gameBoy.addressBus.readByte(startingAddress + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const lowBit = (lowByte >> (7 - x)) & 1;
        const highBit = (highByte >> (7 - x)) & 1;
        const color = lowBit + highBit * 2;

        const [r, g, b] = gameBoy.getColor(color);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        ctx.fillRect(x, y, 1, 1);
      }
    }
    return canvas;
  }

  function getTile(startingAddress: number) {
    if (tileDataCache.has(startingAddress)) {
      return tileDataCache.get(startingAddress)!;
    }
    const tileCanvas = renderTile(gameBoy, startingAddress);
    tileDataCache.set(startingAddress, tileCanvas);
    return tileCanvas;
  }

  function renderTileMap(gameBoy: GameBoy) {
    const canvas = new OffscreenCanvas(256, 256);
    const ctx = canvas.getContext("2d")!;

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

  function drawObject(gameBoy: GameBoy, address: number) {
    const canvas = new OffscreenCanvas(160, 144);
    const ctx = canvas.getContext("2d")!;
    const y = gameBoy.addressBus.readByte(address);
    const x = gameBoy.addressBus.readByte(address + 1);
    const tileNumber = gameBoy.addressBus.readByte(address + 2);
    // const attributes = gameBoy.addressBus.readByte(address + 3);
    const tileAddress = 0x8000 + tileNumber * 16;
    const tileCanvas = renderTile(gameBoy, tileAddress);
    ctx.drawImage(tileCanvas, x - 8, y - 16);
    // ctx.fillStyle = "red";
    // ctx.fillRect(x - 8, y - 16, 8, 9);
    return canvas;
  }

  function renderScreen(gameBoy: GameBoy, ref: HTMLCanvasElement) {
    const ctx = ref.getContext("2d")!;

    const tileMap = renderQuadTileMap(gameBoy);

    const SCY = gameBoy.addressBus.readByte(0xff42);
    const SCX = gameBoy.addressBus.readByte(0xff43);

    ctx.drawImage(tileMap, -SCX, -SCY);

    for (let addr = 0xfe00; addr < 0xfea0; addr += 4) {
      const canvas = drawObject(gameBoy, addr);
      ctx.drawImage(canvas, 0, 0);
    }
  }

  return { step, getLCDX, getLCDY, invalidateTileDataCache };
}
