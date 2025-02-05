import { createAsync } from "@solidjs/router";
import { getRemoteDatabase } from "~/server/database";

async function getCloudflare() {
  // "use server";
  const db = await getRemoteDatabase();
  // const db = (await getCloudflareEnv()).DB;
  const result = await db.prepare("SELECT * from recipe_books").all();
  console.log(result);
  return JSON.stringify(result, null, 2);
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
      <button onClick={getCloudflare}>go</button>
    </div>
  );
}
