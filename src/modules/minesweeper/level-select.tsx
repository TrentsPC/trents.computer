import { createSignal, JSX } from "solid-js";
import { GenerateMinefieldOptions } from "./backend/generator";
import { GridType } from "./backend/types";

const easyDifficulty = 3;
const mediumDifficulty = 5;
const hardDifficulty = 7;

function getMineCount(width: number, height: number) {
  const area = width * height;
  const mines = Math.round(area * 0.4);
  return mines;
}

function getHexWidth(sideLength: number) {
  return sideLength * 2 - 1;
}
function getHexHeight(sideLength: number) {
  return sideLength * 2 - 1;
}

function getTriWidth(sideLength: number) {
  let width = sideLength * 2 - 1;
  if (sideLength % 2 === 0) {
    width++;
  }
  return width;
}
function getTriHeight(sideLength: number) {
  return sideLength;
}

export function LevelSelect(props: {
  onLevelSelect: (minefield: GenerateMinefieldOptions) => void;
}) {
  const [gridType, setGridType] = createSignal<GridType>("square");
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <table>
        <tbody>
          <tr>
            <SelectButton
              active={gridType() === "square"}
              onClick={() => setGridType("square")}
            >
              <SquareIcon />
            </SelectButton>
            <SelectButton
              active={gridType() === "hex"}
              onClick={() => setGridType("hex")}
            >
              <HexagonIcon />
            </SelectButton>
            <SelectButton
              active={gridType() === "triangle"}
              onClick={() => setGridType("triangle")}
            >
              <TriangleIcon />
            </SelectButton>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          {gridType() === "square" && (
            <>
              <tr>
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "square",
                    mines: getMineCount(4, 4),
                    width: 4,
                    height: 4,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "square",
                    mines: getMineCount(5, 5),
                    width: 5,
                    height: 5,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "square",
                    mines: getMineCount(6, 6),
                    width: 6,
                    height: 6,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "square",
                    mines: getMineCount(7, 7),
                    width: 7,
                    height: 7,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "square",
                    mines: getMineCount(8, 8),
                    width: 8,
                    height: 8,
                  }}
                  onClick={props.onLevelSelect}
                />
              </tr>
              <tr>
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "square",
                    mines: getMineCount(4, 4),
                    width: 4,
                    height: 4,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "square",
                    mines: getMineCount(5, 5),
                    width: 5,
                    height: 5,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "square",
                    mines: getMineCount(6, 6),
                    width: 6,
                    height: 6,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "square",
                    mines: getMineCount(7, 7),
                    width: 7,
                    height: 7,
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "square",
                    mines: getMineCount(8, 8),
                    width: 8,
                    height: 8,
                  }}
                  onClick={props.onLevelSelect}
                />
              </tr>
            </>
          )}
          {gridType() === "hex" && (
            <>
              <tr>
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(3), getHexHeight(3) * 0.75),
                    width: getHexWidth(3),
                    height: getHexHeight(3),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(4), getHexHeight(4) * 0.75),
                    width: getHexWidth(4),
                    height: getHexHeight(4),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(5), getHexHeight(5) * 0.75),
                    width: getHexWidth(5),
                    height: getHexHeight(5),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(6), getHexHeight(6) * 0.75),
                    width: getHexWidth(6),
                    height: getHexHeight(6),
                  }}
                  onClick={props.onLevelSelect}
                />
              </tr>
              <tr>
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(3), getHexHeight(3) * 0.75),
                    width: getHexWidth(3),
                    height: getHexHeight(3),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(4), getHexHeight(4) * 0.75),
                    width: getHexWidth(4),
                    height: getHexHeight(4),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(5), getHexHeight(5) * 0.75),
                    width: getHexWidth(5),
                    height: getHexHeight(5),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: mediumDifficulty,
                    grid: "hex",
                    mines: getMineCount(getHexWidth(6), getHexHeight(6) * 0.75),
                    width: getHexWidth(6),
                    height: getHexHeight(6),
                  }}
                  onClick={props.onLevelSelect}
                />
              </tr>
            </>
          )}
          {gridType() === "triangle" && (
            <>
              <tr>
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "triangle",
                    mines: getMineCount(getTriWidth(4), getTriHeight(4) / 2),
                    width: getTriWidth(4),
                    height: getTriHeight(4),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "triangle",
                    mines: getMineCount(getTriWidth(5), getTriHeight(5) / 2),
                    width: getTriWidth(5),
                    height: getTriHeight(5),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "triangle",
                    mines: getMineCount(getTriWidth(6), getTriHeight(6) / 2),
                    width: getTriWidth(6),
                    height: getTriHeight(6),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "triangle",
                    mines: getMineCount(getTriWidth(7), getTriHeight(7) / 2),
                    width: getTriWidth(7),
                    height: getTriHeight(7),
                  }}
                  onClick={props.onLevelSelect}
                />
                <LevelButton
                  minefield={{
                    difficulty: easyDifficulty,
                    grid: "triangle",
                    mines: getMineCount(getTriWidth(8), getTriHeight(8) / 2),
                    width: getTriWidth(8),
                    height: getTriHeight(8),
                  }}
                  onClick={props.onLevelSelect}
                />
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function SelectButton(props: {
  children?: JSX.Element;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <td
      onClick={() => props.onClick?.()}
      css={{
        width: 52,
        height: 52,
        border: `1px solid black`,
        textAlign: "center",
        "&[data-active=true]": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        "& svg": {
          display: "inline-block",
        },
      }}
      data-active={props.active ? "true" : "false"}
    >
      {props.children}
    </td>
  );
}

export function LevelButton(props: {
  minefield: GenerateMinefieldOptions;
  onClick: (minefield: GenerateMinefieldOptions) => void;
}) {
  const sideLength = () => {
    if (props.minefield.grid === "hex") {
      return (props.minefield.width + 1) / 2;
    }
    if (props.minefield.grid === "triangle") {
      return props.minefield.height;
    }
    return props.minefield.width;
  };

  const variant = () => "V";

  const difficultyIndicator = () => {
    switch (props.minefield.difficulty) {
      case hardDifficulty:
        return "!!";
      case mediumDifficulty:
        return "!";
      default:
        return "";
    }
  };

  return (
    <td
      onClick={() => props.onClick(props.minefield)}
      css={{
        width: 52,
        height: 52,
        border: `1px solid black`,
        textAlign: "center",
        position: "relative",
      }}
    >
      {variant()}
      <div
        css={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "50%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {sideLength()}
      </div>
      <div
        css={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {difficultyIndicator()}
      </div>
    </td>
  );
}

function TriangleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="m80-160 400-640 400 640H80Zm144-80h512L480-650 224-240Zm256-205Z" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z" />
    </svg>
  );
}

function HexagonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M272-120 64-480l208-360h416l208 360-208 360H272Zm46-80h324l161-280-161-280H318L156-480l162 280Zm162-280Z" />
    </svg>
  );
}
