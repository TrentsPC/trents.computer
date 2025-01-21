import { Accessor } from "solid-js";
import type { GameBoy } from "./gameBoy";
import { createInstructions } from "./instructions";
import { Log, Logger } from "./logger";
import { createRegisters } from "./registers";

export type CPU = {
  step: () => boolean | void;
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

  function step(): boolean | void {
    const opcode = gameBoy.addressBus.readByte(registers.pc.get());
    const instruction = instructions[opcode];
    if (!instruction) {
      console.log(
        `Unknown opcode ${opcode
          .toString(16)
          .padStart(2, "0")} at ${registers.pc.get().toString(16)}`
      );
      return false;
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
  }

  return { step, logs: registers.logs };
}
