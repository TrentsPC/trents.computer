export type FontData = {
  meta: FontDataMeta;
  metrics: FontDataMetrics;
  glyphs: Record<string, FontDataGlyph>;
};

export type FontDataMeta = {
  version: string;
  name: string;
  author: string;
  description: string;
  created: string;
  modified: string;
};
export type FontDataMetrics = {
  unitsPerEm: number;
  ascender: number;
  descender: number;
  xHeight: number;
  capHeight: number;
  lineGap: number;
  defaultAdvanceWidth: number;
};
export type FontDataGuideline = {
  name: string;
  y: number;
  color: string;
};
export type FontDataGlyph = {
  name: string;
  codePoint: number;
  advanceWidth: number;
  width: number;
  height: number;
  bitmap: number[][];
};
