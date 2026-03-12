import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'ProInvestorHub - Smart Real Estate Investing Starts Here',
    template: '%s | ProInvestorHub',
  },
  description:
    'Expert guides, calculators, and education for real estate investors. Master cap rates, cash flow analysis, BRRRR, and more.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
