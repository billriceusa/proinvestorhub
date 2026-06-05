import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Consolidate the legacy /guides/best-cities/* duplicates onto the canonical
  // /markets/* pages with PERMANENT (301) redirects. The old pages used a
  // runtime redirect() (307 temporary), which kept Google indexing the dupes
  // and split ranking signals — the old /guides/best-cities/brrrr was ranking
  // page 1 while the canonical /markets/brrrr sat at pos ~16. A 301 transfers
  // that equity to the canonical page.
  async redirects() {
    return [
      {
        source: '/guides/best-cities',
        destination: '/markets',
        permanent: true,
      },
      {
        source: '/guides/best-cities/:strategy',
        destination: '/markets/:strategy',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
