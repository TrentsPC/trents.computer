import { Win98Window, Win98WindowProps } from "../base-windows/Win98Window";

export function InternetExplorerWindow(props: Win98WindowProps) {
  return (
    <Win98Window {...props}>
      <div
        css={{
          d: "flex",
          flexDir: "column",
          bg: "white",
          h: "100%",
          w: "100%",
        }}
      >
        <iframe
          src={window.origin + "?os=win98#" + new Date().toISOString()}
          css={{ flex: "1 0 0px" }}
        />
      </div>
    </Win98Window>
  );
}
