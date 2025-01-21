import type { GameBoy } from "./gameBoy";

/**
 * 160 bytes of Object Attribute Memory
 */
export type OAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createOAM(gameBoy: GameBoy): OAM {
  const memory = new Uint8Array(0xa0);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  return { readByte: read, writeByte: write };
}
