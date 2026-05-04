import { Link } from "react-router-dom";
import { COMMUNITY_NAME, getDiscordInvite } from "../config/community";
import { RULE_SECTIONS } from "../data/rulesContent";

export function RulesPage() {
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
            Normas de conduta e roleplay. Texto interno — complemente com avisos fixados no{" "}
            <a
              href={getDiscordInvite()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline-offset-2 hover:underline"
            >
              Discord
            </a>{" "}
            quando a staff publicar atualizações formais.
          </p>
        </header>

        <div className="mt-14 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
          <aside className="mb-10 lg:mb-0">
            <div className="glass-card sticky top-28 rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Nesta página
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {RULE_SECTIONS.map((s) => (
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
            {RULE_SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-white/5 pb-14 last:border-0 last:pb-0"
              >
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-5 text-zinc-300">
                  {section.blocks.map((b, i) => {
                    if (b.type === "p") {
                      return (
                        <p key={i} className="leading-relaxed text-zinc-400">
                          {b.text}
                        </p>
                      );
                    }
                    if (b.type === "sub") {
                      return (
                        <h3
                          key={i}
                          className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white"
                        >
                          {b.title}
                        </h3>
                      );
                    }
                    return (
                      <ul key={i} className="list-disc space-y-2 pl-5 text-zinc-400 marker:text-violet-500">
                        {b.items.map((item, j) => (
                          <li key={j} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </section>
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
            Voltar ao início e entrar na cidade
          </Link>
        </div>
      </div>
    </main>
  );
}
