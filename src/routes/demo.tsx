import { createFileRoute } from "@tanstack/solid-router";
import { ResponsiveDesignDemo } from "~/modules/demo";

export const Route = createFileRoute("/demo")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResponsiveDesignDemo initialPath="/pantry" />;
}
