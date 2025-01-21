import type { GameBoy } from "./gameBoy";

export type PPU = {
  step: () => void;
  getLCDX: () => number;
  getLCDY: () => number;
};

export function createPPU(gameBoy: GameBoy): PPU {
  let lcdX = 0;
  let lcdY = 0;

  function step() {
    lcdX++;
    if (lcdX > 455) {
      lcdX = 0;
      lcdY++;
      if (lcdY === 144) {
        // V-Blank rising edge
        console.log("V-Blank");
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
    return lcdY;
  }

  return { step, getLCDX, getLCDY };
}
