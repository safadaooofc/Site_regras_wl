import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const CHANNELS_PATH = path.join(DATA_DIR, "discord-channels.json");

const LOG_CATEGORY_NAME = "📋 Logs · Site Reuel";

/** Canais criados uma vez e reutilizados (evita duplicatas). */
export const LOG_CHANNEL_KEYS = {
  auth: { name: "🔐-auth", topic: "Logins e OAuth do site" },
  admin: { name: "👑-admin", topic: "Painel admin e permissões" },
  cms: { name: "📝-cms", topic: "Alterações de regras, equipe e anúncios" },
  errors: { name: "⚠️-erros", topic: "Erros e falhas do site" },
  general: { name: "📢-geral", topic: "Eventos gerais do site" },
};

export function getSupportGuildId() {
  return process.env.DISCORD_SUPPORT_GUILD_ID?.trim() || "";
}

function botHeaders() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) throw new Error("DISCORD_BOT_TOKEN missing");
  return {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function loadChannelRegistry() {
  ensureDataDir();
  if (!existsSync(CHANNELS_PATH)) return null;
  try {
    return JSON.parse(readFileSync(CHANNELS_PATH, "utf8"));
  } catch {
    return null;
  }
}

function saveChannelRegistry(data) {
  ensureDataDir();
  const tmp = `${CHANNELS_PATH}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  renameSync(tmp, CHANNELS_PATH);
  return data;
}

async function discordApi(path, options = {}) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    ...options,
    headers: { ...botHeaders(), ...options.headers },
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function findCategoryByName(guildId, name) {
  const { ok, json } = await discordApi(`/guilds/${guildId}/channels`);
  if (!ok || !Array.isArray(json)) return null;
  return json.find((c) => c.type === 4 && c.name === name) ?? null;
}

async function createCategory(guildId, name) {
  const { ok, json } = await discordApi(`/guilds/${guildId}/channels`, {
    method: "POST",
    body: JSON.stringify({ name, type: 4 }),
  });
  if (!ok) throw new Error(`create_category_failed: ${JSON.stringify(json)}`);
  return json;
}

async function createTextChannel(guildId, { name, topic, parentId }) {
  const { ok, json } = await discordApi(`/guilds/${guildId}/channels`, {
    method: "POST",
    body: JSON.stringify({
      name,
      topic,
      type: 0,
      parent_id: parentId,
    }),
  });
  if (!ok) throw new Error(`create_channel_failed: ${name}: ${JSON.stringify(json)}`);
  return json;
}

/**
 * Garante categoria + canais de log no servidor de suporte.
 * IDs salvos em data/discord-channels.json.
 */
export async function ensureLogChannels() {
  const guildId = getSupportGuildId();
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!guildId || !token) {
    return { ok: false, reason: "missing_config" };
  }

  let registry = loadChannelRegistry();
  if (
    registry?.guildId === guildId &&
    registry?.channels &&
    Object.keys(LOG_CHANNEL_KEYS).every((k) => registry.channels[k])
  ) {
    return { ok: true, registry, created: false };
  }

  let categoryId = registry?.categoryId;
  if (!categoryId) {
    const existing = await findCategoryByName(guildId, LOG_CATEGORY_NAME);
    categoryId = existing?.id ?? (await createCategory(guildId, LOG_CATEGORY_NAME)).id;
  }

  const channels = { ...(registry?.channels ?? {}) };

  for (const [key, meta] of Object.entries(LOG_CHANNEL_KEYS)) {
    if (channels[key]) continue;

    const { ok, json: guildChannels } = await discordApi(`/guilds/${guildId}/channels`);
    if (ok && Array.isArray(guildChannels)) {
      const existingCh = guildChannels.find(
        (c) => c.type === 0 && c.parent_id === categoryId && c.name === meta.name
      );
      if (existingCh) {
        channels[key] = existingCh.id;
        continue;
      }
    }

    const created = await createTextChannel(guildId, {
      name: meta.name,
      topic: meta.topic,
      parentId: categoryId,
    });
    channels[key] = created.id;
  }

  registry = {
    guildId,
    categoryId,
    categoryName: LOG_CATEGORY_NAME,
    channels,
    updatedAt: new Date().toISOString(),
  };

  saveChannelRegistry(registry);
  return { ok: true, registry, created: true };
}

export function getLogChannelId(kind) {
  const registry = loadChannelRegistry();
  return registry?.channels?.[kind] ?? null;
}
