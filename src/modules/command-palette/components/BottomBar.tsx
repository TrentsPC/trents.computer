import { useContext } from "solid-js";
import { CmdContext } from "../context";
import { Action } from "../types";

export type BottomBarProps = {
  actions: Action[];
};

export function BottomBar(props: { actions: Action[] }) {
  const { command } = useContext(CmdContext);

  return (
    <div css={{ display: "flex", px: 12 }}>
      {command()?.title || "Unknown"}
      <div css={{ flex: "1 0 0px" }} />
      {JSON.stringify(props.actions)}
    </div>
  );
}
