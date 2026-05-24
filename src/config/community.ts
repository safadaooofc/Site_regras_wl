/** Empresa central (marca do site). */
export const COMPANY_NAME = "Reuel";

export const COMPANY_TAGLINE =
  "Empresa central — filiais Capital MT BR e Exército Brasileiro.";

/** Filial de roleplay (mapa / cidade). */
export const RP_FILIAL_NAME = "Capital do MT BR";

/** Filial militar. */
export const EB_FILIAL_NAME = "Exército Brasileiro";

/** @deprecated Use RP_FILIAL_NAME */
export const COMMUNITY_NAME = RP_FILIAL_NAME;

/** @deprecated Use EB_FILIAL_NAME */
export const EB_COMMUNITY_NAME = EB_FILIAL_NAME;

export type CommunityBranch = "rp" | "eb";

const RP_DEFAULT_INVITE = "https://discord.gg/nDz7grbuvB";
const RP_DEFAULT_GUILD_ID = "1489492393819504692";
const EB_DEFAULT_INVITE = "https://discord.gg/3A4szCrrpw";
const EB_DEFAULT_GUILD_ID = "1426225171689111594";

export function getDiscordInvite(branch: CommunityBranch = "rp"): string {
  if (branch === "eb") {
    const v = import.meta.env.VITE_EB_DISCORD_INVITE;
    return v && v.trim() !== "" ? v.trim() : EB_DEFAULT_INVITE;
  }
  const v = import.meta.env.VITE_DISCORD_INVITE;
  return v && v.trim() !== "" ? v.trim() : RP_DEFAULT_INVITE;
}

export function getDiscordServerId(branch: CommunityBranch = "rp"): string {
  if (branch === "eb") {
    const v = import.meta.env.VITE_EB_DISCORD_SERVER_ID;
    return v && v.trim() !== "" ? v.trim() : EB_DEFAULT_GUILD_ID;
  }
  const v = import.meta.env.VITE_DISCORD_SERVER_ID;
  return v && v.trim() !== "" ? v.trim() : RP_DEFAULT_GUILD_ID;
}

/**
 * Widget Discord (`presence_count`).
 * Sempre usa proxy local (dev: Vite, prod: Express) — evita CORS.
 * Não use URL direta do discord.com em VITE_*_PLAYERS_API.
 */
export function getPresenceApiUrl(branch: CommunityBranch = "rp"): string {
  const guildId = getDiscordServerId(branch);
  if (!guildId) return "";

  if (import.meta.env.DEV) {
    return `/discord-api/api/guilds/${guildId}/widget.json`;
  }
  return `/api/discord/guilds/${guildId}/widget.json`;
}

/**
 * Link para entrar no mapa/jogo no Roblox.
 * Aceita URL completa ou só o placeId (números).
 * Deixe vazio no .env para marcar como indisponível (ex.: RP em reinauguração).
 */
export function getRobloxGameUrl(branch: CommunityBranch): string | null {
  const raw =
    branch === "eb"
      ? import.meta.env.VITE_EB_ROBLOX_URL
      : import.meta.env.VITE_RP_ROBLOX_URL;

  if (raw === undefined || String(raw).trim() === "") return null;

  const v = String(raw).trim();

  if (/^\d+$/.test(v)) {
    return `https://www.roblox.com/games/start?placeId=${v}`;
  }

  if (/^https?:\/\//i.test(v)) return v;

  return null;
}

export function isRobloxMapAvailable(branch: CommunityBranch): boolean {
  return getRobloxGameUrl(branch) !== null;
}
