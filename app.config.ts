import hypergoodCss from "@hypergood/css/vite";
import { defineConfig } from "@solidjs/start/config";
import { styleConfig } from "./src/hypergood.config";

export default defineConfig({
  ssr: true,
  server: {
    preset: "cloudflare_module",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
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
      hypergoodCss({
        config: styleConfig,
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
