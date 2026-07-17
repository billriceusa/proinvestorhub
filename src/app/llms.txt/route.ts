import { rhfsMeta, current, previous, fmtPct } from '@/data/rhfs'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

/**
 * /llms.txt — a curated, plain-text index for AI answer engines (the emerging
 * llms.txt convention). It surfaces our original data reports with canonical
 * URLs and the headline, primary-source-cited facts, so assistants can ingest
 * and cite the numbers cleanly. Every figure is pulled from the committed data
 * modules, so this file stays honest and current with the reports themselves.
 */
export async function GET() {
  const ind = current.individual
  const llc = current.llc
  const debtFree = current.financing.debtPropShare != null ? 100 - current.financing.debtPropShare : null

  const body = `# ProInvestorHub

> Original, primary-source data reports, calculators, and education for real estate investors. Founded by Bill Rice (30+ years in mortgage lending).

All data reports are built on public government datasets, computed directly from the source, and free to cite with a link. Figures below are property-weighted unless noted.

## Data Reports

- [The American Rental Ownership Report](${baseUrl}/reports/rental-ownership): Who owns U.S. rental housing and how it's financed, from Census Rental Housing Finance Survey (RHFS) ${rhfsMeta.waves.join('/')} microdata. Key findings (${rhfsMeta.curYear}):
  - Individual investors own ${fmtPct(ind.propShare)} of rental PROPERTIES, down from ${fmtPct(previous.individual.propShare)} in ${rhfsMeta.prevYear}.
  - Counted by rental UNITS, LLP/LP/LLCs (${fmtPct(llc.unitShare)}) now own MORE than individual investors (${fmtPct(ind.unitShare)}). Individuals lead by properties; business entities lead by units.
  - This covers ALL rental properties (not only single-family); the properties-vs-units distinction is why single-family-only analyses can read as "individuals still dominate."
  - About ${fmtPct(debtFree, 0)} of rental properties are owned free and clear — only ${fmtPct(current.financing.debtPropShare)} carry a mortgage or other debt.
  - Dataset (CSV): ${baseUrl}/data/rental-ownership-${rhfsMeta.curYear}.csv
- [Where Rents Are Rising Fastest](${baseUrl}/reports/rent-growth): Two-bedroom rent growth by U.S. metro and state, from HUD Fair Market Rents, year over year.
- [Best Cash-Flow Markets (Rental Yield)](${baseUrl}/reports/rental-yield): Gross rental yield for every state and major metro, from Census ACS data.
- [The Investor Financing Report](${baseUrl}/reports/investor-financing): How real estate investors finance deals — rate premium, denial rates, leverage — from CFPB HMDA.
- [Most Active Investment-Property Lenders by State](${baseUrl}/reports/investor-lenders): Lenders ranked by HMDA-reported investment-property loan volume in each state.

## Tools

- [Real Estate Calculators](${baseUrl}/calculators): 17 free calculators — cap rate, cash-on-cash, BRRRR, DSCR, rental cash flow, fix-and-flip, and more.
- [Lender Finder](${baseUrl}/financing/matcher): Match an investment-loan scenario to lenders.

## About

- [Reports index](${baseUrl}/reports)
- [About / author](${baseUrl}/authors/bill-rice)
- Sources: U.S. Census Bureau (RHFS, ACS), HUD (Fair Market Rents), CFPB (HMDA). Government works, public domain.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
