import { getAutoJoinGuildIds } from "./discord-auto-join.mjs";

/** Permissão Discord ADMINISTRATOR */
const ADMINISTRATOR = 8n;

function parseOverrideIds() {
  const raw = process.env.DISCORD_ADMIN_USER_IDS?.trim();
  if (!raw) return new Set();
  return new Set(raw.split(/[,\s]+/).map((id) => id.trim()).filter(Boolean));
}

/**
 * Verifica se o usuário tem permissão de administrador em algum servidor da rede Reuel.
 * Requer DISCORD_BOT_TOKEN e o bot presente nos servidores.
 */
export async function userIsDiscordAdministrator(userId) {
  const overrides = parseOverrideIds();
  if (overrides.has(userId)) return true;

  const botToken = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!botToken) return false;

  const guildIds = getAutoJoinGuildIds();

  for (const guildId of guildIds) {
    try {
      const res = await fetch(
        `https://discord.com/api/guilds/${encodeURIComponent(guildId)}/members/${encodeURIComponent(userId)}`,
        { headers: { Authorization: `Bot ${botToken}` } }
      );

      if (!res.ok) continue;

      const member = await res.json();
      const permissions = BigInt(member.permissions ?? "0");
      if ((permissions & ADMINISTRATOR) === ADMINISTRATOR) return true;
    } catch {
      /* tenta próximo servidor */
    }
  }

  return false;
}
