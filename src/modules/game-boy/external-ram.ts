import type { GameBoy } from "./gameBoy";

/**
 * 8KiB of Cartridge RAM
 */
export type ExternalRAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createExternalRAM(gameBoy: GameBoy): ExternalRAM {
  const memory = new Uint8Array(0x2000);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
