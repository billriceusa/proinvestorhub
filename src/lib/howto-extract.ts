/**
 * Extract HowTo steps from Portable Text blocks.
 * Looks for H2/H3 headings matching step patterns like:
 * "Step 1: Do Something", "1. Do Something", "First, Do Something"
 * Collects following paragraph text as the step description.
 */

type PortableTextBlock = {
  _type: string
  style?: string
  children?: { text?: string }[]
}

const STEP_PATTERNS = [
  /^step\s+\d+[:\.\s\-–—]/i,
  /^\d+\.\s/,
  /^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)[,:\s]/i,
]

function isStepHeading(text: string): boolean {
  return STEP_PATTERNS.some((p) => p.test(text.trim()))
}

function cleanStepName(text: string): string {
  return text
    .replace(/^step\s+\d+[:\.\s\-–—]\s*/i, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)[,:\s]\s*/i, '')
    .trim()
}

export function extractHowToSteps(
  body: PortableTextBlock[]
): { name: string; text: string }[] | null {
  if (!body || !Array.isArray(body)) return null

  const steps: { name: string; text: string }[] = []
  let currentStep: string | null = null
  let stepText: string[] = []

  for (const block of body) {
    if (block._type !== 'block') continue

    const text = (block.children || []).map((c) => c.text || '').join('').trim()
    if (!text) continue

    const isHeading = block.style === 'h2' || block.style === 'h3'

    if (isHeading && isStepHeading(text)) {
      // Flush previous step
      if (currentStep && stepText.length > 0) {
        steps.push({
          name: currentStep,
          text: stepText.join(' ').trim(),
        })
      }
      currentStep = cleanStepName(text) || text
      stepText = []
      continue
    }

    if (isHeading) {
      // Non-step heading — flush and reset
      if (currentStep && stepText.length > 0) {
        steps.push({
          name: currentStep,
          text: stepText.join(' ').trim(),
        })
      }
      currentStep = null
      stepText = []
      continue
    }

    if (currentStep && block.style === 'normal') {
      stepText.push(text)
    }
  }

  // Flush last step
  if (currentStep && stepText.length > 0) {
    steps.push({
      name: currentStep,
      text: stepText.join(' ').trim(),
    })
  }

  // Only return if we found 3+ steps (a real how-to)
  if (steps.length < 3) return null

  // Truncate long step text
  return steps.map((s) => ({
    name: s.name,
    text: s.text.length > 300 ? s.text.substring(0, 297) + '...' : s.text,
  }))
}
