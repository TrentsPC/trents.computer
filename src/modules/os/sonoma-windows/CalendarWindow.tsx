import { ComponentProps } from "solid-js";
import { Rect, WindowDragArea, WindowOptions } from "~/modules/window";
import { MacOSWindow } from "../base-windows/MacOSWindow";

export function CalendarWindow(
  props: ComponentProps<"div"> & {
    initialRect?: Rect;
    options?: WindowOptions;
    onClose?: () => void;
  }
) {
  return (
    <MacOSWindow {...props} trafficLights={12}>
      <div
        css={{
          d: "flex",
          flexDir: "column",
          w: "100%",
          h: "100%",
          backgroundColor: "white",
        }}
      >
        <WindowDragArea css={{ h: 12 + 12 + 12 }} />
        <iframe
          src={window.origin + "/calendar" + "?" + new Date().toISOString()}
          css={{ flex: "1 0 0px" }}
        />
      </div>
    </MacOSWindow>
  );
}
