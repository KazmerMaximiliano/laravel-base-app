/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  // más variables de entorno aquí...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
