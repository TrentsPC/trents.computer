import { createFileRoute, Link } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { Font, parsedFont } from "~/modules/font-explorer";
import { FONT_TABLES } from "~/modules/font-explorer/data/font-tables";
import { colors } from "~/theme.styles";

export const Route = createFileRoute("/font-explorer/tables/")({
  component: TablesPage,
});

function TablesPage() {
  return (
    <div>
      <Show when={parsedFont()}>{(tableDirectory) => <TableGrid font={tableDirectory()} />}</Show>
    </div>
  );
}

function TableGrid(props: { font: Font }) {
  const records = () => props.font.tableDirectory;

  return (
    <div css={{ display: "grid", gridCols: 4, gap: 16 }}>
      <For each={records()}>
        {(record) => {
          const data = FONT_TABLES.find((d) => d.tag === record.tag);
          return (
            <Link
              to={`/font-explorer/tables/${encodeURIComponent(record.tag)}` as any}
              css={{
                display: "block",
                background: colors.gray2,
                padding: 16,
                borderRadius: 12,
                "&:hover": {
                  background: colors.gray3,
                },
              }}
            >
              <p>
                <span
                  css={{
                    display: "inline-block",
                    background: colors.gray4,
                    color: colors.gray11,
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
            </Link>
          );
        }}
      </For>
    </div>
  );
}
