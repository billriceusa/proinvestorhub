/**
 * Per-type financing guide pages — the creative/niche cluster under the /financing pillar.
 *
 * These are the financing methods that do NOT have a lender-directory page in
 * loan-types.ts (seller financing, subject-to, syndication, house-hacking, etc.).
 * Each is a hand-written, lender-neutral guide targeting a specific low-KD,
 * high-intent decision query, deep-linked from the pillar's creative-finance
 * cards and the Financing Matcher's "also consider" recommendations.
 *
 * Routed at /financing/[type]. No fabricated rates/stats — terms on creative
 * deals are negotiated per deal, so copy describes structure, not invented numbers.
 */

import type { DealProfile } from './financing-matcher'

export type FinancingTypeSection = { heading: string; paragraphs: string[] }

export type FinancingType = {
  slug: string
  /** Card/nav label. */
  shortLabel: string
  /** Anchor id on the /financing pillar this page replaces/deepens, if any. */
  pillarAnchor?: string
  name: string
  metaTitle: string
  metaDescription: string
  /** Primary target term — internal documentation only. */
  targetKeyword: string
  h1: string
  intro: string
  /** One-line definition for the schema DefinedTerm + answer-box lede. */
  definition: string
  bestFor: string[]
  sections: FinancingTypeSection[]
  pros: string[]
  cons: string[]
  faqs: Array<{ question: string; answer: string }>
  /** Calculators worth surfacing on this page. */
  relatedCalculators: Array<{ label: string; href: string }>
  /** Other financing-type slugs (this file) to cross-link. */
  relatedTypes: string[]
  /** Optional matcher pre-set, so the page can drop into a live recommendation. */
  matcherProfile?: DealProfile
}

