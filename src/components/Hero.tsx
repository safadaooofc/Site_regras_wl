export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(168,85,247,0.22),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 text-center md:px-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300/90">
          Capital do MT BR · Roleplay
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl glow-text">
          A cidade te chama.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            O RP organiza o caos.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
          Whitelist, economia viva e staff presente. Entre pelo Discord, leia o regulamento
          e construa sua história no coração do MT.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#cta"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] transition hover:brightness-110"
          >
            Quero começar
          </a>
          <a
            href="/#servidores"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            Ver servidores
          </a>
        </div>
      </div>
    </section>
  );
}
