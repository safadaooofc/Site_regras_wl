/**
 * Copia arquivos de conteúdo da raiz para src/content/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const destDir = path.join(root, "src", "content");

const COPIES = [
  ["equipe.txt", "equipe.txt"],
  ["regrasEB.txt", "regrasEB.txt"],
  [
    "742126485-Regras-Basicas-de-Recrutamento.txt",
    "regras-basicas-recrutamento.txt",
  ],
  ["894189934-Manual-Do-Cabo-v4.txt", "manual-cabo.txt"],
];

for (const [srcName, destName] of COPIES) {
  const src = path.join(root, srcName);
  const dest = path.join(destDir, destName);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-content] ignorado (não existe): ${srcName}`);
    continue;
  }
  const size = fs.statSync(src).size;
  if (size === 0) {
    console.warn(`[sync-content] AVISO: ${srcName} está vazio (0 bytes)`);
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[sync-content] ${srcName} → src/content/${destName} (${size} bytes)`);
}
