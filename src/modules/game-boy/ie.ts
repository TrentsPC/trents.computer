import type { GameBoy } from "./gameBoy";

/**
 * Interrupt Enable Register
 */
export type IE = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createIE(gameBoy: GameBoy): IE {
  const memory = new Uint8Array(0x80);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
