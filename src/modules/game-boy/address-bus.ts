import { Address } from "./addresses";
import { BOOTLOADER_ROM } from "./bootloader";
import type { GameBoy } from "./gameBoy";
import { uint16, uint8 } from "./types";

export type AddressBus = {
  readByte: (address: uint16, quiet?: boolean) => uint8;
  writeByte: (address: uint16, value: uint8, quiet?: boolean) => void;
};

const bootloader = new Uint8Array(BOOTLOADER_ROM);

/**
 * Also called the Memory Management Unit, apparently.
 */
export function createAddressBus(gameBoy: GameBoy): AddressBus {
  const memory = new Uint8Array(0x10000);
  let memoryBank = 1;

  function read(address: number, quiet = false) {
    if (address >= 0x0000 && address <= 0x3fff) {
      const bootRomSelector = read(0xff50);
      if (bootRomSelector === 0) {
        const maxBootloaderAddress = bootloader.length - 1;
        if (address <= maxBootloaderAddress) {
          return bootloader[address];
        }
      }
      return gameBoy.cartridge.readByte(address);
    }
    if (address >= 0x4000 && address <= 0x7fff) {
      const adjustedAddress = address - 0x4000 + memoryBank * 0x4000;
      return gameBoy.cartridge.readByte(adjustedAddress);
    }
    if (address >= 0x8000 && address <= 0x9fff) {
      return gameBoy.vram.readByte(address - 0x8000);
    }
    if (address >= 0xfe00 && address <= 0xfe9f) {
      return gameBoy.oam.readByte(address - 0xfe00);
    }
    if (address >= 0xff00 && address <= 0xff74) {
      return gameBoy.ioRegisters.readByte(address);
    }
    // if (!quiet) console.log(`Read ${address.toString(16)}`);
    return memory[address] ?? 0xff;
  }

  function write(address: number, value: number, quiet = false) {
    if (address >= 0x0000 && address <= 0x7fff) {
      if (address >= 0x2000 && address <= 0x3fff) {
        memoryBank = value & 0b00011111;
      }
      return;
    }
    if (address >= 0x8000 && address <= 0x9fff) {
      gameBoy.vram.writeByte(address - 0x8000, value);
      return;
    }
    if (address >= 0xfe00 && address <= 0xfe9f) {
      gameBoy.oam.writeByte(address - 0xfe00, value);
      return;
    }
    if (address >= 0xff00 && address <= 0xff74) {
      // if (address === 0xff41)
      // console.log("Write to STAT", value.toString(2).padStart(8, "0"));
      if (address === Address.DMA) {
        gameBoy.oam.dmaTransfer(value);
        // return;
      }
      return gameBoy.ioRegisters.writeByte(address, value);
    }
    if (address === 0xffff) {
      console.log(`Write to IE ${value.toString(2)}`);
    }
    memory[address] = value;
    if (!quiet) {
      // console.log(`Wrote ${value.toString(16)} to ${address.toString(16)}`);
    }
  }

  return { readByte: read, writeByte: write };
}
