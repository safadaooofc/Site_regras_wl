/**
 * Coloque as imagens em /public (ex.: public/capitalmt.png).
 * Para mais banners, adicione ficheiros e entradas em BANNERS abaixo.
 */
const BANNERS: { src: string; alt: string }[] = [
  { src: "/capitalmt.png", alt: "Capital do MT BR — banner" },
];

export function SectionBanners() {
  return (
    <section id="banners" className="scroll-mt-24 border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white md:text-4xl">
          Banners
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Arte e identidade visual do nosso roleplay.
        </p>
        <div
          className={`mt-12 grid gap-6 ${
            BANNERS.length > 1 ? "md:grid-cols-2" : "max-w-4xl"
          }`}
        >
          {BANNERS.map((b) => (
            <figure
              key={b.src}
              className="glass-card overflow-hidden rounded-2xl border border-white/10 p-2"
            >
              <img
                src={b.src}
                alt={b.alt}
                className="h-auto w-full rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="sr-only">{b.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
