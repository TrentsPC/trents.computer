import { SUPER_MARIO_LAND } from "./roms/super-mario-land";
import { createAddressBus } from "./address-bus";
import { createLogger } from "./logger";
import { createCPU } from "./cpu";
import { onMount } from "solid-js";

const ONE_FRAME = 1_000_000 / 60;

export function createGameBoy() {
  const { logs, logger } = createLogger();

  const memory = createAddressBus();
  const cpu = createCPU({ memory, logger });

  // function loadCartridge(rom: ArrayBuffer) {
  //   const array = new Uint8Array(rom);
  //   logger.log(array.byteLength.toString(16));
  //   const gameTitle = range(0x134, 0x144)
  //     .map((i) => {
  //       return String.fromCharCode(array[i]);
  //     })
  //     .join("");
  //   logger.log(gameTitle);
  // }

  onMount(() => {
    // loadCartridge(SUPER_MARIO_LAND);
    memory.loadCartridge(SUPER_MARIO_LAND);

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
