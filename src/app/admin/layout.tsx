/** Bare `<main>` for the whole /admin subtree — no marketing Nav/Footer here. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main id="main-content">{children}</main>;
}
