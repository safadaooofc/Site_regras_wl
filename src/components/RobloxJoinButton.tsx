import type { CommunityBranch } from "../config/community";
import { getRobloxGameUrl, isRobloxMapAvailable } from "../config/community";

type Props = {
  branch: CommunityBranch;
  className?: string;
  fullWidth?: boolean;
};

export function RobloxJoinButton({ branch, className = "", fullWidth }: Props) {
  const url = getRobloxGameUrl(branch);
  const available = isRobloxMapAvailable(branch);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition";
  const width = fullWidth ? "w-full" : "";

  if (available && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${width} bg-[#e2231a] text-white hover:bg-[#c91f18] ${className}`}
      >
        <RobloxIcon />
        Entrar no mapa (Roblox)
      </a>
    );
  }

  return (
    <span
      className={`${base} ${width} cursor-not-allowed border border-white/10 bg-white/5 text-zinc-500 ${className}`}
      title={
        branch === "rp"
          ? "Mapa em reinauguração — link será liberado em breve"
          : "Mapa indisponível"
      }
    >
      <RobloxIcon muted />
      {branch === "rp" ? "Mapa RP indisponível" : "Mapa Roblox em breve"}
    </span>
  );
}

function RobloxIcon({ muted }: { muted?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${muted ? "opacity-50" : ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 3h16v18l-4-3-4 3-4-3-4 3V3z" />
    </svg>
  );
}
