import { createFileRoute } from "@tanstack/solid-router";
import { TrentOS } from "~/modules/os/sonoma";

export const Route = createFileRoute("/os/sonoma")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TrentOS />;
}
