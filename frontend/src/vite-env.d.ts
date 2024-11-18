/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SOCKET_URL: string;
  SOCKET_URL: string;
  VITE_APP_ENV: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
