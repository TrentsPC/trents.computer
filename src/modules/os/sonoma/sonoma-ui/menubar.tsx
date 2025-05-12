import { Menubar, MenubarMenuProps } from "@kobalte/core/menubar";
import { ComponentProps, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { useSquircle } from "~/utils/squircle";

export const menubarId = "sonoma-menubar";

export function MenubarPortal(props: { children?: JSX.Element }) {
  return (
    <Portal mount={document.getElementById(menubarId)!}>
      <Menubar css={{ display: "flex", height: "100%" }}>
        <OSMenu />
        {props.children}
      </Menubar>
    </Portal>
  );
}

export function MenubarMenu(props: ComponentProps<typeof Menubar.Menu>) {
  return <Menubar.Menu gutter={0} shift={-6} overflowPadding={0} {...props} />;
}

function MenubarPixel() {
  return (
    <svg viewBox="0 0 2 2" width="13" height="13">
      <path fill="currentColor" d="M 1 0 L 0 1 L 1 2 L 2 1 Z" />
    </svg>
  );
}

export function MenubarTrigger(props: MenubarMenuProps) {
  return (
    <Menubar.Trigger
      {...props}
      css={{
        height: "100%",
        px: 9,
        borderRadius: 4,
        display: "flex",
        items: "center",
        color: "white",
        position: "relative",
        fontSize: 13,
        lineHeight: "16px",
        fontWeight: 500,
        outline: "none",
        "&:nth-of-type(2)": {
          fontWeight: 600,
        },
      }}
    >
      <span
        css={{
          filter: "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2))",
        }}
      >
        {props.children}
      </span>
      <span
        ref={useSquircle()}
        css={{
          position: "absolute",
          top: 6,
          height: 24,
          left: -6,
          right: -6,
          bottom: 0,
          borderRadius: 4,
          pointerEvents: "none",
          "[data-highlighted] > &": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          },
        }}
      />
    </Menubar.Trigger>
  );
}

export function MenubarContent(props: ComponentProps<typeof Menubar.Content>) {
  return (
    <Menubar.Portal>
      <Menubar.Content
        {...props}
        css={{
          backgroundColor: "rgba(246, 246, 246, 0.6)",
          padding: 5,
          outline: "none",
          borderRadius: 6,
          backdropFilter: "blur(80px)",
          boxShadow:
            "0 0 1px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.3), 0 7px 22px rgba(0,0,0,0.25)",
        }}
      ></Menubar.Content>
    </Menubar.Portal>
  );
}
export const MenubarSub = Menubar.Sub;
export function MenubarSubContent(
  props: ComponentProps<typeof Menubar.SubContent>
) {
  return (
    <Menubar.Portal>
      <Menubar.SubContent
        {...props}
        css={{
          backgroundColor: "rgba(246, 246, 246, 0.6)",
          padding: 5,
          outline: "none",
          borderRadius: 6,
          backdropFilter: "blur(80px)",
          boxShadow:
            "0 0 1px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.3), 0 7px 22px rgba(0,0,0,0.25)",
        }}
      ></Menubar.SubContent>
    </Menubar.Portal>
  );
}

export function MenubarItem(props: ComponentProps<typeof Menubar.Item>) {
  return (
    <Menubar.Item
      {...props}
      css={{
        height: 22,
        fontSize: 13,
        lineHeight: "16px",
        px: 10,
        display: "flex",
        alignItems: "center",
        outline: "none",
        borderRadius: 4,
        cursor: "default",
        "&[data-disabled]": {
          color: "rgba(0,0,0,0.25)",
        },
        "&[data-highlighted]": {
          backgroundColor: "#0A82FF",
          color: "white",
        },
      }}
    ></Menubar.Item>
  );
}

export function MenubarSubTrigger(
  props: ComponentProps<typeof Menubar.SubTrigger>
) {
  return (
    <Menubar.SubTrigger
      {...props}
      css={{
        height: 22,
        fontSize: 13,
        lineHeight: "16px",
        px: 10,
        display: "flex",
        alignItems: "center",
        outline: "none",
        borderRadius: 4,
        cursor: "default",
        "&[data-disabled]": {
          color: "rgba(0,0,0,0.25)",
        },
        "&[data-highlighted]": {
          backgroundColor: "#0A82FF",
          color: "white",
        },
      }}
    ></Menubar.SubTrigger>
  );
}

export function MenubarSeparator(
  props: ComponentProps<typeof Menubar.Separator>
) {
  return (
    <Menubar.Separator
      {...props}
      css={{
        // height: 1,
        my: 5,
        mx: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    ></Menubar.Separator>
  );
}

export function OSMenu() {
  function shutDown() {
    const overlay = (
      <div
        css={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 2147483647,
        }}
      />
    );
    document.body.appendChild(overlay as any);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <MenubarMenu>
      <MenubarTrigger>
        <MenubarPixel />
      </MenubarTrigger>
      <MenubarContent>
        {/* <MenubarItem disabled>About this Mac</MenubarItem> */}
        {/* <MenubarSeparator /> */}
        {/* <MenubarItem disabled>System Settings...</MenubarItem> */}
        {/* <MenubarItem disabled>App Store</MenubarItem> */}
        {/* <MenubarSeparator /> */}
        {/* <MenubarItem disabled>Recent Items</MenubarItem> */}
        {/* <MenubarSeparator /> */}
        {/* <MenubarItem disabled>Force Quit...</MenubarItem> */}
        {/* <MenubarSeparator /> */}
        <MenubarItem onSelect={shutDown}>Sleep</MenubarItem>
        <MenubarItem onSelect={shutDown}>Restart...</MenubarItem>
        <MenubarItem onSelect={shutDown}>Shut Down...</MenubarItem>
        <MenubarSeparator />
        <MenubarItem onSelect={shutDown}>Lock Screen</MenubarItem>
        <MenubarItem onSelect={shutDown}>Log Out...</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
