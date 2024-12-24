import { styled } from "@hypergood/css";
import { createQuery, queryOptions } from "@tanstack/solid-query";
import { ComponentProps, createSignal, For } from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon } from "solid-radix-icons";
import { FrameDragArea } from "~/modules/desktop-environment";
import { everything } from "~/modules/nested-ts";
import { MacOSWindow, MacOSWindowProps } from "../base-windows/MacOSWindow";
import document from "./document.png";
import folder from "./folder.png";

type Path = number[];

const listThingChildrenQuery = (thingId: string, path: Path) =>
  queryOptions({
    queryKey: ["nested", "children", { thingId, path }],
    staleTime: Infinity,
    queryFn: async () => {
      const thing = everything.find((t) => t.id === thingId);
      if (!thing) {
        return [];
      }
      const childrenIds = thing
        .getChildren()
        .flat()
        .filter(Boolean) as string[];

      const children = childrenIds
        .map((id) => {
          const thing = everything.find((t) => t.id === id);

          if (!thing) {
            return undefined;
          }

          return {
            id,
            name: thing.getName(),
          };
        })
        .filter(Boolean);

      return children as Array<{ id: string; name: string }>;
    },
  });

export function FinderWindow(props: MacOSWindowProps) {
  const [historyStack, setHistoryStack] = createSignal<
    Array<{
      id: string;
      name: string;
      path: Path;
    }>
  >([
    {
      id: "universe",
      name: "Universe",
      path: [0],
    },
  ]);
  const currentHistory = () => historyStack()[historyStack().length - 1];

  function pushState(state: { id: string; name: string; path: Path }) {
    setHistoryStack((stack) => [...stack, state]);
  }
  function popState() {
    setHistoryStack((stack) => stack.slice(0, -1));
  }
  const canGoBack = () => historyStack().length > 1;

  const childrenQuery = createQuery(() =>
    listThingChildrenQuery(currentHistory().id, currentHistory().path)
  );

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
          <FrameDragArea css={{ w: "100%", h: 20 + 12 + 20 }} />
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
          <FrameDragArea
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
          </FrameDragArea>
          <div css={{ d: "flex", flexWrap: "wrap", p: 10 }}>
            <For each={childrenQuery.data}>
              {(thing, i) => (
                <ThingButton
                  thing={thing}
                  path={currentHistory().path}
                  onClick={() => {
                    pushState({
                      id: thing.id,
                      name: thing.name,
                      path: [...currentHistory().path, i()],
                    });
                  }}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </MacOSWindow>
  );
}

function ThingButton(props: {
  onClick: () => void;
  thing: { id: string; name: string };
  path: Path;
}) {
  const query = createQuery(() =>
    listThingChildrenQuery(props.thing.id, props.path)
  );
  const hasChildren = () => !!query.data && query.data?.length > 0;
  const icon = () => (hasChildren() ? folder : document);

  return (
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
        hasChildren() && props.onClick();
      }}
    >
      <img src={icon()} css={{ w: 64 }} />
      {props.thing.name}
    </button>
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
