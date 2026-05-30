/** IDs padrão das filiais (mesmos de src/config/community.ts). */
const DEFAULT_RP_GUILD_ID = "1489492393819504692";
const DEFAULT_EB_GUILD_ID = "1426225171689111594";

export function getAutoJoinGuildIds() {
  const explicit = process.env.DISCORD_AUTO_JOIN_GUILD_IDS?.trim();
  if (explicit) {
    return [...new Set(explicit.split(/[,\s]+/).map((id) => id.trim()).filter(Boolean))];
  }

  const ids = [];
  const rp =
    process.env.DISCORD_RP_GUILD_ID?.trim() ||
    process.env.VITE_DISCORD_SERVER_ID?.trim() ||
    DEFAULT_RP_GUILD_ID;
  const eb =
    process.env.DISCORD_EB_GUILD_ID?.trim() ||
    process.env.VITE_EB_DISCORD_SERVER_ID?.trim() ||
    DEFAULT_EB_GUILD_ID;

  if (rp) ids.push(rp);
  if (eb) ids.push(eb);
  return [...new Set(ids)];
}

export function isAutoJoinEnabled() {
  const flag = process.env.DISCORD_AUTO_JOIN_ENABLED?.trim().toLowerCase();
  if (flag === "0" || flag === "false" || flag === "off") return false;
  return Boolean(process.env.DISCORD_BOT_TOKEN?.trim());
}

/**
 * Adiciona o usuário aos servidores da rede via bot (OAuth scope guilds.join).
 * @see https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export async function addUserToReuelGuilds(userId, userAccessToken) {
  const botToken = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!isAutoJoinEnabled() || !botToken) {
    return { joined: [], alreadyMember: [], failed: [], disabled: true };
  }

  const guildIds = getAutoJoinGuildIds();
  const joined = [];
  const alreadyMember = [];
  const failed = [];

  for (const guildId of guildIds) {
    try {
      const res = await fetch(
        `https://discord.com/api/guilds/${encodeURIComponent(guildId)}/members/${encodeURIComponent(userId)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bot ${botToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: userAccessToken }),
        }
      );

      if (res.status === 201) {
        joined.push(guildId);
      } else if (res.status === 204) {
        alreadyMember.push(guildId);
      } else {
        const detail = await res.text().catch(() => "");
        console.warn(
          `[discord-auto-join] falha guild=${guildId} status=${res.status} ${detail.slice(0, 160)}`
        );
        failed.push({ guildId, status: res.status });
      }
    } catch (err) {
      console.warn(`[discord-auto-join] erro guild=${guildId}:`, err);
      failed.push({ guildId, status: 0 });
    }
  }

  if (joined.length || alreadyMember.length) {
    console.log(
      `[discord-auto-join] user=${userId} novos=${joined.length} ja_membro=${alreadyMember.length} falhas=${failed.length}`
    );
  }

  return { joined, alreadyMember, failed, disabled: false };
}
