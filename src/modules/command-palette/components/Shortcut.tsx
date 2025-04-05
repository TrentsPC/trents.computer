import { Show } from "solid-js";
import { Action, Shortcut as ShortcutType } from "../types";
import { Kbd } from "./Kbd";

export type BottomBarProps = {
  actions: Action[];
};

export function Shortcut(props: { shortcut: ShortcutType }) {
  return (
    <div css={{ display: "inline-flex", gap: 4 }}>
      <Show when={props.shortcut.modifiers.includes("option")}>
        <Kbd key={"Alt"} />
      </Show>
      <Show when={props.shortcut.modifiers.includes("shift")}>
        <Kbd key={"Shift"} />
      </Show>
      <Show when={props.shortcut.modifiers.includes("mod")}>
        <Kbd key={"Mod"} />
      </Show>
      <Kbd key={props.shortcut.key} />
    </div>
  );
}
