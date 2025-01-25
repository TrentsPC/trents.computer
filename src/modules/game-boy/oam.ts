import type { GameBoy } from "./gameBoy";

/**
 * 160 bytes of Object Attribute Memory
 */
export type OAM = {
  readByte: (address: number) => number;
  writeByte: (address: number, value: number) => void;
  dmaTransfer: (value: number) => void;
};

export function createOAM(gameBoy: GameBoy): OAM {
  const memory = new Uint8Array(0xa0);

  function read(address: number) {
    return memory[address];
  }

  function write(address: number, value: number) {
    memory[address] = value;
  }

  function dmaTransfer(value: number) {
    // console.log(`DMA transfer ${value.toString(16)}`);
    const startAddress = value << 8;
    for (let i = 0; i < 0xa0; i++) {
      memory[i] = gameBoy.addressBus.readByte(startAddress + i);
    }
  }

  return { readByte: read, writeByte: write, dmaTransfer };
}
