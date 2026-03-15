import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, For } from "solid-js";
import { recipeBooksQuery } from "~/modules/pantry/queries";
import { createRecipeBook } from "~/modules/pantry/server/api";
import { getResizedImageUrl } from "~/utils/images";

export const Route = createFileRoute("/pantry/")({
  component: Page,
});

function Page() {
  const books = createQuery(() => recipeBooksQuery);

  return (
    <div css={{ padding: 20 }}>
      <div css={{ display: "flex", gap: 20 }}>
        <For each={books.data}>
          {(book) => (
            <a
              href={`/pantry/books/${book.id}`}
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={
                  book.image?.storage_path
                    ? getResizedImageUrl(book.image?.storage_path, 320)
                    : ""
                }
              />
              {book.title}
            </a>
          )}
        </For>
      </div>
      <NewBook />
    </div>
  );
}

function NewBook() {
  const [title, setTitle] = createSignal("");
  const qc = useQueryClient();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeBook(title());
        setTitle("");
        qc.invalidateQueries(recipeBooksQuery);
      }}
    >
      <input
        type="text"
        value={title()}
        onInput={(e) => setTitle(e.currentTarget.value)}
      />
      <button type="submit">Create Book</button>
    </form>
  );
}
