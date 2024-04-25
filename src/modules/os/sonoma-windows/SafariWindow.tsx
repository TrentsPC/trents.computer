import { ComponentProps } from "solid-js";
import { Rect, WindowDragArea, WindowOptions } from "~/modules/window";
import { MacOSWindow } from "../base-windows/MacOSWindow";

export function SafariWindow(
  props: ComponentProps<"div"> & {
    initialRect?: Rect;
    options?: WindowOptions;
    onClose?: () => void;
  }
) {
  return (
    <MacOSWindow {...props}>
      <div
        css={{
          d: "flex",
          flexDir: "column",
          bg: "white",
          h: "100%",
          w: "100%",
        }}
      >
        <WindowDragArea css={{ h: 20 + 12 + 20, d: "flex" }}>
          <div css={{ w: 12 * 3 + 8 * 2 + 20 }} />
          <div css={{ flex: 1, d: "flex", justify: "center", items: "center" }}>
            <div css={{ flex: "1 0 0px" }} />
            <div
              css={{
                h: 28,
                borderRadius: 6,
                backgroundColor: "#D8D8D8",
                flex: "2 0 0px",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 390,
                lineHeight: "28px",
              }}
            >
              wwwwwww.trents.computer
            </div>
            <div css={{ flex: "1 0 0px" }} />
          </div>
          <div css={{ w: 12 * 3 + 8 * 2 + 20 }} />
        </WindowDragArea>
        <iframe
          src={window.origin + "?os=sonoma#" + new Date().toISOString()}
          css={{ flex: "1 0 0px" }}
        />
      </div>
    </MacOSWindow>
  );
}
