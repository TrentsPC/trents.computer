import { JSX, createSignal } from "solid-js";

export function createLogger() {
  const [logs, setLogs] = createSignal<Log[]>([]);
  const logger = {
    log: (message: JSX.Element, { key }: { key?: unknown } = {}) =>
      setLogs((logs) => {
        const lastLog = logs[logs.length - 1];
        if (key && lastLog?.key === key) {
          return [
            ...logs.slice(0, logs.length - 1),
            {
              message,
              type: "log",
              key,
            },
          ];
        }
        // logs = logs.slice(-10);
        logs.push({
          message,
          type: "log",
          key,
        });
        if (logs.length > 256) {
          logs.shift();
        }
        return logs;
        // return [
        //   ...logs,
        //   {
        //     message,
        //     type: "log",
        //     key,
        //   },
        // ];
      }),
    warn: (message: JSX.Element, { key }: { key?: unknown } = {}) =>
      setLogs((logs) => [
        ...logs,
        {
          message,
          type: "warn",
          key,
        },
      ]),
    error: (message: JSX.Element, { key }: { key?: unknown } = {}) =>
      setLogs((logs) => [
        ...logs,
        {
          message,
          type: "error",
          key,
        },
      ]),
  };

  return {
    logs,
    logger,
  };
}

export type Log = {
  message: JSX.Element;
  type: "log" | "warn" | "error";
  key?: unknown;
};

export type Logger = ReturnType<typeof createLogger>["logger"];
