import { useEffect, useMemo, useState } from "react";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

const teamGroups = [
  {
    role: "Desenvolvedores",
    members: ["Kiover (desenvolvedor chefe)", "Dark (builder)"],
  },
  {
    role: "Dono",
    members: ["Reuel"],
  },
  {
    role: "Co fundadores",
    members: ["Kiover", "Detetive"],
  },
  {
    role: "Syroevusir",
    members: ["Samuel"],
  },
  {
    role: "Staffs",
    members: ["Emanuel", "Heitor", "Galego"],
  },
];

function getCountdownParts(diffMs: number) {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function SectionEquipe() {
  const [targetAt] = useState(() => Date.now() + THREE_DAYS_MS);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => getCountdownParts(targetAt - now), [now, targetAt]);
  const isReleased = targetAt - now <= 0;

  return (
    <section id="equipe" className="scroll-mt-24 border-y border-white/5 bg-[#0c0c14]/70 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/55 via-[#11111a] to-cyan-950/35 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
            Próxima mega atualização
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Contagem regressiva oficial
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-300">
            {isReleased
              ? "A mega atualização já está liberada!"
              : "Falta pouco: a próxima mega atualização chega em até 3 dias."}
          </p>
          {!isReleased && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                  {String(countdown.days).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Dias</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                  {String(countdown.hours).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Horas</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                  {String(countdown.minutes).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Min</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                  {String(countdown.seconds).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Seg</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Equipe
          </h3>
          <p className="mt-3 max-w-2xl text-lg text-zinc-400">
            Conheça a equipe responsável por manter a cidade viva.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamGroups.map((group) => (
              <article key={group.role} className="glass-card rounded-2xl p-5">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {group.role}
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {group.members.map((member) => (
                    <li key={member} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
