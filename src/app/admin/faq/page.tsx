export const dynamic = 'force-static' // atau: export const revalidate = 3600
export default function FAQ() {
  return (
    <main className="prose mx-auto p-6">
      <h1>FAQ</h1>
      <p>…konten statis…</p>
    </main>
  )
 }