import { Link } from "react-router-dom";
import {
  EB_FILIAL_NAME,
  RP_FILIAL_NAME,
  getDiscordInvite,
  isRobloxMapAvailable,
} from "../config/community";
import { RobloxJoinButton } from "./RobloxJoinButton";

export function SectionServers() {
  return (
    <section id="filiais" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
          Filiais
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Duas operações sob a Reuel — entre no Roblox (EB ativo) ou acompanhe a reinauguração do
          mapa RP.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FilialCard
            branch="rp"
            name={RP_FILIAL_NAME}
            tag="Filial RP"
            status="rebuilding"
            description="Reinauguração do mapa e do roleplay. O link do Roblox será liberado quando a nova cidade abrir — por enquanto use o Discord."
          />
          <FilialCard
            branch="eb"
            name={EB_FILIAL_NAME}
            tag="Filial EB"
            status="active"
            description="Exército Brasileiro com mapa ativo no Roblox. Entre direto pelo botão abaixo ou pelo Discord para recrutamento."
          />
        </div>
      </div>
    </section>
  );
}

function FilialCard({
  branch,
  name,
  tag,
  status,
  description,
}: {
  branch: "rp" | "eb";
  name: string;
  tag: string;
  status: "active" | "rebuilding";
  description: string;
}) {
  const rulesHref = branch === "eb" ? "/regras/eb" : "/regras/rp";
  const robloxOn = isRobloxMapAvailable(branch);

  return (
    <article className="glass-card flex flex-col rounded-lg p-6">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">{tag}</p>
      </div>
      <div className="mt-4">
        <StatusBadge status={status} robloxOn={robloxOn} />
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-6 flex flex-col gap-3">
        <RobloxJoinButton branch={branch} fullWidth />
        <a
          href={getDiscordInvite(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full text-center ${branch === "eb" ? "btn-eb" : "btn-primary"}`}
        >
          Discord {branch === "eb" ? "EB" : "RP"}
        </a>
        <Link to={rulesHref} className="btn-secondary w-full text-center">
          Ver regras
        </Link>
      </div>
    </article>
  );
}

function StatusBadge({
  status,
  robloxOn,
}: {
  status: "active" | "rebuilding";
  robloxOn: boolean;
}) {
  if (status === "active" && robloxOn) {
    return (
      <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="inline-flex items-center gap-2 text-emerald-500/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Mapa no Roblox
        </span>
      </span>
    );
  }
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
      Mapa RP em reinauguração
    </span>
  );
}
