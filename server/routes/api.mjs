import { Router } from "express";
import { userIsDiscordAdministrator } from "../discord-admin.mjs";
import {
  getActiveAnnouncements,
  importCmsFromFiles,
  loadCms,
  saveCms,
} from "../cms-store.mjs";

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
    });
  });

  router.get("/admin/cms", requireAdmin, (_req, res) => {
    res.json(loadCms());
  });

  router.put("/admin/cms", requireAdmin, (req, res) => {
    const current = loadCms();
    const body = req.body ?? {};

    const next = {
      ...current,
      announcements: body.announcements ?? current.announcements,
      rulesRp: body.rulesRp ?? current.rulesRp,
      rulesEb: body.rulesEb ?? current.rulesEb,
      team: body.team ?? current.team,
      updatedBy: req.session.user.id,
    };

    saveCms(next);
    res.json(next);
  });

  router.post("/admin/cms/import", requireAdmin, (req, res) => {
    const data = importCmsFromFiles(req.session.user.id);
    res.json(data);
  });

  router.post("/admin/refresh-admin", requireUser, async (req, res) => {
    req.session.isAdmin = await userIsDiscordAdministrator(req.session.user.id);
    res.json({ isAdmin: Boolean(req.session.isAdmin) });
  });

  return router;
}

export async function refreshSessionAdmin(req) {
  if (!req.session?.user?.id) {
    req.session.isAdmin = false;
    return false;
  }
  req.session.isAdmin = await userIsDiscordAdministrator(req.session.user.id);
  return req.session.isAdmin;
}
