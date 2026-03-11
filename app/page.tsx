import { books } from '@/lib/books'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg p-8">
      <h1 className="font-sans text-6xl text-accent">readME</h1>
      <p className="font-mono text-muted mt-2">keeping track of my reading</p>
      <p className="font-mono text-text-body mt-4">{books.length} books loaded</p>
    </main>
  )
}
