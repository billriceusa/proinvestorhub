/**
 * Shared helpers for parsing JSON out of Claude responses.
 *
 * Replaces duplicated extractJson() + JSON.parse() patterns across cron
 * routes. Adds tolerance for:
 *  - markdown code fences (```json ... ```)
 *  - leading/trailing prose around the JSON
 *  - truncated responses from max_tokens limits (detected, not fixed)
 *  - schema validation with fallback
 */

import type Anthropic from "@anthropic-ai/sdk";

export class LLMParseError extends Error {
  readonly attemptText: string;
  readonly truncated: boolean;
  constructor(message: string, attemptText: string, truncated: boolean) {
    super(message);
    this.name = "LLMParseError";
    this.attemptText = attemptText;
    this.truncated = truncated;
  }
}

/**
 * Robust JSON text extraction from a Claude response:
 *  - strips ```json ... ``` fences
 *  - trims leading prose before the first `{` or `[`
 *  - trims trailing prose after the matching outer close
 *  - flags likely truncation (no valid close, or stop_reason=max_tokens)
 */
export function extractJson(response: Anthropic.Message): {
  text: string;
  truncated: boolean;
} {
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new LLMParseError(
      "No text block in Claude response",
      JSON.stringify(response.content).slice(0, 200),
      response.stop_reason === "max_tokens"
    );
  }

  let text = textBlock.text.trim();

  // Strip markdown fences
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*\n?/, "");
    text = text.replace(/\n?```\s*$/, "");
  }

  // Find the first JSON-opening character
  const firstOpen = text.search(/[{[]/);
  if (firstOpen > 0) text = text.slice(firstOpen);

  // Find the matching closing brace/bracket from the end
  const openChar = text[0];
  const closeChar = openChar === "{" ? "}" : openChar === "[" ? "]" : null;
  if (closeChar) {
    const lastClose = text.lastIndexOf(closeChar);
    if (lastClose > 0 && lastClose < text.length - 1) {
      text = text.slice(0, lastClose + 1);
    }
  }

  const truncated =
    response.stop_reason === "max_tokens" ||
    (closeChar !== null && !text.endsWith(closeChar));

  return { text: text.trim(), truncated };
}

/**
 * Parse JSON from a Claude response. Throws LLMParseError on failure with
 * diagnostic info including a truncation flag.
 */
export function parseJson<T = unknown>(response: Anthropic.Message): T {
  const { text, truncated } = extractJson(response);
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new LLMParseError(
      `Failed to parse Claude JSON${truncated ? " (response was truncated — bump max_tokens)" : ""}: ${
        err instanceof Error ? err.message : String(err)
      }`,
      text.slice(0, 500),
      truncated
    );
  }
}

/**
 * Parse JSON from Claude with a fallback. Never throws — logs diagnostic
 * info and returns the fallback. Use when a malformed response should
 * degrade gracefully rather than fail the whole cron.
 */
export function parseJsonWithFallback<T>(
  response: Anthropic.Message,
  fallback: T,
  label = "LLM JSON"
): { data: T; ok: boolean; error?: string; truncated?: boolean } {
  try {
    const data = parseJson<T>(response);
    return { data, ok: true };
  } catch (err) {
    const parseErr = err instanceof LLMParseError ? err : null;
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[${label}] parse failed (truncated=${parseErr?.truncated ?? "unknown"}): ${message}${
        parseErr ? `\n  response head: ${parseErr.attemptText.slice(0, 200)}` : ""
      }`
    );
    return { data: fallback, ok: false, error: message, truncated: parseErr?.truncated };
  }
}

/**
 * Parse + validate JSON from Claude. Returns {ok, data} on success, or
 * {ok: false, error} on parse/validation failure. Use when you need to
 * know if validation passed vs fell through to a fallback.
 */
export function parseJsonWithValidator<T>(
  response: Anthropic.Message,
  validator: (v: unknown) => v is T,
  label = "LLM JSON"
):
  | { ok: true; data: T }
  | { ok: false; error: string; truncated?: boolean } {
  try {
    const { text, truncated } = extractJson(response);
    const raw = JSON.parse(text);
    if (!validator(raw)) {
      console.error(`[${label}] schema validation failed. Response head: ${text.slice(0, 200)}`);
      return { ok: false, error: "schema validation failed", truncated };
    }
    return { ok: true, data: raw };
  } catch (err) {
    const parseErr = err instanceof LLMParseError ? err : null;
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[${label}] parse/validate failed (truncated=${parseErr?.truncated ?? "unknown"}): ${message}`
    );
    return { ok: false, error: message, truncated: parseErr?.truncated };
  }
}
