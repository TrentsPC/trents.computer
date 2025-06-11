type FontTableCategory =
  | "Required"
  | "TrueType Outlines"
  | "CFF Outlines"
  | "SVG Outlines"
  | "Bitmap Glyphs"
  | "Advanced Typography"
  | "OpenType Font Variations"
  | "Color Fonts"
  | "Other"
  | "FontForge"
  | "Unknown";

export const FONT_TABLE_CATEGORIES_IN_ORDER: FontTableCategory[] = [
  "Required",
  "TrueType Outlines",
  "CFF Outlines",
  "SVG Outlines",
  "Bitmap Glyphs",
  "Advanced Typography",
  "OpenType Font Variations",
  "Color Fonts",
  "Other",
  "FontForge",
  "Unknown",
];

type FontTableMeta = {
  tag: string;
  name: string;
  category: FontTableCategory;
};

export const FONT_TABLES: FontTableMeta[] = [
  {
    category: "Required",
    tag: "cmap",
    name: "Character to glyph mapping",
  },
  {
    category: "Required",
    tag: "head",
    name: "Font header",
  },
  {
    category: "Required",
    tag: "hhea",
    name: "Horizontal header",
  },
  {
    category: "Required",
    tag: "hmtx",
    name: "Horizontal metrics",
  },
  {
    category: "Required",
    tag: "maxp",
    name: "Maximum profile",
  },
  {
    category: "Required",
    tag: "name",
    name: "Naming table",
  },
  {
    category: "Required",
    tag: "OS/2",
    name: "OS/2 and Windows specific metrics",
  },
  {
    category: "Required",
    tag: "post",
    name: "PostScript information",
  },
  {
    category: "TrueType Outlines",
    tag: "cvt ",
    name: "Control Value Table",
  },
  {
    category: "TrueType Outlines",
    tag: "fpgm",
    name: "Font program",
  },
  {
    category: "TrueType Outlines",
    tag: "glyf",
    name: "Glyph data",
  },
  {
    category: "TrueType Outlines",
    tag: "loca",
    name: "Index to location",
  },
  {
    category: "TrueType Outlines",
    tag: "prep",
    name: "Control value program",
  },
  {
    category: "TrueType Outlines",
    tag: "gasp",
    name: "Grid-fitting/Scan-conversion",
  },
  {
    category: "CFF Outlines",
    tag: "CFF ",
    name: "Compact Font Format 1.0",
  },
  {
    category: "CFF Outlines",
    tag: "CFF2",
    name: "Compact Font Format 2.0",
  },
  {
    category: "CFF Outlines",
    tag: "VORG",
    name: "Vertical Origin",
  },
  {
    category: "SVG Outlines",
    tag: "SVG ",
    name: "SVG table",
  },
  {
    category: "Bitmap Glyphs",
    tag: "EBDT",
    name: "Embedded bitmap data",
  },
  {
    category: "Bitmap Glyphs",
    tag: "EBLC",
    name: "Embedded bitmap location data",
  },
  {
    category: "Bitmap Glyphs",
    tag: "EBSC",
    name: "Embedded bitmap scaling data",
  },
  {
    category: "Bitmap Glyphs",
    tag: "CBDT",
    name: "Color bitmap data",
  },
  {
    category: "Bitmap Glyphs",
    tag: "CBLC",
    name: "Color bitmap location data",
  },
  {
    category: "Bitmap Glyphs",
    tag: "sbix",
    name: "Standard bitmap graphics",
  },
  {
    category: "Advanced Typography",
    tag: "BASE",
    name: "Baseline data",
  },
  {
    category: "Advanced Typography",
    tag: "GDEF",
    name: "Glyph definition data",
  },
  {
    category: "Advanced Typography",
    tag: "GPOS",
    name: "Glyph positioning data",
  },
  {
    category: "Advanced Typography",
    tag: "GSUB",
    name: "Glyph substitution data",
  },
  {
    category: "Advanced Typography",
    tag: "JSTF",
    name: "Justification data",
  },
  {
    category: "Advanced Typography",
    tag: "MATH",
    name: "Math layout data",
  },
  {
    category: "OpenType Font Variations",
    tag: "avar",
    name: "Axis variations",
  },
  {
    category: "OpenType Font Variations",
    tag: "cvar",
    name: "CVT variations (TrueType outlines only)",
  },
  {
    category: "OpenType Font Variations",
    tag: "fvar",
    name: "Font variations",
  },
  {
    category: "OpenType Font Variations",
    tag: "gvar",
    name: "Glyph variations (TrueType outlines only)",
  },
  {
    category: "OpenType Font Variations",
    tag: "HVAR",
    name: "Horizontal metrics variations",
  },
  {
    category: "OpenType Font Variations",
    tag: "MVAR",
    name: "Metrics variations",
  },
  {
    category: "OpenType Font Variations",
    tag: "STAT",
    name: "Style attributes (required for variable fonts, optional for non-variable fonts)",
  },
  {
    category: "OpenType Font Variations",
    tag: "VVAR",
    name: "Vertical metrics variations",
  },
  {
    category: "Color Fonts",
    tag: "COLR",
    name: "Color table",
  },
  {
    category: "Color Fonts",
    tag: "CPAL",
    name: "Color palette table",
  },
  {
    category: "Color Fonts",
    tag: "CBDT",
    name: "Color bitmap data",
  },
  {
    category: "Color Fonts",
    tag: "CBLC",
    name: "Color bitmap location data",
  },
  {
    category: "Color Fonts",
    tag: "sbix",
    name: "Standard bitmap graphics",
  },
  {
    category: "Color Fonts",
    tag: "SVG ",
    name: "The SVG (Scalable Vector Graphics) table",
  },
  { category: "Other", tag: "DSIG", name: "Digital signature" },
  { category: "Other", tag: "hdmx", name: "Horizontal device metrics" },
  { category: "Other", tag: "kern", name: "Kerning" },
  { category: "Other", tag: "LTSH", name: "Linear threshold data" },
  { category: "Other", tag: "MERG", name: "Merge" },
  { category: "Other", tag: "meta", name: "Metadata" },
  { category: "Other", tag: "STAT", name: "Style Attributes" },
  { category: "Other", tag: "PCLT", name: "PCL 5 data" },
  { category: "Other", tag: "VDMX", name: "Vertical device metrics" },
  { category: "Other", tag: "vhea", name: "Vertical Metrics header" },
  { category: "Other", tag: "vmtx", name: "Vertical Metrics" },
  {
    category: "FontForge",
    tag: "FFTM",
    name: "FontForge timestamp",
  },
];
