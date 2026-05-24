import { COMPANY_NAME } from "../config/community";

const footerLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#filiais", label: "Filiais" },
  { href: "/regras/rp", label: "Regras RP" },
  { href: "/regras/eb", label: "Regras EB" },
  { href: "/#discord", label: "Discord" },
  { href: "/#equipe", label: "Equipe" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0e14] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {COMPANY_NAME}
          </p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">
            Empresa central · filiais Capital MT BR e Exército Brasileiro.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Rodapé">
          {footerLinks.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="text-sm text-zinc-500 transition hover:text-zinc-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 px-4 pt-8 md:px-6">
        <p className="text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {COMPANY_NAME}
        </p>
      </div>
    </footer>
  );
}
