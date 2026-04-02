import { createEffect, JSX } from "solid-js";

const GAMEBOY = ["#a3b334", "#6B882E", "#3A6122", "#0f3810"];
const colors = {
  background: GAMEBOY[0],
  text: GAMEBOY[3],
  text2: GAMEBOY[2],
  border: GAMEBOY[1],

  canvas: {
    bg1: GAMEBOY[0],
    bg2: GAMEBOY[0],
    border: GAMEBOY[1],
    guideline: GAMEBOY[3],
    fill: GAMEBOY[3],
  },
};

type Matrix = number[][];

const BAYER_2: Matrix = [
  [0, 2],
  [3, 1],
];
const BAYER_4: Matrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const BAYER_8: Matrix = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export function Dialog(props: { children?: JSX.Element }) {
  let canvasRef = null! as HTMLCanvasElement;

  createEffect(() => {
    const canvas = canvasRef;
    let ctx = canvas.getContext("2d")!;

    if (!ctx) return;

    const rawW = window.innerWidth;
    const rawH = window.innerHeight;
    const width = rawW / 2;
    const height = rawH / 2;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = rawW + "px";
    canvas.style.height = rawH + "px";

    ctx.fillStyle = "#bebebe";
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, width, height);

    const midPointX = Math.floor(width / 2);
    const top = 128;
    const dialogContentWidth = 512;
    const dialogContentHeight = 256;

    ctx.shadowBlur = 48 / 2;
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowOffsetY = 16 / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(
      midPointX - dialogContentWidth / 2,
      top,
      dialogContentWidth,
      dialogContentHeight,
    );

    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(
      midPointX - dialogContentWidth / 2,
      top,
      dialogContentWidth,
      dialogContentHeight,
    );

    function ditherPixel(x: number, y: number, data: number): boolean {
      x = Math.floor(x);
      y = Math.floor(y);
      const thresholdMatrix = BAYER_8;
      const rows = thresholdMatrix.length;
      const columns = thresholdMatrix[0].length;
      const total = rows * columns;

      const value = data / 256;
      // const threshold = thresholdMatrix[y % rows][x % columns];
      // const threshold = Math.random() * total;
      // https://matejlou.blog/2023/12/06/ordered-dithering-for-arbitrary-or-irregular-palettes/
      const fmodf = (a: number, b: number) => a % b;
      // const threshold = fmodf(
      //   52.9829189 * fmodf(0.06711056 * x + 0.00583715 * y, 1.0),
      //   1.0,
      // );
      const rawT = fmodf(0.7548776662 * x + 0.56984029 * y, 1.0);
      const threshold = rawT < 0.5 ? 2.0 * rawT : 2.0 - 2.0 * rawT;

      return value <= threshold;
    }

    const imageData = ctx.getImageData(0, 0, width, height, {
      colorSpace: "srgb",
      pixelFormat: "rgba-unorm8",
    });
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const position = (y * width + x) * 4;
        const red = imageData.data.at(position);
        const dither = ditherPixel(x, y, red || 0);
        if (dither) {
          imageData.data.set([15, 56, 16, 255], position);
        } else {
          imageData.data.set([200, 200, 200, 0], position);
        }
      }
    }

    // ctx.clearRect(0, 0, width, height);

    ctx.putImageData(imageData, 0, 0);
  });

  return (
    <div
      css={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: 128 * 2,
        pointerEvents: "none",
        flexDirection: "column",
      }}
      style={{
        // background: FIFTY_GRADIENT,
        "background-attachment": "fixed",
      }}
    >
      <canvas
        ref={canvasRef}
        css={{
          imageRendering: "pixelated",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        css={{ width: 512 * 2, height: 256 * 2, padding: 16 }}
        style={{
          "background-color": colors.background,
          // border: `2px solid ${colors.text2}`,
          position: "relative",
          "box-shadow": `0 0 0 2px ${colors.text2}`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
