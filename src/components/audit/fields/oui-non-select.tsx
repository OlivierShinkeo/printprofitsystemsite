import { OUI_NON_PARTIEL } from "@/lib/audit/common-options";

interface OuiNonSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/** Shared across several questionnaire steps for "existe-t-il / est-ce suivi ?" questions. */
export function OuiNonSelect({ id, label, value, onChange }: OuiNonSelectProps) {
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
        {OUI_NON_PARTIEL.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
