import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/font-explorer/tables/$unknownTable")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/font-explorer/tables/$unknownTable"!</div>;
}
