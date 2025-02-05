import { createAsync } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { getPlatformProxy } from "wrangler";

async function getCloudflare() {
  "use server";

  let env: any;
  const event = getRequestEvent();
  if (import.meta.dev) {
    env = (await getPlatformProxy({})).env;
  } else {
    env = event?.nativeEvent.context.cloudflare?.env;
  }
  return JSON.stringify(env, null, 2);
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
