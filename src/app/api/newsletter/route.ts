import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome'
import { isGoodOrigin, isHoneypotFilled, isGibberishName } from '@/lib/anti-spam'

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
    if (!isGoodOrigin(request)) {
      return NextResponse.json({ success: true })
    }

    const body = await request.json()

    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true })
    }

    const { email, source, experience, firstName: submittedFirstName } = body as {
      email?: string
      source?: string
      experience?: ExperienceLevel
      firstName?: string
    }

    if (isGibberishName(submittedFirstName)) {
      return NextResponse.json({ success: true })
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

    // Day-0 welcome only — drip automation retired with the content engine.
    // 15-min delay gives a spam-cancel window before the first send.
    const welcomeAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    const results = await Promise.allSettled([
      // 1. Create contact
      resend.contacts.create({
        email,
        unsubscribed: false,
        ...(firstName && { firstName }),
        ...(segments.length > 0 && { segments }),
      }),

      // 2. Send welcome email (delayed 15 min for spam cancel window)
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Welcome to ProInvestorHub — Real Estate Investing, Demystified',
        react: WelcomeEmail(),
        scheduledAt: welcomeAt,
      }),
    ])

    for (const [i, result] of results.entries()) {
      if (result.status === 'rejected') {
        const labels = ['Contact create', 'Welcome email']
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
