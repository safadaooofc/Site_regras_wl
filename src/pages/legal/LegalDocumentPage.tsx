import { Link, Navigate, useParams } from "react-router-dom";
import { LegalVersionHistoryList } from "../../components/legal/LegalVersionHistoryList";
import { SecurityReportContact } from "../../components/legal/SecurityReportContact";
import { getLegalDocument, isLegalDocumentSlug } from "../../content/legalDocuments";

export function LegalDocumentPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isLegalDocumentSlug(slug)) {
    return <Navigate to="/legal" replace />;
  }

  const doc = getLegalDocument(slug);
  if (!doc) {
    return <Navigate to="/legal" replace />;
  }

  return (
    <article>
      <header>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Atualizado em {doc.lastUpdated}
        </p>
      </header>

      {slug === "reporte" && <SecurityReportContact />}

      {slug !== "historico" && (
      <nav
        className="mt-8 rounded-xl border border-white/8 bg-white/[0.02] p-4"
        aria-label="Índice do documento"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Nesta página
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-zinc-400">
          {doc.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-sky-300">
                {s.title.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      )}

      <div className="mt-10 space-y-12">
        {doc.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-32 border-b border-white/8 pb-12 last:border-0"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-zinc-400 md:text-base whitespace-pre-line"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        {slug === "historico" && (
          <section className="scroll-mt-32">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl">
              2. Registro de versões
            </h2>
            <div className="mt-6">
              <LegalVersionHistoryList />
            </div>
          </section>
        )}
      </div>

      <footer className="mt-12 flex flex-wrap gap-4 border-t border-white/8 pt-8 text-sm">
        <Link to="/legal" className="text-sky-400 hover:text-sky-300">
          ← Todos os documentos
        </Link>
        <Link to="/" className="text-zinc-500 hover:text-zinc-300">
          Voltar ao início
        </Link>
      </footer>
    </article>
  );
}
