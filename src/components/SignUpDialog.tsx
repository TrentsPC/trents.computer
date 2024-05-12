import { createSignal } from "solid-js";
import { Cross1Icon } from "solid-radix-icons";
import { Dialog } from "~/modules/radix";
import s from "./dialog.module.css";
import { Recaptcha } from "./Recaptcha";

export function SignUpDialog() {
  const [open, setOpen] = createSignal(false);
  return (
    <Dialog.Root open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger
        css={{
          position: "fixed",
          top: 0,
          right: 0,
          height: 48,
          px: 18,
          zIndex: "1000",
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontScale: 0,
        }}
      >
        <FingerprintIcon />
        Log in
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class={s.overlay}>
          <Dialog.Content class={s.content}>
            <Dialog.Close class={s.close}>
              <Cross1Icon color="white" />
            </Dialog.Close>
            <Dialog.Title class={s.title}>Log in</Dialog.Title>
            <Recaptcha />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FingerprintIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke-width={(24 / 18) * 1.25}
      stroke="rgba(0, 0, 0, 0.6)"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      css={{
        transform: "scaleX(-1)",
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
      <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
      <path d="M12 11v2a14 14 0 0 0 2.5 8" />
      <path d="M8 15a18 18 0 0 0 1.8 6" />
      <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
    </svg>
  );
}
