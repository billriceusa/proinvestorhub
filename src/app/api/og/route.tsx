import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || ''

async function fetchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_KEY) return null
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' real estate investing')}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.results?.[0]?.urls?.regular || null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'ProInvestorHub'
  const category = searchParams.get('category') || ''
  const type = searchParams.get('type') || 'article' // article, glossary, calculator

  // Fetch Unsplash background for articles
  let bgImageUrl: string | null = null
  if (type === 'article' && title !== 'ProInvestorHub') {
    bgImageUrl = await fetchUnsplashImage(title)
  }

  const typeLabel =
    type === 'glossary' ? 'Glossary' :
    type === 'calculator' ? 'Calculator' :
    category || 'Guide'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200',
          height: '630',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          background: '#1B4D3E',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image with overlay */}
        {bgImageUrl && (
          <img
            src={bgImageUrl}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
            }}
          />
        )}
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1200px',
            height: '630px',
            background: bgImageUrl
              ? 'linear-gradient(to top, rgba(27,77,62,0.95) 0%, rgba(27,77,62,0.7) 50%, rgba(27,77,62,0.4) 100%)'
              : 'linear-gradient(135deg, #1B4D3E 0%, #143D30 100%)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                background: '#D4A843',
                color: '#1B4D3E',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '900px',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </h1>

          {/* Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '30px',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                background: '#D4A843',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                color: '#1B4D3E',
              }}
            >
              PI
            </div>
            <span style={{ fontSize: '20px', fontWeight: 600, opacity: 0.9 }}>
              ProInvestorHub
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
