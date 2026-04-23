import { CellClue, Minefield, Position } from "./types";

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
    const totalFlags = minefield.flags;
    const remainingFlags = minefield.mines - totalFlags;
    let flagCount = 0;

    for (let dx of [-1, 0, 1]) {
      for (let dy of [-1, 0, 1]) {
        if (dx === 0 && dy === 0) continue;
        let val = solveStateAt(x + dx, y + dy);
        if (val) {
          flagCount++;
        }
      }
    }
    if (flagCount > clue) return true;
    if (flagCount + remainingFlags < clue) return true;
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

function getAllUnsolvedPositions(minefield: Minefield, after?: Position) {
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

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
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
  if (mineCount === flagCount) return minefield;

  const potentialMines = getAllUnsolvedPositions(minefield, lastMinePosition);
  if (doShuffle) {
    shuffle(potentialMines);
  }

  for (const potentialMine of potentialMines) {
    const [x, y] = potentialMine;
    minefield.solveState[y][x] = true;

    minefield.flags++;
    const hypothetical = createHypotheticalSolve(
      minefield,
      potentialMine,
      mask,
    );
    if (hypothetical) {
      return hypothetical;
    } else {
      minefield.flags--;
      minefield.solveState[y][x] = undefined;
    }
  }

  return undefined;
}

function getAllRevealedCluePositions(minefield: Minefield) {
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
): Generator<Position[][], void, unknown> {
  const positions = getAllRevealedCluePositions(minefield);
  for (let size = 1; size <= maxSize; size++) {
    const combinations = getCombinations(positions, size);

    yield combinations;
  }
}

export type HintResult = {
  relevantClues: Position[];
  mustBeFlag: Position[];
  mustBeSafe: Position[];
};

export function getHintForCells(
  minefield: Minefield,
  relevantCells: Position[],
): HintResult | undefined {
  let foundSomething = false;
  const mustBeFlag: Position[] = [];
  const mustBeSafe: Position[] = [];
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
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
  }
  if (foundSomething) {
    return {
      relevantClues: relevantCells,
      mustBeFlag,
      mustBeSafe,
    };
  }
}

export function multiGetHintForCells(
  minefield: Minefield,
  relevantCells: Position[][],
) {
  for (const cells of relevantCells) {
    const hint = getHintForCells(minefield, cells);
    if (hint) {
      return hint;
    }
  }
}

export function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}

self.onmessage = (
  event: MessageEvent<{
    minefield: Minefield;
    relevantCells: Position[][];
  }>,
) => {
  const hint = multiGetHintForCells(
    event.data.minefield,
    event.data.relevantCells,
  );
  postMessage(hint);
};
