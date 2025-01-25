import type { GameBoy } from "./gameBoy";
import { createJoypad } from "./joypad";

/**
 * 128 bytes of I/O Registers
 */
export type IORegisters = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
};

export function createIORegisters(gameBoy: GameBoy): IORegisters {
  const memory = new Uint8Array(0x80);
  const joypad = createJoypad(gameBoy);

  function read(address: number) {
    // FF00 — P1/JOYP: Joypad [R/W]
    if (address === 0xff00) {
      return joypad.readByte();
    }
    // FF44 — LY: LCD Y coordinate [read-only]
    if (address === 0xff44) {
      return gameBoy.ppu.getLCDY();
    }

    return memory[address - 0xff00];
  }

  // FF44 — LY: LCD Y coordinate [read-only]
  function write(address: number, value: number) {
    if (address === 0xff00) {
      joypad.writeByte(value);
      return;
    }
    if (address === 0xff44) return;
    // if (address === 0x0045) console.log("Write to LYC", value.toString(16));
    memory[address - 0xff00] = value;
  }

  return { readByte: read, writeByte: write };
}
