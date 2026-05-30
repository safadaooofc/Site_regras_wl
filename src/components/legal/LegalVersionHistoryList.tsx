import { legalVersionHistory } from "../../content/legalVersionHistory";

export function LegalVersionHistoryList() {
  return (
    <div className="space-y-8">
      {legalVersionHistory.map((entry) => (
        <article
          key={entry.version}
          id={`versao-${entry.version.replace(/\./g, "-")}`}
          className="scroll-mt-32 rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              Versão {entry.version}
            </h2>
            <time className="text-sm text-zinc-500" dateTime={entry.date}>
              {entry.date}
            </time>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{entry.summary}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-500">
            {entry.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
