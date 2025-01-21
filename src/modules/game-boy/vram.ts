import type { GameBoy } from "./gameBoy";

/**
 * 8KiB of Video RAM
 */
export type VRAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createVRAM(gameBoy: GameBoy): VRAM {
  const memory = new Uint8Array(0x2000);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
