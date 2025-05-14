import { createFileRoute } from "@tanstack/solid-router";
import { FakeIOS } from "~/modules/os/ios/ios";

export const Route = createFileRoute("/os/ios")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FakeIOS />;
}
