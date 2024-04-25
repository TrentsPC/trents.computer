import { Show, createSignal, onMount } from "solid-js";
import { Calendar } from "~/modules/calendar";

export default function Page() {
  const [open, setOpen] = createSignal(false);

  onMount(() => {
    setOpen(true);
  });

  return (
    <Show when={open()}>
      <Calendar />
    </Show>
  );
}
