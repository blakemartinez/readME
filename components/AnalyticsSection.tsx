import { Book, GENRE_COLORS, ALL_GENRES } from '@/lib/books'

interface AnalyticsSectionProps {
  books: Book[]
}

function getGenreCounts(books: Book[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const book of books) {
    for (const genre of book.genres) {
      counts[genre] = (counts[genre] ?? 0) + 1
    }
  }
  return counts
}

function getAvgRating(books: Book[]): string {
  const rated = books.filter(b => b.rating != null)
  if (rated.length === 0) return '—'
  const avg = rated.reduce((sum, b) => sum + (b.rating ?? 0), 0) / rated.length
  return avg.toFixed(1)
}

function getYearlySummary(books: Book[], year: number) {
  const yearBooks = books.filter(b => b.status === 'done' && b.year === year)
  const rated = yearBooks.filter(b => b.rating != null)
  const avg = rated.length
    ? (rated.reduce((sum, b) => sum + (b.rating ?? 0), 0) / rated.length).toFixed(1)
    : '—'
  return { count: yearBooks.length, avg }
}

export default function AnalyticsSection({ books }: AnalyticsSectionProps) {
  const doneBooks = books.filter(b => b.status === 'done')
  const genreCounts = getGenreCounts([...books.filter(b => b.status !== 'backlog')])
  const maxCount = Math.max(...Object.values(genreCounts), 1)
  const mostReadGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
  const avgRating = getAvgRating(doneBooks)

  const years = [2023, 2024, 2025, 2026]

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 border-t border-white/10">
      <h2 className="font-sans text-4xl text-text-body mb-8 pb-2 border-b border-accent/30 inline-block">
        analytics
      </h2>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'total read', value: doneBooks.length },
          { label: 'avg rating', value: `${avgRating} ★` },
          { label: 'top genre', value: mostReadGenre },
          { label: '2026 books', value: doneBooks.filter(b => b.year === 2026).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface border border-white/10 rounded-xl p-4 text-center">
            <p className="font-mono text-2xl text-accent font-bold">{value}</p>
            <p className="font-mono text-xs text-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Genre bar chart */}
      <div className="mb-10">
        <h3 className="font-sans text-xl text-muted mb-4">genre breakdown</h3>
        <div className="space-y-3">
          {ALL_GENRES
            .filter(g => genreCounts[g])
            .sort((a, b) => (genreCounts[b] ?? 0) - (genreCounts[a] ?? 0))
            .map(genre => {
              const count = genreCounts[genre] ?? 0
              const pct = Math.round((count / maxCount) * 100)
              const color = GENRE_COLORS[genre]
              return (
                <div key={genre} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted w-20 text-right flex-shrink-0">
                    {genre}
                  </span>
                  <div className="flex-1 bg-surface rounded-full h-5 overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="font-mono text-xs text-muted w-4 flex-shrink-0">{count}</span>
                </div>
              )
            })}
        </div>
      </div>

      {/* Yearly summaries */}
      <div>
        <h3 className="font-sans text-xl text-muted mb-4">by year</h3>
        <div className="flex flex-wrap gap-4">
          {years.map(year => {
            const { count, avg } = getYearlySummary(books, year)
            return (
              <div key={year} className="bg-surface border border-white/10 rounded-xl p-4 min-w-[120px]">
                <p className="font-sans text-2xl text-accent">{year}</p>
                <p className="font-mono text-xs text-muted mt-1">{count} books read</p>
                <p className="font-mono text-xs text-muted">avg {avg} ★</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
