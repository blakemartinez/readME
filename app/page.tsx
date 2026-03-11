import { books } from '@/lib/books'
import BookGrid from '@/components/BookGrid'

export default function Home() {
  const reading = books.filter(b => b.status === 'reading')
  const done = books.filter(b => b.status === 'done')
  const backlog = books.filter(b => b.status === 'backlog')

  const doneThisYear = done.filter(b => b.year === 2025).length
  const yearlyGoal = 12

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="text-center py-8 border-b border-white/10">
        <h1 className="font-sans text-7xl md:text-8xl font-bold text-text-body">
          read<span className="text-accent">ME</span>
        </h1>
        <p className="font-mono text-muted mt-2 text-sm">keeping track of my reading 📚</p>
        <div className="flex justify-center gap-6 mt-4 font-mono text-xs text-muted">
          <span>2025 books: <span className="text-accent">{doneThisYear}</span> / {yearlyGoal}</span>
          <span>total read: <span className="text-accent">{done.length}</span></span>
        </div>
      </header>

      {/* Note */}
      <div className="text-center py-3 font-mono text-xs text-muted border-b border-white/5">
        <span className="text-accent">tip:</span> click a completed book to read my review
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <BookGrid title="reading" books={reading} />
        <BookGrid title="done" books={done} />
        <BookGrid title="back-log" books={backlog} />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10 font-mono text-xs text-muted">
        <a
          href="https://github.com/blakemartinez"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent transition-colors"
        >
          github.com/blakemartinez
        </a>
        <p className="mt-2">last updated: Dec 2024</p>
      </footer>
    </div>
  )
}
