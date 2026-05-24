/// <reference types="vite/client" />

declare module "*?raw" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_DISCORD_INVITE?: string;
  readonly VITE_DISCORD_SERVER_ID?: string;
  readonly VITE_DEMO_ONLINE_PLAYERS?: string;
  readonly VITE_EB_DISCORD_INVITE?: string;
  readonly VITE_EB_DISCORD_SERVER_ID?: string;
  readonly VITE_EB_DEMO_ONLINE_PLAYERS?: string;
  readonly VITE_RP_ROBLOX_URL?: string;
  readonly VITE_EB_ROBLOX_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
