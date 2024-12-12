import { styled } from "@hypergood/css";
import {
  Component,
  ComponentProps,
  createSignal,
  For,
  JSX,
  lazy,
  splitProps,
  Suspense,
} from "solid-js";
// import wallpaper from "./wallpapers/macos/sonoma-light.png";
import wallpaper from "./wallpapers/windows7/harmony.jpg";

import calendar from "./sonoma-icons/calendar.png";
import finder from "./sonoma-icons/finder.png";
import messages from "./sonoma-icons/messages.png";
import safari from "./sonoma-icons/safari.png";
import simulator from "./sonoma-icons/simulator.png";
import terminal from "./sonoma-icons/terminal.png";

import { Dynamic } from "solid-js/web";
import { Desktop } from "../desktop-environment/desktop";
import type { MacOSWindowProps } from "./base-windows/MacOSWindow";
import trash from "./sonoma-icons/trash-empty.png";

type Application = {
  id: string;
  name: string;
  icon: string;
  // Equivalent to SwiftUI `App`, could contain Window, WindowGroup, MenuBarExtra, etc.
  component: Component<MacOSWindowProps>;
  minWidth?: number;
  minHeight?: number;
  basisWidth: number;
  basisHeight: number;
};

const APPLICATIONS: Application[] = [
  {
    id: "finder",
    name: "Finder",
    icon: finder,
    component: lazy(() =>
      import("./sonoma-windows/FinderWindow").then((m) => ({
        default: m.FinderWindow,
      }))
    ),
    basisWidth: 830,
    basisHeight: 520,
    minWidth: 640,
    minHeight: 503,
  },
  {
    id: "messages",
    name: "Messages",
    icon: messages,
    component: lazy(() =>
      import("./sonoma-windows/MessagesWindow").then((m) => ({
        default: m.MessagesWindow,
      }))
    ),
    basisWidth: 1024,
    basisHeight: 820,
    minWidth: 660,
    minHeight: 320,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: terminal,
    component: lazy(() =>
      import("./sonoma-windows/TerminalWindow").then((m) => ({
        default: m.TerminalWindow,
      }))
    ),
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 574,
    minHeight: 224,
  },
  {
    id: "safari",
    name: "Safari",
    icon: safari,
    component: lazy(() =>
      import("./sonoma-windows/SafariWindow").then((m) => ({
        default: m.SafariWindow,
      }))
    ),
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 574,
    minHeight: 224,
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: calendar,
    component: lazy(() =>
      import("./sonoma-windows/CalendarWindow").then((m) => ({
        default: m.CalendarWindow,
      }))
    ),
    basisWidth: 935,
    basisHeight: 598,
    minWidth: 640,
    minHeight: 503,
  },
  {
    id: "simulator",
    name: "Simulator",
    icon: simulator,
    component: lazy(() =>
      import("./sonoma-windows/SimulatorWindow").then((m) => ({
        default: m.SimulatorWindow,
      }))
    ),
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
          pointerEvents: "none",
        }}
      />
      {/* Windows */}
      <Desktop
        insets={{
          top: 66,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <For each={openWindows()}>
          {(window, i) => {
            const app = APPLICATIONS.find((a) => a.id === window.id);
            if (!app) {
              return null;
            }
            return (
              <Suspense fallback={null}>
                <Dynamic
                  component={app.component}
                  style={{
                    "z-index": i() * 100 + 100,
                  }}
                  initialHeight={app.basisHeight}
                  initialWidth={app.basisWidth}
                  minWidth={app.minWidth}
                  minHeight={app.minHeight}
                  onMouseDown={() => {
                    bringToFront(window.id);
                  }}
                  onClose={() => {
                    removeWindow(window.id);
                  }}
                  // onMinimize={() => {
                  //   removeWindow(window.id);
                  // }}
                  // onMaximize={() => {
                  //   // removeWindow(window.id);
                  // }}
                />
              </Suspense>
            );
          }}
        </For>
      </Desktop>
      <Dock>
        <DockGroup>
          <DockItem id="finder" />
          {/* <DockItem src={launchpad} /> */}
          <DockItem id="safari" />
          <DockItem id="messages" />
          {/* <DockItem src={mail} /> */}
          {/* <DockItem src={maps} /> */}
          {/* <DockItem src={photos} /> */}
          {/* <DockItem src={facetime} /> */}
          <DockItem id="terminal" />
          <DockItem id="simulator" />
          {/* <DockItem id="calendar" /> */}
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
        height: 60,
        left: "50%",
        width: "max-content",
        transform: "translateX(-50%)",
        backdropFilter: "blur(68px)",
        borderRadius: 16,
        zIndex: 2147483647,
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
          borderRadius: 16,

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
  py: 5,
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
      {/* <div
        css={{ w: 50, h: 10, d: "flex", items: "center", justify: "center" }}
      >
        {openWindows().some((a) => a.id === app.id) && (
          <div css={{ bg: "rgba(0,0,0,0.5)", w: 4, h: 4, borderRadius: 2 }} />
        )}
      </div> */}
      <img
        css={{
          w: 50,
          h: 50,
        }}
        src={app.icon}
      />
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
