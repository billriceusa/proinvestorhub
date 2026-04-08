import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome'
import { Drip1CalculatorsEmail } from '@/emails/drip-1-calculators'
import { Drip2FirstDealEmail } from '@/emails/drip-2-first-deal'

export type ExperienceLevel = 'beginner' | 'some-experience' | 'experienced'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  'ProInvestorHub <noreply@proinvestorhub.com>'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, source, experience } = body as {
      email?: string
      source?: string
      experience?: ExperienceLevel
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const resend = getResend()
    if (!resend) {
      console.log(`[Newsletter Signup] ${email} source=${source || 'direct'} experience=${experience || 'none'} (Resend not configured)`)
      return NextResponse.json({ success: true })
    }

    // Build segment list
    const segments: { id: string }[] = []
    if (process.env.RESEND_SEGMENT_ID) {
      segments.push({ id: process.env.RESEND_SEGMENT_ID })
    }
    // Experience-based segments (create these in Resend dashboard)
    const expSegmentId = experience
      ? process.env[`RESEND_SEGMENT_${experience.toUpperCase().replace('-', '_')}`]
      : undefined
    if (expSegmentId) {
      segments.push({ id: expSegmentId })
    }

    // Derive a firstName label from experience for personalization
    const firstName = experience
      ? { beginner: 'New Investor', 'some-experience': 'Investor', experienced: 'Pro' }[experience]
      : undefined

    console.log(`[Newsletter Signup] ${email} source=${source || 'direct'} experience=${experience || 'none'}`)

    // Schedule drip emails: drip 1 at +24h, drip 2 at +72h
    // (Resend allows scheduling up to 72h out; drip 3-5 handled by daily cron)
    const now = Date.now()
    const drip1At = new Date(now + 24 * 60 * 60 * 1000).toISOString()
    const drip2At = new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString()

    const results = await Promise.allSettled([
      // 1. Create contact
      resend.contacts.create({
        email,
        unsubscribed: false,
        ...(firstName && { firstName }),
        ...(segments.length > 0 && { segments }),
      }),

      // 2. Send welcome email immediately
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Welcome to ProInvestorHub — Real Estate Investing, Demystified',
        react: WelcomeEmail(),
      }),

      // 3. Schedule drip 1 (day 1)
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: '3 Calculators Every Investor Needs to Master',
        react: Drip1CalculatorsEmail({ firstName: firstName || 'there' }),
        scheduledAt: drip1At,
      }),

      // 4. Schedule drip 2 (day 3)
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'How to Analyze Your First Deal (Step by Step)',
        react: Drip2FirstDealEmail({ firstName: firstName || 'there' }),
        scheduledAt: drip2At,
      }),
    ])

    for (const [i, result] of results.entries()) {
      if (result.status === 'rejected') {
        const labels = ['Contact create', 'Welcome email', 'Drip 1 schedule', 'Drip 2 schedule']
        console.error(`[Newsletter] ${labels[i]} failed:`, result.reason)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Newsletter] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
