import { Accessor, createMemo, createSignal } from "solid-js";

const [fontFile, _setFontFile] = createSignal<File | undefined>(undefined);
const [fontBuffer, setFontBuffer] = createSignal<ArrayBuffer | undefined>(
  undefined
);

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

export type TableDirectory = {
  // uint32
  // sfntVersion: number;
  // uint16
  numTables: number;
};

export function createTableDirectory() {
  const fontBuffer = useFontBuffer();
  const tableDirectory = createMemo<TableDirectory | undefined>(() => {
    const buf = fontBuffer();
    if (!buf) return undefined;
    const dataView = new DataView(buf!, 0, 12);
    const numTables = dataView.getUint16(4);
    return { numTables };
  });
  return tableDirectory;
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

export function createTableRecords(numTables: Accessor<number>) {
  const fontBuffer = useFontBuffer();

  const records = createMemo(() => {
    if (!fontBuffer()) return;
    const dataView = new DataView(fontBuffer()!, 12, numTables() * 16);
    const tableRecords: TableRecord[] = [];
    for (let i = 0; i < numTables(); i++) {
      const tag = String.fromCharCode(
        dataView.getUint8(i * 16),
        dataView.getUint8(i * 16 + 1),
        dataView.getUint8(i * 16 + 2),
        dataView.getUint8(i * 16 + 3)
      );
      const checkSum = dataView.getUint32(i * 16 + 4);
      const offset = dataView.getUint32(i * 16 + 8);
      const length = dataView.getUint32(i * 16 + 12);
      tableRecords.push({ tag, checkSum, offset, length });
    }
    return tableRecords;
  });
  return records;
}
