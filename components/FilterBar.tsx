'use client'
import { ALL_GENRES, GENRE_COLORS } from '@/lib/books'
import { FilterState } from '@/lib/utils'

interface FilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  visibleCount: number
  totalCount: number
  availableYears: number[]
}

export default function FilterBar({
  filters,
  onFiltersChange,
  visibleCount,
  totalCount,
  availableYears,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.genres.size > 0 || filters.years.size > 0 || filters.query.trim().length > 0

  function toggleGenre(genre: string) {
    const next = new Set(filters.genres)
    if (next.has(genre)) next.delete(genre)
    else next.add(genre)
    onFiltersChange({ ...filters, genres: next })
  }

  function toggleYear(year: number) {
    const next = new Set(filters.years)
    if (next.has(year)) next.delete(year)
    else next.add(year)
    onFiltersChange({ ...filters, years: next })
  }

  function clearFilters() {
    onFiltersChange({ genres: new Set<string>(), query: '', years: new Set<number>() })
  }

  return (
    <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur-sm border-b border-white/10 py-3 px-4">
      <div className="max-w-6xl mx-auto space-y-3">
        {/* Text search */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="search by title or author..."
            value={filters.query}
            onChange={e => onFiltersChange({ ...filters, query: e.target.value })}
            className="
              flex-1 min-w-0 bg-surface border border-white/10 rounded-lg
              px-3 py-1.5 font-mono text-sm text-text-body
              placeholder:text-muted
              focus:outline-none focus:border-accent/50
              transition-colors
            "
          />
          {/* Book count */}
          <span className="font-mono text-xs text-muted ml-auto whitespace-nowrap">
            {hasActiveFilters
              ? <><span className="text-accent">{visibleCount}</span> / {totalCount} books</>
              : <><span className="text-accent">{totalCount}</span> books</>
            }
          </span>
          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="font-mono text-xs text-muted hover:text-accent transition-colors underline underline-offset-2 whitespace-nowrap"
            >
              clear
            </button>
          )}
        </div>

        {/* Genre pills */}
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map(genre => {
            const active = filters.genres.has(genre)
            const color = GENRE_COLORS[genre]
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`
                  font-mono text-xs px-3 py-1 rounded-full border transition-all duration-150
                  ${active
                    ? 'text-white border-transparent'
                    : 'text-muted border-white/10 bg-surface hover:border-white/20'
                  }
                `}
                style={active ? { backgroundColor: color, borderColor: color } : undefined}
              >
                {genre}
              </button>
            )
          })}

          {/* Year pills */}
          <div className="w-px bg-white/10 mx-1" />
          {availableYears.map(year => {
            const active = filters.years.has(year)
            return (
              <button
                key={year}
                onClick={() => toggleYear(year)}
                className={`
                  font-mono text-xs px-3 py-1 rounded-full border transition-all duration-150
                  ${active
                    ? 'bg-accent text-bg border-accent'
                    : 'text-muted border-white/10 bg-surface hover:border-white/20'
                  }
                `}
              >
                {year}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
