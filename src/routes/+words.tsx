import { createFileRoute } from "@tanstack/solid-router";
import { WordsPage } from "~/pages/WordsPage";

export const Route = createFileRoute("/words")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WordsPage />;
}
