import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: [
    async (event) => {
      if (import.meta.env.PROD) {
        event.locals.db = process.env.DB;
      } else {
        const wrangler = await import("wrangler");
        const proxy = await wrangler.getPlatformProxy();
        event.locals.db = proxy.env.DB;
      }
    },
  ],
});
