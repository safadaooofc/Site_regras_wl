import { Link } from "react-router-dom";
import {
  COMPANY_NAME,
  EB_FILIAL_NAME,
  RP_FILIAL_NAME,
  getDiscordInvite,
} from "../config/community";
import { RobloxJoinButton } from "./RobloxJoinButton";

export function SectionCTA() {
  return (
    <section id="cta" className="scroll-mt-24 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="glass-card rounded-xl p-10 text-center md:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            {COMPANY_NAME}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Escolha a filial: roleplay ({RP_FILIAL_NAME}) com mapa em reinauguração, ou{" "}
            {EB_FILIAL_NAME} com recrutamento ativo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RobloxJoinButton branch="eb" />
            <RobloxJoinButton branch="rp" />
            <a
              href={getDiscordInvite("eb")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-eb"
            >
              Discord EB
            </a>
            <a
              href={getDiscordInvite("rp")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Discord RP
            </a>
            <Link to="/regras/rp" className="btn-secondary">
              Regras
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
