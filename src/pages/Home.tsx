import { Hero } from "../components/Hero";
import { SectionAbout } from "../components/SectionAbout";
import { SectionBanners } from "../components/SectionBanners";
import { SectionCTA } from "../components/SectionCTA";
import { SectionDiscord } from "../components/SectionDiscord";
import { SectionRules } from "../components/SectionRules";
import { SectionServers } from "../components/SectionServers";
import { StatsBar } from "../components/StatsBar";

export function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <SectionAbout />
      <SectionRules />
      <SectionServers />
      <SectionDiscord />
      <SectionBanners />
      <SectionCTA />
    </main>
  );
}
