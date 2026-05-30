import { findSiteAdmin } from "./admin-registry.mjs";

/** Quem pode editar cada área do painel conforme categoria. */
export function getAdminCapabilities(role) {
  if (!role) {
    return {
      announcements: false,
      rulesRp: false,
      rulesEb: false,
      team: false,
      manageAdmins: false,
      importCms: false,
    };
  }

  if (role === "super" || role === "support") {
    return {
      announcements: true,
      rulesRp: true,
      rulesEb: true,
      team: true,
      manageAdmins: role === "super" || role === "support",
      importCms: true,
    };
  }

  if (role === "rp") {
    return {
      announcements: true,
      rulesRp: true,
      rulesEb: false,
      team: true,
      manageAdmins: false,
      importCms: false,
    };
  }

  if (role === "eb") {
    return {
      announcements: true,
      rulesRp: false,
      rulesEb: true,
      team: true,
      manageAdmins: false,
      importCms: false,
    };
  }

  return {
    announcements: false,
    rulesRp: false,
    rulesEb: false,
    team: false,
    manageAdmins: false,
    importCms: false,
  };
}

export function filterCmsByRole(cms, role, body) {
  const caps = getAdminCapabilities(role);
  const next = { ...cms };

  if (caps.announcements && body.announcements !== undefined) {
    next.announcements = body.announcements;
  }
  if (caps.rulesRp && body.rulesRp !== undefined) {
    next.rulesRp = body.rulesRp;
  }
  if (caps.rulesEb && body.rulesEb !== undefined) {
    next.rulesEb = body.rulesEb;
  }
  if (caps.team && body.team !== undefined) {
    if (role === "rp" || role === "eb") {
      const branch = role;
      const other = cms.team.teams.filter((t) => t.branch !== branch);
      const incoming = (body.team.teams ?? []).filter((t) => t.branch === branch);
      next.team = { teams: [...other, ...incoming] };
    } else {
      next.team = body.team;
    }
  }

  return next;
}

export function getRegistryRole(userId) {
  return findSiteAdmin(userId)?.role ?? null;
}
