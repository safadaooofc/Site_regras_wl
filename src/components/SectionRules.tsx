import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Conduta e respeito",
    desc: "Assédio, discriminação e ofensas OOC fora do contexto de cena não são tolerados.",
  },
  {
    title: "Fair play",
    desc: "Metagaming, powergaming e vantagens obtidas fora do jogo prejudicam todos — são punidos.",
  },
  {
    title: "Valorize a vida",
    desc: "Confrontos exigem motivação IC e tensão plausível — não é Deathmatch livre.",
  },
  {
    title: "Veículos e combate",
    desc: "VDM/RDM e abuso de mecânicas quebram a narrativa; denuncie com provas no Discord.",
  },
];

export function SectionRules() {
  return (
    <section id="regras" className="scroll-mt-24 border-y border-white/5 bg-[#0c0c14]/80 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
              Regras em destaque
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Resumo para orientação rápida. O regulamento completo está na página dedicada,
              com glossário e capítulos detalhados.
            </p>
          </div>
          <Link
            to="/regras"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200"
          >
            Abrir regulamento completo
          </Link>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {highlights.map((r, i) => (
            <li
              key={r.title}
              className="glass-card flex gap-4 rounded-2xl p-5 md:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/40 to-cyan-500/30 font-[family-name:var(--font-display)] text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
