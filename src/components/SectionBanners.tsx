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
  const allImages = publicImages as string[];
  
  const fanArts = allImages.filter(src => src.startsWith("/fans/"));
  const official = allImages.filter(src => !src.startsWith("/fans/"));

  return (
    <section id="banners" className="scroll-mt-24 border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
            Galeria de Imagens
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Confira nossos banners oficiais e as incríveis artes criadas pela nossa comunidade.
          </p>
        </div>

        {/* Seção Oficial */}
        <div className="mt-16">
          <h3 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            <span className="h-px w-8 bg-sky-500/50" />
            Banners Oficiais
          </h3>
          
          {official.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-zinc-500">
              Nenhum banner oficial encontrado.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {official.map((src) => (
                <ImageCard key={src} src={src} />
              ))}
            </div>
          )}
        </div>

        {/* Seção Fan Arts */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              <span className="h-px w-8 bg-cyan-500/50" />
              Fan Arts & Banners Fans
            </h3>
            <p className="text-sm text-zinc-500">
              Envie sua arte em nosso Discord para aparecer aqui!
            </p>
          </div>

          {fanArts.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-zinc-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="mt-4 text-zinc-500">
                Nenhuma fan art enviada ainda. Seja o primeiro!
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Adicione ficheiros em <code className="bg-white/5 px-1 rounded">public/fans/</code>
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fanArts.map((src) => (
                <ImageCard key={src} src={src} isSmall />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageCard({ src, isSmall = false }: { src: string; isSmall?: boolean }) {
  const label = labelFromUrl(src);
  return (
    <figure className="group relative glass-card overflow-hidden rounded-2xl border border-white/10 p-2 transition-all hover:border-sky-400/30">
      {/* Adaptive Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover blur-3xl scale-150 opacity-40 saturate-150 transition-transform duration-700 group-hover:scale-125"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className={`relative z-10 overflow-hidden rounded-xl ${isSmall ? 'aspect-square' : ''}`}>
        <img
          src={src}
          alt={label}
          className={`h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] ${isSmall ? 'h-full object-cover' : ''}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
