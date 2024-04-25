export function createAddressBus() {
  const memory = new Uint8Array(0xffff);

  function loadCartridge(rom: ArrayBuffer) {
    const array = new Uint8Array(rom);
    memory.set(array.slice(0x0000, 0x8000), 0x0000);
  }

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

  return { loadCartridge, read: read, write: write };
}

export type AddressBus = ReturnType<typeof createAddressBus>;
