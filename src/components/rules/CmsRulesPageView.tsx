import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RuleSectionBlock } from "./RuleSectionBlock";
import { RulesBranchNav } from "./RulesBranchNav";
import { COMPANY_NAME, getDiscordInvite } from "../../config/community";
import type { CmsRuleCategory } from "../../types/cms";

type Props = {
  branch: "rp" | "eb";
  filialName: string;
  pageTitle: string;
  pageSubtitle: string;
  categories: CmsRuleCategory[];
};

export function CmsRulesPageView({
  branch,
  filialName,
  pageTitle,
  pageSubtitle,
  categories,
}: Props) {
  const sorted = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );
  const [activeId, setActiveId] = useState(sorted[0]?.id ?? "");
  const active = sorted.find((c) => c.id === activeId) ?? sorted[0];
  const sections = active?.sections ?? [];

  const isEb = branch === "eb";
  const accentTab = isEb
    ? "border-amber-600/40 bg-amber-600/10 text-white"
    : "border-blue-500/40 bg-blue-600/15 text-white";
  const accentLink = isEb ? "hover:text-amber-600" : "hover:text-blue-400";
  const accentLabel = isEb ? "text-amber-600/90" : "text-blue-400/90";

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Navegação secundária">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            {COMPANY_NAME}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-400">Regras {branch === "eb" ? "EB" : "RP"}</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className={`text-xs font-medium uppercase tracking-widest ${accentLabel}`}>
            Filial · {filialName}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{pageSubtitle}</p>
        </header>

        <div className="mt-8">
          <RulesBranchNav />
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap"
          role="tablist"
          aria-label="Categorias"
        >
          {sorted.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active?.id === cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                active?.id === cat.id
                  ? accentTab
                  : "border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-70">({cat.sections.length})</span>
            </button>
          ))}
        </div>

        {sections.length === 0 ? (
          <p className="mt-10 text-center text-zinc-500">Nenhuma seção nesta categoria.</p>
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            <aside className="mb-10 lg:mb-0">
              <div className="glass-card sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {active?.label}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className={`block text-zinc-500 transition ${accentLink}`}>
                        <span className="line-clamp-2">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <article className="min-w-0 space-y-14">
              {sections.map((section) => (
                <RuleSectionBlock key={section.id} section={section} />
              ))}
            </article>
          </div>
        )}

        <div className="mt-16 glass-card rounded-lg p-8 text-center">
          <p className="text-zinc-400">Dúvidas? Use o Discord da filial.</p>
          <a
            href={getDiscordInvite(branch)}
            target="_blank"
            rel="noopener noreferrer"
            className={isEb ? "btn-eb mt-6 inline-flex" : "btn-primary mt-6 inline-flex"}
          >
            Discord {branch === "eb" ? "EB" : "RP"}
          </a>
        </div>
      </div>
    </main>
  );
}
