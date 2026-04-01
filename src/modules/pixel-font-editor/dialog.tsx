import { createEffect, JSX } from "solid-js";

const GAMEBOY = ["#a3b334", "#6B882E", "#3A6122", "#0F3810"];
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

const TWENTY_FIVE_GRADIENT = `conic-gradient(
  transparent 25%, 
  ${colors.text} 0, 
  ${colors.text} 25%, 
  transparent 0, 
  transparent 75%, 
  ${colors.text} 0
) 0 0 / 4px 4px`;
const FIFTY_GRADIENT = `conic-gradient(transparent 25%, ${colors.text} 0, ${colors.text} 50%, transparent 0, transparent 75%, ${colors.text} 0) 0 0 / 4px 4px`;
const SEVENTY_FIVE_GRADIENT = `conic-gradient(
  ${colors.text} 25%, 
  ${colors.text} 0, 
  ${colors.text} 50%, 
  transparent 0, 
  transparent 75%, 
  ${colors.text} 0
) 0 0 / 4px 4px`;

export function Dialog(props: { children?: JSX.Element }) {
  let canvasRef = null! as HTMLCanvasElement;

  createEffect(() => {
    const canvas = canvasRef;
    let ctx = canvas.getContext("2d")!;

    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dp = (n: number) => n * dpr;

    // Set canvas size accounting for device pixel ratio
    canvas.width = dp(w);
    canvas.height = dp(h);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    // ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(20, 0, 220, 0);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "black");
    gradient.addColorStop(1, "white");

    ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, 200, 100);

    const imageData = ctx.getImageData(20, 20, 200, 100, {
      colorSpace: "srgb",
      pixelFormat: "rgba-unorm8",
    });

    function ditherPixel(x: number, y: number, data: number): boolean {
      x = Math.floor(x / 2 / dpr);
      y = Math.floor(y / 2 / dpr);

      const twenty_five = (x % 2 || y % 2) === 0;
      const fifty_fifty = ((x % 2) + (y % 2)) % 2 === 0;
      const seventy_five = (x % 2 && y % 2) === 0;

      const stops = [false, twenty_five, fifty_fifty, seventy_five, true];

      const stopIdx = Math.floor((data / 256) * stops.length);
      const stop = stops[stopIdx];

      return !stop;
    }

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 200; x++) {
        const position = (y * 200 + x) * 4;
        const red = imageData.data.at(position);
        const dither = ditherPixel(x, y, red || 0);
        if (dither) {
          imageData.data.set([0, 0, 0, 255], position);
        } else {
          imageData.data.set([200, 200, 200, 255], position);
        }
      }
    }

    ctx.clearRect(20, 20, 200, 100);

    ctx.putImageData(imageData, 20, 20);
  });

  return (
    <div
      css={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // paddingTop: 64 * 7,
        pointerEvents: "none",
        flexDirection: "column",
      }}
      style={{
        background: FIFTY_GRADIENT,
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
        css={{ padding: 6, paddingBottom: 8, backgroundColor: "transparent" }}
        style={{
          // background: SEVENTY_FIVE_GRADIENT,
          "background-attachment": "fixed",
        }}
      >
        <div
          css={{ padding: 0, backgroundColor: "transparent" }}
          style={{
            background: colors.text,
            "background-attachment": "fixed",
          }}
        >
          <div
            css={{ width: 200, height: 200, padding: 16 }}
            style={{
              "background-color": colors.background,
              border: `2px solid ${colors.text2}`,
              "box-shadow": `4px 4px ${colors.text}`,
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
