import { useMemo } from "react";
import equipeRaw from "../content/equipe.txt?raw";
import { COMPANY_NAME, EB_FILIAL_NAME, RP_FILIAL_NAME } from "../config/community";
import { parseEquipe, type ParsedTeam, type TeamMember } from "../utils/parseEquipe";

function MemberRow({ member }: { member: TeamMember }) {
  return (
    <li className="flex flex-col gap-0.5 border-b border-white/5 py-2.5 last:border-0 last:pb-0">
      <span className="font-medium text-zinc-200">{member.name}</span>
      {member.note && (
        <span className="text-xs text-zinc-500">{member.note}</span>
      )}
    </li>
  );
}

function TeamPanel({ team }: { team: ParsedTeam }) {
  const isRp = team.branch === "rp";
  const total = team.groups.reduce((n, g) => n + g.members.length, 0);

  return (
    <div
      className={`rounded-xl border p-6 md:p-8 ${
        isRp
          ? "border-blue-500/20 bg-blue-950/10"
          : "border-amber-600/20 bg-amber-950/10"
      }`}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isRp ? "text-blue-400/90" : "text-amber-600/90"
            }`}
          >
            Filial {isRp ? "RP" : "EB"}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            {team.label}
          </h3>
        </div>
        <p className="text-sm text-zinc-500">
          {team.groups.length} {team.groups.length === 1 ? "área" : "áreas"} · {total}{" "}
          {total === 1 ? "membro" : "membros"}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {team.groups.map((group) => (
          <article
            key={`${team.branch}-${group.role}`}
            className="glass-card rounded-lg p-5"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              {group.role}
            </h4>
            <ul className="mt-3">
              {group.members.map((member) => (
                <MemberRow key={`${group.role}-${member.name}`} member={member} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SectionEquipe() {
  const teams = useMemo(() => parseEquipe(equipeRaw), []);

  return (
    <section id="equipe" className="scroll-mt-24 border-y border-white/8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Equipe
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Organização da {COMPANY_NAME} por filial — {RP_FILIAL_NAME} e {EB_FILIAL_NAME}.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {teams.map((team) => (
            <TeamPanel key={team.branch} team={team} />
          ))}
        </div>

        {teams.length === 0 && (
          <p className="mt-10 rounded-lg border border-dashed border-white/10 p-8 text-center text-zinc-500">
            Nenhuma equipe encontrada. Use o formato{" "}
            <code className="text-zinc-400">=== ROLEPLAY ===</code> e{" "}
            <code className="text-zinc-400">[Nome do cargo]</code> em equipe.txt.
          </p>
        )}
      </div>
    </section>
  );
}
