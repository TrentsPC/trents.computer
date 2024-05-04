import { ComponentProps, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Rect, WindowDragArea, WindowOptions } from "~/modules/window";
import "~/modules/zork";
import { zork } from "~/modules/zork/zMachine";
import { fonts } from "~/theme.styles";
import { MacOSWindow } from "../base-windows/MacOSWindow";

type Message = { text: string; options: any; side: "left" | "right" };

function createMessages() {
  const [messages, setMessages] = createStore<Message[]>([]);

  function addMessage(message: Message) {
    setMessages(messages.length, message);
  }

  return [messages, addMessage] as const;
}

const [zorkMessages, addZorkMessage] = createMessages();
const [zorkLocation, setZorkLocation] = createSignal("");
zork.listen((text, options) => {
  addZorkMessage({ text, options, side: "left" });
});
zork.hudListen(({ location }) => {
  setZorkLocation(location);
});
zork.perform("LOOK");

export function TerminalWindow(
  props: ComponentProps<"div"> & {
    initialRect?: Rect;
    options?: WindowOptions;
    onClose?: () => void;
  }
) {
  return (
    <MacOSWindow {...props} trafficLights={8}>
      <div
        css={{
          d: "flex",
          flexDir: "column",
          w: "100%",
          h: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          boxShadow: "inset 0 0 1.5px rgba(255, 255, 255, 0.1)",
        }}
      >
        <WindowDragArea
          css={{
            h: 8 + 12 + 8,
            backgroundColor: "#FAFAFA",
            boxShadow: "0 0.5px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(0,0,0,0.85)",
          }}
        >
          Terminal
        </WindowDragArea>
        <div
          css={{
            fontFamily: fonts.mono,
            fontSize: 12,
            lineHeight: "16px",
            px: 4,
            pt: 4,
            whiteSpace: "pre-wrap",
          }}
        >
          <div
            css={{ backgroundColor: "white", color: "black", fontWeight: 700 }}
          >
            {" "}
            {zorkLocation()}
          </div>
        </div>
        <div
          css={{
            flex: "1 0 0px",
            fontFamily: fonts.mono,
            fontSize: 12,
            lineHeight: "16px",
            px: 4,
            pb: 4,
            whiteSpace: "pre-wrap",
            position: "relative",
            overflowY: "auto",
          }}
        >
          <div>
            <For each={zorkMessages}>
              {(message) => (
                <div>
                  {message.side === "right" ? "\n>" : ""}
                  {message.text}
                </div>
              )}
            </For>
          </div>
          <div css={{ display: "flex", mt: 16 }}>
            {">"}
            <input
              id="zork-input"
              css={{
                minWidth: 0,
                flex: "1 0 0px",
                backgroundColor: "transparent",
                "::selection": {
                  backgroundColor: "#00ffff",
                  color: "black",
                },
                ":focus": { outline: "none" },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addZorkMessage({
                    text: e.currentTarget.value,
                    options: {},
                    side: "right",
                  });
                  zork.go(e.currentTarget.value);
                  e.currentTarget.value = "";
                  e.currentTarget.scrollIntoView();
                }
              }}
            />
          </div>
          <label
            for="zork-input"
            css={{
              position: "absolute",
              inset: 8,
            }}
          />
        </div>
      </div>
    </MacOSWindow>
  );
}
