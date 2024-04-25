import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core";
import { JSX } from "solid-js";
import { useSquircle } from "~/utils/squircle";

export function DropdownMenu(props: {
  children?: JSX.Element;
  content?: JSX.Element;
}) {
  return (
    <DropdownMenuPrimitive.Root placement="bottom-start" gutter={10}>
      {props.children}
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          // ref={useSquircle()}
          css={{
            position: "relative",
            padding: 5,
            r: 6,
            bg: "rgba(246, 246, 246, 0.36)",
            boxShadow:
              "0px 7px 22px 0px rgba(0, 0, 0, 0.25), 0px 0px 1.5px 0px rgba(0, 0, 0, 0.30), 0px 0px 1px 0px rgba(0, 0, 0, 0.40)",
            backdropFilter: "blur(40px)",

            // // border: "1px solid rgba(26, 26, 26, 0.46)",
            // bg: "rgba(246, 246, 246, 0.36)",
            // mixBlendMode: "luminosity",
          }}
        >
          <div
            css={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              r: "inherit",
              bg: "rgba(246, 246, 246, 0.36)",
              mixBlendMode: "luminosity",
            }}
          />
          {props.content}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuItem(
  props: DropdownMenuPrimitive.DropdownMenuItemProps
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={useSquircle()}
      css={{
        fontFamily: "system-ui",
        py: 3,
        pl: 10,
        pr: 12,
        r: 3,
        d: "flex",
        items: "center",
        minH: 22,
        color: "rgba(0,0,0, 0.85)",
        fontSize: 13,
        fontWeight: 420,
        lineHeight: "16px",
        userSelect: "none",
        "&[data-highlighted]": {
          bg: "#007AFF",
          color: "rgba(255,255,255, 1)",
        },
      }}
      {...props}
    >
      {props.children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator() {
  return (
    <DropdownMenuPrimitive.Separator
      ref={useSquircle()}
      css={{
        // bg: "rgba(0, 0, 0, 0.1)",

        borderColor: "rgba(0, 0, 0, 0.1)",
        mx: 10,
        my: 5,
      }}
    ></DropdownMenuPrimitive.Separator>
  );
}
