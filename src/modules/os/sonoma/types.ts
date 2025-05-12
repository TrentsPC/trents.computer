import { lazy } from "solid-js";

export type Application = {
  id: string;
  name: string;
  icon: string;
  // Equivalent to SwiftUI `App`, could contain Window, WindowGroup, MenuBarExtra, etc.
  component: ReturnType<typeof lazy>;
};
