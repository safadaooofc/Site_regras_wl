export type TeamBranch = "rp" | "eb";

export type TeamMember = {
  name: string;
  note?: string;
};

export type TeamGroup = {
  role: string;
  members: TeamMember[];
};

export type ParsedTeam = {
  branch: TeamBranch;
  label: string;
  groups: TeamGroup[];
};

const SECTION_MARKERS: { pattern: RegExp; branch: TeamBranch; label: string }[] = [
  { pattern: /^===\s*ROLEPLAY\s*===$/i, branch: "rp", label: "Capital do MT BR" },
  { pattern: /^===\s*EB\s*===$/i, branch: "eb", label: "Exército Brasileiro" },
];

const BLOCK_HEADER = /^\[([^\]]+)\]\s*$/;

function parseMemberLine(line: string): TeamMember | null {
  const t = line.trim();
  if (!t || t.startsWith("#") || BLOCK_HEADER.test(t)) return null;
  if (/^===\s*.+\s*===$/.test(t)) return null;
  if (/^Aqui está a transcrição/i.test(t)) return null;
  if (/^Categoria do Servidor/i.test(t)) return null;
  if (/^Cargos Individuais/i.test(t)) return null;

  const discordTag = t.match(/^\[\[([^\]]+)\]\]\s*(?:\(Pertencente ao usuário\s+([^)]+)\))?/i);
  if (discordTag) {
    const note = discordTag[1];
    const name = (discordTag[2] ?? "").trim();
    return name ? { name, note } : null;
  }

  const bracketRole = t.match(/^\[[^\]]+\]\s+(.+)$/);
  if (bracketRole) {
    return { name: bracketRole[1].trim() };
  }

  const pipe = t.split("|").map((s) => s.trim());
  if (pipe.length >= 2) {
    return { name: pipe[0], note: pipe.slice(1).join(" | ") };
  }

  if (/^sub\s+dono\b/i.test(t)) {
    return { name: t, note: "Sub-dono" };
  }

  if (/^dono\s+/i.test(t)) {
    return { name: t.replace(/^dono\s+/i, "").trim() };
  }

  return { name: t };
}

function parseBlockFormat(lines: string[]): TeamGroup[] {
  const groups: TeamGroup[] = [];
  let current: TeamGroup | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const header = line.match(BLOCK_HEADER);
    if (header) {
      if (current && current.members.length > 0) groups.push(current);
      current = { role: header[1].trim(), members: [] };
      continue;
    }

    const member = parseMemberLine(line);
    if (!member) continue;

    if (!current) {
      current = { role: "Equipe", members: [] };
    }
    current.members.push(member);
  }

  if (current && current.members.length > 0) groups.push(current);
  return groups;
}

/** Formato antigo (cabeçalhos soltos + “exercito brasileiro”). */
function parseLegacy(raw: string): ParsedTeam[] {
  const RP_HEADERS = new Set(
    ["desenvolvedores", "dono", "co fundadores", "syroevusir", "staffs", "staff"].map(
      (s) => s.toLowerCase()
    )
  );
  const EB_HEADERS = new Set(
    ["maneger", "manager", "dono", "liderança", "lideranca"].map((s) => s.toLowerCase())
  );

  const parts = raw.split(/\nexercito brasileiro\b/i);
  const out: ParsedTeam[] = [];

  const parseLegacyBlock = (lines: string[], headers: Set<string>, branch: TeamBranch, label: string) => {
    const groups: TeamGroup[] = [];
    let current: TeamGroup | null = null;

    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      if (headers.has(t.toLowerCase())) {
        if (current?.members.length) groups.push(current);
        current = { role: t, members: [] };
      } else if (current) {
        const m = parseMemberLine(t);
        if (m) current.members.push(m);
      }
    }
    if (current?.members.length) groups.push(current);
    if (groups.length) out.push({ branch, label, groups });
  };

  const rpLines = (parts[0] ?? "")
    .replace(/^roleplay\s*/i, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  parseLegacyBlock(rpLines, RP_HEADERS, "rp", "Capital do MT BR");

  const ebLines = (parts[1] ?? "")
    .replace(/^\s*EB\s*/i, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  parseLegacyBlock(ebLines, EB_HEADERS, "eb", "Exército Brasileiro");

  return out;
}

function parseStructured(raw: string): ParsedTeam[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const out: ParsedTeam[] = [];
  let branch: TeamBranch | null = null;
  let label = "";
  let sectionLines: string[] = [];

  const flush = () => {
    if (!branch) return;
    const groups = parseBlockFormat(sectionLines);
    if (groups.length > 0) out.push({ branch, label, groups });
    sectionLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const marker = SECTION_MARKERS.find((m) => m.pattern.test(line));
    if (marker) {
      flush();
      branch = marker.branch;
      label = marker.label;
      continue;
    }
    if (branch) sectionLines.push(rawLine);
  }
  flush();
  return out;
}

export function parseEquipe(raw: string): ParsedTeam[] {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  const structured = parseStructured(text);
  if (structured.length > 0) return structured;

  return parseLegacy(text);
}
