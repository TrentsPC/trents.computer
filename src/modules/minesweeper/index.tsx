import { createMemo, createSignal, For } from "solid-js";
import { fonts } from "~/theme.styles";
import {
  benchmarkGenerator,
  generateMinefield,
  GenerateMinefieldOptions,
} from "./generator";
import {
  createHypotheticalSolveForEntireBoard,
  getCellClue,
  getHint,
  getVisibleUnsolvedPositions,
  HintResult,
  solveMinefield,
} from "./solver-2";
import { CellClue, Minefield, Position } from "./types";

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
  grid: "square",
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

export function MinesweeperGame(props: { initialMinefield: Minefield }) {
  const [minefield, setMinefield] = createSignal(props.initialMinefield);
  const [failure, setFailure] = createSignal<Minefield | undefined>();
  const [hint, setHint] = createSignal<HintResult | undefined>(undefined);
  const [difficulty, setDifficulty] = createSignal(2);
  const [debug, setDebug] = createSignal(true);
  const [hoveredPosition, setHoveredClue] = createSignal<Position | undefined>(
    undefined,
  );
  const visible = createMemo(() =>
    getVisibleUnsolvedPositions(
      minefield(),
      hoveredPosition() ? [hoveredPosition()!] : [],
    ),
  );

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
    if (h.relevantClues.some((p) => p[0] === x && p[1] === y)) return "clue";
    if (h.mustBeFlag.some((p) => p[0] === x && p[1] === y)) return "mine";
    if (h.mustBeSafe.some((p) => p[0] === x && p[1] === y)) return "safe";
    return false;
  }
  function isVisible(x: number, y: number) {
    // return false;
    const h = visible();
    if (!h) return false;
    if (h.some((p) => p[0] === x && p[1] === y)) return true;
    return false;
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // height: "100%",
      }}
    >
      <div>
        {minefield().mines} mines ({minefield().mines - minefield().flags}{" "}
        remaining)
      </div>
      <div
        style={{
          display: "grid",
          // border: `1px solid black`,
          "row-gap": "2px",
          "column-gap": "2px",
          "grid-template-columns": `repeat(${minefield().width}, 1fr)`,
        }}
      >
        <For each={minefield().solveState}>
          {(row, y) => (
            <For each={row}>
              {(cell, x) => {
                const clue = createMemo(() =>
                  getCellClue(minefield(), x(), y()),
                );
                const failed = () => failure()?.solveState[y()][x()] === true;
                return (
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // border: "1px solid black",
                      width: 64,
                      height: 64,
                      fontScale: 6,
                      textAlign: "center",
                      fontFamily: fonts.mono,
                      "&[data-grid=hex]": {
                        "--s": "64px",
                        height: "var(--s)",
                        width: "calc(var(--s) * 1.1547)",
                        "clip-path":
                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        marginRight: "calc(var(--s) * -0.11547 * 2 - 4px)",
                      },
                      "&[data-grid=triangle]": {
                        "--s": "64px",
                        width: "var(--s)",
                        height: "calc(var(--s) / 1.1547)",
                        "clip-path": "polygon(50% 0%, 100% 100%, 0% 100%)",
                        marginRight: "calc(var(--s) * -0.250 * 2)",
                        "&[data-even-row=false]": {
                          "clip-path": "polygon(0% 0%, 100% 0%, 50% 100%)",
                        },
                        "&[data-even-col=false]": {
                          "clip-path": "polygon(0% 0%, 100% 0%, 50% 100%)",
                          "&[data-even-row=false]": {
                            "clip-path": "polygon(50% 0%, 100% 100%, 0% 100%)",
                          },
                        },
                      },
                    }}
                    data-grid={minefield().grid}
                    data-even-col={x() % 2 === 0 ? "true" : "false"}
                    data-even-row={y() % 2 === 0 ? "true" : "false"}
                    style={{
                      transform:
                        minefield().grid === "hex"
                          ? x() % 2 === 1
                            ? `translateY(50%)`
                            : undefined
                          : undefined,
                      // ...(minefield().grid === "hex"
                      //   ? {
                      //   }
                      //   : {}),

                      "background-color":
                        isInvolvedInHint(x(), y()) === "clue"
                          ? "gold"
                          : isInvolvedInHint(x(), y())
                            ? "lightseagreen"
                            : isVisible(x(), y())
                              ? "silver"
                              : "rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={() => {
                      if (cell === false) {
                        setHoveredClue([x(), y()]);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredClue(undefined);
                    }}
                    onClick={() => {
                      setHint(undefined);
                      if (cell === false) {
                        // Try Auto-complete
                        const hint = getHint(minefield(), 1, [x(), y()]);
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

                      const badSolve =
                        createHypotheticalSolveForEntireBoard(oppositeTest);
                      if (badSolve) {
                        setFailure(badSolve);
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

                      const badSolve =
                        createHypotheticalSolveForEntireBoard(oppositeTest);
                      if (badSolve) {
                        oppositeTest.solveState[y()][x()] = undefined;
                        setFailure(badSolve);
                      } else {
                        updateSolveState(x(), y(), true);
                      }
                    }}
                  >
                    {failed()
                      ? "💣"
                      : cell === undefined
                        ? ""
                        : cell
                          ? "⛳️"
                          : clue() === -1
                            ? "?"
                            : clue()}
                  </div>
                );
              }}
            </For>
          )}
        </For>
      </div>
      <button
        css={{ mt: 32 }}
        onClick={() => {
          const hint = getHint(minefield(), difficulty());
          setHint(hint);
        }}
      >
        GET HINT
      </button>
      NEW GAME
      <table>
        <tbody>
          <For each={[3, 4, 5, 6, 7, 8]}>
            {(height) => {
              return (
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
                            const minefield = generateSatisfyingMinefield({
                              difficulty: difficulty(),
                              width: width,
                              height: height,
                              mines: mines,
                              grid: "square",
                            });
                            if (minefield) {
                              setMinefield(minefield);
                              setHint(undefined);
                              setFailure(undefined);
                            } else {
                              alert("fail, womp womp :(");
                            }
                          }
                        }}
                      >
                        {width}x{height}
                      </td>
                    )}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      NEW HEX GAME
      <table>
        <tbody>
          <For each={[3, 4, 5, 6, 7, 8]}>
            {(height) => {
              return (
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
                            // const minefield = generateHexMinefield({
                            //   difficulty: difficulty(),
                            //   width: width,
                            //   height: height,
                            //   mines: mines,
                            // });
                            const minefield = generateSatisfyingMinefield({
                              difficulty: difficulty(),
                              width: width,
                              height: height,
                              mines: mines,
                              grid: "hex",
                            });
                            if (minefield) {
                              setMinefield(minefield);
                              setHint(undefined);
                              setFailure(undefined);
                            } else {
                              alert("fail, womp womp :(");
                            }
                          }
                        }}
                      >
                        {width}x{height}
                      </td>
                    )}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      NEW TRI GAME
      <table>
        <tbody>
          <For each={[3, 4, 5, 6, 7, 8]}>
            {(height) => {
              return (
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
                            // const minefield = generateHexMinefield({
                            //   difficulty: difficulty(),
                            //   width: width,
                            //   height: height,
                            //   mines: mines,
                            // });
                            const minefield = generateSatisfyingMinefield({
                              difficulty: difficulty(),
                              width: width,
                              height: height,
                              mines: mines,
                              grid: "triangle",
                            });
                            if (minefield) {
                              setMinefield(minefield);
                              setHint(undefined);
                              setFailure(undefined);
                            } else {
                              alert("fail, womp womp :(");
                            }
                          }
                        }}
                      >
                        {width}x{height}
                      </td>
                    )}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <button
        onClick={() => {
          const solve = solveMinefield(minefield(), difficulty());
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
            grid: "square",
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

function generateSatisfyingMinefield(opts: GenerateMinefieldOptions) {
  const simpleSolverDifficulty = opts.difficulty - 1;

  for (let n = 1; n <= 50; n++) {
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
