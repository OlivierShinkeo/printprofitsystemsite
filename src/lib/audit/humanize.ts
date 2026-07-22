/** Turns a camelCase field key (e.g. "raisonSociale") into a readable label ("Raison sociale"). */
export function humanizeKey(key: string): string {
  const withSpaces = key.replace(/([A-Z])/g, " $1").toLowerCase().trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
