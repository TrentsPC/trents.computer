import { createSignal, For } from "solid-js";
import { fonts } from "~/theme.styles";
import { benchmarkGenerator, generateMinefield } from "./generator";
import {
  createHypotheticalSolve,
  getCellClue,
  getHint,
  HintResult,
  solveMinefield,
} from "./solver";
import { CellClue, Minefield } from "./types";

// 5x5: 10
// 6x6: 14
// 7x7: 20
// 8x8: 26

// Calculated ideal mine counts per size:
// 3x4: 3 (NOT GOOD) (LOTTA DUPE-LOOKING PUZZLES)
// 3x5: 4
// 4x4: 5

const mineCounts: Record<string, number | undefined> = {
  // "3x4": 3,
  "3x5": 4,
  "3x6": 6, // 4,5,6, and 7 all seem about equivalent
  "3x7": 6, // 6-7
  "4x4": 5,
  "4x5": 6, // 4-7
  "5x5": 10,
  "6x6": 14,
  "7x7": 20,
  "8x8": 26,
};

function getMineCount(width: number, height: number) {
  const long = Math.max(width, height);
  const short = Math.min(width, height);
  const str = short + "x" + long;
  return mineCounts[str];
}

const t = true;
const f = false;
const u = undefined;
const m = CellClue.Mine;
const v = CellClue.Vanilla;
const a = CellClue.Any;
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

function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}

type GenerateMinefieldOptions = {
  difficulty: number;
  width: number;
  height: number;
  mines: number;
};

export function MinesweeperGame(props: { initialMinefield: Minefield }) {
  const [minefield, setMinefield] = createSignal(props.initialMinefield);
  const [hint, setHint] = createSignal<HintResult | undefined>(undefined);
  const [difficulty, setDifficulty] = createSignal(3);

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
    if (h.relevantClues.some((p) => p[0] === x && p[1] === y)) return true;
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
                      onClick={async () => {
                        setHint(undefined);
                        if (cell === false) {
                          // Try Auto-complete
                          const hint = await getHint(minefield(), 1, [
                            x(),
                            y(),
                          ]);
                          if (hint) {
                            let next = cloneMinefield(minefield());
                            for (let [flagX, flagY] of hint.mustBeFlag) {
                              if (
                                Math.abs(flagX - x()) <= 1 &&
                                Math.abs(flagY - y()) <= 1
                              ) {
                                next.solveState[flagY][flagX] = true;
                                next.flags++;
                              }
                            }
                            for (let [safeX, safeY] of hint.mustBeSafe) {
                              if (
                                Math.abs(safeX - x()) <= 1 &&
                                Math.abs(safeY - y()) <= 1
                              ) {
                                next.solveState[safeY][safeX] = false;
                              }
                            }
                            setMinefield(next);
                          }
                          return;
                        }
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
        onClick={async () => {
          const hint = await getHint(minefield(), difficulty());
          setHint(hint);
        }}
      >
        GET HINT
      </button>
      NEW GAME
      <table>
        <tbody>
          <For each={[3, 4, 5, 6, 7, 8]}>
            {(height) => (
              <tr>
                <For each={[3, 4, 5, 6, 7, 8]}>
                  {(width) => (
                    <td
                      css={{
                        width: 32,
                        height: 32,
                        border: "1px solid black",
                        fontScale: 0,
                        textAlign: "center",
                        color: "transparent",
                        "&:hover": {
                          color: "black",
                        },
                      }}
                      style={{
                        "background-color": getMineCount(width, height)
                          ? "white"
                          : "lightgrey",
                      }}
                      onClick={async () => {
                        const mines = getMineCount(width, height);
                        if (mines) {
                          const canDoSatisfying = width * height < 25;
                          if (canDoSatisfying) {
                            const satisfying =
                              await generateSatisfyingMinefield({
                                difficulty: difficulty(),
                                width: width,
                                height: height,
                                mines: mines,
                              });
                            if (satisfying) {
                              setMinefield(satisfying);
                              setHint(undefined);
                            }
                          } else {
                            setMinefield(
                              await generateMinefield({
                                difficulty: difficulty(),
                                width: width,
                                height: height,
                                mines: mines,
                              }),
                            );
                            setHint(undefined);
                          }
                        }
                      }}
                    >
                      {width}x{height}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <button
        onClick={async () => {
          const solve = await solveMinefield(minefield(), 2);
          setMinefield(solve);
        }}
      >
        SOLVE
      </button>
      <button
        onClick={() => {
          benchmarkGenerator();
        }}
      >
        BENCHMARK
      </button>
      <button
        onClick={() => {
          getSatisfactionRate({
            difficulty: difficulty(),
            width: 4,
            height: 5,
            mines: 7,
          });
        }}
      >
        SATISFY
      </button>
    </div>
  );
}

function isSolved(minefield: Minefield) {
  return minefield.flags === minefield.mines;
}

async function getSatisfactionRate(opts: GenerateMinefieldOptions) {
  const simpleSolverDifficulty = opts.difficulty - 1;

  const minMines = 4;
  const maxMines = Math.min((opts.height * opts.width) / 2);

  const satisfyCountByMineCount = Array.from({ length: maxMines + 1 }).fill(
    0,
  ) as number[];

  for (let n = 1; n <= 400; n++) {
    for (let mines = minMines; mines <= maxMines; mines++) {
      const randomMinefield = await generateMinefield({ ...opts, mines });
      const simpleAttempt = await solveMinefield(
        randomMinefield,
        simpleSolverDifficulty,
      );
      if (!isSolved(simpleAttempt)) {
        satisfyCountByMineCount[mines]++;
      }
    }
    if (n % 10 === 0) {
      console.table(satisfyCountByMineCount);
    }
  }
  console.log("END");
}

async function generateSatisfyingMinefield(opts: GenerateMinefieldOptions) {
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
