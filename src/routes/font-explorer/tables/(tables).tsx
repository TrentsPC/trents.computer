import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import {
  createTableDirectory,
  createTableRecords,
  TableRecord,
} from "~/modules/font-explorer";
import { colors } from "~/theme.styles";

type TableCategory =
  | "Required"
  | "TrueType Outlines"
  | "CFF Outlines"
  | "SVG Outlines"
  | "Bitmap Glyphs"
  | "Advanced Typography"
  | "Font Variations"
  | "Color Fonts"
  | "Other"
  | "FontForge"
  | "Unknown";

const TABLE_CATEGORIES_IN_ORDER: TableCategory[] = [
  "Required",
  "TrueType Outlines",
  "CFF Outlines",
  "SVG Outlines",
  "Bitmap Glyphs",
  "Advanced Typography",
  "Font Variations",
  "Color Fonts",
  "Other",
  "FontForge",
  "Unknown",
];

function compareRecords(a: TableRecord, b: TableRecord) {
  const aCategory =
    TABLE_DATA.find((d) => d.tag === a.tag)?.category || "Unknown";
  const bCategory =
    TABLE_DATA.find((d) => d.tag === b.tag)?.category || "Unknown";

  return (
    TABLE_CATEGORIES_IN_ORDER.indexOf(aCategory) -
    TABLE_CATEGORIES_IN_ORDER.indexOf(bCategory)
  );
}

type TableData = {
  tag: string;
  name: string;
  category: TableCategory;
};

const TABLE_DATA: TableData[] = [
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
    tag: "VORG",
    name: "Vertical Origin",
  },
  {
    category: "CFF Outlines",
    tag: "CFF2",
    name: "Compact Font Format 2.0",
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
    category: "Font Variations",
    tag: "avar",
    name: "Axis variations",
  },
  { category: "Other", tag: "hdmx", name: "Horizontal device metrics" },
  { category: "Other", tag: "meta", name: "Metadata" },
  { category: "Other", tag: "prop", name: "Glyph Properties" },
  {
    category: "FontForge",
    tag: "FFTM",
    name: "FontForge timestamp",
  },
];

export default function TablesPage() {
  const tableDirectory = createTableDirectory();
  return (
    <div>
      <Show when={tableDirectory()}>
        {(tableDirectory) => (
          <TableGrid numTables={tableDirectory().numTables} />
        )}
      </Show>
    </div>
  );
}

function TableGrid(props: { numTables: number }) {
  const records = createTableRecords(() => props.numTables);
  const navigate = useNavigate();

  const sortedRecords = () => [...(records() || [])].sort(compareRecords);

  return (
    <div css={{ display: "grid", gridCols: 4, gap: 16 }}>
      <For each={sortedRecords()}>
        {(record) => {
          const data = TABLE_DATA.find((d) => d.tag === record.tag);
          return (
            <a
              href={`/font-explorer/tables/${encodeURIComponent(record.tag)}`}
              onPointerDown={() => {
                navigate(
                  `/font-explorer/tables/${encodeURIComponent(record.tag)}`
                );
              }}
              css={{
                display: "block",
                background: colors.slate2,
                padding: 16,
                borderRadius: 12,
                "&:hover": {
                  background: colors.slate3,
                },
              }}
            >
              <p>
                <span
                  css={{
                    display: "inline-block",
                    background: colors.slate4,
                    color: colors.slate11,
                    fontScale: 0,
                    px: 3,
                    borderRadius: 3,
                  }}
                >
                  {data?.category || "Unknown"}
                </span>
              </p>
              <h2>
                <code css={{ fontScale: 4 }}>{record.tag}</code>
              </h2>
              <p>{data?.name}</p>
            </a>
          );
        }}
      </For>
    </div>
  );
}
