import type { GameBoy } from "./gameBoy";
import { uint16, uint8 } from "./types";

export type AddressBus = {
  readByte: (address: uint16) => uint8;
  writeByte: (address: uint16, value: uint8) => void;
};

export function createAddressBus(gameBoy: GameBoy): AddressBus {
  const memory = new Uint8Array(0xffff);

  function read(address: number) {
    // 0xff44 = LCD Y-Coordinate
    if (address === 0xff44) {
      // pretend the screen is always vblank (148 in particular is from Super Mario Land))
      return 148;
    }
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
    // console.log(`Wrote ${value.toString(16)} to ${address.toString(16)}`);
  }

  return { readByte: read, writeByte: write };
}
