import { NextResponse } from 'next/server'
import { refreshMarketData } from '@/lib/cron/refresh-market-data'
import { Resend } from 'resend'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const REPORT_EMAIL = 'bill@billricestrategy.com'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await refreshMarketData()

    // Trigger on-demand revalidation for markets pages
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
    const revalidatePaths = [
      '/markets/cash-flow',
      '/markets/brrrr',
      '/markets/house-hacking',
      '/markets/appreciation',
    ]
    for (const path of revalidatePaths) {
      try {
        await fetch(`${baseUrl}/api/revalidate?path=${encodeURIComponent(path)}&secret=${cronSecret}`)
      } catch {
        // Revalidation failure is non-critical — pages rebuild on next deploy
      }
    }

    // Send summary email
    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey)
      const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      await resend.emails.send({
        from: fromEmail,
        to: REPORT_EMAIL,
        subject: `ProInvestorHub Market Data Refresh — ${month}`,
        html: `
          <h2>Monthly Market Data Refresh Complete</h2>
          <ul>
            <li><strong>Cities updated:</strong> ${result.citiesUpdated}</li>
            <li><strong>Cities skipped (no new data):</strong> ${result.citiesSkipped}</li>
            <li><strong>Timestamp:</strong> ${result.dataUpdatedAt}</li>
          </ul>
          ${result.errors.length > 0 ? `
            <h3>Errors (${result.errors.length})</h3>
            <ul>${result.errors.map(e => `<li>${e}</li>`).join('')}</ul>
          ` : '<p>No errors.</p>'}
          <p><a href="https://proinvestorhub.com/markets/cash-flow">View updated markets →</a></p>
        `,
      })
    }

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Market data refresh failed:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
