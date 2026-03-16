import { createFileRoute } from "@tanstack/solid-router";
import { PixelFontEditor } from "~/modules/pixel-font-editor";

export const Route = createFileRoute("/pixel-font/")({
  component: PixelFontEditor,
});
