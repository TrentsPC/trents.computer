import { styled } from "@hypergood/css";
import { Menubar } from "@kobalte/core/menubar";
import {
  ComponentProps,
  createEffect,
  For,
  JSX,
  lazy,
  Show,
  splitProps,
  Suspense,
  useContext,
} from "solid-js";
// import wallpaper from "./wallpapers/macos/sonoma-light.png";
import wallpaper from "../wallpapers/windows7/harmony.jpg";

import finder from "./sonoma-icons/finder.png";
import messages from "./sonoma-icons/messages.png";
import safari from "./sonoma-icons/safari.png";
import simulator from "./sonoma-icons/simulator.png";

import { parse } from "csv/browser/esm";
import { Dynamic } from "solid-js/web";
import { ChevronRightIcon } from "solid-radix-icons";
import { Desktop } from "../../desktop-environment/desktop";
import { MenuBarItem, OSContext, OSContextProvider } from "./provider";
import trash from "./sonoma-icons/trash-empty.png";
import {
  MenubarContent,
  menubarId,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  OSMenu,
} from "./sonoma-ui/menubar";
import { Application } from "./types";

const APPLICATIONS: Application[] = [
  {
    id: "finder",
    name: "Finder",
    icon: finder,
    component: lazy(() =>
      import("./apps/finder.lazy").then((m) => ({
        default: m.FinderWindow,
      }))
    ),
  },
  {
    id: "messages",
    name: "Messages",
    icon: messages,
    component: lazy(() =>
      import("./apps/messages.lazy").then((m) => ({
        default: m.MessagesWindow,
      }))
    ),
  },
  {
    id: "safari",
    name: "Safari",
    icon: safari,
    component: lazy(() =>
      import("./apps/safari.lazy").then((m) => ({
        default: m.SafariWindow,
      }))
    ),
  },
  {
    id: "simulator",
    name: "Simulator",
    icon: simulator,
    component: lazy(() =>
      import("./apps/simulator.lazy").then((m) => ({
        default: m.SimulatorWindow,
      }))
    ),
  },
];

export function TrentOS() {
  return (
    <OSContextProvider>
      <TrentOSInner />
    </OSContextProvider>
  );
}

function TrentOSInner() {
  const { openedApplicationIds, bringToFront, closeApplication } =
    useContext(OSContext);
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
          // top: 66,
          top: 0,
          right: 0,
          bottom: 25 + 6 + 7,
          left: 0,
        }}
      >
        <For each={openedApplicationIds()}>
          {(window, i) => {
            const app = APPLICATIONS.find((a) => a.id === window);
            if (!app) {
              return null;
            }
            return (
              <Suspense fallback={null}>
                <Dynamic component={app.component} />
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
          {/* <DockItem id="terminal" /> */}
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
        {/* <DockSeparator /> */}
        {/* <DockGroup> */}
        {/* <DockItem src={folder} /> */}
        {/* <DockItem src={documentIcon} /> */}
        {/* <Trash /> */}
        {/* </DockGroup> */}
      </Dock>
      <MenuBar isEmpty={!openedApplicationIds().length} />
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
  const { openApplication } = useContext(OSContext);
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
      onClick={() => openApplication(app.id)}
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

function MenuBar(props: { isEmpty: boolean }) {
  const { menuBar } = useContext(OSContext);

  createEffect(() => console.log(menuBar()));
  return (
    <MenubarRoot>
      <div id={menubarId} css={{ display: "flex", height: "100%" }}>
        <Menubar css={{ display: "flex", height: "100%" }}>
          <OSMenu />
          <For each={menuBar()}>
            {(menu) => (
              <MenubarMenu>
                <MenubarTrigger>{menu.title}</MenubarTrigger>
                <MenubarContent>
                  <For each={menu.items}>
                    {(item) => <SmartMenubarItem item={item} />}
                  </For>
                </MenubarContent>
              </MenubarMenu>
            )}
          </For>
        </Menubar>
      </div>
      {/* <MenubarMenu>
        <MenubarTrigger>Sat 5 Apr 11:02 AM</MenubarTrigger>
      </MenubarMenu> */}
    </MenubarRoot>
  );
}

function SmartMenubarItem(props: { item: MenuBarItem }) {
  return (
    <Show
      when={props.item.submenu}
      fallback={
        <MenubarItem
          onSelect={() => {
            props.item.action?.();
          }}
        >
          {props.item.label}
        </MenubarItem>
      }
    >
      <MenubarSub overflowPadding={24 + 6 + 6} shift={-5}>
        <MenubarSubTrigger
          onSelect={() => {
            props.item.action?.();
          }}
        >
          {props.item.label}
          <ChevronRightIcon css={{ transform: "translateX(5px)" }} />
        </MenubarSubTrigger>
        <MenubarSubContent>
          <For each={props.item.submenu}>
            {(subitem) => <SmartMenubarItem item={subitem} />}
          </For>
        </MenubarSubContent>
      </MenubarSub>
    </Show>
  );
}

function MenubarClock() {
  // const [cards, setCards] = createSignal<Card[]>([]);
  // const q = useQuery(() => ({
  //   queryKey: ["world-cities"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/cities.csv");
  //     const text = await res.text();
  //     const data = await parseCsvAsync(text);
  //     return data;
  //   },
  // }));

  // onMount(() => {
  //   async function idk() {
  //     const res = await fetch("/api/cities.csv");
  //     const text = await res.text();
  //     const data = await parseCsvAsync(text);
  //     console.log(data);
  //   }
  //   idk();
  //   // setCards(data);
  // });
  return <MenubarTrigger>Sat 5 Apr 11:02 AM</MenubarTrigger>;
}

const parseCsvAsync = (text: string) => {
  return new Promise((resolve, reject) => {
    parse(
      text,
      {
        columns: true,
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const MenubarRoot = styled("div", {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 24 + 6 + 6,
  zIndex: 2147483647,
  backgroundColor: "rgba(0,0,0,0.18)",
  backdropFilter: "blur(50px)",
  px: 6 + 6,
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
});
