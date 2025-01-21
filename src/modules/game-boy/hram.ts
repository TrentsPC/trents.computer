import type { GameBoy } from "./gameBoy";

/**
 * 115 bytes of High RAM
 */
export type HRAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createHRAM(gameBoy: GameBoy): HRAM {
  const memory = new Uint8Array(0x73);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
