import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";

const app = express();

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
  console.log(`[capital-mt] http://${HOST}:${PORT}`);
});
