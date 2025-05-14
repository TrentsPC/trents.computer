import { createFileRoute } from "@tanstack/solid-router";
import { FakeIOSGen3 } from "~/modules/os/ios/ios";
import { useSquircle } from "~/utils/squircle";

export const Route = createFileRoute("/os/ios3")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      css={{
        filter: "drop-shadow(0px 8px 40px rgba(0, 0, 0, 0.5))",
      }}
    >
      <div
        ref={useSquircle()}
        css={{
          height: 874,
          width: 402,
          borderRadius: 53,
          overflow: "hidden",
          mx: "auto",
        }}
      >
        <FakeIOSGen3 cornerRadius={53} />
      </div>
    </div>
  );
}
