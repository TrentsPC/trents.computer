export type Grid<T> = T[][];

export type Position = [x: number, y: number];

export const CellClue = {
  Mine: 0,
  Any: 1,
  Vanilla: 2,
  VanillaHex: 3,
  VanillaTri: 4,
  Knight: 5,
  // KnightHex: 6,
  // KnightTri: 7,
  Cross: 8,
  // CrossHex: 9,
  // CrossTri: 10,
  MiniCross: 11,
  // MiniCrossHex: 12,
  // MiniCrossTri: 13,
  Deviation: 14,
  // DeviationHex: 15,
  // DeviationTri: 16,
  Big: 17,
  // BigHex: 18,
  // BigTri: 19,
  Outline: 20,
  // OutlineHex: 21,
  // OutlineTri: 22,
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
