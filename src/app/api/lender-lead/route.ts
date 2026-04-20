import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { LenderMatchEmail } from '@/emails/lender-match'
import { isGoodOrigin, isHoneypotFilled, isGibberishName } from '@/lib/anti-spam'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(request: Request) {
  try {
    if (!isGoodOrigin(request)) {
      return NextResponse.json({ success: true })
    }

    const body = await request.json()

    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true })
    }

    const { firstName, email, scenario, topMatches } = body

    if (isGibberishName(firstName)) {
      return NextResponse.json({ success: true })
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!firstName || typeof firstName !== 'string') {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }

    const resend = getResend()
    if (!resend) {
      console.log(`[Lender Lead] ${firstName} <${email}> (Resend not configured)`, scenario)
      return NextResponse.json({ success: true })
    }

    const segmentIds = process.env.RESEND_SEGMENT_ID
      ? [{ id: process.env.RESEND_SEGMENT_ID }]
      : undefined

    const results = await Promise.allSettled([
      resend.contacts.create({
        email,
        firstName,
        unsubscribed: false,
        ...(segmentIds && { segments: segmentIds }),
      }),

      resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          'ProInvestorHub <noreply@proinvestorhub.com>',
        to: email,
        subject: `${firstName}, Your Lender Matches Are Ready`,
        react: LenderMatchEmail({
          firstName,
          topMatches: topMatches || [],
          scenario: scenario || {},
        }),
      }),
    ])

    const contactResult = results[0]
    const emailResult = results[1]

    if (contactResult.status === 'rejected') {
      console.error('[Lender Lead] Contact create failed:', contactResult.reason)
    }
    if (emailResult.status === 'rejected') {
      console.error('[Lender Lead] Email send failed:', emailResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Lender Lead] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
