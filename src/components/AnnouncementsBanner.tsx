import type { Announcement, AnnouncementPosition } from "../types/cms";
import {
  branchLabel,
  getAnnouncementStyles,
  sortAnnouncements,
} from "../utils/announcementStyles";

function AnnouncementCard({ a }: { a: Announcement }) {
  const styles = getAnnouncementStyles(a);
  const accentStyle =
    a.color === "custom" && a.customColor
      ? ({
          borderColor: `${a.customColor}55`,
          backgroundColor: `${a.customColor}18`,
        } as React.CSSProperties)
      : undefined;

  return (
    <article
      className={`rounded-lg border px-4 py-3 md:px-5 md:py-4 ${styles.border} ${styles.bg}`}
      style={accentStyle}
    >
      <p className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}>
        {branchLabel(a.branch)}
      </p>
      <h2
        className={`mt-1 font-[family-name:var(--font-display)] text-lg font-semibold ${styles.title}`}
      >
        {a.title}
      </h2>
      <p className={`mt-2 whitespace-pre-wrap text-sm ${styles.body}`}>{a.body}</p>
    </article>
  );
}

type Props = {
  items: Announcement[];
  position: AnnouncementPosition;
};

export function AnnouncementsByPosition({ items, position }: Props) {
  const filtered = sortAnnouncements(items).filter(
    (a) => (a.position ?? "after-hero") === position
  );

  if (filtered.length === 0) return null;

  if (position === "sticky-top") {
    return (
      <div
        className="fixed left-0 right-0 top-[3.25rem] z-40 border-b border-white/10 bg-[#0f1419]/95 backdrop-blur-md"
        role="region"
        aria-label="Anúncios"
      >
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-2 md:px-6">
          {filtered.map((a) => (
            <AnnouncementCard key={a.id} a={a} />
          ))}
        </div>
      </div>
    );
  }

  if (position === "before-hero") {
    return (
      <div className="relative z-10 mx-auto max-w-6xl space-y-3 px-4 pb-4 md:px-6">
        {filtered.map((a) => (
          <AnnouncementCard key={a.id} a={a} />
        ))}
      </div>
    );
  }

  const spacing =
    position === "after-hero"
      ? "mx-auto max-w-6xl space-y-3 px-4 py-8 md:px-6"
      : "mx-auto max-w-6xl space-y-3 px-4 pb-12 md:px-6";

  return (
    <div className={spacing} role="region" aria-label="Anúncios">
      {filtered.map((a) => (
        <AnnouncementCard key={a.id} a={a} />
      ))}
    </div>
  );
}

/** @deprecated use AnnouncementsByPosition */
export function AnnouncementsBanner({ items }: { items: Announcement[] }) {
  return <AnnouncementsByPosition items={items} position="after-hero" />;
}
