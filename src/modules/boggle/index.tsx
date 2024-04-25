import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import { useSquircle } from "~/utils/squircle";
import { onMount } from "solid-js";
import { getValidWordPath } from "./utils";
import { Board } from "./Board";
import { createSpring } from "../spring";
import { ReloadIcon, ResetIcon, MixerHorizontalIcon } from "solid-radix-icons";
import { useNavigate, useSearchParams } from "@solidjs/router";

/**
 * All the Boggle dice, in order
 */
const DICE_STRINGS = `
A A E E G N
A B B J O O
A C H O P S
A F F K P S

A O O T T W
C I M O T U
D E I L R X
E H R T V W

E E G H N W
E I O S S T

E S U I E N
T R Y E L T
E L Y R D V
M Qu I H N U
Z R N H N L
D Y I T S T
`;

export const DICE: string[][] = DICE_STRINGS.split("\n")
  .filter(Boolean)
  .map((row) => row.trim().split(" "));

export function shuffleBoard(): string[][] {
  const board: string[][] = [];
  const remainingDice = [...DICE];

  for (let i = 0; i < 4; i++) {
    board[i] = [];
    for (let j = 0; j < 4; j++) {
      const dieIdx = Math.floor(Math.random() * remainingDice.length);
      const die = remainingDice[dieIdx];
      remainingDice.splice(dieIdx, 1);

      const letterIdx = Math.floor(Math.random() * die.length);
      board[i][j] = die[letterIdx];
    }
  }

  return board;
}

export function rotateBoard90DegCW(board: string[][]): string[][] {
  const newBoard: string[][] = [];
  for (let y = 0; y < 4; y++) {
    newBoard[y] = [];
    for (let x = 0; x < 4; x++) {
      newBoard[y][x] = board[3 - x][y];
    }
  }
  return newBoard;
}

function getBoardFromSearch() {
  const params = new URLSearchParams(window.location.search);
  const boardString = params.get("board");
  if (!boardString) {
    return undefined;
  }
  const boardParts = boardString.split("-");
  const board: string[][] = [];
  for (let y = 0; y < 4; y++) {
    board[y] = [];
    for (let x = 0; x < 4; x++) {
      let letter = boardParts[y * 4 + x];
      if (!letter) {
        return undefined;
      }
      board[y][x] = letter;
    }
  }
  return board;
}

function getInitialBoard() {
  return getBoardFromSearch() || shuffleBoard();
}

function getBoardString(board: string[][]) {
  return board.flat().join("-");
}

const NUMBER_NAMES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
];

