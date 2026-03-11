import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1a1a1a',
        surface: '#2d2d2d',
        accent: '#10b981',
        blue: '#3b82f6',
        'text-body': '#d1d5db',
        muted: '#6b7280',
        'genre-scifi': '#0ea5e9',
        'genre-fantasy': '#8b5cf6',
        'genre-mystery': '#a78bfa',
        'genre-tech': '#10b981',
        'genre-nonfiction': '#f97316',
        'genre-fiction': '#ec4899',
        'genre-biography': '#06b6d4',
      },
      fontFamily: {
        sans: ['var(--font-alumni)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-border': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
