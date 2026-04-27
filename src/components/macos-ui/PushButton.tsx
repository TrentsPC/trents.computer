import { ComponentProps } from "solid-js";

export function PushButton(props: ComponentProps<"button">) {
  return (
    <button
      // ref={useSquircle()}
      {...props}
      css={{
        d: "flex",
        alignItems: "center",
        justifyContent: "center",
        minW: 22,
        h: 22,
        px: 7,
        borderRadius: 5,
        background: "#FFF",
        boxShadow: "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",

        color: "rgba(0, 0, 0, 0.85)",
        fontFamily: "system-ui",
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: 1,
      }}
    />
  );
}

export function IconPushButton(props: ComponentProps<"button">) {
  return (
    <button
      // ref={useSquircle()}
      {...props}
      css={{
        d: "flex",
        alignItems: "center",
        justifyContent: "center",
        minW: 22,
        h: 22,
        // px: 7,
        borderRadius: 5,
        background: "#FFF",
        boxShadow: "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",

        color: "rgba(0, 0, 0, 0.85)",
        fontFamily: "system-ui",
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: 1,
      }}
    />
  );
}
