import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Only fire analytics on the canonical production host, so Vercel preview/deploy
// URLs (*.vercel.app), localhost, and bots crawling non-prod builds don't pollute
// the GA4 property — this was the main source of inflated "Direct" sessions.
const PROD_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com').hostname
  } catch {
    return 'proinvestorhub.com'
  }
})()

// Server-side guard: never render analytics on non-production Vercel deploys
// (preview/branch). The client-side PROD_HOST check below additionally blocks
// the production deploy when reached via its *.vercel.app alias.
const IS_NON_PROD_DEPLOY =
  !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'

export function GoogleTagManager() {
  if (!GTM_ID || IS_NON_PROD_DEPLOY) return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `if(location.hostname==='${PROD_HOST}'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');}`,
        }}
      />
    </>
  )
}

export function GoogleTagManagerNoscript() {
  if (!GTM_ID || IS_NON_PROD_DEPLOY) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GTM_ID || IS_NON_PROD_DEPLOY) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Only collect on the canonical production host (see PROD_HOST note above).
          if (location.hostname === '${PROD_HOST}') {
            gtag('config', '${GA_MEASUREMENT_ID}');
          }
        `}
      </Script>
    </>
  )
}
