export function json<TData>(payload: TData, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: mergeHeaders(
      { "content-type": "application/json" },
      init?.headers
    ),
  });
}
// Function to merge headers with proper overrides
function mergeHeaders(...headers: Array<AnyHeaders>) {
  return headers.reduce((acc: Headers, header) => {
    const headersInstance = toHeadersInstance(header);
    for (const [key, value] of headersInstance.entries()) {
      acc.set(key, value);
    }
    return acc;
  }, new Headers());
}

type AnyHeaders =
  | Headers
  | HeadersInit
  | Record<string, string>
  | Array<[string, string]>
  | undefined;

function toHeadersInstance(init: AnyHeaders) {
  if (init instanceof Headers) {
    return new Headers(init);
  } else if (Array.isArray(init)) {
    return new Headers(init);
  } else if (typeof init === "object") {
    return new Headers(init as HeadersInit);
  } else {
    return new Headers();
  }
}
