import { styled } from "@hypergood/css";
import { createQuery, queryOptions } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, For } from "solid-js";
import { everything } from "~/modules/nested-ts";
import document from "./document.png";
import folder from "./folder.png";

export const Route = createFileRoute("/nested")({
  component: Nested,
});

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

function Nested() {
  return (
    <div css={{ p: 10 }}>
      <ListItem thing={{ id: "universe", name: "Universe" }} path={[]} />
    </div>
  );
}

function ListItem(props: { thing: { id: string; name: string }; path: Path }) {
  const [open, setOpen] = createSignal(false);

  const query = createQuery(() =>
    listThingChildrenQuery(props.thing.id, props.path)
  );
  return (
    <>
      <ThingButton
        selected={open()}
        onClick={() => setOpen(!open())}
        thing={props.thing}
        path={props.path}
      />
      {open() && (
        <ListRoot>
          <For each={query.data}>
            {(thing, index) => (
              <ListItem thing={thing} path={[...props.path, index()]} />
            )}
          </For>
        </ListRoot>
      )}
    </>
  );
}

function ThingButton(props: {
  selected: boolean;
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
    <div
      onClick={props.onClick}
      css={{
        cursor: "pointer",
        height: 20,
        fontSize: 13,
        lineHeight: "16px",
        px: 15,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        "&:nth-child(even)": { background: "rgba(0, 0, 0, 0.05)" },
      }}
      style={{
        background: props.selected ? "#2962D9" : undefined,
        color: props.selected ? "white" : "black",
      }}
    >
      <img css={{ width: 18, height: 18, mr: 4 }} src={icon()} />

      <span css={{ whiteSpace: "nowrap" }}>{props.thing.name}</span>
    </div>
  );
}

const ListRoot = styled("ul", {
  pl: 20,
});
