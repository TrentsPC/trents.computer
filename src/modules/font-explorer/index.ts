import { createMemo, createSignal } from "solid-js";
import { FONT_TABLE_CATEGORIES_IN_ORDER, FONT_TABLES } from "./data/font-tables";

const [fontFile, _setFontFile] = createSignal<File | undefined>(undefined);
const [fontBuffer, setFontBuffer] = createSignal<ArrayBuffer | undefined>(undefined);
export const parsedFont = createMemo(() => {
  const buffer = fontBuffer();
  if (!buffer) return undefined;
  return parseFont(buffer);
});

export function useFontFile() {
  return fontFile;
}

export function useFontBuffer() {
  return fontBuffer;
}

export function setFontFile(fontFile: File) {
  setFontBuffer(undefined);
  _setFontFile(fontFile);
  fontFile.arrayBuffer().then(setFontBuffer);
}

// --- Real stuff below ---

export type Font = {
  buffer: ArrayBuffer;
  offsetTable: OffsetTable;
  tableDirectory: TableRecord[];
  tables: FontTable[];
};

export function parseFont(buffer: ArrayBuffer): Font {
  const offsetTable = parseOffsetTable(buffer);
  const tableDirectory = parseTableDirectory(buffer, offsetTable.numTables);
  tableDirectory.sort((a, b) => (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
  tableDirectory.sort((a, b) => {
    const aCategory = FONT_TABLES.find((d) => d.tag === a.tag)?.category || "Unknown";
    const bCategory = FONT_TABLES.find((d) => d.tag === b.tag)?.category || "Unknown";
    return (
      FONT_TABLE_CATEGORIES_IN_ORDER.indexOf(aCategory) -
      FONT_TABLE_CATEGORIES_IN_ORDER.indexOf(bCategory)
    );
  });

  const tables = tableDirectory.map((record) => parseTable(buffer, record));

  return { buffer, offsetTable, tableDirectory, tables };
}

export type OffsetTable = {
  numTables: number;
};

export function parseOffsetTable(fontBuffer: ArrayBuffer): OffsetTable {
  const dataView = new DataView(fontBuffer, 0, 12);
  const numTables = dataView.getUint16(4);
  return { numTables };
}

export type TableRecord = {
  tag: string;
  // unint32
  checkSum: number;
  // Offset32
  offset: number;
  // unint32
  length: number;
};
export function parseTableDirectory(buffer: ArrayBuffer, numTables: number): TableRecord[] {
  const dataView = new DataView(buffer, 12, numTables * 16);
  const tableRecords: TableRecord[] = [];
  for (let i = 0; i < numTables; i++) {
    const tag = String.fromCharCode(
      dataView.getUint8(i * 16),
      dataView.getUint8(i * 16 + 1),
      dataView.getUint8(i * 16 + 2),
      dataView.getUint8(i * 16 + 3),
    );
    const checkSum = dataView.getUint32(i * 16 + 4);
    const offset = dataView.getUint32(i * 16 + 8);
    const length = dataView.getUint32(i * 16 + 12);
    tableRecords.push({ tag, checkSum, offset, length });
  }
  return tableRecords;
}

type BaseFontTable = {
  tag: string;
  dataView: DataView;
};

export type FontTable = BaseFontTable | FFTMTable;

function parseTable(fontBuffer: ArrayBuffer, record: TableRecord): FontTable {
  const dataView = new DataView(fontBuffer, record.offset, record.length);

  if (record.tag === "FFTM") {
    return parseFFTMTable(record, dataView);
  }

  return {
    tag: record.tag,
    dataView,
  };
}

export type FFTMTable = BaseFontTable & {
  tag: "FFTM";
  fontForgeVersion: number;
  fontForgeTimestamp: Date;
  fileCreatedAt: Date;
  fileModifiedAt: Date;
};

export function isFFTMTable(table: FontTable): table is FFTMTable {
  return table.tag === "FFTM";
}

function parseFFTMTable(record: TableRecord, dataView: DataView): FFTMTable {
  const SECONDS_FROM_1904_TIL_UNIX_EPOCH = BigInt("2082844800");

  const fontForgeVersion = dataView.getUint32(0, false);
  const fontForgeTimestamp = dataView.getBigUint64(4, false);
  const fileCreatedAt = dataView.getBigUint64(12, false);
  const fileModifiedAt = dataView.getBigUint64(20, false);

  const fftDate = new Date(Number(fontForgeTimestamp - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000);
  const fcaDate = new Date(Number(fileCreatedAt - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000);
  const fmaDate = new Date(Number(fileModifiedAt - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000);

  return {
    tag: "FFTM",
    dataView,
    fontForgeVersion,
    fontForgeTimestamp: fftDate,
    fileCreatedAt: fcaDate,
    fileModifiedAt: fmaDate,
  };
}
