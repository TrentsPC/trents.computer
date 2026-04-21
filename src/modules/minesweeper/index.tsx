import { createSignal, For } from "solid-js";
import { fonts } from "~/theme.styles";

export type Grid<T> = T[][];

// 5x5: 10
// 6x6: 14
// 7x7: 20
// 8x8: 26

type Position = [x: number, y: number];

export type CellClue = "mine" | "vanilla" | "any";
export type FieldClue = "vanilla";

export type Minefield = {
  width: number;
  height: number;
  mines: number;
  flags: number;
  fieldClue: FieldClue;
  cellClues: Grid<CellClue>;
  solveState: Grid<true | false | undefined>;
};

const t = true;
const f = false;
const u = undefined;
const m = "mine";
const v = "vanilla";
const a = "any";
export const exampleMinefield: Minefield = {
  width: 5,
  height: 5,
  mines: 10,
  flags: 0,
  fieldClue: "vanilla",
  cellClues: [
    [m, m, v, v, v],
    [a, a, v, m, m],
    [v, v, m, m, m],
    [m, a, m, v, a],
    [m, v, v, v, a],
  ],
  solveState: [
    [u, u, u, f, f],
    [u, u, u, u, u],
    [u, u, u, u, u],
    [u, u, u, u, u],
    [u, f, f, u, u],
  ],
};

function getCellClue(minefield: Minefield, x: number, y: number): string {
  const clueType = minefield.cellClues[y][x];
  if (!clueType) return "?";
  if (clueType === "any") return "?";

  if (clueType === "vanilla") {
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
    return minefield.cellClues[y][x] === "mine";
  }
}

