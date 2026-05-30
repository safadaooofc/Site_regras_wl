import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import {
  getLegalDocument,
  legalDocuments,
  LEGAL_LAST_UPDATED,
} from "../../content/legalDocuments";
import { COMPANY_NAME } from "../../config/community";

export function LegalDocumentLayout() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getLegalDocument(slug) : undefined;

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Navegação secundária">
          <Link to="/" className="text-sky-400 hover:text-sky-300">
            Início
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link to="/legal" className="text-sky-400 hover:text-sky-300">
            Legal
          </Link>
          {doc && (
            <>
              <span className="mx-2 text-zinc-600">/</span>
              <span className="text-zinc-400">{doc.title}</span>
            </>
          )}
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="lg:w-56 lg:shrink-0">
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Documentos
            </p>
            <ul className="mt-3 space-y-1">
              {legalDocuments.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/legal/${item.slug}`}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? "bg-sky-500/10 font-medium text-sky-300"
                          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-zinc-600">
              {COMPANY_NAME} · atualizado em {LEGAL_LAST_UPDATED}
            </p>
          </aside>

          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
