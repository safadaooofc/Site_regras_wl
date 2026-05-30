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

function logWebhookUrl() {
  return process.env.DISCORD_LOG_WEBHOOK_URL?.trim() || "";
}

async function postToChannel(channelId, payload) {
  const token = botToken();
  if (!token || !channelId) return { ok: false, reason: "no_token_or_channel" };

  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(
      `[discord-logs] Falha ao enviar no canal ${channelId}: HTTP ${res.status}`,
      detail.slice(0, 300)
    );
    return { ok: false, status: res.status, detail };
  }

  return { ok: true };
}

async function postToWebhook(payload) {
  const url = logWebhookUrl();
  if (!url) return { ok: false, reason: "no_webhook" };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[discord-logs] Webhook falhou: HTTP ${res.status}`, detail.slice(0, 200));
    return { ok: false, status: res.status };
  }

  return { ok: true };
}

/**
 * @param {'auth'|'admin'|'cms'|'errors'|'general'} kind
 */
export async function sendSiteLog(kind, { title, description, fields = [], color }) {
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

  const payload = { embeds: [embed] };

  try {
    const channels = await ensureLogChannels();
    if (!channels.ok) {
      console.warn("[discord-logs] Canais não prontos:", channels.reason ?? "erro");
    }

    const channelId = getLogChannelId(kind);
    if (channelId) {
      const sent = await postToChannel(channelId, payload);
      if (sent.ok) return { ok: true, via: "channel" };
    }

    const webhook = await postToWebhook(payload);
    if (webhook.ok) return { ok: true, via: "webhook" };

    console.warn(`[discord-logs] Não enviou log "${kind}" — canal e webhook indisponíveis`);
    return { ok: false, reason: "delivery_failed" };
  } catch (err) {
    console.error("[discord-logs]", kind, err);
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
