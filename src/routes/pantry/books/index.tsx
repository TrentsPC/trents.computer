import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/pantry/books/")({
  component: Page,
});

import { createQuery } from "@tanstack/solid-query";
import { For } from "solid-js";
import { recipeBooksQuery } from "~/modules/pantry/queries";
import { getResizedImageUrl } from "~/utils/images";

function Page() {
  const thing = createQuery(() => recipeBooksQuery);

  return (
    <div css={{ padding: 20, backgroundColor: "#fffbe6", color: "#356859" }}>
      <div css={{ display: "flex", gap: 20 }}>
        <For each={thing.data}>
          {(book) => (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={
                  book.image?.storage_path ? getResizedImageUrl(book.image?.storage_path, 320) : ""
                }
              />
              {book.title}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
