import { onMount } from "solid-js";
import { AddressBus, createAddressBus } from "./address-bus";
import { createCartridge, type Cartridge } from "./cartridge";
import { CPU, createCPU } from "./cpu";
import { createExternalRAM, ExternalRAM } from "./external-ram";
import { createIE, IE } from "./ie";
import { createIORegisters, IORegisters } from "./io-registers";
import { createLogger } from "./logger";
import { createOAM, OAM } from "./oam";
import { SUPER_MARIO_LAND } from "./roms/super-mario-land";
import { createVRAM, VRAM } from "./vram";
import { createWRAM, WRAM } from "./wram";

const ONE_FRAME = 1_000_000 / 60;

export type GameBoy = {
  cpu: CPU;
  addressBus: AddressBus;
  cartridge: Cartridge;
  vram: VRAM;
  externalRAM: ExternalRAM;
  wram0: WRAM;
  wram1: WRAM;
  oam: OAM;
  ioRegisters: IORegisters;
  ie: IE;
};

export function createGameBoy() {
  const { logs, logger } = createLogger();

  const gb = {} as GameBoy;
  const memory = createAddressBus(gb);
  gb.addressBus = memory;
  const cpu = createCPU({ gameBoy: gb, logger });
  gb.cpu = cpu;

  // Memory map
  const cartridge = createCartridge(gb);
  gb.cartridge = cartridge;
  const vram = createVRAM(gb);
  gb.vram = vram;
  const externalRam = createExternalRAM(gb);
  gb.externalRAM = externalRam;
  const workRam0 = createWRAM(gb);
  gb.wram0 = workRam0;
  const workRam1 = createWRAM(gb);
  gb.wram1 = workRam1;
  const oam = createOAM(gb);
  gb.oam = oam;
  const io = createIORegisters(gb);
  gb.ioRegisters = io;
  const ie = createIE(gb);
  gb.ie = ie;

  onMount(() => {
    // loadCartridge(SUPER_MARIO_LAND);
    cartridge.insertCartridge(SUPER_MARIO_LAND);

    for (let i = 0; i < ONE_FRAME * 10; i++) {
      let res = cpu.step();
      if (res === false) {
        break;
      }
    }
  });
  return { logs, cpuLogs: cpu.logs };
}

function range(start: number, end: number, step = 1) {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
}
