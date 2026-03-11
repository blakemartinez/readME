'use client'
import { useState, useMemo } from 'react'
import { Book } from '@/lib/books'
import { FilterState, filterBooks, getActiveYears } from '@/lib/utils'
import FilterBar from './FilterBar'
import BookGrid from './BookGrid'

interface BookPageClientProps {
  books: Book[]
}

const DEFAULT_FILTERS: FilterState = {
  genres: new Set<string>(),
  query: '',
  years: new Set<number>(),
}

export default function BookPageClient({ books }: BookPageClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const availableYears = useMemo(() => getActiveYears(books), [books])

  const filtered = useMemo(() => filterBooks(books, filters), [books, filters])

  const reading = filtered.filter(b => b.status === 'reading')
  const done = filtered.filter(b => b.status === 'done')
  const backlog = filtered.filter(b => b.status === 'backlog')

  const totalBooks = books.filter(b => b.status !== 'backlog').length
  const visibleBooks = filtered.filter(b => b.status !== 'backlog').length

  return (
    <>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        visibleCount={visibleBooks}
        totalCount={totalBooks}
        availableYears={availableYears}
      />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <BookGrid title="reading" books={reading} />
        <BookGrid title="done" books={done} />
        <BookGrid title="back-log" books={backlog} />
      </main>
    </>
  )
}
