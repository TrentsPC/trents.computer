import { createSignal, For, ValidComponent } from "solid-js";
import "./win98-fonts/ms-sans-serif.css";
import ie from "./win98-icons/internet-explorer.png";

import { Dynamic } from "solid-js/web";
import { Rect } from "../window";
import { InternetExplorerWindow } from "./win98-windows/SafariWindow";

type Application = {
  id: string;
  name: string;
  // icon: string;
  component: ValidComponent;
  minWidth?: number;
  minHeight?: number;
  basisWidth?: number;
  basisHeight?: number;
};

const APPLICATIONS: Application[] = [
  {
    id: "internet-explorer",
    name: "Internet Explorer",
    // icon: safari,
    component: InternetExplorerWindow,
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 574,
    minHeight: 224,
  },
];

const [openWindows, setOpenWindows] = createSignal<Array<{ id: string }>>([]);

function addWindow(id: string) {
  const items = openWindows().slice();
  if (items.some((w) => w.id === id)) {
    const idx = items.findIndex((w) => w.id === id)!;
    const item = items.splice(idx, 1);
    items.push(item[0]);
  } else {
    items.push({ id });
  }
  setOpenWindows(items);
}

function bringToFront(id: string) {
  const items = openWindows().slice();
  if (items.some((w) => w.id === id)) {
    const idx = items.findIndex((w) => w.id === id)!;
    const item = items.splice(idx, 1);
    items.push(item[0]);
    setOpenWindows(items);
  }
}

function removeWindow(id: string) {
  const items = openWindows().slice();
  const idx = items.findIndex((w) => w.id === id)!;
  items.splice(idx, 1);
  setOpenWindows(items);
}

export function TrentOS() {
  if (document?.body) {
    document.body.style.overflow = "hidden";
  }

  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        w: "100%",
        h: "100%",
        minH: "100%",
        maxH: "100%",
        fontFamily: "'ms_sans_serif'",
        backgroundColor: "#008080",
      }}
    >
      <div
        css={{
          w: "100%",
          h: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          p: 2 * 2,
          pb: 28 * 2,
          gap: 3 * 2,
        }}
      >
        {/* <DesktopItem name="My Computer" app="internet-explorer" />
        <DesktopItem name="My Documents" app="internet-explorer" /> */}
        <DesktopItem name="Internet Explorer" app="internet-explorer" />
        {/* <DesktopItem name="Network Neighborhood" app="internet-explorer" />
        <DesktopItem name="Recycle Bin" app="internet-explorer" />
        <DesktopItem
          name="Set Up The Microsoft Network"
          app="internet-explorer"
        /> */}
      </div>
      <div
        css={{
          backgroundColor: "#c0c0c0",
          h: 26 * 2,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -2px #fff, 0 -4px #dfdfdf",
        }}
      ></div>
      {/* Windows */}

      <For each={openWindows()}>
        {(window, i) => {
          const app = APPLICATIONS.find((a) => a.id === window.id);
          if (!app) {
            return null;
          }
          return (
            <Dynamic
              component={app.component}
              style={{
                "z-index": i() * 100 + 100,
              }}
              options={{
                collisionPaddingBottom: 56,
                minWidth: app.minWidth || 0,
                minHeight: app.minHeight || 0,
              }}
              initialRect={getInitialRect({ top: 0, bottom: 56 })}
              onMouseDown={() => {
                bringToFront(window.id);
              }}
              onClose={() => {
                removeWindow(window.id);
              }}
              onMinimize={() => {
                removeWindow(window.id);
              }}
              onMaximize={() => {
                // removeWindow(window.id);
              }}
            />
          );
        }}
      </For>
    </div>
  );
}

function getInitialRect(opts: { top: number; bottom: number }): Rect {
  const viewportH = window.innerHeight;
  const viewportW = window.innerWidth;
  const width = viewportW * 0.8;
  const space = viewportH - opts.top - opts.bottom;
  const height = space * 0.8;
  return {
    x: viewportW * 0.1,
    y: opts.top + space * 0.1,
    width: width,
    height: height,
  };
}

function DesktopItem(props: { app: string; name: string }) {
  return (
    <button
      css={{
        w: 72 * 2,
        h: 72 * 2,
        display: "flex",
        flexDirection: "column",
        items: "center",
        textAlign: "center",
      }}
      onClick={() => addWindow(props.app)}
    >
      <img
        src={ie}
        width={32 * 2}
        height={32 * 2}
        css={{
          imageRendering: "pixelated",
        }}
      />
      <span
        css={{
          fontSize: 11 * 2,
          lineHeight: 13 * 2 + "px",
          color: "white",
          mt: 5 * 2,
          lineClamp: 2,
        }}
      >
        {props.name}
      </span>
    </button>
  );
}
