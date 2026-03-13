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

    const audienceId = process.env.RESEND_AUDIENCE_ID

    const results = await Promise.allSettled([
      audienceId
        ? resend.contacts.create({
            email,
            audienceId,
            unsubscribed: false,
          })
        : Promise.resolve(null),

      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'ProInvestorHub <hello@proinvestorhub.com>',
        to: email,
        subject: 'Welcome to ProInvestorHub — Real Estate Investing, Demystified',
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
