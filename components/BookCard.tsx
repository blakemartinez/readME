'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Book, GENRE_COLORS } from '@/lib/books'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const [reviewOpen, setReviewOpen] = useState(false)
  const isReading = book.status === 'reading'
  const hasReview = !!(book.review || book.whyReading)

  const stars = book.rating
    ? '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating)
    : null

  return (
    <div
      onClick={() => hasReview && setReviewOpen(!reviewOpen)}
      className={`
        relative flex flex-col items-center p-4 rounded-xl
        border transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
        backdrop-blur-[10px]
        ${isReading
          ? 'border-l-4 border-l-blue border-blue/30 bg-blue/5 hover:border-blue/80'
          : 'border-accent/30 bg-surface/80 hover:border-accent/80'
        }
        ${hasReview ? 'cursor-pointer' : 'cursor-default'}
        hover:scale-[1.02]
        w-full sm:max-w-[200px]
      `}
      style={isReading ? {
        boxShadow: 'inset 0 0 20px rgba(59,130,246,0.05)'
      } : {
        boxShadow: reviewOpen ? 'inset 0 0 20px rgba(16,185,129,0.08)' : undefined
      }}
    >
      {/* Cover image */}
      <div className="relative w-[110px] h-[160px] mb-3 flex-shrink-0">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover rounded-lg"
          sizes="110px"
        />
      </div>

      {/* Title */}
      <h3 className="font-mono text-sm font-bold text-center text-text-body leading-snug mb-1">
        {book.title}
        {book.seriesNumber && (
          <span className="block font-normal text-xs text-muted italic">
            Book {book.seriesNumber}
          </span>
        )}
      </h3>

      {/* Author */}
      <p className="font-mono text-xs text-muted text-center mb-2">{book.author}</p>

      {/* Stars */}
      {stars && (
        <p className="text-lg text-accent mb-1 tracking-tight">{stars}</p>
      )}

      {/* Genre tags */}
      <div className="flex flex-wrap gap-1 justify-center mt-1">
        {book.genres.map(genre => (
          <span
            key={genre}
            className="text-[10px] px-2 py-0.5 rounded-full text-white font-mono"
            style={{ backgroundColor: GENRE_COLORS[genre] ?? '#6b7280' }}
          >
            {genre}
          </span>
        ))}
      </div>

      {/* Year tag */}
      {book.year && (
        <span className="mt-1 text-[10px] font-mono text-muted">{book.year}</span>
      )}

      {/* Review expand — max-height transition, NOT display toggle */}
      {hasReview && (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out mt-2 w-full"
          style={{ maxHeight: reviewOpen ? '300px' : '0px' }}
        >
          <div className="pt-2 border-t border-accent/20">
            {book.whyReading && (
              <p className="font-mono text-xs text-text-body text-center leading-relaxed">
                <span className="text-accent font-bold">Why I&apos;m reading: </span>
                {book.whyReading}
              </p>
            )}
            {book.review && (
              <p className="font-mono text-xs text-text-body text-center leading-relaxed">
                {book.review}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Currently reading pulse indicator */}
      {isReading && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue animate-pulse" />
      )}
    </div>
  )
}
