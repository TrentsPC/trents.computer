import hypergoodCss from "@hypergood/css/vite";
import { defineConfig } from "@solidjs/start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { styleConfig } from "./src/hypergood.config";

export default defineConfig({
  // middleware: "./src/middleware.ts",
  ssr: false,
  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2025-04-01",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
      treeshake: "smallest",
    },
    // prerender: {
    //   routes: ["/", "/boggle", "/calendar"],
    //   crawlLinks: true,
    // },
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
    plugins: [
      TanStackRouterVite({
        target: "solid",
        autoCodeSplitting: true,
        routeFilePrefix: "+",
      }) as any,
      hypergoodCss({
        config: styleConfig,
      }),
      visualizer({
        brotliSize: true,
        template: "treemap",
        filename: "stats/treemap.html",
      }),
      // inspect({
      //   build: true,
      // }),
    ],
    ssr: {
      noExternal: ["@hypergood/css"],
    },
  },
});
