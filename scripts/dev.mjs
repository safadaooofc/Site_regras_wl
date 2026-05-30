import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "./load-env.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWin = process.platform === "win32";
const children = [];

function runSyncScript(name) {
  const r = spawnSync("node", [path.join("scripts", name)], {
    cwd: root,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function spawnProc(label, command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: isWin,
    env: { ...process.env, ...extraEnv },
  });
  child.on("exit", (code, signal) => {
    if (signal === "SIGTERM" || signal === "SIGINT") return;
    if (code !== 0 && code !== null) {
      console.error(`[dev] ${label} encerrou com código ${code}`);
      shutdown(code ?? 1);
    }
  });
  children.push(child);
  return child;
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill("SIGTERM");
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

loadEnvFile();

runSyncScript("sync-content.mjs");
runSyncScript("generate-public-images-manifest.mjs");

const apiPort = process.env.API_PORT || "8080";

console.log("[dev] API OAuth em http://localhost:" + apiPort);
console.log("[dev] Front (Vite) em http://localhost:5173");
console.log("[dev] Use BASE_URL=http://localhost:5173 no .env para OAuth local\n");

spawnProc("api", "node", ["server/index.js"], { PORT: apiPort });

await new Promise((r) => setTimeout(r, 600));

spawnProc("vite", "node", ["node_modules/vite/bin/vite.js"]);
