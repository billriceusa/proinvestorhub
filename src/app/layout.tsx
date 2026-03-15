import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
  GoogleAnalytics,
} from '@/components/analytics'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export const metadata: Metadata = {
  title: {
    default: 'ProInvestorHub - Smart Real Estate Investing Starts Here',
    template: '%s | ProInvestorHub',
  },
  description:
    'Expert guides, calculators, and education for real estate investors. Master cap rates, cash flow analysis, BRRRR, and more.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ProInvestorHub',
    title: 'ProInvestorHub - Smart Real Estate Investing Starts Here',
    description:
      'Expert guides, calculators, and education for real estate investors.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProInvestorHub',
    description:
      'Expert guides, calculators, and education for real estate investors.',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
  other: {
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : {}),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
