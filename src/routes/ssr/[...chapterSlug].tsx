import { useParams } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { ChapterView } from "~/modules/ssr";

export default function SSR() {
  const [mounted, setMounted] = createSignal(false);
  const params = useParams<{ chapterSlug: string }>();

  console.log("SSR", params.chapterSlug);

  onMount(() => {
    if (isServer) return;
    setMounted(true);
  });

  return (
    <Show when={mounted()}>
      <ChapterView slug={params.chapterSlug || "Smutty_Sex_Romp"} />
    </Show>
  );
}
