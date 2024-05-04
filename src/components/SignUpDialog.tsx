import { createSignal } from "solid-js";
import { Cross1Icon } from "solid-radix-icons";
import { Dialog } from "~/modules/radix";
import s from "./dialog.module.css";
import { Recaptcha } from "./Recaptcha";

export function SignUpDialog() {
  const [open, setOpen] = createSignal(false);
  return (
    <Dialog.Root open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger class={s.trigger}>Sign Up</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class={s.overlay}>
          <Dialog.Content class={s.content}>
            <Dialog.Close class={s.close}>
              <Cross1Icon color="white" />
            </Dialog.Close>
            <Dialog.Title class={s.title}>Sign up</Dialog.Title>
            <Recaptcha />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
