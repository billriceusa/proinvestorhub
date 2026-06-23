# Where Rents Are Rising Fastest — Promotion & LinkedIn Kit

Companion promo kit for the HUD rent-growth data report. All figures are read
live from the published dataset (HUD Fair Market Rents FY2026 vs FY2025) and
verified against `src/data/fmr-rent/` on 2026-06-23. Re-verify after each annual
refresh.

**Report:** https://proinvestorhub.com/reports/rent-growth
**Data (CSV):** https://proinvestorhub.com/data/rent-growth-2026.csv

---

## 1. The visuals (attach to the post)

Both are 1200×1200, brand-watermarked, HUD-attributed — they carry the source
even when reshared. Regenerate with `node scripts/build-rent-growth-infographic.mjs`.

- **Rising:** https://proinvestorhub.com/reports/infographics/rent-growth-rising.png
- **Falling:** https://proinvestorhub.com/reports/infographics/rent-growth-falling.png

Best as a 2-image LinkedIn post (rising first, falling second) or two separate
posts a few days apart.

---

## 2. LinkedIn posts (Bill's voice — copy/paste ready)

### Post A — the spread (pair with rising.png)

Rent growth in 2026 isn't a national story. It's 402 local ones.

We pulled HUD's latest Fair Market Rents for every U.S. metro and compared them
to last year. The median two-bedroom rose 3.9%. But that average buries the
spread:

• Lewiston-Auburn, ME — +25.1%
• Anderson, SC — +23.9%
• Asheville, NC — +21.4%
• Fayetteville, AR — +21.2%
• Jersey City, NJ — +20.2%

Meanwhile, rents fell in 97 metros.

If you're underwriting a rental, the national number is noise. The metro number
is the deal.

Full ranking — all 402 metros, free to download:
https://proinvestorhub.com/reports/rent-growth

---

### Post B — the contrarian take (pair with falling.png)

"Rents always go up" is doing a lot of work in some pro formas.

In HUD's FY2026 Fair Market Rents, two-bedroom rents fell year-over-year in 97
metro areas. The steepest:

• Vallejo, CA — −10%
• Salinas, CA — −10%
• Boise, ID — −10%
• Waco, TX — −9.9%
• New Orleans, LA — −9.9%

Add Phoenix (−5.7%) and Austin (−5.0%) to the list — the markets that built the
most during the boom.

If your model assumes a flat 3% rent bump every year, these are the metros that
break it.

Where rents rose and where they didn't, all 402 metros:
https://proinvestorhub.com/reports/rent-growth

---

### Post C — short hook (optional, pair with rising.png)

The fastest-rising rents in the country right now aren't where you'd guess.

Not Austin. Not Phoenix — rents there actually fell this year.

Try Lewiston-Auburn, Maine: +25% on a two-bedroom, year over year.

The rent growth is in the secondary and tertiary metros. We ranked all 402 from
HUD's latest data:
https://proinvestorhub.com/reports/rent-growth

---

## 3. National headline hooks (one-liners for comments / reshares)

- The median U.S. two-bedroom rent rose 3.9% in FY2026 — but ranged from +25% to −10% by metro.
- Rents fell in 97 of 402 U.S. metros this year. The "rents always rise" era is over in a lot of places.
- The fastest rent growth in America is in Lewiston-Auburn, Maine (+25.1%) — not a market most investors track.
- Sunbelt boomtowns are cooling: Phoenix −5.7%, Austin −5.0%, while smaller metros surge.

---

## 4. Beyond LinkedIn (when ready)

- **Per-state fleet:** `ALL=1 node scripts/build-rent-growth-infographic.mjs` generates a
  watermarked card per state — the local-press / per-market pickup engine (same play as the
  Investor Financing report's outreach kit).
- **Local business journals:** pitch each state's fastest-rising metro as a "rents jumped X%
  here" story with the chart + a citable data source.
- **Annual refresh:** when HUD posts the next fiscal year's FMRs (~Aug/Sep), re-run
  `node scripts/build-fmr.mjs`, commit the updated data, regenerate the cards, and pitch the
  fresh year-over-year movement.
