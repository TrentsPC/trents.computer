import { solveMinefield } from "./solver";
import { CellClue, Grid, Minefield, Position } from "./types";

function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}

function hideCluesUntilBarelySolvable(
  minefield: Minefield,
  difficulty: number,
) {
  let unsolvable = false;
  const { width, height } = minefield;
  let loops = 0;

  while (!unsolvable && loops < 100) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (minefield.solveState[y][x] === undefined) {
      continue;
    }

    minefield.solveState[y][x] = undefined;
    const attempt = solveMinefield(cloneMinefield(minefield), difficulty);
    unsolvable = attempt.flags !== attempt.mines;
    if (unsolvable) {
      minefield.solveState[y][x] = false;
    }
    loops++;
  }
  return minefield;
}

function getRemainingCluePositions(minefield: Minefield): Position[] {
  let res: Position[] = [];
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === false) {
        res.push([x, y]);
      }
    }
  }
  return res;
}
function getRemainingClueCount(minefield: Minefield) {
  let res = 0;
  for (let y = 0; y < minefield.height; y++) {
    for (let x = 0; x < minefield.width; x++) {
      if (minefield.solveState[y][x] === false) {
        res++;
      }
    }
  }
  return res;
}

function hideAsManyCluesAsPossible(
  minefield: Minefield,
  difficulty: number,
  remainingCluePositions?: Position[],
  depth = 0,
): { minefield: Minefield; depth: number } {
  let bestAttempt = minefield;
  let bestAttemptDepth = depth;
  if (!remainingCluePositions) {
    remainingCluePositions = getRemainingCluePositions(minefield);
  }
  for (let i = 0; i < remainingCluePositions.length; i++) {
    const [x, y] = remainingCluePositions[i]!;
    minefield.solveState[y][x] = undefined;
    const attempt = solveMinefield(cloneMinefield(minefield), difficulty);
    let unsolvable = attempt.flags !== attempt.mines;
    if (!unsolvable) {
      const deeperAttempt = hideAsManyCluesAsPossible(
        minefield,
        difficulty,
        remainingCluePositions.slice(i),
        depth + 1,
      );
      if (deeperAttempt.depth > bestAttemptDepth) {
        bestAttempt = cloneMinefield(deeperAttempt.minefield);
        bestAttemptDepth = deeperAttempt.depth;
      }
    }
    minefield.solveState[y][x] = false;
  }
  return { minefield: bestAttempt, depth: bestAttemptDepth };
}

function removeCluesUntilBarelySolvable(
  minefield: Minefield,
  difficulty: number,
) {
  let unsolvable = false;
  const { width, height } = minefield;
  let loops = 0;

  while (!unsolvable && loops < 15) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (minefield.cellClues[y][x] === CellClue.Mine) {
      continue;
    }

    minefield.cellClues[y][x] = CellClue.Any;
    const attempt = solveMinefield(cloneMinefield(minefield), difficulty);
    unsolvable = attempt.flags !== attempt.mines;
    if (unsolvable) {
      minefield.cellClues[y][x] = CellClue.Vanilla;
    }
    loops++;
  }
  return minefield;
}

type GenerateMinefieldOptions = {
  difficulty: number;
  width: number;
  height: number;
  mines: number;
};

export async function generateMinefield({
  difficulty = 2,
  width = 5,
  height = 5,
  mines = 10,
}: GenerateMinefieldOptions): Promise<Minefield> {
  const grid: Grid<CellClue> = Array.from({ length: height }).map((r) =>
    Array.from({ length: width }).fill(CellClue.Vanilla),
  ) as any;
  let minesSoFar = 0;
  while (minesSoFar < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    let currently = grid[y][x];
    if (currently === CellClue.Mine) continue;
    grid[y][x] = CellClue.Mine;
    minesSoFar++;
  }
  const solveState = grid.map((row) =>
    row.map((v) => (v === CellClue.Mine ? undefined : false)),
  );
  let baseMinefield: Minefield = {
    cellClues: grid,
    fieldClue: "vanilla",
    flags: 0,
    height,
    mines,
    solveState,
    width,
  };

  const hideAttempts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() =>
    hideCluesUntilBarelySolvable(cloneMinefield(baseMinefield), difficulty),
  );
  hideAttempts.sort(
    (a, b) => getRemainingClueCount(a) - getRemainingClueCount(b),
  );
  baseMinefield = hideAttempts[0];

  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);

  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  return baseMinefield;
}

function isSolved(minefield: Minefield) {
  return minefield.flags === minefield.mines;
}

export async function generateSatisfyingMinefield(
  opts: GenerateMinefieldOptions,
) {
  const simpleSolverDifficulty = opts.difficulty - 1;

  for (let n = 1; n <= 100; n++) {
    const randomMinefield = await generateMinefield(opts);
    const simpleAttempt = await solveMinefield(
      cloneMinefield(randomMinefield),
      simpleSolverDifficulty,
    );
    if (!isSolved(simpleAttempt)) {
      return randomMinefield;
    }
  }
}

export async function benchmarkGenerator() {
  const start = performance.now();
  for (let n = 1; n <= 200; n++) {
    await generateMinefield({
      difficulty: 2,
      height: 4,
      mines: 5,
      width: 4,
    });
    if (n % 20 === 0) {
      const end = performance.now();
      const time = (end - start) / n;
      console.log(time.toFixed(1));
    }
  }
  console.log("END");
}
