import { useEffect, useState } from "react";
import type { SiteContent } from "../types/cms";

let cache: SiteContent | null = null;
let inflight: Promise<SiteContent | null> | null = null;

async function fetchContent(): Promise<SiteContent | null> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch("/api/content")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) cache = data as SiteContent;
      return cache;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function invalidateSiteContentCache() {
  cache = null;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let cancelled = false;
    fetchContent().then((data) => {
      if (!cancelled) {
        setContent(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading };
}
