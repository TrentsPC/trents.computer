import { styled } from "@hypergood/css";
import { ComponentProps, createSignal, For } from "solid-js";
import { Bot, Group, Message, useChatbots } from "~/modules/chatbots";
import { FrameDragArea } from "~/modules/desktop-environment";
import { colors } from "~/theme.styles";
import { MacOSWindow, MacOSWindowProps } from "../../base-windows/MacOSWindow";
import { useMenuBar, useOSContext } from "../provider";

const [conversations, setConversations] = useChatbots();

export function MessagesWindow(props: MacOSWindowProps) {
  const [selectedGroupId, setSelectedGroupId] = createSignal(0);
  const selectedGroup = () =>
    conversations[selectedGroupId()] as Group | undefined;

  const { closeApplication } = useOSContext();

  useMenuBar("messages", () => [
    {
      title: "Messages",
      items: [
        {
          label: "Quit Messages",
          action: () => {
            closeApplication("messages");
          },
        },
      ],
    },
  ]);
  return (
    <MacOSWindow
      initialWidth={1024}
      initialHeight={820}
      minWidth={660}
      minHeight={320}
      applicationId="messages"
    >
      <div
        css={{
          d: "flex",
          h: "100%",
          w: "100%",
        }}
      >
        <div
          css={{
            w: 320,
            backgroundColor: "rgba(246, 246, 246, 0.84)",
            backgroundImage:
              "linear-gradient(to left, #0000000D, #00000000 5px)",
          }}
        >
          <FrameDragArea css={{ w: "100%", h: 20 + 12 + 20 }} />
          <SidebarList>
            <SidebarGroup>
              <For each={conversations}>
                {(conversation, i) => (
                  <SidebarItem
                    active={selectedGroupId() === i()}
                    onClick={() => {
                      setSelectedGroupId(i());
                    }}
                  >
                    {conversation.name}
                    <br />
                    <p
                      css={{
                        lineClamp: 1,
                        opacity: 0.8,
                        fontWeight: 400,
                      }}
                    >
                      {
                        conversation.messages[conversation.messages.length - 1]
                          ?.text
                      }
                    </p>
                  </SidebarItem>
                )}
              </For>
            </SidebarGroup>
          </SidebarList>
        </div>
        <div css={{ backgroundColor: "#c8c8c8" }} />
        <div
          css={{
            flex: "1 0 0px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FrameDragArea
            css={{
              w: "100%",
              h: 20 + 12 + 20,
              display: "flex",
              alignItems: "center",
              px: 20,
              fontSize: 15,
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            {/* <button
              css={[{ w: 27, h: 20 }, !canGoBack() && { opacity: 0.5 }]}
              onClick={() => canGoBack() && popState()}
            >
              <ChevronLeftIcon />
            </button>
            <button css={{ w: 27, h: 20, opacity: 0.5 }}>
              <ChevronRightIcon />
            </button> */}
            <span>{selectedGroup()?.name}</span>
          </FrameDragArea>
          {/* <div css={{ flex: "1 0 0px" }}> */}
          {selectedGroup() && (
            <Conversation
              getBot={selectedGroup()?.getBot!}
              name={selectedGroup()?.name || ""}
              messages={selectedGroup()?.messages || []}
              onMessage={(message) => {
                setConversations(selectedGroupId(), "messages", [
                  ...(selectedGroup()?.messages || []),
                  message,
                ]);
              }}
            />
          )}
          {/* </div> */}
        </div>
      </div>
    </MacOSWindow>
  );
}

const SidebarList = styled("div", {
  spaceY: 9,
  px: 10,
  // mt: -9,
});
const SidebarGroup = styled("div", {});

function SidebarItem(props: ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      {...props}
      css={[
        {
          width: "100%",
          textAlign: "left",
          px: 10,
          py: 5,
          fontWeight: 500,
          gap: 2,
          height: 65,
          color: "rgba(0, 0, 0, 0.85)",
          fontSize: 13,
          borderRadius: 6,
        },
        props.active && {
          "background-color": "#007AFF",
          color: "white",
        },
      ]}
    >
      {props.children}
    </button>
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
