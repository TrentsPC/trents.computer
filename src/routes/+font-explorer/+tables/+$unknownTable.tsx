import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/font-explorer/tables/$unknownTable")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Unknown table :/</div>;
}
