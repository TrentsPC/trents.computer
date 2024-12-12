import { For } from "solid-js";
import { Frame, FrameDragArea } from "~/modules/desktop-environment";
import "~/modules/zork";
import { useSquircle } from "~/utils/squircle";
import { MacOSWindowProps, TrafficLights } from "../base-windows/MacOSWindow";

const DEVICE_HEIGHT = 852;
const DEVICE_WIDTH = 393;
const TOOLBAR_HEIGHT = 52;

const height = DEVICE_HEIGHT + TOOLBAR_HEIGHT + 20;
const width = DEVICE_WIDTH;

export function SimulatorWindow(props: MacOSWindowProps) {
  return (
    <Frame initialHeight={height} initialWidth={width}>
      <FrameDragArea
        css={{ display: "flex", backgroundColor: "black", borderRadius: 10 }}
      >
        <div css={{ padding: 20 }}>
          <TrafficLights onClose={props.onClose} />
        </div>
        iPhone 16
      </FrameDragArea>
      <div css={{ height: 20 }} />

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
        <div
          css={{
            display: "grid",
            gridCols: 4,
            width: (60 + 30) * 4,
            mx: "auto",
          }}
        >
          <For each={[1, 2, 3, 4, 5, 6, 7, 8]}>
            {(i) => (
              <div>
                <div
                  ref={useSquircle()}
                  css={{
                    height: 60,
                    width: 60,
                    borderRadius: 60 * 0.225,
                    justifySelf: "center",
                    backgroundColor: "white",
                  }}
                ></div>
                <div css={{ height: 38 }}></div>
              </div>
            )}
          </For>
        </div>
        <div
          ref={useSquircle()}
          css={{
            backgroundColor: "white",
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            height: 98,
            borderRadius: 55 - 12,
          }}
        />
      </div>
    </Frame>
  );
}
