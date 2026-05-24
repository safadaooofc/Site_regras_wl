import { NavLink } from "react-router-dom";
import { EB_FILIAL_NAME, RP_FILIAL_NAME } from "../../config/community";

const branches = [
  { to: "/regras/rp", label: "Regras RP", hint: RP_FILIAL_NAME },
  { to: "/regras/eb", label: "Regras EB", hint: EB_FILIAL_NAME },
] as const;

export function RulesBranchNav() {
  return (
    <div
      className="flex flex-wrap gap-2 rounded-lg border border-white/8 bg-white/[0.02] p-1"
      role="tablist"
      aria-label="Filial do regulamento"
    >
      {branches.map((b) => (
        <NavLink
          key={b.to}
          to={b.to}
          className={({ isActive }) =>
            `min-w-[9rem] flex-1 rounded-md px-4 py-2.5 text-left transition sm:flex-none ${
              isActive
                ? "bg-blue-600/20 text-white ring-1 ring-blue-500/30"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
            }`
          }
        >
          <span className="block text-sm font-semibold">{b.label}</span>
          <span className="block text-xs text-zinc-500">{b.hint}</span>
        </NavLink>
      ))}
    </div>
  );
}
