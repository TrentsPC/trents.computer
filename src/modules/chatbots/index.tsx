import {
  ArrowLeftIcon,
  ChatBubbleIcon,
  ChevronRightIcon,
} from "solid-radix-icons";
import { Bot } from "./types";
import { createStore } from "solid-js/store";
import { For, createSignal } from "solid-js";
import { StateLayer } from "~/components/ui/StateLayer";
import { colors, fonts } from "~/theme.styles";

type Message = {
  from: "user" | "bot";
  text: string;
  timestamp: number;
};

type Group = {
  name: string;
  messages: Message[];
  getBot: () => Promise<Bot>;
};

const [conversations, setConversations] = createStore<Group[]>([
  {
    name: "Clarence",
    messages: [],
    getBot: () => import("./bots/clarence-clarity").then((m) => m.bot),
  },
  {
    name: "Georgia",
    messages: [],
    getBot: () => import("./bots/jockstrap").then((m) => m.bot),
  },
  {
    name: "Patricia",
    messages: [],
    getBot: () => import("./bots/patricia-taxxon").then((m) => m.bot),
  },
]);

export function ChatWidget() {
  const [selectedIndex, setSelectedIndex] = createSignal(-1);
  const selectedGroup = () =>
    conversations[selectedIndex()] as Group | undefined;

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open())}
        css={{
          w: 48,
          h: 48,
          position: "fixed",
          right: 20,
          bottom: 20 + 12 + 20,
          bg: "var(--color-brand)",
          color: "white",
          d: "flex",
          items: "center",
          justify: "center",
          r: 24,
          filter:
            "drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)",
        }}
      >
        <ChatBubbleIcon width="30px" height="30px" />
      </button>
      {open() && (
        <div
          css={{
            position: "fixed",
            right: 20,
            bottom: 84 + 12 + 20,
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
            w: 400,
            h: 704,
            r: 16,
            d: "flex",
            flexDir: "column",
            overflow: "hidden",
            fontFamily: fonts.systemSans,
          }}
        >
          {selectedGroup() ? (
            <Conversation
              getBot={selectedGroup()?.getBot!}
              name={selectedGroup()?.name || ""}
              messages={selectedGroup()?.messages || []}
              onBack={() => setSelectedIndex(-1)}
              onMessage={(message) => {
                setConversations(selectedIndex(), "messages", [
                  ...(selectedGroup()?.messages || []),
                  message,
                ]);
              }}
            />
          ) : (
            <>
              <div
                css={{
                  bg: "var(--color-brand)",
                  color: "white",
                  d: "flex",
                  items: "center",
                  justify: "center",
                  h: 64,
                }}
              >
                Messages
              </div>
              <For each={conversations}>
                {(conversation, i) => (
                  <button
                    css={{
                      h: 74,
                      d: "flex",
                      items: "center",
                      px: 20,
                      textAlign: "left",
                      fontScale: 0,
                      position: "relative",
                    }}
                    onClick={() => setSelectedIndex(i())}
                  >
                    {i() !== 0 && (
                      <div
                        css={{
                          position: "absolute",
                          top: 0,
                          left: 20,
                          right: 20,
                          height: 1,
                          bg: colors.quaternaryLabel,
                        }}
                      />
                    )}
                    <div css={{ flex: 1 }}>
                      <p>{conversation.name}</p>
                      <p
                        css={{
                          lineClamp: 1,
                          color: colors.secondaryLabel,
                        }}
                      >
                        {
                          conversation.messages[
                            conversation.messages.length - 1
                          ]?.text
                        }
                      </p>
                    </div>
                    <ChevronRightIcon
                      css={{
                        color: "var(--color-brand)",
                      }}
                    />
                    <StateLayer
                      style={{ color: "var(--color-brand-vibrant)" }}
                    />
                  </button>
                )}
              </For>
            </>
          )}
        </div>
      )}
    </>
  );
}

function Conversation(props: {
  getBot: () => Promise<Bot>;
  name: string;
  messages: Message[];
  onMessage: (message: Message) => void;
  onBack?: () => void;
}) {
  const [value, setValue] = createSignal("");
  let scrollRef: HTMLDivElement = null!;
  return (
    <>
      <div
        css={{
          bg: "var(--color-brand)",
          color: "white",
          d: "flex",
          items: "center",
          justify: "center",
          h: 64,
          justifyContent: "space-between",
          px: 8,
        }}
      >
        <button
          onClick={props.onBack}
          css={{
            h: 48,
            w: 48,
            d: "flex",
            items: "center",
            justify: "center",
          }}
        >
          <ArrowLeftIcon />
        </button>
        <span>{props.name}</span>

        <div
          css={{
            h: 48,
            w: 48,
            d: "flex",
            items: "center",
            justify: "center",
          }}
        />
      </div>
      <div
        css={{ flex: 1, overflowY: "auto", py: 16, spaceY: 12 }}
        ref={scrollRef}
      >
        <For each={props.messages}>
          {(message) => (
            <div
              css={{
                d: "flex",
                px: 20,
              }}
              style={{
                "justify-content":
                  message.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                css={{
                  py: 8,
                  px: 12,
                  r: 18,
                  fontSize: 15,
                  whiteSpace: "pre-wrap",
                  lineHeight: "20px",
                }}
                style={{
                  background:
                    message.from === "user"
                      ? "var(--color-brand)"
                      : colors.secondaryBackground,
                  color: message.from === "user" ? "white" : "black",
                  "text-align": message.from === "user" ? "right" : "left",
                }}
              >
                {message.text}
              </div>
            </div>
          )}
        </For>
      </div>
      <div css={{ px: 20, py: 16 }}>
        <input
          autofocus
          value={value()}
          onInput={(e) => setValue(e.target.value)}
          onChange={async (e) => {
            props.onMessage({
              from: "user",
              text: e.target.value,
              timestamp: Date.now(),
            });
            setValue("");
            scrollRef.scrollTop = scrollRef.scrollHeight;
            const bot = await props.getBot();
            const botReply = bot.getNextMessage(e.target.value);
            if (botReply) {
              await sleep(500);
              props.onMessage({
                from: "bot",
                text: botReply,
                timestamp: Date.now(),
              });
              scrollRef.scrollTop = scrollRef.scrollHeight;
            }
          }}
          css={{
            minW: 0,
            w: "100%",
            r: 9999,
            bg: colors.secondaryBackground,
            py: 8,
            px: 16,
          }}
        />
      </div>
    </>
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
