import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1B4D3E',
          borderRadius: 32,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 96, fontWeight: 700, color: '#D4A843' }}>
          PI
        </span>
      </div>
    ),
    { ...size }
  )
}
