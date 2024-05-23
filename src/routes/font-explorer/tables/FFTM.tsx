import { createMemo, Show } from "solid-js";
import {
  createTableDirectory,
  createTableRecords,
  TableRecord,
  useFontBuffer,
} from "~/modules/font-explorer";

export default function FFTMPage() {
  const tableDirectory = createTableDirectory();

  return (
    <div>
      <h1>FFTM</h1>
      <Show when={tableDirectory()}>
        {(tableDirectory) => {
          const table = createMemo(() =>
            createTableRecords(() => tableDirectory().numTables)()?.find(
              (t) => t.tag === "FFTM"
            )
          );
          return <div>{table() && <Inner table={table()!} />}</div>;
        }}
      </Show>
    </div>
  );
}

const SECONDS_FROM_1904_TIL_UNIX_EPOCH = BigInt("2082844800");

function Inner(props: { table: TableRecord }) {
  const fontBuffer = useFontBuffer();
  const dataView = () =>
    new DataView(fontBuffer()!, props.table.offset, props.table.length);

  const fontForgeVersion = dataView().getUint32(0, false);
  const fontForgeTimestamp = dataView().getBigUint64(4, false);
  const fileCreatedAt = dataView().getBigUint64(12, false);
  const fileModifiedAt = dataView().getBigUint64(20, false);

  const fftDate = new Date(
    Number(fontForgeTimestamp - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000
  );
  const fcaDate = new Date(
    Number(fileCreatedAt - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000
  );
  const fmaDate = new Date(
    Number(fileModifiedAt - SECONDS_FROM_1904_TIL_UNIX_EPOCH) * 1000
  );

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>FontForge Version</th>
            <td>{fontForgeVersion}</td>
          </tr>
          <tr>
            <th>FontForge Timestamp</th>
            <td>
              {fontForgeTimestamp.toString()} (
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(fftDate)}
              )
            </td>
          </tr>
          <tr>
            <th>creation date of this font</th>
            <td>
              {fileCreatedAt.toString()} (
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(fcaDate)}
              )
            </td>
          </tr>
          <tr>
            <th>last modification date of this font</th>
            <td>
              {fileModifiedAt.toString()} (
              {new Intl.DateTimeFormat([], {
                dateStyle: "full",
                timeStyle: "full",
              }).format(fmaDate)}
              )
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
