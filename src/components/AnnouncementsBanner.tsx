import type { Announcement } from "../types/cms";

export function AnnouncementsBanner({ items }: { items: Announcement[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-3 px-4 pt-4 md:px-6">
      {items.map((a) => (
        <article
          key={a.id}
          className="rounded-lg border border-blue-500/25 bg-blue-950/20 px-4 py-3 md:px-5 md:py-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400/90">
            {a.branch === "all"
              ? "Reuel"
              : a.branch === "rp"
                ? "Capital MT BR"
                : "Exército Brasileiro"}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {a.title}
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{a.body}</p>
        </article>
      ))}
    </div>
  );
}
