import { createFileRoute } from "@tanstack/solid-router";
import { createMemo, createSignal, Index } from "solid-js";
import { useSquircle } from "~/utils/squircle";

export const Route = createFileRoute("/tic-tac-toe")({
  component: Page,
});

function Page() {
  const [turn, setTurn] = createSignal<"x" | "o">("x");

  const [xMoves, setXMoves] = createSignal([] as number[]);
  const [oMoves, setOMoves] = createSignal([] as number[]);

  const currentXMoves = createMemo(() => xMoves().slice(-3));
  const currentOMoves = createMemo(() => oMoves().slice(-3));

  const board = createMemo(() => {
    const emptyBoard = Array.from({ length: 9 }).fill("") as Array<"" | "x" | "o">;

    for (const move of currentXMoves()) {
      emptyBoard[move] = "x";
    }

    for (const move of currentOMoves()) {
      emptyBoard[move] = "o";
    }

    return emptyBoard;
  });
  const winner = createMemo(() => getWinner(board()));

  return (
    <main
      css={{
        w: "100%",
        h: "100%",
        d: "flex",
        flexDir: "column",
        items: "center",
        justify: "center",
      }}
    >
      <div css={{ flex: "45 0 0px" }} />
      <div
        css={{
          display: "flex",
          flexDir: "column",
          items: "center",
        }}
      >
        <h1>tic tac tock</h1>
        <div
          css={{
            display: "grid",
            gridCols: 3,
            backgroundColor: "black",
            padding: 2,
            gap: 2,
            borderRadius: 34,
          }}
          ref={useSquircle()}
        >
          <Index each={board()}>
            {(square, i) => (
              <button
                css={[
                  {
                    w: 48 * 2,
                    aspectRatio: 1,
                    backgroundColor: "white",
                    fontSize: 48,
                    cursor: "default",
                  },
                  !square() && {
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  },
                  i === 0 && { rtl: 32 },
                  i === 2 && { rtr: 32 },
                  i === 6 && { rbl: 32 },
                  i === 8 && { rbr: 32 },
                ]}
                ref={useSquircle()}
                onClick={() => {
                  if (winner() || square() !== "") return;

                  if (turn() === "x") {
                    setXMoves([...xMoves(), i]);
                    setTurn("o");
                  } else {
                    setOMoves([...oMoves(), i]);
                    setTurn("x");
                  }
                }}
              >
                <span
                  css={[
                    { fontWeight: 700 },
                    i === currentXMoves()[0] &&
                      currentXMoves().length === 3 &&
                      turn() === "x" && { opacity: 0.34 },
                    i === currentOMoves()[0] &&
                      currentOMoves().length === 3 &&
                      turn() === "o" && { opacity: 0.34 },
                  ]}
                >
                  {square().toUpperCase()}
                </span>
              </button>
            )}
          </Index>
        </div>
        {winner() ? (
          <>
            <p>{winner()?.toUpperCase()} wins</p>
            <button
              onClick={() => {
                setXMoves([]);
                setOMoves([]);
                setTurn("x");
              }}
            >
              Restart
            </button>
          </>
        ) : (
          <p>{turn().toUpperCase()} turn</p>
        )}
      </div>
      <div css={{ flex: "55 0 0px" }} />
    </main>
  );
}

function getWinner(board: Array<"" | "x" | "o">) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return undefined;
}
