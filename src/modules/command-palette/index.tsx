import { styled } from "@hypergood/css";
import { isHotkey } from "is-hotkey";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { RootSearch } from "./commands/root-search";
import { CmdContext } from "./context";
import { Command } from "./types";

export function CommandPalette() {
  const [open, setOpen] = createSignal(false);
  const [stack, setStack] = createSignal<Command[]>([]);

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isHotkey("mod+k", event) && !open()) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <CmdContext.Provider
      value={{
        close: () => setOpen(false),
        pop: () => {
          let next = [...stack()];
          next.pop();
          setStack(next);
        },
        popToRoot: () => setStack([]),
        push: (cmd) => setStack([...stack(), cmd]),
        command: () => stack().at(-1),
        canGoBack: () => !!stack().length,
      }}
    >
      <Show when={open()}>
        <Portal>
          <DialogOverlay>
            <div
              css={{
                flex: "1 0 0px",
              }}
            />
            <DialogContent>
              <RootSearch />
            </DialogContent>
            <div
              css={{
                flex: "3 0 0px",
              }}
            />
          </DialogOverlay>
        </Portal>
      </Show>
    </CmdContext.Provider>
  );
}

const DialogOverlay = styled("div", {
  position: "fixed",
  top: 0,
  bottom: 0,
  width: 750,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2147483647,
  pointerEvents: "none",
});

const DialogContent = styled("div", {
  backgroundColor: "rgba(221, 221, 221, 0.60)",
  height: 474,
  width: 750,
  backdropFilter: "blur(30px)",
  borderRadius: 16,
  boxShadow: "0 38px 90px rgba(0,0,0,0.45), 0 0px 1.5px rgba(0,0,0,0.33)",
  pointerEvents: "auto",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  fontFamily: "system-ui, serif",
});
