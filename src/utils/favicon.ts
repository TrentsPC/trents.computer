import { createSignal } from "solid-js";
import { hcl } from "~/modules/color";

export const [hue, setHue] = createSignal(Date.now() % 360);
function updateHue() {
  setHue((hue() + 1) % 360);
  requestAnimationFrame(() => {
    updateHue();
  });
}
updateHue();

const percentEncode = (str: string) =>
  str
    .replaceAll("%", "%25")
    .replaceAll('"', "%22")
    .replaceAll("#", "%23")
    .replaceAll("'", "%27")
    .replaceAll(",", "%2C");

const [visible, setVisible] = createSignal(true);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    setVisible(true);
  } else {
    setVisible(false);
  }
});

export function createAnimatedFavicon() {
  let linkForFavicon = document.querySelector(`head > link[rel='icon']`);
  if (!linkForFavicon) {
    linkForFavicon = document.createElement(`link`);
    linkForFavicon.setAttribute(`rel`, `icon`);
    document.head.appendChild(linkForFavicon);
  }

  function faviconTemplate(color: string) {
    return `
      <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>${percentEncode(
        `<polygon points="50,0 100,50 50,100 0,50" fill="${color}" />`
      )}
      </svg>
    `.trim();
  }

  let i = 0;

  setInterval(() => {
    i++;
    let newFavicon = faviconTemplate(
      visible() ? hcl(hue(), 25, 70) : "#888888"
    );
    linkForFavicon?.setAttribute(`href`, `data:image/svg+xml,${newFavicon}`);
  }, 50);
}
