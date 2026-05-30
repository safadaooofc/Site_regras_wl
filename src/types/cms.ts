export type AnnouncementColor =
  | "blue"
  | "amber"
  | "violet"
  | "emerald"
  | "rose"
  | "red"
  | "slate"
  | "custom";

export type AnnouncementPosition =
  | "after-hero"
  | "before-hero"
  | "sticky-top"
  | "before-footer";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  branch: "all" | "rp" | "eb";
  active: boolean;
  createdAt: string;
  /** Ordem na página (menor = primeiro). */
  order?: number;
  /** Onde o anúncio aparece na home. */
  position?: AnnouncementPosition;
  /** Tema de cor pré-definido. */
  color?: AnnouncementColor;
  /** Cor hex (#rrggbb) quando color = custom. */
  customColor?: string;
};

export type CmsRuleSection = {
  id: string;
  title: string;
  body: string;
};

export type CmsRuleCategory = {
  id: string;
  label: string;
  order: number;
  sections: CmsRuleSection[];
};

export type CmsRules = {
  categories: CmsRuleCategory[];
};

export type CmsTeamMember = {
  name: string;
  note?: string;
};

export type CmsTeamGroup = {
  role: string;
  members: CmsTeamMember[];
};

export type CmsTeam = {
  branch: "rp" | "eb";
  label: string;
  groups: CmsTeamGroup[];
};

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
};

export type SiteContent = {
  announcements: Announcement[];
  rulesRp: CmsRules;
  rulesEb: CmsRules;
  team: { teams: CmsTeam[] };
  settings?: SiteSettings;
  updatedAt?: string;
};

export type CmsDocument = SiteContent & {
  version: number;
  updatedBy?: string | null;
};