const kingsMove = [-1, 0, 1];
function cellClueHasContradiction(
  minefield: Minefield,
  x: number,
  y: number,
): boolean {
  const clueType = minefield.cellClues[y][x];
  if (!clueType) return false;
  if (clueType === "any") return false;

  if (clueType === "vanilla") {
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

  if (clueType === "mine") return false;
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
function createHypotheticalSolve(
  minefield: Minefield,
  lastMinePosition?: Position,
  mask?: Position[],
): Minefield | undefined {
  if (checkForContradictions(minefield, mask)) {
    return undefined;
  }
  const mineCount = minefield.mines;
  const flagCount = minefield.flags;
  if (mineCount === flagCount) return minefield;

  const potentialMines = getAllUnsolvedPositions(minefield, lastMinePosition);
  shuffle(potentialMines);

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
): Generator<Position[], void, unknown> {
  const positions = getAllRevealedCluePositions(minefield);
  for (let size = 1; size <= maxSize; size++) {
    const combinations = getCombinations(positions, size);

    for (let combination of combinations) {
      yield combination;
    }
  }
}

function getHint(minefield: Minefield, difficulty = 2) {
  const mustBeFlag: Position[] = [];
  const mustBeSafe: Position[] = [];

  const masksGen = getRevealedClueCombinations(minefield, difficulty);

  for (let position of masksGen) {
    let foundSomething = false;
    for (let y = 0; y < minefield.height; y++) {
      for (let x = 0; x < minefield.width; x++) {
        if (minefield.solveState[y][x] !== undefined) continue;

        minefield.solveState[y][x] = true;
        minefield.flags++;

        const solve = createHypotheticalSolve(
          cloneMinefield(minefield),
          undefined,
          position,
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
            position,
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
        position,
        mustBeFlag,
        mustBeSafe,
      };
    }
  }
}

function solveMinefield(minefield: Minefield, difficulty = 2) {
  let hint: ReturnType<typeof getHint>;
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

  while (!unsolvable && loops < 15) {
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
    if (minefield.cellClues[y][x] === "mine") {
      continue;
    }

    minefield.cellClues[y][x] = "any";
    const attempt = solveMinefield(cloneMinefield(minefield), difficulty);
    unsolvable = attempt.flags !== attempt.mines;
    if (unsolvable) {
      minefield.cellClues[y][x] = "vanilla";
    }
    loops++;
  }
  return minefield;
}

function generateMinefield({
  difficulty = 2,
  width = 5,
  height = 5,
  mines = 10,
}): Minefield {
  const grid: Grid<CellClue> = Array.from({ length: height }).map((r) =>
    Array.from({ length: width }).fill(v),
  ) as any;
  let minesSoFar = 0;
  while (minesSoFar < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    let currently = grid[y][x];
    if (currently === "mine") continue;
    grid[y][x] = "mine";
    minesSoFar++;
  }
  const solveState = grid.map((row) =>
    row.map((v) => (v === "mine" ? undefined : false)),
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
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = hideCluesUntilBarelySolvable(baseMinefield, difficulty);

  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  baseMinefield = removeCluesUntilBarelySolvable(baseMinefield, difficulty);
  return baseMinefield;
}

export function MinesweeperGame(props: { initialMinefield: Minefield }) {
  const [minefield, setMinefield] = createSignal(props.initialMinefield);
  const [hint, setHint] = createSignal<ReturnType<typeof getHint>>(undefined);

  function updateSolveState(x: number, y: number, state: boolean) {
    const next = cloneMinefield(minefield());
    next.solveState[y][x] = state;
    if (state === true) {
      next.flags++;
    }
    setMinefield(next);
  }

  function isInvolvedInHint(x: number, y: number) {
    const h = hint();
    if (!h) return false;
    if (h.position.some((p) => p[0] === x && p[1] === y)) return true;
    if (h.mustBeFlag.some((p) => p[0] === x && p[1] === y)) return true;
    if (h.mustBeSafe.some((p) => p[0] === x && p[1] === y)) return true;
    return false;
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div>
        {minefield().mines} mines ({minefield().mines - minefield().flags}{" "}
        remaining)
      </div>
      <table>
        <tbody>
          <For each={minefield().solveState}>
            {(row, y) => (
              <tr>
                <For each={row}>
                  {(cell, x) => (
                    <td
                      css={{
                        border: "1px solid black",
                        width: 64,
                        height: 64,
                        fontScale: 6,
                        textAlign: "center",
                        fontFamily: fonts.mono,
                      }}
                      style={{
                        "background-color": isInvolvedInHint(x(), y())
                          ? "cyan"
                          : "transparent",
                      }}
                      onClick={() => {
                        setHint(undefined);
                        if (cell !== undefined) return;
                        const oppositeTest = cloneMinefield(minefield());
                        oppositeTest.solveState[y()][x()] = true;
                        oppositeTest.flags++;

                        const badSolve = createHypotheticalSolve(oppositeTest);
                        if (badSolve) {
                          setMinefield(badSolve);
                        } else {
                          updateSolveState(x(), y(), false);
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setHint(undefined);
                        if (cell !== undefined) return;

                        const oppositeTest = cloneMinefield(minefield());
                        oppositeTest.solveState[y()][x()] = false;

                        const badSolve = createHypotheticalSolve(oppositeTest);
                        if (badSolve) {
                          oppositeTest.solveState[y()][x()] = undefined;
                          setMinefield(badSolve);
                        } else {
                          updateSolveState(x(), y(), true);
                        }
                      }}
                    >
                      {cell === undefined
                        ? ""
                        : cell
                          ? "⛳️"
                          : getCellClue(minefield(), x(), y())}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <button
        onClick={() => {
          const hint = getHint(minefield(), 3);
          setHint(hint);
        }}
      >
        GET HINT
      </button>
      {/* <button
        onClick={() => {
          const clone = cloneMinefield(minefield());
          const solve = createHypotheticalSolve(clone);
          console.log({ solve });
          if (solve) {
            setMinefield(solve);
          }
        }}
      >
        SOLVE???
      </button> */}
      {/* <button
        onClick={() => {
          setMinefield(exampleMinefield);
        }}
      >
        RESET
      </button> */}
      <button
        onClick={() => {
          setMinefield(
            generateMinefield({
              difficulty: 2,
              width: 5,
              height: 5,
              mines: 10,
            }),
          );
          setHint(undefined);
        }}
      >
        NEW 5x5 PUZZLE
      </button>
      {/* <button
        onClick={() => {
          setMinefield(
            generateMinefield({
              difficulty: 2,
              width: 8,
              height: 4,
              mines: 14,
            }),
          );
          setHint(undefined);
        }}
      >
        NEW 4x8 PUZZLE
      </button>
      <button
        onClick={() => {
          setMinefield(
            generateMinefield({
              difficulty: 2,
              width: 6,
              height: 6,
              mines: 14,
            }),
          );
          setHint(undefined);
        }}
      >
        NEW 6x6 PUZZLE
      </button>
      <button
        onClick={() => {
          setMinefield(
            generateMinefield({
              difficulty: 2,
              width: 7,
              height: 7,
              mines: 20,
            }),
          );
          setHint(undefined);
        }}
      >
        NEW 7x7 PUZZLE
      </button>
      <button
        onClick={() => {
          setMinefield(
            generateMinefield({
              difficulty: 2,
              width: 8,
              height: 8,
              mines: 26,
            }),
          );
          setHint(undefined);
        }}
      >
        NEW 8x8 PUZZLE
      </button> */}
      <button
        onClick={() => {
          setHint(undefined);
          const next = solveMinefield(minefield(), 2);
          setMinefield(next);
        }}
      >
        SOLVE
      </button>

      {/* <button
        onClick={() => {
          const start = performance.now();
          for (let n = 0; n < 10; n++) {
            solveMinefield(exampleMinefield, 2);
          }
          const end = performance.now();
          console.log("TIME: ", ((end - start) / 10).toFixed(0));
        }}
      >
        BENCHMARK
      </button> */}
    </div>
  );
}
