import { books } from '@/lib/books'
import BookPageClient from '@/components/BookPageClient'

const doneThisYear = books.filter(b => b.status === 'done' && b.year === 2025).length
const yearlyGoal = 12
const totalDone = books.filter(b => b.status === 'done').length

export default function Home() {
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
          <span>total read: <span className="text-accent">{totalDone}</span></span>
        </div>
      </header>

      {/* Click tip */}
      <div className="text-center py-3 font-mono text-xs text-muted border-b border-white/5">
        <span className="text-accent">tip:</span> click a completed book to read my review
      </div>

      {/* Client component handles filter state + book sections */}
      <BookPageClient books={books} />

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
