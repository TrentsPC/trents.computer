import { createFileRoute } from "@tanstack/solid-router";
import { GameBoyEmulator } from "~/modules/game-boy";

export const Route = createFileRoute("/gb")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GameBoyEmulator />;
}
