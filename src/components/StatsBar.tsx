import { RP_FILIAL_NAME, EB_FILIAL_NAME } from "../config/community";
import { useOnlinePlayers } from "../hooks/useOnlinePlayers";

export function StatsBar() {
  const rp = useOnlinePlayers("rp");
  const eb = useOnlinePlayers("eb");

  const items = [
    {
      label: `Discord · ${RP_FILIAL_NAME}`,
      value: rp.loading ? "…" : rp.count != null ? String(rp.count) : "—",
      hint: "Presença no servidor (widget)",
    },
    {
      label: `Discord · ${EB_FILIAL_NAME}`,
      value: eb.loading ? "…" : eb.count != null ? String(eb.count) : "—",
      hint: "Presença no servidor (widget)",
    },
    {
      label: "Mapa RP",
      value: "Reinaugurando",
      hint: "Novo mapa e temporada em preparação",
    },
  ];

  const showHint =
    rp.error || eb.error || (rp.count === 0 && !rp.loading) || (eb.count === 0 && !eb.loading);

  return (
    <section className="relative z-10 -mt-2 pb-6">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3 md:px-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="glass-card rounded-lg px-5 py-4 md:text-left text-center"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {item.label}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{item.hint}</p>
          </div>
        ))}
      </div>
      {showHint && (
        <p className="mx-auto mt-3 max-w-3xl px-4 text-center text-xs text-zinc-500 md:px-6">
          Se o contador ficar em 0 ou “—”, ative o{" "}
          <strong className="text-zinc-400">Server Widget</strong> nas configurações do servidor no
          Discord (Configurações → Widget do servidor). Use o arquivo{" "}
          <code className="rounded bg-white/5 px-1">.env</code> na raiz (não só{" "}
          <code className="rounded bg-white/5 px-1">.env.example</code>) e reinicie o{" "}
          <code className="rounded bg-white/5 px-1">iniciar-site.bat</code>.
        </p>
      )}
    </section>
  );
}
