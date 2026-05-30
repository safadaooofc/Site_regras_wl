import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { invalidateSiteContentCache } from "../hooks/useSiteContent";
import type {
  Announcement,
  CmsDocument,
  CmsRuleCategory,
  CmsRules,
  CmsTeam,
} from "../types/cms";

type Tab = "announcements" | "rules-rp" | "rules-eb" | "team";

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

async function loadCms(): Promise<CmsDocument> {
  const res = await fetch("/api/admin/cms", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Falha ao carregar CMS");
  return res.json();
}

async function saveCms(data: CmsDocument): Promise<CmsDocument> {
  const res = await fetch("/api/admin/cms", {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Falha ao salvar");
  invalidateSiteContentCache();
  return res.json();
}

function RulesEditor({
  rules,
  onChange,
  accent,
}: {
  rules: CmsRules;
  onChange: (r: CmsRules) => void;
  accent: "blue" | "amber";
}) {
  const [catId, setCatId] = useState(rules.categories[0]?.id ?? "");

  const category = rules.categories.find((c) => c.id === catId) ?? rules.categories[0];

  const updateCategory = (patch: Partial<CmsRuleCategory>) => {
    if (!category) return;
    onChange({
      categories: rules.categories.map((c) =>
        c.id === category.id ? { ...c, ...patch } : c
      ),
    });
  };

  const addCategory = () => {
    const id = newId("cat");
    const next: CmsRuleCategory = {
      id,
      label: "Nova categoria",
      order: rules.categories.length,
      sections: [],
    };
    onChange({ categories: [...rules.categories, next] });
    setCatId(id);
  };

  const addSection = () => {
    if (!category) return;
    updateCategory({
      sections: [
        ...category.sections,
        { id: newId("sec"), title: "Nova seção", body: "" },
      ],
    });
  };

  const border = accent === "amber" ? "border-amber-600/30" : "border-blue-500/30";
  const tabActive =
    accent === "amber"
      ? "border-amber-600/40 bg-amber-600/10 text-white"
      : "border-blue-500/40 bg-blue-500/10 text-white";

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="space-y-2">
        <button type="button" className="btn-secondary w-full text-sm" onClick={addCategory}>
          + Categoria
        </button>
        <ul className="space-y-1">
          {[...rules.categories]
            .sort((a, b) => a.order - b.order)
            .map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setCatId(c.id)}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                    catId === c.id ? tabActive : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {category ? (
        <div className={`glass-card rounded-lg border p-5 ${border}`}>
          <label className="block text-xs text-zinc-500">Nome da categoria</label>
          <input
            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white"
            value={category.label}
            onChange={(e) => updateCategory({ label: e.target.value })}
          />
          <div className="mt-4 flex justify-end">
            <button type="button" className="btn-secondary text-sm" onClick={addSection}>
              + Seção
            </button>
          </div>
          <div className="mt-4 space-y-6">
            {category.sections.map((sec, idx) => (
              <div key={sec.id} className="rounded-md border border-white/10 p-4">
                <div className="flex justify-between gap-2">
                  <label className="text-xs text-zinc-500">Título</label>
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:text-red-300"
                    onClick={() =>
                      updateCategory({
                        sections: category.sections.filter((s) => s.id !== sec.id),
                      })
                    }
                  >
                    Remover
                  </button>
                </div>
                <input
                  className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white"
                  value={sec.title}
                  onChange={(e) => {
                    const sections = [...category.sections];
                    sections[idx] = { ...sec, title: e.target.value };
                    updateCategory({ sections });
                  }}
                />
                <label className="mt-3 block text-xs text-zinc-500">Conteúdo</label>
                <textarea
                  className="mt-1 min-h-[120px] w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200"
                  value={sec.body}
                  onChange={(e) => {
                    const sections = [...category.sections];
                    sections[idx] = { ...sec, body: e.target.value };
                    updateCategory({ sections });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-zinc-500">Crie uma categoria para começar.</p>
      )}
    </div>
  );
}

function TeamEditor({
  teams,
  onChange,
}: {
  teams: CmsTeam[];
  onChange: (teams: CmsTeam[]) => void;
}) {
  return (
    <div className="space-y-8">
      {teams.map((team, ti) => (
        <div key={team.branch} className="glass-card rounded-lg border border-white/10 p-5">
          <h3 className="font-semibold text-white">{team.label}</h3>
          <div className="mt-4 space-y-4">
            {team.groups.map((group, gi) => (
              <div key={`${team.branch}-${gi}`} className="rounded-md border border-white/10 p-4">
                <input
                  className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 font-medium text-white"
                  value={group.role}
                  onChange={(e) => {
                    const next = [...teams];
                    next[ti] = {
                      ...team,
                      groups: team.groups.map((g, j) =>
                        j === gi ? { ...g, role: e.target.value } : g
                      ),
                    };
                    onChange(next);
                  }}
                />
                <ul className="mt-3 space-y-2">
                  {group.members.map((m, mi) => (
                    <li key={mi} className="flex flex-wrap gap-2">
                      <input
                        className="min-w-[140px] flex-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-sm text-white"
                        value={m.name}
                        placeholder="Nome"
                        onChange={(e) => {
                          const next = [...teams];
                          const members = [...group.members];
                          members[mi] = { ...m, name: e.target.value };
                          const groups = [...team.groups];
                          groups[gi] = { ...group, members };
                          next[ti] = { ...team, groups };
                          onChange(next);
                        }}
                      />
                      <input
                        className="min-w-[120px] flex-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-sm text-zinc-400"
                        value={m.note ?? ""}
                        placeholder="Nota (opcional)"
                        onChange={(e) => {
                          const next = [...teams];
                          const members = [...group.members];
                          members[mi] = { ...m, note: e.target.value || undefined };
                          const groups = [...team.groups];
                          groups[gi] = { ...group, members };
                          next[ti] = { ...team, groups };
                          onChange(next);
                        }}
                      />
                      <button
                        type="button"
                        className="text-xs text-red-400"
                        onClick={() => {
                          const next = [...teams];
                          const groups = [...team.groups];
                          groups[gi] = {
                            ...group,
                            members: group.members.filter((_, k) => k !== mi),
                          };
                          next[ti] = { ...team, groups };
                          onChange(next);
                        }}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-2 text-xs text-blue-400"
                  onClick={() => {
                    const next = [...teams];
                    const groups = [...team.groups];
                    groups[gi] = {
                      ...group,
                      members: [...group.members, { name: "Novo membro" }],
                    };
                    next[ti] = { ...team, groups };
                    onChange(next);
                  }}
                >
                  + Membro
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 text-sm text-blue-400"
            onClick={() => {
              const next = [...teams];
              next[ti] = {
                ...team,
                groups: [...team.groups, { role: "Nova área", members: [] }],
              };
              onChange(next);
            }}
          >
            + Área / cargo
          </button>
        </div>
      ))}
    </div>
  );
}

export function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("announcements");
  const [cms, setCms] = useState<CmsDocument | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setCms(await loadCms());
      setLoadError(null);
    } catch {
      setLoadError("Não foi possível carregar o painel.");
    }
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (loading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center pt-28 text-zinc-400">
        Carregando…
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-lg px-4 pt-32 text-center">
        <h1 className="text-xl font-semibold text-white">Acesso negado</h1>
        <p className="mt-3 text-zinc-400">
          Apenas administradores dos servidores Discord da Reuel (onde o bot está) podem usar este
          painel. Entre com uma conta que tenha permissão de <strong>Administrador</strong> no
          Discord.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Voltar ao site
        </Link>
      </main>
    );
  }

  const persist = async () => {
    if (!cms) return;
    setSaving(true);
    setMessage(null);
    try {
      setCms(await saveCms(cms));
      setMessage("Alterações salvas e publicadas no site.");
    } catch {
      setMessage("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const importFromFiles = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms/import", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error();
      setCms(await res.json());
      invalidateSiteContentCache();
      setMessage("Conteúdo reimportado dos arquivos .txt em src/content.");
    } catch {
      setMessage("Falha ao importar.");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "announcements", label: "Anúncios" },
    { id: "rules-rp", label: "Regras RP" },
    { id: "rules-eb", label: "Regras EB" },
    { id: "team", label: "Equipe" },
  ];

  return (
    <main className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Administração</p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
              Painel Reuel
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-secondary text-sm"
              disabled={saving}
              onClick={importFromFiles}
            >
              Importar .txt
            </button>
            <button type="button" className="btn-primary text-sm" disabled={saving} onClick={persist}>
              {saving ? "Salvando…" : "Salvar e publicar"}
            </button>
          </div>
        </div>

        {message && (
          <p className="mt-4 rounded-lg border border-blue-500/30 bg-blue-950/20 px-4 py-3 text-sm text-blue-100">
            {message}
          </p>
        )}
        {loadError && <p className="mt-4 text-red-400">{loadError}</p>}

        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === t.id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {cms && tab === "announcements" && (
          <div className="mt-8 space-y-4">
            <button
              type="button"
              className="btn-secondary text-sm"
              onClick={() =>
                setCms({
                  ...cms,
                  announcements: [
                    ...cms.announcements,
                    {
                      id: newId("ann"),
                      title: "Novo anúncio",
                      body: "",
                      branch: "all",
                      active: true,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                })
              }
            >
              + Anúncio
            </button>
            {cms.announcements.map((a, i) => (
              <AnnouncementRow
                key={a.id}
                item={a}
                onChange={(patch) => {
                  const announcements = [...cms.announcements];
                  announcements[i] = { ...a, ...patch };
                  setCms({ ...cms, announcements });
                }}
                onRemove={() =>
                  setCms({
                    ...cms,
                    announcements: cms.announcements.filter((x) => x.id !== a.id),
                  })
                }
              />
            ))}
          </div>
        )}

        {cms && tab === "rules-rp" && (
          <div className="mt-8">
            <RulesEditor
              rules={cms.rulesRp}
              accent="blue"
              onChange={(rulesRp) => setCms({ ...cms, rulesRp })}
            />
          </div>
        )}

        {cms && tab === "rules-eb" && (
          <div className="mt-8">
            <RulesEditor
              rules={cms.rulesEb}
              accent="amber"
              onChange={(rulesEb) => setCms({ ...cms, rulesEb })}
            />
          </div>
        )}

        {cms && tab === "team" && (
          <div className="mt-8">
            <TeamEditor
              teams={cms.team.teams}
              onChange={(teams) => setCms({ ...cms, team: { teams } })}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function AnnouncementRow({
  item,
  onChange,
  onRemove,
}: {
  item: Announcement;
  onChange: (p: Partial<Announcement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="glass-card rounded-lg border border-white/10 p-4">
      <div className="flex flex-wrap gap-3">
        <input
          className="min-w-[200px] flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white"
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Título"
        />
        <select
          className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
          value={item.branch}
          onChange={(e) =>
            onChange({ branch: e.target.value as Announcement["branch"] })
          }
        >
          <option value="all">Toda a rede</option>
          <option value="rp">Capital MT BR</option>
          <option value="eb">Exército Brasileiro</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={item.active}
            onChange={(e) => onChange({ active: e.target.checked })}
          />
          Ativo
        </label>
        <button type="button" className="text-sm text-red-400" onClick={onRemove}>
          Remover
        </button>
      </div>
      <textarea
        className="mt-3 min-h-[80px] w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200"
        value={item.body}
        onChange={(e) => onChange({ body: e.target.value })}
        placeholder="Texto do anúncio (aparece na página inicial)"
      />
    </div>
  );
}
