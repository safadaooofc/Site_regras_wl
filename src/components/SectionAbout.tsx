import { COMMUNITY_NAME } from "../config/community";

const pillars = [
  {
    title: "Cenário regional",
    body: "Missões, facções e rotas pensadas para dialogar com o ritmo do estado — sem perder a tensão urbana.",
  },
  {
    title: "Economia viva",
    body: "Ofícios, comércio e decisões da cidade impactam preços e oportunidades ao longo das temporadas.",
  },
  {
    title: "Staff e tickets",
    body: "Suporte em português com filas claras no Discord — denúncias e dúvidas com rastreabilidade.",
  },
];

export function SectionAbout() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Sobre a {COMMUNITY_NAME}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Somos uma comunidade focada em roleplay sério com espaço para humor e improviso —
            sempre dentro das regras combinadas e do respeito entre jogadores.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="glass-card rounded-2xl p-6 transition hover:border-violet-500/25"
            >
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
