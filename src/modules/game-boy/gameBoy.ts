import { onMount } from "solid-js";
import { AddressBus, createAddressBus } from "./address-bus";
import { createCartridge, type Cartridge } from "./cartridge";
import { CPU, createCPU } from "./cpu";
import { createExternalRAM, ExternalRAM } from "./external-ram";
import { createIE, IE } from "./ie";
import { createIORegisters, IORegisters } from "./io-registers";
import { createLogger } from "./logger";
import { createOAM, OAM } from "./oam";
import { createPPU, PPU } from "./ppu";
import { CPU_INSTR_06_LD } from "./roms/blargg/cpu_instr_06_ld";
import { createVRAM, VRAM } from "./vram";
import { createWRAM, WRAM } from "./wram";

const ONE_FRAME = 1_000_000 / 60;

export type GameBoy = {
  cpu: CPU;
  ppu: PPU;
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

export function createGameBoy({
  getCanvas,
}: {
  getCanvas: () => HTMLCanvasElement;
}) {
  const { logs, logger } = createLogger();

  const gb = {} as GameBoy;
  const memory = createAddressBus(gb);
  gb.addressBus = memory;
  const cpu = createCPU({ gameBoy: gb, logger });
  gb.cpu = cpu;
  const ppu = createPPU(gb, getCanvas);
  gb.ppu = ppu;

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
    // cartridge.insertCartridge(SUPER_MARIO_LAND);
    cartridge.insertCartridge(CPU_INSTR_06_LD);
  });

  function advanceFrame() {
    const dotsPerFrame = 154 * 456;
    for (let i = 0; i < dotsPerFrame; i++) {
      ppu.step();
      if (i % 4 === 0) {
        cpu.step();
      }
    }
  }

  return { logs, cpuLogs: cpu.logs, gameBoy: gb, advanceFrame };
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
