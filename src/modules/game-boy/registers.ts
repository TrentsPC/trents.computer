import { createLogger } from "./logger";

export function createRegisters() {
  const { logs, logger } = createLogger();
  // Accumulator
  let a = 0;
  // Flags
  let f = 0;

  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;
  let h = 0;
  let l = 0;
  // Stack Pointer
  let sp = 0;
  // Program Counter
  let pc = 0x100;

  function print() {
    logger.log(
      `${pc.toString(16).padStart(4, "0")}: A: ${a
        .toString(16)
        .padStart(2, "0")} B: ${b.toString(16).padStart(2, "0")} C: ${c
        .toString(16)
        .padStart(2, "0")} D: ${d.toString(16).padStart(2, "0")} E: ${e
        .toString(16)
        .padStart(2, "0")} H: ${h.toString(16).padStart(2, "0")} L: ${l
        .toString(16)
        .padStart(2, "0")} SP: ${sp.toString(16).padStart(4, "0")} FZ: ${
        f & 0b10000000 ? 1 : 0
      } FN: ${f & 0b01000000 ? 1 : 0} FH: ${f & 0b00100000 ? 1 : 0} FC: ${
        f & 0b00010000 ? 1 : 0
      }`,
      { key: pc }
    );
  }

  function getA() {
    return a;
  }

  function setA(value: number) {
    a = value;
    print();
  }

  function getF() {
    return f;
  }

  function setF(value: number) {
    f = value;
    print();
  }

  function getB() {
    return b;
  }

  function setB(value: number) {
    b = value;
    print();
  }

  function getC() {
    return c;
  }

  function setC(value: number) {
    c = value;
    print();
  }

  function getD() {
    return d;
  }

  function setD(value: number) {
    d = value;
    print();
  }

  function getE() {
    return e;
  }

  function setE(value: number) {
    e = value;
    print();
  }

  function getH() {
    return h;
  }

  function setH(value: number) {
    h = value;
    print();
  }

  function getL() {
    return l;
  }

  function setL(value: number) {
    l = value;
    print();
  }

  function getSP() {
    return sp;
  }

  function setSP(value: number) {
    sp = value;
    print();
  }

  function getPC() {
    return pc;
  }

  function setPC(value: number) {
    pc = value;
  }

  function getAF() {
    return (a << 8) | f;
  }

  function setAF(value: number) {
    a = value >> 8;
    f = value & 0xf0;
    print();
  }

  function getBC() {
    return (b << 8) | c;
  }

  function setBC(value: number) {
    b = value >> 8;
    c = value & 0xff;
    print();
  }

  function getDE() {
    return (d << 8) | e;
  }

  function setDE(value: number) {
    d = value >> 8;
    e = value & 0xff;
    print();
  }

  function getHL() {
    return (h << 8) | l;
  }

  function setHL(value: number) {
    h = value >> 8;
    l = value & 0xff;
    print();
  }

  function getFlagZ() {
    return !!(f & 0b10000000);
  }

  function setFlagZ(value: boolean) {
    if (value) {
      f |= 0b10000000;
    } else {
      f &= 0b01111111;
    }
    print();
  }

  function getFlagN() {
    return !!(f & 0b01000000);
  }

  function setFlagN(value: boolean) {
    if (value) {
      f |= 0b01000000;
    } else {
      f &= 0b10111111;
    }
    print();
  }

  function getFlagH() {
    return !!(f & 0b00100000);
  }

  function setFlagH(value: boolean) {
    if (value) {
      f |= 0b00100000;
    } else {
      f &= 0b11011111;
    }
    print();
  }

  function getFlagC() {
    return !!(f & 0b00010000);
  }

  function setFlagC(value: boolean) {
    if (value) {
      f |= 0b00010000;
    } else {
      f &= 0b11101111;
    }
    print();
  }

  return {
    a: {
      name: "A",
      get: getA,
      set: setA,
    },
    f: {
      name: "F",
      get: getF,
      set: setF,
    },
    b: {
      name: "B",
      get: getB,
      set: setB,
    },
    c: {
      name: "C",
      get: getC,
      set: setC,
    },
    d: {
      name: "D",
      get: getD,
      set: setD,
    },
    e: {
      name: "E",
      get: getE,
      set: setE,
    },
    h: {
      name: "H",
      get: getH,
      set: setH,
    },
    l: {
      name: "L",
      get: getL,
      set: setL,
    },
    sp: {
      name: "SP",
      get: getSP,
      set: setSP,
    },
    pc: {
      name: "PC",
      get: getPC,
      set: setPC,
    },
    af: {
      name: "AF",
      get: getAF,
      set: setAF,
    },
    bc: {
      name: "BC",
      get: getBC,
      set: setBC,
    },
    de: {
      name: "DE",
      get: getDE,
      set: setDE,
    },
    hl: {
      name: "HL",
      get: getHL,
      set: setHL,
    },
    flagZ: {
      name: "FZ",
      get: getFlagZ,
      set: setFlagZ,
    },
    flagN: {
      name: "FN",
      get: getFlagN,
      set: setFlagN,
    },
    flagH: {
      name: "FH",
      get: getFlagH,
      set: setFlagH,
    },
    flagC: {
      name: "FC",
      get: getFlagC,
      set: setFlagC,
    },
    logs,
  };
}
export type Register = {
  name: string;
  get: () => number;
  set: (value: number) => void;
};
export type FlagRegister = {
  get: () => boolean;
  set: (value: boolean) => void;
};
export type Registers = ReturnType<typeof createRegisters>;
