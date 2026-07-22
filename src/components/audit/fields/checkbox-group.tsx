interface CheckboxGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
}

/** Shared across several questionnaire steps that ask "cochez ce qui s'applique". */
export function CheckboxGroup({ label, options, selected, onToggle }: CheckboxGroupProps) {
  return (
    <div>
      <p className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
        {label}
      </p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2.5 text-sm text-navy-800">
            <input
              type="checkbox"
              className="h-4 w-4 accent-gold-500"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
