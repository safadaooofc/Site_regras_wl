/**
 * Diagnóstico local: node scripts/discord-diagnose.mjs
 */
import { loadEnvFile } from "./load-env.mjs";
import { runDiscordStartupCheck, validateBotToken } from "../server/discord-startup.mjs";

loadEnvFile();

console.log("=== Diagnóstico Discord (Reuel) ===\n");
console.log("BASE_URL:", process.env.BASE_URL || "(não definido)");
console.log("CLIENT_ID:", process.env.DISCORD_CLIENT_ID || "(não definido)");
console.log("SUPPORT_GUILD:", process.env.DISCORD_SUPPORT_GUILD_ID || "(não definido)");
console.log("PUBLIC_KEY:", process.env.DISCORD_PUBLIC_KEY ? `${process.env.DISCORD_PUBLIC_KEY.slice(0, 8)}…` : "(não definido)");
console.log("BOT_TOKEN:", process.env.DISCORD_BOT_TOKEN ? `${process.env.DISCORD_BOT_TOKEN.slice(0, 12)}…` : "(não definido)");
console.log("");

const token = await validateBotToken();
if (token.ok) {
  console.log("✅ Token do bot válido:", token.username, token.id);
} else {
  console.log("❌ Token do bot:", token.reason);
  console.log("\nComo corrigir:");
  console.log("1. https://discord.com/developers/applications");
  console.log("2. Sua app → Bot → Reset Token → copiar");
  console.log("3. Colar em DISCORD_BOT_TOKEN (Discloud + .env local)");
  process.exit(1);
}

await runDiscordStartupCheck(process.env.BASE_URL);
console.log("\nSe na Discloud: confira Interactions URL e app ONLINE antes de testar /setup-logs");
