import { IS_MAC } from "../utils";

export function Kbd(props: { key: string }) {
  return (
    <kbd
      css={{
        height: 21,
        width: 24,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cccccc",
      }}
    >
      {getKeyLabel(props.key)}
    </kbd>
  );
}

const KEY_LABELS: Record<string, string> = {
  " ": "Space",
  ArrowDown: "↓",
  ArrowUp: "↑",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "↵",
  Escape: "⎋",
  Backspace: "⌫",
  Tab: "⇥",
  Delete: "⌦",
  CapsLock: "⇪",
  Shift: "⇧",
  Control: "⌃",
  Alt: IS_MAC ? "⌥" : "Alt",
  Meta: "⌘",
  Mod: IS_MAC ? "⌘" : "Ctrl",
};

function getKeyLabel(key: string) {
  return KEY_LABELS[key] || key.toUpperCase();
}
