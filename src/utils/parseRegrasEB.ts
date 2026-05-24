export type EbRuleCategory = "recrutamento" | "manual-cabo" | "regulamento";

export const EB_CATEGORY_ORDER: EbRuleCategory[] = [
  "recrutamento",
  "manual-cabo",
  "regulamento",
];

export const EB_CATEGORY_LABELS: Record<EbRuleCategory, string> = {
  recrutamento: "Manual de recrutamento",
  "manual-cabo": "Manual do Cabo (ESA)",
  regulamento: "Regulamento EB",
};

export type ParsedEbSection = {
  id: string;
  title: string;
  body: string;
  category: EbRuleCategory;
  source?: string;
};

const RECRUITMENT_MARKERS = [
  "REGRAS PARA APLICAÇÃO DE UM RECRUTAMENTO:",
  "Parte Teórica:",
  "Comandos de Resposta:",
  "Comandos de Formação:",
  "Comandos de Marcha:",
  "Comandos de Pelotão de Tiro:",
  "Comandos Falsos:",
  "JJ's:",
  "Comunicações:",
  "Comandos de Mão:",
  "Pronomes:",
  "Avaliação:",
] as const;

function slugify(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);
  return `eb-${base || "secao"}-${index}`;
}

function cleanPdfNoise(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\f/g, "\n")
    .replace(/\nEscola de Sargentos das Armas\n/gi, "\n")
    .replace(/^\s*\d{1,3}\s*$/gm, "")
    .replace(/\.{4,}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitRecruitment(raw: string, source: string): ParsedEbSection[] {
  if (!raw.trim()) return [];

  const pattern = new RegExp(
    `(?:^|\\n)(?=${RECRUITMENT_MARKERS.map((m) =>
      m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    ).join("|")})`,
    "m"
  );

  const parts = raw.split(pattern).map((p) => p.trim()).filter(Boolean);
  const blocks: ParsedEbSection[] = [];
  let idx = 0;

  for (const part of parts) {
    const lines = part.split("\n");
    const first = (lines[0] ?? "").trim();
    const isMarker = RECRUITMENT_MARKERS.some((m) => first === m || first.startsWith(m));

    let title: string;
    let body: string;

    if (isMarker) {
      title = first.replace(/:$/, "");
      body = lines.slice(1).join("\n").trim();
    } else {
      const titleLine = first.replace(/^EB\]\s*/i, "").trim() || "Introdução ao recrutamento";
      title = titleLine.length > 80 ? "Introdução ao recrutamento" : titleLine;
      body = part;
    }

    blocks.push({
      id: slugify(`${source}-${title}`, idx),
      title,
      body,
      category: "recrutamento",
      source,
    });
    idx += 1;
  }
  return blocks;
}

function splitRegulamento(raw: string): ParsedEbSection[] {
  const chunks = raw
    .split(/\n---\n/)
    .map((c) => c.trim())
    .filter(Boolean);

  return chunks.map((chunk, i) => {
    const lines = chunk.split("\n").filter((l) => l.trim() !== "");
    const title = (lines[0] ?? "Seção").trim();
    const body = lines.slice(1).join("\n").trim();
    return {
      id: slugify(`reg-${title}`, i),
      title,
      body,
      category: "regulamento" as const,
      source: "regrasEB.txt",
    };
  });
}

export function parseRegrasEB(raw: string): ParsedEbSection[] {
  const clean = raw.replace(/\r\n/g, "\n").trim();
  if (!clean) return [];

  const rulesIdx = clean.indexOf("📜 REGRAS DO EXÉRCITO BRASILEIRO");

  const recruitmentRaw =
    rulesIdx === -1 ? clean : clean.slice(0, rulesIdx).trim();
  const regulamentoRaw =
    rulesIdx === -1
      ? ""
      : clean
          .slice(rulesIdx)
          .replace(/^📜 REGRAS DO EXÉRCITO BRASILEIRO \(EB\)\s*/i, "")
          .trim();

  return [
    ...splitRecruitment(recruitmentRaw, "regrasEB.txt"),
    ...splitRegulamento(regulamentoRaw),
  ];
}

/** 742126485 — Regras básicas de recrutamento (blocos separados por =====). */
export function parseRegrasBasicas(raw: string): ParsedEbSection[] {
  const clean = raw.replace(/\r\n/g, "\n").replace(/\f/g, "").trim();
  if (!clean) return [];

  const parts = clean.split(/\n={12,}\s*\n/).map((p) => p.trim()).filter(Boolean);
  const out: ParsedEbSection[] = [];
  let idx = 0;

  for (const part of parts) {
    const lines = part.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim());
    if (lines.length === 0) continue;

    let title = "Seção";
    let bodyStart = 0;
    const first = lines[0].trim();

    const dashedTitle = first.match(/^[-=]{8,}\s*(.+?)\s*[-=]{8,}$/);
    if (dashedTitle) {
      title = dashedTitle[1].trim();
      bodyStart = 1;
    } else if (!first.match(/^[-=]+$/)) {
      title = first.replace(/;+\s*$/, "").trim();
      bodyStart = 1;
    }

    const body = lines.slice(bodyStart).join("\n").trim();
    if (!body && title === "Seção") continue;

    out.push({
      id: slugify(`basicas-${title}`, idx),
      title,
      body: body || part,
      category: "recrutamento",
      source: "Regras básicas de recrutamento",
    });
    idx += 1;
  }

  return out;
}

/** Manual do Cabo v4 — seções 1 a 5 (corpo do documento, sem sumário). */
export function parseManualCabo(raw: string): ParsedEbSection[] {
  const cleaned = cleanPdfNoise(raw);
  if (!cleaned) return [];

  const bodyStart = cleaned.search(
    /\n1\.\s+ORDEM DE APRESENTAÇÃO DOS CABOS\s*\n\s*Bem-vindos/i
  );
  const body = bodyStart === -1 ? cleaned : cleaned.slice(bodyStart + 1);

  const parts = body.split(
    /\n(?=\d+\.\s+(?:ORDEM DE APRESENTAÇÃO|TABELA DE PONTUAÇÃO|PROCEDIMENTOS OPERACIONAIS|REGRAS ESSENCIAIS|DIRETRIZES PARA PROMOÇÃO))/i
  );

  const out: ParsedEbSection[] = [];
  const seenTitles = new Set<string>();
  let idx = 0;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const lines = trimmed.split("\n");
    const titleLine = (lines[0] ?? "").trim();
    let title = titleLine
      .replace(/^\d+\.\s*/, "")
      .replace(/\s*\(\s*COMPUTADOR.*$/i, "")
      .replace(/\s+\d{1,3}\s*$/, "")
      .trim();

    if (!title) continue;

    const sectionBody = lines.slice(1).join("\n").trim();
    if (sectionBody.length < 100) continue;
    if (seenTitles.has(title)) continue;
    seenTitles.add(title);

    out.push({
      id: slugify(`manual-${title}`, idx),
      title,
      body: sectionBody,
      category: "manual-cabo",
      source: "Manual do Cabo v4",
    });
    idx += 1;
  }

  return out;
}

export function mergeEbSections(...groups: ParsedEbSection[][]): ParsedEbSection[] {
  return groups.flat();
}

export function countEbByCategory(
  sections: ParsedEbSection[]
): Record<EbRuleCategory, number> {
  const counts = {
    recrutamento: 0,
    "manual-cabo": 0,
    regulamento: 0,
  } satisfies Record<EbRuleCategory, number>;
  for (const s of sections) counts[s.category] += 1;
  return counts;
}
