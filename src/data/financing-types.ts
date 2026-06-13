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
  /** Optional cross-links to lender directories or other guides (e.g. /lenders/commercial-loans). */
  relatedGuides?: Array<{ label: string; href: string }>
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

  // ── Wraparound mortgage — 1,700/mo, KD 7 ────────────────────────────────────
  {
    slug: 'wraparound-mortgage',
    shortLabel: 'Wraparound mortgage',
    name: 'Wraparound Mortgage',
    metaTitle: 'Wraparound Mortgage: How a Wrap Loan Works (2026 Guide)',
    metaDescription:
      'A wraparound mortgage lets a buyer finance a purchase around the seller’s existing loan. How a wrap is structured, when it beats seller financing, and the due-on-sale risk.',
    targetKeyword: 'wraparound mortgage',
    h1: 'Wraparound Mortgage: How a Wrap Loan Works',
    intro:
      'A wraparound mortgage is a form of seller financing used when the seller still owes money on the property. Instead of paying off that loan, the seller carries a new, larger note that “wraps around” their existing mortgage — you pay the seller, and the seller keeps paying their original lender. It is the bridge between seller financing and subject-to, and it carries the risks of both.',
    definition:
      'A wraparound mortgage (or “wrap”) is a seller-financed loan in which the seller’s existing mortgage stays in place and the new, larger note the buyer pays wraps around it, with the seller using part of the buyer’s payment to service the underlying loan.',
    bestFor: [
      'Sellers with an existing mortgage who want to carry financing',
      'Buyers who can’t qualify for a bank loan but have a willing seller',
      'Deals where the seller’s existing rate is below the new wrap rate',
      'Experienced parties willing to manage due-on-sale risk',
    ],
    sections: [
      {
        heading: 'How a wrap is structured',
        paragraphs: [
          'The seller keeps their original mortgage and creates a new promissory note to you for a larger amount — typically the agreed sale price minus your down payment. You make one monthly payment to the seller on the wrap note. The seller then continues making their own payment on the underlying loan out of what you send them, and pockets the difference.',
          'The seller usually profits on the spread between the two loans. If their underlying loan is at 4% and they write your wrap at 7%, they earn the 3% difference on the wrapped balance — on top of any markup on the sale price. That spread is the reason a seller agrees to a wrap instead of demanding to be cashed out.',
        ],
      },
      {
        heading: 'Wraparound vs. seller financing vs. subject-to',
        paragraphs: [
          'Plain seller financing assumes the seller owns the property free and clear — there is no underlying loan to work around. A wraparound is what you use when the seller still has a mortgage: it lets them carry financing without first paying that mortgage off.',
          'Subject-to is the close cousin: in a subject-to deal you simply take over the seller’s existing payment with no new note created. A wrap adds a new, larger seller-held note on top of the existing loan — giving the seller a profit spread and a clearer paper trail, at the cost of more complexity. Choose the wrap when the seller wants ongoing income and a markup; choose subject-to when you just want the existing low payment.',
        ],
      },
      {
        heading: 'The risks — and why you paper it carefully',
        paragraphs: [
          'The underlying mortgage almost certainly has a due-on-sale clause, and a wrap triggers it just as subject-to does. The lender can call the wrapped loan; build a refinance or payoff plan before you close. There is also performance risk in both directions: if the seller stops paying the underlying loan despite collecting your payment, the property can be foreclosed out from under you — so many wraps route payments through a neutral third-party servicer that pays the underlying lender directly.',
          'Because two loans are stacked on one property, a wraparound has more ways to go wrong than a standard purchase. Always use a real-estate attorney and a servicing company, record the wrap note, and define who pays the underlying loan and how, in writing.',
        ],
      },
    ],
    pros: [
      'Lets a seller with an existing mortgage still carry financing',
      'No bank qualifying for the buyer — terms are negotiated',
      'Seller earns the rate spread plus any price markup',
      'Faster, cheaper close than originating a new bank loan',
    ],
    cons: [
      'Due-on-sale clause on the underlying loan can be triggered',
      'Buyer depends on the seller actually paying the underlying loan',
      'More complex and higher-risk than plain seller financing',
      'Requires careful legal documentation and ideally a servicer',
    ],
    faqs: [
      {
        question: 'Is a wraparound mortgage legal?',
        answer:
          'Yes, wraparound mortgages are legal, but they implicate the underlying loan’s due-on-sale clause and, for owner-occupant buyers, federal lending rules. Between investors on an investment property the rules are lighter — but always close a wrap through an attorney and use a neutral servicer.',
      },
      {
        question: 'What is the difference between a wraparound and subject-to?',
        answer:
          'Subject-to means you take over the seller’s existing payment with no new loan created. A wraparound creates a new, larger seller-held note that wraps around that existing loan, giving the seller a profit on the rate spread. A wrap is essentially subject-to plus seller financing layered on top.',
      },
      {
        question: 'Who pays the underlying mortgage in a wrap?',
        answer:
          'The seller remains legally responsible for the underlying loan and pays it out of the payment you send them. To protect the buyer, many wraps use a third-party loan servicer that receives the buyer’s payment and pays the underlying lender directly, so the buyer can confirm the senior loan stays current.',
      },
    ],
    relatedCalculators: [
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
    ],
    relatedTypes: ['seller-financing', 'subject-to'],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', cash: 'under-25k', income: 'no-doc' },
  },

  // ── Lease option / rent-to-own — ≈700/mo ────────────────────────────────────
  {
    slug: 'lease-option',
    shortLabel: 'Lease option',
    pillarAnchor: 'lease-option',
    name: 'Lease Option',
    metaTitle: 'Lease Option Real Estate: How Rent-to-Own Investing Works',
    metaDescription:
      'How a lease option works for real estate investors — control a property with a lease plus the right to buy later at a set price, with little money down. Structure, pros, and risks.',
    targetKeyword: 'lease option',
    h1: 'Lease Option: Controlling Property Before You Finance It',
    intro:
      'A lease option lets you control a property — and lock in a future purchase price — with a lease today and the right (but not the obligation) to buy later. You do not need financing now, which makes it a low-cash way to tie up a deal while you arrange a loan, improve your credit, or simply wait for appreciation to build equity you can refinance against.',
    definition:
      'A lease option is an agreement that combines a lease of a property with an option giving the tenant the exclusive right to purchase it at a predetermined price within a set period.',
    bestFor: [
      'Investors who want to control a deal without financing it today',
      'Buyers building credit or cash toward a future purchase',
      'Wholesalers and rent-to-own operators',
      'Sellers who want income now and a likely sale later',
    ],
    sections: [
      {
        heading: 'The two pieces: the lease and the option',
        paragraphs: [
          'A lease option is two agreements working together. The lease lets you (or your tenant-buyer) occupy or control the property and pay rent. The option gives you the exclusive right to buy at a price fixed today, exercisable within a defined window — often one to three years. You typically pay a non-refundable option fee up front for that right, and a portion of each month’s rent (a “rent credit”) may be applied toward the eventual purchase.',
          'The key word is option, not obligation. If the deal no longer makes sense when the window closes — the market dropped, your financing fell through — you can walk away and simply lose the option fee and rent credits. That asymmetry is the appeal: limited downside, full upside if the property appreciates above your locked price.',
        ],
      },
      {
        heading: 'How investors use it',
        paragraphs: [
          'Investors use lease options two ways. As a buyer, you lock a purchase price now, control the property, and refinance or pay cash to exercise the option once you can — capturing any appreciation above the strike price. As an operator, you can sandwich the deal: lease-option a property from an owner, then sub-lease-option it to a tenant-buyer at a higher price, profiting on the spread and the option fees (a “sandwich lease option”).',
          'Because you are not taking title or originating a loan, the cash to get in is small — the option fee plus first month’s rent — which is why lease options show up in low- and no-money-down strategies.',
        ],
      },
      {
        heading: 'The risks to watch',
        paragraphs: [
          'The biggest risk is the seller’s situation changing before you exercise. If the owner stops paying their mortgage, files bankruptcy, or places liens on the property, your option can be jeopardized — so record a memorandum of option and verify the title and that the mortgage stays current. Make sure the contract clearly separates the lease from the option so it cannot be re-characterized as an installment sale.',
          'For the buyer, option fees and rent credits are usually non-refundable, so only pay them on a deal you genuinely intend and expect to be able to close. As always with creative structures, have an attorney draft the agreements.',
        ],
      },
    ],
    pros: [
      'Control a property and lock a price with little cash down',
      'No financing or qualifying required to get started',
      'Walk away if the deal sours — the option is a right, not a duty',
      'Capture appreciation above your locked purchase price',
    ],
    cons: [
      'Option fee and rent credits are typically non-refundable',
      'Your interest is exposed if the seller’s finances deteriorate',
      'Still need financing (or cash) to actually exercise and buy',
      'Contracts must be drafted carefully to hold up legally',
    ],
    faqs: [
      {
        question: 'How much is a lease option fee?',
        answer:
          'The option fee is negotiable, commonly a few percent of the purchase price. It is usually non-refundable and is often credited toward the price if you exercise the option, so treat it as earnest commitment, not a sunk cost — provided you intend to buy.',
      },
      {
        question: 'What happens if I don’t exercise the option?',
        answer:
          'You simply let the option expire. You are not obligated to buy, so you walk away — but you forfeit the option fee and any rent credits you paid for the right. That capped loss is the trade-off for the no-obligation upside.',
      },
      {
        question: 'Is a lease option the same as rent-to-own?',
        answer:
          'They overlap. “Rent-to-own” is the consumer-facing name for the same idea — leasing with a path to ownership. A lease option specifically grants the right (not the obligation) to buy; a related structure, a lease-purchase, obligates the tenant to buy. Read which one the contract actually is.',
      },
    ],
    relatedCalculators: [
      { label: 'Rental Cash Flow Calculator', href: '/calculators/rental-cashflow' },
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
    ],
    relatedTypes: ['seller-financing', 'subject-to'],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', cash: 'under-25k' },
  },

  // ── Partnerships & JV — low KD ──────────────────────────────────────────────
  {
    slug: 'partnerships-jv',
    shortLabel: 'Partnerships & JV',
    pillarAnchor: 'partnerships-jv',
    name: 'Real Estate Partnerships & JV',
    metaTitle: 'Real Estate Partnerships & Joint Ventures: How to Structure a Deal',
    metaDescription:
      'How real estate partnerships and joint ventures work — pairing a capital partner with an operating partner, common profit splits, and how to structure and protect the deal.',
    targetKeyword: 'real estate partnership',
    h1: 'Real Estate Partnerships & Joint Ventures',
    intro:
      'A real estate partnership pairs people with what a deal needs: one side brings the capital, the other brings the deal, the work, and the expertise. It is how investors with strong deal flow but limited cash keep buying — and how investors with cash but no time still own real estate. Structured well, a partnership funds deals no single party could do alone.',
    definition:
      'A real estate joint venture (JV) is a partnership in which two or more parties combine resources — typically one supplying capital and another supplying the deal and active management — to acquire and operate a property, sharing the returns by agreement.',
    bestFor: [
      'Operators with strong deals but limited capital of their own',
      'Passive partners with capital but no time or expertise',
      'Investors pooling resources to access larger deals',
      'Pairing complementary skills (capital, construction, management)',
    ],
    sections: [
      {
        heading: 'The classic split: money partner and operating partner',
        paragraphs: [
          'The most common real estate JV pairs a capital partner, who funds the down payment and reserves, with an operating partner (sometimes called the sweat-equity partner), who finds the deal, arranges financing, manages the rehab or property, and executes the business plan. Each contributes what the other lacks, and they split the profit by agreement — 50/50 is common, but the split should reflect what each side actually brings.',
          'A JV is typically structured through an LLC the partners jointly own, with an operating agreement that spells out capital contributions, who decides what, how profits and losses are split, and how either party can exit. Unlike a syndication — where many passive investors fund a sponsor’s deal under securities law — a JV is usually a small number of active or semi-active partners, which keeps it simpler legally.',
        ],
      },
      {
        heading: 'Structuring the deal so it survives',
        paragraphs: [
          'The split is only part of it. A durable partnership agreement also covers the unglamorous questions: What happens if the deal needs more cash than planned — who funds the shortfall, and what does the other partner give up if they can’t? How are decisions made when partners disagree? How does a partner exit, and how is their interest valued? What happens if one partner dies or wants out early?',
          'Get these answered in writing before you close, not after a dispute. The deals that blow up partnerships are almost always the ones where the agreement was silent on the hard cases.',
        ],
      },
      {
        heading: 'JV vs. syndication vs. just borrowing',
        paragraphs: [
          'If you mainly need money and have the deal handled, a private-money loan or a simple capital partner may be cleaner than a full JV — you keep control and just pay for the capital. A JV makes sense when you genuinely want a partner’s involvement, skills, or shared risk, not only their cash.',
          'If you need capital from many passive investors rather than one or two partners, you are no longer doing a JV — you are doing a syndication, which is a securities offering with its own rules. Know which one you are actually structuring.',
        ],
      },
    ],
    pros: [
      'Fund deals you couldn’t finance with your own capital alone',
      'Combine complementary strengths (capital, deals, management)',
      'Share risk across partners rather than carrying it solo',
      'Simpler legally than a multi-investor syndication',
    ],
    cons: [
      'You give up a share of the profit and some control',
      'Partner disputes can stall or sink a deal',
      'Requires a thorough operating agreement to protect both sides',
      'Misaligned expectations or skills can poison the relationship',
    ],
    faqs: [
      {
        question: 'How do you split profits in a real estate partnership?',
        answer:
          'There is no fixed rule — it is negotiated to reflect each party’s contribution. A common starting point is 50/50 between a capital partner and an operating partner, but splits shift based on how much capital, work, expertise, and risk each side brings. Put the split, and how it changes if the deal needs more money, in the operating agreement.',
      },
      {
        question: 'What is the difference between a JV and a syndication?',
        answer:
          'A joint venture is a small group of active partners combining resources on a deal. A syndication pools money from many passive investors under a sponsor and is regulated as a securities offering. JVs are simpler legally; syndications can raise far more capital but carry SEC compliance obligations.',
      },
      {
        question: 'Do I need an LLC for a real estate partnership?',
        answer:
          'It is strongly advisable. Holding the property in a jointly owned LLC with a written operating agreement provides liability protection and a clear framework for contributions, decisions, profit splits, and exits — far safer than an informal handshake partnership.',
      },
    ],
    relatedCalculators: [
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
      { label: 'BRRRR Calculator', href: '/calculators/brrrr' },
    ],
    relatedTypes: ['real-estate-syndication', 'seller-financing'],
    matcherProfile: { dealType: 'value-add-brrrr', exit: 'refi-hold', cash: 'under-25k' },
  },

  // ── Transactional funding — 500/mo, KD 0, $5 CPC ────────────────────────────
  {
    slug: 'transactional-funding',
    shortLabel: 'Transactional funding',
    pillarAnchor: 'transactional-funding',
    name: 'Transactional Funding',
    metaTitle: 'Transactional Funding: Same-Day Double-Close Financing Explained',
    metaDescription:
      'How transactional funding works for wholesalers — very short-term capital that funds an A-to-B purchase so you can immediately resell B-to-C, without using your own cash.',
    targetKeyword: 'transactional funding',
    h1: 'Transactional Funding: Financing a Double Close',
    intro:
      'Transactional funding is ultra-short-term money — often used for just a day — that lets a wholesaler fund the purchase of a property and immediately resell it to the end buyer in a back-to-back, or “double,” close. It exists for one job: to complete an A-to-B then B-to-C transaction without the wholesaler using their own cash and without the two buyers’ funds touching.',
    definition:
      'Transactional funding is very short-term financing (often same-day) that funds the first leg of a back-to-back real estate closing, letting a wholesaler buy from the seller and simultaneously resell to the end buyer without using personal capital.',
    bestFor: [
      'Wholesalers executing a same-day double close',
      'Deals where the contract can’t be simply assigned',
      'Investors who want to keep their spread confidential',
      'Quick A-to-B-to-C flips with an end buyer already lined up',
    ],
    sections: [
      {
        heading: 'Why a double close needs its own funding',
        paragraphs: [
          'Wholesalers usually profit by assigning a purchase contract to an end buyer for a fee. But sometimes you can’t assign — the seller forbids it, the end buyer’s lender won’t allow it, or you simply don’t want the parties to see your spread. In those cases you actually take title (the A-to-B close) and immediately resell (the B-to-C close). Transactional funding supplies the cash for that brief moment you own the property.',
          'The two closings happen back-to-back, often the same day. The transactional lender funds your purchase from the seller; minutes or hours later your end buyer’s funds close the resale and pay the transactional loan back. The money is outstanding for an extremely short time, which is why it is priced as a flat fee rather than an annual rate.',
        ],
      },
      {
        heading: 'What it costs and what it requires',
        paragraphs: [
          'Transactional funding is priced as a flat fee on the amount funded plus closing costs, reflecting the one-or-two-day term rather than an interest rate. The defining requirement is a non-negotiable one: the end buyer must already be in place and ready to close. Transactional lenders fund only simultaneous or near-simultaneous closings — they are not a bridge to go find a buyer later.',
          'Because the loan is repaid almost immediately by the end buyer’s purchase, the lender’s risk is low and qualification is light — the deal, the signed B-to-C contract, and the title work matter far more than your personal credit.',
        ],
      },
    ],
    pros: [
      'Close a wholesale deal without using your own cash',
      'Keeps your spread private (vs. a visible assignment fee)',
      'Works when a contract can’t legally be assigned',
      'Light qualification — the funded deal repays it same-day',
    ],
    cons: [
      'Requires a ready, funded end buyer to close simultaneously',
      'Flat fee plus two sets of closing costs eats into the spread',
      'Useless for any deal you’ll hold more than a day or two',
      'Not all title companies handle double closings smoothly',
    ],
    faqs: [
      {
        question: 'How much does transactional funding cost?',
        answer:
          'It is charged as a flat fee on the amount funded — reflecting the one-to-two-day term — rather than an annual interest rate, plus the closing costs on the purchase. Because the spread on the resale has to cover both, transactional funding only makes sense on a deal with a healthy margin.',
      },
      {
        question: 'When should I use transactional funding instead of assigning a contract?',
        answer:
          'Use it when you cannot or do not want to assign: the seller prohibits assignment, the end buyer’s lender won’t allow it, or you want to keep your profit confidential. If assignment is allowed and the parties are fine with it, a simple assignment is cheaper.',
      },
    ],
    relatedCalculators: [
      { label: 'Wholesale Calculator', href: '/calculators/wholesale' },
      { label: 'Fix & Flip Profit', href: '/calculators/fix-flip' },
    ],
    relatedTypes: ['seller-financing'],
    matcherProfile: { dealType: 'wholesale', timeline: 'urgent' },
  },

  // ── Mezzanine financing — 2,000/mo, KD 7, $5 CPC ────────────────────────────
  {
    slug: 'mezzanine-financing',
    shortLabel: 'Mezzanine financing',
    name: 'Mezzanine Financing',
    metaTitle: 'Mezzanine Financing in Real Estate: How the Cap Stack Works',
    metaDescription:
      'Mezzanine financing explained — the layer between senior debt and equity that fills the funding gap on commercial real estate deals, how it’s secured, and what it costs.',
    targetKeyword: 'mezzanine financing',
    h1: 'Mezzanine Financing: Filling the Gap in the Capital Stack',
    intro:
      'Mezzanine financing is the layer of capital that sits between the senior mortgage and the owner’s equity on a commercial real estate deal. When the senior lender will only fund, say, 65% of a project and the sponsor doesn’t want to write a check for the other 35%, mezzanine debt fills part of that gap — at a higher cost than the mortgage, but cheaper than giving away equity.',
    definition:
      'Mezzanine financing is subordinate debt that fills the gap between a property’s senior mortgage and the sponsor’s equity, typically secured by a pledge of ownership interests in the entity that owns the property rather than by the property itself.',
    bestFor: [
      'Commercial and multifamily sponsors short of the equity to close',
      'Value-add deals that need more leverage than the senior loan allows',
      'Sponsors who’d rather pay for debt than dilute their equity',
      'Larger deals with a clear stabilization and exit plan',
    ],
    sections: [
      {
        heading: 'Where mezzanine sits in the capital stack',
        paragraphs: [
          'Think of a deal’s funding as a stack: the senior mortgage is at the bottom (lowest risk, lowest cost, paid first), the sponsor’s equity is at the top (highest risk, highest return, paid last), and mezzanine debt sits in between. It is repaid after the senior lender but before the equity, which is why it commands a rate above the mortgage but below the return equity expects.',
          'Mezzanine debt is usually secured differently from a mortgage. Rather than a lien on the real estate (which the senior lender holds), the mezzanine lender takes a pledge of the membership interests in the LLC that owns the property. If the borrower defaults, the mezzanine lender can foreclose on that ownership interest and step into control far faster than a traditional mortgage foreclosure.',
        ],
      },
      {
        heading: 'What it costs and why sponsors use it',
        paragraphs: [
          'Mezzanine money is more expensive than senior debt because it takes more risk — it is repaid later and is effectively second in line. In exchange for that gap-filling capital, the sponsor preserves more of the equity upside than they would by bringing in an equity partner for the same dollars. It is a leverage decision: pay a higher rate on a slice of debt, or give away a share of the profit forever.',
          'It is a commercial tool, not a single-family one. You will see mezzanine financing on apartment complexes, development projects, and larger value-add deals — situations with enough scale and a clear business plan to support a multi-layer capital stack.',
        ],
      },
    ],
    pros: [
      'Adds leverage beyond what the senior lender will fund',
      'Cheaper than raising the same dollars as equity',
      'Lets the sponsor keep more of the upside',
      'Faster lender remedy (UCC pledge) can mean more flexible terms',
    ],
    cons: [
      'More expensive than the senior mortgage',
      'Adds risk — over-leverage can wipe out equity in a downturn',
      'Complex documentation and an intercreditor agreement required',
      'A commercial-scale tool — not for small residential deals',
    ],
    faqs: [
      {
        question: 'How is mezzanine financing secured?',
        answer:
          'Typically by a pledge of the equity interests in the entity that owns the property, not by a mortgage lien on the real estate itself (the senior lender holds that). On default, the mezzanine lender can foreclose on the ownership interest and take control of the property-owning entity.',
      },
      {
        question: 'Is mezzanine financing debt or equity?',
        answer:
          'It is debt, but it sits closer to equity in risk and return because it is repaid after the senior loan. Some mezzanine structures include an equity “kicker” (a small share of the upside) on top of the interest rate, which blurs the line further.',
      },
    ],
    relatedCalculators: [
      { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
      { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
    ],
    relatedTypes: ['real-estate-syndication', 'gap-funding'],
    relatedGuides: [
      { label: 'Commercial real estate lenders', href: '/lenders/commercial-loans' },
      { label: 'Bridge loan lenders', href: '/lenders/bridge-loans' },
    ],
    matcherProfile: { dealType: 'multifamily-5plus', exit: 'hold' },
  },

  // ── Blanket loan — 700/mo, KD 0 ─────────────────────────────────────────────
  {
    slug: 'blanket-loan',
    shortLabel: 'Blanket loan',
    name: 'Blanket Loan',
    metaTitle: 'Blanket Loan: One Mortgage for Multiple Properties Explained',
    metaDescription:
      'A blanket loan is a single mortgage covering multiple properties. How it works for portfolio investors, the release clause, the cross-collateralization risk, and when it beats separate loans.',
    targetKeyword: 'blanket loan',
    h1: 'Blanket Loan: One Mortgage Across Multiple Properties',
    intro:
      'A blanket loan is a single mortgage that covers several properties at once. Instead of juggling a separate loan, payment, and closing for every rental you own, a blanket loan consolidates them under one note — which is why it becomes attractive once an investor’s portfolio grows past a handful of doors.',
    definition:
      'A blanket loan (or blanket mortgage) is a single loan secured by two or more properties under one note, commonly used by investors to finance or refinance a portfolio of rentals together.',
    bestFor: [
      'Investors with several rental properties to consolidate',
      'Portfolio buyers acquiring multiple properties at once',
      'Investors who want one payment instead of many',
      'Developers holding multiple lots or units',
    ],
    sections: [
      {
        heading: 'How a blanket loan works',
        paragraphs: [
          'One loan, one payment, one set of terms — secured by a lien on every property in the package. Blanket loans are usually portfolio products held by the originating bank (rather than sold to Fannie or Freddie), so the lender sets its own guidelines on property count, credit, and structure. That flexibility is the point: you can finance a portfolio that no single conforming loan would cover.',
          'The feature that makes a blanket loan practical for investors is the release clause. It lets you sell an individual property out of the package and release the lien on just that property — paying down the loan by an agreed amount — without having to refinance or pay off the entire blanket. Without a release clause, selling one property could require retiring the whole loan.',
        ],
      },
      {
        heading: 'The cross-collateralization trade-off',
        paragraphs: [
          'Because every property secures the same loan, they are cross-collateralized — a default doesn’t threaten just one property, it can put the entire package at risk. That concentration of risk is the main downside, and it is why blanket loans suit investors who are confident in the portfolio’s combined cash flow.',
          'Blanket loans also commonly carry balloon terms (for example, a 5–10 year term on a 30-year amortization) and prepayment penalties, like other portfolio products. Weigh the convenience of one consolidated loan against those structural trade-offs and the cross-collateral risk.',
        ],
      },
    ],
    pros: [
      'One loan, one payment across many properties',
      'Finances portfolios conforming loans won’t cover',
      'Release clause lets you sell individual properties',
      'Streamlines refinancing and portfolio-level lending',
    ],
    cons: [
      'Cross-collateralization — a default can risk the whole package',
      'Often balloon terms and prepayment penalties',
      'Fewer lenders offer them; rates above conventional',
      'Less flexibility than financing properties individually',
    ],
    faqs: [
      {
        question: 'What is a release clause in a blanket loan?',
        answer:
          'A release clause lets you sell one property out of the blanket and have its lien released — by paying down the loan a pre-agreed amount — without refinancing or paying off the entire loan. It is the feature that makes a blanket loan workable for an active investor who buys and sells.',
      },
      {
        question: 'What is the difference between a blanket loan and a portfolio loan?',
        answer:
          'A portfolio loan is any loan a lender keeps on its own books with flexible guidelines. A blanket loan is a specific structure — one loan secured by multiple properties. Many blanket loans are portfolio loans, but a portfolio loan can also be a single-property loan with flexible underwriting.',
      },
    ],
    relatedCalculators: [
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
      { label: 'Rental Cash Flow Calculator', href: '/calculators/rental-cashflow' },
    ],
    relatedTypes: ['mezzanine-financing'],
    relatedGuides: [
      { label: 'Portfolio lenders', href: '/lenders/portfolio-loans' },
      { label: 'DSCR lenders', href: '/lenders/dscr-loans' },
    ],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', financedCount: '10plus', entity: 'llc' },
  },

  // ── Gap funding — 60/mo, KD 0, $7 CPC ───────────────────────────────────────
  {
    slug: 'gap-funding',
    shortLabel: 'Gap funding',
    name: 'Gap Funding',
    metaTitle: 'Gap Funding in Real Estate: Covering the Down-Payment Gap',
    metaDescription:
      'Gap funding covers the difference between what your primary loan funds and the total cash a deal needs. How investors use it on flips and BRRRRs, what it costs, and the risks.',
    targetKeyword: 'gap funding real estate',
    h1: 'Gap Funding: Covering the Cash a Loan Leaves Behind',
    intro:
      'Gap funding is secondary capital that covers the difference between what your main loan provides and the total cash a deal actually requires — the down payment, the points, the holding costs, the rehab overage. For a flipper or BRRRR investor who has found a great deal but is short the last slice of cash, gap funding is what gets them to the closing table.',
    definition:
      'Gap funding is short-term secondary financing that covers the shortfall between a project’s primary loan and the total capital needed — typically the down payment and costs a hard-money or rehab loan does not fund.',
    bestFor: [
      'Fix-and-flip investors short on down-payment cash',
      'BRRRR investors stretching into more deals at once',
      'Borrowers whose hard-money loan leaves a cash gap',
      'Experienced investors with a strong deal but limited liquidity',
    ],
    sections: [
      {
        heading: 'What “the gap” actually is',
        paragraphs: [
          'A hard-money or fix-and-flip loan rarely funds 100% of a deal. It might cover, say, 85–90% of the purchase and most of the rehab — leaving the borrower to bring the down payment, the points, closing costs, and a cushion for overruns out of pocket. That remaining out-of-pocket requirement is the gap. Gap funding is the capital that covers it, usually from a private lender or a gap-funding specialist.',
          'Because it sits behind the primary loan and the primary lender, gap funding is high-risk capital and is priced accordingly — often as a high interest rate, a flat fee, a share of the deal’s profit, or some combination. It is short-term money meant to be repaid when the flip sells or the BRRRR refinances.',
        ],
      },
      {
        heading: 'Use it carefully — it is the most expensive slice',
        paragraphs: [
          'Gap funding lets you do a deal you couldn’t otherwise afford, and lets you spread limited cash across more deals at once. The flip side is that you are financing nearly the entire deal with borrowed money, which magnifies both returns and risk. If the project runs over budget or the exit slips, the gap lender’s cost compounds the squeeze.',
          'Treat gap funding as a tool for a genuinely strong deal with a healthy margin and a clear, fast exit — not as a way to force a thin deal to pencil. Run the numbers with the cost of the gap capital included before you commit.',
        ],
      },
    ],
    pros: [
      'Lets you close a deal you’re short the cash to fund',
      'Spreads limited capital across more simultaneous deals',
      'Fast and flexible — usually private, lightly underwritten',
      'Short-term — repaid at sale or refinance',
    ],
    cons: [
      'The most expensive capital in the stack',
      'Near-100% leverage magnifies downside risk',
      'Profit shares or high fees eat into the margin',
      'Subordinate position makes it hard to find and costly',
    ],
    faqs: [
      {
        question: 'How is gap funding different from a hard money loan?',
        answer:
          'A hard money loan is the primary loan that funds most of the purchase and rehab. Gap funding is secondary capital that covers what the hard money loan leaves out — the down payment and costs. Gap funding sits behind the hard money loan in priority and is therefore riskier and more expensive.',
      },
      {
        question: 'What does gap funding cost?',
        answer:
          'It varies widely because it is private, high-risk capital — often a high interest rate, a flat fee, or a share of the deal’s profit, sometimes a blend. Because it is the priciest money in the deal, only use it on a project whose margin can absorb the cost.',
      },
    ],
    relatedCalculators: [
      { label: 'Fix & Flip Profit', href: '/calculators/fix-flip' },
      { label: 'BRRRR Calculator', href: '/calculators/brrrr' },
    ],
    relatedTypes: ['mezzanine-financing', 'partnerships-jv'],
    relatedGuides: [
      { label: 'Hard money lenders', href: '/lenders/hard-money-loans' },
      { label: 'Private money lenders', href: '/lenders/private-money-loans' },
    ],
    matcherProfile: { dealType: 'flip', exit: 'sell-after-rehab', cash: 'under-25k', timeline: 'urgent' },
  },

  // ── Creative financing hub — 350/mo "creative financing real estate", KD 1 ──
  {
    slug: 'creative-financing',
    shortLabel: 'Creative financing',
    name: 'Creative Financing',
    metaTitle: 'Creative Financing in Real Estate: Every Method Explained',
    metaDescription:
      'Creative financing in real estate — seller financing, subject-to, lease options, wraparounds, partnerships, and more. What each method is, when to use it, and how to choose.',
    targetKeyword: 'creative financing real estate',
    h1: 'Creative Financing in Real Estate',
    intro:
      'Creative financing is the umbrella term for funding a real estate deal without a conventional bank loan — using the seller, a partner, existing equity, or an alternative structure instead. Investors reach for it when the bank says no, when cash is tight, or when a non-standard structure simply makes a better deal. This is the map of every major creative method and how to choose between them.',
    definition:
      'Creative financing refers to any method of funding a real estate purchase outside conventional institutional mortgages — including seller financing, subject-to, lease options, wraparound mortgages, partnerships, and tapping existing equity.',
    bestFor: [
      'Buyers who can’t or don’t want to qualify with a bank',
      'Low-cash investors structuring no-money-down deals',
      'Investors facing a motivated, flexible seller',
      'Anyone whose deal doesn’t fit a standard loan box',
    ],
    sections: [
      {
        heading: 'When creative financing makes sense',
        paragraphs: [
          'Creative financing is not a free lunch — every method shifts cost or risk somewhere rather than eliminating it. But there are clear situations where it beats a bank loan: your credit or income documents are a hurdle, you’re short on cash for a down payment, you’ve hit the conventional ten-property cap, or the seller’s motivation opens terms a lender never would. The trade for that flexibility is more complexity and, usually, more legal nuance — so go in with eyes open and professionals involved.',
        ],
      },
      {
        heading: 'The main creative financing methods',
        paragraphs: [
          'Seller financing: the seller becomes your lender and carries a note — no bank, fully negotiable terms. Subject-to: you take over the seller’s existing mortgage and keep it in place, inheriting its (often low) rate. Wraparound mortgage: seller financing layered over the seller’s existing loan, so they earn the rate spread. Each leans on a cooperative seller.',
          'Lease option: control a property and lock a price now with a lease plus the right to buy later, with little cash down. Partnerships and JV: pair your deal and work with a partner’s capital and split the returns. Tapping equity: a HELOC or cash-out refinance on a property you already own funds the next down payment. For wholesalers, transactional funding covers a same-day double close. Use the related guides below for the full breakdown of each, and the matcher to see which fit your deal.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          'Start with what the deal and your situation actually allow. If you have equity elsewhere, tapping it is usually the cheapest creative path. If the seller is motivated, seller financing or subject-to are the most powerful. If you’re short on cash but have a strong deal, a partner or gap funding can close it. If you want control without committing to buy yet, a lease option fits. The Financing Matcher weighs your credit, cash, income docs, and deal type and ranks both the institutional and creative options for you.',
        ],
      },
    ],
    pros: [
      'Funds deals conventional lenders would reject',
      'Often low- or no-money-down',
      'Terms are negotiable, not dictated by a lender box',
      'Speed — no bank underwriting timeline',
    ],
    cons: [
      'More complex, with real legal nuance per method',
      'Usually depends on a willing, motivated counterparty',
      'Shifts cost or risk rather than removing it',
      'Easier to get into a bad deal without a lender’s guardrails',
    ],
    faqs: [
      {
        question: 'What is the most common creative financing method?',
        answer:
          'Seller financing and its cousins (subject-to and wraparound mortgages) are the most widely used, because they only require a willing seller. Tapping existing equity through a HELOC or cash-out refinance is also extremely common among investors who already own property.',
      },
      {
        question: 'Is creative financing legal?',
        answer:
          'Yes. The individual methods — seller financing, subject-to, lease options, partnerships — are all legal, though several implicate specific rules (due-on-sale clauses, securities law for syndications, lending rules for owner-occupant buyers). Always structure creative deals through a real-estate attorney.',
      },
      {
        question: 'Can a beginner use creative financing?',
        answer:
          'Yes, but it rewards homework. The simplest entry points are house-hacking and tapping equity you already have. Seller-side methods (seller financing, subject-to) are very accessible when you find a motivated seller, but learn the structure and use professionals before you sign.',
      },
    ],
    relatedCalculators: [
      { label: 'Investment Property HELOC', href: '/calculators/heloc' },
      { label: 'Mortgage / Payment Calculator', href: '/calculators/mortgage' },
    ],
    relatedTypes: ['seller-financing', 'subject-to', 'lease-option', 'wraparound-mortgage', 'partnerships-jv'],
    relatedGuides: [
      { label: 'Complete Financing Guide', href: '/financing' },
      { label: 'Financing Matcher', href: '/financing/matcher' },
    ],
    matcherProfile: { dealType: 'turnkey-rental', exit: 'hold', cash: 'under-25k', income: 'no-doc' },
  },
]

export function getFinancingTypeBySlug(slug: string): FinancingType | undefined {
  return financingTypes.find((t) => t.slug === slug)
}
