import { createAsync } from "@solidjs/router";
import { drizzle } from "drizzle-orm/d1";
import { createSignal } from "solid-js";
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
      <UploadImages />
    </div>
  );
}

function UploadImages() {
  const [file, setFile] = createSignal<File | undefined>(undefined);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // const body = new FormData();
        // body.append("file", file()!);
        if (file()) {
          try {
            const res = await fetch(
              "https://wwwwwww.trents.computer/api/recipe-image",
              {
                method: "POST",
                body: file()!,
              }
            );
            if (res.ok) {
              console.log("Uploaded successfully!");
              console.log(res);
            } else {
              console.error(res);
            }
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
