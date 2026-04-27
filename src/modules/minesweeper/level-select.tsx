import { GenerateMinefieldOptions } from "./backend/generator";

const easyDifficulty = 3;
const mediumDifficulty = 5;
const hardDifficulty = 7;

function getMineCount(width: number, height: number) {
  const area = width * height;
  const mines = Math.round(area * 0.4);
  return mines;
}

export function LevelSelect(props: {
  onLevelSelect: (minefield: GenerateMinefieldOptions) => void;
}) {
  return (
    <table>
      <tbody>
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
      </tbody>
    </table>
  );
}

export function LevelButton(props: {
  minefield: GenerateMinefieldOptions;
  onClick: (minefield: GenerateMinefieldOptions) => void;
}) {
  return <td onClick={() => props.onClick(props.minefield)}>V</td>;
}
