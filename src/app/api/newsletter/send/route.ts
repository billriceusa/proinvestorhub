import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WeeklyNewsletter } from '@/emails/weekly-newsletter'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.NEWSLETTER_SEND_SECRET
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      issueNumber,
      date,
      headline,
      previewText,
      intro,
      featuredArticle,
      articles,
      toolSpotlight,
      glossaryTerms,
      closingNote,
      testEmail,
    } = body

    const resend = getResend()
    if (!resend) {
      return NextResponse.json(
        { error: 'Resend not configured' },
        { status: 500 }
      )
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      'ProInvestorHub <noreply@proinvestorhub.com>'

    const emailContent = WeeklyNewsletter({
      issueNumber: issueNumber || 1,
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      headline: headline || 'This Week in Real Estate Investing',
      previewText: previewText || 'Your weekly dose of real estate investing insights',
      intro: intro || "Here's what smart investors are paying attention to this week.",
      featuredArticle: featuredArticle || {
        title: 'Latest from ProInvestorHub',
        description: 'Check out our newest content.',
        url: 'https://proinvestorhub.com/blog',
      },
      articles: articles || [],
      toolSpotlight,
      glossaryTerms,
      closingNote,
    })

    const html = await render(emailContent)

    if (testEmail) {
      const { data, error: sendError } = await resend.emails.send({
        from: fromEmail,
        to: testEmail,
        subject: `[TEST] ProInvestorHub #${issueNumber || 1}: ${headline || 'This Week in Real Estate Investing'}`,
        html,
      })

      if (sendError) {
        console.error('[Newsletter Send] Resend error:', JSON.stringify(sendError))
        return NextResponse.json({ error: 'Resend failed', detail: sendError }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        mode: 'test',
        result: data,
      })
    }

    const segmentId = process.env.RESEND_SEGMENT_ID
    if (!segmentId) {
      return NextResponse.json(
        { error: 'RESEND_SEGMENT_ID not configured' },
        { status: 500 }
      )
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to: `segment:${segmentId}`,
      subject: `ProInvestorHub #${issueNumber || 1}: ${headline || 'This Week in Real Estate Investing'}`,
      html,
    })

    return NextResponse.json({
      success: true,
      mode: 'broadcast',
      result,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[Newsletter Send] Error:', message)
    return NextResponse.json(
      { error: 'Failed to send newsletter', detail: message },
      { status: 500 }
    )
  }
}
