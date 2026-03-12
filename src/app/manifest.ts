import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProInvestorHub',
    short_name: 'ProInvestorHub',
    description:
      'Expert guides, calculators, and education for real estate investors.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F7F4',
    theme_color: '#1B4D3E',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
