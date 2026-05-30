import { findSiteAdmin } from "./admin-registry.mjs";
import { getAutoJoinGuildIds } from "./discord-auto-join.mjs";
import { getSupportGuildId } from "./discord-channels.mjs";

/** Permissão Discord ADMINISTRATOR */
const ADMINISTRATOR = 8n;

function parseOverrideIds() {
  const raw = process.env.DISCORD_ADMIN_USER_IDS?.trim();
  if (!raw) return new Set();
  return new Set(raw.split(/[,\s]+/).map((id) => id.trim()).filter(Boolean));
}

async function memberHasAdminInGuild(userId, guildId) {
  const botToken = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!botToken || !guildId) return false;

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${encodeURIComponent(guildId)}/members/${encodeURIComponent(userId)}`,
      { headers: { Authorization: `Bot ${botToken}` } }
    );
    if (!res.ok) return false;
    const member = await res.json();
    const permissions = BigInt(member.permissions ?? "0");
    return (permissions & ADMINISTRATOR) === ADMINISTRATOR;
  } catch {
    return false;
  }
}

/** Admin no servidor de suporte central. */
export async function userIsSupportGuildAdministrator(userId) {
  return memberHasAdminInGuild(userId, getSupportGuildId());
}

/**
 * Resolve acesso ao painel: registro /add-admin, env, ou Admin no suporte/rede.
 * @returns {{ isAdmin: boolean, role: string | null, source: string | null }}
 */
export async function resolveSiteAdmin(userId) {
  const overrides = parseOverrideIds();
  if (overrides.has(userId)) {
    return { isAdmin: true, role: "super", source: "env" };
  }

  const registered = findSiteAdmin(userId);
  if (registered) {
    return { isAdmin: true, role: registered.role, source: "registry" };
  }

  if (await userIsSupportGuildAdministrator(userId)) {
    return { isAdmin: true, role: "support", source: "discord_support" };
  }

  const botToken = process.env.DISCORD_BOT_TOKEN?.trim();
  if (botToken) {
    const guildIds = getAutoJoinGuildIds();
    for (const guildId of guildIds) {
      if (await memberHasAdminInGuild(userId, guildId)) {
        return { isAdmin: true, role: "super", source: "discord_network" };
      }
    }
  }

  return { isAdmin: false, role: null, source: null };
}

/** @deprecated use resolveSiteAdmin */
export async function userIsDiscordAdministrator(userId) {
  const r = await resolveSiteAdmin(userId);
  return r.isAdmin;
}
