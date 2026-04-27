import { JSX, onCleanup } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { useSquircle } from "~/utils/squircle";

export function StateLayer(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [mouse, setMouse] = createSignal({ x: 0, y: 0 });
  let ref: HTMLSpanElement = null!;

  let x = () => mouse().x - (ref?.getBoundingClientRect().left ?? 0);
  let y = () => mouse().y - (ref?.getBoundingClientRect().top ?? 0);

  createEffect(() => {
    let onMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", onMouseMove);

    onCleanup(() => {
      document.removeEventListener("mousemove", onMouseMove);
    });
  });

  return (
    <span
      {...props}
      ref={(el) => {
        useSquircle()(el);
        ref = el;
      }}
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "0 !important",
        borderRadius: "inherit",
        opacity: 0,
        pointerEvents: "none",
        overflow: "hidden",
        "--duration": "300ms",

        "[disabled]>&, [aria-disabled]>&": {
          opacity: "0 !important",
        },

        "[aria-haspopup='menu'][aria-expanded=true] > &": {
          opacity: 0.1 * 3,
          transitionDuration: "var(--duration)",
        },
        ":hover > &, [data-highlighted]>&": {
          opacity: 0.08 * 3,
          transitionDuration: "var(--duration)",
        },
        ":focus-visible > &": {
          opacity: 0.12 * 3,
          transitionDuration: "var(--duration)",
        },
        ":active > &": {
          opacity: 0.12 * 3,
          transitionDuration: "0ms",
        },
        transitionProperty: "opacity",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "var(--duration)",
      }}
    >
      <span
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          pt: "200%",
          margin: 0,
          background: "radial-gradient(circle closest-side at center, currentColor, transparent)",

          opacity: 0.5,
          pointerEvents: "none",
        }}
        style={{
          transform: `translate(calc(${x()}px - 50%), calc(${y()}px - 50%))`,
        }}
      />
    </span>
  );
}
