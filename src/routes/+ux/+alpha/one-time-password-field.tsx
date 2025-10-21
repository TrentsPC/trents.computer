import { For } from "solid-js";

export function OneTimePasswordField(props: {
  value: string;
  onValueChange: (value: string) => void;
  onAutoSubmit?: () => void;
}) {
  const inputs: HTMLInputElement[] = [];
  return (
    <div
      css={{ display: "flex", gap: "8px", alignItems: "center", fontScale: 3 }}
    >
      <For each={[0, 1, "", 2, 3, "", 4, 5]}>
        {(i) => {
          if (typeof i === "string") {
            return <div css={{ width: "16px", color: "#888" }}>/</div>;
          }
          return (
            <input
              ref={(el) => {
                inputs[i] = el;
                if (i === 0) {
                  setTimeout(() => el.focus(), 0);
                }
              }}
              maxlength={1}
              autofocus={i === 0 ? true : undefined}
              autocomplete="one-time-code"
              data-complete={props.value.length >= 6 ? "" : undefined}
              css={{
                minWidth: 0,
                fontSize: "inherit",
                textAlign: "center",
                height: 52,
                border: "1px solid #aaa",
                borderRadius: 6,
                "&:focus": {
                  outline: "none",
                  borderColor: "#0070f3",
                  boxShadow: "0 0 0 2px #0070f3",
                },
                "&[data-complete]": {
                  color: "#888",
                  backgroundColor: "#f0f0f0",
                },
              }}
              value={props.value[i] || ""}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  const valueSoFar = props.value.slice(0, i);
                  props.onValueChange(
                    valueSoFar + "" + props.value.slice(i + 1)
                  );
                  if (i > 0) {
                    inputs[i - 1].focus();
                  }
                }
              }}
              onFocus={(e) => {
                if (i > props.value.length) {
                  inputs[props.value.length].focus();
                  return;
                }
                e.currentTarget.select();
              }}
              onInput={(e) => {
                const valueSoFar = props.value.slice(0, i);
                const newChar = e.currentTarget.value;
                if (!/^\d$/.test(newChar)) {
                  e.currentTarget.value = "";
                  return;
                }
                props.onValueChange(
                  valueSoFar + newChar + props.value.slice(i + 1)
                );
                if (i < 5) {
                  inputs[Math.min(i + 1, props.value.length)].focus();
                }
                if (props.value.length >= 6) {
                  props.onAutoSubmit?.();
                }
              }}
            />
          );
        }}
      </For>
    </div>
  );
}
