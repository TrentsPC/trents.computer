import { getRouteApi } from "@tanstack/solid-router";
import { OS, OSRevealer } from "~/modules/os/OSRevealer";
import { GridItem } from "./components";

const route = getRouteApi("/");

export function MinimizeItem(props: Record<string, unknown>) {
  const search = route.useSearch();
  return (
    <GridItem {...props} css={{ height: 52, width: 92 }}>
      <OSRevealer alreadySeenOS={(search().os || "").split(",") as OS[]} />
    </GridItem>
  );
}
