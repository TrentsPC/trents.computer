import { GameBoy } from "./gameBoy";
import { uint16 } from "./types";

export type Cartridge = {
  insertCartridge: (rom: ArrayBuffer) => void;
  readByte: (address: uint16) => number;
};

export function createCartridge(gameBoy: GameBoy): Cartridge {
  let rom = new Uint8Array(0x8000);

  function insertCartridge(cart: ArrayBuffer) {
    const array = new Uint8Array(cart);
    rom = array;
  }

  function readByte(address: uint16) {
    return rom[address] ?? 0xff;
  }

  return { insertCartridge, readByte };
}
