import { useEffect, useMemo, useState } from "react";

type CountdownState = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  finalizado: boolean;
};

function getTargetDate() {
  const now = new Date();
  const currentMonthTarget = new Date(
    now.getFullYear(),
    now.getMonth(),
    8,
    20,
    0,
    0,
    0
  );

  if (now.getTime() <= currentMonthTarget.getTime()) {
    return currentMonthTarget;
  }

  return new Date(now.getFullYear(), now.getMonth() + 1, 8, 20, 0, 0, 0);
}

function buildCountdown(targetDate: Date): CountdownState {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: true };
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  return { dias, horas, minutos, segundos, finalizado: false };
}

export function Hero() {
  const targetDate = useMemo(() => getTargetDate(), []);
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    buildCountdown(targetDate)
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(buildCountdown(targetDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

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
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-200/90">
            Atualização dia 8 às 20:00
          </p>
          {countdown.finalizado ? (
            <p className="mt-2 text-lg font-semibold text-white">
              A atualização já começou 🚀
            </p>
          ) : (
            <div className="mt-3 flex items-center justify-center gap-3 text-white">
              <div className="min-w-16 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-2xl font-bold leading-none">{countdown.dias}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-300">Dias</p>
              </div>
              <div className="min-w-16 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-2xl font-bold leading-none">{countdown.horas}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-300">Horas</p>
              </div>
              <div className="min-w-16 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-2xl font-bold leading-none">{countdown.minutos}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-300">
                  Min
                </p>
              </div>
              <div className="min-w-16 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-2xl font-bold leading-none">{countdown.segundos}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-300">
                  Seg
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
