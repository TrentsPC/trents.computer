import { CellClue, Minefield, Position } from "./types";
import {
  countUnsolvedPositions,
  fillUnsolvedPositionsWithFlags,
  getAllRevealedClues,
  getAllUnsolvedPositions,
  shuffle,
} from "./utils";

export function getCellClue(
  minefield: Minefield,
  x: number,
  y: number,
): string {
  const clueType = minefield.cellClues[y][x];
  if (!clueType) return "?";
  if (clueType === CellClue.Any) return "?";

  if (clueType === CellClue.Vanilla) {
    let mineCount = 0;
    for (let dx of [-1, 0, 1]) {
      for (let dy of [-1, 0, 1]) {
        if (mineAt(x + dx, y + dy)) {
          mineCount++;
        }
      }
    }
    return mineCount + "";
  }

  return "lol";

  function mineAt(x: number, y: number) {
    if (x < 0) return false;
    if (x > minefield.width - 1) return false;
    if (y < 0) return false;
    if (y > minefield.height - 1) return false;
    return minefield.cellClues[y][x] === CellClue.Mine;
  }
}

function cellClueHasContradiction(
  minefield: Minefield,
  x: number,
  y: number,
): boolean {
  const clueType = minefield.cellClues[y][x];
  if (!clueType) return false;
  if (clueType === CellClue.Any) return false;

  if (clueType === CellClue.Vanilla) {
    const clueStr = getCellClue(minefield, x, y);
    const clue = Number(clueStr);
    if (!isFinite(clue)) return true;
    let flagCount = 0;
    let unsolvedCount = 0;

    for (let dx of [-1, 0, 1]) {
      for (let dy of [-1, 0, 1]) {
        if (dx === 0 && dy === 0) continue;
        let val = solveStateAt(x + dx, y + dy);
        if (val) {
          flagCount++;
        } else if (val === undefined) {
          unsolvedCount++;
        }
      }
    }
    if (flagCount > clue) return true;
    if (flagCount + unsolvedCount < clue) return true;
    const remainingMines = minefield.mines - minefield.flags;
    if (remainingMines + flagCount < clue) return true;
    return false;
  }

  if (clueType === CellClue.Mine) return false;
  return false;

  function solveStateAt(x: number, y: number): boolean | undefined {
    if (x < 0) return false;
    if (x > minefield.width - 1) return false;
    if (y < 0) return false;
    if (y > minefield.height - 1) return false;
    return minefield.solveState[y][x];
  }
}

/**
 * Returns true if any contradiction is guaranteed within currently known clues
 *
 * @param mask if included, only cells included in the mask will be checked for contradictions
 */
function checkForContradictions(minefield: Minefield, mask?: Position[]) {
  if (mask) {
    for (let [x, y] of mask) {
      const isVisibleClue = minefield.solveState[y][x] === false;
      if (isVisibleClue && cellClueHasContradiction(minefield, x, y)) {
        return true;
      }
    }
    return false;
  } else {
    for (let x = 0; x < minefield.width; x++) {
      for (let y = 0; y < minefield.height; y++) {
        const isVisibleClue = minefield.solveState[y][x] === false;
        if (isVisibleClue && cellClueHasContradiction(minefield, x, y)) {
          return true;
        }
      }
    }
    return false;
  }
}

/**
 * Create a possible arrangement of mines that satisfies all currently known clues
 *
 * Returns undefined if no solution exists
 */
export function createHypotheticalSolve(
  minefield: Minefield,
  lastMinePosition?: Position,
  mask?: Position[],
  doShuffle?: boolean,
): Minefield | undefined {
  if (checkForContradictions(minefield, mask)) {
    return undefined;
  }
  const mineCount = minefield.mines;
  const flagCount = minefield.flags;
  const unsolvedCount = countUnsolvedPositions(minefield);
  if (mineCount === flagCount) return minefield;
  if (unsolvedCount === mineCount - flagCount) {
    return fillUnsolvedPositionsWithFlags(minefield);
  }

  let potentialMines = getAllUnsolvedPositions(minefield, undefined);

  if (doShuffle) {
    shuffle(potentialMines);
  }

  for (const potentialMine of potentialMines) {
    const [x, y] = potentialMine;
    if (minefield.solveState[y][x] !== undefined) continue;
    minefield.solveState[y][x] = true;

    minefield.flags++;
    const hypotheticalWithFlag = createHypotheticalSolve(
      minefield,
      undefined,
      mask,
    );
    if (hypotheticalWithFlag) {
      return hypotheticalWithFlag;
    }

    minefield.flags--;
    minefield.solveState[y][x] = false;

    const hypotheticalWithSafe = createHypotheticalSolve(
      minefield,
      undefined,
      mask,
    );
    if (hypotheticalWithSafe) {
      return hypotheticalWithSafe;
    } else {
      minefield.solveState[y][x] = false;
    }
  }

  return undefined;
}

