import { createFileRoute } from "@tanstack/solid-router";
import { TrentOS } from "~/modules/os/win98";

export const Route = createFileRoute("/os/win98")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TrentOS />;
}
