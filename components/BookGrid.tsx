import { Book } from '@/lib/books'
import BookCard from './BookCard'
import SeriesGroup from './SeriesGroup'

interface BookGridProps {
  title: string
  books: Book[]
  emptyMessage?: string
}

type GroupItem =
  | { type: 'single'; book: Book }
  | { type: 'series'; name: string; books: Book[]; total: number }

// Group books by series, keeping non-series books ungrouped
function groupBooks(books: Book[]): GroupItem[] {
  const seriesMap = new Map<string, Book[]>()
  const singles: Book[] = []

  for (const book of books) {
    if (book.series) {
      const existing = seriesMap.get(book.series) ?? []
      seriesMap.set(book.series, [...existing, book])
    } else {
      singles.push(book)
    }
  }

  const result: GroupItem[] = []

  // Add series groups (only group if 2+ books in section)
  for (const [name, seriesBooks] of seriesMap) {
    if (seriesBooks.length >= 2) {
      // total in series = highest seriesNumber across all books in this series
      const total = Math.max(...seriesBooks.map(b => b.seriesNumber ?? 1))
      result.push({ type: 'series', name, books: seriesBooks, total })
    } else {
      // Single series book in this section — treat as individual
      singles.push(...seriesBooks)
    }
  }

  // Add individual books
  for (const book of singles) {
    result.push({ type: 'single', book })
  }

  return result
}

export default function BookGrid({ title, books, emptyMessage }: BookGridProps) {
  if (books.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="font-sans text-4xl text-text-body mb-6 pb-2 border-b border-accent/30 inline-block">
          {title}
        </h2>
        {emptyMessage && (
          <p className="font-mono text-muted text-sm">{emptyMessage}</p>
        )}
      </section>
    )
  }

  const groups = groupBooks(books)

  return (
    <section className="mb-12">
      <h2 className="font-sans text-4xl text-text-body mb-6 pb-2 border-b border-accent/30 inline-block">
        {title}
      </h2>
      <div>
        {/* Series groups first */}
        {groups
          .filter((g): g is Extract<GroupItem, { type: 'series' }> => g.type === 'series')
          .map(g => (
            <SeriesGroup
              key={g.name}
              seriesName={g.name}
              books={g.books}
              totalInSeries={g.total}
            />
          ))}
        {/* Individual books */}
        <div className="flex flex-wrap gap-4">
          {groups
            .filter((g): g is Extract<GroupItem, { type: 'single' }> => g.type === 'single')
            .map(g => (
              <BookCard key={g.book.id} book={g.book} />
            ))}
        </div>
      </div>
    </section>
  )
}
