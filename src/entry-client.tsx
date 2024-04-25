import { mount, StartClient } from "@solidjs/start/client";
import { createAnimatedFavicon } from "./utils/favicon";

import "~/modules/console-sokoban";
import { createEffect, createSignal } from "solid-js";
import { hcl } from "./modules/color";
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
    hcl(hue(), 27, 80)
  );
  document.documentElement.style.setProperty(
    "--color-brand-vibrant",
    hcl(hue(), 40, 60)
  );
  // style={{
  // "--hue": hue(),
  // "--color-brand": hcl(hue(), 27, 80),
  // "--color-brand-vibrant": hcl(hue(), 40, 60),
  // "--color-brand2": hcl(hue() - 10, 27, 80),
  // "--color-brand3": hcl(hue() - 20, 27, 80),
  // "--color-brand4": hcl(hue() - 30, 27, 80),
  // "--color-brand5": hcl(hue() - 40, 27, 80),
  // "--color-brand6": hcl(hue() - 50, 27, 80),
  // "--color-brand7": hcl(hue() - 60, 27, 80),
  // }}
});

mount(() => <StartClient />, document.getElementById("app")!);
