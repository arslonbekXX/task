/// <reference types="vite/client" />

interface ImportMetaEnv {
  // No custom env vars — map tiles (CartoDB / OpenStreetMap) need no API key.
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
