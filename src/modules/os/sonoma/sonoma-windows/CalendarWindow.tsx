import { FrameDragArea } from "~/modules/desktop-environment";
import { MacOSWindow, MacOSWindowProps } from "../../base-windows/MacOSWindow";

export function CalendarWindow(props: MacOSWindowProps) {
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
        <FrameDragArea css={{ h: 12 + 12 + 12 }} />
        <iframe
          src={window.origin + "/calendar" + "?" + new Date().toISOString()}
          css={{ flex: "1 0 0px" }}
        />
      </div>
    </MacOSWindow>
  );
}
