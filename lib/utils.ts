import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Book } from './books'

export interface FilterState {
  genres: Set<string>
  query: string
  years: Set<number>
}

export function filterBooks(books: Book[], filters: FilterState): Book[] {
  return books.filter(book => {
    // Genre filter: book must match at least one selected genre (OR logic)
    if (filters.genres.size > 0) {
      const hasGenre = book.genres.some(g => filters.genres.has(g))
      if (!hasGenre) return false
    }

    // Year filter
    if (filters.years.size > 0) {
      if (!book.year || !filters.years.has(book.year)) return false
    }

    // Text search: title or author (case-insensitive)
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase()
      const matchesTitle = book.title.toLowerCase().includes(q)
      const matchesAuthor = book.author.toLowerCase().includes(q)
      if (!matchesTitle && !matchesAuthor) return false
    }

    return true
  })
}

export function getActiveYears(books: Book[]): number[] {
  const years = new Set(books.map(b => b.year).filter((y): y is number => !!y))
  return Array.from(years).sort((a, b) => b - a)
}
