import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  EB_FILIAL_NAME,
  RP_FILIAL_NAME,
  getDiscordInvite,
} from "../config/community";
import { RobloxJoinButton } from "./RobloxJoinButton";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {children}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-blue-400/90">
            {COMPANY_NAME}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {COMPANY_NAME}
          </h1>
          <p className="mt-4 text-lg text-zinc-400 md:text-xl">{COMPANY_TAGLINE}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="glass-card rounded-xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Filial RP
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {RP_FILIAL_NAME}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Reinauguração do <strong className="font-medium text-zinc-300">mapa e do roleplay</strong>{" "}
              após a perda do mapa anterior. Nova cidade, whitelist e temporada no Discord da filial.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RobloxJoinButton branch="rp" fullWidth className="sm:w-auto" />
              <a
                href={getDiscordInvite("rp")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary sm:w-auto"
              >
                Discord da filial RP
              </a>
              <Link to="/regras/rp" className="btn-secondary sm:w-auto text-center">
                Regras RP
              </Link>
            </div>
          </article>

          <article className="glass-card rounded-xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600/90">
              Filial EB
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {EB_FILIAL_NAME}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Organização militar com recrutamento, treinos e regulamento próprios. Discord e regras
              separados da filial de roleplay.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RobloxJoinButton branch="eb" fullWidth className="sm:w-auto" />
              <a
                href={getDiscordInvite("eb")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-eb sm:w-auto"
              >
                Discord do EB
              </a>
              <Link to="/regras/eb" className="btn-secondary sm:w-auto text-center">
                Regras EB
              </Link>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          {COMPANY_NAME} centraliza as filiais. Cada uma tem servidor Discord, equipe e regulamento
          independentes.
        </p>
      </div>
    </section>
  );
}
