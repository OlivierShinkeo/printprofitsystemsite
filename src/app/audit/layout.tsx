/** Bare `<main>` for the whole /audit subtree — no marketing Nav/Footer here. */
export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <main id="main-content">{children}</main>;
}
