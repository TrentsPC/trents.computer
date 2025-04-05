import { mount, StartClient } from "@solidjs/start/client";
import { createAnimatedFavicon } from "./utils/favicon";

import { createEffect, createSignal } from "solid-js";
import "~/modules/console-sokoban";
createAnimatedFavicon();

const [hue, setHue] = createSignal(0);

function updateHue() {
  setHue((hue() + 1) % 360);
  requestAnimationFrame(() => {
    updateHue();
  });
}
updateHue();

createEffect(() => {
  const h = hue();
  document.documentElement.style.setProperty("--hue", `${h}`);
  document.documentElement.style.setProperty(
    "--color-brand",
    `oklch(80% 0.27 ${h}deg)`
  );
  document.documentElement.style.setProperty(
    "--color-brand-vibrant",
    `oklch(60% 0.3 ${h}deg)`
  );
});

mount(() => <StartClient />, document.getElementById("app")!);
