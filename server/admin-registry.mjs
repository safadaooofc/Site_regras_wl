import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const ADMINS_PATH = path.join(DATA_DIR, "admins.json");

/** super = site completo | support = central suporte | rp | eb */
export const ADMIN_ROLES = ["super", "support", "rp", "eb"];

export const ADMIN_ROLE_LABELS = {
  super: "Administrador geral (site)",
  support: "Suporte central",
  rp: "Filial RP",
  eb: "Filial EB",
};

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function defaultData() {
  return { version: 1, users: [] };
}

export function loadAdmins() {
  ensureDir();
  if (!existsSync(ADMINS_PATH)) {
    const initial = defaultData();
    saveAdmins(initial);
    return initial;
  }
  try {
    return JSON.parse(readFileSync(ADMINS_PATH, "utf8"));
  } catch {
    const initial = defaultData();
    saveAdmins(initial);
    return initial;
  }
}

export function saveAdmins(data) {
  ensureDir();
  const tmp = `${ADMINS_PATH}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  renameSync(tmp, ADMINS_PATH);
  return data;
}

export function findSiteAdmin(userId) {
  const data = loadAdmins();
  return data.users.find((u) => u.id === userId) ?? null;
}

export function listSiteAdmins() {
  return loadAdmins().users;
}

export function addSiteAdmin({ id, username, globalName, role, addedBy }) {
  if (!ADMIN_ROLES.includes(role)) {
    throw new Error(`invalid_role: ${role}`);
  }

  const data = loadAdmins();
  const existing = data.users.findIndex((u) => u.id === id);
  const entry = {
    id,
    username: username ?? null,
    globalName: globalName ?? null,
    role,
    addedBy,
    addedAt: new Date().toISOString(),
  };

  if (existing >= 0) {
    data.users[existing] = { ...data.users[existing], ...entry };
  } else {
    data.users.push(entry);
  }

  saveAdmins(data);
  return entry;
}

export function removeSiteAdmin(userId) {
  const data = loadAdmins();
  const before = data.users.length;
  data.users = data.users.filter((u) => u.id !== userId);
  saveAdmins(data);
  return before !== data.users.length;
}
