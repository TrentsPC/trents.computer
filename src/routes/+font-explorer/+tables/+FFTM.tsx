import { createFileRoute } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { FFTMTable, isFFTMTable, parsedFont } from "~/modules/font-explorer";

export const Route = createFileRoute("/font-explorer/tables/FFTM")({
  component: FFTMPage,
});

function FFTMPage() {
  const table = () => parsedFont()?.tables.find(isFFTMTable);
  return (
    <div>
      <h1>FFTM</h1>
      <Show when={table()}>
        {(table) => {
          return <div>{table() && <Inner table={table()} />}</div>;
        }}
      </Show>
    </div>
  );
}

function Inner(props: { table: FFTMTable }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>FontForge Version</th>
            <td>{props.table.fontForgeVersion}</td>
          </tr>
          <tr>
            <th>FontForge Timestamp</th>
            <td>
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(props.table.fontForgeTimestamp)}
            </td>
          </tr>
          <tr>
            <th>creation date of this font</th>
            <td>
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(props.table.fileCreatedAt)}
            </td>
          </tr>
          <tr>
            <th>last modification date of this font</th>
            <td>
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(props.table.fileModifiedAt)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
