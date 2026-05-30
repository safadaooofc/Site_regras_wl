export type AdminRole = "super" | "support" | "rp" | "eb";

export type AdminCapabilities = {
  announcements: boolean;
  rulesRp: boolean;
  rulesEb: boolean;
  team: boolean;
  manageAdmins: boolean;
  importCms: boolean;
};

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super: "Administrador geral",
  support: "Suporte central",
  rp: "Filial RP",
  eb: "Filial EB",
};
