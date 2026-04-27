import { createFileRoute } from "@tanstack/solid-router";
import { exampleMinefield, MinesweeperGame } from "~/modules/minesweeper";

export const Route = createFileRoute("/minesweeper")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MinesweeperGame initialMinefield={exampleMinefield} />;
}
