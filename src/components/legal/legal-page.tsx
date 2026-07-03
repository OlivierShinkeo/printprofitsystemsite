export interface LegalSection {
  heading: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  updated?: string;
  sections: LegalSection[];
}

/** Shared layout for legal pages (mentions légales, confidentialité, CGV). */
export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <section className="bg-white py-32">
      <div className="cnt-n">
        <h1 className="mb-4 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
          {title}
        </h1>
        {updated && <p className="mb-14 text-sm text-neutral-500">Dernière mise à jour&nbsp;: {updated}</p>}

        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-4 font-display text-xl font-bold text-navy-800">{section.heading}</h2>
              <div className="flex flex-col gap-2.5 text-md leading-loose text-neutral-700">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
