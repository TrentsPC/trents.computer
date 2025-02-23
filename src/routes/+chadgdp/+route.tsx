import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, For } from "solid-js";
import { StateLayer } from "~/components/ui/StateLayer";
import { Bot, Group, Message, useChatbots } from "~/modules/chatbots";
import { colors } from "~/theme.styles";

export const Route = createFileRoute("/chadgdp")({
  component: ChatWidget,
});

const [conversations, setConversations] = useChatbots();

function ChatWidget() {
  const [selectedGroupId, setSelectedGroupId] = createSignal(0);
  const selectedGroup = () =>
    conversations[selectedGroupId()] as Group | undefined;

  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 16,
        gap: 16,
        backgroundColor: "#F5F5F5",
      }}
    >
      <div>
        <a
          href="/"
          css={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            position: "relative",
          }}
        >
          <svg
            viewBox="6 6 24 24"
            fill="currentColor"
            width="16"
            height="16"
            css={{
              color: colors.label,
              transform: "rotate(180deg)",
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.116 27.134a1.25 1.25 0 0 1 0-1.768l7.19-7.19a.25.25 0 0 0 0-.353l-7.19-7.19a1.25 1.25 0 0 1 1.768-1.767l8.25 8.25a1.25 1.25 0 0 1 0 1.768l-8.25 8.25a1.25 1.25 0 0 1-1.768 0z"
            ></path>
          </svg>
          <StateLayer />
        </a>
      </div>
      <div
        css={{
          flex: "2 0 0px",
          background: "#ffffff",
          boxShadow: "0px 0px 8px rgba(52, 72, 84, .05)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          css={{
            // bg: colors.gray3,
            color: colors.label,
            d: "flex",
            items: "center",
            // justify: "center",
            h: 56,
            fontSize: 24,
            textAlign: "left",
            px: 16,
            fontWeight: 500,
          }}
        >
          ChadGDP
        </div>
        <div
          css={{
            px: 6,
          }}
        >
          <For each={conversations}>
            {(conversation, i) => (
              <button
                css={[
                  {
                    width: "100%",
                    p: 10,
                    textAlign: "left",
                    position: "relative",
                    borderRadius: 8,
                  },
                  selectedGroupId() === i() && {
                    backgroundColor: "#F0F0F0",
                  },
                ]}
                onClick={() => setSelectedGroupId(i())}
              >
                <div
                  css={{
                    d: "flex",
                    items: "center",
                    textAlign: "left",
                    fontScale: 0,
                    height: 48,
                  }}
                >
                  <div css={{ flex: 1 }}>
                    <p css={{ fontWeight: 500 }}>{conversation.name}</p>
                    <p
                      css={{
                        lineClamp: 1,
                        color: colors.secondaryLabel,
                      }}
                    >
                      {
                        conversation.messages[conversation.messages.length - 1]
                          ?.text
                      }
                    </p>
                  </div>
                </div>
                <StateLayer />
                {/* <StateLayer style={{ color: "var(--color-brand-vibrant)" }} /> */}
              </button>
            )}
          </For>
        </div>
      </div>
      <div
        css={{
          flex: "5 0 0px",
          flexDirection: "column",
          display: "flex",
          background: "#ffffff",
          boxShadow: "0px 0px 8px rgba(52, 72, 84, .05)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {selectedGroup() && (
          <Conversation
            getBot={selectedGroup()?.getBot!}
            name={selectedGroup()?.name || ""}
            messages={selectedGroup()?.messages || []}
            onBack={() => setSelectedGroupId(-1)}
            onMessage={(message) => {
              setConversations(selectedGroupId(), "messages", [
                ...(selectedGroup()?.messages || []),
                message,
              ]);
            }}
          />
        )}
      </div>
    </div>
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
          // bg: colors.gray3,
          color: colors.label,
          d: "flex",
          items: "center",
          justify: "center",
          h: 56,
          justifyContent: "center",
          px: 8,
        }}
      >
        <span>{props.name}</span>
      </div>
      <div
        css={{ flex: "1 0 0px", overflowY: "auto", py: 16, spaceY: 12 }}
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
          placeholder="Message ChadGDP"
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
