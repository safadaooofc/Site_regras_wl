import {
  DEVELOPER_NAME,
  SECURITY_REPORT_CONTACT_URL,
  SUPPORT_DISCORD_INVITE_DEFAULT,
} from "../../config/community";

export function SecurityReportContact() {
  return (
    <div
      className="mb-10 rounded-2xl border border-sky-500/25 bg-sky-500/10 p-5 md:p-6"
      role="region"
      aria-label="Canais de reporte privado"
    >
      <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-sky-200">
        Reporte privado — não use canais públicos
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
        O código do site não está em repositório público no GitHub. Use um destes
        canais para enviar falhas de segurança:
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={SECURITY_REPORT_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
        >
          Contato {DEVELOPER_NAME} (portfólio)
        </a>
        <a
          href={SUPPORT_DISCORD_INVITE_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Discord Suporte Reuel
        </a>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Não publique exploits, tokens ou dados de outros usuários em chats abertos.
      </p>
    </div>
  );
}
