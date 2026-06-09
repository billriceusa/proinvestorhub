# Paused content/SEO crons

**Paused 2026-06-09** pending a broader cleanup of the content-automation system
(duplicate / low-relevance AI content, and an auto-publish path with no human review).

The cron **route handlers still exist** under `src/app/api/cron/` and remain callable
manually with the `CRON_SECRET` bearer — only the Vercel *schedule* was removed from
`vercel.json`, so this is fully reversible.

## What was paused (and why)

| Cron | Was | Why paused |
|------|-----|------------|
| `weekly-content` | `0 6 * * 0` (Sun 6:00 UTC) | Auto-generated **and published AI articles live to Sanity with no human review** — the main scaled-content / cannibalization risk. |
| `weekly-newsletter` | `0 8 * * 0` (Sun 8:00 UTC) | AI-generated newsletter sent to subscribers. Paused with the content halt — **re-enable if the subscriber newsletter should keep going.** |
| `seo-audit` | `0 10 * * 3` (Wed 10:00 UTC) | AI SEO-audit writer; had stalled ~54 days and added noise. |

Also paused (separately, in the claude.ai routines, not this repo): the daily
**"ProInvestorHub — Daily SEO Audit + Article Draft"** cloud routine
(`trig_01WhpmhPQpDCjy4ssipBXTuJ`).

## Still active (kept)

`send-drip` (lead nurture), `daily-performance` (reporting), `refresh-markets`
(market data), `health-check` (monitoring/alerts — do not pause).

## To restore

Add the desired entries back to the `crons` array in `vercel.json` and redeploy:

```json
{ "path": "/api/cron/weekly-content",   "schedule": "0 6 * * 0" },
{ "path": "/api/cron/weekly-newsletter","schedule": "0 8 * * 0" },
{ "path": "/api/cron/seo-audit",        "schedule": "0 10 * * 3" }
```
