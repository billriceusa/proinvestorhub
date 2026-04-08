/**
 * Extract FAQ question/answer pairs from Portable Text blocks.
 * Scans for H2/H3 headings that contain "?" and collects subsequent
 * paragraph text as the answer (up to the next heading).
 */

type PortableTextBlock = {
  _type: string
  style?: string
  children?: { text?: string }[]
}

export function extractFaqFromBody(
  body: PortableTextBlock[]
): { question: string; answer: string }[] {
  if (!body || !Array.isArray(body)) return []

  const faqs: { question: string; answer: string }[] = []
  let currentQuestion: string | null = null
  let answerParts: string[] = []

  for (const block of body) {
    if (block._type !== 'block') continue

    const text = (block.children || []).map((c) => c.text || '').join('').trim()
    if (!text) continue

    const isHeading = block.style === 'h2' || block.style === 'h3'

    if (isHeading) {
      // Flush previous Q&A if exists
      if (currentQuestion && answerParts.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: answerParts.join(' ').trim(),
        })
      }

      // Start new question if heading contains "?"
      if (text.includes('?')) {
        currentQuestion = text
        answerParts = []
      } else {
        currentQuestion = null
        answerParts = []
      }
      continue
    }

    // Collect paragraph text as answer
    if (currentQuestion && block.style === 'normal') {
      answerParts.push(text)
    }
  }

  // Flush last Q&A
  if (currentQuestion && answerParts.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: answerParts.join(' ').trim(),
    })
  }

  // Truncate long answers to ~300 chars for structured data
  return faqs.map((faq) => ({
    question: faq.question,
    answer:
      faq.answer.length > 300
        ? faq.answer.substring(0, 297) + '...'
        : faq.answer,
  }))
}
