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
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
