import { Link } from "react-router-dom";
import { getDiscordInvite } from "../config/community";

export function SectionCTA() {
  const discordInvite = getDiscordInvite();

  return (
    <section id="cta" className="scroll-mt-24 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-950/80 via-[#12121c] to-cyan-950/40 p-10 text-center md:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl"
            aria-hidden
          />
          <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Pronto para entrar na Capital MT?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-zinc-300">
            Entre no Discord, leia o regulamento completo e siga o fluxo de whitelist. A
            staff está disponível para tirar dúvidas nos tickets.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-zinc-900 shadow-xl transition hover:bg-zinc-100"
            >
              Entrar pelo Discord
            </a>
            <Link
              to="/regras"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Ler regulamento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
