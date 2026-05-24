import { useEffect, useState } from "react";
import type { CommunityBranch } from "../config/community";
import { getPresenceApiUrl } from "../config/community";

function parseDemo(branch: CommunityBranch): number | null {
  const raw =
    branch === "eb"
      ? import.meta.env.VITE_EB_DEMO_ONLINE_PLAYERS
      : import.meta.env.VITE_DEMO_ONLINE_PLAYERS;
  if (raw === undefined || raw === "") return null;
  const n = Number.parseInt(String(raw), 10);
  return Number.isFinite(n) ? n : null;
}

function parseCount(data: unknown): number | null {
  if (typeof data === "number") return data;
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  if (typeof o.count === "number") return o.count;
  if (typeof o.presence_count === "number") return o.presence_count;
  return null;
}

/**
 * Contagem via widget Discord (`presence_count`) ou API customizada.
 */
export function useOnlinePlayers(branch: CommunityBranch = "rp") {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const api = getPresenceApiUrl(branch);
    const demo = parseDemo(branch);

    if (!api) {
      setLoading(false);
      setCount(demo);
      setError(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(api, { credentials: "omit" })
      .then((res) => {
        if (!res.ok) throw new Error("bad status");
        return res.json() as Promise<unknown>;
      })
      .then((data) => {
        if (cancelled) return;
        const n = parseCount(data);
        setCount(n ?? demo ?? 0);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setCount(demo ?? null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const id = window.setInterval(() => {
      fetch(api, { credentials: "omit" })
        .then((res) => res.json() as Promise<unknown>)
        .then((data) => {
          if (cancelled) return;
          const n = parseCount(data);
          if (n !== null) setCount(n);
        })
        .catch(() => {});
    }, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [branch]);

  return { count, loading, error };
}
