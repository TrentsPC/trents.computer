import { Outlet, createRootRoute } from "@tanstack/solid-router";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  return <Outlet />;
}
