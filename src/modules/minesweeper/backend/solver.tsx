import { CellClue, Minefield, Position } from "./types";
import {
  cloneMinefield,
  getAllRevealedClues,
  getAllUnsolvedPositions,
  shuffle,
} from "./utils";

export function getCellClue(
  minefield: Minefield,
  x: number,
  y: number,
): number {
  const clueType = minefield.cellClues[y][x];
  if (!clueType) return -1;
  if (clueType === CellClue.Any) return -1;

  if (
    clueType === CellClue.Vanilla ||
    clueType === CellClue.VanillaHex ||
    clueType === CellClue.VanillaTri ||
    clueType === CellClue.Knight ||
    clueType === CellClue.Cross ||
    clueType === CellClue.MiniCross ||
    clueType === CellClue.Deviation ||
    clueType === CellClue.Outline ||
    clueType === CellClue.Big
  ) {
    let mineCount = 0;
    const visible = getVisiblePositionsFromCell(clueType, x, y);
    for (let [px, py] of visible) {
      if (mineAt(px, py)) {
        mineCount++;
      }
    }
    return mineCount;
  }

  return -1;

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
  if (clueType === undefined) return false;
  if (clueType === CellClue.Any) return false;

  if (
    clueType === CellClue.Vanilla ||
    clueType === CellClue.VanillaHex ||
    clueType === CellClue.VanillaTri ||
    clueType === CellClue.Knight ||
    clueType === CellClue.Cross ||
    clueType === CellClue.MiniCross ||
    clueType === CellClue.Deviation ||
    clueType === CellClue.Outline ||
    clueType === CellClue.Big
  ) {
    const clue = getCellClue(minefield, x, y);
    let flagCount = 0;
    let unsolvedCount = 0;

    const visible = getVisiblePositionsFromCell(clueType, x, y);
    for (let [px, py] of visible) {
      let val = solveStateAt(px, py);
      if (val) {
        flagCount++;
      } else if (val === undefined) {
        unsolvedCount++;
      }
    }

    if (flagCount > clue) return true;
    if (flagCount + unsolvedCount < clue) return true;
    // const remainingMines = minefield.mines - minefield.flags;
    // if (remainingMines + flagCount < clue) return true;
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
 * @param clues if included, only cells included in the mask will be checked for contradictions
 */
function checkForContradictions(minefield: Minefield, clues: Position[]) {
  for (let [x, y] of clues) {
    if (cellClueHasContradiction(minefield, x, y)) {
      return true;
    }
  }
  return false;
}

export function createHypotheticalSolveForVisibleCells(
  minefield: Minefield,
  clues: Position[],
): Minefield | undefined {
  if (checkForContradictions(minefield, clues)) {
    return undefined;
  }

  const visibleUnknownCells = getVisibleUnsolvedPositions(minefield, clues);
  if (visibleUnknownCells.length === 0) {
    return minefield;
  }

  const firstUnknownCell = visibleUnknownCells[0]!;

  const [x, y] = firstUnknownCell;
  minefield.solveState[y][x] = true;
  minefield.flags++;
  const hypotheticalWithFlag = createHypotheticalSolveForVisibleCells(
    minefield,
    clues,
  );
  if (hypotheticalWithFlag) {
    return hypotheticalWithFlag;
  }

  minefield.flags--;
  minefield.solveState[y][x] = false;

  const hypotheticalWithSafe = createHypotheticalSolveForVisibleCells(
    minefield,
    clues,
  );
  if (hypotheticalWithSafe) {
    return hypotheticalWithSafe;
  }

  minefield.solveState[y][x] = undefined;
  return undefined;
}

export function getVisiblePositionsFromCell(
  type: CellClue,
  x: number,
  y: number,
): Position[] {
  if (type === CellClue.Any) {
    return [[x, y]];
  }
  if (type === CellClue.Mine) {
    return [[x, y]];
  }
  if (type === CellClue.Vanilla) {
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],

      [x - 1, y],
      [x, y],
      [x + 1, y],

      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }
  if (type === CellClue.VanillaHex) {
    const shift = x % 2 === 0 ? -1 : 0;
    return [
      [x, y - 1],
      [x, y],
      [x, y + 1],

      [x - 1, y + shift],
      [x - 1, y + shift + 1],
      [x + 1, y + shift],
      [x + 1, y + shift + 1],
    ];
  }
  if (type === CellClue.VanillaTri) {
    const shift = (x + y) % 2 === 0 ? 0 : -1;
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],

      [x - 1, y],
      [x, y],
      [x + 1, y],

      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],

      [x - 2, y + shift],
      [x - 2, y + shift + 1],
      [x + 2, y + shift],
      [x + 2, y + shift + 1],
    ];
  }

  if (type === CellClue.Knight) {
    return [
      [x, y],

      [x - 2, y - 1],
      [x - 2, y + 1],

      [x - 1, y + 2],
      [x + 1, y + 2],

      [x + 2, y - 1],
      [x + 2, y + 1],

      [x - 1, y - 2],
      [x + 1, y - 2],
    ];
  }
  if (type === CellClue.Cross) {
    return [
      [x, y],

      [x, y + 1],
      [x, y + 2],

      [x, y - 1],
      [x, y - 2],

      [x + 1, y],
      [x + 2, y],

      [x - 1, y],
      [x - 2, y],
    ];
  }
  if (type === CellClue.MiniCross) {
    return [
      [x, y],

      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];
  }
  if (type === CellClue.Deviation) {
    return getVisiblePositionsFromCell(CellClue.Vanilla, x, y - 1);
  }
  if (type === CellClue.Big) {
    return [
      [x - 2, y - 2],
      [x - 1, y - 2],
      [x, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 2],

      [x - 2, y - 1],
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 2, y - 1],

      [x - 2, y],
      [x - 1, y],
      [x, y],
      [x + 1, y],
      [x + 2, y],

      [x - 2, y + 1],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],

      [x - 2, y + 2],
      [x - 1, y + 2],
      [x, y + 2],
      [x + 1, y + 2],
      [x + 2, y + 2],
    ];
  }
  if (type === CellClue.Outline) {
    return [
      [x - 2, y - 2],
      [x - 1, y - 2],
      [x, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 2],

      [x - 2, y - 1],
      [x + 2, y - 1],

      [x - 2, y],
      [x, y],
      [x + 2, y],

      [x - 2, y + 1],
      [x + 2, y + 1],

      [x - 2, y + 2],
      [x - 1, y + 2],
      [x, y + 2],
      [x + 1, y + 2],
      [x + 2, y + 2],
    ];
  }

  return [[x, y]];
}

