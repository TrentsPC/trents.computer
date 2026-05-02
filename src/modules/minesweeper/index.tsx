import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import { fonts } from "~/theme.styles";
import {
  generateMinefield,
  GenerateMinefieldOptions,
} from "./backend/generator";
import {
  createHypotheticalSolveForEntireBoard,
  getCellClue,
  getHint,
  getVisiblePositionsFromCell,
  HintResult,
  solveMinefield,
} from "./backend/solver";
import { Minefield, Position } from "./backend/types";
import { LevelSelect, LevelSet } from "./level-select";

function cloneMinefield(minefield: Minefield): Minefield {
  return {
    ...minefield,
    solveState: minefield.solveState.slice().map((c) => c.slice()),
  };
}

export function MinesweeperGame() {
  const [selectedVariant, setSelectedVariant] = createSignal<
    GenerateMinefieldOptions | undefined
  >();
  const [initialMinefield, setInitialMinefield] = createSignal<
    Minefield | undefined
  >();
  const [levelSet, setLevelSet] = createSignal<LevelSet>("square");

  return (
    <Show
      when={selectedVariant() && initialMinefield()}
      fallback={
        <LevelSelect
          levelSet={levelSet()}
          onLevelSetChange={setLevelSet}
          onLevelSelect={async (opts) => {
            const minefield = await generateSatisfyingMinefield(opts);
            if (minefield) {
              setInitialMinefield(minefield);
              setSelectedVariant(opts);
            } else {
              alert("fail, womp womp :(");
            }
          }}
        />
      }
    >
      <MinesweeperGameLevel
        initialMinefield={initialMinefield()!}
        minesweeperVariant={selectedVariant()!}
        onClose={() => {
          setSelectedVariant(undefined);
          setInitialMinefield(undefined);
        }}
      />

      {/* <button
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
            width: 5,
            height: 5,
            mines: 10,
            grid: "square",
          });
        }}
      >
        SATISFY
      </button> */}
    </Show>
  );
}

