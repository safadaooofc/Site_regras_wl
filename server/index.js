import express from "express";
import cookieSession from "cookie-session";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "../scripts/load-env.mjs";
import { addUserToReuelGuilds, isAutoJoinEnabled } from "./discord-auto-join.mjs";
import { handleDiscordInteraction } from "./discord-bot.mjs";
import { runDiscordStartupCheck } from "./discord-startup.mjs";
import { logAuth, logError, logGeneral } from "./discord-logs.mjs";
import { verifyDiscordRequest } from "./discord-verify.mjs";
import { createApiRouter, refreshSessionAdmin } from "./routes/api.mjs";
import { ADMIN_ROLE_LABELS } from "./admin-registry.mjs";
import { getAdminCapabilities } from "./admin-permissions.mjs";

loadEnvFile();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
/** URL pública do site (Vite :5173 em dev; Discloud em produção). */
const BASE_URL = (process.env.BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");
const REDIRECT_URI = `${BASE_URL}/auth/callback`;

function redirectToApp(res, targetPath = "/") {
  const pathPart = targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
  res.redirect(`${BASE_URL}${pathPart}`);
}

const app = express();

app.set("trust proxy", 1);

/** Discord slash commands — corpo bruto para assinatura Ed25519 */
app.post(
  "/discord/interactions",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const rawBody = req.body?.toString("utf8") ?? "";
    if (!verifyDiscordRequest(req, rawBody)) {
      console.warn("[discord/interactions] Assinatura inválida — confira DISCORD_PUBLIC_KEY");
      return res.status(401).send("invalid request signature");
    }
    try {
      const body = JSON.parse(rawBody);
      const { status, data } = await handleDiscordInteraction(body);
      res.status(status).json(data);
    } catch (err) {
      console.error("[discord/interactions]", err);
      await logError("Interaction handler", String(err?.message ?? err));
      res.status(500).json({ error: "internal_error" });
    }
  }
);

app.use(express.json({ limit: "2mb" }));

app.use(
  cookieSession({
    name: "reuel_session",
    keys: [process.env.SESSION_SECRET || "dev-secret-change-me"],
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
);

function getAvatarUrl(user) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  const index = (BigInt(user.id) >> 22n) % 6n;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

app.get("/auth/login", (req, res) => {
  if (!DISCORD_CLIENT_ID) {
    return res.status(500).json({ error: "DISCORD_CLIENT_ID not configured" });
  }
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: isAutoJoinEnabled() ? "identify guilds.join" : "identify",
  });
  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code || !DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
    await logAuth("Login falhou", "Callback sem código ou OAuth não configurado", []);
    return redirectToApp(res, "/?auth_error=1");
  }

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) {
      await logAuth("Login falhou", "Troca de código OAuth recusada pelo Discord", []);
      return redirectToApp(res, "/?auth_error=1");
    }
    const { access_token } = await tokenRes.json();

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userRes.ok) {
      await logAuth("Login falhou", "Não foi possível obter perfil @me", []);
      return redirectToApp(res, "/?auth_error=1");
    }
    const profile = await userRes.json();

    req.session.user = {
      id: profile.id,
      username: profile.username,
      globalName: profile.global_name || null,
      avatar: profile.avatar || null,
      avatarUrl: getAvatarUrl(profile),
    };

    await refreshSessionAdmin(req);

    const joinResult = await addUserToReuelGuilds(profile.id, access_token);

    await logAuth("Login no site", `<@${profile.id}> entrou`, [
      { name: "Usuário", value: profile.global_name || profile.username, inline: true },
      {
        name: "Admin painel",
        value: req.session.isAdmin
          ? ADMIN_ROLE_LABELS[req.session.adminRole] ?? req.session.adminRole
          : "Não",
        inline: true,
      },
      {
        name: "Auto-join",
        value: joinResult.disabled
          ? "Desativado"
          : `+${joinResult.joined.length} novo(s), ${joinResult.alreadyMember.length} já membro`,
        inline: false,
      },
    ]);
    req.session.discordJoin = {
      joined: joinResult.joined.length,
      alreadyMember: joinResult.alreadyMember.length,
      failed: joinResult.failed.length,
    };

    let joinQuery = "";
    if (!joinResult.disabled && joinResult.failed.length > 0) {
      joinQuery =
        joinResult.joined.length + joinResult.alreadyMember.length > 0
          ? "?discord_join=partial"
          : "?discord_join=failed";
    }

    redirectToApp(res, `/${joinQuery}`);
  } catch (err) {
    await logError("Erro no callback OAuth", String(err?.message ?? err));
    redirectToApp(res, "/?auth_error=1");
  }
});

app.get("/auth/me", async (req, res) => {
  if (req.session?.user && req.session.isAdmin === undefined) {
    await refreshSessionAdmin(req);
  }
  res.json({
    user: req.session.user || null,
    isAdmin: Boolean(req.session.isAdmin),
    adminRole: req.session.adminRole ?? null,
    adminSource: req.session.adminSource ?? null,
    capabilities: getAdminCapabilities(req.session.adminRole),
  });
});

app.get("/auth/logout", async (req, res) => {
  const who = req.session?.user;
  if (who) {
    await logAuth("Logout", `<@${who.id}> saiu do site`, [
      { name: "Usuário", value: who.globalName || who.username, inline: true },
    ]);
  }
  req.session = null;
  redirectToApp(res, "/");
});

app.get("/api/health/discord", async (_req, res) => {
  const { validateBotToken } = await import("./discord-startup.mjs");
  const token = await validateBotToken();
  res.json({
    botToken: token.ok ? "ok" : "invalid",
    botUsername: token.ok ? token.username : null,
    publicKey: Boolean(process.env.DISCORD_PUBLIC_KEY?.trim()),
    supportGuildId: process.env.DISCORD_SUPPORT_GUILD_ID?.trim() || null,
    interactionsPath: "/discord/interactions",
    note: "Bot pode aparecer offline no Discord; slash commands usam esta URL.",
  });
});

app.use("/api", createApiRouter());

/** Proxy do widget Discord — evita CORS no browser em produção. */
app.get("/api/discord/guilds/:guildId/widget.json", async (req, res) => {
  const { guildId } = req.params;
  try {
    const upstream = await fetch(
      `https://discord.com/api/guilds/${encodeURIComponent(guildId)}/widget.json`,
      { headers: { Accept: "application/json" } }
    );
    const body = await upstream.text();
    res
      .status(upstream.status)
      .type(upstream.headers.get("content-type") || "application/json")
      .send(body);
  } catch {
    res.status(502).json({ error: "discord_proxy_failed" });
  }
});

app.use(express.static(distDir, { index: false }));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`[reuel] http://${HOST}:${PORT}`);

  runDiscordStartupCheck(BASE_URL).catch((e) => console.warn("[reuel] discord startup:", e));

  logGeneral("Servidor iniciado", `API em ${BASE_URL}`, [
    { name: "Porta", value: String(PORT), inline: true },
  ]).catch(() => {});
});
