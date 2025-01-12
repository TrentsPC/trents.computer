import { ComponentProps, createMemo, createSignal, For, Show } from "solid-js";
import { useSquircle } from "~/utils/squircle";
import noIcon from "./ios-apps/app-icons/no-icon.png";
import background from "./ios-apps/ios-background.jpg";
import { SAFARI } from "./ios-apps/safari";
import { FakeIOSApplication } from "./ios-apps/types";

const APPLICATIONS: FakeIOSApplication[] = [
  SAFARI,
  {
    id: "com.apple.Empty",
    name: "",
    iconSrc: noIcon,
    component: () => <div></div>,
  },
];

export function FakeIOS() {
  if (document?.body) {
    document.body.style.overflow = "hidden";
  }

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
        position: "fixed",
        top: 0,
        left: 0,
        w: "100%",
        h: "100%",
        minH: "100%",
        maxH: "100%",
        fontFamily: "system-ui",
        backgroundColor: "white",
      }}
    >
      <Show
        when={currentApp()}
        fallback={<HomeScreen onAppClick={setCurrentAppId} />}
      >
        <Component />
        <HomeIndicator onClick={() => setCurrentAppId(undefined)} />
      </Show>
      <DynamicIsland />
    </div>
  );
}

function HomeScreen({ onAppClick }: { onAppClick: (id: string) => void }) {
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
          px: `calc((100vw - ${60 * 4}px) / 10)`,
          width: "100%",
        }}
      >
        <AppButton
          appId="com.apple.Safari"
          onClick={() => onAppClick("com.apple.Safari")}
        />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
        <AppButton appId="com.apple.Empty" onClick={() => {}} />
      </div>
      <div
        ref={useSquircle()}
        css={{
          backgroundColor: "rgba(191, 191, 191, 0.44)",
          backdropFilter: "blur(50px)",
          position: "absolute",
          bottom: 12,
          left: 12,
          right: 12,
          height: 98,
          borderRadius: 55 - 12,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          css={{
            display: "grid",
            gridCols: 4,
            mx: "auto",
            px: `calc((100vw - ${60 * 4}px) / 10 - 12px)`,
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
