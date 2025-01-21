import type { GameBoy } from "./gameBoy";

/**
 * 128 bytes of I/O Registers
 */
export type IORegisters = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createIORegisters(gameBoy: GameBoy): IORegisters {
  const memory = new Uint8Array(0x80);

  function read(address: number) {
    // FF44 — LY: LCD Y coordinate [read-only]
    if (address === 0x0044) {
      return gameBoy.ppu.getLCDY();
    }

    return memory[address];
  }

  // FF44 — LY: LCD Y coordinate [read-only]
  function write(address: number, value: number) {
    if (address === 0x0044) return;
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
