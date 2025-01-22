import { AddressBus } from "./address-bus";
import { Register, Registers } from "./registers";
import { toSigned } from "./utils";

export type Instruction = {
  mnemonic: string;
  opcode: number;
  length: number;
  cycles: number | ((args: number[]) => number);
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
  const prefixedInstructions = createPrefixedInstructions({
    registers,
    memory,
  });

  function registerADD_A_hl(opcode: number) {
    registerInstruction({
      mnemonic: "ADD A,[HL]",
      print: () => "ADD A,[HL]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const value = memory.readByte(registers.hl.get());
        const result = registers.a.get() + value;
        registers.a.set(result % 256);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set((registers.a.get() & 0xf) + (value & 0xf) > 0xf);
        registers.flagC.set(result > 0xff);
      },
    });
  }
  function register_CALL_n16(opcode: number) {
    registerInstruction({
      mnemonic: "CALL a16",
      print: ([low, high]) =>
        `CALL $0x${high.toString(16).padStart(2, "0")}${low
          .toString(16)
          .padStart(2, "0")}`,
      opcode,
      length: 3,
      cycles: 6,
      execute: ([low, high]) => {
        const addr = (high << 8) | low;
        registers.sp.set(registers.sp.get() - 1);
        memory.writeByte(registers.sp.get(), (registers.pc.get() >> 8) & 0xff);
        registers.sp.set(registers.sp.get() - 1);
        memory.writeByte(registers.sp.get(), registers.pc.get() & 0xff);
        registers.pc.set(addr);
      },
    });
  }
  function registerCP_HL(opcode: number) {
    registerInstruction({
      mnemonic: "CP A,[HL]",
      print: () => "CP A,[HL]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const value = memory.readByte(registers.hl.get());
        const result = registers.a.get() - value;
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
        registers.flagC.set(registers.a.get() < value);
      },
    });
  }

  function registerINC_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `INC ${register.name}`,
      print: () => `INC ${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const result = (register.get() + 1) % 256;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set((result & 0xf) === 0);
      },
    });
  }
  function registerINC_r16(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `INC ${register.name}`,
      print: () => `INC ${register.name}`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const result = (register.get() + 1) % 65536;
        register.set(result);
      },
    });
  }
  function registerJR_n8(opcode: number) {
    registerInstruction({
      mnemonic: "JR r8",
      print: ([offset]) => `JR   $${toSigned(offset)}`,
      opcode,
      length: 2,
      cycles: 3,
      execute: ([offset]) => {
        const newPc = registers.pc.get() + toSigned(offset);
        registers.pc.set(newPc);
      },
    });
  }
  function registerJR_CC_n8(opcode: number, condition: () => boolean) {
    registerInstruction({
      mnemonic: `JR ${opcode === 0x20 ? "NZ" : "Z"},r8`,
      print: ([offset]) =>
        `JR ${opcode === 0x20 ? "NZ" : "Z"} $${toSigned(offset)}`,
      opcode,
      length: 2,
      cycles: () => (condition() ? 3 : 2),
      execute: ([offset]) => {
        if (condition()) {
          const newPc = registers.pc.get() + toSigned(offset);
          registers.pc.set(newPc);
        }
      },
    });
  }
  function registerLD_r8_r8(opcode: number, to: Register, from: Register) {
    registerInstruction({
      mnemonic: `LD  ${to.name},${from.name}`,
      print: () => `LD ${to.name},${from.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        to.set(from.get());
      },
    });
  }
  function registerLD_r8_n8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `LD ${register.name},d8`,
      print: ([param1]) => `LD ${register.name},$${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        register.set(param);
      },
    });
  }
  function registerLD_A_HLI(opcode: number) {
    registerInstruction({
      mnemonic: "LD A,[HL+]",
      print: () => "LD A,[HL+]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.hl.get();
        registers.a.set(memory.readByte(addr));
        registers.hl.set(addr + 1);
      },
    });
  }
  function registerLD_HLI_A(opcode: number) {
    registerInstruction({
      mnemonic: "LD [HL+],A",
      print: () => "LD [HL+],A",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.hl.get();
        memory.writeByte(addr, registers.a.get());
        registers.hl.set(addr + 1);
      },
    });
  }
  function registerLD_A_r16(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `LD A,[${register.name}]`,
      print: () => `LD A,[${register.name}]`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = register.get();
        const byte = memory.readByte(addr);
        registers.a.set(byte);
      },
    });
  }
  function registerLD_HL_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `LD [HL] ${register.name}`,
      print: () => `LD [HL] ${register.name}`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.hl.get();
        memory.writeByte(addr, register.get());
      },
    });
  }
  function registerLD_n16_A(opcode: number) {
    registerInstruction({
      mnemonic: "LD [a16],A",
      print: ([low, high]) =>
        `LD [0x${high.toString(16).padStart(2, "0")}${low
          .toString(16)
          .padStart(2, "0")}],A`,
      opcode,
      length: 3,
      cycles: 4,
      execute: ([low, high]) => {
        const addr = (high << 8) | low;
        memory.writeByte(addr, registers.a.get());
      },
    });
  }

  function registerNOP(opcode: number) {
    registerInstruction({
      mnemonic: "NOP",
      print: () => "NOP",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {},
    });
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
      cycles: 3,
      execute: ([low, high]) => {
        destination.set((high << 8) | low);
      },
    };
  }

  function registerLDAddrFromRegister(
    opcode: number,
    destination: Register,
    source: Register
  ) {
    registerInstruction({
      mnemonic: `LD   (${destination.name}),${source.name}`,
      print: () => `LD   (${destination.name}) <- ${source.name}`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = destination.get();
        memory.writeByte(addr, source.get());
      },
    });
  }

  function registerPOP_r16(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `POP  ${register.name}`,
      print: () => `POP  ${register.name}`,
      opcode,
      length: 1,
      cycles: 3,
      execute: () => {
        const low = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        const high = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        register.set((high << 8) | low);
      },
    });
  }

  function registerRET(opcode: number) {
    registerInstruction({
      mnemonic: "RET",
      print: () => "RET",
      opcode,
      length: 1,
      cycles: 3,
      execute: () => {
        const low = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        const high = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        registers.pc.set((high << 8) | low);
      },
    });
  }

  function registerRLA(opcode: number) {
    registerInstruction({
      mnemonic: "RLA",
      print: () => "RLA",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get();
        const carry = value >> 7;
        const result = (value << 1) | (registers.flagC.get() ? 1 : 0);
        registers.a.set(result);
        registers.flagZ.set(false);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(carry === 1);
      },
    });
  }

  function registerRST(opcode: number, addr: number) {
    registerInstruction({
      mnemonic: `RST  $0x${addr.toString(16).padStart(2, "0")}`,
      print: () => `RST  $0x${addr.toString(16).padStart(2, "0")}`,
      opcode,
      length: 1,
      cycles: 4,
      execute: () => {
        registers.sp.set(registers.sp.get() - 1);
        memory.writeByte(registers.sp.get(), (registers.pc.get() >> 8) & 0xff);
        registers.sp.set(registers.sp.get() - 1);
        memory.writeByte(registers.sp.get(), registers.pc.get() & 0xff);
        registers.pc.set(addr);
      },
    });
  }

  function registerSUB_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `SUB  ${register.name}`,
      print: () => `SUB  ${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = register.get();
        const result = registers.a.get() - value;
        registers.a.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
        registers.flagC.set(registers.a.get() < value);
      },
    });
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
      cycles: 1,
      execute: () => {
        const result = (register.get() - 1 + 256) % 256;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((result & 0xf) === 0xf);
      },
    };
  }

  function registerInstruction(instruction: Instruction) {
    instructions[instruction.opcode] = instruction;
  }

  registerNOP(0x00);
  registerInstruction(createLD16Register(0x01, registers.bc));
  registerLDAddrFromRegister(0x02, registers.bc, registers.a);
  registerINC_r16(0x03, registers.bc);
  registerINC_r8(0x04, registers.b);
  registerInstruction(createDEC8bitRegister(0x05, registers.b));
  registerINC_r8(0x0c, registers.c);
  registerInstruction(createDEC8bitRegister(0x0d, registers.c));

  registerInstruction(createLD16Register(0x11, registers.de));
  registerLDAddrFromRegister(0x12, registers.de, registers.a);
  registerINC_r16(0x13, registers.de);
  registerINC_r8(0x14, registers.d);
  registerInstruction(createDEC8bitRegister(0x15, registers.d));
  registerLD_r8_n8(0x16, registers.d);
  registerRLA(0x17);
  registerJR_n8(0x18);
  registerLD_A_r16(0x1a, registers.de);
  registerINC_r8(0x1c, registers.e);
  registerInstruction(createDEC8bitRegister(0x1d, registers.e));
  registerLD_r8_n8(0x1e, registers.e);

  registerJR_CC_n8(0x20, () => !registers.flagZ.get());
  registerInstruction(createLD16Register(0x21, registers.hl));
  registerLD_HLI_A(0x22);
  registerINC_r16(0x23, registers.hl);
  registerINC_r8(0x24, registers.h);
  registerInstruction(createDEC8bitRegister(0x25, registers.h));
  registerJR_CC_n8(0x28, () => registers.flagZ.get());
  registerLD_A_HLI(0x2a);
  registerInstruction(createDEC8bitRegister(0x2d, registers.l));
  registerLD_r8_n8(0x2e, registers.l);

  registerInstruction(createLD16Register(0x31, registers.sp));
  registerInstruction(createDEC8bitRegister(0x3d, registers.a));

  registerLD_r8_r8(0x47, registers.b, registers.a);
  registerLD_r8_r8(0x4f, registers.c, registers.a);

  registerLD_r8_r8(0x57, registers.d, registers.a);

  registerLD_r8_r8(0x67, registers.h, registers.a);

  registerLD_HL_r8(0x77, registers.a);
  registerLD_r8_r8(0x78, registers.a, registers.b);
  registerLD_r8_r8(0x7b, registers.a, registers.e);
  registerLD_r8_r8(0x7c, registers.a, registers.h);
  registerLD_r8_r8(0x7d, registers.a, registers.l);

  registerADD_A_hl(0x86);

  registerSUB_r8(0x90, registers.b);

  registerCP_HL(0xbe);

  registerPOP_r16(0xc1, registers.bc);
  registerRET(0xc9);
  register_CALL_n16(0xcd);

  registerPOP_r16(0xe1, registers.hl);
  registerLD_n16_A(0xea);

  registerPOP_r16(0xf1, registers.af);
  registerRST(0xff, 0x38);

  registerInstruction({
    mnemonic: "LD B,d8",
    print: ([param1]) => `LD   B <- $${param1}`,
    opcode: 0x06,
    length: 2,
    cycles: 2,
    execute: ([param]) => {
      registers.b.set(param);
    },
  });
  registerInstruction({
    mnemonic: "LD C,d8",
    print: ([param1]) => `LD   C <- $${param1}`,
    opcode: 0x0e,
    length: 2,
    cycles: 2,
    execute: ([param]) => {
      registers.c.set(param);
    },
  });

  // registerInstruction({
  //   mnemonic: "JR NZ,r8",
  //   print: ([offset]) => `JRNZ $${toSigned(offset)}`,
  //   opcode: 0x20,
  //   length: 2,
  //   cycles: () => (!registers.flagZ.get() ? 3 : 2),
  //   execute: ([offset]) => {
  //     if (!registers.flagZ.get()) {
  //       const newPc = registers.pc.get() + toSigned(offset);
  //       registers.pc.set(newPc);
  //     }
  //   },
  // });

  registerInstruction({
    mnemonic: "LD (HL-),A",
    print: () => `LDD  &HL <- A`,
    opcode: 0x32,
    length: 1,
    cycles: 2,
    execute: () => {
      const addr = registers.hl.get();
      memory.writeByte(addr, registers.a.get());
      registers.hl.set(addr - 1);
    },
  });
  registerInstruction({
    mnemonic: "LD (HL),d8",
    print: ([param1]) => `LD   &HL <- $${param1}`,
    opcode: 0x36,
    length: 2,
    cycles: 3,
    execute: ([param]) => {
      const addr = registers.hl.get();
      memory.writeByte(addr, param);
    },
  });
  registerInstruction({
    mnemonic: "LD A,d8",
    print: ([param1]) => `LD   A <- $${param1}`,
    opcode: 0x3e,
    length: 2,
    cycles: 2,
    execute: ([param]) => {
      registers.a.set(param);
    },
  });

  registerInstruction({
    mnemonic: "LD B,D",
    print: () => "LD   B <- D",
    opcode: 0x42,
    length: 1,
    cycles: 1,
    execute: () => {
      const value = memory.readByte(registers.d.get());
      registers.b.set(value);
    },
  });
  registerInstruction({
    mnemonic: "LD B,E",
    print: () => "LD   B <- E",
    opcode: 0x43,
    length: 1,
    cycles: 1,
    execute: () => {
      const value = memory.readByte(registers.e.get());
      registers.b.set(value);
    },
  });

  registerInstruction({
    mnemonic: "XOR A",
    print: () => "XOR  A",
    opcode: 0xaf,
    length: 1,
    cycles: 1,
    execute: () => {
      let result = registers.a.get() ^ registers.a.get();
      registers.a.set(result);

      registers.flagZ.set(result === 0);
      registers.flagN.set(false);
      registers.flagH.set(false);
      registers.flagC.set(false);
    },
  });

  registerInstruction({
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
  registerInstruction({
    mnemonic: "PUSH BC",
    print: () => "PUSH BC",
    opcode: 0xc5,
    length: 1,
    cycles: 4,
    execute: () => {
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.b.get());
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.c.get());
    },
  });

  registerInstruction({
    mnemonic: "PREFIX CB",
    print: () => "PREFIX CB",
    opcode: 0xcb,
    length: 2,
    cycles: ([opcode]) => {
      const instruction = prefixedInstructions[opcode];
      if (!instruction) {
        throw new Error(
          `Unknown opcode CB ${opcode
            .toString(16)
            .padStart(2, "0")
            .toUpperCase()} at ${registers.pc
            .get()
            .toString(16)
            .padStart(4, "0")
            .toUpperCase()}`
        );
      }
      return typeof instruction.cycles === "function"
        ? instruction.cycles([opcode])
        : instruction.cycles;
    },
    execute: ([opcode]) => {
      const instruction = prefixedInstructions[opcode];
      if (!instruction) {
        throw new Error(
          `Unknown opcode CB ${opcode
            .toString(16)
            .padStart(2, "0")
            .toUpperCase()} at ${registers.pc
            .get()
            .toString(16)
            .padStart(4, "0")
            .toUpperCase()}`
        );
      }
      instruction.execute([opcode]);
    },
  });

  registerInstruction({
    mnemonic: "PUSH DE",
    print: () => "PUSH DE",
    opcode: 0xd5,
    length: 1,
    cycles: 4,
    execute: () => {
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.d.get());
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.e.get());
    },
  });

  registerInstruction({
    mnemonic: "LDH (a8),A",
    print: ([param1]) =>
      `LD   0xff${param1.toString(16).padStart(2, "0")} <- A`,
    opcode: 0xe0,
    length: 2,
    cycles: 3,
    execute: ([offset]) => {
      const addr = 0xff00 + offset;
      memory.writeByte(addr, registers.a.get());
    },
  });
  registerInstruction({
    mnemonic: "LD [C],A",
    print: () => "LD [C],A",
    opcode: 0xe2,
    length: 1,
    cycles: 2,
    execute: () => {
      const addr = 0xff00 + registers.c.get();
      memory.writeByte(addr, registers.a.get());
    },
  });
  registerInstruction({
    mnemonic: "PUSH HL",
    print: () => "PUSH HL",
    opcode: 0xe5,
    length: 1,
    cycles: 4,
    execute: () => {
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.h.get());
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.l.get());
    },
  });

  registerInstruction({
    mnemonic: "LDH A,(a8)",
    print: ([param1]) =>
      `LD   A <- 0xff${param1.toString(16).padStart(2, "0")}`,
    opcode: 0xf0,
    length: 2,
    cycles: 3,
    execute: ([offset]) => {
      const addr = 0xff00 + offset;
      registers.a.set(memory.readByte(addr));
    },
  });
  registerInstruction({
    mnemonic: "DI",
    print: () => "DI",
    opcode: 0xf3,
    length: 1,
    cycles: 1,
    execute: () => {
      registers.ime.set(0);
    },
  });
  registerInstruction({
    mnemonic: "PUSH AF",
    print: () => "PUSH AF",
    opcode: 0xf5,
    length: 1,
    cycles: 4,
    execute: () => {
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.a.get());
      registers.sp.set(registers.sp.get() - 1);
      memory.writeByte(registers.sp.get(), registers.f.get());
    },
  });
  registerInstruction({
    mnemonic: "CP d8",
    print: ([param1]) => `CP   $${param1}`,
    opcode: 0xfe,
    length: 2,
    cycles: 2,
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

function createPrefixedInstructions({
  registers,
  memory,
}: {
  registers: Registers;
  memory: AddressBus;
}) {
  const instructions: Record<number, Instruction> = {};

  function registerInstruction(instruction: Instruction) {
    instructions[instruction.opcode] = instruction;
  }

  function registerBITr8(opcode: number, bit: number, register: Register) {
    const instruction: Instruction = {
      mnemonic: `BIT  ${bit},${register.name}`,
      print: () => `BIT  ${bit},${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const result = value & (1 << bit);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(true);
      },
    };
    registerInstruction(instruction);
  }

  function registerRL_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `RL   ${register.name}`,
      print: () => `RL   ${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const carry = value >> 7;
        const carryFromFlag = registers.flagC.get() ? 1 : 0;
        const result = ((value << 1) & 0xff) | carryFromFlag;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(carry === 1);
      },
    });
  }

  registerRL_r8(0x11, registers.c);
  registerBITr8(0x7c, 7, registers.h);

  return instructions;
}
