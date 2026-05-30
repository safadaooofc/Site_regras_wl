export type Announcement = {
  id: string;
  title: string;
  body: string;
  branch: "all" | "rp" | "eb";
  active: boolean;
  createdAt: string;
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

export type SiteContent = {
  announcements: Announcement[];
  rulesRp: CmsRules;
  rulesEb: CmsRules;
  team: { teams: CmsTeam[] };
  updatedAt?: string;
};

export type CmsDocument = SiteContent & {
  version: number;
  updatedBy?: string | null;
};
