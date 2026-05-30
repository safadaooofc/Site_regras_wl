import { Link } from "react-router-dom";
import { legalDocuments } from "../content/legalDocuments";
import {
  COMPANY_NAME,
  DEVELOPER_GITHUB_URL,
  DEVELOPER_NAME,
  DEVELOPER_PORTFOLIO_URL,
} from "../config/community";

const footerLinks = [
  { href: "/#inicio", label: "Início", external: false },
  { href: "/#filiais", label: "Filiais", external: false },
  { href: "/regras/rp", label: "Regras RP", external: false },
  { href: "/regras/eb", label: "Regras EB", external: false },
  { href: "/#discord", label: "Discord", external: false },
  { href: "/#equipe", label: "Equipe", external: false },
];

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external: boolean;
}) {
  const className =
    "text-sm text-zinc-500 transition hover:text-zinc-300";

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0e14] py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {COMPANY_NAME}
          </p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">
            Empresa central · filiais Capital MT BR e Exército Brasileiro.
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Navegação do site">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Site
          </p>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <li key={l.href + l.label}>
                <FooterLink {...l} />
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col gap-3" aria-label="Informações legais">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Legal
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/legal"
                className="text-sm text-zinc-500 transition hover:text-zinc-300"
              >
                Visão geral
              </Link>
            </li>
            {legalDocuments.map((doc) => (
              <li key={doc.slug}>
                <Link
                  to={`/legal/${doc.slug}`}
                  className="text-sm text-zinc-500 transition hover:text-zinc-300"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 px-4 pt-8 md:px-6">
        <p className="text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {COMPANY_NAME}. Ao usar o site você concorda com os{" "}
          <Link to="/legal/termos" className="text-zinc-500 underline hover:text-zinc-400">
            Termos de uso
          </Link>{" "}
          e a{" "}
          <Link to="/legal/privacidade" className="text-zinc-500 underline hover:text-zinc-400">
            Política de privacidade
          </Link>
          .
        </p>
        <p className="mt-3 text-center text-xs text-zinc-600">
          <Link to="/legal/cookies" className="text-zinc-500 underline hover:text-zinc-400">
            Cookies
          </Link>
          <span className="mx-1.5 text-zinc-700" aria-hidden>
            ·
          </span>
          <Link to="/legal/historico" className="text-zinc-500 underline hover:text-zinc-400">
            Histórico legal
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-zinc-600">
          Site desenvolvido por{" "}
          <a
            href={DEVELOPER_PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 underline decoration-zinc-600/60 underline-offset-2 transition hover:text-sky-400 hover:decoration-sky-400/50"
          >
            {DEVELOPER_NAME}
          </a>
          <span className="mx-1.5 text-zinc-700" aria-hidden>
            ·
          </span>
          <a
            href={DEVELOPER_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 underline decoration-zinc-600/60 underline-offset-2 transition hover:text-sky-400 hover:decoration-sky-400/50"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
