import { COMPANY_NAME, RP_FILIAL_NAME, EB_FILIAL_NAME } from "../config/community";

const pillars = [
  {
    title: "Empresa central",
    body: `${COMPANY_NAME} reúne as operações das filiais de roleplay e do Exército Brasileiro com identidade e suporte unificados no site.`,
  },
  {
    title: "Reinauguração do mapa RP",
    body: `A filial ${RP_FILIAL_NAME} está reconstruindo o mapa e o roleplay após a perda do mundo anterior. Nova temporada em preparação.`,
  },
  {
    title: "Filiais independentes",
    body: `Cada filial (${RP_FILIAL_NAME} e ${EB_FILIAL_NAME}) mantém Discord, equipe e regulamento próprios.`,
  },
];

export function SectionAbout() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Sobre a {COMPANY_NAME}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Somos a empresa por trás das comunidades de roleplay e militar no Roblox. O site
            apresenta as duas filiais, regras e canais oficiais de cada uma.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="glass-card rounded-lg p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
