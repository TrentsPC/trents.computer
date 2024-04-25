import { styled } from "@hypergood/css";
import { ComponentProps, createSignal, For } from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon } from "solid-radix-icons";
import { getChildren, getLeafs } from "~/modules/nested";
import { Rect, WindowDragArea, WindowOptions } from "~/modules/window";
import document from "../app-icons/document.png";
import folder from "../app-icons/folder.png";
import { MacOSWindow } from "../base-windows/MacOSWindow";

export function FinderWindow(
  props: ComponentProps<"div"> & {
    initialRect?: Rect;
    options?: WindowOptions;
    onClose?: () => void;
  }
) {
  const [historyStack, setHistoryStack] = createSignal<
    Array<{
      id: string;
      name: string;
      path: string;
    }>
  >([
    {
      id: "universe",
      name: "Universe",
      path: "0",
    },
  ]);
  const currentHistory = () => historyStack()[historyStack().length - 1];

  function pushState(state: { id: string; name: string; path: string }) {
    setHistoryStack((stack) => [...stack, state]);
  }
  function popState() {
    setHistoryStack((stack) => stack.slice(0, -1));
  }
  const canGoBack = () => historyStack().length > 1;

  return (
    <MacOSWindow {...props}>
      <div
        css={{
          d: "flex",
          h: "100%",
          w: "100%",
        }}
      >
        <div
          css={{
            w: 149,
            backgroundColor: "rgba(246, 246, 246, 0.84)",
            backgroundImage:
              "linear-gradient(to left, #0000000D, #00000000 5px)",
          }}
        >
          <WindowDragArea css={{ w: "100%", h: 20 + 12 + 20 }} />
          <SidebarList>
            <SidebarGroup>
              <SectionHeader>Favourites</SectionHeader>
              <SidebarItem>Universe</SidebarItem>
              {/* <SidebarItem>Applications</SidebarItem>
              <SidebarItem>Desktop</SidebarItem>
              <SidebarItem>Documents</SidebarItem>
              <SidebarItem>Downloads</SidebarItem> */}
            </SidebarGroup>
          </SidebarList>
        </div>
        <div css={{ backgroundColor: "rgba(0, 0, 0, 0.18)" }} />
        <div css={{ flex: "1 0 0px", backgroundColor: "#fff" }}>
          <WindowDragArea
            css={{
              w: "100%",
              h: 20 + 12 + 20,
              display: "flex",
              alignItems: "center",
              px: 20,
              fontSize: 15,
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            <button
              css={[{ w: 27, h: 20 }, !canGoBack() && { opacity: 0.5 }]}
              onClick={() => canGoBack() && popState()}
            >
              <ChevronLeftIcon />
            </button>
            <button css={{ w: 27, h: 20, opacity: 0.5 }}>
              <ChevronRightIcon />
            </button>
            <span>{currentHistory().name}</span>
          </WindowDragArea>
          <div css={{ d: "flex", flexWrap: "wrap", p: 10 }}>
            <For each={getChildren(currentHistory().id, currentHistory().path)}>
              {(thing, i) => (
                <button
                  css={{
                    w: 220 / 2,
                    h: 224 / 2,
                    color: "rgba(0, 0, 0, 0.85)",
                    fontSize: 12,
                    lineHeight: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    pushState({
                      id: thing.id,
                      name: thing.name,
                      path: `${currentHistory().path}.${i()}`,
                    });
                  }}
                >
                  <img src={folder} css={{ w: 64 }} />
                  {thing.name}
                </button>
              )}
            </For>
            <For each={getLeafs(currentHistory().id, currentHistory().path)}>
              {(thing, i) => (
                <button
                  css={{
                    w: 220 / 2,
                    h: 224 / 2,
                    color: "rgba(0, 0, 0, 0.85)",
                    fontSize: 12,
                    lineHeight: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img src={document} css={{ w: 64 }} />
                  {thing}
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
    </MacOSWindow>
  );
}

const SidebarList = styled("div", {
  spaceY: 9,
  px: 10,
  // mt: -9,
});
const SidebarGroup = styled("div", {});
const SectionHeader = styled("div", {
  pt: 3,
  pr: 12,
  pb: 6,
  pl: 8,
  fontSize: 11,
  fontWeight: 700,
  color: "rgba(0,0,0,0.25)",
});

function SidebarItem(props: ComponentProps<"div">) {
  return (
    <div
      css={{
        display: "flex",
        px: 8,
        gap: 2,
        height: 28,
        color: "rgba(0, 0, 0, 0.85)",
        fontSize: 13,
      }}
    >
      {props.children}
    </div>
  );
}
