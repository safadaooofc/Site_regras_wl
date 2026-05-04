const servers = [
  {
    name: "Cidade Principal",
    tag: "Whitelist",
    slots: "128 jogadores",
    status: "online" as const,
    description:
      "Servidor principal com economia dinâmica, facções e eventos semanais narrados pela staff.",
  },
  {
    name: "Eventos & Temporadas",
    tag: "Aberto",
    slots: "64 jogadores",
    status: "online" as const,
    description:
      "Rodízio para histórias curtas, torneios e temporadas temáticas sem afetar o save principal.",
  },
  {
    name: "Laboratório RP",
    tag: "Beta",
    slots: "32 jogadores",
    status: "maintenance" as const,
    description:
      "Ambiente de testes para novas mecânicas — feedback da comunidade antes do lançamento.",
  },
];

function StatusDot({ status }: { status: "online" | "maintenance" }) {
  if (status === "online") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Online
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm text-amber-400">
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      Manutenção
    </span>
  );
}

export function SectionServers() {
  return (
    <section id="servidores" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
          Servidores
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Escolha onde entrar — cada ambiente tem propósito e regras específicas
          listadas no Discord.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servers.map((s) => (
            <article
              key={s.name}
              className="glass-card flex flex-col rounded-2xl p-6 transition hover:border-cyan-400/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{s.slots}</p>
                </div>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  {s.tag}
                </span>
              </div>
              <div className="mt-4">
                <StatusDot status={s.status} />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                {s.description}
              </p>
              <a
                href="#cta"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200"
              >
                Obter acesso
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
