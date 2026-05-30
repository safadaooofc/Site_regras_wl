/** Parser equipe.txt (espelho de src/utils/parseEquipe.ts, sem TypeScript). */

const SECTION_MARKERS = [
  { pattern: /^===\s*ROLEPLAY\s*===$/i, branch: "rp", label: "Capital do MT BR" },
  { pattern: /^===\s*EB\s*===$/i, branch: "eb", label: "Exército Brasileiro" },
];

const BLOCK_HEADER = /^\[([^\]]+)\]\s*$/;

function parseMemberLine(line) {
  const t = line.trim();
  if (!t || t.startsWith("#") || BLOCK_HEADER.test(t)) return null;
  if (/^===\s*.+\s*===$/.test(t)) return null;

  const discordTag = t.match(/^\[\[([^\]]+)\]\]\s*(?:\(Pertencente ao usuário\s+([^)]+)\))?/i);
  if (discordTag) {
    const note = discordTag[1];
    const name = (discordTag[2] ?? "").trim();
    return name ? { name, note } : null;
  }

  const bracketRole = t.match(/^\[[^\]]+\]\s+(.+)$/);
  if (bracketRole) return { name: bracketRole[1].trim() };

  const pipe = t.split("|").map((s) => s.trim());
  if (pipe.length >= 2) return { name: pipe[0], note: pipe.slice(1).join(" | ") };

  if (/^sub\s+dono\b/i.test(t)) return { name: t, note: "Sub-dono" };
  if (/^dono\s+/i.test(t)) return { name: t.replace(/^dono\s+/i, "").trim() };

  return { name: t };
}

function parseBlockFormat(lines) {
  const groups = [];
  let current = null;

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

    if (!current) current = { role: "Equipe", members: [] };
    current.members.push(member);
  }

  if (current && current.members.length > 0) groups.push(current);
  return groups;
}

export function parseEquipe(raw) {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  const lines = text.split("\n");
  const out = [];
  let branch = null;
  let label = "";
  let sectionLines = [];

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
