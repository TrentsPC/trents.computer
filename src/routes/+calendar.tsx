import { createFileRoute } from "@tanstack/solid-router";
import { Show, createSignal, onMount } from "solid-js";
import { Calendar } from "~/modules/calendar";

export const Route = createFileRoute("/calendar")({
  component: Page,
});

function Page() {
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
