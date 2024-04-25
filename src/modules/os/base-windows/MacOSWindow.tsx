import { ComponentProps, splitProps } from "solid-js";
import { Rect, Window, WindowOptions } from "~/modules/window";
import { useSquircle } from "~/utils/squircle";

export function MacOSWindow(
  props: ComponentProps<"div"> & {
    initialRect?: Rect;
    options?: WindowOptions;
    trafficLights?: number;
    onClose?: () => void;
  }
) {
  const [, other] = splitProps(props, [
    "initialRect",
    "options",
    "onClose",
    "style",
    "children",
  ]);
  return (
    <Window
      initialRect={props.initialRect}
      options={props.options}
      style={props.style}
    >
      <div
        css={{
          w: "100%",
          h: "100%",
          fontFamily: "ui-sans-serif, SF Pro Text, sans-serif",
          filter: `drop-shadow(0px 36px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.25))`,
        }}
        {...other}
      >
        <div
          css={{
            d: "flex",
            flexDir: "column",
            w: "100%",
            h: "100%",
            borderRadius: 10,
            boxShadow: `inset 0 0 1.5px rgba(255, 255, 255, 0.1)`,
            overflow: "hidden",
          }}
          ref={useSquircle()}
        >
          <div
            css={{
              position: "absolute",
              padding: 20,
            }}
            style={{
              padding: props.trafficLights
                ? props.trafficLights + "px"
                : undefined,
            }}
          >
            <div
              css={{
                d: "flex",
                gap: 8,
              }}
            >
              <button
                onClick={props.onClose}
                css={{
                  w: 12,
                  h: 12,
                  r: 6,
                  bg: "#FF5F57",
                  boxShadow: "inset 0 0 0 0.5px rgba(0, 0, 0, 0.2)",
                  cursor: "default",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  css={{ d: "none", ":hover > * > &": { d: "block" } }}
                >
                  <path
                    d="M 17.6569 8.4645 L 8.4645 17.6569 A 1 1 135 0 1 6.3431 15.5355 L 15.5355 6.3431 A 1 1 135 0 1 17.6569 8.4645 Z M 8.4645 6.3431 L 17.6569 15.5355 A 1 1 45 0 1 15.5355 17.6569 L 6.3431 8.4645 A 1 1 45 0 1 8.4645 6.3431 Z"
                    fill="rgba(0,0,0,0.45)"
                  />
                </svg>
              </button>
              <button
                onClick={props.onClose}
                css={{
                  w: 12,
                  h: 12,
                  r: 6,
                  bg: "#FEBC2E",
                  boxShadow: "inset 0 0 0 0.5px rgba(0, 0, 0, 0.2)",
                  cursor: "default",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  css={{ d: "none", ":hover > * > &": { d: "block" } }}
                >
                  <path
                    d="M 5.5 10.5 L 18.5 10.5 A 1 1 0 0 1 18.5 13.5 L 5.5 13.5 A 1 1 0 0 1 5.5 10.5 Z"
                    fill="rgba(0,0,0,0.45)"
                  />
                </svg>
              </button>
              <button
                onClick={props.onClose}
                css={{
                  w: 12,
                  h: 12,
                  r: 6,
                  bg: "#28C840",
                  boxShadow: "inset 0 0 0 0.5px rgba(0, 0, 0, 0.2)",
                  cursor: "default",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  css={{ d: "none", ":hover > * > &": { d: "block" } }}
                >
                  <path
                    d="M 13.5 5.5 L 13.5 18.5 A 1 1 90 0 1 10.5 18.5 L 10.5 5.5 A 1 1 90 0 1 13.5 5.5 Z M 5.5 10.5 L 18.5 10.5 A 1 1 0 0 1 18.5 13.5 L 5.5 13.5 A 1 1 0 0 1 5.5 10.5 Z"
                    fill="rgba(0,0,0,0.45)"
                  />
                </svg>
              </button>
            </div>
          </div>

          {props.children}
        </div>
      </div>
    </Window>
  );
}
