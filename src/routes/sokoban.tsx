import { createFileRoute } from "@tanstack/solid-router";
import { SokobanPage } from "~/modules/sokoban/sokoban-dom";

export const Route = createFileRoute("/sokoban")({
  component: SokobanPage,
});
