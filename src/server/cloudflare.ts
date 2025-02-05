import { D1Database } from "@cloudflare/workers-types";
import { getRequestEvent } from "solid-js/web";

export type Env = { DB: D1Database };

export async function getCloudflareEnv() {
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
