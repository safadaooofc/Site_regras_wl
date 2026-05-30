import { Router } from "express";
import { ADMIN_ROLE_LABELS } from "../admin-registry.mjs";
import { filterCmsByRole, getAdminCapabilities } from "../admin-permissions.mjs";
import { listSiteAdmins } from "../admin-registry.mjs";
import { resolveSiteAdmin } from "../discord-admin.mjs";
import {
  getActiveAnnouncements,
  importCmsFromFiles,
  loadCms,
  saveCms,
} from "../cms-store.mjs";
import { logCms, logGeneral } from "../discord-logs.mjs";

function requireUser(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: "login_required" });
  }
  next();
}

async function requireAdmin(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: "login_required" });
  }
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "admin_required" });
  }
  next();
}

export function createApiRouter() {
  const router = Router();

  router.get("/content", (_req, res) => {
    const cms = loadCms();
    res.json({
      announcements: getActiveAnnouncements(cms),
      rulesRp: cms.rulesRp,
      rulesEb: cms.rulesEb,
      team: cms.team,
      updatedAt: cms.updatedAt,
    });
  });

  router.get("/admin/me", requireUser, (req, res) => {
    res.json({
      user: req.session.user,
      isAdmin: Boolean(req.session.isAdmin),
      adminRole: req.session.adminRole ?? null,
      adminSource: req.session.adminSource ?? null,
      capabilities: getAdminCapabilities(req.session.adminRole),
    });
  });

  router.get("/admin/admins", requireAdmin, (req, res) => {
    const caps = getAdminCapabilities(req.session.adminRole);
    if (!caps.manageAdmins) {
      return res.status(403).json({ error: "forbidden" });
    }
    const users = listSiteAdmins().map((u) => ({
      ...u,
      roleLabel: ADMIN_ROLE_LABELS[u.role] ?? u.role,
    }));
    res.json({ users });
  });

  router.get("/admin/cms", requireAdmin, (_req, res) => {
    res.json(loadCms());
  });

  router.put("/admin/cms", requireAdmin, async (req, res) => {
    const current = loadCms();
    const body = req.body ?? {};
    const role = req.session.adminRole;

    const next = filterCmsByRole(current, role, body);
    next.updatedBy = req.session.user.id;

    saveCms(next);

    await logCms("Conteúdo publicado", `Por <@${req.session.user.id}>`, [
      { name: "Categoria admin", value: ADMIN_ROLE_LABELS[role] ?? role ?? "—", inline: true },
      { name: "Anúncios", value: String(next.announcements?.length ?? 0), inline: true },
    ]);

    res.json(next);
  });

  router.post("/admin/cms/import", requireAdmin, async (req, res) => {
    const caps = getAdminCapabilities(req.session.adminRole);
    if (!caps.importCms) {
      return res.status(403).json({ error: "forbidden" });
    }
    const data = importCmsFromFiles(req.session.user.id);
    await logCms("Importação .txt", `Por <@${req.session.user.id}>`, []);
    res.json(data);
  });

  router.post("/admin/test-log", requireAdmin, async (req, res) => {
    const result = await logGeneral("Teste de log (painel)", `Solicitado por <@${req.session.user.id}>`, [
      { name: "Ambiente", value: process.env.BASE_URL || "local", inline: true },
    ]);
    res.json(result);
  });

  router.post("/admin/refresh-admin", requireUser, async (req, res) => {
    await refreshSessionAdmin(req);
    res.json({
      isAdmin: Boolean(req.session.isAdmin),
      adminRole: req.session.adminRole ?? null,
    });
  });

  return router;
}

export async function refreshSessionAdmin(req) {
  if (!req.session?.user?.id) {
    req.session.isAdmin = false;
    req.session.adminRole = null;
    req.session.adminSource = null;
    return false;
  }
  const resolved = await resolveSiteAdmin(req.session.user.id);
  req.session.isAdmin = resolved.isAdmin;
  req.session.adminRole = resolved.role;
  req.session.adminSource = resolved.source;
  return resolved.isAdmin;
}
