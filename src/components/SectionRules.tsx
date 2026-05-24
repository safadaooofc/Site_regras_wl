import { Link } from "react-router-dom";
import { COMPANY_NAME, RP_FILIAL_NAME, EB_FILIAL_NAME } from "../config/community";

export function SectionRules() {
  return (
    <section id="regras" className="scroll-mt-24 border-y border-white/8 bg-[#161d26]/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Regulamentos
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A {COMPANY_NAME} publica as regras de cada filial em páginas separadas, com categorias,
            sumário e texto completo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="glass-card flex flex-col rounded-lg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Filial RP
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {RP_FILIAL_NAME}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
              Termos de RP, facções, corporação, Discord da cidade e código penal — organizados por
              categoria. Vigente na reinauguração do mapa.
            </p>
            <Link to="/regras/rp" className="btn-primary mt-6 w-fit">
              Abrir regras RP
            </Link>
          </article>

          <article className="glass-card flex flex-col rounded-lg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600/90">
              Filial EB
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {EB_FILIAL_NAME}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
              Manual de recrutamento para instrutores e regulamento oficial do exército — conduta,
              hierarquia, chat e operações.
            </p>
            <Link to="/regras/eb" className="btn-eb mt-6 w-fit">
              Abrir regras EB
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
