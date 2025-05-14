import { createSignal, For, Show } from "solid-js";
import { Bot, Group, Message, useChatbots } from "~/modules/chatbots";
import { colors } from "~/theme.styles";
import { Body, Caption2, LargeTitle } from "../ui/typography";

const [conversations, setConversations] = useChatbots();
const [selectedGroupId, setSelectedGroupId] = createSignal(-1);

export default function MessageComponent() {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
      }}
    >
      {selectedGroupId() !== -1 ? <ChatWidget /> : <ConversationList />}
    </div>
  );
}

function ConversationList() {
  return (
    <div
      css={{
        pt: "var(--safe-area-inset-top)",
        pb: "var(--safe-area-inset-bottom)",
      }}
    >
      <LargeTitle css={{ fontWeight: 690, pt: 40, px: 20 }}>
        Messages
      </LargeTitle>
      <For each={conversations}>
        {(conversation, i) => (
          <button
            css={[
              {
                width: "100%",
                px: 20,
                textAlign: "left",
                position: "relative",
                // borderRadius: 8,
              },
              // selectedGroupId() === i() && {
              //   backgroundColor: "#F0F0F0",
              // },
            ]}
            onClick={() => setSelectedGroupId(i())}
          >
            <div
              css={{
                d: "flex",
                items: "center",
                textAlign: "left",
                fontScale: 0,
                height: 76,
                gap: 10,
              }}
            >
              <div
                css={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                  backgroundColor: colors.secondaryBackground,
                }}
              />
              <div css={{ flex: 1 }}>
                <Body css={{ fontWeight: 600 }}>{conversation.name}</Body>
                <Body
                  css={{
                    lineClamp: 1,
                    color: colors.secondaryLabel,
                  }}
                >
                  {
                    conversation.messages[conversation.messages.length - 1]
                      ?.text
                  }
                </Body>
              </div>
            </div>
            {/* <StateLayer /> */}
            {/* <StateLayer style={{ color: "var(--color-brand-vibrant)" }} /> */}
          </button>
        )}
      </For>
    </div>
  );
}

function ChatWidget() {
  const selectedGroup = () =>
    conversations[selectedGroupId()] as Group | undefined;

  return (
    <Show when={selectedGroup()}>
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
    </Show>
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
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        css={{
          pt: "var(--safe-area-inset-top)",
          bg: colors.secondaryBackground,
          color: colors.label,
          d: "flex",
          flexDirection: "column",
          items: "center",
          justify: "center",
          // h: 56,
          justifyContent: "center",
          px: 20,
          gap: 5,
          pb: 10,
          boxShadow: "0px 0.5px 0px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <div
          css={{
            width: 50,
            height: 50,
            backgroundColor: "black",
            borderRadius: 9999,
          }}
        />
        {/* <span>{props.name}</span> */}
        <Caption2 css={{ fontWeight: 500 }}>+1 (555) 564-8583</Caption2>
        <button
          css={{
            position: "absolute",
            top: "var(--safe-area-inset-top)",
            left: 20,
            color: colors.link,
          }}
          onClick={() => {
            setSelectedGroupId(-1);
          }}
        >
          Back
        </button>
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
      <div css={{ px: 20, pb: "var(--safe-area-inset-bottom)" }}>
        <input
          autofocus
          placeholder="Message"
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
            borderColor: colors.secondaryBackground,
            borderWidth: 1,
            borderStyle: "solid",
            height: 37,
            px: 16,
            fontSize: 17,
            fontFamily: "system-ui, serif",
            "::placeholder": {
              color: colors.tertiaryLabel,
              opacity: 1,
            },
          }}
        />
      </div>
    </div>
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
