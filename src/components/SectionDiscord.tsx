import { getDiscordInvite, getDiscordServerId } from "../config/community";

export function SectionDiscord() {
  const discordInvite = getDiscordInvite();
  const serverId = getDiscordServerId();

  const widgetSrc =
    serverId.trim() !== ""
      ? `https://discord.com/widget?id=${encodeURIComponent(serverId.trim())}&theme=dark`
      : null;

  return (
    <section id="discord" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
              Discord oficial
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Central de whitelist, anúncios de manutenção, regras fixadas e suporte com
              tickets. Entre pelo convite permanente da comunidade.
            </p>
            <ul className="mt-8 space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                Canais por tema: regras, facções, suporte e novidades da Capital MT.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                ao lado mostra presença no servidor quando ativo pela plataforma.
              </li>
            </ul>
            <a
              href={discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#5865F2] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Abrir servidor no Discord
            </a>
          </div>
          <div className="glass-card flex min-h-[320px] flex-col overflow-hidden rounded-2xl">
            {widgetSrc ? (
              <iframe
                title="Discord server widget"
                src={widgetSrc}
                className="min-h-[360px] w-full flex-1 border-0 bg-[#313338]"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8">
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    Widget indisponível
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-zinc-500">
                    Verifique se o ID do servidor está correto nas variáveis de ambiente.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
