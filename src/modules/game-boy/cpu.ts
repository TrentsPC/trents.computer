import { Accessor } from "solid-js";
import type { GameBoy } from "./gameBoy";
import { createInstructions } from "./instructions";
import { Log, Logger } from "./logger";
import { createRegisters } from "./registers";

export type CPU = {
  /**
   * Execute the next instruction and return the number of cycles it should take
   */
  step: () => void;
  logs: Accessor<Log[]>;
};

export function createCPU({
  gameBoy,
  logger,
}: {
  gameBoy: GameBoy;
  logger: Logger;
}): CPU {
  const registers = createRegisters();

  const instructions = createInstructions({
    registers,
    memory: gameBoy.addressBus,
  });

  let cpuCooldown = 0;

  function step() {
    // If the CPU is "in the middle of an instruction", we need to wait
    if (cpuCooldown > 0) {
      cpuCooldown--;
      return;
    }

    // check for interrupts
    if (registers.ime.get()) {
      const enabledFlags = gameBoy.addressBus.readByte(0xffff);
      const requestedFlags = gameBoy.addressBus.readByte(0xff0f);
      const interruptFlags = enabledFlags & requestedFlags;
      // console.log({
      //   enabledFlags: enabledFlags.toString(2),
      //   requestedFlags: requestedFlags.toString(2),
      //   // interruptFlags,
      // });
      if (interruptFlags) {
        console.log("Interrupt!", interruptFlags.toString(2));
        for (let i = 0; i < 5; i++) {
          if (interruptFlags & (1 << i)) {
            registers.ime.set(0);
            gameBoy.addressBus.writeByte(0xff0f, requestedFlags & ~(1 << i));
            console.log(registers.sp.get().toString(16));
            // registers.sp.set(registers.sp.get() - 2);
            // gameBoy.addressBus.writeByte(registers.sp.get(), registers.pc.get());
            registers.pc.set(0x40 + i * 8);
            cpuCooldown = 4;
            return;
          }
        }
      }
    }

    // fetch and excute the next instruction
    const opcode = gameBoy.addressBus.readByte(registers.pc.get());
    const instruction = instructions[opcode];
    if (!instruction) {
      throw new Error(
        `Unknown opcode ${opcode
          .toString(16)
          .padStart(2, "0")} at ${registers.pc.get().toString(16)}`
      );
    }
    const args = [];
    for (let i = 1; i < instruction.length; i++) {
      args.push(gameBoy.addressBus.readByte(registers.pc.get() + i));
    }
    logger.log(
      registers.pc.get().toString(16).padStart(4, "0") +
        ": " +
        instruction.print(args)
    );
    registers.pc.set(registers.pc.get() + instruction.length);
    instruction.execute(args);
    cpuCooldown = instruction.cycles - 1;
  }

  return { step, logs: registers.logs };
}
