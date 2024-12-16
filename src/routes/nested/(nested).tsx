import { createQuery, queryOptions } from "@tanstack/solid-query";
import { createSignal, For } from "solid-js";
import { everything } from "~/modules/nested-ts";

type Path = number[];

const listDirectoriesQuery = (thingId: string, path: Path) =>
  queryOptions({
    queryKey: ["nested", "directories", { thingId, path }],
    queryFn: async () => {
      const thing = everything.find((t) => t.id === thingId);
      if (!thing) {
        return [];
      }
      const childrenIds = thing.getChildren().filter(Boolean) as string[];

      return childrenIds.map((id) => {
        const thing = everything.find((t) => t.id === id)!;

        return {
          id,
          name: thing.getName(),
        };
      });
    },
  });

export default function Nested() {
  return (
    <div>
      <h1>Nested</h1>
      <div css={{ display: "flex" }}>
        <Column path={[]} thingId="carbon" />
      </div>
    </div>
  );
}

function Column(props: { path: Path; thingId: string }) {
  const [selectedIndex, setSelectedIndex] = createSignal<number | undefined>(
    undefined
  );
  const query = createQuery(() =>
    listDirectoriesQuery(props.thingId, props.path)
  );

  const selectedThingId = () =>
    selectedIndex() != null ? query.data?.[selectedIndex()!]?.id : undefined;
  return (
    <>
      <div
        css={{ px: 10, borderRight: "1px solid rgba(0, 0, 0, 0.1)", minW: 150 }}
      >
        <For each={query.data}>
          {(thing, index) => (
            <div
              onClick={() => setSelectedIndex(index())}
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
                background: selectedIndex() === index() ? "#2962D9" : undefined,
                color: selectedIndex() === index() ? "white" : "black",
              }}
            >
              {thing.name}
            </div>
          )}
        </For>
      </div>

      {selectedThingId() && (
        <Column
          path={[...props.path, selectedIndex()!]}
          thingId={selectedThingId()!}
        />
      )}
    </>
  );
}
