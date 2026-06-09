/**
 * Lender seed data for the financing directory.
 * Used for static generation and as fallback when Sanity data is unavailable.
 *
 * NOTE: All rates, terms, and requirements are approximate and subject to change.
 * Investors should verify current terms directly with each lender.
 */

export type LenderData = {
  name: string
  slug: string
  website: string
  founded: number
  headquarters: string
  description: string
  loanTypeSlugs: string[]
  minRate: number
  maxRate: number
  maxLtv: number
  minCreditScore: number
  minLoanAmount: number
  maxLoanAmount: number
  originationFee: string
  speedToClose: string
  nationwide: boolean
  propertyTypes: string[]
  experienceRequired: string
  allowsLlc: boolean
  interestOnlyAvailable: boolean
  prepaymentPenalty: string
  foreignNational: boolean
  bestForTags: string[]
  pros: string[]
  cons: string[]
  editorRating: number
  featured: boolean
  editorSummary: string
  /**
   * Optional long-form editorial review, rendered as a "Full Review" section
   * below the Editor's Take. Plain paragraphs separated by blank lines. Adds
   * depth + word count for branded "<lender> review" queries. Fill on the
   * lenders that draw search demand first; pages without it render unchanged.
   */
  editorReview?: string
  metaTitle: string
  metaDescription: string
}

