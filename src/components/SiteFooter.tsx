const footerLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/regras", label: "Regras" },
  { href: "/#servidores", label: "Servidores" },
  { href: "/#discord", label: "Discord" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#banners", label: "Banners" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#06060a] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Capital do MT{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              BR
            </span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">
            Comunidade de roleplay — Mato Grosso. Whitelist, regras e eventos pelo Discord
            oficial.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Rodapé">
          {footerLinks.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="text-sm text-zinc-400 transition hover:text-cyan-400"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 px-4 pt-8 md:px-6">
        <p className="text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Capital do MT BR — Site da comunidade.
        </p>
      </div>
    </footer>
  );
}
