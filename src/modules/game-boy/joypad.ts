import { GameBoy } from "./gameBoy";

export type JoypadState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  a: boolean;
  b: boolean;
  select: boolean;
  start: boolean;
};

export type JoypadButton = keyof JoypadState;

export type Joypad = {
  writeByte: (value: number) => void;
  readByte: () => number;
};

export function createJoypad(gameBoy: GameBoy): Joypad {
  const state: JoypadState = {
    up: false,
    down: false,
    left: false,
    right: false,
    a: false,
    b: false,
    select: false,
    start: false,
  };

  let selectByte = 0b00110000;

  const joypadMap: Record<string, JoypadButton> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    z: "a",
    x: "b",
    Shift: "select",
    Enter: "start",
  };

  if (typeof window != "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key in joypadMap) {
        e.preventDefault();
      }
      if (e.repeat) return;
      if (e.key in joypadMap) {
        state[joypadMap[e.key]] = true;
      }
      console.log("down", e.key);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key in joypadMap) {
        e.preventDefault();
      }
      if (e.repeat) return;
      if (e.key in joypadMap) {
        state[joypadMap[e.key]] = false;
      }
      console.log("up", e.key);
    });
  }

  function writeByte(value: number) {
    selectByte = value & 0b00110000;
  }

  function readByte() {
    const useButtons = (selectByte & 0b00100000) === 0;
    const useDirectional = (selectByte & 0b00010000) === 0;

    let result = selectByte | 0b00001111;
    if (useDirectional) {
      if (state.down) result &= 0b11110111;
      if (state.up) result &= 0b11111011;
      if (state.left) result &= 0b11111101;
      if (state.right) result &= 0b11111110;
    }
    if (useButtons) {
      if (state.start) result &= 0b11110111;
      if (state.select) result &= 0b11111011;
      if (state.b) result &= 0b11111101;
      if (state.a) result &= 0b11111110;
    }
    return result;
  }

  return {
    writeByte,
    readByte,
  };
}
