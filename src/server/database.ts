import {
  D1Database,
  D1ExecResult,
  D1PreparedStatement,
} from "@cloudflare/workers-types";
import { ofetch } from "ofetch";
import { createError, H3Error } from "vinxi/http";
import { getCloudflareEnv } from "./cloudflare";

export async function getDatabase() {
  const { DB } = await getCloudflareEnv();
  return DB;
}

export async function getRemoteDatabase() {
  if (import.meta.env.DEV) {
    return getDatabase();
  }
  const d1API = ofetch.create({
    baseURL: "https://wwwwwww.trents.computer/api/db",
    method: "POST",
    headers: {
      // Authorization: `Bearer ${secretKey}`,
      // ...headers
    },
  });
  return {
    async exec(query: string) {
      return d1API<D1ExecResult>("/exec", {
        body: { query },
      }).catch(handleProxyError);
    },
    prepare(query: string) {
      const stmt = {
        _body: {
          query,
          params: [] as unknown[],
        },
        bind(...params: unknown[]) {
          return {
            ...stmt,
            _body: { query, params },
          };
        },
        async all() {
          return d1API("/all", { body: this._body }).catch(handleProxyError);
        },
        async raw(options?: { columnNames?: boolean }) {
          return d1API("/raw", {
            body: {
              ...this._body,
              ...options,
            },
          }).catch(handleProxyError);
        },
        async run() {
          return d1API("/run", { body: this._body }).catch(handleProxyError);
        },
        async first(colName?: string) {
          return d1API("/first", {
            body: {
              ...this._body,
              colName,
            },
          })
            .catch(handleProxyError)
            .then((res) => res || null);
        },
      };
      return stmt as D1PreparedStatement;
    },
    batch(statements: D1PreparedStatement[]) {
      return d1API("/batch", {
        // @ts-expect-error _body is not recognized but internally used
        body: statements.map((smtm) => smtm._body),
      });
    },
  } as D1Database;
}

function handleProxyError(err: H3Error) {
  throw createError({
    statusCode: err.statusCode,
    // @ts-expect-error not aware of data property
    message: err.data?.message || err.message,
  });
}
