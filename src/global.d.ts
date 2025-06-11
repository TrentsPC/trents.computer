/// <reference types="@solidjs/start/env" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
