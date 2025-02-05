import type { D1Database } from "@cloudflare/workers-types";
import { createAsync } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

type Env = { DB: D1Database };

async function getCloudflareEnv() {
  let env: Env;
  const event = getRequestEvent();
  if (import.meta.env.DEV) {
    const { getPlatformProxy } = await import("wrangler");
    env = (await getPlatformProxy({})).env as Env;
  } else {
    env = event?.nativeEvent.context.cloudflare?.env;
  }
  return env;
}

async function getCloudflare() {
  "use server";
  const env = await getCloudflareEnv();
  return JSON.stringify(await env.DB.prepare("SELECT 1;").all(), null, 2);
}

export default function Page() {
  const thing = createAsync(getCloudflare);
  return (
    <div>
      <h1>Cloudflare binding test</h1>
      <small>
        <pre>
          <code>{thing()}</code>
        </pre>
      </small>
    </div>
  );
}
