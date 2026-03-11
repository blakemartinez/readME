import { Book } from '@/lib/books'
import BookCard from './BookCard'

interface SeriesGroupProps {
  seriesName: string
  books: Book[]
  totalInSeries: number
}

export default function SeriesGroup({ seriesName, books, totalInSeries }: SeriesGroupProps) {
  const readCount = books.filter(b => b.status === 'done').length

  return (
    <div className="mb-6">
      {/* Series header */}
      <div className="flex items-center gap-3 mb-3 px-2">
        <span className="font-sans text-lg text-accent tracking-wide">{seriesName}</span>
        <span className="font-mono text-xs text-muted bg-surface px-2 py-0.5 rounded-full border border-accent/20">
          {readCount} / {totalInSeries} read
        </span>
        <div className="flex-1 h-px bg-accent/10" />
      </div>
      {/* Horizontal book row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4 px-2">
        {books
          .sort((a, b) => (a.seriesNumber ?? 0) - (b.seriesNumber ?? 0))
          .map(book => (
            <BookCard key={book.id} book={book} />
          ))}
      </div>
    </div>
  )
}
