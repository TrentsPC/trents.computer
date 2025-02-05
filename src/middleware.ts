import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: [
    async (event) => {
      event.nativeEvent.headers.set("Access-Control-Allow-Origin", "*");
      event.nativeEvent.headers.set(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      event.nativeEvent.headers.set("Access-Control-Allow-Headers", "*");
      event.nativeEvent.headers.set("Access-Control-Expose-Headers", "*");

      if (event.nativeEvent.method.toUpperCase() === "OPTIONS") {
        const res = new Response(null, { status: 204 });
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE"
        );
        res.headers.set("Access-Control-Allow-Headers", "*");
        res.headers.set("Access-Control-Expose-Headers", "*");
        return res;
      }
    },
  ],
});
