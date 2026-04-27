import { Minefield, Position } from "./types";

export function getAllUnsolvedPositions(minefield: Minefield, after?: Position) {
  let positions: Position[] = [];
  const [startX, startY] = after || [0, 0];
  for (let y = startY; y < minefield.height; y++) {
    for (let x = y === startY ? startX : 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === undefined) {
        positions.push([x, y]);
      }
    }
  }
  return positions;
}

export function getAllRevealedClues(minefield: Minefield): Position[] {
  let positions: Position[] = [];
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === false) {
        positions.push([x, y]);
      }
    }
  }
  return positions;
}

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export function countUnsolvedPositions(minefield: Minefield) {
  let count = 0;
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === undefined) {
        count++;
      }
    }
  }
  return count;
}

export function fillUnsolvedPositionsWithFlags(minefield: Minefield) {
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === undefined) {
        minefield.solveState[y][x] = true;
        minefield.flags++;
      }
    }
  }
  return minefield;
}

export function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}
