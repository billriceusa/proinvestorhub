import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Drip3FinancingEmail } from '@/emails/drip-3-financing'
import { Drip4MarketsEmail } from '@/emails/drip-4-markets'
import { Drip5StrategyEmail } from '@/emails/drip-5-strategy'
import { recordCronRun } from '@/lib/cron/heartbeat'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// Drip 1 (day 1) and drip 2 (day 3) are scheduled at signup via Resend scheduledAt.
// This cron handles drip 3 (day 5), drip 4 (day 7), and drip 5 (day 10).
// It runs daily, queries Resend contacts, and sends based on created_at date.

const ALERT_EMAIL = 'bill@billricestrategy.com'

const DRIP_SCHEDULE = [
  { day: 5, subject: 'Financing Strategies Most New Investors Miss', Email: Drip3FinancingEmail },
  { day: 7, subject: 'The Markets Where Smart Money Is Flowing Right Now', Email: Drip4MarketsEmail },
  { day: 10, subject: 'Your Investment Strategy Blueprint', Email: Drip5StrategyEmail },
] as const

function daysBetween(dateStr: string, now: Date): number {
  const created = new Date(dateStr)
  const diffMs = now.getTime() - created.getTime()
  return Math.floor(diffMs / (24 * 60 * 60 * 1000))
}

async function alertOnFailure(
  resend: Resend | null,
  fromEmail: string,
  subject: string,
  detail: string
): Promise<void> {
  if (!resend) return
  try {
    await resend.emails.send({
      from: fromEmail,
      to: ALERT_EMAIL,
      subject: `[DRIP CRON ALERT] ${subject}`,
      html: `<h2 style="color:#dc2626;">Drip cron failure</h2><pre style="white-space:pre-wrap;font-family:monospace;background:#f9fafb;padding:12px;border-radius:6px;">${detail.replace(/</g, '&lt;')}</pre>`,
    })
  } catch (err) {
    console.error('[Drip Cron] Failed to send alert email:', err)
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'ProInvestorHub <noreply@proinvestorhub.com>'
  const resendKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!resendKey) {
    await recordCronRun({
      name: 'send-drip',
      status: 'failed',
      detail: 'RESEND_API_KEY not set',
      durationMs: Date.now() - startTime,
    })
    return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })
  }

  const resend = new Resend(resendKey)

  if (!audienceId) {
    const msg = 'RESEND_AUDIENCE_ID not set — drip cannot identify subscribers'
    await alertOnFailure(resend, fromEmail, 'Missing audience ID', msg)
    await recordCronRun({
      name: 'send-drip',
      status: 'failed',
      detail: msg,
      durationMs: Date.now() - startTime,
    })
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  const now = new Date()
  const sent: string[] = []
  const errors: string[] = []

  try {
    const { data: contactsData, error: listError } = await resend.contacts.list({ audienceId })
    if (listError || !contactsData) {
      const msg = `Failed to list contacts: ${JSON.stringify(listError)}`
      await alertOnFailure(resend, fromEmail, 'Contact list failed', msg)
      await recordCronRun({
        name: 'send-drip',
        status: 'failed',
        detail: msg,
        durationMs: Date.now() - startTime,
      })
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    const contacts = contactsData.data

    for (const contact of contacts) {
      if (contact.unsubscribed || !contact.created_at) continue

      const age = daysBetween(contact.created_at, now)

      for (const drip of DRIP_SCHEDULE) {
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
            const msg = `${contact.email} drip-${drip.day}: ${err instanceof Error ? err.message : String(err)}`
            errors.push(msg)
            console.error('[Drip Cron]', msg)
          }
        }
      }
    }

    console.log(`[Drip Cron] Sent ${sent.length} emails. Errors: ${errors.length}`)

    if (errors.length > 0) {
      await alertOnFailure(
        resend,
        fromEmail,
        `${errors.length} drip send failure${errors.length > 1 ? 's' : ''}`,
        `Sent: ${sent.length}\n\nErrors:\n${errors.join('\n')}`
      )
    }

    await recordCronRun({
      name: 'send-drip',
      status: errors.length > 0 ? 'partial' : 'ok',
      detail: `sent=${sent.length} errors=${errors.length} contacts=${contacts.length}`,
      durationMs: Date.now() - startTime,
    })

    return NextResponse.json({
      success: errors.length === 0,
      sent: sent.length,
      errors: errors.length,
      details: sent,
    })
  } catch (err) {
    const msg = `Fatal error: ${err instanceof Error ? err.message : String(err)}`
    console.error('[Drip Cron]', msg)
    await alertOnFailure(resend, fromEmail, 'Fatal error', msg)
    await recordCronRun({
      name: 'send-drip',
      status: 'failed',
      detail: msg,
      durationMs: Date.now() - startTime,
    })
    return NextResponse.json({ error: 'Internal server error', detail: msg }, { status: 500 })
  }
}
