export type Grid<T> = T[][];

export type Position = [x: number, y: number];

export const CellClue = {
  Mine: 0,
  Any: 1,
  Vanilla: 2,
  VanillaHex: 3,
  VanillaTri: 4,
} as const;
export type CellClue = (typeof CellClue)[keyof typeof CellClue];

export type FieldClue = "vanilla";

export type GridType = "square" | "hex" | "triangle";

export type Minefield = {
  width: number;
  grid: GridType;
  height: number;
  mines: number;
  flags: number;
  fieldClue: FieldClue;
  cellClues: Grid<CellClue>;
  solveState: Grid<true | false | undefined>;
  mask: Grid<boolean>;
};
