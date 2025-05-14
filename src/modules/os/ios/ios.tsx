import { ComponentProps, createMemo, createSignal, For, Show } from "solid-js";
import { useSquircle } from "~/utils/squircle";
import { GAME_BOY } from "./apps/game-boy";
import { MESSAGES } from "./apps/messages";
import { SAFARI } from "./apps/safari";
import noIcon from "./icons/no-icon.png";
import background from "./ios-background.png";
import { FakeIOSApplication } from "./types";

const APPLICATIONS: FakeIOSApplication[] = [
  SAFARI,
  MESSAGES,
  GAME_BOY,
  {
    id: "com.apple.Empty",
    name: "",
    iconSrc: noIcon,
    component: () => <div></div>,
  },
];

export function FakeIOSGen3(props: { cornerRadius?: number }) {
  // if (document?.body) {
  //   document.body.style.overflow = "hidden";
  // }

  const [currentAppId, setCurrentAppId] = createSignal<string | undefined>(
    undefined
  );

  const currentApp = createMemo(() =>
    APPLICATIONS.find((a) => a.id === currentAppId())
  );

  const Component = () => currentApp()?.component?.({}) || null;

  return (
    <div
      css={{
        position: "relative",
        overflow: "hidden",

        w: "100%",
        h: "100%",
        minH: "100%",
        maxH: "100%",
        fontFamily: "system-ui",
        backgroundColor: "white",
      }}
      style={{
        "--safe-area-inset-top": "62px",
        "--safe-area-inset-right": "0px",
        "--safe-area-inset-bottom": "34px",
        "--safe-area-inset-left": "0px",
      }}
    >
      <Show
        when={currentApp()}
        fallback={
          <HomeScreen
            onAppClick={setCurrentAppId}
            cornerRadius={props.cornerRadius}
          />
        }
      >
        <Component />
        <HomeIndicator onClick={() => setCurrentAppId(undefined)} />
      </Show>
      <DynamicIsland />
    </div>
  );
}

function HomeScreen({
  onAppClick,
  cornerRadius,
}: {
  onAppClick: (id: string) => void;
  cornerRadius?: number;
}) {
  return (
    <>
      <img
        css={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={background}
      />
      {/* Status Bar */}
      <div css={{ minH: 54 }} />
      {/* Gap */}
      <div css={{ minH: 10 }} />
      <div
        css={{
          display: "grid",
          gridCols: 4,
          // width: (60 + 30) * 4,
          pt: 26,
          mx: "auto",
          px: `calc((100% - ${60 * 4}px) / 10)`,
          width: "100%",
        }}
      >
        <AppButton
          appId="com.apple.Safari"
          onClick={() => onAppClick("com.apple.Safari")}
        />
        <AppButton
          appId="com.apple.Messages"
          onClick={() => onAppClick("com.apple.Messages")}
        />
        <AppButton appId="game-boy" onClick={() => onAppClick("game-boy")} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
      </div>
      <div
        ref={useSquircle()}
        css={{
          backdropFilter: "blur(50px)",
          position: "absolute",
          bottom: 12,
          left: 12,
          right: 12,
          height: 98,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(191, 191, 191, 0.44)",
          // mixBlendMode: "luminosity",
        }}
        style={{
          "border-radius": `${(cornerRadius || 55) - 12}px`,
        }}
      >
        <div
          css={{
            display: "grid",
            gridCols: 4,
            mx: "auto",
            px: `calc((100% - ${60 * 4}px) / 10 - 12px)`,
            width: "100%",
          }}
        >
          <For each={[1, 2, 3, 4]}>
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
                >
                  <img
                    css={{ width: "100%", height: "100%" }}
                    src={
                      APPLICATIONS.find((a) => a.id === "com.apple.Empty")
                        ?.iconSrc || ""
                    }
                  />
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
}

function HomeIndicator(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      css={{
        height: 21,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        css={{
          width: 139,
          height: 5,
          borderRadius: 99,
          backgroundColor: "black",
        }}
      />
    </button>
  );
}

function AppButton({ appId, onClick }: { appId: string; onClick: () => void }) {
  const app = () => APPLICATIONS.find((a) => a.id === appId);
  return (
    <button
      onClick={onClick}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 4,
      }}
    >
      <div
        ref={useSquircle()}
        css={{
          height: 60,
          width: 60,
          borderRadius: 60 * 0.225,
          justifySelf: "center",
          backgroundColor: "white",
        }}
      >
        <img
          css={{ width: "100%", height: "100%" }}
          src={app()?.iconSrc || ""}
        />
      </div>
      <div
        css={{
          height: 38,
          color: "white",
          align: "center",
          fontWeight: 450,
          fontSize: 12,
          lineHeight: "14px",
          pt: 5,
        }}
      >
        <span>{app()?.name || ""}</span>
      </div>
    </button>
  );
}

function DynamicIsland() {
  return (
    <div
      css={{
        top: 11,
        height: 37,
        width: 125,
        backgroundColor: "black",
        position: "absolute",
        zIndex: 1,
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: 37,
      }}
    />
  );
}
