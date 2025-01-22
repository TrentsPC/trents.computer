import { BOOTLOADER_ROM } from "./bootloader";
import type { GameBoy } from "./gameBoy";
import { uint16, uint8 } from "./types";

export type AddressBus = {
  readByte: (address: uint16) => uint8;
  writeByte: (address: uint16, value: uint8) => void;
};

const bootloader = new Uint8Array(BOOTLOADER_ROM);

export function createAddressBus(gameBoy: GameBoy): AddressBus {
  const memory = new Uint8Array(0x10000);

  function read(address: number) {
    if (address >= 0x0000 && address <= 0x7fff) {
      const bootRomSelector = memory[0xff50];
      if (bootRomSelector === 0) {
        const maxBootloaderAddress = bootloader.length - 1;
        if (address <= maxBootloaderAddress) {
          return bootloader[address];
        }
        // return gameBoy.cartridge.readByte(address);
      }
      return gameBoy.cartridge.readByte(address);
    }
    if (address >= 0x8000 && address <= 0x9fff) {
      return gameBoy.vram.readByte(address - 0x8000);
    }
    if (address >= 0xff00 && address <= 0xff74) {
      return gameBoy.ioRegisters.readByte(address - 0xff00);
    }
    console.log(`Read ${address.toString(16)}`);
    return memory[address];
  }

  function write(address: number, value: number) {
    if (address >= 0x0000 && address <= 0x7fff) {
      return;
    }
    if (address >= 0x8000 && address <= 0x9fff) {
      gameBoy.vram.writeByte(address - 0x8000, value);
      return;
    }
    if (address >= 0xff00 && address <= 0xff74) {
      if (address === 0xff0f) console.log("Write to IF register", value);
      return gameBoy.ioRegisters.writeByte(address - 0xff00, value);
    }
    memory[address] = value;
    console.log(`Wrote ${value.toString(16)} to ${address.toString(16)}`);
  }

  return { readByte: read, writeByte: write };
}
