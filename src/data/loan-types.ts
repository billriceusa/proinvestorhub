/**
 * Loan type seed data for the financing directory.
 * Used for static generation and as fallback when Sanity data is unavailable.
 */

export type LoanTypeCategory = 'short-term' | 'long-term' | 'transitional' | 'specialty'

export type LoanTypeData = {
  name: string
  slug: string
  shortName: string
  category: LoanTypeCategory
  description: string
  typicalRateRange: string
  typicalLtvRange: string
  typicalTermRange: string
  typicalMinCredit: string
  bestFor: string[]
  pros: string[]
  cons: string[]
  relatedStrategies: string[]
  relatedCalculator: string
  sortOrder: number
  heroContent: string
  faqs: Array<{ question: string; answer: string }>
  metaTitle: string
  metaDescription: string
}

export const loanTypes: LoanTypeData[] = [
  // ── Long-Term / Hold ────────────────────────────────
  {
    name: 'DSCR Loans',
    slug: 'dscr-loans',
    shortName: 'DSCR',
    category: 'long-term',
    description:
      'DSCR (Debt Service Coverage Ratio) loans qualify based on the property\'s rental income, not your personal income or W-2s. The most popular loan product for buy-and-hold real estate investors scaling a rental portfolio.',
    typicalRateRange: '6.5%–8.5%',
    typicalLtvRange: '75%–80%',
    typicalTermRange: '30-year fixed or 5/6 ARM',
    typicalMinCredit: '620–680',
    bestFor: [
      'Buy-and-hold rental investors',
      'Self-employed investors without W-2 income',
      'Investors scaling past 10 properties',
      'BRRRR refinance (long-term hold phase)',
    ],
    pros: [
      'No personal income verification — property income qualifies',
      'Close in LLC or entity name',
      'No limit on number of financed properties',
      '30-year fixed-rate options available',
      'Cash-out refinance available',
    ],
    cons: [
      'Higher rates than conventional (typically 1–2% premium)',
      'Requires 20–25% down payment',
      'Property must generate sufficient rental income (usually 1.0+ DSCR)',
      'Prepayment penalties common (3–5 year step-down)',
      'Higher minimum loan amounts ($75K–$100K typical)',
    ],
    relatedStrategies: ['cash-flow', 'brrrr', 'appreciation', 'str'],
    relatedCalculator: '/calculators/mortgage',
    sortOrder: 1,
    heroContent:
      'DSCR loans have transformed real estate investing by removing the biggest barrier to scaling: personal income requirements. Instead of proving you can afford the mortgage with your W-2 or tax returns, the lender evaluates whether the property itself generates enough rental income to cover the debt payment. If the property\'s net operating income divided by the annual debt service equals 1.0 or higher (meaning rents cover the mortgage), you can qualify — regardless of your personal financial situation. This makes DSCR the go-to product for full-time investors, self-employed borrowers, and anyone who has maxed out their conventional loan capacity at 10 properties.',
    faqs: [
      {
        question: 'What DSCR ratio do I need to qualify?',
        answer: 'Most lenders require a minimum DSCR of 1.0 (break-even), meaning the property\'s gross rental income equals or exceeds the total mortgage payment including taxes and insurance. Some lenders offer programs down to 0.75 DSCR at higher rates, while a DSCR of 1.25+ gets you the best rates and terms.',
      },
      {
        question: 'Can I use a DSCR loan for my first investment property?',
        answer: 'Yes. While some DSCR lenders require prior investment experience, many now offer first-time investor programs. You may face slightly higher rates or lower LTV limits (70-75% instead of 80%), but DSCR loans are increasingly accessible to beginners.',
      },
      {
        question: 'Do DSCR loans work for short-term rentals and Airbnb?',
        answer: 'Many DSCR lenders now accept short-term rental income, often using AirDNA or comparable platform data to estimate income rather than a traditional lease. Not all lenders offer this — look for those specifically advertising STR/Airbnb DSCR programs.',
      },
      {
        question: 'What\'s the difference between a DSCR loan and a conventional investment property loan?',
        answer: 'Conventional loans use your personal debt-to-income (DTI) ratio and require tax returns, W-2s, and pay stubs. DSCR loans use the property\'s income only. Conventional loans offer lower rates but limit you to 10 financed properties. DSCR has no property count limit but costs 1-2% more in rate.',
      },
    ],
    metaTitle: 'Best DSCR Lenders 2026: Compare Rates, LTV & Requirements | ProInvestorHub',
    metaDescription:
      'Compare the best DSCR lenders for real estate investors in 2026. Side-by-side rates, LTV limits, credit score requirements, and expert reviews from a 30-year lending veteran.',
  },
  {
    name: 'Conventional Investment Property Loans',
    slug: 'conventional-investment',
    shortName: 'Conventional',
    category: 'long-term',
    description:
      'Traditional Fannie Mae/Freddie Mac-backed mortgages for investment properties. The lowest rates available for investors, but require personal income qualification and are limited to 10 financed properties.',
    typicalRateRange: '6.0%–7.5%',
    typicalLtvRange: '75%–80%',
    typicalTermRange: '15 or 30-year fixed',
    typicalMinCredit: '680–720',
    bestFor: [
      'Investors with strong W-2 or documented income',
      'First 1–10 investment properties',
      'Investors who want the lowest possible rate',
      'House hackers using owner-occupied strategies',
    ],
    pros: [
      'Lowest rates available for investment properties',
      'Well-understood process and widespread lender availability',
      'No prepayment penalties',
      'Assumable by qualified buyers (potential selling advantage)',
    ],
    cons: [
      'Requires full income documentation (tax returns, W-2s, pay stubs)',
      'Limited to 10 financed properties per borrower (Fannie/Freddie cap)',
      'Higher credit score requirements than DSCR',
      'DTI ratio must accommodate all existing mortgages',
      '15–25% down payment for investment properties',
    ],
    relatedStrategies: ['cash-flow', 'house-hacking', 'appreciation'],
    relatedCalculator: '/calculators/mortgage',
    sortOrder: 2,
    heroContent:
      'Conventional investment property loans are the bedrock of real estate investing for most people starting out. Backed by Fannie Mae and Freddie Mac, they offer the lowest interest rates and most favorable terms of any investment property financing. The trade-off: you need strong personal income documentation and your debt-to-income ratio must support every mortgage you hold. For investors building their first 1–10 properties while still working a W-2 job, conventional financing should be your first choice. Once you hit the 10-property cap or your DTI becomes a limiting factor, DSCR loans become the natural next step.',
    faqs: [
      {
        question: 'How many investment properties can I finance with conventional loans?',
        answer: 'Fannie Mae and Freddie Mac allow up to 10 financed properties per borrower. Properties 5–10 require higher reserves (6 months PITI per property) and stronger credit scores. Beyond 10, you\'ll need DSCR, portfolio, or commercial financing.',
      },
      {
        question: 'What down payment do I need for a conventional investment property loan?',
        answer: 'Typically 15% for a single-family investment property and 25% for 2–4 units. If you live in one unit (house hacking), you can use owner-occupied financing: FHA at 3.5% down or conventional at 5% down.',
      },
      {
        question: 'Can I use rental income to help qualify for a conventional loan?',
        answer: 'Yes. Fannie Mae allows lenders to count 75% of expected rental income (from the subject property or existing rentals) toward your qualifying income. This helps offset the new mortgage payment in your DTI calculation.',
      },
    ],
    metaTitle: 'Best Conventional Investment Property Lenders 2026 | ProInvestorHub',
    metaDescription:
      'Compare conventional mortgage lenders for investment properties. Lowest rates, 15-25% down, up to 10 properties. Expert reviews and side-by-side comparisons.',
  },
  {
    name: 'Portfolio Loans',
    slug: 'portfolio-loans',
    shortName: 'Portfolio',
    category: 'long-term',
    description:
      'Portfolio loans are held by the originating bank (not sold to Fannie/Freddie), giving lenders flexibility on guidelines. Ideal for investors with 5+ properties who need blanket financing or flexible underwriting.',
    typicalRateRange: '7.0%–9.0%',
    typicalLtvRange: '70%–80%',
    typicalTermRange: '5–30 years (balloon or fully amortizing)',
    typicalMinCredit: '650–700',
    bestFor: [
      'Investors with 5+ rental properties',
      'Blanket loan across multiple properties',
      'Complex income situations (self-employed, irregular income)',
      'Properties that don\'t meet Fannie/Freddie guidelines',
    ],
    pros: [
      'No limit on number of properties',
      'Blanket loan option (one loan, multiple properties)',
      'Flexible underwriting — lender makes their own rules',
      'Can finance non-conforming properties',
    ],
    cons: [
      'Higher rates than conventional or DSCR',
      'Often balloon payments (5-10 year term with 30-year amortization)',
      'Fewer lenders offering portfolio products',
      'Prepayment penalties common',
      'Cross-collateralization risk on blanket loans',
    ],
    relatedStrategies: ['cash-flow', 'appreciation'],
    relatedCalculator: '/calculators/mortgage',
    sortOrder: 5,
    heroContent:
      'Portfolio loans fill the gap between conventional financing and DSCR for investors who need flexibility. Because the lender keeps the loan on their own books (rather than selling it to Fannie Mae or Freddie Mac), they can set their own guidelines for credit, income, property types, and number of properties. The flagship portfolio product is the blanket loan — a single mortgage covering multiple rental properties, simplifying your payments and enabling portfolio-level lending decisions. Community banks and credit unions are the primary portfolio lenders, and relationships matter here more than anywhere else in lending.',
    faqs: [
      {
        question: 'What is a blanket mortgage?',
        answer: 'A blanket mortgage is a single loan that covers multiple properties under one note. Instead of managing separate mortgages for each rental, you make one payment. The lender holds a lien on all properties, with a release clause that lets you sell individual properties without paying off the entire loan.',
      },
      {
        question: 'Are portfolio loans better than DSCR loans?',
        answer: 'It depends on your situation. Portfolio loans may offer better terms if you have a strong banking relationship, but DSCR products have become more competitive and are available from more lenders. Portfolio loans shine when you need a blanket loan or have properties that don\'t qualify for standard DSCR (e.g., commercial, mixed-use).',
      },
    ],
    metaTitle: 'Best Portfolio Lenders for Real Estate Investors 2026 | ProInvestorHub',
    metaDescription:
      'Compare portfolio lenders offering blanket loans and flexible underwriting for real estate investors. No property limits, custom terms, expert reviews.',
  },

  // ── Short-Term / Acquisition ────────────────────────
  {
    name: 'Hard Money Loans',
    slug: 'hard-money-loans',
    shortName: 'Hard Money',
    category: 'short-term',
    description:
      'Short-term, asset-based loans primarily used for fix-and-flip projects and bridge financing. Fast closings (7–14 days), minimal borrower qualification, but higher rates and shorter terms than permanent financing.',
    typicalRateRange: '10%–14%',
    typicalLtvRange: '65%–75% of ARV',
    typicalTermRange: '6–24 months',
    typicalMinCredit: 'Flexible (550–650)',
    bestFor: [
      'Fix-and-flip investors',
      'Investors needing fast closings',
      'Borrowers who can\'t qualify for bank financing',
      'Auction and REO purchases',
      'Bridge situations (need to close quickly, refinance later)',
    ],
    pros: [
      'Fastest closings in the industry (7–14 days)',
      'Asset-based — minimal personal income requirements',
      'Flexible credit requirements',
      'Fund both purchase and rehab costs',
      'Available for distressed properties banks won\'t touch',
    ],
    cons: [
      'High interest rates (10–14%)',
      'Origination fees of 2–4 points',
      'Short terms (6–24 months) — must have an exit strategy',
      'Personal guarantee usually required',
      'Can be predatory — vet lenders carefully',
    ],
    relatedStrategies: ['fix-flip', 'brrrr', 'wholesale'],
    relatedCalculator: '/calculators/fix-flip',
    sortOrder: 3,
    heroContent:
      'Hard money loans are the engine behind fix-and-flip investing. They\'re short-term, asset-based loans secured by the property itself rather than your personal financial situation. The lender focuses on the deal — the purchase price, rehab budget, and after-repair value (ARV) — not your tax returns or credit score. This makes hard money essential for investors buying distressed properties at auction, competing with cash buyers on REOs, or executing the acquisition phase of a BRRRR strategy. The cost is real (10-14% rates plus 2-4 points), but for a profitable flip with a 6-month timeline, the carrying costs are manageable against a $30K–$80K profit margin.',
    faqs: [
      {
        question: 'How fast can a hard money lender close?',
        answer: 'Top hard money lenders can close in 7–10 business days, and some advertise closings as fast as 5 days for experienced borrowers with repeat relationships. This speed is critical when competing with cash offers or buying at auction with short closing windows.',
      },
      {
        question: 'Do hard money lenders fund the rehab too?',
        answer: 'Most hard money lenders offer rehab funding as part of the loan, typically held in escrow and disbursed in draws as work is completed. The total loan (purchase + rehab) is usually capped at 65–75% of the after-repair value (ARV).',
      },
      {
        question: 'What happens if my flip takes longer than the loan term?',
        answer: 'Most hard money lenders offer extensions (typically 3–6 months) for a fee (0.5–1 point). However, extensions are expensive and erode your profit margin. Always build a buffer into your timeline and have a backup exit strategy (sell at a discount or refinance to DSCR).',
      },
    ],
    metaTitle: 'Best Hard Money Lenders 2026: Compare Rates & Speed | ProInvestorHub',
    metaDescription:
      'Compare the best hard money lenders for fix-and-flip investors in 2026. Side-by-side rates, closing speed, LTV limits, and honest reviews from a lending veteran.',
  },
  {
    name: 'Fix-and-Flip Loans',
    slug: 'fix-and-flip-loans',
    shortName: 'Fix & Flip',
    category: 'short-term',
    description:
      'Purpose-built short-term loans that fund both the purchase and renovation of investment properties intended for resale. Similar to hard money but often from tech-enabled lenders with streamlined processes.',
    typicalRateRange: '9%–13%',
    typicalLtvRange: '85%–90% of purchase, 100% rehab, 70%–75% ARV',
    typicalTermRange: '6–18 months',
    typicalMinCredit: '620–680',
    bestFor: [
      'Experienced flippers doing 3+ deals per year',
      'Investors who want rehab draws funded quickly',
      'Scale flippers who need a repeatable lending partner',
      'First-time flippers with strong credit',
    ],
    pros: [
      'Purpose-built for flips — streamlined process',
      'Up to 90% of purchase and 100% of rehab funded',
      'Tech-enabled platforms with fast draw processing',
      'Volume discounts for repeat borrowers',
      'Lower rates than traditional hard money',
    ],
    cons: [
      'Higher credit requirements than traditional hard money',
      'Experience requirements for best terms',
      'Inspection-based draw process adds time to rehab',
      'Still expensive vs. long-term financing',
    ],
    relatedStrategies: ['fix-flip', 'brrrr'],
    relatedCalculator: '/calculators/fix-flip',
    sortOrder: 4,
    heroContent:
      'Fix-and-flip loans are the specialized evolution of hard money lending. While traditional hard money comes from private individuals or small funds, modern fix-and-flip lenders are tech-enabled companies (like Kiavi, Lima One, and RCN Capital) that have built streamlined platforms for volume flippers. They offer higher leverage (up to 90% of purchase and 100% of rehab), faster draw processing, and volume pricing for repeat borrowers. If you\'re doing 3+ flips per year, these specialized lenders offer better economics than traditional hard money.',
    faqs: [
      {
        question: 'What\'s the difference between a fix-and-flip loan and hard money?',
        answer: 'Fix-and-flip loans are a subset of hard money, but offered by larger, institutional-style lenders with standardized products, online portals, and scale pricing. Traditional hard money is from smaller private lenders with more flexibility but less consistency. For volume flippers, specialized fix-and-flip lenders are usually better; for unusual deals, traditional hard money may be more flexible.',
      },
      {
        question: 'Can I get a fix-and-flip loan with no experience?',
        answer: 'Yes, but terms won\'t be as favorable. Most lenders offer first-time flipper programs with lower leverage (75-80% LTV vs. 90%) and slightly higher rates. Having a strong credit score (700+), a detailed scope of work, and a realistic ARV analysis helps compensate for lack of experience.',
      },
    ],
    metaTitle: 'Best Fix-and-Flip Lenders 2026: Compare Rates & Terms | ProInvestorHub',
    metaDescription:
      'Compare the best fix-and-flip lenders for real estate investors. Up to 90% purchase + 100% rehab funding. Side-by-side rates, leverage, and expert reviews.',
  },
  {
    name: 'Bridge Loans',
    slug: 'bridge-loans',
    shortName: 'Bridge',
    category: 'short-term',
    description:
      'Short-term financing that bridges the gap between acquiring a property and securing permanent financing or selling. Used for value-add acquisitions, lease-up periods, and time-sensitive purchases.',
    typicalRateRange: '8%–12%',
    typicalLtvRange: '70%–80%',
    typicalTermRange: '6–36 months',
    typicalMinCredit: '620–680',
    bestFor: [
      'Value-add multifamily acquisitions',
      'Properties in lease-up that don\'t yet qualify for permanent financing',
      'Investors buying before their current property sells',
      'Quick acquisitions that will refinance to DSCR or conventional',
    ],
    pros: [
      'Fast closings (10–21 days)',
      'Funds acquisitions that don\'t qualify for permanent financing yet',
      'Interest-only payments preserve cash during value-add period',
      'Available for commercial and multifamily',
    ],
    cons: [
      'Higher rates than permanent financing',
      'Requires a clear exit strategy (refinance or sell)',
      'Origination fees of 1–3 points',
      'Risk of extension costs if exit takes longer than planned',
    ],
    relatedStrategies: ['brrrr', 'appreciation', 'fix-flip'],
    relatedCalculator: '/calculators/brrrr',
    sortOrder: 6,
    heroContent:
      'Bridge loans are transitional financing that gets you from point A to point B in your investment strategy. The most common use cases: buying a distressed multifamily property that needs renovation before it qualifies for permanent agency debt, acquiring a rental property quickly while waiting for another property to sell, or funding the acquisition phase of a BRRRR deal. Bridge loans are interest-only during their term, keeping your carrying costs low while you execute your value-add plan. The key to successful bridge lending is having a realistic exit strategy — you need to know exactly how you\'ll refinance or sell before the bridge term expires.',
    faqs: [
      {
        question: 'How is a bridge loan different from hard money?',
        answer: 'Bridge loans and hard money overlap significantly. The main distinction: "hard money" typically refers to fix-and-flip / rehab-focused loans from private lenders, while "bridge loans" are broader — they include value-add multifamily, lease-up financing, and commercial acquisitions. Bridge loans are often from larger institutional lenders and may offer slightly better terms.',
      },
      {
        question: 'Can I get a bridge loan for a multifamily property?',
        answer: 'Yes — bridge-to-permanent financing is the standard path for value-add multifamily acquisitions. You acquire with a bridge loan, renovate units, increase rents, stabilize occupancy, then refinance to agency debt (Fannie Mae Small Balance or Freddie Mac SBL) at much better long-term rates.',
      },
    ],
    metaTitle: 'Best Bridge Loan Lenders 2026: Compare Rates & Terms | ProInvestorHub',
    metaDescription:
      'Compare bridge loan lenders for real estate investors. Fast closings, interest-only, value-add and BRRRR financing. Expert reviews and side-by-side comparisons.',
  },
  {
    name: 'Construction Loans',
    slug: 'construction-loans',
    shortName: 'Construction',
    category: 'short-term',
    description:
      'Financing for ground-up construction of investment properties, from single-family spec homes to build-to-rent developments. Funds disbursed in draws as construction milestones are completed.',
    typicalRateRange: '9%–13%',
    typicalLtvRange: '70%–80% of completed value',
    typicalTermRange: '12–24 months',
    typicalMinCredit: '680+',
    bestFor: [
      'Build-to-rent developers',
      'Spec home builders',
      'Investors building on owned land',
      'Ground-up multifamily development',
    ],
    pros: [
      'Fund ground-up projects banks often won\'t finance',
      'Interest-only on drawn amounts reduces carrying costs',
      'Construction-to-permanent options eliminate double closing costs',
      'Higher LTV on completed value than rehab loans',
    ],
    cons: [
      'Requires construction experience and detailed plans',
      'Draw process adds complexity and timeline',
      'Higher rates than permanent financing',
      'Personal guarantee and additional collateral often required',
      'Cost overrun risk — budget carefully',
    ],
    relatedStrategies: ['new-construction', 'appreciation'],
    relatedCalculator: '/calculators/fix-flip',
    sortOrder: 8,
    heroContent:
      'Construction loans fund ground-up development — from acquiring the land through completing the build. Unlike rehab loans that renovate existing structures, construction financing covers everything from foundation to certificate of occupancy. The build-to-rent (BTR) sector has exploded, making construction loans increasingly important for investors building single-family rentals, townhome communities, or small multifamily developments from scratch. The best construction lenders offer construction-to-permanent programs that automatically convert to a DSCR or portfolio loan upon completion, eliminating the need for a separate refinance.',
    faqs: [
      {
        question: 'What is a construction-to-permanent loan?',
        answer: 'A construction-to-permanent (C2P) loan combines the construction financing and permanent mortgage into a single loan with one closing. Once construction is complete, the loan automatically converts to a 30-year DSCR or portfolio loan. This saves you closing costs, appraisal fees, and the risk of rate changes between construction and permanent financing.',
      },
      {
        question: 'Do I need construction experience to get a construction loan?',
        answer: 'Most construction lenders want to see a track record — at least 1-2 completed projects. First-time builders can qualify by partnering with an experienced general contractor and providing detailed plans, a realistic budget with contingency, and strong personal financials.',
      },
    ],
    metaTitle: 'Best Construction Lenders for Investors 2026 | ProInvestorHub',
    metaDescription:
      'Compare construction loan lenders for build-to-rent and spec builds. Ground-up financing, draw schedules, construction-to-permanent options. Expert reviews.',
  },

  // ── Transitional / Hybrid ───────────────────────────
  {
    name: 'Fix-and-Rent Loans',
    slug: 'fix-and-rent-loans',
    shortName: 'Fix & Rent',
    category: 'transitional',
    description:
      'Hybrid loans that combine short-term rehab financing with automatic conversion to a long-term DSCR loan. The one-loan BRRRR solution — no separate refinance needed.',
    typicalRateRange: '8%–11% (bridge) → 6.5%–8.5% (perm)',
    typicalLtvRange: '80%–85% purchase, 100% rehab, 75% perm',
    typicalTermRange: '12–18 month bridge → 30-year permanent',
    typicalMinCredit: '660–700',
    bestFor: [
      'BRRRR strategy investors',
      'Investors who want to rehab then hold long-term',
      'Investors who want to avoid double closing costs',
    ],
    pros: [
      'One loan covers purchase, rehab, and permanent financing',
      'Eliminates refinance closing costs and timeline risk',
      'Rate lock on permanent portion provides certainty',
      'Streamlined process — one lender, one application',
    ],
    cons: [
      'Fewer lenders offer this product',
      'Higher credit requirements than standalone hard money',
      'Less flexibility than using separate bridge + DSCR lenders',
      'Must commit to one lender for the entire process',
    ],
    relatedStrategies: ['brrrr', 'cash-flow'],
    relatedCalculator: '/calculators/brrrr',
    sortOrder: 7,
    heroContent:
      'Fix-and-rent loans are the BRRRR investor\'s dream product. Instead of getting a hard money loan for acquisition and rehab, then finding a separate DSCR lender for the refinance, a fix-and-rent loan does both in one. You close once, complete your renovation, get the property leased, and the loan automatically converts to a 30-year DSCR loan. This eliminates double closing costs ($3,000–$8,000 saved), removes refinance timing risk, and simplifies the entire process. Lenders like Kiavi, Lima One, and RCN Capital have made this product increasingly competitive.',
    faqs: [
      {
        question: 'How does the bridge-to-permanent conversion work?',
        answer: 'After your rehab is complete and the property is leased, the lender orders a new appraisal. If the property meets the DSCR requirements (typically 1.0+ DSCR), the loan automatically converts to a 30-year permanent loan. You don\'t apply again or pay new origination fees — just the conversion costs (typically an appraisal and small processing fee).',
      },
    ],
    metaTitle: 'Best Fix-and-Rent (BRRRR) Lenders 2026 | ProInvestorHub',
    metaDescription:
      'Compare fix-and-rent lenders for BRRRR investors. One-loan bridge-to-permanent financing. No refinance needed. Expert reviews and side-by-side comparisons.',
  },

  // ── Specialty ───────────────────────────────────────
  {
    name: 'Commercial Real Estate Loans',
    slug: 'commercial-loans',
    shortName: 'Commercial',
    category: 'specialty',
    description:
      'Financing for 5+ unit multifamily, office, retail, industrial, and mixed-use investment properties. Includes agency debt (Fannie/Freddie Small Balance), CMBS, bank loans, and private credit.',
    typicalRateRange: '5.5%–9.0%',
    typicalLtvRange: '65%–80%',
    typicalTermRange: '5–30 years',
    typicalMinCredit: '660+',
    bestFor: [
      'Multifamily investors (5+ units)',
      'Commercial property investors',
      'Experienced investors graduating from residential',
      'Syndication operators',
    ],
    pros: [
      'Agency debt (Fannie/Freddie) offers best rates for multifamily',
      'Longer terms available for stabilized properties',
      'Non-recourse options for qualified borrowers',
      'Scale — larger loan amounts for bigger deals',
    ],
    cons: [
      'More complex underwriting and documentation',
      'Higher minimum loan amounts ($500K–$1M+)',
      'Experience requirements for most products',
      'Longer closing timelines (30–60+ days)',
      'Commercial appraisals are expensive ($3,000–$10,000)',
    ],
    relatedStrategies: ['cash-flow', 'appreciation'],
    relatedCalculator: '/calculators/rental-cashflow',
    sortOrder: 9,
    heroContent:
      'Commercial real estate loans cover a wide spectrum of products for properties with 5+ units or non-residential uses. The gold standard for multifamily is Fannie Mae Small Balance Loans (SBL) and Freddie Mac Small Balance Loans — agency-backed debt with the best rates and longest terms. For investors scaling from 4-plexes to apartment buildings, understanding the commercial lending landscape is essential. The underwriting shifts from personal income (residential) to property-level analysis (commercial) — cap rates, NOI, occupancy history, and market comparables drive the decision.',
    faqs: [
      {
        question: 'When does a loan become "commercial" vs. "residential"?',
        answer: 'The line is at 5 units. Properties with 1-4 residential units are underwritten as residential loans. Properties with 5+ units, or any non-residential use (retail, office, industrial), are commercial loans with different underwriting, documentation, and terms.',
      },
      {
        question: 'What is agency debt?',
        answer: 'Agency debt refers to loans backed by Fannie Mae or Freddie Mac for multifamily properties (5+ units). These offer the best rates, longest terms (up to 30 years), and non-recourse options. Fannie Mae Small Balance Loans (SBL) start at $750K and are the most popular product for investors scaling into apartments.',
      },
    ],
    metaTitle: 'Best Commercial Real Estate Lenders 2026 | ProInvestorHub',
    metaDescription:
      'Compare commercial real estate lenders for multifamily and investment properties. Agency debt, CMBS, bank loans. Expert reviews for 5+ unit investors.',
  },
  {
    name: 'Bank Statement Loans',
    slug: 'bank-statement-loans',
    shortName: 'Bank Statement',
    category: 'specialty',
    description:
      'Non-QM loans that use 12–24 months of bank statements instead of tax returns to verify income. Designed for self-employed investors and business owners whose tax returns understate their actual income.',
    typicalRateRange: '7.0%–9.5%',
    typicalLtvRange: '75%–80%',
    typicalTermRange: '30-year fixed or ARM',
    typicalMinCredit: '660–700',
    bestFor: [
      'Self-employed investors and business owners',
      'Investors who maximize tax deductions (write-offs reduce taxable income)',
      'Borrowers whose tax returns don\'t reflect their true cash flow',
    ],
    pros: [
      'No tax returns required',
      '12 or 24-month bank statements prove income',
      'Self-employed income calculated more favorably',
      'Available for both primary residence and investment properties',
    ],
    cons: [
      'Higher rates than conventional (1–3% premium)',
      'Requires consistent deposits over 12–24 months',
      'Higher credit score requirements',
      'Not all lenders offer investment property bank statement programs',
    ],
    relatedStrategies: ['cash-flow', 'appreciation'],
    relatedCalculator: '/calculators/mortgage',
    sortOrder: 10,
    heroContent:
      'Bank statement loans solve a real problem for entrepreneurial real estate investors: your tax returns make it look like you earn less than you actually do. As a business owner, you rightfully deduct expenses, depreciation, and retirement contributions — but those deductions reduce your qualifying income on paper. Bank statement loans bypass tax returns entirely, using 12–24 months of business or personal bank deposits to calculate your income. For self-employed investors who know they can afford the payment but can\'t prove it with Schedule C, this product is a game-changer.',
    faqs: [
      {
        question: 'How do bank statement lenders calculate my income?',
        answer: 'Lenders total your deposits over 12 or 24 months of bank statements, then apply an expense factor (typically 50% for business accounts, meaning they count 50% of deposits as income). Personal bank statements may use a higher income percentage. The calculated income is then used in a standard DTI calculation.',
      },
    ],
    metaTitle: 'Best Bank Statement Lenders for Investors 2026 | ProInvestorHub',
    metaDescription:
      'Compare bank statement loan lenders for self-employed real estate investors. No tax returns needed. 12-24 month statements qualify you. Expert reviews.',
  },
  {
    name: 'Private Money Loans',
    slug: 'private-money-loans',
    shortName: 'Private Money',
    category: 'specialty',
    description:
      'Loans from individual private investors, family offices, or small funds — outside the institutional lending system. The most flexible financing available, with terms negotiated directly between borrower and lender.',
    typicalRateRange: '8%–15%',
    typicalLtvRange: '50%–75%',
    typicalTermRange: 'Negotiable (6 months–5 years)',
    typicalMinCredit: 'Negotiable',
    bestFor: [
      'Investors with established personal networks',
      'Deals that don\'t fit institutional guidelines',
      'Creative financing structures',
      'Experienced investors who can negotiate favorable terms',
    ],
    pros: [
      'Maximum flexibility — all terms are negotiable',
      'Speed — private lenders can close in days',
      'No institutional underwriting requirements',
      'Relationship-based — repeat deals get better terms',
      'Creative structures possible (interest-only, profit splits, equity participation)',
    ],
    cons: [
      'Finding reliable private lenders takes time and networking',
      'Less standardized — each deal is custom',
      'Higher risk of predatory terms for inexperienced borrowers',
      'No consumer protection regulations apply',
      'Lender may not have reserves to fund consistently',
    ],
    relatedStrategies: ['fix-flip', 'brrrr', 'wholesale'],
    relatedCalculator: '/calculators/fix-flip',
    sortOrder: 11,
    heroContent:
      'Private money is the original form of real estate lending — one person with capital lending to another person with a deal. Unlike institutional hard money lenders with standardized products, private money terms are entirely negotiable between you and the lender. Rates, LTV, term, interest type, and even profit-sharing arrangements are all on the table. The best private money relationships develop over time: you bring consistent, profitable deals, the lender provides reliable capital, and both sides benefit. Finding private money lenders typically happens through real estate investing clubs, networking events, and existing professional relationships.',
    faqs: [
      {
        question: 'Where do I find private money lenders?',
        answer: 'The best sources: local real estate investor associations (REIAs), BiggerPockets meetups, your existing professional network (attorneys, CPAs, dentists, engineers), and self-directed IRA custodians who connect investors seeking higher returns with borrowers seeking capital. Many private lenders are retired professionals looking for better returns than the stock market.',
      },
      {
        question: 'How is private money different from hard money?',
        answer: 'Private money comes from individuals lending their own capital. Hard money comes from companies or funds that aggregate capital and lend it at scale with standardized products. Private money is more flexible but less predictable; hard money is more expensive but more reliable and scalable.',
      },
    ],
    metaTitle: 'Finding Private Money Lenders for Real Estate 2026 | ProInvestorHub',
    metaDescription:
      'How to find and work with private money lenders for real estate investing. Negotiation tips, relationship building, and expert guidance from a lending veteran.',
  },
  {
    name: 'SBA Loans',
    slug: 'sba-loans',
    shortName: 'SBA',
    category: 'specialty',
    description:
      'Small Business Administration-backed loans (SBA 504 and 7(a)) for owner-occupied commercial real estate. Low down payments (10%) and competitive rates for investors who operate a business from the property.',
    typicalRateRange: '5.5%–8.0%',
    typicalLtvRange: '80%–90%',
    typicalTermRange: '10–25 years',
    typicalMinCredit: '680+',
    bestFor: [
      'Investors who will occupy 51%+ of the property',
      'Mixed-use property buyers (business + rental units)',
      'Self-storage, car wash, and similar owner-operated investments',
      'Investors who want the lowest down payment on commercial',
    ],
    pros: [
      'As low as 10% down payment',
      'Below-market interest rates (government-backed)',
      'Long terms (up to 25 years)',
      'Available for a wide range of commercial property types',
    ],
    cons: [
      'Must occupy 51%+ of the property',
      'Not for pure investment (non-owner-occupied) properties',
      'Extensive paperwork and slow closing (45–90 days)',
      'Personal guarantee required',
      'SBA fees add to closing costs',
    ],
    relatedStrategies: ['house-hacking'],
    relatedCalculator: '/calculators/mortgage',
    sortOrder: 12,
    heroContent:
      'SBA loans are the best-kept secret for real estate investors who also operate a business. If you\'ll occupy at least 51% of a commercial property (think: office with rental units above, or a mixed-use building where you run your business from the ground floor), SBA 504 and 7(a) loans offer unbeatable terms: 10% down, competitive rates, and up to 25-year terms. The catch is the owner-occupancy requirement and the paperwork-intensive process. But for the right deal structure, SBA financing provides leverage and terms that no other commercial loan product can match.',
    faqs: [
      {
        question: 'What\'s the difference between SBA 504 and SBA 7(a)?',
        answer: 'SBA 504 loans are specifically for real estate and large equipment purchases, with fixed rates and up to 25-year terms. They require a CDC (Certified Development Company) and have stricter requirements. SBA 7(a) loans are more flexible — they can be used for real estate, working capital, equipment, and more — but typically have variable rates and shorter terms.',
      },
    ],
    metaTitle: 'SBA Loans for Real Estate Investors 2026 | ProInvestorHub',
    metaDescription:
      'SBA 504 and 7(a) loans for owner-occupied commercial real estate. 10% down, competitive rates, 25-year terms. Requirements, pros/cons, and expert guidance.',
  },
]

export function getLoanTypeBySlug(slug: string): LoanTypeData | undefined {
  return loanTypes.find((lt) => lt.slug === slug)
}

export function getLoanTypesByCategory(category: LoanTypeCategory): LoanTypeData[] {
  return loanTypes.filter((lt) => lt.category === category).sort((a, b) => a.sortOrder - b.sortOrder)
}

export const loanTypeCategories: Array<{ value: LoanTypeCategory; label: string; description: string }> = [
  {
    value: 'long-term',
    label: 'Long-Term / Hold',
    description: 'Permanent financing for buy-and-hold rental properties',
  },
  {
    value: 'short-term',
    label: 'Short-Term / Acquisition',
    description: 'Fast financing for flips, rehabs, and bridge situations',
  },
  {
    value: 'transitional',
    label: 'Transitional / Hybrid',
    description: 'Bridge-to-permanent products for BRRRR and value-add strategies',
  },
  {
    value: 'specialty',
    label: 'Specialty',
    description: 'Commercial, SBA, bank statement, and private money products',
  },
]
