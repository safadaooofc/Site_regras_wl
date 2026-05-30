import { ensureLogChannels, getLogChannelId } from "./discord-channels.mjs";

const COLORS = {
  auth: 0x5865f2,
  admin: 0xfaa61a,
  cms: 0x57f287,
  errors: 0xed4245,
  general: 0x99aab5,
};

function botToken() {
  return process.env.DISCORD_BOT_TOKEN?.trim() || "";
}

async function postToChannel(channelId, payload) {
  const token = botToken();
  if (!token || !channelId) return { ok: false };

  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return { ok: res.ok, status: res.status };
}

/**
 * Envia log embed ao canal correspondente no servidor de suporte.
 * @param {'auth'|'admin'|'cms'|'errors'|'general'} kind
 */
export async function sendSiteLog(kind, { title, description, fields = [], color }) {
  try {
    await ensureLogChannels();
    const channelId = getLogChannelId(kind);
    if (!channelId) return { ok: false, reason: "no_channel" };

    const embed = {
      title: title.slice(0, 256),
      description: description?.slice(0, 4096) || undefined,
      color: color ?? COLORS[kind] ?? COLORS.general,
      fields: fields.slice(0, 25).map((f) => ({
        name: String(f.name).slice(0, 256),
        value: String(f.value).slice(0, 1024),
        inline: f.inline ?? false,
      })),
      timestamp: new Date().toISOString(),
      footer: { text: "Reuel · Site" },
    };

    return await postToChannel(channelId, { embeds: [embed] });
  } catch (err) {
    console.warn("[discord-logs]", kind, err);
    return { ok: false, reason: "exception" };
  }
}

export function logAuth(title, description, fields) {
  return sendSiteLog("auth", { title, description, fields });
}

export function logAdmin(title, description, fields) {
  return sendSiteLog("admin", { title, description, fields });
}

export function logCms(title, description, fields) {
  return sendSiteLog("cms", { title, description, fields });
}

export function logError(title, description, fields) {
  return sendSiteLog("errors", { title, description, fields });
}

export function logGeneral(title, description, fields) {
  return sendSiteLog("general", { title, description, fields });
}
