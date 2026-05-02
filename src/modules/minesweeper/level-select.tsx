import { JSX, Match, Switch } from "solid-js";
import { GenerateMinefieldOptions } from "./backend/generator";
import { CellClue } from "./backend/types";

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

export type LevelSet =
  | "square"
  | "square-bang"
  | "hexagon"
  | "hexagon-bang"
  | "triangle"
  | "triangle-bang";

export function LevelSelect(props: {
  onLevelSelect: (minefield: GenerateMinefieldOptions) => void;
  levelSet: LevelSet;
  onLevelSetChange: (levelSet: LevelSet) => void;
}) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 8,
      }}
    >
      <table
        css={{
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          left: 20,
        }}
      >
        <tbody>
          <tr>
            <SelectButton
              active={props.levelSet === "hexagon"}
              onClick={() => props.onLevelSetChange("hexagon")}
            >
              <HexagonIcon />
            </SelectButton>
            <SelectButton
              active={props.levelSet === "hexagon-bang"}
              onClick={() => props.onLevelSetChange("hexagon-bang")}
            >
              <HexagonIcon />!
            </SelectButton>
          </tr>
          <tr>
            <SelectButton
              active={props.levelSet === "square"}
              onClick={() => props.onLevelSetChange("square")}
            >
              <SquareIcon />
            </SelectButton>
            <SelectButton
              active={props.levelSet === "square-bang"}
              onClick={() => props.onLevelSetChange("square-bang")}
            >
              <SquareIcon />!
            </SelectButton>
          </tr>
          <tr>
            <SelectButton
              active={props.levelSet === "triangle"}
              onClick={() => props.onLevelSetChange("triangle")}
            >
              <TriangleIcon />
            </SelectButton>
            {/* <SelectButton
              active={gridType() === "triangle-bang"}
              onClick={() => props.onLevelSetChange("triangle-bang")}
            >
              <TriangleIcon />!
            </SelectButton> */}
          </tr>
        </tbody>
      </table>
      <Switch>
        <Match when={props.levelSet === "hexagon"}>
          <HexagonVariants onSelect={props.onLevelSelect} />
        </Match>
        <Match when={props.levelSet === "hexagon-bang"}>
          <HexagonBangVariants onSelect={props.onLevelSelect} />
        </Match>
        <Match when={props.levelSet === "square"}>
          <SquareVariants onSelect={props.onLevelSelect} />
        </Match>
        <Match when={props.levelSet === "square-bang"}>
          <SquareBangVariants onSelect={props.onLevelSelect} />
        </Match>
        <Match when={props.levelSet === "triangle"}>
          <TriangleVariants onSelect={props.onLevelSelect} />
        </Match>
      </Switch>
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

type VariantSetProps = {
  onSelect: (minefield: GenerateMinefieldOptions) => void;
};

