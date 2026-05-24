import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../config/community";

const links = [
  { href: "/#inicio", label: "Início" },
  { href: "/#filiais", label: "Filiais" },
  { href: "/#regras", label: "Regras" },
  { href: "/regras/rp", label: "Regras RP" },
  { href: "/regras/eb", label: "Regras EB" },
  { href: "/#discord", label: "Discord" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#banners", label: "Galeria" },
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
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-white/10 bg-[#0f1419]/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          to="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold text-white"
          onClick={() => setOpen(false)}
        >
          {COMPANY_NAME}
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#cta" className="btn-primary hidden sm:inline-flex" onClick={() => setOpen(false)}>
            Contato
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white xl:hidden"
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
          className="border-t border-white/10 bg-[#0f1419] px-4 py-4 xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-3 text-zinc-300 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="/#cta" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
