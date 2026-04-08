/**
 * Lightweight markdown-to-HTML converter for newsletter content.
 * Handles: bold, italic, links, bullet lists, numbered lists, headings (h3/h4).
 * Does NOT handle: images, tables, code blocks, blockquotes.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text: string): string {
  return (
    text
      // Links: [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary underline hover:text-primary-light">$1</a>'
      )
      // Bold+Italic: ***text*** or ___text___
      .replace(/\*{3}(.+?)\*{3}/g, "<strong><em>$1</em></strong>")
      // Bold: **text** or __text__
      .replace(/\*{2}(.+?)\*{2}/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      // Italic: *text* or _text_
      .replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "<em>$1</em>")
      .replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>")
  );
}

/** Convert markdown text to HTML string (for email templates and dangerouslySetInnerHTML) */
export function markdownToHtml(text: string): string {
  const blocks = text.split("\n\n");
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Heading h3: ### text
    if (trimmed.startsWith("### ")) {
      htmlBlocks.push(
        `<h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;color:#111827;">${inlineFormat(escapeHtml(trimmed.slice(4)))}</h3>`
      );
      continue;
    }

    // Heading h4: #### text
    if (trimmed.startsWith("#### ")) {
      htmlBlocks.push(
        `<h4 style="font-size:15px;font-weight:700;margin:0 0 8px 0;color:#111827;">${inlineFormat(escapeHtml(trimmed.slice(5)))}</h4>`
      );
      continue;
    }

    // Bullet list: lines starting with - or *
    const lines = trimmed.split("\n");
    if (lines.every((l) => /^[\-\*]\s/.test(l.trim()))) {
      const items = lines
        .map((l) => `<li>${inlineFormat(escapeHtml(l.trim().slice(2)))}</li>`)
        .join("");
      htmlBlocks.push(
        `<ul style="margin:0 0 16px 0;padding-left:24px;list-style-type:disc;">${items}</ul>`
      );
      continue;
    }

    // Numbered list: lines starting with 1. 2. etc
    if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
      const items = lines
        .map((l) => `<li>${inlineFormat(escapeHtml(l.trim().replace(/^\d+\.\s/, "")))}</li>`)
        .join("");
      htmlBlocks.push(
        `<ol style="margin:0 0 16px 0;padding-left:24px;list-style-type:decimal;">${items}</ol>`
      );
      continue;
    }

    // Regular paragraph
    htmlBlocks.push(`<p>${inlineFormat(escapeHtml(trimmed))}</p>`);
  }

  return htmlBlocks.join("\n");
}

/** Convert markdown text to HTML for email (with inline styles) */
export function markdownToEmailHtml(text: string, pStyle: string): string {
  const blocks = text.split("\n\n");
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      htmlBlocks.push(
        `<h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;color:#111827;">${inlineFormatEmail(trimmed.slice(4))}</h3>`
      );
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      htmlBlocks.push(
        `<h4 style="font-size:15px;font-weight:700;margin:0 0 8px 0;color:#111827;">${inlineFormatEmail(trimmed.slice(5))}</h4>`
      );
      continue;
    }

    const lines = trimmed.split("\n");

    if (lines.every((l) => /^[\-\*]\s/.test(l.trim()))) {
      const items = lines
        .map(
          (l) =>
            `<li style="margin-bottom:6px;">${inlineFormatEmail(l.trim().slice(2))}</li>`
        )
        .join("");
      htmlBlocks.push(
        `<ul style="margin:0 0 16px 0;padding-left:24px;list-style-type:disc;${pStyle}">${items}</ul>`
      );
      continue;
    }

    if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
      const items = lines
        .map(
          (l) =>
            `<li style="margin-bottom:6px;">${inlineFormatEmail(l.trim().replace(/^\d+\.\s/, ""))}</li>`
        )
        .join("");
      htmlBlocks.push(
        `<ol style="margin:0 0 16px 0;padding-left:24px;list-style-type:decimal;${pStyle}">${items}</ol>`
      );
      continue;
    }

    htmlBlocks.push(`<p style="${pStyle}">${inlineFormatEmail(trimmed)}</p>`);
  }

  return htmlBlocks.join("\n");
}

function inlineFormatEmail(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:#1B4D3E;text-decoration:underline;">$1</a>'
    )
    .replace(/\*{3}(.+?)\*{3}/g, "<strong><em>$1</em></strong>")
    .replace(/\*{2}(.+?)\*{2}/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "<em>$1</em>")
    .replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>");
}
