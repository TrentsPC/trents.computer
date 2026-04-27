import { FooterText } from "../FooterText";
import { GridItem } from "./components";

export function FooterTextItem(props: Record<string, unknown>) {
  return (
    <GridItem {...props} component="div" css={{ px: 16, py: 0, justifyContent: "flex-start" }}>
      <FooterText />
    </GridItem>
  );
}