export function getVisibleUnsolvedPositions(
  minefield: Minefield,
  positionalClues: Position[],
): Position[] {
  const result: Position[] = [];
  for (const [clueX, clueY] of positionalClues) {
    for (const [x, y] of getVisiblePositionsFromCell(
      minefield.cellClues[clueY][clueX],
      clueX,
      clueY,
    )) {
      if (x >= 0 && x < minefield.width && y >= 0 && y < minefield.height) {
        if (minefield.solveState[y][x] === undefined) {
          result.push([x, y]);
        }
      }
    }
  }

  return result;
}

export function getHintForClues(
  minefield: Minefield,
  relevantClues: Position[],
): HintResult | undefined {
  let foundSomething = false;
  const mustBeFlag: Position[] = [];
  const mustBeSafe: Position[] = [];
  const visibleCells = getVisibleUnsolvedPositions(minefield, relevantClues);
  for (const [x, y] of visibleCells) {
    minefield.solveState[y][x] = true;
    minefield.flags++;

    const solve = createHypotheticalSolveForVisibleCells(
      cloneMinefield(minefield),

      relevantClues,
    );
    if (!solve) {
      mustBeSafe.push([x, y]);
      foundSomething = true;
    }
    minefield.flags--;
    minefield.solveState[y][x] = undefined;
    if (solve) {
      minefield.solveState[y][x] = false;

      const solve = createHypotheticalSolveForVisibleCells(
        cloneMinefield(minefield),

        relevantClues,
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
      relevantClues: relevantClues,
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

export function positionIsIncomplete(minefield: Minefield, [x, y]: Position) {
  const ruleType = minefield.cellClues[y][x];
  const visiblePositions = getVisiblePositionsFromCell(ruleType, x, y);

  for (let [px, py] of visiblePositions) {
    if (px >= 0 && py >= 0 && px < minefield.width && py < minefield.height) {
      if (minefield.solveState[py][px] === undefined) {
        return true;
      }
    }
  }
  return false;
}

function* getRevealedClueCombinations(
  minefield: Minefield,
  maxSize: number,
): Generator<Position[], void, unknown> {
  const positions = getAllRevealedClues(minefield);
  const incompletePositions = positions.filter((p) =>
    positionIsIncomplete(minefield, p),
  );
  for (let size = 1; size <= maxSize; size++) {
    const combinations = getCombinations(incompletePositions, size);

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

function getRemainingCellsHint(minefield: Minefield): HintResult | undefined {
  const unsolvedPositions = getAllUnsolvedPositions(minefield);
  const unsolvedCount = unsolvedPositions.length;
  if (unsolvedCount === minefield.mines - minefield.flags) {
    return {
      relevantClues: [],
      mustBeFlag: unsolvedPositions,
      mustBeSafe: [],
    };
  }
  return undefined;
}

export function getHint(minefield: Minefield, difficulty = 2, mask?: Position) {
  const masksGen = mask
    ? [[mask]]
    : getRevealedClueCombinations(minefield, difficulty);

  const remainingCellsHint = getRemainingCellsHint(minefield);
  if (remainingCellsHint) {
    return remainingCellsHint;
  }

  for (let positions of masksGen) {
    const hint = getHintForClues(minefield, positions);

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

export function createHypotheticalSolveForEntireBoard(
  minefield: Minefield,
): Minefield | undefined {
  const allClues = getAllRevealedClues(minefield);
  const mostlySolved = createHypotheticalSolveForVisibleCells(
    minefield,
    allClues,
  );
  if (!mostlySolved) {
    return undefined;
  }
  const remainingCells = getAllUnsolvedPositions(mostlySolved);
  const remainingCellsCount = remainingCells.length;
  const remainingMinesCount = minefield.mines - minefield.flags;
  if (remainingMinesCount < 0) return undefined;
  if (remainingMinesCount > remainingCellsCount) return undefined;
  shuffle(remainingCells);
  for (let i = 0; i < remainingMinesCount; i++) {
    const [x, y] = remainingCells[i];
    minefield.solveState[y][x] = true;
    minefield.flags++;
  }
  return mostlySolved;
}
