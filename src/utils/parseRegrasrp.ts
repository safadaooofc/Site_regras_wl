export type RuleCategory =
  | "geral"
  | "faccoes"
  | "corporacao"
  | "discord"
  | "codigo-penal";

export const CATEGORY_ORDER: RuleCategory[] = [
  "geral",
  "faccoes",
  "corporacao",
  "discord",
  "codigo-penal",
];

export const CATEGORY_LABELS: Record<RuleCategory, string> = {
  geral: "Termos de RP & geral",
  faccoes: "Facções & organizações",
  corporacao: "Corporação & SAMU",
  discord: "Discord",
  "codigo-penal": "Código penal",
};

export type ParsedRuleSection = {
  id: string;
  title: string;
  body: string;
  category: RuleCategory;
};

function preprocess(raw: string): string {
  let s = raw.replace(/\r\n/g, "\n");
  /* Trecho solto no arquivo original antes das regras de corporação */
  s = s.replace(/\nIA\.\s*\n(?=# Art\.7)/, "\n◤ CORPORAÇÃO ◢\n");
  return s.trim();
}

function slugify(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);
  return `${base || "secao"}-${index}`;
}

function categorize(title: string): RuleCategory {
  const t = title.trim();
  const u = t.toUpperCase();

  if (/^[🚓🔫⚖️🔴⛔]/.test(t)) return "codigo-penal";
  if (
    /CRIMES DE TRÂNSITO|ROUBOS EM GERAL|CRIMES HEDIONDOS|CRIMES GERAIS|PENA MÁXIMA/i.test(
      t
    )
  ) {
    return "codigo-penal";
  }

  if (u.includes("REGRAS DO DISCORD")) return "discord";

  const fac = [
    "DEVERES DO MEMBRO",
    "ASSALTO A CIVIL",
    "ASSALTO A LOJA",
    "ASSALTO A CAIXAS ELETRÔNICOS",
    "FAVELAS",
    "ALIANÇAS",
    "TRÁFICO DE ARMAS",
    "SEQUESTROS EM GERAL",
    "SEQUESTRO ENTRE FACÇÕES",
    "SEQUESTRO DE RUA",
    "FAC X FAC",
  ];
  if (fac.some((k) => u.includes(k))) return "faccoes";

  const corp = [
    "CORPORAÇÃO",
    "CONDUTA DURANTE ABORDAGENS",
    "CONDUTA DURANTE PERSEGUIÇÕES",
    "OUTRAS OBRIGAÇÕES",
    "ENCAMINHAMENTO E QRR",
    "INVESTIGAÇÃO",
    "PACIFICAÇÃO EM FAVELAS",
    "LOJINHAS, CAIXAS ELETRÔNICOS E PORTE",
    "NORMAS DE UM SOCORRISTA",
  ];
  if (corp.some((k) => u.includes(k))) return "corporacao";

  return "geral";
}

function parseMainBlocks(text: string): { title: string; body: string }[] {
  const matches = [...text.matchAll(/◤\s*([^◢]+?)\s*◢/g)];
  if (matches.length === 0) return [];

  const blocks: { title: string; body: string }[] = [];
  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim().replace(/\s+/g, " ");
    const start = matches[i].index! + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
    const body = text.slice(start, end).trim();
    blocks.push({ title, body });
  }
  return blocks;
}

function splitCodigoPenal(raw: string): { main: string; penal: string } {
  const marker = "🚓 Crimes de trânsito";
  const idx = raw.indexOf(marker);
  if (idx === -1) return { main: raw, penal: "" };
  return {
    main: raw.slice(0, idx).trimEnd(),
    penal: raw.slice(idx).trim(),
  };
}

function parseCodigoPenalBlocks(fragment: string): { title: string; body: string }[] {
  if (!fragment.trim()) return [];
  const parts = fragment.split(/\n(?=[🚓🔫⚖️🔴⛔])/);
  return parts.map((part) => {
    const lines = part.trim().split("\n");
    const title = (lines[0] ?? "Código penal").trim();
    const body = lines.slice(1).join("\n").trim();
    return { title, body };
  });
}

export function parseRegrasrp(raw: string): ParsedRuleSection[] {
  const clean = preprocess(raw);
  const { main, penal } = splitCodigoPenal(clean);

  const mainBlocks = parseMainBlocks(main);
  const penalBlocks = parseCodigoPenalBlocks(penal);

  const out: ParsedRuleSection[] = [];
  let idx = 0;

  for (const b of mainBlocks) {
    out.push({
      id: slugify(b.title, idx),
      title: b.title,
      body: b.body,
      category: categorize(b.title),
    });
    idx += 1;
  }

  for (const b of penalBlocks) {
    out.push({
      id: slugify(b.title, idx),
      title: b.title,
      body: b.body,
      category: "codigo-penal",
    });
    idx += 1;
  }

  return out;
}

export function countByCategory(
  sections: ParsedRuleSection[]
): Record<RuleCategory, number> {
  const counts = {
    geral: 0,
    faccoes: 0,
    corporacao: 0,
    discord: 0,
    "codigo-penal": 0,
  } satisfies Record<RuleCategory, number>;
  for (const s of sections) counts[s.category] += 1;
  return counts;
}
