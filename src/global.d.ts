/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
  readonly PROD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
