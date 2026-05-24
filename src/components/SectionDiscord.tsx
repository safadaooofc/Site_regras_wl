import {
  COMPANY_NAME,
  EB_FILIAL_NAME,
  RP_FILIAL_NAME,
  getDiscordInvite,
  getDiscordServerId,
} from "../config/community";
import { useOnlinePlayers } from "../hooks/useOnlinePlayers";

function DiscordCard({
  filial,
  description,
  invite,
  serverId,
  branch,
}: {
  filial: string;
  description: string;
  invite: string;
  serverId: string;
  branch: "rp" | "eb";
}) {
  const { count, loading } = useOnlinePlayers(branch);
  const widgetSrc =
    serverId.trim() !== ""
      ? `https://discord.com/widget?id=${encodeURIComponent(serverId.trim())}&theme=dark`
      : null;

  return (
    <article className="glass-card flex flex-col overflow-hidden rounded-lg">
      <div className="p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Discord · filial
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          {filial}
        </h3>
        <p className="mt-3 text-sm text-zinc-400">{description}</p>
        <p className="mt-4 text-sm text-zinc-500">
          Online no widget:{" "}
          <span className="font-medium text-zinc-300">
            {loading ? "…" : count != null ? count : "—"}
          </span>
        </p>
        <a
          href={invite}
          target="_blank"
          rel="noopener noreferrer"
          className={branch === "eb" ? "btn-eb mt-5" : "btn-primary mt-5"}
        >
          Entrar no Discord
        </a>
      </div>
      {widgetSrc ? (
        <iframe
          title={`Widget ${filial}`}
          src={widgetSrc}
          className="min-h-[260px] w-full border-0 border-t border-white/8 bg-[#2b2d31]"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      ) : (
        <div className="border-t border-white/8 p-6 text-sm text-zinc-500">
          ID do servidor não configurado.
        </div>
      )}
    </article>
  );
}

export function SectionDiscord() {
  return (
    <section id="discord" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Discord das filiais
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A {COMPANY_NAME} não substitui os servidores das filiais — cada um tem convite, widget e
            moderação próprios.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <DiscordCard
            filial={RP_FILIAL_NAME}
            description="Anúncios da reinauguração do mapa, whitelist, suporte e regras da cidade."
            invite={getDiscordInvite("rp")}
            serverId={getDiscordServerId("rp")}
            branch="rp"
          />
          <DiscordCard
            filial={EB_FILIAL_NAME}
            description="Recrutamento, treinos, patente e regulamento militar."
            invite={getDiscordInvite("eb")}
            serverId={getDiscordServerId("eb")}
            branch="eb"
          />
        </div>
      </div>
    </section>
  );
}
