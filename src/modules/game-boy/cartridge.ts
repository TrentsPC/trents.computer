import { GameBoy } from "./gameBoy";
import { uint16 } from "./types";

export type Cartridge = {
  insertCartridge: (rom: ArrayBuffer) => void;
  readByte: (address: uint16) => number;
};

export function createCartridge(gameBoy: GameBoy): Cartridge {
  const rom = new Uint8Array(0x8000);

  function insertCartridge(cart: ArrayBuffer) {
    const array = new Uint8Array(cart);
    rom.set(array.slice(0x0000, 0x8000), 0x0000);
  }

  function readByte(address: uint16) {
    return rom[address];
  }

  return { insertCartridge, readByte };
}
