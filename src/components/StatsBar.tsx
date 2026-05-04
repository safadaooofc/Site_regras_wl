import { useOnlinePlayers } from "../hooks/useOnlinePlayers";

export function StatsBar() {
  const { count, loading, error } = useOnlinePlayers();

  const items = [
    {
      label: "Presença no Discord",
      value: loading ? "…" : count != null ? String(count) : "—",
      hint: "atualizado em até 1 min",
    },
    {
      label: "Cidade",
      value: "Capital do MT",
      hint: "Whitelist e regras no Discord",
    },
    {
      label: "Suporte",
      value: "Tickets",
      hint: "Canal de suporte no servidor oficial",
    },
  ];

  return (
    <section className="relative z-10 -mt-4 pb-4 md:-mt-8">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3 md:px-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="glass-card rounded-2xl px-6 py-5 text-center md:text-left"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {item.label}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{item.hint}</p>
          </div>
        ))}
      </div>
      {error && (
        <p className="mx-auto mt-2 max-w-6xl px-4 text-center text-xs text-amber-400/90 md:px-6">
          Não foi possível ler o widget agora (rede ou bloqueio do navegador). Em produção,
          configure um proxy na hospedagem ou use{" "}
          <code className="rounded bg-white/10 px-1">VITE_PLAYERS_API</code> apontando para
          um endpoint que replique o JSON.
        </p>
      )}
    </section>
  );
}
