import { createAsync } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

async function getCloudflare() {
  "use server";

  const event = getRequestEvent();
  return event?.nativeEvent.context;
  // return event?.nativeEvent.context.cloudflare?.env as CfPagesEnv
}

export default function Page() {
  const thing = createAsync(getCloudflare);
  return (
    <div>
      <h1>Cloudflare binding test</h1>
      <small>
        <pre>
          <code>{JSON.stringify(thing(), null, 2)}</code>
        </pre>
      </small>
    </div>
  );
}
