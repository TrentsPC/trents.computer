import { Outlet, createRootRoute } from "@tanstack/solid-router";
import { CommandPalette } from "~/modules/command-palette";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <CommandPalette />
    </>
  );
}
