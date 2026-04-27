import fuzzysort from "fuzzysort";
import { createMemo, createSignal, For, useContext } from "solid-js";
import { CmdContext } from "../context";
import { Action } from "../types";
import { addDefaultShortcuts, findIntendedAction } from "../utils";
import { BottomBar } from "./BottomBar";

export type ListProps = {
  isLoading?: boolean;
  searchText?: string;
  onSearchTextChange?: (searchText: string) => void;
  searchBarPlaceholder?: string;
  content: ListItem[];
};
export type ListItem = {
  title: string;
  actions: Action[];
};

function sortListItems(listItems: ListItem[], query: string) {
  if (!query.trim()) return listItems;
  const search = fuzzysort.go(query, listItems, { keys: ["title"] });
  return search.map((result) => result.obj);
}

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(x, max));

export function List(props: ListProps) {
  const { canGoBack, close, pop } = useContext(CmdContext);

  const [localSearchText, setLocalSearchText] = createSignal(props.searchText || "");
  const searchText = () => props.searchText ?? localSearchText();
  const setSearchText = (txt: string) =>
    props.onSearchTextChange ? props.onSearchTextChange(txt) : setLocalSearchText(txt);

  const sortedListItems = createMemo(() => sortListItems(props.content, searchText()));

  const [selectedIndex, _setSelectedIndex] = createSignal(0);
  function setSelectedIndex(index: number) {
    _setSelectedIndex(clamp(index, 0, sortedListItems().length - 1));
  }

  const selectedListItem = () => sortedListItems()[selectedIndex()] as ListItem | undefined;

  const selectedActions = () => addDefaultShortcuts(selectedListItem()?.actions || []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (canGoBack()) {
        pop();
      } else {
        close();
      }
      e.preventDefault();
      return;
    }
    const action = findIntendedAction(e, selectedActions());
    if (action) {
      action.onAction?.();
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex(selectedIndex() + 1);
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex(selectedIndex() - 1);
      e.preventDefault();
      return;
    }
    setSelectedIndex(0);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <input
        value={searchText()}
        onInput={(e) => setSearchText(e.currentTarget.value)}
        css={{
          height: 56,
          width: "100%",
          minWidth: 0,
        }}
        ref={(el) => {
          if (!el) return;
          setTimeout(() => el.focus(), 1);
          el.focus();
        }}
        autofocus
        onKeyDown={handleKeyDown}
      />
      <div css={{ flex: "1 0 0px", overflow: "auto", padding: 8 }}>
        <For each={sortedListItems()}>
          {(listItem, index) => (
            <button
              css={{
                width: "100%",
                display: "flex",
                height: 40,
                alignItems: "center",
                fontSize: 14,
                px: 8,
                borderRadius: 8,
              }}
              style={{
                "background-color":
                  selectedIndex() === index() ? "rgba(0,0,0,0.05)" : "transparent",
              }}
            >
              {listItem.title}
            </button>
          )}
        </For>
      </div>
      <BottomBar actions={selectedActions()} />
    </div>
  );
}
