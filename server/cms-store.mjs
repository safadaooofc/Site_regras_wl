import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseEquipe } from "./parse-equipe.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const CMS_PATH = path.join(DATA_DIR, "cms.json");
const CONTENT_DIR = path.join(__dirname, "..", "src", "content");

function slugify(title, index, prefix = "sec") {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${prefix}-${base || "item"}-${index}`;
}

function readContentFile(name) {
  const p = path.join(CONTENT_DIR, name);
  if (!existsSync(p)) return "";
  return readFileSync(p, "utf8");
}

function splitRuleSections(raw, prefix) {
  const chunks = raw
    .replace(/\r\n/g, "\n")
    .split(/\n---\n/)
    .map((c) => c.trim())
    .filter(Boolean);

  return chunks.map((chunk, i) => {
    const lines = chunk.split("\n").filter((l) => l.trim());
    const title = (lines[0] ?? "Seção").trim().slice(0, 120);
    const body = lines.slice(1).join("\n").trim() || chunk;
    return {
      id: slugify(title, i, prefix),
      title,
      body,
    };
  });
}

function defaultRpRules() {
  const raw = readContentFile("regrasrp.txt");
  const sections = splitRuleSections(raw, "rp");
  return {
    categories: [
      {
        id: "geral",
        label: "Regras RP",
        order: 0,
        sections: sections.length ? sections : [{ id: "rp-vazio", title: "Sem conteúdo", body: "" }],
      },
    ],
  };
}

function defaultEbRules() {
  const basicas = readContentFile("regras-basicas-recrutamento.txt");
  const eb = readContentFile("regrasEB.txt");
  const manual = readContentFile("manual-cabo.txt");

  return {
    categories: [
      {
        id: "recrutamento",
        label: "Manual de recrutamento",
        order: 0,
        sections: splitRuleSections(basicas, "eb-rec").concat(splitRuleSections(eb, "eb-reg")),
      },
      {
        id: "manual-cabo",
        label: "Manual do Cabo (ESA)",
        order: 1,
        sections: splitRuleSections(manual, "eb-cabo"),
      },
    ],
  };
}

export function createDefaultCms() {
  return {
    version: 1,
    announcements: [],
    rulesRp: defaultRpRules(),
    rulesEb: defaultEbRules(),
    team: { teams: parseEquipe(readContentFile("equipe.txt")) },
    updatedAt: new Date().toISOString(),
    updatedBy: null,
  };
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function loadCms() {
  ensureDataDir();
  if (!existsSync(CMS_PATH)) {
    const initial = createDefaultCms();
    saveCms(initial);
    return initial;
  }

  try {
    return JSON.parse(readFileSync(CMS_PATH, "utf8"));
  } catch {
    const initial = createDefaultCms();
    saveCms(initial);
    return initial;
  }
}

export function saveCms(data) {
  ensureDataDir();
  data.updatedAt = new Date().toISOString();
  const tmp = `${CMS_PATH}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  renameSync(tmp, CMS_PATH);
  return data;
}

export function importCmsFromFiles(updatedBy = null) {
  const data = createDefaultCms();
  data.updatedBy = updatedBy;
  return saveCms(data);
}

function normalizeAnnouncement(a, index) {
  return {
    order: index,
    position: "after-hero",
    color: "blue",
    active: true,
    ...a,
    position: a.position ?? "after-hero",
    color: a.color ?? "blue",
    order: typeof a.order === "number" ? a.order : index,
  };
}

export function getActiveAnnouncements(cms) {
  return (cms.announcements ?? [])
    .map((a, i) => normalizeAnnouncement(a, i))
    .filter((a) => a.active !== false)
    .sort((a, b) => a.order - b.order);
}
