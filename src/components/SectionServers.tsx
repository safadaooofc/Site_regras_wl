import { RP_FILIAL_NAME, EB_FILIAL_NAME } from "../config/community";

const filiais = [
  {
    name: RP_FILIAL_NAME,
    tag: "Filial RP",
    status: "rebuilding" as const,
    description:
      "Reinauguração do mapa e do roleplay após a perda do mapa anterior. Whitelist, economia e data de abertura serão anunciadas no Discord da filial.",
    cta: { href: "/regras/rp", label: "Regras RP" },
  },
  {
    name: EB_FILIAL_NAME,
    tag: "Filial EB",
    status: "active" as const,
    description:
      "Organização militar com recrutamento, treinos e patente. Manual de recrutamento e regulamento na aba de regras EB.",
    cta: { href: "/regras/eb", label: "Regras EB" },
  },
];

function StatusBadge({ status }: { status: "active" | "rebuilding" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-emerald-500/90">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Ativo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm text-blue-400/90">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      Mapa em reinauguração
    </span>
  );
}

export function SectionServers() {
  return (
    <section id="filiais" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
          Filiais
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Duas operações sob a Reuel — roleplay urbano e Exército Brasileiro.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {filiais.map((f) => (
            <article key={f.name} className="glass-card flex flex-col rounded-lg p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{f.tag}</p>
                </div>
              </div>
              <div className="mt-4">
                <StatusBadge status={f.status} />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{f.description}</p>
              <a href={f.cta.href} className="btn-secondary mt-6 w-full text-center">
                {f.cta.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