export const lenders: LenderData[] = [
  // ── DSCR & Multi-Product Lenders ────────────────────
  {
    name: 'Kiavi',
    slug: 'kiavi',
    website: 'https://www.kiavi.com',
    founded: 2013,
    headquarters: 'San Francisco, CA',
    description:
      'Kiavi (formerly LendingHome) is one of the largest tech-enabled lenders for real estate investors, offering fix-and-flip and DSCR rental loans with a fully digital platform. Known for fast closings and competitive pricing for experienced investors.',
    loanTypeSlugs: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans', 'fix-and-rent-loans'],
    minRate: 6.5,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 640,
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
    originationFee: '1–2 points',
    speedToClose: '10–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-2-1 step-down (DSCR)',
    foreignNational: false,
    bestForTags: ['Volume flippers', 'BRRRR investors', 'Tech-savvy borrowers', 'First-time investors'],
    pros: [
      'Fully digital platform — apply to close online',
      'Competitive rates for experienced borrowers (volume discounts)',
      'Bridge-to-DSCR conversion available (one-loan BRRRR)',
      'Fast closings for repeat borrowers (10–14 days on flips)',
      'No experience required for DSCR loans',
    ],
    cons: [
      'Limited to 1-4 unit residential (no multifamily or commercial)',
      'No foreign national programs',
      'Minimum loan $100K (excludes low-cost markets)',
      'DSCR prepayment penalty (3-2-1)',
    ],
    editorRating: 4.5,
    featured: true,
    editorSummary:
      'Kiavi is the best all-around platform for investors who want to do both flips and rentals with one lender. Their tech stack is best-in-class — the online portal makes draw requests, document uploads, and closings genuinely easy. Volume borrowers get meaningfully better pricing. If you\'re doing 3+ deals per year across flips and DSCR holds, Kiavi should be your primary lending relationship.',
    editorReview: `Kiavi is one of the largest private lenders to residential real estate investors in the country, and it has been at this longer than the name suggests. It launched in 2013 as LendingHome, co-founded by entrepreneurs Matt Humphrey and James Herbert with the idea of using technology to make investor lending faster than the bank process they'd found painfully slow. In November 2021 it rebranded to Kiavi — a play on "chiave," the Italian word for key — and Arvind Mohan, a long-time operator who'd been COO since 2020, took over as CEO in early 2023.

The scale is the headline: Kiavi reports having funded more than $22 billion in loans, and its bread and butter is exactly what active investors need — fix-and-flip and bridge financing for the buy-rehab phase, plus DSCR loans for the long-term hold. If you run the BRRRR playbook, you can stay under one roof from acquisition through refinance, which is rare on this list.

What you're buying with Kiavi is technology and repeatability: a slick online platform, fast pre-approvals, and a lender that does enough volume to be predictable deal after deal. The trade-off is that it's a high-volume operation rather than a boutique — great for a standardized flip or rental, less so if your deal needs a lot of hand-holding. Confirm current rates and terms for your scenario before you commit.`,
    metaTitle: 'Kiavi Review 2026: DSCR & Fix-and-Flip Loans | ProInvestorHub',
    metaDescription:
      'In-depth Kiavi review for real estate investors. Rates, LTV, closing speed, pros & cons for DSCR and fix-and-flip loans. Expert analysis from a 30-year lending veteran.',
  },
  {
    name: 'Lima One Capital',
    slug: 'lima-one-capital',
    website: 'https://www.limaone.com',
    founded: 2010,
    headquarters: 'Greenville, SC',
    description:
      'Lima One Capital is a full-service investment property lender offering fix-and-flip, bridge, rental (DSCR), construction, and multifamily loans. Known for broad product range and willingness to work with newer investors.',
    loanTypeSlugs: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans', 'construction-loans', 'fix-and-rent-loans'],
    minRate: 7.0,
    maxRate: 12.5,
    maxLtv: 80,
    minCreditScore: 660,
    minLoanAmount: 75000,
    maxLoanAmount: 5000000,
    originationFee: '1.5–3 points',
    speedToClose: '14–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use', 'condo', 'townhouse', 'new-construction'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-2-1 step-down (DSCR)',
    foreignNational: true,
    bestForTags: ['New investors', 'BRRRR strategy', 'Construction projects', 'Multifamily investors'],
    pros: [
      'Broadest product range — flips, DSCR, construction, and multifamily',
      'Works with first-time investors',
      'Ground-up construction financing available',
      'Foreign national programs',
      'Multifamily up to 5+ units',
    ],
    cons: [
      'Slightly higher rates than Kiavi for experienced borrowers',
      'Origination fees on the higher end (1.5–3 points)',
      'Draw process for construction can be slow',
    ],
    editorRating: 4.3,
    featured: true,
    editorSummary:
      'Lima One is the best choice for investors who want one lender relationship across every product type. If you\'re doing BRRRR, flips, ground-up construction, and multifamily — Lima One can handle all of it. They\'re also one of the more welcoming lenders for first-time investors, and their foreign national program opens doors for international investors. Rates aren\'t quite as aggressive as Kiavi for volume borrowers, but the breadth of products compensates.',
    editorReview: `Lima One Capital has one of the better origin stories in this space. It was founded in 2010 in Greenville, South Carolina by two U.S. Marine Corps veterans, John Warren and John Thompson, who served together in Iraq — the company is named after their "Lima One" Marine call sign. They came home, got into real estate, and built a lender for investors. That veteran-founded identity is still part of the brand.

The company has since grown into an institution. In 2021, MFA Financial (NYSE: MFA), a publicly traded mortgage REIT, completed its acquisition of Lima One, which now operates as an MFA subsidiary while keeping its Greenville headquarters. Lima One reports having funded well over $10 billion across tens of thousands of loans.

For investors, the draw is breadth: Lima One is a genuine full-service shop, covering DSCR rental loans, fix-and-flip, bridge, new construction, and multifamily — so you can grow from a single rental into a portfolio without changing lenders. That institutional backing means deep capital and staying power, with the usual trade-off that a larger, process-driven lender is less flexible than a local hard-money contact. Verify current pricing for your specific loan type before applying.`,
    metaTitle: 'Lima One Capital Review 2026: Full-Service Investor Lender | ProInvestorHub',
    metaDescription:
      'Lima One Capital review for real estate investors. DSCR, flip, construction, and multifamily loans. Rates, requirements, pros & cons. Expert analysis.',
  },
  {
    name: 'RCN Capital',
    slug: 'rcn-capital',
    website: 'https://www.rcncapital.com',
    founded: 2010,
    headquarters: 'South Windsor, CT',
    description:
      'RCN Capital is a national lender specializing in fix-and-flip, bridge, and long-term rental (DSCR) loans for real estate investors. Known for competitive rates on DSCR products and a straightforward closing process.',
    loanTypeSlugs: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans'],
    minRate: 6.5,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 620,
    minLoanAmount: 75000,
    maxLoanAmount: 2500000,
    originationFee: '1.5–3 points',
    speedToClose: '14–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-2-1 or 5-4-3-2-1 (DSCR)',
    foreignNational: true,
    bestForTags: ['DSCR investors', 'Low credit score borrowers', 'First-time investors', 'Foreign nationals'],
    pros: [
      'Low minimum credit score (620 for DSCR)',
      'Competitive DSCR rates',
      'Foreign national programs available',
      'Works with first-time investors',
      'Small multifamily eligible',
    ],
    cons: [
      'Higher origination fees than some competitors',
      'Longer prepayment penalties on some DSCR products',
      'Less technology-driven than Kiavi',
    ],
    editorRating: 4.1,
    featured: false,
    editorSummary:
      'RCN Capital stands out for accessibility — their 620 minimum credit score for DSCR loans is among the lowest in the industry, making them a strong option for investors with less-than-perfect credit. They also offer foreign national programs. If you\'re turned down by lenders with 680+ credit requirements, RCN should be your next call.',
    editorReview: `RCN Capital started, fittingly, as "Rehab Cash Now." It was founded in 2010 in South Windsor, Connecticut by Don Vaccaro — better known as the founder of TicketNetwork — who saw an opening in private lending after the 2008 crisis, when traditional banks pulled back hard from real estate. Jeff Tesch, who joined at the founding as managing director, has run the company as CEO since 2019; Vaccaro remains on the board.

Fifteen years in, RCN has become one of the more established names in business-purpose lending, reporting more than $8 billion funded across tens of thousands of loans. It lends both directly and through brokers and correspondents, which is part of how it has built that volume.

For an investor, RCN's strength is range and tenure: DSCR rental loans, fix-and-flip, and bridge financing from a lender that has been doing this through multiple market cycles. That track record is reassuring, and the multi-channel model means a broker can often place your deal there. As always, confirm the current rate sheet and fees for your loan type — a lender this size prices to the scenario.`,
    metaTitle: 'RCN Capital Review 2026: DSCR & Bridge Loans | ProInvestorHub',
    metaDescription:
      'RCN Capital review for real estate investors. Low credit score DSCR programs, flip loans, and bridge financing. Rates, requirements, and expert analysis.',
  },
  {
    name: 'Visio Lending',
    slug: 'visio-lending',
    website: 'https://www.visiolending.com',
    founded: 2012,
    headquarters: 'Austin, TX',
    description:
      'Visio Lending specializes exclusively in long-term DSCR rental loans. As a pure DSCR shop, they\'ve built deep expertise in rental property lending with competitive rates and efficient processing.',
    loanTypeSlugs: ['dscr-loans'],
    minRate: 6.5,
    maxRate: 8.5,
    maxLtv: 80,
    minCreditScore: 680,
    minLoanAmount: 75000,
    maxLoanAmount: 2000000,
    originationFee: '1–2 points',
    speedToClose: '21–30 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '5-4-3-2-1 step-down',
    foreignNational: false,
    bestForTags: ['Buy-and-hold investors', 'Portfolio builders', 'DSCR specialists'],
    pros: [
      'DSCR specialist — deep product knowledge',
      'Competitive rates for 30-year DSCR',
      'Consistent underwriting process',
      'Interest-only options available',
      'Multifamily (2-8 units) eligible',
    ],
    cons: [
      'DSCR only — no flip or bridge products',
      'Longer closing times than fix-and-flip lenders',
      'Longer prepayment penalty period (5 years)',
      'Higher credit requirement (680+) than some competitors',
    ],
    editorRating: 4.2,
    featured: false,
    editorSummary:
      'Visio Lending is the right choice if DSCR is all you need and you want a lender that does one thing well. As a pure DSCR shop, their underwriting team knows rental property lending inside and out. They\'re particularly strong for portfolio builders who need consistent, reliable closings on buy-and-hold acquisitions. The 5-year prepayment penalty is the main drawback — make sure you plan to hold.',
    editorReview: `Visio Lending is a rental-loan specialist, and it has the pedigree to back the claim: founded in 2012 in Austin, Texas by Jeff Ball and Matt Matza, it was one of the first lenders in the country to build its business specifically around DSCR loans for single-family rental properties. While other lenders bolted DSCR on as one product among many, Visio made it the whole company.

That focus shows up in the numbers. Visio reports having originated more than $4 billion across 40-plus states, and Scotsman Guide ranked it the No. 1 DSCR loan provider in the U.S. by 2024 volume. The founders, Ball and Matza, retired in January 2025, handing the CEO role to Jenny Coupland — a transition worth noting, though the company's DSCR-first strategy has stayed intact.

For a buy-and-hold investor, the appeal is exactly that specialization: Visio does one thing — long-term rental financing qualified on the property's cash flow — and does it at scale. If you want a fix-and-flip or bridge loan, you'll look elsewhere; for a 30-year rental loan, it's one of the most established options on this list. Confirm current rates and LTV for your market before you apply.`,
    metaTitle: 'Visio Lending Review 2026: DSCR Loan Specialist | ProInvestorHub',
    metaDescription:
      'Visio Lending review for rental property investors. DSCR-only specialist with competitive rates and consistent closings. Expert analysis from a lending veteran.',
  },
  {
    name: 'New Silver',
    slug: 'new-silver',
    website: 'https://www.newsilver.com',
    founded: 2018,
    headquarters: 'New York, NY',
    description:
      'New Silver is a technology-first hard money and DSCR lender that emphasizes speed, offering instant term sheets and same-day pre-approvals. A strong option for fix-and-flip investors who need certainty and speed.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'dscr-loans', 'bridge-loans'],
    minRate: 7.5,
    maxRate: 13.0,
    maxLtv: 80,
    minCreditScore: 650,
    minLoanAmount: 100000,
    maxLoanAmount: 5000000,
    originationFee: '1.5–2.5 points',
    speedToClose: '5–10 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'None (flip) / 3-year (DSCR)',
    foreignNational: false,
    bestForTags: ['Speed-focused investors', 'Auction buyers', 'Tech-savvy borrowers', 'First-time flippers'],
    pros: [
      'Instant term sheets — know your terms immediately',
      'Fastest closings in the industry (5 days possible)',
      'Same-day pre-approval',
      'Modern tech platform with easy draw requests',
      'Competitive rates for hard money',
    ],
    cons: [
      'Higher minimum loan ($100K)',
      'Newer company — less track record than established players',
      'Limited to 1-4 unit residential for some products',
    ],
    editorRating: 4.0,
    featured: false,
    editorSummary:
      'New Silver\'s speed is their competitive advantage. If you\'re buying at auction with a 7-day close window, or competing against cash offers and need a fast pre-approval letter, New Silver delivers. Their instant term sheet tool is genuinely useful — you know exactly what you\'re getting before you submit an offer. Good for experienced investors who value speed and technology.',
    editorReview: `New Silver is the fintech of the group. It was founded in 2018 in West Hartford, Connecticut by Kirill Bensonoff and Alex Shvayetsky, and it didn't start as a lender at all — it began as software that could value a property as-is and as-renovated and issue preliminary terms almost instantly, then pivoted into doing the lending itself. That software DNA is still the pitch: online pre-approval in minutes, with no hard credit pull to get a conditional number.

It also has a genuinely unusual chapter in its history — in 2021 New Silver completed one of the first securitizations of real-estate loans using blockchain/DeFi infrastructure, partnering with Centrifuge and MakerDAO. It's a small, tech-forward shop rather than a balance-sheet giant; the company reports having closed more than $300 million in loans across roughly 40 states.

For investors, New Silver fits the borrower who values speed and a slick digital process — fast hard money for flips plus DSCR loans for holds. The trade-off is scale and track record: it's younger and leaner than a Kiavi or Lima One. If a fast online quote and quick close matter more to you than working with a large institution, it's worth a look. Verify the final terms before you rely on the instant estimate.`,
    metaTitle: 'New Silver Review 2026: Fast Hard Money & DSCR | ProInvestorHub',
    metaDescription:
      'New Silver review for real estate investors. Fastest hard money closings (5 days), instant term sheets, DSCR loans. Rates, pros & cons, expert analysis.',
  },
  {
    name: 'Angel Oak Mortgage Solutions',
    slug: 'angel-oak',
    website: 'https://www.angeloakms.com',
    founded: 2013,
    headquarters: 'Atlanta, GA',
    description:
      'Angel Oak Mortgage Solutions is a leading non-QM lender offering DSCR, bank statement, and investor cash flow loans. One of the largest non-QM originators in the country with a wide broker network.',
    loanTypeSlugs: ['dscr-loans', 'bank-statement-loans'],
    minRate: 6.5,
    maxRate: 9.0,
    maxLtv: 80,
    minCreditScore: 660,
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
    originationFee: '0–2 points',
    speedToClose: '21–30 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down (DSCR)',
    foreignNational: true,
    bestForTags: ['Self-employed investors', 'Bank statement borrowers', 'DSCR investors', 'Foreign nationals'],
    pros: [
      'Strong bank statement loan programs',
      'DSCR and investor cash flow products',
      'Large, established non-QM lender',
      'Foreign national programs',
      'Wide broker network — available through many mortgage brokers',
    ],
    cons: [
      'Works through brokers (not direct-to-consumer for many products)',
      'Slower closings than fintech lenders',
      'Higher minimum credit score than some DSCR competitors',
    ],
    editorRating: 4.1,
    featured: false,
    editorSummary:
      'Angel Oak is the top choice for self-employed investors who need bank statement loans. As one of the largest non-QM lenders in the country, they have deep expertise in alternative documentation. If your tax returns don\'t reflect your real income and you need a bank statement product for an investment property, Angel Oak should be at the top of your list. Work with a mortgage broker who specializes in non-QM to access their products.',
    editorReview: `Angel Oak Mortgage Solutions is the wholesale and correspondent lending arm of Angel Oak Companies, the Atlanta-based non-QM specialist co-founded in 2008 by Mike Fierman and Sreeni Prabhu. The founders came out of the structured-credit and mortgage world — Prabhu was previously chief investment officer over a $25 billion portfolio at Washington Mutual — and they built Angel Oak into one of the defining names in non-QM lending after the financial crisis.

It operates at real scale. The Angel Oak group reports having originated more than $32 billion in residential loans and issued 65-plus securitizations, and in October 2025 Brookfield Asset Management acquired a majority stake in the company, with Fierman and Prabhu staying on as co-CEOs. That capital-markets depth is the whole point: Angel Oak doesn't just originate loans, it securitizes them, which is what lets it keep non-QM programs open through changing markets.

For investors, the relevant products are bank statement loans for self-employed borrowers and DSCR loans for rentals. A quirk worth knowing: "Angel Oak" spans several affiliated entities — the wholesale lender, an asset-management arm, and a publicly traded mortgage REIT — so make sure you're dealing with the lending operation. Confirm current terms, and note that as a wholesale-leaning lender you may reach Angel Oak through a broker.`,
    metaTitle: 'Angel Oak Review 2026: DSCR & Bank Statement Loans | ProInvestorHub',
    metaDescription:
      'Angel Oak Mortgage Solutions review. DSCR and bank statement loans for self-employed real estate investors. Rates, requirements, and expert analysis.',
  },
  {
    name: 'CoreVest',
    slug: 'corevest',
    website: 'https://www.corevest.com',
    founded: 2014,
    headquarters: 'Irvine, CA',
    description:
      'CoreVest (a Redwood Trust company) specializes in rental portfolio loans and build-to-rent financing. The go-to lender for investors with 5+ rental properties who want to consolidate under one blanket loan.',
    loanTypeSlugs: ['dscr-loans', 'portfolio-loans', 'bridge-loans', 'construction-loans'],
    minRate: 6.5,
    maxRate: 10.0,
    maxLtv: 75,
    minCreditScore: 660,
    minLoanAmount: 500000,
    maxLoanAmount: 100000000,
    originationFee: '1–2 points',
    speedToClose: '21–45 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use', 'new-construction'],
    experienceRequired: 'experienced',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'Varies (yield maintenance or step-down)',
    foreignNational: false,
    bestForTags: ['Portfolio investors (5+)', 'Build-to-rent developers', 'Blanket loan seekers', 'Institutional investors'],
    pros: [
      'Blanket loans across multiple properties',
      'Portfolio-level underwriting (stronger properties offset weaker ones)',
      'Build-to-rent construction financing',
      'Large loan amounts ($100M+)',
      'Backed by Redwood Trust — well-capitalized',
    ],
    cons: [
      'High minimum loan amount ($500K)',
      'Requires 5+ deals of experience',
      'Slower closings than fintech lenders',
      'Not accessible to new investors',
    ],
    editorRating: 4.4,
    featured: true,
    editorSummary:
      'CoreVest is the lender you graduate to when you\'ve built a meaningful rental portfolio. Their blanket loan product — one loan covering 5, 10, or 50+ properties — simplifies your lending relationships and enables portfolio-level decisions. If you have 5+ rentals and want to consolidate, or if you\'re a build-to-rent developer, CoreVest is best-in-class. Not for beginners — the $500K minimum and experience requirements make this an experienced investor play.',
    editorReview: `CoreVest is the institutional heavyweight of this list, and its corporate history reflects that. The business launched in 2014 as Colony American Finance under founding CEO Beth O'Brien. In 2017, funds managed by Fortress Investment Group acquired it and rebranded it CoreVest. Then in 2019, Redwood Trust (NYSE: RWT) bought CoreVest for roughly $490 million, and it has operated as a Redwood subsidiary ever since; Fred Matera was promoted to CEO in 2024.

That ownership chain matters because it explains what CoreVest is good at. With a public mortgage REIT behind it, CoreVest specializes in the larger, more complex deals most lenders shy away from — blanket/portfolio loans across many properties, build-to-rent financing, and large multifamily and bridge loans. The company reports having closed over $25 billion across more than 170,000 units.

For a scaling investor — someone financing a portfolio of rentals at once, or a build-to-rent project — CoreVest's institutional capital and structuring experience are the draw. For a single starter rental, it's overkill; this is a lender built for investors operating at size. As with any balance-sheet lender, pricing is deal-specific, so get a written quote for your portfolio.`,
    metaTitle: 'CoreVest Review 2026: Portfolio & Build-to-Rent Loans | ProInvestorHub',
    metaDescription:
      'CoreVest review for portfolio investors. Blanket loans, build-to-rent financing, DSCR. For investors with 5+ properties. Expert analysis from a lending veteran.',
  },
  {
    name: 'Easy Street Capital',
    slug: 'easy-street-capital',
    website: 'https://www.easystreetcap.com',
    founded: 2019,
    headquarters: 'Austin, TX',
    description:
      'Easy Street Capital is a fast-growing investor lender offering DSCR, fix-and-flip, and bridge loans with an emphasis on speed and customer service. Known for competitive rates and a borrower-first approach.',
    loanTypeSlugs: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans'],
    minRate: 6.75,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 640,
    minLoanAmount: 75000,
    maxLoanAmount: 2000000,
    originationFee: '1–2 points',
    speedToClose: '10–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-2-1 step-down (DSCR)',
    foreignNational: false,
    bestForTags: ['Texas investors', 'First-time investors', 'DSCR borrowers', 'Customer service focused'],
    pros: [
      'Excellent customer service and communication',
      'Competitive DSCR and flip rates',
      'Works with first-time investors',
      'Fast closings (10–14 days for flip, 21 for DSCR)',
      'Low minimum loan amount ($75K)',
    ],
    cons: [
      'Newer company (2019) — shorter track record',
      'Smaller team — capacity may be limited during peak periods',
      'Less technology-driven than Kiavi or New Silver',
    ],
    editorRating: 4.2,
    featured: false,
    editorSummary:
      'Easy Street Capital has built a strong reputation quickly by focusing on something many fintech lenders overlook: customer service. Borrowers consistently report responsive loan officers, clear communication, and a willingness to solve problems rather than hide behind automated systems. If you value a human touch alongside competitive rates, Easy Street is worth a call.',
    metaTitle: 'Easy Street Capital Review 2026: DSCR & Flip Loans | ProInvestorHub',
    metaDescription:
      'Easy Street Capital review for real estate investors. Competitive DSCR and flip rates with outstanding customer service. Rates, requirements, expert analysis.',
  },
  {
    name: 'Groundfloor',
    slug: 'groundfloor',
    website: 'https://www.groundfloor.com',
    founded: 2013,
    headquarters: 'Atlanta, GA',
    description:
      'Groundfloor is a unique lending platform that crowdfunds fix-and-flip loans from individual investors, enabling competitive rates for borrowers. A good option for flippers looking for an alternative to traditional hard money.',
    loanTypeSlugs: ['fix-and-flip-loans', 'hard-money-loans'],
    minRate: 7.5,
    maxRate: 14.0,
    maxLtv: 75,
    minCreditScore: 600,
    minLoanAmount: 75000,
    maxLoanAmount: 1000000,
    originationFee: '2–4 points',
    speedToClose: '14–21 days',
    nationwide: false,
    propertyTypes: ['sfr', 'condo', 'townhouse'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'None',
    foreignNational: false,
    bestForTags: ['First-time flippers', 'Small loan amounts', 'No prepayment penalty'],
    pros: [
      'No prepayment penalties — sell early without penalty',
      'Works with first-time flippers',
      'Low minimum credit score (600)',
      'Transparent pricing and terms',
      'Lower minimum loan amount',
    ],
    cons: [
      'Not available in all states',
      'Higher origination fees (2–4 points)',
      'Max loan amount lower than competitors ($1M)',
      'Crowdfunding model can mean variable availability',
    ],
    editorRating: 3.8,
    featured: false,
    editorSummary:
      'Groundfloor occupies a unique niche — their crowdfunding model connects borrowers with individual investors, creating a different dynamic than institutional lenders. The main advantages are no prepayment penalties (rare for hard money) and accessibility for first-time flippers. The trade-off is higher origination fees and a lower max loan amount. Best for smaller flips where you want the flexibility to sell quickly without penalty.',
    editorReview: `Groundfloor works differently from every other lender on this list, and the difference is baked into its founding. It was started in 2013 in Raleigh — later moving to Atlanta — by Brian Dally and Nick Bhargava, the latter a co-author of the JOBS Act, the law that opened up investment crowdfunding. In 2015 Groundfloor became the first company the SEC qualified (under Regulation A+) to offer real-estate debt investments to everyday, non-accredited investors.

That's the model: instead of funding loans off a Wall Street credit line, Groundfloor raises the capital from thousands of retail investors who buy into the loans for yield. By its tenth anniversary in 2023, the company reported surpassing $1 billion in total retail investment volume. So the same platform serves two audiences — flippers who need short-term capital, and small investors who want to lend it.

For a borrower, Groundfloor is a source of fix-and-flip and short-term renovation financing with a tech-forward, transparent process. The crowdfunded model can mean a different rhythm than a balance-sheet lender, and pricing should be compared head-to-head with the hard-money options here. Confirm current rates and terms for your project before committing.`,
    metaTitle: 'Groundfloor Review 2026: Crowdfunded Fix-and-Flip Loans | ProInvestorHub',
    metaDescription:
      'Groundfloor review for fix-and-flip investors. Crowdfunded hard money loans, no prepayment penalties, low credit requirements. Expert analysis.',
  },
  {
    name: 'Upright (formerly Fund That Flip)',
    // NOTE: slug kept as 'arrived' to preserve the existing /lenders/reviews/arrived URL.
    // Earlier data mislabeled this entry "Arrived" — a separate, unrelated fractional
    // rental-INVESTING platform (arrived.com). The loan data here is Fund That Flip's,
    // which rebranded to Upright in Sept 2023. Corrected to Upright.
    slug: 'arrived',
    website: 'https://upright.us',
    founded: 2014,
    headquarters: 'Cleveland, OH',
    description:
      'Upright (formerly Fund That Flip) offers fix-and-flip and bridge loans for real estate investors. Known for a technology-forward platform and competitive terms for experienced flippers.',
    loanTypeSlugs: ['fix-and-flip-loans', 'bridge-loans'],
    minRate: 8.5,
    maxRate: 12.0,
    maxLtv: 85,
    minCreditScore: 640,
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
    originationFee: '1.5–2.5 points',
    speedToClose: '10–14 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse'],
    experienceRequired: 'beginner',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'None',
    foreignNational: false,
    bestForTags: ['Experienced flippers', 'Bridge financing', 'Fast closings'],
    pros: [
      'High LTV (up to 85% of purchase)',
      'Fast closings (10–14 days)',
      'No prepayment penalties',
      'Technology-forward platform',
    ],
    cons: [
      'Requires at least 1-2 completed deals',
      'Higher minimum rate than some competitors',
      'Limited to 1-4 unit residential',
      'Brand transition (Fund That Flip → Upright) may cause confusion',
    ],
    editorRating: 3.9,
    featured: false,
    editorSummary:
      'Upright (formerly Fund That Flip) offers higher leverage than most fix-and-flip lenders — up to 85% of purchase price, which means less cash out of pocket per deal. If you have 1-2 flips under your belt and want to stretch your capital across more deals, their higher LTV is a meaningful advantage. The no-prepayment-penalty policy adds flexibility.',
    editorReview: `Upright is the fix-and-flip lender that spent its first decade as Fund That Flip. Founder and CEO Matt Rodak launched the company in 2014 in Cleveland, Ohio, building a platform that does two things at once: it originates short-term loans to house flippers and redevelopers, and it lets accredited investors buy into those loans as passive-income notes. In 2022 it acquired the project-management software FlipperForce, and in September 2023 it rebranded the whole operation as Upright.

For a borrower, the draw is leverage and speed. Upright will go up to 85% of the purchase price with closings in roughly 10–14 days — useful when you're competing for a flip and need to move faster than a bank will. Rates run higher (roughly 8.5%–12%) than long-term rental financing, which is normal for short-term fix-and-flip money, and there's no prepayment penalty, so paying the loan off the day you sell costs you nothing extra.

It's a better fit for investors with at least a deal or two behind them than for a first-timer — the platform is built around experienced flippers, and the financing tops out at 1–4 unit residential. Confirm Upright's current NMLS registration and check its Better Business Bureau profile before applying, and know that you may still see "Fund That Flip" in older reviews and search results.`,
    metaTitle: 'Upright (Fund That Flip) Review 2026: Fix-and-Flip Loans | ProInvestorHub',
    metaDescription:
      'Upright (formerly Fund That Flip) review. Fix-and-flip and bridge loans with high LTV (85%). Fast closings, no prepayment penalties. Expert analysis.',
  },
  {
    name: 'Griffin Funding',
    slug: 'griffin-funding',
    website: 'https://www.griffinfunding.com',
    founded: 2013,
    headquarters: 'San Diego, CA',
    description:
      'Griffin Funding is a mortgage lender specializing in non-QM products for investors, including DSCR, bank statement, and asset-based loans. Strong option for self-employed borrowers and investors with complex income situations.',
    loanTypeSlugs: ['dscr-loans', 'bank-statement-loans'],
    minRate: 6.5,
    maxRate: 9.0,
    maxLtv: 80,
    minCreditScore: 620,
    minLoanAmount: 100000,
    maxLoanAmount: 5000000,
    originationFee: '0–2 points',
    speedToClose: '21–30 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down (DSCR)',
    foreignNational: true,
    bestForTags: ['Self-employed investors', 'Bank statement borrowers', 'DSCR investors', 'Foreign nationals'],
    pros: [
      'Low credit minimum (620) for DSCR',
      'Bank statement programs for self-employed',
      'Foreign national financing available',
      'High max loan amount ($5M)',
      'Interest-only options',
    ],
    cons: [
      'No fix-and-flip or bridge products',
      'Closing times on the longer side (21-30 days)',
      'Prepayment penalties on DSCR products',
    ],
    editorRating: 4.0,
    featured: false,
    editorSummary:
      'Griffin Funding combines low credit requirements (620 DSCR) with bank statement and foreign national programs — a rare combination. If you\'re a self-employed investor with a 640 credit score who wants a DSCR loan, Griffin is one of the few lenders who\'ll work with you. Their non-QM expertise means they understand non-standard borrower profiles better than most.',
    editorReview: `Griffin Funding is a non-QM lender out of San Diego, founded in 2013 by Bill Lyons, who still runs it as founder and CEO. It's a direct-to-consumer shop that grew up fast — a repeat Inc. 5000 honoree that reports having funded north of $3.6 billion to more than 8,000 clients — and it has built its investor business around two products most banks won't touch: DSCR loans and bank statement loans. For real estate investors, that focus is the whole point — these are the programs that let you qualify on the property's cash flow or your deposits instead of W-2s and tax returns.

On rates and terms, Griffin's investor loans run roughly 6.5% to 9% with up to 80% LTV, a 620 minimum credit score on DSCR, and loan amounts from $100,000 up to $5 million. Origination sits in the 0–2 point range and they'll close in title held by an LLC, with interest-only options available. Those are competitive numbers for the non-QM space — the 620 DSCR floor in particular is lower than many competitors, which is what makes Griffin worth a quote if your credit isn't pristine. Treat every figure here as a starting point and get a written quote for your scenario; non-QM pricing moves with the market and your specific profile.

The bank statement program is the other reason investors find Griffin. If you're self-employed and your tax returns understate your real income, Griffin will qualify you on 12–24 months of bank deposits — useful for full-time investors, gig-economy earners, and business owners. They also lend to foreign nationals, a thin market where few lenders compete.

Where Griffin isn't the answer: there's no fix-and-flip or bridge product, so a BRRRR or flip investor needs a second lender for the acquisition-and-rehab leg. Closings tend to run 21–30 days rather than the one-to-two weeks a hard-money shop can hit, and DSCR loans carry a 3-year step-down prepayment penalty you'll want to model if you plan to refinance or sell early. As with any lender, confirm Griffin Funding's current NMLS registration and check its Better Business Bureau (BBB) profile and reviews before you apply, and compare at least one written quote against a competing DSCR lender.`,
    metaTitle: 'Griffin Funding Review 2026: DSCR & Bank Statement Loans | ProInvestorHub',
    metaDescription:
      'Griffin Funding review for real estate investors. Low credit score DSCR, bank statement programs, foreign national loans. Rates, requirements, expert analysis.',
  },
  {
    name: 'Defy Mortgage',
    slug: 'defy-mortgage',
    website: 'https://www.defymortgage.com',
    founded: 2020,
    headquarters: 'Fort Lauderdale, FL',
    description:
      'Defy Mortgage is a non-QM lender offering DSCR, bank statement, and asset depletion loans for real estate investors. Known for aggressive marketing and competitive rates on non-QM products.',
    loanTypeSlugs: ['dscr-loans', 'bank-statement-loans'],
    minRate: 6.5,
    maxRate: 9.0,
    maxLtv: 80,
    minCreditScore: 620,
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
    originationFee: '0–2 points',
    speedToClose: '21–30 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily', 'str'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down',
    foreignNational: true,
    bestForTags: ['Airbnb/STR investors', 'Self-employed investors', 'Non-QM specialists'],
    pros: [
      'Strong STR/Airbnb DSCR programs',
      'Bank statement and asset depletion products',
      'Low credit minimums',
      'Foreign national programs',
      'Competitive non-QM rates',
    ],
    cons: [
      'Newer company (2020) — shorter track record',
      'No fix-and-flip or bridge products',
      'Marketing can oversell — verify terms carefully',
    ],
    editorRating: 3.9,
    featured: false,
    editorSummary:
      'Defy Mortgage is strongest for Airbnb/STR investors who need a DSCR lender that explicitly accepts short-term rental income. Their STR DSCR programs use AirDNA data for income qualification, which is more generous than lenders requiring traditional leases. If you\'re building an STR portfolio, Defy understands the business model. Verify all terms in writing — their marketing is aggressive and may not match final loan docs.',
    metaTitle: 'Defy Mortgage Review 2026: DSCR for STR & Airbnb | ProInvestorHub',
    metaDescription:
      'Defy Mortgage review for Airbnb and STR investors. DSCR loans using short-term rental income. Bank statement programs, foreign national loans. Expert analysis.',
  },
  {
    name: 'Tidal Loans',
    slug: 'tidal-loans',
    website: 'https://www.tidalloans.com',
    founded: 2014,
    headquarters: 'Houston, TX',
    description:
      'Tidal Loans is a Texas-based hard money and DSCR lender known for fast closings and strong presence in the Texas investment property market. A regional favorite for Texas investors.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'dscr-loans', 'bridge-loans'],
    minRate: 7.0,
    maxRate: 13.0,
    maxLtv: 80,
    minCreditScore: 620,
    minLoanAmount: 75000,
    maxLoanAmount: 2000000,
    originationFee: '1.5–3 points',
    speedToClose: '7–14 days',
    nationwide: false,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-2-1 step-down (DSCR)',
    foreignNational: false,
    bestForTags: ['Texas investors', 'Fast closings', 'Hard money borrowers', 'First-time flippers'],
    pros: [
      'Deep Texas market expertise',
      'Very fast closings (7 days possible)',
      'Works with first-time investors',
      'Local relationships and market knowledge',
      'Multiple product types under one roof',
    ],
    cons: [
      'Limited geographic coverage (primarily Texas)',
      'Higher origination fees for hard money',
      'Smaller lender — less scalable than national players',
    ],
    editorRating: 4.0,
    featured: false,
    editorSummary:
      'Tidal Loans is the best hard money lender for Texas-focused investors. Their deep local market knowledge means they understand Texas property values, rehab costs, and rental markets better than national lenders underwriting from a spreadsheet. If your investment strategy is Texas-centric, Tidal\'s local expertise and 7-day closing capability give them an edge. Outside Texas, look at the national players.',
    metaTitle: 'Tidal Loans Review 2026: Texas Hard Money & DSCR | ProInvestorHub',
    metaDescription:
      'Tidal Loans review for Texas real estate investors. Hard money, fix-and-flip, and DSCR loans with 7-day closings. Local expertise and competitive rates.',
  },
  {
    name: 'Aloha Capital',
    slug: 'aloha-capital',
    website: 'https://www.alohacapital.com',
    founded: 2018,
    headquarters: 'San Francisco, CA',
    description:
      'Aloha Capital is a tech-enabled hard money lender offering fix-and-flip and bridge loans with a focus on transparency and speed. Known for clear pricing and a streamlined digital process.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans'],
    minRate: 8.0,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 650,
    minLoanAmount: 150000,
    maxLoanAmount: 3000000,
    originationFee: '1.5–2.5 points',
    speedToClose: '7–14 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse'],
    experienceRequired: 'beginner',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'None',
    foreignNational: false,
    bestForTags: ['Experienced flippers', 'Transparent pricing', 'West Coast investors'],
    pros: [
      'Transparent pricing — no hidden fees',
      'Fast closings (7–14 days)',
      'No prepayment penalties',
      'Clean digital experience',
      'Good customer service',
    ],
    cons: [
      'Requires 1+ completed deal',
      'Higher minimum loan ($150K)',
      'No DSCR or long-term products',
      'Limited to residential properties',
    ],
    editorRating: 4.0,
    featured: false,
    editorSummary:
      'Aloha Capital differentiated themselves on transparency — what you see is what you get, with clear pricing and no surprise fees at closing. In an industry where hard money lenders are notorious for last-minute fee additions, this transparency is valuable. Best for investors who\'ve completed at least one deal and want a reliable, no-surprises flip lender.',
    metaTitle: 'Aloha Capital Review 2026: Hard Money Loans | ProInvestorHub',
    metaDescription:
      'Aloha Capital review for fix-and-flip investors. Transparent hard money lending, fast closings, no prepayment penalties. Rates, pros & cons, expert analysis.',
  },
  {
    name: 'Lendency',
    slug: 'lendency',
    website: 'https://www.lendency.com',
    founded: 2020,
    headquarters: 'Miami, FL',
    description:
      'Lendency is a DSCR lender focused on simplicity and speed, offering 30-year rental loans with a streamlined application process. Targets investors who want a straightforward DSCR experience.',
    loanTypeSlugs: ['dscr-loans'],
    minRate: 6.75,
    maxRate: 8.5,
    maxLtv: 80,
    minCreditScore: 660,
    minLoanAmount: 75000,
    maxLoanAmount: 2000000,
    originationFee: '1–2 points',
    speedToClose: '14–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: false,
    prepaymentPenalty: '3-2-1 step-down',
    foreignNational: false,
    bestForTags: ['DSCR investors', 'Simplicity seekers', 'First-time DSCR borrowers'],
    pros: [
      'Simple, streamlined DSCR process',
      'Fast DSCR closings (14–21 days)',
      'Competitive rates',
      'Works with first-time investors',
    ],
    cons: [
      'DSCR only — no short-term products',
      'No interest-only option',
      'Newer company',
      'No foreign national programs',
    ],
    editorRating: 3.8,
    featured: false,
    editorSummary:
      'Lendency does one thing and keeps it simple: 30-year DSCR loans with minimal friction. If you want a straightforward rental property loan without navigating complex product menus, Lendency\'s streamlined process is refreshing. Good for first-time DSCR borrowers who want to close quickly without a steep learning curve.',
    metaTitle: 'Lendency Review 2026: Simple DSCR Loans | ProInvestorHub',
    metaDescription:
      'Lendency review for rental property investors. Streamlined DSCR loans, fast closings, simple process. Rates, requirements, and expert analysis.',
  },
  {
    name: 'Civic Financial Services',
    slug: 'civic-financial',
    website: 'https://www.civicfs.com',
    founded: 2014,
    headquarters: 'Redondo Beach, CA',
    description:
      'Civic Financial Services is a private money lender offering business purpose loans including fix-and-flip, bridge, and DSCR products. A subsidiary of Pacific Western Bank, providing institutional backing with private lender flexibility.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
    minRate: 7.5,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 640,
    minLoanAmount: 75000,
    maxLoanAmount: 5000000,
    originationFee: '1–3 points',
    speedToClose: '10–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use', 'condo', 'townhouse'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down (DSCR)',
    foreignNational: false,
    bestForTags: ['All-in-one lender', 'Institutional-backed stability', 'Larger loan amounts'],
    pros: [
      'Bank-backed stability (Pacific Western Bank subsidiary)',
      'Broad product range — flip, bridge, and DSCR',
      'High max loan ($5M)',
      'Works with first-time investors',
      'Multifamily and mixed-use eligible',
    ],
    cons: [
      'Less tech-forward than Kiavi or New Silver',
      'Origination fees can be high on hard money products',
      'Closing not quite as fast as pure hard money shops',
    ],
    editorRating: 4.1,
    featured: false,
    editorSummary:
      'Civic Financial offers the best of both worlds: private lender flexibility with institutional backing. As a subsidiary of Pacific Western Bank, they have deep capital reserves — you don\'t need to worry about them running out of funds mid-deal. The product range covers fix-and-flip through DSCR, making them a solid one-stop-shop for investors who want a bank-backed lender with private money speed.',
    metaTitle: 'Civic Financial Services Review 2026: Private Money Lender | ProInvestorHub',
    metaDescription:
      'Civic Financial Services review. Bank-backed hard money, flip, bridge, and DSCR loans. Institutional stability with private lender speed. Expert analysis.',
  },
  {
    name: 'Velocity Mortgage Capital',
    slug: 'velocity-mortgage',
    website: 'https://www.velocitymortgage.com',
    founded: 2004,
    headquarters: 'Westlake Village, CA',
    description:
      'Velocity Mortgage Capital specializes in small balance commercial loans for investment properties — DSCR for 1-4 units and commercial for 5+ units. One of the longest-standing investor lenders in the non-QM space.',
    loanTypeSlugs: ['dscr-loans', 'commercial-loans'],
    minRate: 6.5,
    maxRate: 9.0,
    maxLtv: 75,
    minCreditScore: 660,
    minLoanAmount: 100000,
    maxLoanAmount: 5000000,
    originationFee: '1–2 points',
    speedToClose: '21–45 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use', 'commercial'],
    experienceRequired: 'varies',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'Varies (3-5 year)',
    foreignNational: false,
    bestForTags: ['Small balance commercial', 'Multifamily investors', '5+ unit properties', 'Mixed-use investors'],
    pros: [
      'Residential AND commercial DSCR products',
      'Long operating history (founded 2004)',
      '5+ unit multifamily eligible',
      'Mixed-use and commercial property types',
      'Experienced underwriting team',
    ],
    cons: [
      'Higher minimum credit score for commercial',
      'Slower closings than residential-only lenders',
      'Lower max LTV (75%) than some DSCR competitors',
      'No fix-and-flip products',
    ],
    editorRating: 4.0,
    featured: false,
    editorSummary:
      'Velocity Mortgage fills an important gap for investors transitioning from residential to small commercial. Their ability to do DSCR on 1-4 units AND commercial loans on 5+ units under one roof is rare. If you\'re scaling from duplexes to small apartment buildings, Velocity can grow with you. Their 20-year track record provides stability that newer lenders can\'t match.',
    editorReview: `Velocity Mortgage Capital is the most established lender on this list by age — it was founded in 2004 by Christopher Farrar and Jeff Taylor, making it a survivor of both the 2008 crisis and every cycle since. Farrar still serves as CEO. The company built its niche early: investor 1–4 unit residential rentals and small-balance commercial real estate, a corner of the market the big banks tend to ignore.

It's also the rare investor lender that's publicly traded. The parent, Velocity Financial, went public on the NYSE under ticker VEL in January 2020, which brings a level of financial disclosure most private lenders don't offer. The loan portfolio has grown steadily, reaching roughly $6.5 billion in unpaid balances by the end of 2025.

For investors, Velocity's sweet spot is the deal that straddles residential and commercial — small multifamily, mixed-use, and small-balance commercial alongside standard DSCR rentals. That breadth, plus two decades of operating history and public-company transparency, is the case for Velocity; the trade-off is that a long-established, broker-driven lender is less nimble than a boutique. Verify current pricing for your property type before you apply.`,
    metaTitle: 'Velocity Mortgage Review 2026: DSCR & Commercial | ProInvestorHub',
    metaDescription:
      'Velocity Mortgage Capital review. DSCR and small balance commercial loans for real estate investors. Residential and 5+ unit financing. Expert analysis.',
  },
  {
    name: 'Roc Capital',
    slug: 'roc-capital',
    website: 'https://www.rfroc.com',
    founded: 2014,
    headquarters: 'New York, NY',
    description:
      'Roc Capital (Roc360) is a nationwide hard money and DSCR lender providing fix-and-flip, bridge, and rental loans for real estate investors. Known for a wide product suite and competitive pricing.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
    minRate: 7.0,
    maxRate: 12.0,
    maxLtv: 80,
    minCreditScore: 620,
    minLoanAmount: 75000,
    maxLoanAmount: 5000000,
    originationFee: '1–3 points',
    speedToClose: '10–21 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'condo', 'townhouse'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down (DSCR)',
    foreignNational: false,
    bestForTags: ['Full-product investors', 'Low credit score borrowers', 'Volume flippers'],
    pros: [
      'Broad product range — hard money through DSCR',
      'Low credit minimum (620)',
      'Competitive pricing for volume borrowers',
      'High max loan amount ($5M)',
      'Nationwide coverage',
    ],
    cons: [
      'Origination fees vary widely (1–3 points)',
      'Less brand recognition than Kiavi or Lima One',
      'Technology platform less polished than top-tier competitors',
    ],
    editorRating: 3.9,
    featured: false,
    editorSummary:
      'Roc Capital is a solid all-around investor lender with competitive pricing and broad product availability. They\'re a good option to get a competing quote when evaluating loans from Kiavi, Lima One, or RCN Capital. Their 620 credit minimum for DSCR makes them accessible for borrowers with credit challenges.',
    editorReview: `Roc Capital is the lending brand of Roc360, and it has grown into one of the largest players in business-purpose lending. It was founded in 2014 in New York City by Arvind Raghunathan, Maksim Stavinsky, and Eric Abramovich, starting with a secured lending fund for residential real estate investors. In 2020 the founders reorganized under a holding company, Roc360, with Roc Capital as its flagship lending brand; Stavinsky now serves as CEO.

A lot of Roc's scale has come through acquisition. In 2023 it acquired both Finance of America Commercial and the origination assets of Civic Financial Services, absorbing two sizable investor-lending operations. It's backed by institutional capital including Temasek, Singapore's sovereign wealth fund, and reports having funded more than $20 billion across roughly 50,000 loans since 2014 — more when its acquired brands are included.

For investors, Roc Capital offers hard money for flips and DSCR loans for rentals, backed by deep institutional capital and a wholesale network. One thing to keep straight: "Roc Capital" and "Roc360" are the same organization — the brand and its parent — not competing lenders. Confirm current terms for your loan, and you may reach Roc through a broker given its wholesale focus.`,
    metaTitle: 'Roc Capital Review 2026: Hard Money & DSCR Loans | ProInvestorHub',
    metaDescription:
      'Roc Capital review for real estate investors. Fix-and-flip, bridge, and DSCR loans. Low credit minimums, competitive rates. Expert analysis and comparison.',
  },
  {
    // NOTE: corrected from a prior mislabel of "Lima One (formerly OfferMarket)".
    // OfferMarket (founded 2020, MD) is unrelated to Lima One Capital (founded 2011,
    // Greenville SC, owned by MFA Financial) — no rebrand or acquisition links them.
    name: 'OfferMarket',
    slug: 'offermarket',
    website: 'https://www.offermarket.us',
    founded: 2020,
    headquarters: 'Baltimore, MD',
    description:
      'OfferMarket is a tech-enabled DSCR lender offering competitive 30-year rental loans with a focus on investor education and transparent pricing.',
    loanTypeSlugs: ['dscr-loans'],
    minRate: 6.5,
    maxRate: 8.5,
    maxLtv: 80,
    minCreditScore: 640,
    minLoanAmount: 75000,
    maxLoanAmount: 2000000,
    originationFee: '1–2 points',
    speedToClose: '21–30 days',
    nationwide: true,
    propertyTypes: ['sfr', 'condo', 'townhouse', 'multifamily'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: '3-year step-down',
    foreignNational: false,
    bestForTags: ['DSCR investors', 'Education-focused borrowers', 'Transparent pricing'],
    pros: [
      'Transparent pricing — no hidden fees',
      'Strong investor education content',
      'Competitive DSCR rates',
      'Works with first-time investors',
    ],
    cons: [
      'DSCR only — no fix-and-flip or bridge',
      'Newer company — less track record',
      'Smaller team than major lenders',
    ],
    editorRating: 3.7,
    featured: false,
    editorSummary:
      'OfferMarket pairs DSCR lending with strong investor education — their content library helps first-time DSCR borrowers understand the product before they apply. If you\'re new to DSCR loans and want a lender that will educate rather than just sell, OfferMarket\'s approach is refreshing. Rates are competitive and the process is straightforward.',
    editorReview: `OfferMarket is one of the newer names on this list, and it comes at investor financing from a different angle than the big balance-sheet lenders. It was founded in 2020 by Daniel Sperling-Horowitz (CEO) and Martin Terskin (CTO), who met at the University of Maryland, and it runs as a fully remote company out of Maryland. The lending arm, OfferMarket Capital, sits alongside an off-market property marketplace and an insurance marketplace — the pitch is a one-stop platform for buy-and-hold investors rather than a pure lender.

On the loan side, OfferMarket focuses on 30-year DSCR rental loans, with rates roughly 6.5%–8.5% up to 80% LTV and no experience requirement, so it will work with first-time investors. The differentiator they lean into is transparency and education: published pricing and a deep content library aimed at helping a borrower understand the DSCR product before they commit, rather than pushing them through a sales funnel.

The trade-off is what you'd expect from a younger, leaner shop — DSCR only (no fix-and-flip or bridge), a shorter track record, and a smaller team than a Kiavi or a CoreVest. For an investor who values a straightforward 30-year rental loan and wants to be educated along the way, that's a fair trade; just confirm current terms and NMLS registration before you apply.`,
    metaTitle: 'OfferMarket Review 2026: DSCR Loans for Investors | ProInvestorHub',
    metaDescription:
      'OfferMarket review for rental property investors. Transparent DSCR lending with investor education. Competitive rates, honest reviews, expert analysis.',
  },
  {
    name: 'Park Place Finance',
    slug: 'park-place-finance',
    website: 'https://www.parkplacefinance.com',
    founded: 2006,
    headquarters: 'Dallas, TX',
    description:
      'Park Place Finance is a private lender specializing in hard money, bridge, and fix-and-flip loans. Known for flexibility on property types and deal structures.',
    loanTypeSlugs: ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans'],
    minRate: 9.0,
    maxRate: 13.0,
    maxLtv: 75,
    minCreditScore: 600,
    minLoanAmount: 50000,
    maxLoanAmount: 2000000,
    originationFee: '2–3 points',
    speedToClose: '7–14 days',
    nationwide: true,
    propertyTypes: ['sfr', 'multifamily', 'mixed-use', 'commercial', 'land'],
    experienceRequired: 'none',
    allowsLlc: true,
    interestOnlyAvailable: true,
    prepaymentPenalty: 'None',
    foreignNational: false,
    bestForTags: ['Small loan amounts', 'Flexible property types', 'Land financing', 'Rural properties'],
    pros: [
      'Low minimum loan ($50K) — great for low-cost markets',
      'Flexible property types including land and commercial',
      'Low credit requirements (600)',
      'No prepayment penalties',
      'Fast closings (7 days possible)',
    ],
    cons: [
      'Higher rates than institutional-style lenders',
      'Higher origination fees (2–3 points)',
      'No DSCR or long-term products',
    ],
    editorRating: 3.7,
    featured: false,
    editorSummary:
      'Park Place Finance fills a niche for investors doing smaller deals in lower-cost markets. Their $50K minimum loan is among the lowest in the industry — if you\'re flipping houses in Detroit, Memphis, or other affordable markets where deal sizes run $60K–$120K, many national lenders won\'t touch it. Park Place will. They also finance land and commercial properties, adding flexibility for non-standard deals.',
    editorReview: `Park Place Finance is one of the longer-running independent hard-money lenders on this list. According to the company, it was founded in 2006 in Austin, Texas by Justin Hubbert, who still leads it. Hubbert came up as a conventional loan officer and an active house-flipper himself before launching the firm — a background that fits a lender built around the realities of fix-and-flip investing rather than a desk-bound underwriting model.

The company reports having funded more than $1 billion in loans over its history and has grown its team substantially in recent years, while staying an independent, founder-led shop rather than part of a larger financial group. That independence can mean a more direct, relationship-driven process than you'd get from a national institution.

For investors, Park Place focuses on hard-money financing for flips and short-term deals out of its Austin base. As a privately held lender, much of its published track record is self-reported, so the usual discipline applies: confirm current rates, points, and terms in writing for your specific deal, and check the firm's NMLS registration and Better Business Bureau profile before you commit.`,
    metaTitle: 'Park Place Finance Review 2026: Hard Money Lender | ProInvestorHub',
    metaDescription:
      'Park Place Finance review. Hard money and bridge loans with $50K minimum. Flexible property types, low credit requirements. Expert analysis for investors.',
  },
]

export function getLenderBySlug(slug: string): LenderData | undefined {
  return lenders.find((l) => l.slug === slug)
}

export function getLendersByLoanType(loanTypeSlug: string): LenderData[] {
  return lenders
    .filter((l) => l.loanTypeSlugs.includes(loanTypeSlug))
    .sort((a, b) => b.editorRating - a.editorRating)
}

export function getFeaturedLenders(): LenderData[] {
  return lenders.filter((l) => l.featured).sort((a, b) => b.editorRating - a.editorRating)
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`
  }
  return `$${(value / 1000).toFixed(0)}K`
}
