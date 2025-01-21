import type { GameBoy } from "./gameBoy";

/**
 * 4KiB of Work RAM
 */
export type WRAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createWRAM(gameBoy: GameBoy): WRAM {
  const memory = new Uint8Array(0x1000);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
