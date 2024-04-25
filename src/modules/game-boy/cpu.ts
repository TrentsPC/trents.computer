import { Logger, createLogger } from "./logger";
import { AddressBus } from "./address-bus";
import { Registers, createRegisters } from "./registers";
import { createInstructions } from "./instructions";

export function createCPU({
  memory,
  logger,
}: {
  memory: AddressBus;
  logger: Logger;
}) {
  const registers = createRegisters();

  const instructions = createInstructions({ registers, memory });

  function step(): boolean | void {
    const opcode = memory.read(registers.pc.get());
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
      args.push(memory.read(registers.pc.get() + i));
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
