import { Link } from "react-router-dom";
import { SecurityReportContact } from "../../components/legal/SecurityReportContact";
import { legalDocuments, LEGAL_LAST_UPDATED } from "../../content/legalDocuments";

export function LegalIndexPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
        Informações legais
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
        Transparência sobre uso do site, privacidade de dados, segurança digital e
        compras de itens virtuais na rede. Estes textos têm caráter informativo e
        complementam as regras das filiais e as políticas da Roblox e do Discord.
      </p>
      <p className="mt-2 text-xs text-zinc-600">
        Última atualização geral: {LEGAL_LAST_UPDATED}
      </p>

      <div className="mt-8">
        <SecurityReportContact />
        <p className="mt-3 text-center text-sm text-zinc-500">
          <Link to="/legal/reporte" className="text-sky-400 hover:text-sky-300">
            Ler política completa de reporte →
          </Link>
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {legalDocuments.map((doc) => (
          <li key={doc.slug}>
            <Link
              to={`/legal/${doc.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white group-hover:text-sky-300">
                {doc.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                {doc.shortDescription}
              </p>
              <span className="mt-4 text-sm font-medium text-sky-400">
                Ler documento →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs leading-relaxed text-amber-200/80">
        Aviso: este conteúdo não substitui assessoria jurídica. Em caso de dúvida
        específica, consulte um advogado. Para falhas de segurança do site, use a página{" "}
        <Link to="/legal/reporte" className="underline hover:text-amber-100">
          Reporte de vulnerabilidades
        </Link>{" "}
        (canal privado — o GitHub do projeto não é público).
      </p>
    </div>
  );
}
