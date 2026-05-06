import { useEffect, useState } from "react";

const links = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/regras", label: "Regras" },
  { href: "/#servidores", label: "Servidores" },
  { href: "/#discord", label: "Discord" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#banners", label: "Banners" },
];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#0a0a10]/85 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          Capital do MT{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            BR
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/#cta"
            className="hidden rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] transition hover:brightness-110 sm:inline-flex"
            onClick={() => setOpen(false)}
          >
            Jogar agora
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#0a0a10]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#cta"
              className="mt-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Jogar agora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