function SquareVariants(props: VariantSetProps) {
  const vanilla = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Vanilla],
    }) satisfies GenerateMinefieldOptions;

  const knight = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Knight],
    }) satisfies GenerateMinefieldOptions;
  const cross = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Cross],
    }) satisfies GenerateMinefieldOptions;
  const miniCross = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.MiniCross],
    }) satisfies GenerateMinefieldOptions;
  const deviation = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Deviation],
    }) satisfies GenerateMinefieldOptions;
  const big = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Big],
    }) satisfies GenerateMinefieldOptions;
  const outline = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Outline],
    }) satisfies GenerateMinefieldOptions;
  return (
    <table>
      <tbody>
        <tr>
          <LevelButton minefield={vanilla(3)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(4)} onClick={props.onSelect} />
          <Gap />
          <LevelButton minefield={vanilla(5)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(6)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(7)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={vanilla(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={vanilla(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={vanilla(11)} onClick={props.onSelect} /> */}
          <LevelButton minefield={vanilla(12)} onClick={props.onSelect} />
        </tr>
        <tr>
          {/* <LevelButton minefield={knight(3)} onClick={props.onSelect} /> */}
          <Gap />
          <LevelButton minefield={knight(4)} onClick={props.onSelect} />
          <Gap />
          {/* <Gap /> */}
          <LevelButton minefield={knight(5)} onClick={props.onSelect} />
          <LevelButton minefield={knight(6)} onClick={props.onSelect} />
          <LevelButton minefield={knight(7)} onClick={props.onSelect} />
          <LevelButton minefield={knight(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={knight(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={knight(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={knight(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={knight(12)} onClick={props.onSelect} /> */}
        </tr>
        <tr>
          {/* <LevelButton minefield={cross(3)} onClick={props.onSelect} /> */}
          <Gap />
          <LevelButton minefield={cross(4)} onClick={props.onSelect} />
          <Gap />
          {/* <Gap /> */}
          <LevelButton minefield={cross(5)} onClick={props.onSelect} />
          <LevelButton minefield={cross(6)} onClick={props.onSelect} />
          <LevelButton minefield={cross(7)} onClick={props.onSelect} />
          <LevelButton minefield={cross(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={cross(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={cross(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={cross(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={cross(12)} onClick={props.onSelect} /> */}
        </tr>
        <tr>
          {/* <LevelButton minefield={miniCross(3)} onClick={props.onSelect} /> */}
          <Gap />
          <LevelButton minefield={miniCross(4)} onClick={props.onSelect} />
          <Gap />
          {/* <Gap /> */}
          <LevelButton minefield={miniCross(5)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(6)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(7)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={miniCross(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={miniCross(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={miniCross(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={miniCross(12)} onClick={props.onSelect} /> */}
        </tr>
        <tr>
          {/* <LevelButton minefield={deviation(3)} onClick={props.onSelect} /> */}
          <Gap />
          {/* <LevelButton minefield={deviation(4)} onClick={props.onSelect} /> */}
          <Gap />
          <Gap />
          <LevelButton minefield={deviation(5)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(6)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(7)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={deviation(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={deviation(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={deviation(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={deviation(12)} onClick={props.onSelect} /> */}
        </tr>
        <tr>
          {/* <LevelButton minefield={big(3)} onClick={props.onSelect} /> */}
          <Gap />
          {/* <LevelButton minefield={big(4)} onClick={props.onSelect} /> */}
          <Gap />
          <Gap />
          <LevelButton minefield={big(5)} onClick={props.onSelect} />
          <LevelButton minefield={big(6)} onClick={props.onSelect} />
          <LevelButton minefield={big(7)} onClick={props.onSelect} />
          <LevelButton minefield={big(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={big(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={big(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={big(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={big(12)} onClick={props.onSelect} /> */}
        </tr>
        <tr>
          {/* <LevelButton minefield={outline(3)} onClick={props.onSelect} /> */}
          <Gap />
          <LevelButton minefield={outline(4)} onClick={props.onSelect} />
          <Gap />
          {/* <Gap /> */}
          <LevelButton minefield={outline(5)} onClick={props.onSelect} />
          <LevelButton minefield={outline(6)} onClick={props.onSelect} />
          <LevelButton minefield={outline(7)} onClick={props.onSelect} />
          <LevelButton minefield={outline(8)} onClick={props.onSelect} />
          <Gap />
          {/* <LevelButton minefield={outline(9)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={outline(10)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={outline(11)} onClick={props.onSelect} /> */}
          {/* <LevelButton minefield={outline(12)} onClick={props.onSelect} /> */}
        </tr>
      </tbody>
    </table>
  );
}
function SquareBangVariants(props: VariantSetProps) {
  const vanilla = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Vanilla],
    }) satisfies GenerateMinefieldOptions;

  const knight = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Knight],
    }) satisfies GenerateMinefieldOptions;
  const cross = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Cross],
    }) satisfies GenerateMinefieldOptions;
  const miniCross = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.MiniCross],
    }) satisfies GenerateMinefieldOptions;
  const deviation = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Deviation],
    }) satisfies GenerateMinefieldOptions;
  const big = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Big],
    }) satisfies GenerateMinefieldOptions;
  const outline = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "square",
      mines: getMineCount(sideLength, sideLength),
      width: sideLength,
      height: sideLength,
      cellRules: [CellClue.Outline],
    }) satisfies GenerateMinefieldOptions;
  return (
    <table>
      <tbody>
        <tr>
          <LevelButton minefield={vanilla(4)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(5)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(6)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(7)} onClick={props.onSelect} />
          <LevelButton minefield={vanilla(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={knight(4)} onClick={props.onSelect} />
          <LevelButton minefield={knight(5)} onClick={props.onSelect} />
          <LevelButton minefield={knight(6)} onClick={props.onSelect} />
          <LevelButton minefield={knight(7)} onClick={props.onSelect} />
          <LevelButton minefield={knight(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={cross(4)} onClick={props.onSelect} />
          <LevelButton minefield={cross(5)} onClick={props.onSelect} />
          <LevelButton minefield={cross(6)} onClick={props.onSelect} />
          <LevelButton minefield={cross(7)} onClick={props.onSelect} />
          <LevelButton minefield={cross(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={miniCross(4)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(5)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(6)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(7)} onClick={props.onSelect} />
          <LevelButton minefield={miniCross(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={deviation(4)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(5)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(6)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(7)} onClick={props.onSelect} />
          <LevelButton minefield={deviation(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={big(4)} onClick={props.onSelect} />
          <LevelButton minefield={big(5)} onClick={props.onSelect} />
          <LevelButton minefield={big(6)} onClick={props.onSelect} />
          <LevelButton minefield={big(7)} onClick={props.onSelect} />
          <LevelButton minefield={big(8)} onClick={props.onSelect} />
        </tr>
        <tr>
          <LevelButton minefield={outline(4)} onClick={props.onSelect} />
          <LevelButton minefield={outline(5)} onClick={props.onSelect} />
          <LevelButton minefield={outline(6)} onClick={props.onSelect} />
          <LevelButton minefield={outline(7)} onClick={props.onSelect} />
          <LevelButton minefield={outline(8)} onClick={props.onSelect} />
        </tr>
      </tbody>
    </table>
  );
}

function HexagonVariants(props: VariantSetProps) {
  const getVariant = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "hex",
      mines: getMineCount(
        getHexWidth(sideLength),
        getHexHeight(sideLength) * 0.75,
      ),
      width: getHexWidth(sideLength),
      height: getHexHeight(sideLength),
      cellRules: [CellClue.VanillaHex],
    }) satisfies GenerateMinefieldOptions;
  return (
    <table>
      <tbody>
        <tr>
          <LevelButton minefield={getVariant(3)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(4)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(5)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(6)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(7)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(8)} onClick={props.onSelect} />
        </tr>
      </tbody>
    </table>
  );
}
function HexagonBangVariants(props: VariantSetProps) {
  const getVariant = (sideLength: number) =>
    ({
      difficulty: mediumDifficulty,
      grid: "hex",
      mines: getMineCount(
        getHexWidth(sideLength),
        getHexHeight(sideLength) * 0.75,
      ),
      width: getHexWidth(sideLength),
      height: getHexHeight(sideLength),
      cellRules: [CellClue.VanillaHex],
    }) satisfies GenerateMinefieldOptions;
  return (
    <table>
      <tbody>
        <tr>
          <LevelButton minefield={getVariant(4)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(5)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(6)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(7)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(8)} onClick={props.onSelect} />
        </tr>
      </tbody>
    </table>
  );
}
function TriangleVariants(props: VariantSetProps) {
  const getVariant = (sideLength: number) =>
    ({
      difficulty: easyDifficulty,
      grid: "triangle",
      mines: getMineCount(
        getTriWidth(sideLength),
        // getTriHeight(sideLength) / 2,
        getTriHeight(sideLength),
      ),
      width: getTriWidth(sideLength),
      height: getTriHeight(sideLength),
      cellRules: [CellClue.VanillaTri],
    }) satisfies GenerateMinefieldOptions;
  return (
    <table>
      <tbody>
        <tr>
          <LevelButton minefield={getVariant(4)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(5)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(6)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(7)} onClick={props.onSelect} />
          <LevelButton minefield={getVariant(8)} onClick={props.onSelect} />
        </tr>
      </tbody>
    </table>
  );
}

function Gap() {
  return (
    <td
      css={{
        width: 52,
        height: 52,
        textAlign: "center",
        position: "relative",
      }}
    />
  );
}

const cellRuleToLetter = (rule: CellClue) => {
  switch (rule) {
    case CellClue.Vanilla:
    case CellClue.VanillaHex:
    case CellClue.VanillaTri:
      return "V";
    case CellClue.Knight:
      return "K";
    case CellClue.Cross:
      return "X";
    case CellClue.MiniCross:
      return "X'";
    case CellClue.Big:
      return "B";
    case CellClue.Outline:
      return "O";
    case CellClue.Deviation:
      return "D";
    case CellClue.Any:
    default:
      return "?";
  }
};

function LevelButton(props: {
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

  const variant = () => cellRuleToLetter(props.minefield.cellRules[0]);

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
        lineHeight: 1,
      }}
    >
      {variant()}
      <div
        css={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "33.3%",
          display: "flex",
          alignItems: "center",
        }}
      ></div>
      <div
        css={{
          position: "absolute",
          top: "50%",
          left: "66.7%",
          paddingTop: 2,
          paddingLeft: 2,
          fontScale: 0,
          lineHeight: 1,
        }}
      >
        {sideLength()}
      </div>
      <div
        css={{
          position: "absolute",
          bottom: "50%",
          left: "66.7%",
          paddingBottom: 2,
          paddingLeft: 2,
          fontScale: 0,
          lineHeight: 1,
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
