import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Drip3FinancingEmail } from '@/emails/drip-3-financing'
import { Drip4MarketsEmail } from '@/emails/drip-4-markets'
import { Drip5StrategyEmail } from '@/emails/drip-5-strategy'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// Drip 1 (day 1) and drip 2 (day 3) are scheduled at signup via Resend scheduledAt.
// This cron handles drip 3 (day 5), drip 4 (day 7), and drip 5 (day 10).
// It runs daily, queries Resend contacts, and sends based on created_at date.

const DRIP_SCHEDULE = [
  { day: 5, subject: 'Financing Strategies Most New Investors Miss', Email: Drip3FinancingEmail },
  { day: 7, subject: 'The Markets Where Smart Money Is Flowing Right Now', Email: Drip4MarketsEmail },
  { day: 10, subject: 'Your Investment Strategy Blueprint', Email: Drip5StrategyEmail },
] as const

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

function daysBetween(dateStr: string, now: Date): number {
  const created = new Date(dateStr)
  const diffMs = now.getTime() - created.getTime()
  return Math.floor(diffMs / (24 * 60 * 60 * 1000))
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const resend = getResend()
  if (!resend) {
    return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    'ProInvestorHub <noreply@proinvestorhub.com>'

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    return NextResponse.json({ error: 'RESEND_AUDIENCE_ID not set' }, { status: 500 })
  }

  const now = new Date()
  const sent: string[] = []
  const errors: string[] = []

  try {
    // Fetch all contacts from audience
    const { data: contactsData } = await resend.contacts.list({ audienceId })
    const contacts = contactsData?.data || []

    for (const contact of contacts) {
      if (contact.unsubscribed || !contact.created_at) continue

      const age = daysBetween(contact.created_at, now)

      for (const drip of DRIP_SCHEDULE) {
        // Send if contact age matches the drip day exactly
        if (age === drip.day) {
          try {
            await resend.emails.send({
              from: fromEmail,
              to: contact.email,
              subject: drip.subject,
              react: drip.Email({ firstName: contact.first_name || 'there' }),
            })
            sent.push(`${contact.email} → drip-${drip.day}`)
          } catch (err) {
            errors.push(`${contact.email} drip-${drip.day}: ${err}`)
          }
        }
      }
    }

    console.log(`[Drip Cron] Sent ${sent.length} emails. Errors: ${errors.length}`)
    if (errors.length > 0) console.error('[Drip Cron] Errors:', errors)

    return NextResponse.json({
      success: true,
      sent: sent.length,
      errors: errors.length,
      details: sent,
    })
  } catch (error) {
    console.error('[Drip Cron] Fatal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
