import { Show, useContext } from "solid-js";
import { CmdContext } from "../context";
import { Action } from "../types";
import { Shortcut } from "./Shortcut";

export type BottomBarProps = {
  actions: Action[];
};

export function BottomBar(props: { actions: Action[] }) {
  const { command } = useContext(CmdContext);
  const firstAction = () => props.actions[0];
  const hasMultipleActions = () => props.actions.length > 1;

  return (
    <div css={{ display: "flex", px: 12 }}>
      {/* {command()?.title || "Unknown"} */}
      <div css={{ flex: "1 0 0px" }} />
      <Show when={firstAction().shortcut}>
        {firstAction().title}
        <Shortcut shortcut={firstAction().shortcut!} />
      </Show>
    </div>
  );
}