export function getVisiblePositionsFromCell(
  type: CellClue,
  x: number,
  y: number,
): Position[] {
  if (type === CellClue.Any) {
    return [];
  }
  if (type === CellClue.Mine) {
    return [];
  }
  if (type === CellClue.Vanilla) {
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],

      [x - 1, y],
      [x + 1, y],

      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }
  return [];
}

export function getVisibleCells(
  minefield: Minefield,
  positionalClues: Position[],
  fullScan = false,
): Position[] {
  const result: Position[] = [];
  if (fullScan) {
    for (let y = 0; y < minefield.height; y++) {
      for (let x = 0; x < minefield.width; x++) {
        result.push([x, y]);
      }
    }
  } else {
    for (const [clueX, clueY] of positionalClues) {
      for (const [x, y] of getVisiblePositionsFromCell(
        minefield.cellClues[clueY][clueX],
        clueX,
        clueY,
      )) {
        if (x >= 0 && x < minefield.width && y >= 0 && y < minefield.height) {
          result.push([x, y]);
        }
      }
    }
  }
  return result;
}

export function getHintForCells(
  minefield: Minefield,
  relevantCells: Position[],
  fullScan = false,
): HintResult | undefined {
  let foundSomething = false;
  const mustBeFlag: Position[] = [];
  const mustBeSafe: Position[] = [];
  const visibleCells = getVisibleCells(minefield, relevantCells, fullScan);
  for (const [x, y] of visibleCells) {
    if (minefield.solveState[y][x] !== undefined) continue;

    minefield.solveState[y][x] = true;
    minefield.flags++;

    const solve = createHypotheticalSolve(
      cloneMinefield(minefield),
      undefined,
      relevantCells,
    );
    if (!solve) {
      mustBeSafe.push([x, y]);
      foundSomething = true;
    }
    minefield.flags--;
    minefield.solveState[y][x] = undefined;
    if (solve) {
      minefield.solveState[y][x] = false;

      const solve = createHypotheticalSolve(
        cloneMinefield(minefield),
        undefined,
        relevantCells,
      );
      if (!solve) {
        mustBeFlag.push([x, y]);
        foundSomething = true;
      }
    }
    minefield.solveState[y][x] = undefined;
  }
  if (foundSomething) {
    return {
      relevantClues: relevantCells,
      mustBeFlag,
      mustBeSafe,
    };
  }
}

function getCombinations<T>(sourceArray: T[], k: number) {
  const result: T[][] = [];

  function helper(start: number, currentCombination: T[]) {
    // If the combination is done
    if (currentCombination.length === k) {
      result.push([...currentCombination]);
      return;
    }

    // Iterate through the array
    for (let i = start; i < sourceArray.length; i++) {
      currentCombination.push(sourceArray[i]);
      helper(i + 1, currentCombination);
      currentCombination.pop(); // Backtrack
    }
  }

  helper(0, []);
  return result;
}

function* getRevealedClueCombinations(
  minefield: Minefield,
  maxSize: number,
): Generator<Position[], void, unknown> {
  const positions = getAllRevealedClues(minefield);
  for (let size = 1; size <= maxSize; size++) {
    const combinations = getCombinations(positions, size);

    for (const combination of combinations) {
      yield combination;
    }
  }
}

export type HintResult = {
  relevantClues: Position[];
  mustBeFlag: Position[];
  mustBeSafe: Position[];
};

export function getHint(minefield: Minefield, difficulty = 2, mask?: Position) {
  const masksGen = mask
    ? [[mask]]
    : getRevealedClueCombinations(minefield, difficulty);

  const hint = getHintForCells(minefield, [], true);

  if (hint) {
    return hint;
  }

  for (let positions of masksGen) {
    const hint = getHintForCells(minefield, positions, false);

    if (hint) {
      return hint;
    }
  }
  return undefined;
}

export function solveMinefield(minefield: Minefield, difficulty = 2) {
  let hint: HintResult | undefined;
  do {
    hint = getHint(cloneMinefield(minefield), difficulty);
    if (hint) {
      const next = cloneMinefield(minefield);
      for (let [x, y] of hint.mustBeFlag) {
        next.solveState[y][x] = true;
        next.flags++;
      }
      for (let [x, y] of hint.mustBeSafe) {
        next.solveState[y][x] = false;
      }
      minefield = next;
    }
  } while (hint && (hint?.mustBeFlag.length || hint?.mustBeSafe.length));
  return minefield;
}

export function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}
