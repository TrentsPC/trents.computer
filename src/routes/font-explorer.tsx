import { styled } from "@hypergood/css";
import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { For, onMount, Show } from "solid-js";
import {
  createTableDirectory,
  createTableRecords,
  setFontFile,
  useFontFile,
} from "~/modules/font-explorer";
import { colors } from "~/theme.styles";

// export default function FontExplorer(props: RouteSectionProps) {
//   const [show, setShow] = createSignal(false);

//   onMount(() => {
//     setShow(true);
//   });
//   return <>{show() && <Inner {...props} />}</>;
// }

export default function Inner(props: RouteSectionProps) {
  const fontFile = useFontFile();
  const navigate = useNavigate();

  onMount(async () => {
    const res = await fetch("/fonts/soehne/soehne-400.otf");
    const blob = await res.blob();
    const file = new File([blob], "soehne-400.otf", { type: blob.type });
    setFontFile(file);
  });

  const tableDirectory = createTableDirectory();

  return (
    <>
      <div
        css={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          items: "center",
          backgroundColor: "white",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          px: 16,
        }}
      >
        <h1>Font Explorer</h1>
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];
            if (!file) return;
            setFontFile(file);
            navigate("/font-explorer/tables");
          }}
        />
        {fontFile()?.name}
      </div>
      <div
        css={{
          position: "fixed",
          top: 64,
          left: 0,
          bottom: 0,
          padding: 8,
          pt: 16,
          width: 240,
        }}
      >
        <div
          css={{
            w: "100%",
            h: "100%",
            borderRadius: 12,
            padding: 16,
            backgroundColor: colors.gray2,
          }}
        >
          <Ul>
            <Li>
              <a href="/font-explorer/hex">Hex</a>
            </Li>
            <Show when={tableDirectory()}>
              {(tableDirectory) => (
                <Li>
                  <a href="/font-explorer/tables">
                    {tableDirectory().numTables} tables
                  </a>

                  <TableList numTables={tableDirectory().numTables} />
                </Li>
              )}
            </Show>
          </Ul>
        </div>
      </div>
      <div css={{ pt: 64, pl: 240 }}>
        <div css={{ p: 16 }}>{props.children}</div>
      </div>
    </>
  );
}

function TableList(props: { numTables: number }) {
  const tables = createTableRecords(() => props.numTables);
  return (
    <Ul>
      <For each={tables()}>
        {(table) => (
          <Li>
            <a href={`/font-explorer/tables/${encodeURIComponent(table.tag)}`}>
              {table.tag}
            </a>
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
