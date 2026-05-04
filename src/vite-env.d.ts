/// <reference types="vite/client" />

declare module "*?raw" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_DISCORD_INVITE?: string;
  readonly VITE_DISCORD_SERVER_ID?: string;
  readonly VITE_PLAYERS_API?: string;
  readonly VITE_DEMO_ONLINE_PLAYERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
