import html2canvas from "html2canvas";
// TODO: Switch to `modern-screenshot`
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import { bezier } from "./bezier";
const getNewPage = () => import("~/modules/os/sonoma/sonoma").then((m) => m.TrentOS);

export async function genieMinimise() {
  let screenshot = await getCanvas();
  const Component = await getNewPage();
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    filter: drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.25));
  `;
  canvas.width = screenshot.width;
  canvas.height = screenshot.height;
  const ctx = canvas.getContext("2d")!;
  drawImage(ctx, screenshot, 0, 0);

  // Mount canvas
  const container = document.getElementById("app")!;
  container.innerHTML = "";
  render(
    () => (
      <QueryClientProvider client={new QueryClient()}>
        <Component />
      </QueryClientProvider>
    ),
    container,
  );
  container.appendChild(canvas);

  const squishEasing = bezier(0.42, 0, 0.58, 1);
  await animate(500, (progress) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(ctx, screenshot, squishEasing(progress), 0);
  });
  await animate(500, (progress) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(ctx, screenshot, 1, squishEasing(progress));
  });
  container.removeChild(canvas);
}

const getCanvas = async () => {
  const canvas = await html2canvas(document.body);
  const scrollY = window.scrollY;
  const dpr = window.devicePixelRatio;
  const screenScrollY = scrollY * dpr;
  console.log(canvas.width, canvas.height, dpr, window.innerHeight);

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = window.innerWidth * dpr;
  croppedCanvas.height = window.innerHeight * dpr;
  const ctx = croppedCanvas.getContext("2d")!;
  ctx.drawImage(
    canvas,
    0,
    screenScrollY,
    window.innerWidth * dpr,
    window.innerHeight * dpr,
    0,
    0,
    window.innerWidth * dpr,
    window.innerHeight * dpr,
  );

  return croppedCanvas;
};

function drawImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLCanvasElement,
  squishFactor: number,
  shiftFactor: number,
) {
  const squishCurve = bezier(0.42, 0, 0.58, 1);
  const { width, height } = image;
  const squish = squishFactor * width - 80;
  const shift = shiftFactor * height;

  for (let y = 0; y < height; y++) {
    const ySquish = squishCurve((height - y) / height) * squish;
    ctx.drawImage(image, 0, y + shift, width, 1, ySquish / 2, y, width - ySquish, 1);
  }
}

async function animate(duration: number, callback: (progress: number) => void) {
  const start = performance.now();
  let progress = 0;
  while (progress < 1) {
    progress = (performance.now() - start) / duration;
    callback(progress);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
