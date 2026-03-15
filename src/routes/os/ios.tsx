import { createFileRoute } from "@tanstack/solid-router";
import { FakeIOSGen3 } from "~/modules/os/ios/ios";

export const Route = createFileRoute("/os/ios")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div css={{ width: "100%", height: "100%" }}>
      <FakeIOSGen3 />
    </div>
  );
}
