interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

/** Generic labelled `<select>` for closed-list questions across questionnaire steps. */
export function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600"
      >
        {label}
      </label>
      <select
        id={id}
        className="light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">—</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
