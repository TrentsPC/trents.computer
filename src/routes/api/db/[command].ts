import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { setResponseHeaders } from "vinxi/http";
import { getDatabase } from "~/server/database";

export async function OPTIONS({ request, nativeEvent }: APIEvent) {
  setResponseHeaders(nativeEvent, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
  return new Response(null, { status: 204 });
}

export async function POST({ request, nativeEvent }: APIEvent) {
  const command = nativeEvent.path.split("/").pop()!;
  const db = await getDatabase();

  if (command === "exec") {
    const { query } = await request.json();
    return json(await db.exec(query));
  }

  if (command === "first") {
    const { query, params, colName } = await request.json();
    if (colName) {
      return json(
        await db
          .prepare(query)
          .bind(...params)
          .first(colName)
      );
    }
    return json(
      await db
        .prepare(query)
        .bind(...params)
        .first()
    );
  }

  if (command === "batch") {
    const statements = await request.json();
    return json(
      await db.batch(
        // @ts-expect-error overload on command
        statements.map((stmt) => db.prepare(stmt.query).bind(...stmt.params))
      )
    );
  }

  if (command === "raw") {
    const { query, params, columnNames } = await request.json();

    return json(
      await db
        .prepare(query)
        .bind(...params)
        .raw({ columnNames })
    );
  }

  // command is all or run
  const { query, params } = await request.json();
  return json(
    // @ts-expect-error overload on command
    await db
      .prepare(query)
      .bind(...params)
      [command]()
  );
}
