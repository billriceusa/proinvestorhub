import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const resend = getResend()
    if (!resend) {
      console.log(`[Newsletter Signup] ${email} (Resend not configured)`)
      return NextResponse.json({ success: true })
    }

    const segmentIds = process.env.RESEND_SEGMENT_ID
      ? [{ id: process.env.RESEND_SEGMENT_ID }]
      : undefined

    const results = await Promise.allSettled([
      resend.contacts.create({
        email,
        unsubscribed: false,
        ...(segmentIds && { segments: segmentIds }),
      }),

      resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          'ProInvestorHub <onboarding@resend.dev>',
        to: email,
        subject:
          'Welcome to ProInvestorHub — Real Estate Investing, Demystified',
        react: WelcomeEmail(),
      }),
    ])

    const contactResult = results[0]
    const emailResult = results[1]

    if (contactResult.status === 'rejected') {
      console.error('[Newsletter] Contact create failed:', contactResult.reason)
    }
    if (emailResult.status === 'rejected') {
      console.error('[Newsletter] Welcome email failed:', emailResult.reason)
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
