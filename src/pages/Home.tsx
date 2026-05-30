import { useEffect, useState } from "react";
import { AnnouncementsByPosition } from "../components/AnnouncementsBanner";
import { Hero } from "../components/Hero";
import { useSiteContent } from "../hooks/useSiteContent";
import { SectionAbout } from "../components/SectionAbout";
import { SectionBanners } from "../components/SectionBanners";
import { SectionCTA } from "../components/SectionCTA";
import { SectionDiscord } from "../components/SectionDiscord";
import { SectionEquipe } from "../components/SectionEquipe";
import { SectionRules } from "../components/SectionRules";
import { SectionServers } from "../components/SectionServers";
import { StatsBar } from "../components/StatsBar";

function DiscordJoinNotice() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("discord_join");
    if (!status) return;

    if (status === "partial") {
      setMessage(
        "Você entrou em parte dos servidores Discord da Reuel. Use os convites abaixo para os que faltarem."
      );
    } else if (status === "failed") {
      setMessage(
        "Não foi possível adicionar você automaticamente aos Discords. Entre pelos convites na seção Discord."
      );
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("discord_join");
    window.history.replaceState({}, "", url.pathname + url.hash);
  }, []);

  if (!message) return null;

  return (
    <div
      className="mx-auto max-w-6xl px-4 pt-4 md:px-6"
      role="status"
    >
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        {message}
      </p>
    </div>
  );
}

export function Home() {
  const { content } = useSiteContent();
  const announcements = content?.announcements ?? [];
  const hasSticky = announcements.some(
    (a) => a.active !== false && (a.position ?? "after-hero") === "sticky-top"
  );

  return (
    <main className={hasSticky ? "pt-[var(--announcement-sticky,0px)]" : ""}>
      <AnnouncementsByPosition items={announcements} position="sticky-top" />
      <DiscordJoinNotice />
      <Hero>
        <AnnouncementsByPosition items={announcements} position="before-hero" />
      </Hero>
      <AnnouncementsByPosition items={announcements} position="after-hero" />
      <StatsBar />
      <SectionAbout />
      <SectionRules />
      <SectionServers />
      <SectionDiscord />
      <SectionEquipe />
      <SectionBanners />
      <AnnouncementsByPosition items={announcements} position="before-footer" />
      <SectionCTA />
    </main>
  );
}
