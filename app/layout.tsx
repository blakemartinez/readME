import type { Metadata } from 'next'
import { Alumni_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const alumniSans = Alumni_Sans({
  subsets: ['latin'],
  variable: '--font-alumni',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'readME',
  description: 'keeping track of my reading',
  icons: {
    icon: '/static/books-stack-of-three.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${alumniSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-mono bg-bg text-text-body">
        {children}
      </body>
    </html>
  )
}
