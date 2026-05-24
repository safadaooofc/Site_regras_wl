import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RuleSectionBlock } from "../components/rules/RuleSectionBlock";
import { RulesBranchNav } from "../components/rules/RulesBranchNav";
import { COMPANY_NAME, EB_FILIAL_NAME, getDiscordInvite } from "../config/community";
import manualCaboRaw from "../content/manual-cabo.txt?raw";
import regrasBasicasRaw from "../content/regras-basicas-recrutamento.txt?raw";
import regrasEbRaw from "../content/regrasEB.txt?raw";
import {
  EB_CATEGORY_LABELS,
  EB_CATEGORY_ORDER,
  type EbRuleCategory,
  countEbByCategory,
  mergeEbSections,
  parseManualCabo,
  parseRegrasBasicas,
  parseRegrasEB,
} from "../utils/parseRegrasEB";

export function EbRulesPage() {
  const sections = useMemo(
    () =>
      mergeEbSections(
        parseRegrasBasicas(regrasBasicasRaw),
        parseRegrasEB(regrasEbRaw),
        parseManualCabo(manualCaboRaw)
      ),
    []
  );
  const totals = useMemo(() => countEbByCategory(sections), [sections]);
  const [active, setActive] = useState<EbRuleCategory>("recrutamento");

  const filtered = useMemo(
    () => sections.filter((s) => s.category === active),
    [sections, active]
  );

  const ebInvite = getDiscordInvite("eb");

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Navegação secundária">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            {COMPANY_NAME}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-400">Regras EB</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600/90">
            Filial · {EB_FILIAL_NAME}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl">
            Documentação EB
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Regras básicas de recrutamento, roteiro completo (regrasEB), Manual do Cabo ESA e
            regulamento. Dúvidas no{" "}
            <a
              href={ebInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Discord da filial EB
            </a>
            .
          </p>
        </header>

        <div className="mt-8">
          <RulesBranchNav />
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Categorias EB"
        >
          {EB_CATEGORY_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                active === id
                  ? "border-amber-600/40 bg-amber-600/10 text-white"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {EB_CATEGORY_LABELS[id]}
              <span className="ml-1.5 text-xs opacity-70">({totals[id]})</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-lg border border-dashed border-amber-600/30 bg-amber-950/10 p-8 text-center text-zinc-400">
            Nenhuma seção carregada. Salve os arquivos na raiz do projeto e rode{" "}
            <code className="rounded bg-white/5 px-1">iniciar-site.bat</code> (sincroniza para{" "}
            <code className="rounded bg-white/5 px-1">src/content/</code>):{" "}
            <code className="rounded bg-white/5 px-1">regrasEB.txt</code>,{" "}
            <code className="rounded bg-white/5 px-1">
              742126485-Regras-Basicas-de-Recrutamento.txt
            </code>
            .
          </p>
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            <aside className="mb-10 lg:mb-0">
              <div className="glass-card sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {EB_CATEGORY_LABELS[active]}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {filtered.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-zinc-500 transition hover:text-amber-600"
                      >
                        <span className="line-clamp-2">{s.title}</span>
                        {s.source && active === "recrutamento" && (
                          <span className="mt-0.5 block text-[10px] text-zinc-600">
                            {s.source}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="min-w-0 space-y-14">
              {filtered.map((section) => (
                <div key={section.id}>
                  {section.source && active === "recrutamento" && (
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-700/80">
                      {section.source}
                    </p>
                  )}
                  <RuleSectionBlock section={section} />
                </div>
              ))}
            </article>
          </div>
        )}

        <div className="mt-16 glass-card rounded-lg p-8 text-center">
          <p className="text-zinc-400">
            Dúvidas sobre recrutamento ou patente? Use o Discord do {EB_FILIAL_NAME}.
          </p>
          <a
            href={ebInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-eb mt-6 inline-flex"
          >
            Discord EB
          </a>
        </div>
      </div>
    </main>
  );
}
