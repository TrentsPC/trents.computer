import { Address } from "./addresses";
import type { GameBoy } from "./gameBoy";
import { toSigned } from "./utils";

export type PPU = {
  step: () => void;
  getLCDX: () => number;
  getLCDY: () => number;
  invalidateTileDataCache: (address: number) => void;
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
    if (lcdX === 252 && lcdY % 8 === 0 && lcdY < 144) {
      // Render the scanline

      if (lcdY === 0) {
        // Clear the screen
        clearFrame();
      }
      drawScanline();
    }
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
          gameBoy.addressBus.readByte(Address.STAT) | 0x04
        );
        // If the LYC=LY coincidence interrupt is enabled
        if (gameBoy.addressBus.readByte(Address.STAT) & 0x40) {
          gameBoy.addressBus.writeByte(
            Address.IF,
            gameBoy.addressBus.readByte(Address.IF) | 0x02
          );
        }
      } else {
        gameBoy.addressBus.writeByte(
          Address.STAT,
          gameBoy.addressBus.readByte(Address.STAT) & ~0x04
        );
      }
      if (lcdY === 144) {
        // renderScreen(gameBoy, getCanvas());
        commitFrame();
        gameBoy.addressBus.writeByte(
          0xff0f,
          gameBoy.addressBus.readByte(0xff0f) | 0x01
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
   * get cached tile data from starting address of tile
   */
  const tileDataCache = new Map<number, OffscreenCanvas>();

  const tileMap = new OffscreenCanvas(256, 256);
  const quadTileMap = new OffscreenCanvas(512, 512);

  function invalidateTileDataCache(address: number) {
    const startingAddress = address & 0xfff0;
    tileDataCache.delete(startingAddress);
  }

  function renderTile(
    gameBoy: GameBoy,
    startingAddress: number,
    transparent?: boolean
  ) {
    const canvas = new OffscreenCanvas(8, 8);
    const ctx = canvas.getContext("2d")!;
    for (let y = 0; y < 8; y++) {
      const lowByte = gameBoy.addressBus.readByte(startingAddress + y * 2);
      const highByte = gameBoy.addressBus.readByte(startingAddress + y * 2 + 1);
      for (let x = 0; x < 8; x++) {
        const lowBit = (lowByte >> (7 - x)) & 1;
        const highBit = (highByte >> (7 - x)) & 1;
        const color = lowBit + highBit * 2;

        // if (color === 0) {
        //   continue;
        // }
        ctx.fillStyle = color === 0 ? "transparent" : gameBoy.colors[color];

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
    const canvas = tileMap;
    const ctx = canvas.getContext("2d")!;

    const lcdControl = gameBoy.addressBus.readByte(0xff40);
    const addressingMode = (lcdControl & 0x10) >> 4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const address = 0x9800 + y * 32 + x;
        const tileIndex = gameBoy.addressBus.readByte(address);
        let tileAddress = 0;
        if (addressingMode) {
          tileAddress = 0x8000 + tileIndex * 16;
        } else {
          tileAddress = 0x9000 + toSigned(tileIndex) * 16;
        }
        const tileCanvas = getTile(tileAddress);
        ctx.drawImage(tileCanvas, x * 8, y * 8);
      }
    }
    return canvas;
  }

  function renderQuadTileMap(gameBoy: GameBoy) {
    const canvas = quadTileMap;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tileMap = renderTileMap(gameBoy);
    ctx.drawImage(tileMap, 0, 0);
    ctx.drawImage(tileMap, 256, 0);
    ctx.drawImage(tileMap, 0, 256);
    ctx.drawImage(tileMap, 256, 256);
    return canvas;
  }

  function drawObject(gameBoy: GameBoy, address: number) {
    // const canvas = new OffscreenCanvas(160, 144);
    // const ctx = canvas.getContext("2d")!;
    const y = gameBoy.addressBus.readByte(address);
    const x = gameBoy.addressBus.readByte(address + 1);
    const tileNumber = gameBoy.addressBus.readByte(address + 2);
    const tileAddress = 0x8000 + tileNumber * 16;

    const attributes = gameBoy.addressBus.readByte(address + 3);
    const flipX = (attributes & 0x20) !== 0;
    const flipY = (attributes & 0x40) !== 0;

    const sourceTile = getTile(tileAddress);
    // const tileCanvas = new OffscreenCanvas(8, 8);
    // const tileCtx = tileCanvas.getContext("2d")!;
    // if (flipX) {
    //   tileCtx.scale(-1, 1);
    //   tileCtx.translate(0 - tileCanvas.width, 0);
    // }
    // if (flipY) {
    //   tileCtx.scale(1, -1);
    //   tileCtx.translate(0, 0 - tileCanvas.height);
    // }

    // tileCtx.drawImage(sourceTile, 0, 0);

    // ctx.drawImage(tileCanvas, x - 8, y - 16);
    return {
      tile: sourceTile,
      x: x - 8,
      y: y - 16,
    };
  }

  let tempScreen = new OffscreenCanvas(160, 144);
  function renderScreenOffscreen(gameBoy: GameBoy) {
    const canvas = tempScreen;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tileMap = renderQuadTileMap(gameBoy);
    const SCY = gameBoy.addressBus.readByte(0xff42);
    const SCX = gameBoy.addressBus.readByte(0xff43);
    ctx.drawImage(tileMap, -SCX, -SCY);
    for (let addr = 0xfe00; addr < 0xfea0; addr += 4) {
      const { tile, x, y } = drawObject(gameBoy, addr);
      ctx.drawImage(tile, x, y);
    }
    return canvas;
  }

  function renderScreen(gameBoy: GameBoy, ref: HTMLCanvasElement) {
    const ctx = ref.getContext("2d")!;

    const tileMap = renderQuadTileMap(gameBoy);

    const SCY = gameBoy.addressBus.readByte(0xff42);
    const SCX = gameBoy.addressBus.readByte(0xff43);

    ctx.drawImage(tileMap, -SCX, -SCY);

    for (let addr = 0xfe00; addr < 0xfea0; addr += 4) {
      const { tile, x, y } = drawObject(gameBoy, addr);
      ctx.drawImage(tile, x, y);
    }
  }

  const inProgressCanvas = new OffscreenCanvas(160, 144);
  const inProgressCtx = inProgressCanvas.getContext("2d")!;

  function clearFrame() {
    inProgressCtx.clearRect(
      0,
      0,
      inProgressCtx.canvas.width,
      inProgressCtx.canvas.height
    );
  }

  function drawScanline() {
    const line = lcdY;
    const screen = renderScreenOffscreen(gameBoy);
    inProgressCtx.drawImage(screen, 0, line, 160, 8, 0, line, 160, 8);
  }

  function commitFrame() {
    const ctx = getCanvas().getContext("2d")!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(inProgressCanvas, 0, 0);
  }

  return { step, getLCDX, getLCDY, invalidateTileDataCache };
}
