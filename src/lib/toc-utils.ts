type TocItem = {
  text: string
  id: string
  level: 'h2' | 'h3'
}

/**
 * Extract TOC items from a Sanity Portable Text body array.
 * Call this in the server component and pass the result to <TableOfContents>.
 */
export function extractTocItems(
  body: Array<{ _type: string; style?: string; children?: Array<{ text?: string }> }>
): TocItem[] {
  return body
    .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block) => {
      const text = block.children?.map((c) => c.text || '').join('') || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      return {
        text,
        id,
        level: block.style as 'h2' | 'h3',
      }
    })
}
