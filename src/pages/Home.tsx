import { Hero } from "../components/Hero";
import { SectionAbout } from "../components/SectionAbout";
import { SectionCTA } from "../components/SectionCTA";
import { SectionDiscord } from "../components/SectionDiscord";
import { SectionRules } from "../components/SectionRules";
import { SectionServers } from "../components/SectionServers";
import { SectionSocial } from "../components/SectionSocial";
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
      <SectionSocial />
      <SectionCTA />
    </main>
  );
}
