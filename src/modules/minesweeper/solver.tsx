import { multiGetHintForCells } from "./solver-worker";
import { Minefield, Position } from "./types";

export { createHypotheticalSolve, getCellClue } from "./solver-worker";

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

export async function getHint(
  minefield: Minefield,
  difficulty = 2,
  mask?: Position,
) {
  const masksGen = mask
    ? [[[mask]]]
    : getRevealedClueCombinations(minefield, difficulty);

  for (let positions of masksGen) {
    const hint = multiGetHintForCells(minefield, positions);

    if (hint) {
      return hint;
    }
  }
}

export async function solveMinefield(minefield: Minefield, difficulty = 2) {
  let hint: HintResult | undefined;
  do {
    hint = await getHint(cloneMinefield(minefield), difficulty);
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
