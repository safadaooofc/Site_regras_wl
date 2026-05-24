export function RuleSectionBlock({
  section,
}: {
  section: { id: string; title: string; body: string };
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-32 border-b border-white/8 pb-14 last:border-0 last:pb-0"
    >
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl">
        {section.title}
      </h2>
      <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6">
        <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
          {section.body}
        </pre>
      </div>
    </section>
  );
}