function MinesweeperGameLevel(props: {
  initialMinefield: Minefield;
  minesweeperVariant: GenerateMinefieldOptions;
  onClose: () => void;
}) {
  const [minefield, setMinefield] = createSignal(props.initialMinefield);
  const [failure, setFailure] = createSignal<Minefield | undefined>();
  const [hint, setHint] = createSignal<HintResult | undefined>(undefined);
  const difficulty = () => props.minesweeperVariant.difficulty;
  const [hoveredPosition, setHoveredClue] = createSignal<Position | undefined>(
    undefined,
  );
  const [drawMode, setDrawMode] = createSignal(false);
  createEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "d") {
        setDrawMode((p) => !p);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
  });
  const visible = createMemo(() => {
    if (!hoveredPosition()) return [];
    const [x, y] = hoveredPosition()!;
    const cellType = minefield().cellClues[y][x];
    if (minefield().solveState[y][x] === undefined) {
      return [[x, y]] as Position[];
    }
    return getVisiblePositionsFromCell(cellType, x, y);
  });

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

  let canvasRef: HTMLCanvasElement = null!;

  createEffect(() => {
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      const newW = Math.round(rect.width * dpr);
      const newH = Math.round(rect.height * dpr);
      if (canvas.width === newW && canvas.height === newH) return;
      canvas.width = newW;
      canvas.height = newH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let isDrawing = false;
    let mode: "draw" | "erase" = "draw";
    let activePointerId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    function getPos(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function applyStyle() {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (mode === "erase") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 24;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
      }
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0 && e.button !== 2) return;
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      activePointerId = e.pointerId;
      isDrawing = true;
      mode = e.button === 2 ? "erase" : "draw";
      const { x, y } = getPos(e);
      lastX = x;
      lastY = y;
      applyStyle();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDrawing || e.pointerId !== activePointerId) return;
      const { x, y } = getPos(e);
      applyStyle();
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x;
      lastY = y;
    }

    function onPointerUp(e: PointerEvent) {
      if (e.pointerId !== activePointerId) return;
      isDrawing = false;
      activePointerId = null;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    }

    function onContextMenu(e: Event) {
      e.preventDefault();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("contextmenu", onContextMenu);

    onCleanup(() => {
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("contextmenu", onContextMenu);
    });
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          height: 52,
          padding: "0px 20px",
        }}
      >
        <div css={{ flex: "1 0 0px" }}>
          {minefield().mines} mines ({minefield().mines - minefield().flags}{" "}
          remaining)
        </div>
        <button
          onClick={() => {
            setDrawMode((p) => !p);
          }}
        >
          {drawMode() ? "UNDRAW" : "DRAW"}
        </button>
        <button
          onClick={() => {
            const hint = getHint(minefield(), difficulty());
            setHint(hint);
          }}
        >
          GET HINT
        </button>
        <button
          onClick={async () => {
            const minefield = await generateSatisfyingMinefield(
              props.minesweeperVariant,
            );
            if (minefield) {
              setMinefield(minefield);
              setFailure(undefined);
              setHint(undefined);
              setHoveredClue(undefined);
              setDrawMode(false);
            } else {
              alert("fail, womp womp :(");
            }
          }}
        >
          NEXT LEVEL
        </button>
        {/* <button
          onClick={() => {
            props.onClose();
          }}
        >
          RESTART
        </button> */}
        <button
          onClick={() => {
            props.onClose();
          }}
        >
          CLOSE
        </button>
      </div>
      <div
        css={{
          flex: "1 0 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            // border: `1px solid black`,
            "row-gap": "2px",
            "column-gap": "2px",
            "grid-template-columns": `repeat(${minefield().width}, 1fr)`,
            position: "relative",
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
                  const hidden = () => minefield().mask[y()][x()] === false;
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
                        fontFamily: fonts.sans,
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
                              "clip-path":
                                "polygon(50% 0%, 100% 100%, 0% 100%)",
                            },
                          },
                        },
                      }}
                      data-grid={minefield().grid}
                      data-even-col={x() % 2 === 0 ? "true" : "false"}
                      data-even-row={y() % 2 === 0 ? "true" : "false"}
                      style={{
                        opacity: hidden() ? 0 : 1,
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
                        setHoveredClue([x(), y()]);
                      }}
                      onMouseLeave={() => {
                        setHoveredClue(undefined);
                      }}
                      onClick={() => {
                        setHint(undefined);
                        if (cell === false) {
                          // Try Auto-complete
                          const hint = getHint(minefield(), 1, [x(), y()]);
                          const clueType = minefield().cellClues[y()][x()];
                          const visible = getVisiblePositionsFromCell(
                            clueType,
                            x(),
                            y(),
                          );
                          if (hint) {
                            let next = cloneMinefield(minefield());
                            for (let [flagX, flagY] of hint.mustBeFlag) {
                              if (
                                visible.some(
                                  ([x, y]) => flagX === x && flagY === y,
                                )
                              ) {
                                next.solveState[flagY][flagX] = true;
                                next.flags++;
                              }
                            }
                            for (let [safeX, safeY] of hint.mustBeSafe) {
                              if (
                                visible.some(
                                  ([x, y]) => safeX === x && safeY === y,
                                )
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
          <canvas
            ref={canvasRef}
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // backgroundColor: "red",
            }}
            style={{
              opacity: drawMode() ? 1 : 0.333,
              "pointer-events": drawMode() ? "auto" : "none",
            }}
          />
        </div>
      </div>
      <div css={{ height: 52 }} />
    </div>
  );
}

function isSolved(minefield: Minefield) {
  return minefield.flags === minefield.mines;
}

function getSatisfactionRate(opts: GenerateMinefieldOptions) {
  const simpleSolverDifficulty = opts.difficulty - 1;

  const minMines = 4;
  const maxMines = Math.min((opts.height * opts.width) / 2);

  const satisfyCountByMineCount = Array.from({ length: maxMines + 1 }).fill(
    0,
  ) as number[];

  for (let n = 1; n <= 400; n++) {
    for (let mines = minMines; mines <= maxMines; mines++) {
      const randomMinefield = generateMinefield({ ...opts, mines });
      const simpleAttempt = solveMinefield(
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
  const simpleSolverDifficulty = opts.difficulty - 2;

  for (let n = 1; n <= 50; n++) {
    const randomMinefield = generateMinefield(opts);
    const simpleAttempt = solveMinefield(
      cloneMinefield(randomMinefield),
      simpleSolverDifficulty,
    );
    if (!isSolved(simpleAttempt)) {
      return randomMinefield;
    }
    await waitMicrotask();
  }
}

const waitMicrotask = () => new Promise<void>((res) => queueMicrotask(res));
