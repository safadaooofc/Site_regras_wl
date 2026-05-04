/**
 * Lista imagens em `public/` e grava `src/generated/public-images.json`.
 * Executado em predev/prebuild — adicione PNG, JPG, WebP, etc. em public/ e rode de novo o dev.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const outFile = path.join(root, "src", "generated", "public-images.json");

const EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".bmp",
  ".avif",
  ".ico",
]);

/** Não exibir na galeria (ícones do site). */
const EXCLUDE_NAMES = new Set(
  [
    "favicon.svg",
    "favicon.ico",
    "favicon.png",
    "apple-touch-icon.png",
  ].map((n) => n.toLowerCase())
);

function walk(dir, relBase = "") {
  const urls = [];
  if (!fs.existsSync(dir)) return urls;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(relBase, name.name);
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      urls.push(...walk(full, rel));
    } else {
      const ext = path.extname(name.name).toLowerCase();
      if (!EXT.has(ext)) continue;
      if (EXCLUDE_NAMES.has(name.name.toLowerCase())) continue;
      const url = "/" + rel.split(path.sep).join("/");
      urls.push(url);
    }
  }
  return urls;
}

const images = walk(publicDir).sort((a, b) => a.localeCompare(b, "pt-BR"));
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(images, null, 2) + "\n", "utf8");
console.log(
  `[public-images] ${images.length} ficheiro(s) → src/generated/public-images.json`
);
