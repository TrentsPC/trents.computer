import { AddressBus } from "./address-bus";
import { Register, Registers } from "./registers";
import { toSigned } from "./utils";

export type Instruction = {
  mnemonic: string;
  opcode: number;
  length: number;
  cycles: number;
  print: (args: number[]) => string;
  execute: (args: number[]) => void;
};

export function createInstructions({
  registers,
  memory,
}: {
  registers: Registers;
  memory: AddressBus;
}) {
  const instructions: Record<number, Instruction> = {};

  function createNOP(opcode: number): Instruction {
    return {
      mnemonic: "NOP",
      print: () => "NOP",
      opcode,
      length: 1,
      cycles: 4,
      execute: () => {},
    };
  }

  function createLD16Register(
    opcode: number,
    destination: Register
  ): Instruction {
    return {
      mnemonic: `LD   ${destination.name},d16`,
      print: ([low, high]) =>
        `LD   ${destination.name} <- $0x${high
          .toString(16)
          .padStart(2, "0")}${low.toString(16).padStart(2, "0")}`,
      opcode,
      length: 3,
      cycles: 12,
      execute: ([low, high]) => {
        destination.set((high << 8) | low);
      },
    };
  }

  function createLDAddrFromRegister(
    opcode: number,
    destination: Register,
    source: Register
  ): Instruction {
    return {
      mnemonic: `LD   (${destination.name}),${source.name}`,
      print: () => `LD   (${destination.name}) <- ${source.name}`,
      opcode,
      length: 1,
      cycles: 8,
      execute: () => {
        const addr = destination.get();
        memory.write(addr, source.get());
      },
    };
  }

  function createDEC8bitRegister(
    opcode: number,
    register: Register
  ): Instruction {
    return {
      mnemonic: `DEC ${register.name}`,
      print: () => `DEC  ${register.name}`,
      opcode,
      length: 1,
      cycles: 4,
      execute: () => {
        const result = (register.get() - 1 + 256) % 256;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((result & 0xf) === 0xf);
      },
    };
  }

  function addInstruction(instruction: Instruction) {
    instructions[instruction.opcode] = instruction;
  }

  addInstruction(createNOP(0x00));
  addInstruction(createLD16Register(0x01, registers.bc));
  addInstruction(createLD16Register(0x11, registers.de));
  addInstruction(createLD16Register(0x21, registers.hl));
  addInstruction(createLD16Register(0x31, registers.sp));
  addInstruction(createLDAddrFromRegister(0x02, registers.bc, registers.a));
  addInstruction(createLDAddrFromRegister(0x12, registers.de, registers.a));
  addInstruction(createDEC8bitRegister(0x05, registers.b));
  addInstruction(createDEC8bitRegister(0x0d, registers.c));
  addInstruction(createDEC8bitRegister(0x15, registers.d));
  addInstruction(createDEC8bitRegister(0x1d, registers.e));
  addInstruction(createDEC8bitRegister(0x25, registers.h));
  addInstruction(createDEC8bitRegister(0x2d, registers.l));
  addInstruction(createDEC8bitRegister(0x3d, registers.a));

  addInstruction({
    mnemonic: "LD B,d8",
    print: ([param1]) => `LD   B <- $${param1}`,
    opcode: 0x06,
    length: 2,
    cycles: 8,
    execute: ([param]) => {
      registers.b.set(param);
    },
  });
  addInstruction({
    mnemonic: "LD C,d8",
    print: ([param1]) => `LD   C <- $${param1}`,
    opcode: 0x0e,
    length: 2,
    cycles: 8,
    execute: ([param]) => {
      registers.c.set(param);
    },
  });

  addInstruction({
    mnemonic: "JR NZ,r8",
    print: ([offset]) => `JRNZ $${toSigned(offset)}`,
    opcode: 0x20,
    length: 2,
    cycles: 8,
    execute: ([offset]) => {
      if (!registers.flagZ.get()) {
        const newPc = registers.pc.get() + toSigned(offset);
        registers.pc.set(newPc);
      }
    },
  });

  addInstruction({
    mnemonic: "LD (HL-),A",
    print: () => `LDD  &HL <- A`,
    opcode: 0x32,
    length: 1,
    cycles: 8,
    execute: () => {
      const addr = registers.hl.get();
      memory.write(addr, registers.a.get());
      registers.hl.set(addr - 1);
    },
  });
  addInstruction({
    mnemonic: "LD (HL),d8",
    print: ([param1]) => `LD   &HL <- $${param1}`,
    opcode: 0x36,
    length: 2,
    cycles: 12,
    execute: ([param]) => {
      const addr = registers.hl.get();
      memory.write(addr, param);
    },
  });
  addInstruction({
    mnemonic: "LD A,d8",
    print: ([param1]) => `LD   A <- $${param1}`,
    opcode: 0x3e,
    length: 2,
    cycles: 8,
    execute: ([param]) => {
      registers.a.set(param);
    },
  });

  addInstruction({
    mnemonic: "LD B,D",
    print: () => "LD   B <- D",
    opcode: 0x42,
    length: 1,
    cycles: 4,
    execute: () => {
      const value = memory.read(registers.d.get());
      registers.b.set(value);
    },
  });
  addInstruction({
    mnemonic: "LD B,E",
    print: () => "LD   B <- E",
    opcode: 0x43,
    length: 1,
    cycles: 4,
    execute: () => {
      const value = memory.read(registers.e.get());
      registers.b.set(value);
    },
  });

  addInstruction({
    mnemonic: "XOR A",
    print: () => "XOR  A",
    opcode: 0xaf,
    length: 1,
    cycles: 4,
    execute: () => {
      let result = registers.a.get() ^ registers.a.get();
      registers.a.set(result);

      registers.flagZ.set(result === 0);
      registers.flagN.set(false);
      registers.flagH.set(false);
      registers.flagC.set(false);
    },
  });

  addInstruction({
    mnemonic: "JP a16",
    print: ([param1, param2]) =>
      `JP   $0x${param2.toString(16).padStart(2, "0")}${param1
        .toString(16)
        .padStart(2, "0")}`,
    opcode: 0xc3,
    length: 3,
    cycles: 16,
    execute: ([low, high]) => {
      registers.pc.set((high << 8) | low);
    },
  });

  addInstruction({
    mnemonic: "LDH (a8),A",
    print: ([param1]) =>
      `LD   0xff${param1.toString(16).padStart(2, "0")} <- A`,
    opcode: 0xe0,
    length: 2,
    cycles: 12,
    execute: ([offset]) => {
      const addr = 0xff00 + offset;
      memory.write(addr, registers.a.get());
    },
  });

  addInstruction({
    mnemonic: "LDH A,(a8)",
    print: ([param1]) =>
      `LD   A <- 0xff${param1.toString(16).padStart(2, "0")}`,
    opcode: 0xf0,
    length: 2,
    cycles: 12,
    execute: ([offset]) => {
      const addr = 0xff00 + offset;
      registers.a.set(memory.read(addr));
    },
  });
  addInstruction({
    mnemonic: "DI",
    print: () => "DI",
    opcode: 0xf3,
    length: 1,
    cycles: 4,
    execute: () => {},
  });
  addInstruction({
    mnemonic: "CP d8",
    print: ([param1]) => `CP   $${param1}`,
    opcode: 0xfe,
    length: 2,
    cycles: 8,
    execute: ([param]) => {
      const value = param;
      const result = registers.a.get() - value;
      registers.flagZ.set(result === 0);
      registers.flagN.set(true);
      registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
      registers.flagC.set(registers.a.get() < value);
    },
  });

  return instructions;
}
