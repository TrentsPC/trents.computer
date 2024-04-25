import { styled } from "@hypergood/css";
import {
  ComponentProps,
  createSignal,
  For,
  JSX,
  splitProps,
  ValidComponent,
} from "solid-js";
// import wallpaper from "./wallpapers/macos/sonoma-light.png";
import wallpaper from "./wallpapers/windows7/harmony.jpg";

import calendar from "./app-icons/calendar.png";
import finder from "./app-icons/finder.png";
import safari from "./app-icons/safari.png";

import { Dynamic } from "solid-js/web";
import { Rect } from "../window";
import trash from "./app-icons/trash-empty.png";
import { CalendarWindow } from "./sonoma-windows/CalendarWindow";
import { FinderWindow } from "./sonoma-windows/FinderWindow";
import { SafariWindow } from "./sonoma-windows/SafariWindow";

type Application = {
  id: string;
  name: string;
  icon: string;
  component: ValidComponent;
  minWidth?: number;
  minHeight?: number;
  basisWidth?: number;
  basisHeight?: number;
};

const APPLICATIONS: Application[] = [
  {
    id: "finder",
    name: "Finder",
    icon: finder,
    component: FinderWindow,
    basisWidth: 830,
    basisHeight: 520,
    minWidth: 640,
    minHeight: 503,
  },
  {
    id: "safari",
    name: "Safari",
    icon: safari,
    component: SafariWindow,
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 574,
    minHeight: 224,
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: calendar,
    component: CalendarWindow,
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 640,
    minHeight: 503,
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
        fontFamily: "system-ui",
      }}
    >
      <img
        src={wallpaper}
        css={{
          position: "absolute",
          w: "100%",
          h: "100%",
          minH: "100%",
          maxH: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <Dock>
        <DockGroup>
          <DockItem id="finder" />
          {/* <DockItem src={launchpad} /> */}
          <DockItem id="safari" />
          {/* <DockItem src={messages} onClick={() => addWindow("messages")} /> */}
          {/* <DockItem src={mail} /> */}
          {/* <DockItem src={maps} /> */}
          {/* <DockItem src={photos} /> */}
          {/* <DockItem src={facetime} /> */}
          <DockItem id="calendar" />
          {/* <DockItem src={contacts} /> */}
          {/* <DockItem src={reminders} /> */}
          {/* <DockItem src={notes} /> */}
          {/* <DockItem src={music} /> */}
          {/* <DockItem src={appleTv} /> */}
          {/* <DockItem src={podcasts} /> */}
          {/* <DockItem src={news} /> */}
          {/* <DockItem src={settings} /> */}
        </DockGroup>
        {/* <DockSeparator /> */}
        <DockGroup>
          {/* <DockItem src={textedit} /> */}
          {/* <DockItem src={preview} /> */}
          {/* <DockItem src={yourApp} /> */}
        </DockGroup>
        <DockSeparator />
        <DockGroup>
          {/* <DockItem src={folder} /> */}
          {/* <DockItem src={documentIcon} /> */}
          <Trash />
        </DockGroup>
      </Dock>
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
                collisionPaddingTop: 71,
                minWidth: app.minWidth || 0,
                minHeight: app.minHeight || 0,
              }}
              initialRect={getInitialRect({ top: 71, bottom: 0 })}
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

function Dock(props: { children?: JSX.Element }) {
  return (
    <div
      css={{
        d: "flex",
        position: "fixed",
        top: 5,
        px: 5,
        height: 65,
        left: "50%",
        width: "max-content",
        transform: "translateX(-50%)",
        backdropFilter: "blur(68px)",
      }}
    >
      {props.children}
      <div
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          zIndex: -1,
          r: 16,

          bg: "rgba(246, 246, 246, 0.36)",
          // border: "1px solid rgba(26, 26, 26, 0.46)",
          mixBlendMode: "luminosity",
          boxShadow:
            "0px 0px 6px 0px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
}

function DockSeparator() {
  return (
    <div
      css={{
        d: "flex",
        justify: "center",
        items: "center",
        w: 22,
        h: "100%",
        // py: 5,
      }}
    >
      <div
        css={{
          w: 1,
          h: 46,
          r: 0.5,
          bg: "rgba(0, 0, 0, 0.1)",
          mixBlendMode: "darken",
        }}
      />
    </div>
  );
}

const DockGroup = styled("div", {
  d: "flex",
  pt: 5,
  gap: 2,
});

function DockItem(props: ComponentProps<"button"> & { id: string }) {
  const [, otherProps] = splitProps(props, ["id"]);
  const app = APPLICATIONS.find((a) => a.id === props.id);
  if (!app) {
    return null;
  }
  return (
    <button
      css={{
        w: 50,
        d: "flex",
        flexDirection: "column",
      }}
      onClick={() => addWindow(app.id)}
      {...otherProps}
    >
      <img
        css={{
          w: 50,
          h: 50,
        }}
        src={app.icon}
      />
      <div
        css={{ w: 50, h: 10, d: "flex", items: "center", justify: "center" }}
      >
        {openWindows().some((a) => a.id === app.id) && (
          <div css={{ bg: "rgba(0,0,0,0.5)", w: 4, h: 4, borderRadius: 2 }} />
        )}
      </div>
    </button>
  );
}

function Trash(props: ComponentProps<"button">) {
  return (
    <button
      css={{
        w: 50,
        d: "flex",
        flexDirection: "column",
      }}
      // onClick={() => addWindow("finder")}
      {...props}
    >
      <img
        css={{
          w: 50,
          h: 50,
        }}
        src={trash}
      />
    </button>
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
