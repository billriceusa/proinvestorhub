import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CalculatorResultsEmail } from '@/emails/calculator-results'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(request: Request) {
  try {
    const { firstName, email, calculatorName, results } = await request.json()

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
      console.log(`[Calculator Results] ${firstName} <${email}> — ${calculatorName} (Resend not configured)`)
      return NextResponse.json({ success: true })
    }

    const segmentIds = process.env.RESEND_SEGMENT_ID
      ? [{ id: process.env.RESEND_SEGMENT_ID }]
      : undefined

    const resultsArray = Object.entries(results || {}).map(([label, value]) => ({
      label,
      value: String(value),
    }))

    const results_settled = await Promise.allSettled([
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
        subject: `${firstName}, Your ${calculatorName} Results`,
        react: CalculatorResultsEmail({
          firstName,
          calculatorName: calculatorName || 'Calculator',
          results: resultsArray,
        }),
      }),
    ])

    if (results_settled[0].status === 'rejected') {
      console.error('[Calculator Results] Contact create failed:', results_settled[0].reason)
    }
    if (results_settled[1].status === 'rejected') {
      console.error('[Calculator Results] Email send failed:', results_settled[1].reason)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Calculator Results] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