export function BoggleGame(props: { dictionary: string[] }) {
  const [board, setBoard] = createSignal(getInitialBoard());
  const [rotation, setRotation] = createSignal(0);
  const [foundWords, setFoundWords] = createSignal<string[]>([]);

  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  createEffect(() => {
    const _ = params.board;
    const board = getBoardFromSearch();
    if (board) {
      setBoard(board);
    }
  });

  const validWordList = createValidWordList(board, props.dictionary);
  const maxScore = createMemo(() => {
    return validWordList
      .secondPass()
      .map(getWordScore)
      .reduce((a, b) => a + b, 0);
  });
  const score = createMemo(() => {
    return foundWords()
      .map(getWordScore)
      .reduce((a, b) => a + b, 0);
  });

  const [attempt, setAttempt] = createSignal("");

  function handleAttemptCommit() {
    const word = attempt();
    if (word.length === 0) return;
    if (foundWords().includes(word)) {
      setAttempt("");
      return;
    }
    if (validWordList.secondPass().includes(word)) {
      setAttempt("");
      setFoundWords(
        [...foundWords(), word].sort().sort((a, b) => a.length - b.length)
      );
    } else {
    }
  }

  const [open, setOpen] = createSignal<Record<string, boolean>>({});
  let inputRef: HTMLInputElement = null!;
  const [panelOpen, setPanelOpen] = createSignal(false);
  const panelSpring = createSpring(() => ({
    value: panelOpen() ? 1 : 0,
    period: 0.5,
    damping: 1,
  }));

  onMount(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setRotation(rotation() - 1);
      } else if (e.key === "ArrowRight") {
        setRotation(rotation() + 1);
      } else if (/^[A-Za-z]$/.test(e.key)) {
        inputRef.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <>
      <h1 css={{ align: "center" }}>Boogle</h1>
      <div css={{ d: "flex", items: "flex-start", justify: "center" }}>
        <div css={{ flex: "1 0 0px", maxW: 500 }}>
          <div css={{ d: "flex", justify: "center" }}>
            <button
              onClick={() => {
                setFoundWords([]);
                setOpen({});
                const newBoard = shuffleBoard();
                navigate(`?board=${getBoardString(newBoard)}`);
                requestAnimationFrame(() => {
                  setBoard(newBoard);
                });
              }}
              css={{ d: "inline-flex", items: "center" }}
            >
              <ResetIcon /> Restart
            </button>
            <div css={{ flex: 1 }} />
            <button onClick={() => setRotation(rotation() - 1)}>
              <ReloadIcon css={{ transform: "scaleX(-1)" }} />
            </button>
            Rotate
            <button onClick={() => setRotation(rotation() + 1)}>
              <ReloadIcon />
            </button>
            <div css={{ flex: 1 }} />
            <button css={{ visibility: "hidden" }}>Restart</button>
            <button onClick={() => setPanelOpen((o) => !o)}>
              <MixerHorizontalIcon />
            </button>
          </div>
          <Board board={board()} word={attempt()} rotations={rotation()} />
          <input
            autofocus
            ref={(el) => {
              useSquircle()(el);
              inputRef = el;
            }}
            value={attempt()}
            onInput={(e) => setAttempt(e.target.value.toUpperCase())}
            onChange={handleAttemptCommit}
            css={{
              r: 52 * 0.225,
              w: "100%",
              mt: 16,
              bg: "rgba(0, 0, 0, 0.1)",
              h: 52,
              fontScale: 8,
              align: "center",
            }}
          />
          <div>
            <h2>
              {foundWords().length} Words, {score()} points:
            </h2>
            <div css={{ columns: 5 }}>
              <For each={foundWords()}>{(word) => <div>{word}</div>}</For>
            </div>
            {validWordList.secondPass().length > 0 && (
              <h2>
                {Math.trunc(
                  (foundWords().length / validWordList.secondPass().length) *
                    100
                )}
                % Words, {Math.trunc((score() / maxScore()) * 100)}% points:
              </h2>
            )}

            <p>{props.dictionary.length} dictionary words</p>
            <p>{validWordList.secondPass().length} valid words</p>
            <p>Max. Score: {maxScore()}</p>
          </div>
        </div>
        <div
          css={{ overflow: "hidden" }}
          style={{ width: panelSpring() * 316 + "px" }}
        >
          <div css={{ w: 300, pl: 16 }}>
            <button css={{ w: "100%" }} onClick={() => setPanelOpen((o) => !o)}>
              Close
            </button>
            <For each={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}>
              {(length) => {
                const words = () =>
                  validWordList
                    .secondPass()
                    .filter((word) => word.length === length);
                return (
                  <Show when={words().length}>
                    <div>
                      <button
                        onClick={() =>
                          setOpen({
                            ...open(),
                            [length]: !open()[length],
                          })
                        }
                      >
                        {!!open()[length] ? "▼ " : "▶ "}
                        {words().length} {NUMBER_NAMES[length]} letter{" "}
                        {words().length === 1 ? "word" : "words"}
                      </button>
                      <Show when={!!open()[length] ? true : undefined}>
                        <div css={{ columns: 3 }}>
                          <For each={words()}>
                            {(word) => (
                              <div>
                                <a
                                  href={`https://www.collinsdictionary.com/dictionary/english/${word.toLowerCase()}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  css={{
                                    color: "blue",
                                    ":hover": {
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  {word}
                                </a>
                              </div>
                            )}
                          </For>
                        </div>
                      </Show>
                    </div>
                  </Show>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}

function getLetterCounts(word: string) {
  const letterCounts: Record<string, number> = {};
  for (const letter of word) {
    letterCounts[letter] = (letterCounts[letter] ?? 0) + 1;
  }
  return letterCounts;
}

function createValidWordList(board: () => string[][], dictionary: string[]) {
  /**
   * Get only words that are entirely made of board letters
   */
  const firstPass = createMemo(() => {
    const boardLetters = board().flat().join("").toUpperCase();

    const letterCounts = getLetterCounts(boardLetters);

    function isWordValid(word: string): boolean {
      for (const letter of word) {
        if (!boardLetters.includes(letter)) return false;
      }
      for (const letter of word) {
        const maxLetterCount = letterCounts[letter];
        const letterCount = word.split(letter).length - 1;
        if (letterCount > maxLetterCount) return false;
      }
      return true;
    }

    const potentialWords: string[] = [];

    for (const word of dictionary) {
      if (isWordValid(word)) {
        potentialWords.push(word);
      }
    }

    return potentialWords.map((s) => s.toUpperCase());
  });

  const secondPass = createMemo(() => {
    return firstPass().filter((word) => {
      return getValidWordPath(board(), word) !== undefined;
    });
  });

  return { firstPass, secondPass };
}

function getWordScore(word: string): number {
  switch (word.length) {
    case 0:
    case 1:
    case 2:
      return 0;
    case 3:
    case 4:
      return 1;
    case 5:
      return 2;
    case 6:
      return 3;
    case 7:
      return 5;
    default:
      return 11;
  }
}
