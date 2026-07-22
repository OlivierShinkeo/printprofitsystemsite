"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

interface AdminAuditFiltersProps {
  statuses: { value: string; label: string }[];
  countries: string[];
  defaultValues: {
    statut?: string;
    pays?: string;
    entreprise?: string;
    du?: string;
    au?: string;
    avancementMin?: string;
    avancementMax?: string;
  };
}

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-navy-800 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wider text-neutral-500";

export function AdminAuditFilters({ statuses, countries, defaultValues }: AdminAuditFiltersProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const hasFilters = Object.values(defaultValues).some(Boolean);

  return (
    <form
      ref={formRef}
      className="mb-8 grid grid-cols-2 gap-4 rounded-md border border-neutral-200 bg-white p-5 sm:grid-cols-3 lg:grid-cols-7"
    >
      <div>
        <label className={labelClass} htmlFor="statut">
          Statut
        </label>
        <select id="statut" name="statut" defaultValue={defaultValues.statut ?? ""} className={inputClass}>
          <option value="">Tous</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="pays">
          Pays
        </label>
        <select id="pays" name="pays" defaultValue={defaultValues.pays ?? ""} className={inputClass}>
          <option value="">Tous</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="entreprise">
          Entreprise
        </label>
        <input
          id="entreprise"
          name="entreprise"
          type="text"
          placeholder="Nom..."
          defaultValue={defaultValues.entreprise ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="du">
          Invité depuis le
        </label>
        <input id="du" name="du" type="date" defaultValue={defaultValues.du ?? ""} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="au">
          Invité jusqu&apos;au
        </label>
        <input id="au" name="au" type="date" defaultValue={defaultValues.au ?? ""} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="avancementMin">
          Avancement min. (%)
        </label>
        <input
          id="avancementMin"
          name="avancementMin"
          type="number"
          min={0}
          max={100}
          placeholder="0"
          defaultValue={defaultValues.avancementMin ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="avancementMax">
          Avancement max. (%)
        </label>
        <input
          id="avancementMax"
          name="avancementMax"
          type="number"
          min={0}
          max={100}
          placeholder="100"
          defaultValue={defaultValues.avancementMax ?? ""}
          className={inputClass}
        />
      </div>

      <div className="col-span-2 flex items-end gap-3 sm:col-span-3 lg:col-span-7">
        <button
          type="submit"
          className="rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700"
        >
          Filtrer
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              formRef.current?.reset();
              router.push("/admin");
            }}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </form>
  );
}
