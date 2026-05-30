import type { Announcement, AnnouncementColor } from "../types/cms";

export const ANNOUNCEMENT_COLOR_LABELS: Record<AnnouncementColor, string> = {
  blue: "Azul (RP)",
  amber: "Âmbar (EB)",
  violet: "Violeta (suporte)",
  emerald: "Verde",
  rose: "Rosa",
  red: "Vermelho (alerta)",
  slate: "Neutro",
  custom: "Personalizado",
};

export const ANNOUNCEMENT_POSITION_LABELS: Record<
  NonNullable<Announcement["position"]>,
  string
> = {
  "after-hero": "Abaixo do banner principal",
  "before-hero": "Dentro do topo (abaixo do menu)",
  "sticky-top": "Faixa fixa abaixo do menu",
  "before-footer": "Antes do rodapé / CTA",
};

type StyleClasses = {
  border: string;
  bg: string;
  label: string;
  title: string;
  body: string;
};

const PRESETS: Record<Exclude<AnnouncementColor, "custom">, StyleClasses> = {
  blue: {
    border: "border-blue-500/35",
    bg: "bg-blue-950/25",
    label: "text-blue-400/90",
    title: "text-white",
    body: "text-zinc-300",
  },
  amber: {
    border: "border-amber-600/35",
    bg: "bg-amber-950/20",
    label: "text-amber-500/90",
    title: "text-white",
    body: "text-zinc-300",
  },
  violet: {
    border: "border-violet-500/35",
    bg: "bg-violet-950/25",
    label: "text-violet-300/90",
    title: "text-white",
    body: "text-zinc-300",
  },
  emerald: {
    border: "border-emerald-500/35",
    bg: "bg-emerald-950/20",
    label: "text-emerald-400/90",
    title: "text-white",
    body: "text-zinc-300",
  },
  rose: {
    border: "border-rose-500/35",
    bg: "bg-rose-950/20",
    label: "text-rose-400/90",
    title: "text-white",
    body: "text-zinc-300",
  },
  red: {
    border: "border-red-500/40",
    bg: "bg-red-950/25",
    label: "text-red-400/90",
    title: "text-white",
    body: "text-zinc-200",
  },
  slate: {
    border: "border-white/15",
    bg: "bg-white/[0.04]",
    label: "text-zinc-500",
    title: "text-white",
    body: "text-zinc-400",
  },
};

export function getAnnouncementStyles(a: Announcement): StyleClasses {
  const color = a.color ?? "blue";
  if (color === "custom") {
    return {
      border: "border-white/20",
      bg: "bg-white/[0.04]",
      label: "text-zinc-400",
      title: "text-white",
      body: "text-zinc-300",
    };
  }
  return PRESETS[color];
}

export function sortAnnouncements(items: Announcement[]): Announcement[] {
  return [...items]
    .filter((a) => a.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function branchLabel(branch: Announcement["branch"]) {
  if (branch === "rp") return "Capital MT BR";
  if (branch === "eb") return "Exército Brasileiro";
  return "Reuel";
}