export const financingTypes: FinancingType[] = [
  // ── Seller financing — 10,000/mo, KD 20 (highest-volume creative term) ──────
  {
    slug: 'seller-financing',
    shortLabel: 'Seller financing',
    pillarAnchor: 'seller-financing',
    name: 'Seller Financing',
    metaTitle: 'Seller Financing in Real Estate: How It Works (2026 Guide)',
    metaDescription:
      'How seller financing works for real estate investors — the structure, the terms you negotiate, the risks, and when it beats a bank loan. A lender-neutral, plain-English guide.',
    targetKeyword: 'seller financing',
    h1: 'Seller Financing: How It Works in Real Estate',
    intro:
      'In a seller-financed deal the person selling the property becomes your lender — there is no bank. You and the seller agree on a price, a down payment, an interest rate, and a repayment schedule, and you pay them directly over time. It is one of the most flexible ways to buy an investment property, and one of the most misunderstood.',
    definition:
      'Seller financing (also called owner financing) is a transaction in which the property seller extends credit to the buyer to cover all or part of the purchase price, instead of the buyer obtaining a mortgage from a bank.',
    bestFor: [
      'Buyers whose credit or income documentation is a hurdle with banks',
      'Investors who want negotiable rate, term, and down-payment',
      'Sellers who own free-and-clear and want passive income plus tax deferral',
      'Properties or borrowers that conventional underwriting rejects',
    ],
    sections: [
      {
        heading: 'How a seller-financed deal is structured',
        paragraphs: [
          'The buyer and seller sign a promissory note that spells out the loan amount, interest rate, payment schedule, and term, plus a mortgage or deed of trust that secures the note against the property. The buyer takes title and makes monthly payments to the seller exactly as they would to a bank — the seller simply holds the note instead of a lender.',
          'Most seller-financed notes are not fully amortized over 30 years. The common structure is a shorter term — often three to seven years — with payments calculated on a longer amortization schedule and a balloon payment due at the end. That gives the buyer time to improve the property, season the deal, and then refinance into a conventional or DSCR loan to pay the seller off.',
        ],
      },
      {
        heading: 'What you actually negotiate',
        paragraphs: [
          'Every term is on the table, which is the whole point. Down payment, interest rate, amortization length, balloon timing, and whether there is a prepayment penalty are all negotiated directly between you and the seller. A motivated seller who owns the property free and clear has the most flexibility, because there is no underlying lender to satisfy.',
          'The seller’s motivation drives the deal: someone selling an inherited property, retiring out of being a landlord, or struggling to sell a hard-to-finance property is often happy to carry a note in exchange for a steady monthly income stream and the ability to spread their capital-gains tax over the life of the loan (an installment sale). Frame your offer around the problem you solve for them.',
        ],
      },
      {
        heading: 'The risks to manage on both sides',
        paragraphs: [
          'For the buyer, the biggest risk is the balloon. If you cannot refinance or sell before it comes due, you can lose the property and your down payment. Build a realistic refinance plan before you sign, and negotiate the longest balloon you can get.',
          'If the seller still has a mortgage on the property, their loan almost certainly has a due-on-sale clause — selling on terms can let their lender call that loan. A wraparound mortgage is the structure used to work around this, but it adds risk and complexity; have a real-estate attorney paper any wrap. Always use an attorney or title company to draft the note and record the security instrument — a handshake deal is how both sides get hurt.',
        ],
      },
    ],
    pros: [
      'No bank qualifying — credit and income documentation are negotiable',
      'Every term (rate, down, term, balloon) is negotiable',
      'Faster, cheaper closing — no lender underwriting or origination fees',
      'Can finance properties banks reject as non-conforming',
    ],
    cons: [
      'Usually carries a balloon payment that forces a refinance or sale',
      'Requires a willing, ideally free-and-clear seller — most are not',
      'Due-on-sale risk if the seller has an existing mortgage',
      'Needs careful legal documentation to protect both parties',
    ],
    faqs: [
      {
        question: 'Is seller financing legal?',
        answer:
          'Yes. Seller financing is legal in every state, though investor-as-lender deals must still respect applicable usury limits and, for owner-occupant buyers, federal rules like the SAFE Act and Dodd-Frank. For investment property between sophisticated parties the rules are lighter, but always close through an attorney or title company.',
      },
      {
        question: 'What down payment is typical with seller financing?',
        answer:
          'There is no fixed requirement because it is negotiated, but sellers commonly ask for 10–20% down to protect their position. A larger down payment gives the seller more security and gives you leverage to negotiate a lower rate or longer term.',
      },
      {
        question: 'How is seller financing different from subject-to?',
        answer:
          'In seller financing the seller creates a new note for you and is paid off (or paid over time) at closing. In a subject-to deal, no new loan is created — you take over the seller’s existing mortgage and keep making those payments. Seller financing needs a willing lender-seller; subject-to needs an existing loan worth keeping.',
      },
    ],
    relatedCalculators: [
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
    ],
    relatedTypes: ['subject-to'],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', credit: '620-659', income: 'no-doc' },
  },

  // ── House hacking — 5,600/mo, KD 10 ─────────────────────────────────────────
  {
    slug: 'house-hacking',
    shortLabel: 'House hacking',
    pillarAnchor: 'fha-va-househack',
    name: 'House Hacking',
    metaTitle: 'House Hacking: How to Buy Your First Rental With 3.5% Down',
    metaDescription:
      'House hacking explained — live in one unit, rent the rest, and use owner-occupied FHA or VA financing to buy a 2–4 unit with as little as 0–3.5% down. The first-deal playbook.',
    targetKeyword: 'house hacking',
    h1: 'House Hacking: The Lowest-Down-Payment Path Into Investing',
    intro:
      'House hacking means buying a property you live in while renting out the rest of it — the other units of a duplex through fourplex, or even spare bedrooms — so the tenants cover most or all of your mortgage. Because you occupy it, you qualify for owner-occupied financing, which is dramatically cheaper than investment-property financing. It is the single most accessible way to buy your first deal.',
    definition:
      'House hacking is the strategy of buying a 1–4 unit property as your primary residence, living in part of it, and renting out the remaining space to offset or eliminate your housing cost — using low-down-payment owner-occupied financing.',
    bestFor: [
      'First-time investors with limited cash for a down payment',
      'Buyers willing to live in the property for at least a year',
      'W-2 earners who can qualify for owner-occupied financing',
      'Veterans eligible for 0%-down VA financing',
    ],
    sections: [
      {
        heading: 'Why the financing is the whole advantage',
        paragraphs: [
          'A standard investment-property loan wants 20–25% down. Owner-occupied financing on the same 2–4 unit building wants a fraction of that: FHA loans allow as little as 3.5% down, conventional owner-occupied loans can go to 5%, and VA loans let eligible veterans buy with 0% down. The catch — and the trade — is that you must actually live in the property, typically for at least twelve months.',
          'On a 2–4 unit purchase, lenders will also credit a portion of the projected rent from the other units toward your qualifying income, which makes the loan easier to get than buying a single-family home of the same price. You get a lower down payment and an easier approval at the same time.',
        ],
      },
      {
        heading: 'The math that makes it work',
        paragraphs: [
          'The goal is to drive your out-of-pocket housing cost toward zero. On a fourplex, three rented units against your one occupied unit can cover the entire mortgage, taxes, and insurance — meaning you live for free while a tenant base pays down your loan and the property appreciates. Even a duplex where one tenant covers half your payment is a large head start over renting.',
          'Run the numbers as if all units were rented (your future exit, when you move out) and again as you will actually live in it. If it cash-flows once you leave, you have bought a performing rental and gotten a year of cheap or free housing on the way. The rental cash-flow calculator is built for exactly this check.',
        ],
      },
      {
        heading: 'The exit: repeat or hold',
        paragraphs: [
          'After your occupancy requirement is satisfied, you can move out, rent your former unit, and the whole building becomes an investment property. Many investors then repeat the move — buy another owner-occupied 2–4 unit with low down, and stack a portfolio one house-hack at a time. This is how a lot of large rental portfolios actually started.',
          'You can refinance later into investment-property financing if you want to pull equity for the next deal, but there is no rush — keeping the low-rate owner-occupied loan in place is usually the better move.',
        ],
      },
    ],
    pros: [
      'As little as 0–3.5% down with VA or FHA financing',
      'Lowest-cost way to acquire a small multifamily',
      'Projected rent from other units helps you qualify',
      'Tenants pay down your mortgage while you live cheaply or free',
    ],
    cons: [
      'You must live in the property (usually 12+ months)',
      'You are a live-in landlord — tenants are your neighbors',
      'FHA requires mortgage insurance, raising the payment',
      'Limited to 1–4 unit properties under owner-occupied rules',
    ],
    faqs: [
      {
        question: 'How much do I need down to house hack?',
        answer:
          'With an FHA loan, as little as 3.5% of the purchase price on a 1–4 unit property. VA loans allow 0% down for eligible veterans, and conventional owner-occupied loans start around 5%. That is far below the 20–25% an investment-property loan requires.',
      },
      {
        question: 'How long do I have to live there?',
        answer:
          'Owner-occupied loan programs generally require you to occupy the property as your primary residence for at least one year. After that you can move out and rent the unit you lived in, converting the whole building to an investment property.',
      },
      {
        question: 'Can I house hack with a single-family home?',
        answer:
          'Yes — renting spare bedrooms or a finished basement/ADU is a form of house hacking — but a 2–4 unit property is the classic vehicle because each unit is self-contained, the rent is higher, and lenders will credit the projected rent toward your qualification.',
      },
    ],
    relatedCalculators: [
      { label: 'Rental Cash Flow Calculator', href: '/calculators/rental-cashflow' },
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
    ],
    relatedTypes: ['seller-financing'],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', ownerOccupy: 'yes', cash: 'under-25k' },
  },

  // ── Real estate syndication — 4,100/mo, KD 6 ────────────────────────────────
  {
    slug: 'real-estate-syndication',
    shortLabel: 'Syndication',
    pillarAnchor: 'syndication',
    name: 'Real Estate Syndication',
    metaTitle: 'Real Estate Syndication: How It Works for Sponsors & Investors',
    metaDescription:
      'Real estate syndication explained — how a sponsor pools capital from passive limited partners to buy large multifamily or commercial deals, how profits split, and the risks on both sides.',
    targetKeyword: 'real estate syndication',
    h1: 'Real Estate Syndication: How It Works',
    intro:
      'A real estate syndication is a group investment: a sponsor (the operator) finds and runs a deal too large to buy alone, and a group of passive investors supply most of the equity in exchange for a share of the returns. It is how individual investors get into 100-unit apartment complexes and commercial buildings without managing them — and how experienced operators scale far beyond their own capital.',
    definition:
      'A real estate syndication is a partnership in which a sponsor (general partner) pools equity from multiple passive investors (limited partners) to acquire and operate a property larger than any of them could finance individually.',
    bestFor: [
      'Experienced operators scaling into large multifamily or commercial',
      'Passive investors who want real-estate exposure without managing it',
      'Sponsors with strong deal flow but limited personal capital',
      'Accredited investors diversifying out of the stock market',
    ],
    sections: [
      {
        heading: 'The two sides: sponsor and limited partners',
        paragraphs: [
          'The sponsor (also called the general partner, or GP) does the work: finds the deal, performs due diligence, arranges the financing, and manages the property through to sale. The limited partners (LPs) are passive — they contribute capital and receive a share of the cash flow and the eventual sale proceeds, but they have no day-to-day role and limited liability.',
          'Syndications are almost always structured as an LLC or limited partnership, and because the LPs are investing in a security, the offering is governed by SEC rules — most commonly Regulation D (Rule 506(b) or 506(c)), which dictates who can invest and how the sponsor can advertise the deal. This is the part that makes syndication legally distinct from a simple partnership.',
        ],
      },
      {
        heading: 'How the money splits',
        paragraphs: [
          'A typical structure pays LPs a preferred return — a first claim on cash flow, often in the high single digits annually — before the sponsor earns its share of the profits. Above that preferred return, the remaining profit is split between LPs and the GP according to a waterfall (for example 70/30 or 80/20 in the LPs’ favor, sometimes with the GP’s share increasing as performance targets are hit).',
          'The sponsor also typically earns fees — an acquisition fee at purchase and an asset-management fee during the hold — which compensate the work and align with, but are separate from, the profit split. A passive investor’s job is to read the offering documents closely and understand exactly how, and in what order, they get paid.',
        ],
      },
      {
        heading: 'The risks for a passive investor',
        paragraphs: [
          'The single biggest variable in a syndication is the sponsor. You are betting on their ability to execute the business plan, manage the property, and navigate a downturn. Vet the sponsor’s track record across full market cycles, not just the recent boom, before you commit a dollar.',
          'Syndication investments are also illiquid — your capital is typically locked up for the full hold period of three to seven years, with no easy way to exit early — and leveraged, so a deal that misses its rent or refinance assumptions can wipe out LP equity. Treat the projected returns as a plan, not a promise.',
        ],
      },
    ],
    pros: [
      'Access to large institutional-quality deals with passive capital',
      'Limited partners have no management duties and limited liability',
      'Potential for strong, tax-advantaged returns (depreciation passes through)',
      'Lets sponsors scale well beyond their own balance sheet',
    ],
    cons: [
      'Capital is illiquid — locked up for the full 3–7 year hold',
      'Returns depend heavily on the sponsor’s execution',
      'Most 506(c) deals require accredited-investor status',
      'Leverage amplifies losses if the business plan misses',
    ],
    faqs: [
      {
        question: 'Do I have to be an accredited investor to join a syndication?',
        answer:
          'It depends on the offering. Rule 506(c) deals — which can be publicly advertised — are limited to accredited investors. Rule 506(b) deals can accept a limited number of sophisticated non-accredited investors but cannot be advertised. Check the offering’s structure before assuming you qualify.',
      },
      {
        question: 'What returns do real estate syndications target?',
        answer:
          'Sponsors commonly target a preferred return for LPs plus a share of the upside, often quoted as a projected annualized return and an equity multiple over the hold. These are projections, not guarantees — scrutinize the assumptions behind them and the sponsor’s history of hitting them.',
      },
      {
        question: 'How is a syndication different from a REIT?',
        answer:
          'A REIT is a company that owns a diversified portfolio of properties and trades like a stock — liquid, but you do not choose the assets. A syndication is a single deal (or small set of deals) you invest in directly: less liquid and less diversified, but with direct ownership, deal-specific upside, and pass-through tax benefits.',
      },
    ],
    relatedCalculators: [
      { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
    ],
    relatedTypes: ['subject-to', 'seller-financing'],
    matcherProfile: { dealType: 'multifamily-5plus', exit: 'hold' },
  },

  // ── Subject-to — 3,000/mo, KD 0 ─────────────────────────────────────────────
  {
    slug: 'subject-to',
    shortLabel: 'Subject-to',
    pillarAnchor: 'subject-to',
    name: 'Subject-To',
    metaTitle: 'Subject-To Real Estate: How Taking Over a Mortgage Works',
    metaDescription:
      'Subject-to real estate explained — how you buy a property by taking over the seller’s existing mortgage, when it makes sense, and the due-on-sale risk every investor must understand.',
    targetKeyword: 'subject to real estate',
    h1: 'Subject-To: Buying a Property by Taking Over the Mortgage',
    intro:
      'In a subject-to deal you buy a property “subject to” the existing financing staying in place — you take title and start making the payments on the seller’s current mortgage, but the loan stays in the seller’s name and is never paid off or refinanced. When that existing loan carries a low interest rate, subject-to lets you control a property with very little cash and a payment no new loan could match today.',
    definition:
      'A subject-to purchase is a transaction in which the buyer takes ownership of a property while the seller’s existing mortgage remains in place and in the seller’s name, with the buyer making the payments on that loan.',
    bestFor: [
      'Low-cash buyers who find a motivated seller',
      'Properties with an existing low-interest-rate loan worth keeping',
      'Sellers facing foreclosure or needing to move quickly',
      'Experienced investors comfortable managing due-on-sale risk',
    ],
    sections: [
      {
        heading: 'How a subject-to deal works',
        paragraphs: [
          'No new loan is originated. The deed transfers to you (or your entity), but the seller’s mortgage stays exactly as it was — same balance, same rate, same monthly payment — and you take over making those payments. You typically pay the seller a small amount for their equity, then service the existing debt going forward.',
          'The appeal is the interest rate. A seller who locked a 3% mortgage in 2021 has a loan that is worth keeping; assuming that payment via subject-to gives you financing no current lender will write. It is most powerful with a motivated seller who has little equity and a strong existing loan.',
        ],
      },
      {
        heading: 'The due-on-sale clause is the central risk',
        paragraphs: [
          'Nearly every mortgage contains a due-on-sale clause that gives the lender the right to demand full repayment when the property is sold. A subject-to transfer technically triggers it. In practice lenders rarely call a loan that is being paid on time — but they can, especially in a rising-rate environment, and you must go in assuming it could happen.',
          'Investors mitigate this several ways: keeping payments current and inconspicuous, leaving the seller’s insurance in place with the investor added as an interested party, sometimes holding title in a land trust, and keeping a refinance or payoff plan ready in case the loan is called. None of these eliminate the risk — they manage it. This is not a strategy to run without understanding what happens if the lender accelerates.',
        ],
      },
      {
        heading: 'Protecting the seller — and yourself',
        paragraphs: [
          'The seller is taking real risk: their credit is still tied to a loan they no longer control, and if you stop paying, it is their name on the late notices. A fair subject-to deal accounts for that — clear written agreements, a servicing setup that keeps the seller informed, and ideally a defined timeline for paying off or refinancing the loan out of their name.',
          'Always use a real-estate attorney and a title company. Subject-to deals have more moving parts than a normal purchase, and the documentation (purchase agreement, authorization to release information, deed, and a servicing arrangement) is what protects both sides if anything goes wrong.',
        ],
      },
    ],
    pros: [
      'Very little cash required to take control of the property',
      'Inherit an existing below-market interest rate',
      'No new loan application, qualifying, or origination costs',
      'Fast — no lender underwriting timeline',
    ],
    cons: [
      'Due-on-sale clause can let the lender call the loan',
      'The loan stays in the seller’s name and on their credit',
      'Requires a motivated seller with a worthwhile existing loan',
      'Legally complex — must be papered carefully by professionals',
    ],
    faqs: [
      {
        question: 'Is subject-to legal?',
        answer:
          'Yes, buying subject-to existing financing is legal. The complication is the mortgage’s due-on-sale clause, which gives the lender the contractual right to call the loan when title transfers. The transaction is legal; the loan being called is a contractual risk you accept and manage.',
      },
      {
        question: 'What happens if the lender calls the loan?',
        answer:
          'You would need to pay off or refinance the mortgage, typically within 30 days of the demand. This is why experienced subject-to investors keep a refinance or payoff plan ready before they close, rather than assuming the loan will never be called.',
      },
      {
        question: 'How is subject-to different from assuming a loan?',
        answer:
          'A formal loan assumption is approved by the lender and moves the debt into your name, releasing the seller. Subject-to keeps the loan in the seller’s name without the lender’s involvement. Assumption is cleaner but only some loans (often FHA, VA, and USDA) are assumable; subject-to works on loans that are not.',
      },
    ],
    relatedCalculators: [
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
    ],
    relatedTypes: ['seller-financing'],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', cash: 'under-25k', income: 'no-doc' },
  },
]

export function getFinancingTypeBySlug(slug: string): FinancingType | undefined {
  return financingTypes.find((t) => t.slug === slug)
}
