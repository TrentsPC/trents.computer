import { css } from "@hypergood/css";
import { ComponentProps } from "solid-js";
import { FrameDragArea, ResizableFrame } from "~/modules/desktop-environment";
import icon from "../win98-icons/internet-explorer-document-16x16.png";

export type Win98WindowProps = ComponentProps<"div"> & {
  minWidth?: number;
  minHeight?: number;
  initialWidth: number;
  initialHeight: number;
  maxWidth?: number;
  maxHeight?: number;
  onClose?: () => void;
};

export function Win98Window(props: Win98WindowProps) {
  return (
    <ResizableFrame
      initialWidth={props.initialWidth}
      initialHeight={props.initialHeight}
      minWidth={props.minWidth}
      minHeight={props.minHeight}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      <div
        css={{
          fontFamily: "ms_sans_serif",
          d: "flex",
          flexDir: "column",
          w: "100%",
          h: "100%",
          padding: 4 * 2,
          boxShadow: `inset -2px -2px #000, inset 2px 2px #dfdfdf, inset -4px -4px #808080, inset 4px 4px #ffffff`,
          overflow: "hidden",
          backgroundColor: "#c0c0c0",
        }}
      >
        <FrameDragArea
          css={{
            height: 18 * 2,
            mb: 1 * 2,
            px: 2 * 2,
            backgroundImage: "linear-gradient(to right, #220080, #3c84d0)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={icon}
            width={16 * 2}
            height={16 * 2}
            css={{ imageRendering: "pixelated" }}
          />
          <span
            css={{
              fontSize: 11 * 2,
              color: "white",
              fontWeight: 700,
              pl: 3 * 2,
            }}
          >
            Trents Computer - Internet Explorer
          </span>
          <div css={{ flex: "1 0 0px" }} />

          <button class={button} onClick={props.onClose}>
            <svg width="24px" height="20px" viewBox="0 0 12 10">
              <path d="M 2 7 L 8 7 L 8 9 L 2 9 Z" />
            </svg>
          </button>
          <button class={button} onClick={props.onClose}>
            <svg width="24px" height="20px" viewBox="0 0 12 10">
              <path d="M 1 0 L 10 0 L 10 9 L 1 9 Z M 9 2 L 2 2 L 2 8 L 9 8 Z" />
            </svg>
          </button>
          <div css={{ ml: 4 }} />
          <button class={button} onClick={props.onClose}>
            <svg width="24px" height="20px" viewBox="0 0 12 10">
              <path d="M 2 1 L 4 1 L 4 2 L 5 2 L 5 3 L 7 3 L 7 2 L 8 2 L 8 1 L 10 1 L 10 2 L 9 2 L 9 3 L 8 3 L 8 4 L 7 4 L 7 5 L 8 5 L 8 6 L 9 6 L 9 7 L 10 7 L 10 8 L 8 8 L 8 7 L 7 7 L 7 6 L 5 6 L 5 7 L 4 7 L 4 8 L 2 8 L 2 7 L 3 7 L 3 6 L 4 6 L 4 5 L 5 5 L 5 4 L 4 4 L 4 3 L 3 3 L 3 2 L 2 2 Z" />
            </svg>
          </button>
        </FrameDragArea>

        <div
          css={{
            flex: 1,
            padding: 2 * 2,
            boxShadow: `inset -2px -2px #fff, inset 2px 2px #808080, inset -4px -4px #dfdfdf, inset 4px 4px #000000`,
            backgroundColor: "#c0c0c0",
          }}
        >
          {props.children}
        </div>
      </div>
    </ResizableFrame>
  );
}

const button = css({
  background: "#c0c0c0",
  boxShadow: `inset -2px -2px #000, inset 2px 2px #dfdfdf, inset -4px -4px #808080, inset 4px 4px #ffffff`,
  width: 32,
  height: 28,
  margin: 0,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
