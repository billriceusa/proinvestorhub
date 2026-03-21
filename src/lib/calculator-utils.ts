/**
 * Shared calculator utilities for encoding/decoding state (share links)
 * and generating print-friendly output.
 */

export function encodeCalculatorState(
  params: Record<string, number | string>
): string {
  const json = JSON.stringify(params)
  if (typeof window !== "undefined") {
    return btoa(json)
  }
  return Buffer.from(json).toString("base64")
}

export function decodeCalculatorState(
  encoded: string
): Record<string, string> | null {
  try {
    let json: string
    if (typeof window !== "undefined") {
      json = atob(encoded)
    } else {
      json = Buffer.from(encoded, "base64").toString()
    }
    const parsed = JSON.parse(json)
    // Ensure all values are strings for setState compatibility
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(parsed)) {
      result[key] = String(value)
    }
    return result
  } catch {
    return null
  }
}

export function generateShareUrl(
  calculatorPath: string,
  params: Record<string, number | string>
): string {
  const encoded = encodeCalculatorState(params)
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://proinvestorhub.com"
  return `${base}${calculatorPath}?s=${encoded}`
}

export async function copyShareLink(
  calculatorPath: string,
  params: Record<string, number | string>
): Promise<boolean> {
  const url = generateShareUrl(calculatorPath, params)
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}
