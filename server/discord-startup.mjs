import { getSupportGuildId } from "./discord-channels.mjs";
import { registerSupportGuildCommands } from "./discord-bot.mjs";
import { ensureLogChannels } from "./discord-channels.mjs";

/**
 * Valida o token do bot na API do Discord.
 */
export async function validateBotToken() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) {
    return { ok: false, reason: "DISCORD_BOT_TOKEN está vazio" };
  }

  const parts = token.split(".");
  if (parts.length < 3) {
    return {
      ok: false,
      reason:
        "Token inválido (formato errado). Use Bot → Reset Token no Developer Portal — não use Client ID nem Client Secret.",
    };
  }

  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bot ${token}` },
  });

  if (res.status === 401) {
    return {
      ok: false,
      reason:
        "Discord rejeitou o token (401). Gere um NOVO token em: Developer Portal → Bot → Reset Token.",
    };
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, reason: `API Discord respondeu ${res.status}: ${body.slice(0, 120)}` };
  }

  const bot = await res.json();
  return { ok: true, id: bot.id, username: bot.username };
}

export async function runDiscordStartupCheck(baseUrl) {
  console.log("[discord] ─── Verificação do bot ───");

  const tokenCheck = await validateBotToken();
  if (!tokenCheck.ok) {
    console.error("[discord] FALHA:", tokenCheck.reason);
    console.error("[discord] Comandos /setup-logs e /add-admin NÃO vão funcionar até corrigir o token.");
    return { ok: false, token: tokenCheck };
  }

  console.log(`[discord] Token OK — bot @${tokenCheck.username} (${tokenCheck.id})`);
  console.log(
    "[discord] O bot pode aparecer OFFLINE na lista de membros. Isso é normal: comandos usam HTTPS, não conexão 24h."
  );

  const publicKey = process.env.DISCORD_PUBLIC_KEY?.trim();
  if (!publicKey || publicKey.length < 32) {
    console.warn("[discord] DISCORD_PUBLIC_KEY ausente ou curto — slash commands falham (401 na assinatura).");
  } else {
    console.log("[discord] Public Key configurada");
  }

  const guildId = getSupportGuildId();
  if (!guildId) {
    console.warn("[discord] DISCORD_SUPPORT_GUILD_ID vazio");
  } else {
    console.log(`[discord] Servidor suporte: ${guildId}`);
  }

  const interactionsUrl = `${(baseUrl || "").replace(/\/$/, "")}/discord/interactions`;
  console.log(`[discord] Interactions URL (cole no Developer Portal): ${interactionsUrl}`);

  const registered = await registerSupportGuildCommands();
  if (!registered) {
    console.warn("[discord] Comandos slash NÃO registrados — veja erros acima");
  }

  const channels = await ensureLogChannels();
  if (channels.ok && channels.created) {
    console.log("[discord] Canais de log criados no servidor de suporte");
  } else if (channels.ok) {
    console.log("[discord] Canais de log já existiam (IDs reutilizados)");
  } else {
    console.warn("[discord] Canais de log não criados:", channels.reason ?? "erro");
  }

  console.log("[discord] ─── Fim da verificação ───");
  return { ok: tokenCheck.ok && registered, token: tokenCheck, commands: registered, channels };
}
