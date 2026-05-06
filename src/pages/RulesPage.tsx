import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { COMMUNITY_NAME, getDiscordInvite } from "../config/community";
import regrasRaw from "../content/regrasrp.txt?raw";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ParsedRuleSection,
  type RuleCategory,
  countByCategory,
  parseRegrasrp,
} from "../utils/parseRegrasrp";

export function RulesPage() {
  const sections = useMemo(() => parseRegrasrp(regrasRaw), []);
  const totals = useMemo(() => countByCategory(sections), [sections]);
  const [active, setActive] = useState<RuleCategory>("geral");

  const filtered = useMemo(
    () => sections.filter((s) => s.category === active),
    [sections, active]
  );

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Navegação secundária">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Início
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-400">Regras</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
            {COMMUNITY_NAME}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl">
            Regulamento da comunidade
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Texto de{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-300">
              Kiover
            </code>{" "}
            — organizado por categorias. Dúvidas complementares no{" "}
            <a
              href={getDiscordInvite()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline-offset-2 hover:underline"
            >
              Discord
            </a>
            .
          </p>
        </header>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:gap-3"
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
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === id
                  ? "border-violet-500/50 bg-violet-500/15 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {CATEGORY_LABELS[id]}
              <span className="ml-1.5 text-xs text-zinc-500">({totals[id]})</span>
            </button>
          ))}
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
          <aside className="mb-10 lg:mb-0">
            <div className="glass-card sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {CATEGORY_LABELS[active]}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-zinc-400 transition hover:text-cyan-400"
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

        <div className="mt-16 rounded-2xl border border-violet-500/20 bg-violet-950/20 p-8 text-center md:p-10">
          <p className="text-lg text-zinc-300">
            Dúvidas sobre whitelist ou interpretação? Abra um ticket no Discord oficial da{" "}
            {COMMUNITY_NAME}.
          </p>
          <Link
            to="/#cta"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] transition hover:brightness-110"
          >
              Voltar ao início e entrar na Capital MT
          </Link>
        </div>
      </div>
    </main>
  );
}

function RuleSectionBlock({ section }: { section: ParsedRuleSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-32 border-b border-white/5 pb-14 last:border-0 last:pb-0"
    >
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl">
        {section.title}
      </h2>
      <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5 md:p-6">
        <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-zinc-400">
          {section.body}
        </pre>
      </div>
    </section>
  );
}
