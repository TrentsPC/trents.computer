export type Grid<T> = T[][];

export type Position = [x: number, y: number];

export const CellClue = {
  Mine: 0,
  Vanilla: 1,
  Any: 2,
} as const;
export type CellClue = (typeof CellClue)[keyof typeof CellClue];

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
