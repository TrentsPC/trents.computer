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

  function registerADC_A_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `ADC  A,${register.name}`,
      print: () => `ADC  A,${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = register.get();
        const carry = registers.flagC.get() ? 1 : 0;
        const result = registers.a.get() + value + carry;
        const halfCarry =
          (registers.a.get() & 0xf) + (value & 0xf) + carry > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(result > 0xff);
      },
    });
  }
  function registerADC_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "ADC A,d8",
      print: ([param1]) => `ADC A,$${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = param;
        const carry = registers.flagC.get() ? 1 : 0;
        const result = registers.a.get() + value + carry;
        const halfCarry =
          (registers.a.get() & 0xf) + (value & 0xf) + carry > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result % 256 === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(result > 0xff);
      },
    });
  }
  function registerADC_A_HL(opcode: number) {
    registerInstruction({
      mnemonic: "ADC A,[HL]",
      print: () => `ADC A,[HL]`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const value = memory.readByte(registers.hl.get());
        const carry = registers.flagC.get() ? 1 : 0;
        const result = registers.a.get() + value + carry;
        const halfCarry =
          (registers.a.get() & 0xf) + (value & 0xf) + carry > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result % 256 === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(result > 0xff);
      },
    });
  }
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
        const fullCarry = result > 0xff;
        const halfCarry = (registers.a.get() & 0xf) + (value & 0xf) > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(fullCarry);
      },
    });
  }
  function registerADD_A_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `ADD  A,${register.name}`,
      print: () => `ADD  A,${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = register.get();
        const result = registers.a.get() + value;
        const fullCarry = result > 0xff;
        const halfCarry = (registers.a.get() & 0xf) + (value & 0xf) > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result % 256 === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(fullCarry);
      },
    });
  }
  function registerADD_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "ADD A,d8",
      print: ([param1]) => `ADD A,$${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = param;
        const result = registers.a.get() + value;
        const fullCarry = result > 0xff;
        const halfCarry = (registers.a.get() & 0xf) + (value & 0xf) > 0xf;
        registers.a.set(result % 256);
        registers.flagZ.set(result % 256 === 0);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(fullCarry);
      },
    });
  }
  function registerADD_r16_r16(opcode: number, to: Register, from: Register) {
    registerInstruction({
      mnemonic: `ADD ${to.name},${from.name}`,
      print: () => `ADD ${to.name},${from.name}`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const result = to.get() + from.get();
        const halfCarry = (to.get() & 0xfff) + (from.get() & 0xfff) > 0xfff;
        to.set(result % 65536);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(result > 0xffff);
      },
    });
  }
  function registerADD_SP_e8(opcode: number) {
    registerInstruction({
      mnemonic: "ADD SP,r8",
      print: ([param1]) => `ADD SP,$${toSigned(param1)}`,
      opcode,
      length: 2,
      cycles: 4,
      execute: ([param]) => {
        const signedParam = toSigned(param);
        const result = registers.sp.get() + signedParam;
        const halfCarry = (registers.sp.get() & 0xf) + (param & 0xf) > 0xf;
        const fullCarry = (registers.sp.get() & 0xff) + param > 0xff;
        registers.sp.set(result);
        registers.flagZ.set(false);
        registers.flagN.set(false);
        registers.flagH.set(halfCarry);
        registers.flagC.set(fullCarry);
      },
    });
  }
  function registerAND_A_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: "AND  r8",
      print: () => `AND  $${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get() & register.get();
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(true);
        registers.flagC.set(false);
      },
    });
  }
  function registerAND_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "AND  d8",
      print: ([param1]) => `AND  $${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = registers.a.get() & param;
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(true);
        registers.flagC.set(false);
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
  function registerCALL_cc_n16(opcode: number, condition: () => boolean) {
    registerInstruction({
      mnemonic: `CALL ${opcode === 0xc4 ? "NZ" : "Z"},a16`,
      print: ([low, high]) =>
        `CALL ${opcode === 0xc4 ? "NZ" : "Z"} $0x${high
          .toString(16)
          .padStart(2, "0")}${low.toString(16).padStart(2, "0")}`,
      opcode,
      length: 3,
      cycles: () => (condition() ? 6 : 3),
      execute: ([low, high]) => {
        if (condition()) {
          const addr = (high << 8) | low;
          registers.sp.set(registers.sp.get() - 1);
          memory.writeByte(
            registers.sp.get(),
            (registers.pc.get() >> 8) & 0xff
          );
          registers.sp.set(registers.sp.get() - 1);
          memory.writeByte(registers.sp.get(), registers.pc.get() & 0xff);
          registers.pc.set(addr);
        }
      },
    });
  }
  function registerCP_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `CP   A,${register.name}`,
      print: () => `CP   A,${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = register.get();
        const result = registers.a.get() - value;
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
        registers.flagC.set(registers.a.get() < value);
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
  function registerCPL(opcode: number) {
    registerInstruction({
      mnemonic: "CPL",
      print: () => "CPL",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        registers.a.set(registers.a.get() ^ 0xff);
        registers.flagN.set(true);
        registers.flagH.set(true);
      },
    });
  }
  function registerDAA(opcode: number) {
    registerInstruction({
      mnemonic: "DAA",
      print: () => "DAA",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        let value = registers.a.get();
        let adjustment = 0;

        if (registers.flagN.get()) {
          if (registers.flagH.get()) {
            adjustment += 0x6;
          }
          if (registers.flagC.get()) {
            adjustment += 0x60;
          }
          value = (value - adjustment + 256) % 256;
        } else {
          if (registers.flagH.get() || (value & 0xf) > 9) {
            adjustment += 0x6;
          }
          if (registers.flagC.get() || value > 0x99) {
            adjustment += 0x60;
            registers.flagC.set(true);
          }
          value = (value + adjustment) % 256;
        }

        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagH.set(false);
      },
    });
  }
  function registerDEC_r16(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `DEC  ${register.name}`,
      print: () => `DEC  ${register.name}`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const result = (register.get() - 1 + 0x10000) % 0x10000;
        register.set(result);
      },
    });
  }
  function registerDEC_HL_POINTER(opcode: number) {
    registerInstruction({
      mnemonic: "DEC [HL]",
      print: () => "DEC [HL]",
      opcode,
      length: 1,
      cycles: 3,
      execute: () => {
        const addr = registers.hl.get();
        const value = (memory.readByte(addr) - 1 + 256) % 256;
        memory.writeByte(addr, value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(true);
        registers.flagH.set((value & 0xf) === 0xf);
      },
    });
  }
  function registerEI(opcode: number) {
    registerInstruction({
      mnemonic: "EI",
      print: () => "EI",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        registers.ime.set(1);
      },
    });
  }

  function registerINC_HL(opcode: number) {
    registerInstruction({
      mnemonic: `INC [HL]`,
      print: () => `INC [HL]`,
      opcode,
      length: 1,
      cycles: 3,
      execute: () => {
        const addr = registers.hl.get();
        const result = (memory.readByte(addr) + 1) % 256;
        memory.writeByte(addr, result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set((result & 0xf) === 0);
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
  function registerJP_r16(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `JP   ${register.name}`,
      print: () => `JP   ${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        registers.pc.set(register.get());
      },
    });
  }
  function registerJP_cc_n16(opcode: number, condition: () => boolean) {
    registerInstruction({
      mnemonic: `JP   ${opcode === 0xc2 ? "NZ" : "Z"},a16`,
      print: ([low, high]) =>
        `JP   ${opcode === 0xc2 ? "NZ" : "Z"} $0x${high
          .toString(16)
          .padStart(2, "0")}${low.toString(16).padStart(2, "0")}`,
      opcode,
      length: 3,
      cycles: () => (condition() ? 4 : 3),
      execute: ([low, high]) => {
        if (condition()) {
          const addr = (high << 8) | low;
          registers.pc.set(addr);
        }
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
  function registerLD_r8_HL(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `LD  ${register.name},[HL]`,
      print: () => `LD ${register.name},[HL]`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.hl.get();
        const byte = memory.readByte(addr);
        register.set(byte);
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
  function registerLD_n16_SP(opcode: number) {
    registerInstruction({
      mnemonic: "LD [a16],SP",
      print: ([low, high]) =>
        `LD [0x${high.toString(16).padStart(2, "0")}${low
          .toString(16)
          .padStart(2, "0")}],SP`,
      opcode,
      length: 3,
      cycles: 5,
      execute: ([low, high]) => {
        const addr = (high << 8) | low;
        memory.writeByte(addr, registers.sp.get() & 0xff);
        memory.writeByte(addr + 1, (registers.sp.get() >> 8) & 0xff);
      },
    });
  }
  function registerLD_A_BC(opcode: number) {
    registerInstruction({
      mnemonic: "LD A,[BC]",
      print: () => "LD A,[BC]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.bc.get();
        registers.a.set(memory.readByte(addr));
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
        registers.hl.set((addr + 1) % 0x10000);
      },
    });
  }
  function registerLD_A_HLD(opcode: number) {
    registerInstruction({
      mnemonic: "LD A,[HL-]",
      print: () => "LD A,[HL-]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const addr = registers.hl.get();
        registers.a.set(memory.readByte(addr));
        registers.hl.set((addr - 1 + 0x10000) % 0x10000);
      },
    });
  }
  function registerLD_HL_SP_e8(opcode: number) {
    registerInstruction({
      mnemonic: "LD HL,SP+r8",
      print: ([param1]) => `LD HL,SP+$${toSigned(param1)}`,
      opcode,
      length: 2,
      cycles: 3,
      execute: ([param]) => {
        const signedParam = toSigned(param);
        const result = registers.sp.get() + signedParam;
        registers.hl.set(result);
        registers.flagZ.set(false);
        registers.flagN.set(false);
        registers.flagH.set((registers.sp.get() & 0xf) + (param & 0xf) > 0xf);
        registers.flagC.set((registers.sp.get() & 0xff) + param > 0xff);
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
  function registerLD_SP_HL(opcode: number) {
    registerInstruction({
      mnemonic: "LD SP,HL",
      print: () => "LD SP,HL",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        registers.sp.set(registers.hl.get());
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

  function registerLD_A_n16(opcode: number) {
    registerInstruction({
      mnemonic: "LD A,[a16]",
      print: ([low, high]) =>
        `LD A,[0x${high.toString(16).padStart(2, "0")}${low
          .toString(16)
          .padStart(2, "0")}]`,
      opcode,
      length: 3,
      cycles: 4,
      execute: ([low, high]) => {
        const addr = (high << 8) | low;
        registers.a.set(memory.readByte(addr));
      },
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

  function registerOR_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "OR   d8",
      print: ([param1]) => `OR   $${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = registers.a.get() | param;
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
      },
    });
  }
  function registerOR_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `OR   ${register.name}`,
      print: () => `OR   ${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get() | register.get();
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
      },
    });
  }

  function registerOR_HL(opcode: number) {
    registerInstruction({
      mnemonic: `OR   A HL`,
      print: () => `OR   A HL`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get() | memory.readByte(registers.hl.get());
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
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
      cycles: 4,
      execute: () => {
        const low = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        const high = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        registers.pc.set((high << 8) | low);
      },
    });
  }
  function registerRET_cc(opcode: number, condition: () => boolean) {
    registerInstruction({
      mnemonic: `RET ${opcode === 0xc0 ? "NZ" : "Z"}`,
      print: () => `RET ${opcode === 0xc0 ? "NZ" : "Z"}`,
      opcode,
      length: 1,
      cycles: () => (condition() ? 5 : 2),
      execute: () => {
        if (condition()) {
          const low = memory.readByte(registers.sp.get());
          registers.sp.set(registers.sp.get() + 1);
          const high = memory.readByte(registers.sp.get());
          registers.sp.set(registers.sp.get() + 1);
          registers.pc.set((high << 8) | low);
        }
      },
    });
  }
  function registerRETI(opcode: number) {
    registerInstruction({
      mnemonic: "RETI",
      print: () => "RETI",
      opcode,
      length: 1,
      cycles: 4,
      execute: () => {
        const low = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        const high = memory.readByte(registers.sp.get());
        registers.sp.set(registers.sp.get() + 1);
        registers.pc.set((high << 8) | low);
        registers.ime.set(1);
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
  function registerRLCA(opcode: number) {
    registerInstruction({
      mnemonic: "RLCA",
      print: () => "RLCA",
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get();
        const carry = value >> 7;
        const result = (value << 1) | carry;
        registers.a.set(result);
        registers.flagZ.set(false);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(carry === 1);
      },
    });
  }

  function registerRRA(opcode: number) {
    registerInstruction({
      mnemonic: `RRA`,
      print: () => `RRA`,
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const value = registers.a.get();
        const carry = value & 1;
        const carryFromFlag = registers.flagC.get() ? 0x80 : 0;
        const result = (value >> 1) | carryFromFlag;
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

  function registerSBC_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "SBC  A,d8",
      print: ([param1]) => `SBC  A,$${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = param;
        const carry = registers.flagC.get() ? 1 : 0;
        const result = registers.a.get() - value - carry;
        const halfCarry = (registers.a.get() & 0xf) < (value & 0xf) + carry;
        const nextValue = (result + 256) % 256;
        registers.a.set(nextValue);
        registers.flagZ.set(nextValue === 0);
        registers.flagN.set(true);
        registers.flagH.set(halfCarry);
        registers.flagC.set(result < 0);
      },
    });
  }
  function registerSTOP(opcode: number) {
    registerInstruction({
      mnemonic: "STOP",
      print: () => "STOP",
      opcode,
      length: 2,
      cycles: 1,
      execute: () => {
        // throw new Error("STOP");
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
        registers.a.set((result + 256) % 256);
        registers.flagZ.set(result === 0);
        registers.flagN.set(true);
        registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
        registers.flagC.set(registers.a.get() < value);
      },
    });
  }
  function registerSUB_n8(opcode: number) {
    registerInstruction({
      mnemonic: "SUB  d8",
      print: ([param1]) => `SUB  $${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = param;
        const result = registers.a.get() - value;
        const fullCarry = result < 0;
        const halfCarry = (registers.a.get() & 0xf) < (value & 0xf);
        registers.a.set((result + 256) % 256);
        registers.flagZ.set((result + 256) % 256 === 0);
        registers.flagN.set(true);
        registers.flagH.set(halfCarry);
        registers.flagC.set(fullCarry);
      },
    });
  }
  function registerSUB_A_HL(opcode: number) {
    registerInstruction({
      mnemonic: `SUB  HL`,
      print: () => `SUB  HL`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = memory.readByte(registers.hl.get());
        const result = registers.a.get() - value;
        registers.a.set((result + 256) % 256);
        registers.flagZ.set((result + 256) % 256 === 0);
        registers.flagN.set(true);
        registers.flagH.set((registers.a.get() & 0xf) < (value & 0xf));
        registers.flagC.set(registers.a.get() < value);
      },
    });
  }

  function registerXOR_A_n8(opcode: number) {
    registerInstruction({
      mnemonic: "XOR  d8",
      print: ([param1]) => `XOR  $${param1}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: ([param]) => {
        const value = registers.a.get() ^ param;
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
      },
    });
  }
  function registerXOR_A_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `XOR  A, ${register.name}`,
      print: () => `XOR  A, ${register.name}`,
      opcode,
      length: 1,
      cycles: 1,
      execute: () => {
        const value = registers.a.get() ^ register.get();
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
      },
    });
  }
  function registerXOR_A_HL(opcode: number) {
    registerInstruction({
      mnemonic: "XOR  A,[HL]",
      print: () => "XOR  A,[HL]",
      opcode,
      length: 1,
      cycles: 2,
      execute: () => {
        const value = registers.a.get() ^ memory.readByte(registers.hl.get());
        registers.a.set(value);
        registers.flagZ.set(value === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
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
  registerRLCA(0x07);
  registerLD_n16_SP(0x08);
  registerADD_r16_r16(0x09, registers.hl, registers.bc);
  registerLD_A_BC(0x0a);
  registerDEC_r16(0x0b, registers.bc);
  registerINC_r8(0x0c, registers.c);
  registerInstruction(createDEC8bitRegister(0x0d, registers.c));

  registerSTOP(0x10);
  registerInstruction(createLD16Register(0x11, registers.de));
  registerLDAddrFromRegister(0x12, registers.de, registers.a);
  registerINC_r16(0x13, registers.de);
  registerINC_r8(0x14, registers.d);
  registerInstruction(createDEC8bitRegister(0x15, registers.d));
  registerLD_r8_n8(0x16, registers.d);
  registerRLA(0x17);
  registerJR_n8(0x18);
  registerADD_r16_r16(0x19, registers.hl, registers.de);
  registerLD_A_r16(0x1a, registers.de);
  registerDEC_r16(0x1b, registers.de);
  registerINC_r8(0x1c, registers.e);
  registerInstruction(createDEC8bitRegister(0x1d, registers.e));
  registerLD_r8_n8(0x1e, registers.e);
  registerRRA(0x1f);

  registerJR_CC_n8(0x20, () => !registers.flagZ.get());
  registerInstruction(createLD16Register(0x21, registers.hl));
  registerLD_HLI_A(0x22);
  registerINC_r16(0x23, registers.hl);
  registerINC_r8(0x24, registers.h);
  registerInstruction(createDEC8bitRegister(0x25, registers.h));
  registerLD_r8_n8(0x26, registers.h);
  registerDAA(0x27);
  registerJR_CC_n8(0x28, () => registers.flagZ.get());
  registerADD_r16_r16(0x29, registers.hl, registers.hl);
  registerLD_A_HLI(0x2a);
  registerDEC_r16(0x2b, registers.hl);
  registerINC_r8(0x2c, registers.l);
  registerInstruction(createDEC8bitRegister(0x2d, registers.l));
  registerLD_r8_n8(0x2e, registers.l);
  registerCPL(0x2f);

  registerJR_CC_n8(0x30, () => !registers.flagC.get());
  registerInstruction(createLD16Register(0x31, registers.sp));
  registerINC_r16(0x33, registers.sp);
  registerINC_HL(0x34);
  registerDEC_HL_POINTER(0x35);
  registerJR_CC_n8(0x38, () => registers.flagC.get());
  registerADD_r16_r16(0x39, registers.hl, registers.sp);
  registerLD_A_HLD(0x3a);
  registerDEC_r16(0x3b, registers.sp);
  registerINC_r8(0x3c, registers.a);
  registerInstruction(createDEC8bitRegister(0x3d, registers.a));

  registerLD_r8_r8(0x40, registers.b, registers.b);
  registerLD_r8_r8(0x41, registers.b, registers.c);
  registerLD_r8_r8(0x44, registers.b, registers.h);
  registerLD_r8_r8(0x45, registers.b, registers.l);
  registerLD_r8_HL(0x46, registers.b);
  registerLD_r8_r8(0x47, registers.b, registers.a);
  registerLD_r8_r8(0x48, registers.c, registers.b);
  registerLD_r8_r8(0x49, registers.c, registers.c);
  registerLD_r8_r8(0x4a, registers.c, registers.d);
  registerLD_r8_r8(0x4b, registers.c, registers.e);
  registerLD_r8_r8(0x4c, registers.c, registers.h);
  registerLD_r8_r8(0x4d, registers.c, registers.l);
  registerLD_r8_HL(0x4e, registers.c);
  registerLD_r8_r8(0x4f, registers.c, registers.a);

  registerLD_r8_r8(0x50, registers.d, registers.b);
  registerLD_r8_r8(0x51, registers.d, registers.c);
  registerLD_r8_r8(0x52, registers.d, registers.d);
  registerLD_r8_r8(0x53, registers.d, registers.e);
  registerLD_r8_r8(0x54, registers.d, registers.h);
  registerLD_r8_r8(0x55, registers.d, registers.l);
  registerLD_r8_HL(0x56, registers.d);
  registerLD_r8_r8(0x57, registers.d, registers.a);
  registerLD_r8_r8(0x58, registers.e, registers.b);
  registerLD_r8_r8(0x59, registers.e, registers.c);
  registerLD_r8_r8(0x5a, registers.e, registers.d);
  registerLD_r8_r8(0x5b, registers.e, registers.e);
  registerLD_r8_r8(0x5c, registers.e, registers.h);
  registerLD_r8_r8(0x5d, registers.e, registers.l);
  registerLD_r8_HL(0x5e, registers.e);
  registerLD_r8_r8(0x5f, registers.e, registers.a);

  registerLD_r8_r8(0x60, registers.h, registers.b);
  registerLD_r8_r8(0x61, registers.h, registers.c);
  registerLD_r8_r8(0x62, registers.h, registers.d);
  registerLD_r8_r8(0x63, registers.h, registers.e);
  registerLD_r8_r8(0x64, registers.h, registers.h);
  registerLD_r8_r8(0x65, registers.h, registers.l);
  registerLD_r8_HL(0x66, registers.h);
  registerLD_r8_r8(0x67, registers.h, registers.a);
  registerLD_r8_r8(0x68, registers.l, registers.b);
  registerLD_r8_r8(0x69, registers.l, registers.c);
  registerLD_r8_r8(0x6a, registers.l, registers.d);
  registerLD_r8_r8(0x6b, registers.l, registers.e);
  registerLD_r8_r8(0x6c, registers.l, registers.h);
  registerLD_r8_r8(0x6d, registers.l, registers.l);
  registerLD_r8_HL(0x6e, registers.l);
  registerLD_r8_r8(0x6f, registers.l, registers.a);

  registerLD_HL_r8(0x70, registers.b);
  registerLD_HL_r8(0x71, registers.c);
  registerLD_HL_r8(0x72, registers.d);
  registerLD_HL_r8(0x73, registers.e);
  registerLD_HL_r8(0x74, registers.h);
  registerLD_HL_r8(0x75, registers.l);
  registerLD_HL_r8(0x77, registers.a);
  registerLD_r8_r8(0x78, registers.a, registers.b);
  registerLD_r8_r8(0x79, registers.a, registers.c);
  registerLD_r8_r8(0x7a, registers.a, registers.d);
  registerLD_r8_r8(0x7b, registers.a, registers.e);
  registerLD_r8_r8(0x7c, registers.a, registers.h);
  registerLD_r8_r8(0x7d, registers.a, registers.l);
  registerLD_r8_HL(0x7e, registers.a);
  registerLD_r8_r8(0x7f, registers.a, registers.a);

  registerADD_A_r8(0x80, registers.b);
  registerADD_A_r8(0x81, registers.c);
  registerADD_A_r8(0x82, registers.d);
  registerADD_A_r8(0x83, registers.e);
  registerADD_A_r8(0x84, registers.h);
  registerADD_A_r8(0x85, registers.l);
  registerADD_A_hl(0x86);
  registerADD_A_r8(0x87, registers.a);
  registerADC_A_HL(0x8e);

  registerSUB_r8(0x90, registers.b);
  registerSUB_r8(0x91, registers.c);
  registerSUB_r8(0x92, registers.d);
  registerSUB_r8(0x93, registers.e);
  registerSUB_r8(0x94, registers.h);
  registerSUB_r8(0x95, registers.l);
  registerSUB_A_HL(0x96);

  registerAND_A_r8(0xa1, registers.b);
  registerAND_A_r8(0xa7, registers.a);
  registerXOR_A_r8(0xa8, registers.b);
  registerXOR_A_r8(0xa9, registers.c);
  registerXOR_A_r8(0xad, registers.l);
  registerXOR_A_HL(0xae);

  registerOR_r8(0xb0, registers.b);
  registerOR_r8(0xb1, registers.c);
  registerOR_r8(0xb2, registers.d);
  registerOR_r8(0xb3, registers.e);
  registerOR_r8(0xb4, registers.h);
  registerOR_r8(0xb5, registers.l);
  registerOR_HL(0xb6);
  registerOR_r8(0xb7, registers.a);
  registerCP_r8(0xb8, registers.b);
  registerCP_r8(0xb9, registers.c);
  registerCP_r8(0xba, registers.d);
  registerCP_r8(0xbb, registers.e);
  registerCP_HL(0xbe);

  registerRET_cc(0xc0, () => !registers.flagZ.get());
  registerPOP_r16(0xc1, registers.bc);
  registerJP_cc_n16(0xc2, () => !registers.flagZ.get());
  registerCALL_cc_n16(0xc4, () => !registers.flagZ.get());
  registerADD_A_n8(0xc6);
  registerRET_cc(0xc8, () => registers.flagZ.get());
  registerRET(0xc9);
  registerJP_cc_n16(0xca, () => registers.flagZ.get());
  register_CALL_n16(0xcd);
  registerADC_A_n8(0xce);
  registerRST(0xcf, 0x08);

  registerRET_cc(0xd0, () => !registers.flagC.get());
  registerPOP_r16(0xd1, registers.de);
  registerSUB_n8(0xd6);
  registerRET_cc(0xd8, () => registers.flagC.get());
  registerRETI(0xd9);
  registerSBC_A_n8(0xde);
  registerRST(0xdf, 0x18);

  registerPOP_r16(0xe1, registers.hl);
  registerAND_A_n8(0xe6);
  registerLD_n16_A(0xea);
  registerADD_SP_e8(0xe8);
  registerJP_r16(0xe9, registers.hl);
  registerXOR_A_n8(0xee);
  registerRST(0xef, 0x28);

  registerPOP_r16(0xf1, registers.af);
  registerOR_A_n8(0xf6);
  registerLD_HL_SP_e8(0xf8);
  registerLD_SP_HL(0xf9);
  registerLD_A_n16(0xfa);
  registerEI(0xfb);
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
      const value = registers.d.get();
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
      const value = registers.e.get();
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

  function registerRES_n3_r8(opcode: number, bit: number, register: Register) {
    const instruction: Instruction = {
      mnemonic: `RES  ${bit},${register.name}`,
      print: () => `RES  ${bit},${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const result = value & ~(1 << bit);
        register.set(result);
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

  function registerRR_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `RR   ${register.name}`,
      print: () => `RR   ${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const carry = value & 1;
        const carryFromFlag = registers.flagC.get() ? 0x80 : 0;
        const result = (value >> 1) | carryFromFlag;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(carry === 1);
      },
    });
  }

  function registerSRL_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `SRL  ${register.name}`,
      print: () => `SRL  ${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const carry = value & 1;
        const result = value >> 1;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(carry === 1);
      },
    });
  }

  function registerSWAP_r8(opcode: number, register: Register) {
    registerInstruction({
      mnemonic: `SWAP ${register.name}`,
      print: () => `SWAP ${register.name}`,
      opcode,
      length: 2,
      cycles: 2,
      execute: () => {
        const value = register.get();
        const low = value & 0xf;
        const high = (value >> 4) & 0xf;
        const result = (low << 4) | high;
        register.set(result);
        registers.flagZ.set(result === 0);
        registers.flagN.set(false);
        registers.flagH.set(false);
        registers.flagC.set(false);
      },
    });
  }

  registerRL_r8(0x11, registers.c);
  registerRR_r8(0x19, registers.c);
  registerRR_r8(0x1a, registers.d);
  registerRR_r8(0x1b, registers.e);
  registerRR_r8(0x1f, registers.a);

  registerSWAP_r8(0x37, registers.a);
  registerSRL_r8(0x38, registers.b);
  registerSRL_r8(0x3f, registers.a);

  registerBITr8(0x7c, 7, registers.h);

  registerRES_n3_r8(0x87, 0, registers.a);

  return instructions;
}
