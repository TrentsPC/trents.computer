import { styled } from "@hypergood/css";
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/solid-router";
import { For, onMount, Show } from "solid-js";
import {
  Font,
  parsedFont,
  setFontFile,
  useFontFile,
} from "~/modules/font-explorer";
import { colors } from "~/theme.styles";

export const Route = createFileRoute("/font-explorer")({
  component: Inner,
});

function Inner() {
  const fontFile = useFontFile();
  const navigate = useNavigate();

  onMount(async () => {
    const res = await fetch("/fonts/soehne/soehne-400.otf");
    const blob = await res.blob();
    const file = new File([blob], "soehne-400.otf", { type: blob.type });
    setFontFile(file);
  });

  return (
    <>
      <div
        css={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 240,
        }}
      >
        <div
          css={{
            w: "100%",
            h: "100%",
            padding: 16,
            backgroundColor: colors.gray2,
          }}
        >
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const file = files[0];
              if (!file) return;
              setFontFile(file);
              navigate({
                to: "/font-explorer/tables",
              });
            }}
          />
          {fontFile()?.name}
          <Show when={parsedFont()}>
            {(font) => (
              <Ul>
                <Li>
                  <a href="/font-explorer/hex">Hex</a>
                </Li>

                <Li>
                  <a href="/font-explorer/tables">
                    {font().offsetTable.numTables} tables
                  </a>

                  <TableList font={font()} />
                </Li>
              </Ul>
            )}
          </Show>
        </div>
      </div>
      <div css={{ pl: 240 }}>
        <div css={{ p: 16 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

function TableList(props: { font: Font }) {
  const tables = () => props.font.tableDirectory;
  return (
    <Ul>
      <For each={tables()}>
        {(table) => (
          <Li>
            <Link
              to={
                `/font-explorer/tables/${encodeURIComponent(table.tag)}` as any
              }
            >
              {table.tag}
            </Link>
          </Li>
        )}
      </For>
    </Ul>
  );
}

const Ul = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  paddingLeft: 8,
});

const Li = styled("li", {});
