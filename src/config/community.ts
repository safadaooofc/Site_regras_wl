/** Nome exibido no site (ajuste se a staff usar grafia diferente). */
export const COMMUNITY_NAME = "Capital do MT BR";

const DEFAULT_INVITE = "https://discord.gg/nDz7grbuvB";
const DEFAULT_GUILD_ID = "1489492393819504692";

export function getDiscordInvite(): string {
  const v = import.meta.env.VITE_DISCORD_INVITE;
  return v && v.trim() !== "" ? v.trim() : DEFAULT_INVITE;
}

export function getDiscordServerId(): string {
  const v = import.meta.env.VITE_DISCORD_SERVER_ID;
  return v && v.trim() !== "" ? v.trim() : DEFAULT_GUILD_ID;
}

/** API do widget (`presence_count`). Em desenvolvimento usa proxy do Vite para evitar CORS. */
export function getPresenceApiUrl(): string {
  const v = import.meta.env.VITE_PLAYERS_API;
  if (v && v.trim() !== "") return v.trim();
  const path = `/api/guilds/${getDiscordServerId()}/widget.json`;
  if (import.meta.env.DEV) return `/discord-api${path}`;
  return `https://discord.com${path}`;
}
