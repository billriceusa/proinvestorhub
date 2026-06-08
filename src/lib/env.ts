/**
 * Environment variable hygiene.
 *
 * Secrets pasted/imported into Vercel can pick up a literal escape sequence
 * (most often a trailing `\n` — two characters: backslash + n) or stray
 * whitespace. The value then looks correct in the dashboard but fails auth at
 * runtime, and a plain `.trim()` does NOT fix it because the corruption is a
 * literal backslash-n, not an actual whitespace newline.
 *
 * This bit us once already (June 2026: 6 ProInvestorHub prod vars carried a
 * trailing `\n`, silently breaking authenticated Sanity, FRED, HUD and Resend
 * calls). `cleanSecret` is the defensive read; `findDirtyEnv` powers a daily
 * health-check alarm so a recurrence is loud, not silent.
 */

/** Env vars that must be clean for the app + crons to function. */
export const CRITICAL_ENV_KEYS = [
  "SANITY_API_TOKEN",
  "SANITY_API_READ_TOKEN",
  "SANITY_API_WRITE_TOKEN",
  "FRED_API_KEY",
  "HUD_API_TOKEN",
  "RESEND_API_KEY",
  "RESEND_AUDIENCE_ID",
  "RESEND_SEGMENT_ID",
  "CRON_SECRET",
  "ANTHROPIC_API_KEY",
  "GITHUB_TOKEN",
  "UNSPLASH_ACCESS_KEY",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
] as const;

/**
 * Strip literal escape sequences (`\n`, `\r`, `\t`) and surrounding whitespace
 * from a secret. None of our tokens/keys legitimately contain a backslash, so
 * this is safe and idempotent. Returns "" for undefined input.
 */
export function cleanSecret(raw: string | undefined | null): string {
  if (!raw) return "";
  return raw.replace(/\\[nrt]/g, "").trim();
}

/** A secret is "dirty" if cleaning it would change the value. */
export function isDirtySecret(raw: string | undefined | null): boolean {
  if (raw == null) return false;
  return cleanSecret(raw) !== raw;
}

/**
 * Return the names of any CRITICAL_ENV_KEYS whose value is present but carries
 * a literal escape sequence or stray whitespace. Used by the health-check cron.
 */
export function findDirtyEnv(): string[] {
  return CRITICAL_ENV_KEYS.filter((key) => {
    const v = process.env[key];
    return v != null && v !== "" && isDirtySecret(v);
  });
}
