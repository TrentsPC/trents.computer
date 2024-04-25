import { Match, Switch } from "solid-js";
import { RevealSonoma } from "./revealers/RevealSonoma";
import { RevealWin98 } from "./revealers/RevealWin98";

export type OS = "sonoma" | "win98";

export function OSRevealer(props: { alreadySeenOS?: OS[] }) {
  function getOSToReveal(): OS {
    if (props.alreadySeenOS?.includes("sonoma")) {
      return "win98";
    }
    return "sonoma";
  }
  const osToReveal = () => getOSToReveal();
  return (
    <Switch>
      <Match when={osToReveal() === "sonoma"}>
        <RevealSonoma />
      </Match>
      <Match when={osToReveal() === "win98"}>
        <RevealWin98 />
      </Match>
    </Switch>
  );
}
