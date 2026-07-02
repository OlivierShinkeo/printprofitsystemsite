interface LegalListProps {
  items: React.ReactNode[];
}

/** Dash-marker bullet list — matches the brand's typographic list convention (no icon set). */
export function LegalList({ items }: LegalListProps) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="flex-shrink-0 text-neutral-400">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
