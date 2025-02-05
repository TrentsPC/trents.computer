import { createAsync } from "@solidjs/router";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/db/schema";
import { getRemoteDatabase } from "~/server/database";

async function getCloudflare() {
  // "use server";
  const db = await getRemoteDatabase();
  const driz = drizzle(db, {
    schema,
  });
  const result = await driz.query.recipeBooks.findMany();
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
