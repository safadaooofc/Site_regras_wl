import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CmsRulesPageView } from "../components/rules/CmsRulesPageView";
import { RuleSectionBlock } from "../components/rules/RuleSectionBlock";
import { RulesBranchNav } from "../components/rules/RulesBranchNav";
import { COMPANY_NAME, RP_FILIAL_NAME, getDiscordInvite } from "../config/community";
import regrasRaw from "../content/regrasrp.txt?raw";
import { useSiteContent } from "../hooks/useSiteContent";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type RuleCategory,
  countByCategory,
  parseRegrasrp,
} from "../utils/parseRegrasrp";

export function RpRulesPage() {
  const { content } = useSiteContent();
  const cmsCategories = content?.rulesRp?.categories;
  const sections = useMemo(() => parseRegrasrp(regrasRaw), []);
  const totals = useMemo(() => countByCategory(sections), [sections]);
  const [active, setActive] = useState<RuleCategory>("geral");

  const filtered = useMemo(
    () => sections.filter((s) => s.category === active),
    [sections, active]
  );

  if (cmsCategories?.length) {
    return (
      <CmsRulesPageView
        branch="rp"
        filialName={RP_FILIAL_NAME}
        pageTitle="Regulamento de Roleplay"
        pageSubtitle={`Regras da filial ${RP_FILIAL_NAME}. Dúvidas no Discord da filial RP.`}
        categories={cmsCategories}
      />
    );
  }

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Navegação secundária">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            {COMPANY_NAME}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-400">Regras RP</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-blue-400/90">
            Filial · {RP_FILIAL_NAME}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl">
            Regulamento de Roleplay
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Texto de Kiover — categorias completas para a reinauguração do mapa. Dúvidas no{" "}
            <a
              href={getDiscordInvite("rp")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Discord da filial RP
            </a>
            .
          </p>
        </header>

        <div className="mt-8">
          <RulesBranchNav />
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:gap-2"
          role="tablist"
          aria-label="Categorias das regras"
        >
          {CATEGORY_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                active === id
                  ? "border-blue-500/40 bg-blue-600/15 text-white"
                  : "border-white/10 bg-transparent text-zinc-500 hover:border-white/15 hover:text-zinc-300"
              }`}
            >
              {CATEGORY_LABELS[id]}
              <span className="ml-1.5 text-xs opacity-70">({totals[id]})</span>
            </button>
          ))}
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
          <aside className="mb-10 lg:mb-0">
            <div className="glass-card sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {CATEGORY_LABELS[active]}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-zinc-500 transition hover:text-blue-400"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="min-w-0 space-y-14">
            {filtered.map((section) => (
              <RuleSectionBlock key={section.id} section={section} />
            ))}
          </article>
        </div>

        <div className="mt-16 glass-card rounded-lg p-8 text-center md:p-10">
          <p className="text-zinc-400">
            Mapa e roleplay em reinauguração — acompanhe a filial {RP_FILIAL_NAME} no Discord.
          </p>
          <Link to="/" className="btn-primary mt-6 inline-flex">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
