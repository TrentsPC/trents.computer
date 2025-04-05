import { JSX, Show } from "solid-js";
import { Frame, FrameDragArea } from "~/modules/desktop-environment";
import "~/modules/zork";
import { useSquircle } from "~/utils/squircle";
import {
  MacOSWindowProps,
  TrafficLights,
} from "../../base-windows/MacOSWindow";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger,
} from "../sonoma-ui/menubar";

const DEVICE_HEIGHT = 852;
const DEVICE_WIDTH = 393;
const TOOLBAR_HEIGHT = 52;

const height = DEVICE_HEIGHT + TOOLBAR_HEIGHT + 20;
const width = DEVICE_WIDTH;

export function SimulatorWindow(props: MacOSWindowProps) {
  return (
    <Frame
      initialHeight={height}
      initialWidth={width}
      onMouseDown={props.onMouseDown}
      style={props.style as JSX.CSSProperties}
    >
      <Show when={props.active}>
        <MenubarPortal>
          <MenubarMenu>
            <MenubarTrigger>Simulator</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onSelect={props.onClose}>Quit Simulator</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </MenubarPortal>
      </Show>
      <FrameDragArea
        css={{
          display: "flex",
          backgroundColor: "#202020",
          borderRadius: 10,
          color: "rgba(255, 255, 255, 0.85)",
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
          filter:
            "drop-shadow(0px 36px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.4))",
        }}
      >
        <div css={{ padding: 20 }}>
          <TrafficLights onClose={props.onClose} />
        </div>
        iPhone 16
      </FrameDragArea>
      <div css={{ height: 20 }} />

      <div
        css={{
          filter:
            "drop-shadow(0px 36px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.4))",
        }}
      >
        <div
          ref={useSquircle()}
          css={{
            backgroundColor: "black",
            borderRadius: 55,
            position: "relative",
          }}
          style={{
            width: DEVICE_WIDTH + "px",
            height: DEVICE_HEIGHT + "px",
          }}
        >
          <iframe
            css={{
              border: "none",
              width: "100%",
              height: "100%",
            }}
            src="/os/ios"
          />
        </div>
      </div>
    </Frame>
  );
}
