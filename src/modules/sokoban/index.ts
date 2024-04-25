import { Position, SokobanLevel } from "./types";

function parseLevel(levelStr: string): SokobanLevel {
  const crates: Position[] = [];
  const rows = levelStr.split("\n");
  let player = { x: 0, y: 0 };
  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === "@" || char === "+") {
        player = { x, y };
      }
      if (char === "$" || char === "*") {
        crates.push({ x, y });
      }
    });
  });

  return {
    level: levelStr
      .replaceAll("*", ".")
      .replaceAll("+", ".")
      .replaceAll("@", " ")
      .replaceAll("$", " ")
      .split("\n"),
    crates,
    player,
  };
}

export function parseLevelSet(levelSetStr: string) {
  let parts = levelSetStr.split("\n\n").filter((p) => !p.startsWith(";"));

  return parts.map(parseLevel);
}

export class Sokoban {
  levelRows: string[] = [];
  crates: Position[] = [];
  player: Position = { x: -1, y: -1 };

  loadLevel(level: SokobanLevel) {
    this.levelRows = level.level;
    this.crates = [...level.crates.map((c) => ({ ...c }))];
    this.player = { ...level.player };
  }

  atPosition(x: number, y: number) {
    let levelBit = this.levelRows[y].charAt(x);
    if (levelBit === "#") return "WALL";
    if (this.crates.some((c) => c.x === x && c.y === y)) {
      return "CRATE";
    }
    return "AIR";
  }

  moveCrate(fromX: number, fromY: number, x: number, y: number) {
    let crateIdx = this.crates.findIndex((c) => c.x === fromX && c.y === fromY);
    if (crateIdx === -1) return true;
    if (this.atPosition(x, y) !== "AIR") {
      return false;
    } else {
      this.crates[crateIdx] = { x, y };
      return true;
    }
  }

  checkWin() {
    for (let crate of this.crates) {
      let levelBit = this.levelRows[crate.y].charAt(crate.x);
      if (levelBit !== ".") {
        return false;
      }
    }
    return true;
  }

  render() {
    let result = ``;
    this.levelRows.forEach((row, y) => {
      row.split("").forEach((char, x) => {
        if (char === ".") {
          if (this.crates.some((c) => c.x === x && c.y === y)) {
            char = "*";
          }
          if (this.player.x === x && this.player.y === y) {
            char = "+";
          }
        } else {
          if (this.crates.some((c) => c.x === x && c.y === y)) {
            char = "$";
          }
          if (this.player.x === x && this.player.y === y) {
            char = "@";
          }
        }
        result += char;
      });
      result += "\n";
    });
    return result;
  }

  up() {
    let to = this.atPosition(this.player.x, this.player.y - 1);
    if (to === "AIR") {
      this.player.y--;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x,
          this.player.y - 1,
          this.player.x,
          this.player.y - 2
        )
      ) {
        this.player.y--;
      }
    }
  }
  down() {
    let to = this.atPosition(this.player.x, this.player.y + 1);
    if (to === "AIR") {
      this.player.y++;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x,
          this.player.y + 1,
          this.player.x,
          this.player.y + 2
        )
      ) {
        this.player.y++;
      }
    }
  }
  left() {
    let to = this.atPosition(this.player.x - 1, this.player.y);
    if (to === "AIR") {
      this.player.x--;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x - 1,
          this.player.y,
          this.player.x - 2,
          this.player.y
        )
      ) {
        this.player.x--;
      }
    }
  }
  right() {
    let to = this.atPosition(this.player.x + 1, this.player.y);
    if (to === "AIR") {
      this.player.x++;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x + 1,
          this.player.y,
          this.player.x + 2,
          this.player.y
        )
      ) {
        this.player.x++;
      }
    }
  }
}
