import { solveMinefield } from "./solver-2";
import { CellClue, Grid, GridType, Minefield } from "./types";
import { getAllRevealedClues } from "./utils";

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
  let loops = 0;

  const knownClues = getAllRevealedClues(minefield);

  while (!unsolvable && loops < 100) {
    const clueIndex = Math.floor(Math.random() * knownClues.length);
    const [clue] = knownClues.splice(clueIndex, 1);
    const [x, y] = clue;
    if (minefield.solveState[y][x] !== false) {
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
    const clueType = minefield.cellClues[y][x];
    if (clueType === CellClue.Mine) {
      continue;
    }

    minefield.cellClues[y][x] = CellClue.Any;
    const attempt = solveMinefield(cloneMinefield(minefield), difficulty);
    unsolvable = attempt.flags !== attempt.mines;
    if (unsolvable) {
      minefield.cellClues[y][x] = clueType;
    }
    loops++;
  }
  return minefield;
}

export type GenerateMinefieldOptions = {
  difficulty: number;
  width: number;
  height: number;
  mines: number;
  grid: GridType;
};

export function createHexGrid(width = 5, height = 5): Grid<CellClue> {
  const grid: Grid<CellClue> = Array.from({ length: height }).map((r) =>
    Array.from({ length: width }).fill(CellClue.VanillaHex),
  ) as any;
  const half = (width - 1) / 2;
  const startsAtTop = ((width - 1) / 2) % 2 === 0;

  let start = startsAtTop ? half - 1 : half;

  for (let y = 0; y < height / 2; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.min(x, width - 1 - x);
      if (dist < start) {
        grid[y][x] = CellClue.Any;
      }
    }
    start -= 2;
  }
  start = startsAtTop ? half : half - 1;
  for (let y = height - 1; y > height / 2; y--) {
    for (let x = 0; x < width; x++) {
      const dist = Math.min(x, width - 1 - x);
      if (dist < start) {
        grid[y][x] = CellClue.Any;
      }
    }
    start -= 2;
  }

  return grid;
}

export function generateMinefield({
  difficulty = 2,
  width = 5,
  height = 5,
  mines = 10,
  grid: gridType = "square",
}: GenerateMinefieldOptions): Minefield {
  const defaultClue = {
    hex: CellClue.VanillaHex,
    square: CellClue.Vanilla,
    triangle: CellClue.VanillaTri,
  }[gridType];
  let grid: Grid<CellClue> = Array.from({ length: height }).map((r) =>
    Array.from({ length: width }).fill(defaultClue),
  ) as any;
  if (gridType === "hex") {
    grid = createHexGrid(width, height);
  }
  let minesSoFar = 0;
  while (minesSoFar < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    let currently = grid[y][x];
    if (currently !== defaultClue) continue;
    grid[y][x] = CellClue.Mine;
    minesSoFar++;
  }
  const solveState = grid.map((row) =>
    row.map((v) => (v === CellClue.Mine ? undefined : false)),
  );
  let baseMinefield: Minefield = {
    cellClues: grid,
    grid: gridType,
    fieldClue: "vanilla",
    flags: 0,
    height,
    mines,
    solveState,
    width,
  };

  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);

  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);

  if (gridType === "hex") {
    let mask = createHexGrid(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (mask[y][x] === CellClue.Any) {
          baseMinefield.solveState[y][x] = false;
        }
      }
    }
  }
  return baseMinefield;
}

function isSolved(minefield: Minefield) {
  return minefield.flags === minefield.mines;
}

export function generateSatisfyingMinefield(opts: GenerateMinefieldOptions) {
  const simpleSolverDifficulty = opts.difficulty - 1;

  for (let n = 1; n <= 10; n++) {
    const randomMinefield = generateMinefield(opts);
    const simpleAttempt = solveMinefield(
      cloneMinefield(randomMinefield),
      simpleSolverDifficulty,
    );
    if (!isSolved(simpleAttempt)) {
      return randomMinefield;
    }
  }
}

export function benchmarkGenerator() {
  const start = performance.now();
  for (let n = 1; n <= 200; n++) {
    generateMinefield({
      difficulty: 2,
      height: 4,
      mines: 5,
      width: 4,
      grid: "square",
    });
    if (n % 20 === 0) {
      const end = performance.now();
      const time = (end - start) / n;
      console.log(time.toFixed(1));
    }
  }
  console.log("END");
}
