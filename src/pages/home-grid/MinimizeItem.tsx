import { useSearchParams } from "@solidjs/router";
import { OS, OSRevealer } from "~/modules/os/OSRevealer";
import { GridItem } from "./components";

export function MinimizeItem(props: Record<string, unknown>) {
  const [search] = useSearchParams<{ os: string }>();
  return (
    <GridItem {...props} css={{ height: 52, width: 92 }}>
      <OSRevealer alreadySeenOS={(search.os || "").split(",") as OS[]} />
    </GridItem>
  );
}
