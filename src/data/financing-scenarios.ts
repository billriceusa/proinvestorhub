/**
 * Programmatic "how to finance X" scenario pages.
 *
 * Each scenario pre-sets the Financing Matcher to a deal profile and adds
 * unique educational copy, so the page answers a specific decision query
 * ("how to finance a flip / a BRRRR / with no money down") AND drops the
 * reader straight into the interactive recommendation. Riding the same
 * decision engine as /financing/matcher — these are real, hand-written pages,
 * not templated boilerplate.
 */

import type { DealProfile } from './financing-matcher'

export type FinancingScenario = {
  slug: string
  shortLabel: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string
  profile: DealProfile
  body: Array<{ heading: string; paragraphs: string[] }>
  faqs: Array<{ question: string; answer: string }>
}

export const financingScenarios: FinancingScenario[] = [
  {
    slug: 'a-rental-property',
    shortLabel: 'A rental property',
    h1: 'How to Finance a Rental Property',
    metaTitle: 'How to Finance a Rental Property: Loan Options Compared',
    metaDescription:
      'The financing options for a buy-and-hold rental — conventional, DSCR, portfolio, and bank-statement loans — compared by who they fit, then matched to your exact situation. Free, no sign-up.',
    intro:
      'For a turnkey buy-and-hold, the right loan usually comes down to how you document income and how many properties you already own. Here are the options, then a match to your specific situation.',
    profile: { dealType: 'turnkey-rental', exit: 'hold', condition: 'turnkey' },
    body: [
      {
        heading: 'The main paths for a buy-and-hold rental',
        paragraphs: [
          'If you have documented W-2 or tax-return income and are still building your first ten properties, a conventional investment loan gives you the lowest rate available. The trade-offs are full income documentation and the ten-financed-property cap that Fannie and Freddie impose.',
          'If you are self-employed, scaling past that cap, or simply want to qualify on the property rather than your personal income, a DSCR loan is the workhorse of buy-and-hold investing. It qualifies on the rent the property produces, closes in an LLC, and has no limit on the number of financed properties — at a rate roughly one to two points above conventional.',
          'Portfolio and bank-statement loans fill the gaps: portfolio loans (often blanket loans across several properties) when you have a banking relationship or non-conforming property, and bank-statement loans when your tax returns understate your real income.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          'Start with the cheapest money you qualify for and work outward. Conventional first if your income documents and property count allow it; DSCR when they do not; portfolio or bank-statement when your situation is unusual. The matcher above weighs your credit, income docs, entity, and portfolio size to rank these for your exact deal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What credit score do I need to finance a rental property?',
        answer:
          'Conventional investment loans generally want 680+, while DSCR loans start around 620–680. Lower scores push you toward DSCR, portfolio, or private money, usually at a higher rate and a lower loan-to-value.',
      },
      {
        question: 'How much down payment is required for a rental property?',
        answer:
          'Plan on 15–25% down for a single-family investment property with conventional or DSCR financing, and around 25% for 2–4 units. If you live in one unit, owner-occupied financing can drop that to as little as 3.5%.',
      },
    ],
  },
  {
    slug: 'a-flip',
    shortLabel: 'A fix & flip',
    h1: 'How to Finance a Fix-and-Flip',
    metaTitle: 'How to Finance a Fix-and-Flip: Hard Money & Flip Loans',
    metaDescription:
      'How to fund a flip: hard money, fix-and-flip, private money, and bridge loans compared on speed, leverage, and cost — then matched to your deal. Free, no sign-up.',
    intro:
      'A flip needs fast, short-term money that funds the rehab and forgives a thin credit file — and that exits before the interest eats your margin. Here is how flippers fund deals.',
    profile: { dealType: 'flip', exit: 'sell-after-rehab', condition: 'heavy-rehab', timeline: 'urgent' },
    body: [
      {
        heading: 'Short-term money is the whole game',
        paragraphs: [
          'Flips are financed with short-term, asset-based loans — hard money and purpose-built fix-and-flip loans — that underwrite the deal (purchase price, rehab budget, and after-repair value) rather than your personal income. They close in days, fund both the purchase and the rehab in draws, and run six to twenty-four months.',
          'The cost is real: rates in the low-to-mid teens plus two to four points. That is fine against a healthy flip margin over a six-month timeline, but it makes a long-term loan the wrong tool here — a thirty-year product carries prepayment penalties that punish a quick sale.',
        ],
      },
      {
        heading: 'Hard money vs. fix-and-flip vs. private money',
        paragraphs: [
          'Traditional hard money comes from smaller private lenders and flexes on unusual deals. Purpose-built fix-and-flip lenders are larger, tech-enabled shops offering higher leverage (up to 90% of purchase and 100% of rehab) and volume pricing for repeat borrowers. Private money — an individual lending their own capital — is the most flexible of all when you have the relationship.',
          'Whichever you use, have your exit nailed down before you close. Build a timeline buffer and a backup plan (sell at a discount, or refinance into a DSCR loan and rent it) so a slow rehab does not trap you past the loan term.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I finance a flip with no experience?',
        answer:
          'Yes, but first-time flippers get lower leverage (often 75–80% instead of 90%) and slightly higher rates. A strong credit score, a detailed scope of work, and a realistic ARV analysis help compensate.',
      },
      {
        question: 'Do flip lenders fund the rehab?',
        answer:
          'Most do, holding the rehab budget in escrow and releasing it in draws as work is inspected and completed. The combined purchase-plus-rehab loan is typically capped at 65–75% of the after-repair value.',
      },
    ],
  },
  {
    slug: 'a-brrrr-deal',
    shortLabel: 'A BRRRR deal',
    h1: 'How to Finance a BRRRR Deal',
    metaTitle: 'How to Finance a BRRRR: The Two-Loan (or One-Loan) Strategy',
    metaDescription:
      'BRRRR financing is a chain: short-term money to buy and rehab, then a DSCR refinance to pull your capital back out. See both paths and match yours. Free, no sign-up.',
    intro:
      'BRRRR is a financing chain, not a single loan. You buy and rehab with short-term money, then refinance into a long-term loan that returns your capital so you can repeat. Here is how to structure it.',
    profile: { dealType: 'value-add-brrrr', exit: 'refi-hold', condition: 'heavy-rehab' },
    body: [
      {
        heading: 'The two-step chain',
        paragraphs: [
          'Step one is acquisition and rehab, funded by hard money, a fix-and-flip loan, or a bridge loan — short-term, asset-based money that can take on a distressed property the long-term lenders will not touch yet.',
          'Step two is the refinance. Once the property is renovated, rented, and stabilized, you refinance into a thirty-year DSCR loan based on the new appraised value. If you have forced enough equity, the cash-out covers your original investment and you walk away with little or none of your own money left in the deal.',
        ],
      },
      {
        heading: 'The one-loan shortcut',
        paragraphs: [
          'A fix-and-rent (bridge-to-permanent) loan combines both steps into a single closing: it funds the purchase and rehab, then automatically converts to a thirty-year DSCR loan once the property is leased. That eliminates a second set of closing costs and the refinance-timing risk — which is why it is often the single best fit for a BRRRR. The matcher above will rank it against the separate-loan path for your deal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best loan for the refinance step of a BRRRR?',
        answer:
          'A DSCR loan is the standard BRRRR refinance — it qualifies on the property’s rent, closes in an LLC, and has no property-count cap, so it works no matter how many doors you already own.',
      },
      {
        question: 'How soon can I refinance after rehabbing a BRRRR?',
        answer:
          'Many DSCR lenders allow a cash-out refinance on the new appraised value after a short seasoning period (often three to six months), rather than making you wait a year. Confirm the seasoning rule with the lender before you plan your timeline.',
      },
    ],
  },
  {
    slug: 'an-airbnb',
    shortLabel: 'An Airbnb / STR',
    h1: 'How to Finance an Airbnb or Short-Term Rental',
    metaTitle: 'How to Finance an Airbnb / Short-Term Rental Property',
    metaDescription:
      'Financing a short-term rental: which DSCR and conventional lenders accept Airbnb income, and how to qualify. Matched to your deal. Free, no sign-up.',
    intro:
      'Short-term rentals are financed much like long-term rentals — the wrinkle is getting the lender to credit your projected Airbnb income. Here is how STR investors fund deals.',
    profile: { dealType: 'short-term-rental', exit: 'hold', condition: 'turnkey' },
    body: [
      {
        heading: 'The income question is everything',
        paragraphs: [
          'The financing itself looks familiar — conventional, DSCR, or bank-statement loans. What differs is how the lender treats short-term-rental income. A growing number of DSCR lenders run STR-specific programs that qualify the deal using projected nightly revenue (often via AirDNA or comparable market data) instead of a traditional twelve-month lease.',
          'Not every lender offers this, so look specifically for those advertising STR or Airbnb DSCR programs. If you have strong personal income, a conventional loan still gives you the lowest rate; if you do not, an STR-friendly DSCR loan is usually the path.',
        ],
      },
      {
        heading: 'Watch the local rules',
        paragraphs: [
          'Lenders increasingly check that short-term rentals are actually permitted at the address. Before you bank on STR income to qualify, confirm the city or county allows it — a regulatory ban can sink both the deal and the financing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I use a DSCR loan for an Airbnb?',
        answer:
          'Yes — many DSCR lenders now accept short-term-rental income, using platform data such as AirDNA to estimate revenue rather than a long-term lease. Look for lenders that specifically advertise STR or Airbnb DSCR programs.',
      },
      {
        question: 'Is it harder to finance a short-term rental than a long-term rental?',
        answer:
          'Slightly. Fewer lenders credit projected nightly income, and some require a higher down payment or reserves for STRs. Once you find an STR-friendly lender, the process mirrors a standard rental loan.',
      },
    ],
  },
  {
    slug: 'with-no-money-down',
    shortLabel: 'With no money down',
    h1: 'How to Finance Real Estate With Little or No Money Down',
    metaTitle: 'How to Finance an Investment Property With No Money Down',
    metaDescription:
      'Low- and no-money-down real estate financing: HELOCs, house-hacking, seller financing, subject-to, and partnerships — honestly explained, then matched to your deal.',
    intro:
      'Conventional and DSCR loans want 15–25% down, so "no money down" almost always means using someone else’s equity or capital. Here are the real low- and no-down paths — with their trade-offs.',
    profile: { dealType: 'turnkey-rental', exit: 'hold', cash: 'under-25k' },
    body: [
      {
        heading: 'Use equity you already have',
        paragraphs: [
          'The most common "no money down" move is funding the down payment with equity from a property you already own — a HELOC or cash-out refinance. You are still putting money down; it just is not fresh cash out of pocket. Run the numbers on the equity-unlock calculator to see how far it stretches.',
        ],
      },
      {
        heading: 'Live in it, or get creative',
        paragraphs: [
          'If you are willing to live in the property for a year, owner-occupied house-hacking with FHA (3.5% down) or VA (0% down) financing is the lowest-cost low-down path there is — buy a 2–4 unit, live in one, rent the rest.',
          'Beyond that, the no-down toolkit is creative finance: seller financing (the seller acts as the bank), subject-to (you take over the existing mortgage — mind the due-on-sale clause), and partnerships where you bring the deal and the work while a partner brings the capital. These trade simplicity for flexibility and carry real legal nuance, so go in with eyes open.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you really buy an investment property with no money down?',
        answer:
          'Rarely with zero dollars in play — but you can buy with none of your own fresh cash by using equity from another property, owner-occupied low-down loans, seller financing, subject-to, or a capital partner. Each shifts the cost or risk somewhere else rather than eliminating it.',
      },
      {
        question: 'What is the easiest low-money-down option for a first deal?',
        answer:
          'House-hacking is usually the most accessible: owner-occupied FHA or VA financing lets you buy a 2–4 unit with as little as 0–3.5% down, live in one unit, and rent the others to offset the mortgage.',
      },
    ],
  },
  {
    slug: 'in-an-llc',
    shortLabel: 'In an LLC',
    h1: 'How to Finance an Investment Property in an LLC',
    metaTitle: 'How to Finance an Investment Property in an LLC',
    metaDescription:
      'Which investment-property loans let you close in an LLC — DSCR, portfolio, and commercial — and why conventional usually does not. Matched to your deal. Free.',
    intro:
      'If you want the property titled in an LLC for liability separation, your loan options narrow — conventional generally will not, but several investor products will. Here is how to finance in an entity.',
    profile: { dealType: 'turnkey-rental', exit: 'hold', entity: 'llc' },
    body: [
      {
        heading: 'Loans built to close in an entity',
        paragraphs: [
          'DSCR loans are the most common way to close in an LLC: they qualify on the property’s income, vest title in your entity, and have no property-count cap. Portfolio loans and commercial loans likewise lend to entities, and short-term hard and private money almost always allow it.',
          'Conventional financing is the outlier. Fannie and Freddie loans generally require title in your personal name, and moving a conventionally financed property into an LLC afterward can trip the due-on-sale clause. If the LLC matters to you up front, plan around DSCR or portfolio financing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I get a conventional loan in an LLC?',
        answer:
          'Generally no — conventional Fannie/Freddie loans require title in your personal name. To close in an LLC, investors typically use DSCR, portfolio, or commercial loans.',
      },
      {
        question: 'Should I transfer a financed property into an LLC after closing?',
        answer:
          'It can trigger the mortgage’s due-on-sale clause, giving the lender the right to call the loan. Many investors finance in the LLC from the start with a DSCR loan instead. Talk to an attorney before transferring title on a financed property.',
      },
    ],
  },
  {
    slug: 'when-self-employed',
    shortLabel: 'When self-employed',
    h1: 'How to Finance an Investment Property When You’re Self-Employed',
    metaTitle: 'How to Finance a Rental When Self-Employed (No Tax Returns)',
    metaDescription:
      'Self-employed investor? DSCR and bank-statement loans qualify you on the property or your deposits instead of tax returns. See your options and match your deal.',
    intro:
      'If write-offs make your tax returns understate what you really earn, conventional financing fights you. Two products are built for self-employed investors — here is how they work.',
    profile: { dealType: 'turnkey-rental', exit: 'hold', income: 'self-employed' },
    body: [
      {
        heading: 'Qualify on the property, or on your deposits',
        paragraphs: [
          'A DSCR loan ignores your personal income entirely and qualifies on whether the property’s rent covers the payment. For a self-employed investor that sidesteps the whole tax-return problem — and it closes in an LLC with no property-count cap.',
          'A bank-statement loan is the alternative when you want a more traditional structure: instead of tax returns, the lender averages twelve to twenty-four months of bank deposits to calculate your income. Both carry a rate premium over conventional, but they approve deals a DTI-based loan would reject.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I get an investment property loan without tax returns?',
        answer:
          'Yes. DSCR loans qualify on the property’s rental income, and bank-statement loans use 12–24 months of deposits — neither requires tax returns, which is why both are popular with self-employed investors.',
      },
      {
        question: 'Which is better for a self-employed investor, DSCR or bank-statement?',
        answer:
          'DSCR is usually simpler and scales better (no income docs, no property cap), while a bank-statement loan can offer better pricing if your deposits are strong and consistent. The matcher weighs your full situation to suggest which fits.',
      },
    ],
  },
  {
    slug: 'a-multifamily-property',
    shortLabel: 'A multifamily (5+)',
    h1: 'How to Finance a Multifamily (5+ Unit) Property',
    metaTitle: 'How to Finance a Multifamily (5+ Unit) Investment Property',
    metaDescription:
      'Financing 5+ unit multifamily: agency/commercial debt, bridge loans for value-add, and SBA for owner-occupied. Compared and matched to your deal. Free, no sign-up.',
    intro:
      'At five units the loan crosses from residential into commercial, and underwriting shifts from your income to the property’s. Here is how multifamily deals get financed.',
    profile: { dealType: 'multifamily-5plus', exit: 'hold' },
    body: [
      {
        heading: 'Commercial underwriting takes over at five units',
        paragraphs: [
          'Properties with five or more units are commercial loans, underwritten on the asset — cap rate, net operating income, occupancy, and market comps — rather than your personal debt-to-income. The gold standard for stabilized multifamily is agency debt: Fannie Mae and Freddie Mac Small Balance Loans offer the best rates and longest terms.',
          'For a value-add acquisition that does not yet qualify for permanent agency debt, a bridge loan funds the purchase and renovation interest-only, and you refinance into agency financing once rents and occupancy are stabilized.',
        ],
      },
      {
        heading: 'The owner-occupied exception',
        paragraphs: [
          'If you will occupy a meaningful share of the building — for example a mixed-use property where you run a business — an SBA 504 or 7(a) loan can put you in with as little as 10% down at below-market rates. It requires owner-occupancy of 51%+ and a paperwork-heavy process, but the terms are hard to beat.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When does a property need a commercial loan instead of residential?',
        answer:
          'At five or more residential units, or any non-residential use. One-to-four-unit properties are financed as residential; five-plus units are commercial, with property-level underwriting and different documentation.',
      },
      {
        question: 'How much down payment is needed for multifamily?',
        answer:
          'Commercial multifamily typically wants 25–35% down. The big exception is owner-occupied deals financed with an SBA loan, which can go as low as 10% down if you occupy 51%+ of the property.',
      },
    ],
  },
]

export function getScenarioBySlug(slug: string): FinancingScenario | undefined {
  return financingScenarios.find((s) => s.slug === slug)
}
