import { createFileRoute } from "@tanstack/solid-router";
import { useFontBuffer } from "~/modules/font-explorer";
import { fonts } from "~/theme.styles";

export const Route = createFileRoute("/font-explorer/hex")({
  component: HexViewer,
});

// 1KiB = 64 rows
const ROW_COUNT = 128;
const BYTES_PER_ROW = 16;

function getAsciiChar(charCode: number) {
  if (charCode < 32) return ".";
  if (charCode > 126) return ".";
  return String.fromCharCode(charCode);
}

export default function HexViewer() {
  const fontBuffer = useFontBuffer();

  const dataView = () => {
    if (fontBuffer())
      return new DataView(fontBuffer()!, 0, ROW_COUNT * BYTES_PER_ROW);
    return new DataView(
      new ArrayBuffer(ROW_COUNT * BYTES_PER_ROW),
      0,
      ROW_COUNT * BYTES_PER_ROW
    );
  };

  return (
    <div>
      <div>
        <p css={{ fontFamily: fonts.mono, fontScale: -1 }}>
          {new Intl.NumberFormat([], {}).format(fontBuffer()?.byteLength || 0)}{" "}
          bytes
        </p>
        <table
          css={{
            fontFamily: fonts.mono,
            align: "center",
            fontScale: -1,
            "& td:first-child": { align: "left" },
            "& td:last-child": { align: "left" },
          }}
        >
          <thead>
            <tr>
              <td>Address</td>
              <td>&nbsp;</td>
              <td css={{ w: "3ch" }}>00</td>
              <td css={{ w: "3ch" }}>01</td>
              <td css={{ w: "3ch" }}>02</td>
              <td css={{ w: "3ch" }}>03</td>
              <td css={{ w: "3ch" }}>04</td>
              <td css={{ w: "3ch" }}>05</td>
              <td css={{ w: "3ch" }}>06</td>
              <td css={{ w: "3ch" }}>07</td>
              <td>&nbsp;</td>
              <td css={{ w: "3ch" }}>08</td>
              <td css={{ w: "3ch" }}>09</td>
              <td css={{ w: "3ch" }}>0A</td>
              <td css={{ w: "3ch" }}>0B</td>
              <td css={{ w: "3ch" }}>0C</td>
              <td css={{ w: "3ch" }}>0D</td>
              <td css={{ w: "3ch" }}>0E</td>
              <td css={{ w: "3ch" }}>0F</td>
              <td>&nbsp;</td>
              <td css={{ w: "3ch" }}>ASCII</td>
            </tr>
          </thead>
          <tbody>
            {range(0, ROW_COUNT).map((row) => (
              <tr>
                <td>{(row * BYTES_PER_ROW).toString(16).padStart(8, "0")}:</td>
                <td></td>
                {range(0, BYTES_PER_ROW / 2).map((offsetFromRow) => (
                  <td>
                    {dataView()
                      .getUint8(row * BYTES_PER_ROW + offsetFromRow)
                      .toString(16)
                      .padStart(2, "0")}
                  </td>
                ))}
                <td></td>
                {range(BYTES_PER_ROW / 2, BYTES_PER_ROW).map(
                  (offsetFromRow) => (
                    <td>
                      {dataView()
                        .getUint8(row * BYTES_PER_ROW + offsetFromRow)
                        .toString(16)
                        .padStart(2, "0")}
                    </td>
                  )
                )}
                <td />
                <td>
                  {range(0, BYTES_PER_ROW).map((n) =>
                    getAsciiChar(dataView().getUint8(row * BYTES_PER_ROW + n))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
