import publicImages from "../generated/public-images.json";

function labelFromUrl(url: string): string {
  const base = url.split("/").pop() ?? "Banner";
  const name = base.replace(/\.[^.]+$/, "");
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Banner";
}

export function SectionBanners() {
  const images = publicImages as string[];
  const multi = images.length > 1;

  return (
    <section id="banners" className="scroll-mt-24 border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
          Banners
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Imagens em <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">public/</code>{" "}
          (PNG, JPG, WebP, GIF, SVG, etc.) — a lista atualiza ao iniciar{" "}
          <code className="rounded bg-white/10 px-1 text-sm">npm run dev</code> ou{" "}
          <code className="rounded bg-white/10 px-1 text-sm">npm run build</code>.
        </p>

        {images.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-zinc-500">
            Nenhuma imagem encontrada. Adicione ficheiros em{" "}
            <code className="text-zinc-400">public/</code> e volte a executar o projeto.
          </p>
        ) : (
          <div
            className={`mt-12 grid gap-6 ${multi ? "md:grid-cols-2" : "max-w-4xl"}`}
          >
            {images.map((src) => {
              const label = labelFromUrl(src);
              return (
                <figure
                  key={src}
                  className="glass-card overflow-hidden rounded-2xl border border-white/10 p-2"
                >
                  <img
                    src={src}
                    alt={label}
                    className="h-auto w-full rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="sr-only">{label}</figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
