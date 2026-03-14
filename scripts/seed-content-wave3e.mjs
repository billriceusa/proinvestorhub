import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Set it in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2026-03-12',
  token,
  useCdn: false,
})

const authorRef = { _type: 'reference', _ref: 'author-bill-rice' }

// ── Helper: Portable Text block builders ─────────────
function h2(key, text) {
  return { _type: 'block', _key: key, style: 'h2', children: [{ _type: 'span', _key: key + 's', text }] }
}
function h3(key, text) {
  return { _type: 'block', _key: key, style: 'h3', children: [{ _type: 'span', _key: key + 's', text }] }
}
function p(key, text) {
  return { _type: 'block', _key: key, style: 'normal', children: [{ _type: 'span', _key: key + 's', text }] }
}
function bq(key, text) {
  return { _type: 'block', _key: key, style: 'blockquote', children: [{ _type: 'span', _key: key + 's', text }] }
}

// ══════════════════════════════════════════════════════
// POST 1: Seller Financing
// ══════════════════════════════════════════════════════
const sellerFinancing = {
  _type: 'post',
  title: 'Seller Financing: How to Buy Properties Without a Bank',
  slug: { _type: 'slug', current: 'seller-financing-real-estate' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-financing', _key: 'c1' },
  ],
  publishedAt: '2026-04-07T10:00:00Z',
  excerpt: 'How seller financing works, how to negotiate terms, and when it\'s the smartest way to acquire investment properties without traditional bank financing.',
  seo: {
    metaTitle: 'Seller Financing Real Estate: Complete Guide | ProInvestorHub',
    metaDescription: 'Learn how seller financing works in real estate, how to negotiate terms, and when to use owner financing to buy investment properties without a bank.',
  },
  body: [
    // Introduction
    p('sf01', 'Most real estate investors assume they need a bank to buy property. Apply for a mortgage, wait for underwriting, hope for approval, and close thirty to sixty days later — if everything goes smoothly. But there is another way to acquire investment properties that bypasses the entire traditional lending process: seller financing.'),
    p('sf02', 'Seller financing — also called owner financing or seller carry-back — is an arrangement where the property seller acts as the lender. Instead of getting a mortgage from a bank, the buyer makes payments directly to the seller according to terms they negotiate together. The seller holds the note, the buyer holds the deed, and the bank is completely out of the picture.'),
    p('sf03', 'This is not a fringe strategy used only by desperate buyers or distressed sellers. Seller financing is a legitimate, widely used tool that can benefit both parties when structured correctly. It gives buyers access to properties they might not qualify for through traditional lending, and it gives sellers advantages in pricing, taxes, and income that a cash sale cannot match.'),

    // What Is Seller Financing
    h2('sf04', 'What Is Seller Financing and How Does It Work?'),
    p('sf05', 'In a seller-financed transaction, the buyer and seller agree on a purchase price, down payment, interest rate, and repayment schedule — just like a traditional mortgage. The key difference is that the seller carries the note instead of a bank. The buyer signs a promissory note (the promise to repay) and a deed of trust or mortgage (the security instrument that gives the seller recourse if the buyer defaults). Title transfers to the buyer at closing, and the buyer makes monthly payments to the seller until the note is paid off or a balloon payment comes due.'),
    p('sf06', 'The mechanics are straightforward. At closing, the buyer provides a down payment, the seller transfers the deed, and both parties sign the promissory note detailing the loan terms. Payments are typically handled through a third-party loan servicing company that collects from the buyer, distributes to the seller, tracks the balance, and provides year-end tax documents. Using a servicer adds a small monthly fee — usually $20 to $35 — but eliminates disputes about payment history and provides professional record-keeping.'),
    p('sf07', 'From the buyer\'s perspective, the monthly experience is identical to having a traditional mortgage: you make a payment each month that covers principal and interest, you maintain insurance on the property, and you pay property taxes. The difference is that your lender is the person who sold you the property.'),

    // Why Sellers Agree
    h2('sf08', 'Why Sellers Agree to Carry Financing'),
    p('sf09', 'The most common question about seller financing is why any seller would agree to it. The answer is that seller financing offers several significant advantages that a traditional sale does not.'),
    h3('sf10', 'Installment Sale Tax Treatment'),
    p('sf11', 'When a seller receives the full purchase price at closing, the entire capital gain is taxable in that year. With seller financing, the IRS allows installment sale treatment under Section 453 of the tax code. This spreads the capital gains tax liability over the life of the note, so the seller pays taxes only on the principal received each year. For a seller with a large gain, this can save tens of thousands of dollars by keeping them in a lower tax bracket across multiple years rather than pushing them into the highest bracket in a single year.'),
    h3('sf12', 'Higher Sale Price'),
    p('sf13', 'Sellers who offer financing can often command a higher purchase price — typically 5 to 15 percent above market value. Buyers are willing to pay a premium for the convenience of avoiding bank qualification, the speed of closing, and the flexibility of negotiated terms. A seller who might get $200,000 in a traditional sale might get $215,000 or more with owner financing.'),
    h3('sf14', 'Interest Income Stream'),
    p('sf15', 'The seller earns interest on the financed amount, creating a monthly income stream that can be significantly higher than what they would earn investing the sale proceeds in bonds, CDs, or savings accounts. At 7 percent interest on a $180,000 note, the seller earns $12,600 per year in interest — far better than the 4 to 5 percent they might get from traditional fixed-income investments.'),
    h3('sf16', 'Faster Closing'),
    p('sf17', 'Without bank involvement, closings can happen in as little as one to two weeks instead of the typical 30 to 60 days. There is no appraisal requirement (unless the buyer wants one), no underwriting process, and no risk of the deal falling through because of a denied loan application. For sellers who want certainty and speed, this is a major advantage.'),

    // Deal Structure Options
    h2('sf18', 'Deal Structure Options'),
    p('sf19', 'Seller financing is remarkably flexible. Unlike bank loans that come in standardized packages, seller-financed deals can be structured in almost any way that both parties agree to. Here are the most common structures.'),
    h3('sf20', 'Fully Amortized Notes'),
    p('sf21', 'A fully amortized note works just like a traditional mortgage. The buyer makes equal monthly payments over a set term — typically 15 to 30 years — and the note is completely paid off at the end of the term. This provides the most predictable payment schedule for the buyer and the longest income stream for the seller. Fully amortized notes are most common when the seller is retired and wants steady income for the long term.'),
    h3('sf22', 'Balloon Payment Notes'),
    p('sf23', 'Balloon notes are the most common structure in seller financing. The payments are calculated based on a long amortization schedule (usually 20 to 30 years) to keep the monthly payment affordable, but the remaining balance comes due as a lump sum — the balloon — after a shorter term, typically 3 to 10 years. For example, a note might have payments based on a 30-year amortization but require the full remaining balance to be paid in 5 years. At that point, the buyer either refinances into a traditional mortgage, sells the property, or negotiates a new note with the seller.'),
    h3('sf24', 'Interest-Only Notes'),
    p('sf25', 'With an interest-only note, the buyer pays only interest for a set period — no principal reduction. This creates the lowest possible monthly payment and maximizes cash flow for the buyer. Interest-only periods typically last 1 to 5 years, after which the note converts to fully amortizing payments or comes due as a balloon. Sellers like interest-only notes because they receive the maximum interest income; buyers like them because the low payments maximize cash flow during the early ownership period.'),
    h3('sf26', 'Wrap-Around Mortgages'),
    p('sf27', 'A wrap-around mortgage — or "wrap" — is used when the seller has an existing mortgage on the property. The seller creates a new note to the buyer for the full purchase price (wrapping around the existing mortgage), and the buyer\'s payments to the seller cover both the new note and the seller\'s underlying mortgage. The seller profits from the interest rate spread: if the existing mortgage is at 4 percent and the wrap note is at 7 percent, the seller earns the 3 percent difference on the underlying balance. Wraps require careful structuring because most mortgages contain due-on-sale clauses that technically allow the original lender to call the loan if the property is transferred.'),

    // How to Negotiate Terms
    h2('sf28', 'How to Negotiate Seller Financing Terms'),
    p('sf29', 'Negotiating seller financing is fundamentally different from negotiating a purchase price. In a traditional sale, price is the primary variable. In seller financing, you are negotiating five or more variables simultaneously: price, down payment, interest rate, term, balloon timeline, and various protective clauses. The art of negotiation is finding the combination that works for both sides.'),
    h3('sf30', 'Interest Rate'),
    p('sf31', 'Seller financing interest rates are typically 1 to 3 percent above prevailing market mortgage rates. If banks are offering 7 percent, expect seller financing rates of 8 to 10 percent. The premium compensates the seller for the risk of acting as a lender and for the illiquidity of having their capital tied up in a note. However, rates are fully negotiable — a seller who is more motivated to sell or who values the tax benefits of an installment sale may accept a lower rate.'),
    h3('sf32', 'Down Payment'),
    p('sf33', 'Down payments in seller financing typically range from 5 to 20 percent. The down payment serves two purposes: it gives the seller immediate cash and it ensures the buyer has skin in the game, reducing the risk of default. Some sellers will accept less than 10 percent down if the property has been on the market a long time or if the buyer has strong credentials. Others require 20 percent or more, especially if the property is free and clear and they want to minimize risk.'),
    h3('sf34', 'Balloon Timeline'),
    p('sf35', 'The balloon payment timeline is one of the most critical terms to negotiate. A 3-year balloon gives the buyer less time to build equity, improve credit, or season the loan for refinancing. A 7 to 10-year balloon provides much more breathing room. As a buyer, push for the longest balloon period the seller will accept — ideally 7 years or more. Make sure you have a realistic plan for how you will pay off the balloon when it comes due.'),
    h3('sf36', 'Prepayment and Due-on-Sale'),
    p('sf37', 'Negotiate for no prepayment penalty so you can refinance or pay off the note early without fees. Some sellers will request a prepayment penalty during the first 2 to 3 years to ensure they receive a minimum period of interest income. Due-on-sale clauses give the seller the right to call the note due if you transfer the property. If you plan to hold the property in an LLC or transfer it later, negotiate for no due-on-sale clause or for specific permitted transfers.'),

    // Seller Financing vs. Subject-To
    h2('sf38', 'Seller Financing vs. Subject-To Deals'),
    p('sf39', 'Seller financing and subject-to deals are both creative financing strategies that avoid traditional bank loans, but they work in fundamentally different ways. In seller financing, the seller creates a new note — there is no existing mortgage involved (unless it is a wrap). In a subject-to deal, the buyer takes over the seller\'s existing mortgage payments without formally assuming the loan. The mortgage stays in the seller\'s name, but the buyer takes title to the property.'),
    p('sf40', 'Subject-to deals are most useful when the seller\'s existing mortgage has a below-market interest rate that would be valuable to preserve. If a seller has a 3 percent mortgage from 2021 and current rates are 7 percent, taking over that mortgage subject-to saves the buyer thousands per year in interest. Seller financing makes more sense when the seller owns the property free and clear or when the buyer wants to negotiate completely custom terms.'),
    p('sf41', 'The key risk with subject-to deals is the due-on-sale clause in the existing mortgage. If the original lender discovers the transfer, they can technically call the entire loan balance due immediately. While lenders rarely exercise this right as long as payments are current, it remains a real risk that buyers must understand and accept. Seller financing avoids this issue entirely because the new note is created specifically for the transaction.'),

    // Worked Example
    h2('sf42', 'Worked Example: Seller Financing in Action'),
    p('sf43', 'Let us walk through a realistic seller-financed deal to see how the numbers work. You find a rental property listed at $200,000. The seller owns it free and clear and is open to financing.'),
    p('sf44', 'You negotiate the following terms: purchase price of $200,000, down payment of $20,000 (10 percent), interest rate of 7 percent, 30-year amortization with a 5-year balloon, and no prepayment penalty. The financed amount is $180,000.'),
    p('sf45', 'Your monthly payment (principal and interest) on $180,000 at 7 percent over 30 years is $1,197.54. The property rents for $1,800 per month. After your mortgage payment of $1,197.54, property taxes of $167, insurance of $100, and maintenance reserves of $150, your monthly cash flow is $185.46. That is a cash-on-cash return of 11.1 percent on your $20,000 down payment.'),
    p('sf46', 'After 5 years when the balloon comes due, your remaining balance is approximately $167,000. At that point, you have built equity from both principal paydown and appreciation. If the property has appreciated 3 percent per year, it is now worth approximately $232,000 — meaning you have $65,000 in equity. You refinance the $167,000 balloon with a traditional mortgage, pocket the cash flow for the next 25 years, and repeat the strategy with another property.'),
    bq('sf47', 'Key Numbers: $20K down, $1,197/mo payment, $185/mo cash flow, 11.1% cash-on-cash return, $167K balloon at year 5.'),

    // Risks and Mitigation
    h2('sf48', 'Risks and How to Mitigate Them'),
    p('sf49', 'Seller financing carries risks for both the buyer and the seller. Understanding these risks and knowing how to mitigate them is essential to structuring deals that work.'),
    h3('sf50', 'Balloon Refinance Risk'),
    p('sf51', 'The biggest risk for buyers is the balloon payment. If you cannot refinance when the balloon comes due — because of poor credit, declining property values, or tight lending markets — you could lose the property. Mitigate this risk by negotiating the longest possible balloon period (7 to 10 years), maintaining good credit, building equity through improvements, and including a clause that allows you to extend the balloon period for an additional 1 to 2 years if needed.'),
    h3('sf52', 'Title Issues'),
    p('sf53', 'Always get title insurance on a seller-financed purchase, just as you would with a traditional sale. Verify that the seller actually owns the property free and clear (or that any existing mortgages are properly addressed). Use a title company or real estate attorney to handle the closing and ensure the deed and deed of trust are properly recorded.'),
    h3('sf54', 'Insurance and Escrow'),
    p('sf55', 'Both parties should insist on proper hazard insurance and, if applicable, flood insurance. Consider setting up an escrow account for taxes and insurance so the seller has confidence that these obligations are being met. A lapse in insurance or unpaid property taxes can jeopardize the entire arrangement.'),

    // Legal Considerations
    h2('sf56', 'Legal Considerations'),
    p('sf57', 'Seller financing is regulated at both the federal and state level, and understanding the legal framework is critical to structuring a compliant deal.'),
    h3('sf58', 'Dodd-Frank Act Implications'),
    p('sf59', 'The Dodd-Frank Wall Street Reform and Consumer Protection Act of 2010 imposed new requirements on seller financing. However, it includes important exemptions for property sellers. If you are a natural person (not an entity) selling a property you own, you can provide seller financing on up to three properties per year without being classified as a loan originator — provided the loan has a fixed or adjustable rate (no negative amortization), the loan is fully amortizing (or has a balloon of 5 or more years), and you have made a reasonable, good-faith determination that the buyer can repay the loan.'),
    p('sf60', 'If the property is your primary residence, the exemption is even broader — there are no balloon restrictions, and you only need to originate one such loan per year. For investors financing multiple properties per year or for entities providing seller financing, the requirements are stricter and may require a mortgage loan originator license.'),
    h3('sf61', 'SAFE Act Compliance'),
    p('sf62', 'The Secure and Fair Enforcement for Mortgage Licensing Act (SAFE Act) requires individuals who regularly engage in mortgage lending to be licensed. Occasional seller financing typically falls outside these requirements, but if you make it a regular business practice to sell properties with owner financing, consult with a real estate attorney about state-specific licensing requirements.'),
    h3('sf63', 'Use a Real Estate Attorney'),
    p('sf64', 'Every seller-financed deal should involve a real estate attorney — for both the buyer and the seller. The attorney drafts the promissory note, ensures the deed of trust or mortgage is properly structured and recorded, reviews the terms for legal compliance, and protects both parties\' interests. The cost of an attorney — typically $500 to $1,500 — is trivial compared to the risks of a poorly documented deal that could result in litigation, lost property, or regulatory penalties.'),
    p('sf65', 'Seller financing is one of the most powerful tools in the creative financing toolkit. It opens doors that bank financing keeps closed, creates win-win scenarios for buyers and sellers, and gives investors the flexibility to structure deals that truly work for their investment goals. Master this strategy and you will never be limited by what a bank is willing to lend.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: How to Screen Tenants
// ══════════════════════════════════════════════════════
const tenantScreening = {
  _type: 'post',
  title: 'How to Screen Tenants: The Complete Checklist for Landlords',
  slug: { _type: 'slug', current: 'how-to-screen-tenants' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-beginner', _key: 'c1' },
  ],
  publishedAt: '2026-04-10T10:00:00Z',
  excerpt: 'Professional tenant screening reduces eviction rates from 15.8% to 4.1%. Here\'s the complete checklist every landlord needs.',
  seo: {
    metaTitle: 'Tenant Screening Checklist 2026: How to Screen Tenants | ProInvestorHub',
    metaDescription: 'Complete tenant screening checklist for landlords. Learn the 7-step process, red flags to watch for, Fair Housing compliance, and top screening services for 2026.',
  },
  body: [
    // Introduction
    p('ts01', 'The difference between a profitable rental property and a financial nightmare almost always comes down to one thing: who you put in it. A great property with a terrible tenant will drain your bank account, consume your time, and make you question why you ever became a landlord. A modest property with a great tenant will quietly generate income month after month with minimal hassle.'),
    p('ts02', 'The numbers back this up. Professional tenant screening reduces eviction rates from 15.8 percent to 4.1 percent — a 74 percent improvement. Screened tenants stay an average of 24 or more months compared to 8 to 14 months for unscreened placements. And the average eviction costs $3,500 to $10,000 when you factor in lost rent, legal fees, court costs, unit turnover, and the stress that no spreadsheet can quantify.'),
    p('ts03', 'Tenant screening is not about being picky for the sake of being picky. It is about applying consistent, legal, documented criteria to every applicant so you find tenants who will pay rent on time, take care of your property, and fulfill the terms of their lease. This guide covers the complete screening process from application to move-in.'),

    // Why Screening Matters
    h2('ts04', 'Why Tenant Screening Matters More Than You Think'),
    p('ts05', 'Most new landlords underestimate the cost of a bad tenant. They focus on the obvious expense — unpaid rent — but that is often the smallest part of the damage. A single eviction can cost $3,500 on the low end and more than $10,000 on the high end when you add up lost rent during the eviction process (often 2 to 4 months), attorney fees and court costs, sheriff service and lockout fees, unit damage beyond the security deposit, cleaning and turnover costs, and vacancy while you find the next tenant.'),
    p('ts06', 'Beyond the direct financial costs, a bad tenant creates time costs and emotional costs that compound over months. Chasing late payments, dealing with noise complaints from neighbors, documenting lease violations, and navigating the eviction process can consume dozens of hours and create significant stress. Professional landlords know that the 45 to 60 minutes spent thoroughly screening an applicant saves hundreds of hours dealing with problems downstream.'),
    p('ts07', 'The goal of screening is not to find the perfect tenant — that person does not exist. The goal is to identify tenants who have a demonstrated pattern of paying their obligations on time, treating rental property with respect, and maintaining stable employment and income. Past behavior is the single best predictor of future behavior, and that is exactly what a thorough screening process reveals.'),

    // The 7-Step Screening Process
    h2('ts08', 'The 7-Step Tenant Screening Process'),

    h3('ts09', 'Step 1: The Rental Application'),
    p('ts10', 'Every prospective tenant must complete a written rental application. No exceptions. The application collects the information you need to verify their identity, income, rental history, and background. A thorough application includes full legal name and date of birth, Social Security number (for credit and background checks), current and previous addresses for the last 3 to 5 years, current employer and income, emergency contact information, vehicle information (if applicable), authorization to run credit and background checks, and references from current and previous landlords.'),
    p('ts11', 'Use the same application for every applicant and keep it on file regardless of whether you approve or deny the applicant. Consistency in your process is critical for Fair Housing compliance. Many landlords use digital applications through platforms like Avail, TurboTenant, or RentRedi, which streamline the process and automatically generate screening reports.'),

    h3('ts12', 'Step 2: Credit Check'),
    p('ts13', 'A credit check reveals how the applicant handles their financial obligations. You are looking at two things: the credit score and the credit history. A score above 650 is generally considered acceptable for most rental markets. A score between 600 and 650 may be acceptable with other strong factors (excellent rental history, high income). Below 600 is a red flag that requires careful evaluation.'),
    p('ts14', 'Beyond the score, examine the credit report for patterns. Look for collections accounts (especially from previous landlords or utility companies), recent late payments, high credit utilization, recent bankruptcy or foreclosure, and the overall trajectory — is credit improving or declining? A tenant with a 620 score that is trending upward with recent on-time payments is often a better risk than someone with a 680 score that is declining with new collections.'),

    h3('ts15', 'Step 3: Criminal Background Check'),
    p('ts16', 'A criminal background check helps identify potential safety risks. Run checks at the county, state, and national levels for comprehensive coverage. When evaluating results, focus on the nature, severity, and recency of any offenses. A 15-year-old misdemeanor is very different from a recent felony conviction. Many jurisdictions have specific laws about how criminal history can be used in housing decisions — some cities and states have "ban the box" laws that limit or prohibit blanket criminal history disqualifications. Know your local regulations.'),
    p('ts17', 'HUD guidance requires that criminal history screening criteria be applied consistently and have a legitimate business justification. Blanket policies that automatically deny anyone with any criminal history may violate Fair Housing laws if they have a disparate impact on protected classes. Instead, use individualized assessments that consider the nature and severity of the offense, time elapsed since the offense, and evidence of rehabilitation.'),

    h3('ts18', 'Step 4: Income Verification'),
    p('ts19', 'The standard income requirement is gross monthly income of at least three times the monthly rent. If rent is $1,500, the tenant should earn at least $4,500 per month before taxes. This ratio provides enough cushion for the tenant to cover rent plus their other living expenses without financial strain. Verify income through recent pay stubs (at least 2 to 3 months), W-2 forms or tax returns for the most recent year, bank statements showing consistent deposits, and an employment verification letter or direct contact with the employer.'),
    p('ts20', 'For self-employed applicants, request two years of tax returns and current bank statements. Self-employed income can fluctuate, so look at the average over time rather than a single month. For applicants with non-traditional income (investments, retirement, disability), request documentation showing consistent, reliable income that meets the 3x threshold.'),

    h3('ts21', 'Step 5: Rental History Verification'),
    p('ts22', 'Contact the applicant\'s last two landlords — not just the current one. The current landlord may give a glowing reference simply to get a problem tenant out of their property. The previous landlord has no incentive to be anything other than honest. Ask specific questions: Did the tenant pay rent on time? Did they give proper notice before moving out? Was there any damage beyond normal wear and tear? Were there any lease violations or complaints? Would you rent to this tenant again?'),
    p('ts23', 'Verify that the landlord you are speaking with is actually the landlord. Cross-reference the phone number with property records or the lease agreement. It is increasingly common for applicants to provide a friend or family member as a fake landlord reference. Search the property address to confirm ownership records match the person you are contacting.'),

    h3('ts24', 'Step 6: Employment Verification'),
    p('ts25', 'Call the employer directly using a phone number you independently verify — not the number the applicant provides. Confirm the applicant\'s position, length of employment, and income. Many large employers will only confirm employment dates and job title (not salary) through their HR department, which is why pay stubs and tax returns are essential backup documentation. For applicants who have recently changed jobs, verify both the current and previous employer.'),

    h3('ts26', 'Step 7: In-Person or Video Interview'),
    p('ts27', 'A brief conversation with the applicant — either in person during a showing or via video call — provides context that paperwork cannot. You are not interrogating the applicant; you are having a normal conversation about their housing needs. Ask open-ended questions: Why are you moving? How long do you plan to stay? What do you do for work? How many people will be living in the unit? Do you have any pets? Listen for consistency with the information on their application. Evasiveness, contradictions, or reluctance to answer basic questions are worth noting.'),

    // Red Flags Checklist
    h2('ts28', 'Red Flags to Watch For'),
    p('ts29', 'Through years of collective landlord experience, certain patterns consistently predict problem tenancies. While no single red flag is necessarily disqualifying, multiple red flags should give you serious pause.'),
    p('ts30', 'Financial red flags include credit scores below 600, multiple collections accounts (especially from landlords or utilities), income below 3 times rent with no co-signer, frequent job changes with no upward trajectory, and a pattern of late payments across multiple accounts.'),
    p('ts31', 'Rental history red flags include multiple evictions (even one is concerning), gaps in rental history that cannot be explained, prior landlords who say they would not rent to the applicant again, a pattern of moving every 6 to 12 months, and previous units left with significant damage.'),
    p('ts32', 'Behavioral red flags include reluctance to provide documentation or complete the application fully, excessive urgency to move in immediately (which can indicate an eviction in progress), providing fake references or inconsistent information, attempting to negotiate screening criteria or skip steps, and AI-generated fake references or fabricated employment verification — an emerging issue in 2026 where applicants use artificial intelligence to create convincing but fraudulent verification documents and phone recordings.'),

    // Fair Housing Compliance
    h2('ts33', 'Fair Housing Compliance'),
    p('ts34', 'Fair Housing compliance is not optional and it is not difficult — but it requires intentionality. The Fair Housing Act prohibits discrimination based on seven federal protected classes: race, color, national origin, religion, sex (including sexual orientation and gender identity), familial status (families with children), and disability. Many state and local laws add additional protected classes such as source of income, marital status, age, or veteran status.'),
    p('ts35', 'The key principle is consistency. Apply the same screening criteria to every applicant, document your criteria in writing before you begin accepting applications, and keep records of every application and your decision. Never ask about protected characteristics during the screening process — questions about family composition should be limited to the number of occupants (for occupancy standards), not whether an applicant has children or is pregnant. Questions about disability should never be asked; you are required to make reasonable accommodations when requested.'),
    p('ts36', 'Document everything. Keep applications, screening reports, and notes on file for at least 3 to 5 years (check your state requirements). If an applicant is denied, provide an adverse action notice that states the specific reasons for denial based on your documented criteria. This protects you legally and demonstrates that your decisions are based on legitimate, non-discriminatory factors.'),

    // Best Screening Services 2026
    h2('ts37', 'Best Tenant Screening Services in 2026'),
    p('ts38', 'Several services can run credit, criminal, and eviction checks on your behalf. Here are the most popular options for landlords and small-scale investors.'),
    h3('ts39', 'RentPrep'),
    p('ts40', 'RentPrep is known for its manual verification process — real people review the results and flag inconsistencies rather than relying entirely on automated reports. This makes their reports among the most accurate in the industry. Reports cost $21 to $38 per applicant depending on the package. RentPrep is the best choice for landlords who want the most reliable screening data.'),
    h3('ts41', 'TransUnion SmartMove'),
    p('ts42', 'SmartMove by TransUnion is one of the most popular services because it offers a tenant-paid option — the applicant pays for their own screening, which removes cost as a barrier for landlords. Reports include credit, criminal, and eviction history. The ResidentScore (a rental-specific credit score) provides a more relevant risk assessment than a standard FICO score. Reports cost $25 to $40 depending on the package.'),
    h3('ts43', 'Avail'),
    p('ts44', 'Avail (now part of Realtor.com) offers a free basic screening tier that includes a credit report and background check. The free tier has some limitations, but it is excellent for landlords just starting out or managing a small number of units. Paid plans unlock additional features including online rent collection, maintenance tracking, and state-specific lease templates.'),
    h3('ts45', 'Experian RentBureau'),
    p('ts46', 'Experian RentBureau specifically tracks rental payment history — a data point that standard credit reports often miss. If your applicant has been paying rent on time for years but does not have much other credit history, RentBureau data can provide the verification you need. This is particularly useful for screening younger tenants or immigrants who may have limited traditional credit history.'),

    // The Screening Workflow
    h2('ts47', 'The Complete Screening Workflow'),
    p('ts48', 'Having a documented, repeatable screening workflow ensures consistency and protects you from Fair Housing complaints. Here is the process from first inquiry to signed lease.'),
    p('ts49', 'First, pre-screen with your listing. Include your key criteria in the listing itself — monthly rent, income requirements, credit score minimum, pet policy, and any other non-negotiable standards. This allows applicants to self-select and reduces the number of unqualified applications you receive. Second, collect the application and application fee. Application fees should cover the actual cost of screening — typically $25 to $50. Some states cap application fees, so check your local regulations. Third, run all screening checks simultaneously — credit, criminal, eviction, income verification, and landlord references. Most screening services return results within 24 to 48 hours.'),
    p('ts50', 'Fourth, evaluate the results against your documented criteria. Apply the same standards to every applicant. Fifth, notify the applicant of your decision. If approved, provide the lease and move-in instructions. If denied, send an adverse action notice that includes the specific reasons for denial and information about the screening company used (as required by the Fair Credit Reporting Act). Sixth, keep all records on file for at least 3 to 5 years.'),

    // Screening for Different Strategies
    h2('ts51', 'Screening for Different Rental Strategies'),
    h3('ts52', 'Short-Term Rental Guests'),
    p('ts53', 'If you operate short-term rentals on platforms like Airbnb or VRBO, formal tenant screening is not practical for each guest. Instead, rely on platform reviews, verified identity, and house rules. Set clear expectations in your listing, require government ID verification through the platform, and use security deposits or damage protection programs. For direct bookings outside of platforms, consider a simplified screening that includes identity verification, a rental agreement, and a security deposit.'),
    h3('ts54', 'Mid-Term Rental Tenants'),
    p('ts55', 'Mid-term rentals (30 to 90 day stays) often attract traveling nurses, corporate relocations, and insurance displacement tenants. These tenants should be screened similarly to long-term tenants, but you may adjust your criteria — for example, accepting employment verification from a staffing agency for a traveling nurse instead of a traditional employer. Mid-term tenants often have excellent payment histories because their housing is frequently employer-subsidized or insurance-funded.'),
    h3('ts56', 'Section 8 Screening'),
    p('ts57', 'If you accept Section 8 (Housing Choice Vouchers), you cannot discriminate against applicants based on their source of income in many jurisdictions. You can and should screen Section 8 applicants using the same criteria you apply to all other applicants — credit, criminal background, rental history, and the tenant\'s portion of the rent relative to their income. The housing authority pays its portion directly to you, so your screening focuses on the tenant\'s ability and willingness to pay their share consistently.'),
    p('ts58', 'Tenant screening is a skill that improves with practice. Your first few screenings may feel awkward or overly time-consuming, but as you refine your process and develop your checklist, you will be able to evaluate applicants efficiently and confidently. The time you invest in screening is always less than the time you would spend dealing with the consequences of placing an unscreened tenant. Screen every applicant, apply your criteria consistently, document everything, and trust the process.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 3: STR vs LTR Rental Strategy
// ══════════════════════════════════════════════════════
const strVsLtr = {
  _type: 'post',
  title: 'Short-Term vs. Long-Term Rentals: Which Strategy Is Right for You?',
  slug: { _type: 'slug', current: 'str-vs-ltr-rental-strategy' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-strategies', _key: 'c1' },
  ],
  publishedAt: '2026-04-14T10:00:00Z',
  excerpt: 'A head-to-head comparison of short-term and long-term rental strategies — including the mid-term rental option most investors overlook.',
  seo: {
    metaTitle: 'STR vs LTR: Short-Term vs Long-Term Rental Comparison | ProInvestorHub',
    metaDescription: 'Compare short-term rentals (Airbnb) vs long-term rentals side by side. Includes financial modeling, tax differences, regulatory risks, and the mid-term rental alternative.',
  },
  body: [
    // Introduction
    p('sl01', 'Every rental property investor faces the same fundamental question: should you rent your property short-term (nightly or weekly on platforms like Airbnb and VRBO), long-term (annual leases to traditional tenants), or something in between? The answer depends on your financial goals, available time, local regulations, and risk tolerance.'),
    p('sl02', 'The short-term rental explosion of the past decade has created enormous wealth for many investors — and enormous headaches for others. Long-term rentals remain the backbone of most real estate portfolios because of their simplicity and predictability. And a third option — mid-term rentals — has quietly become one of the most attractive strategies available.'),
    p('sl03', 'This guide puts all three strategies side by side so you can make an informed decision based on data, not hype. We will model the same property under each strategy, compare the expenses, analyze the tax implications, and give you a framework for choosing the right approach for your situation.'),

    // STR vs LTR at a Glance
    h2('sl04', 'STR vs. LTR at a Glance'),
    p('sl05', 'Before we dive into the details, here is a high-level comparison of short-term and long-term rental strategies across six key dimensions.'),
    p('sl06', 'Revenue potential: STRs can generate 2 to 3 times the gross revenue of an LTR in the right market and at the right occupancy level. LTRs provide lower but more predictable revenue. Effort level: STRs require significantly more hands-on management — guest communication, cleaning coordination, pricing optimization, restocking supplies, and handling reviews. LTRs are comparatively passive, especially with a property manager. Vacancy risk: STRs face seasonal fluctuations and can see occupancy drop below 50 percent in off-season months. LTRs with proper screening typically maintain 95 percent or higher occupancy.'),
    p('sl07', 'Startup costs: STRs require $10,000 to $20,000 or more in furnishings, decor, photography, and supplies before the first guest arrives. LTRs require minimal setup beyond basic habitability. Scalability: STRs become increasingly difficult to manage at scale without a team or co-host. LTRs scale more easily with professional property management at 8 to 10 percent of rent. Regulatory risk: STRs face increasing regulation in many cities — licensing requirements, occupancy limits, primary residence restrictions, and outright bans. LTRs face minimal regulatory risk beyond standard landlord-tenant law.'),

    // Financial Comparison
    h2('sl08', 'Financial Comparison: Same Property, Different Strategies'),
    p('sl09', 'Let us model a $250,000 property in a mid-sized market that works for either strategy. This comparison uses realistic assumptions for 2026.'),
    h3('sl10', 'Short-Term Rental Model'),
    p('sl11', 'Average nightly rate: $200. Occupancy rate: 70 percent (255 nights per year). Gross revenue: $51,000 per year. Operating expenses for an STR include cleaning fees ($75 per turnover, roughly 200 turnovers per year: $15,000), platform fees (Airbnb takes 3 percent of host payout plus guests pay a service fee: approximately $1,530), utilities paid by owner ($300 per month: $3,600), supplies and restocking ($200 per month: $2,400), higher insurance premium ($2,000 per year versus $1,200 for LTR), property management or co-host fees (20 to 25 percent if outsourced: $10,200 at 20 percent), and maintenance and repairs ($3,000 per year). Total operating expenses: approximately $37,730. Net operating income before mortgage: approximately $13,270.'),
    p('sl12', 'However, many STR operators self-manage to keep the 20 percent co-host fee. Without that $10,200 cost, net operating income rises to $23,470. The trade-off is that self-managing an STR is essentially a part-time job requiring 15 to 25 hours per week for guest communication, turnover coordination, pricing adjustments, maintenance, and review management.'),

    h3('sl13', 'Long-Term Rental Model'),
    p('sl14', 'Monthly rent: $1,500. Occupancy rate: 95 percent (11.4 months per year). Gross revenue: $17,100 per year. Operating expenses for an LTR include property management (10 percent: $1,710), insurance ($1,200 per year), maintenance and repairs ($2,000 per year), vacancy cost (already factored into 95 percent occupancy), and turnover costs ($500 per occurrence, roughly once every 2 years: $250 per year). Total operating expenses: approximately $5,160. Net operating income before mortgage: approximately $11,940.'),
    p('sl15', 'The LTR generates $11,940 per year in net operating income with minimal effort and very predictable cash flow. The managed STR generates $13,270 — only $1,330 more, with dramatically more complexity, higher risk, and greater startup costs. The self-managed STR generates $23,470 but requires significant time investment. This is why the STR versus LTR decision is not purely about revenue — it is about what you are optimizing for.'),

    // Expense Comparison
    h2('sl16', 'Expense Deep Dive'),
    p('sl17', 'The expense profiles of STRs and LTRs are fundamentally different, and understanding these differences is critical to making an accurate comparison.'),
    h3('sl18', 'Furnishing and Setup Costs'),
    p('sl19', 'An STR requires complete furnishing — beds, sofas, dining tables, kitchen equipment, linens, towels, decor, artwork, outdoor furniture, and all the small touches guests expect. A quality furnishing budget for a 2-bedroom property runs $10,000 to $20,000 depending on the market and your aesthetic standards. Professional photography adds $200 to $500. An LTR typically rents unfurnished, with minimal setup costs beyond ensuring the property meets habitability standards. This $10,000 to $20,000 difference in startup costs must be factored into your return calculations.'),
    h3('sl20', 'Cleaning and Turnover'),
    p('sl21', 'Cleaning is the largest single operating expense for most STRs. At $75 to $150 per turnover and 150 to 250 turnovers per year, cleaning costs alone can run $11,250 to $37,500 annually. Many hosts pass some of this cost to guests through cleaning fees, but high cleaning fees hurt your listing\'s competitiveness. LTR turnover costs are a fraction of this — one deep clean and minor repairs every 1 to 2 years, typically $500 to $1,500 per turnover.'),
    h3('sl22', 'Insurance Differences'),
    p('sl23', 'Standard homeowner\'s or landlord insurance does not cover short-term rental activity. You need a specialized STR policy or a commercial hospitality policy, which typically costs 50 to 100 percent more than a standard landlord policy. Airbnb offers AirCover for hosts, but it is not a substitute for proper insurance — it has significant exclusions and limitations. Budget $2,000 to $3,000 per year for proper STR insurance versus $1,000 to $1,500 for a standard landlord policy.'),
    h3('sl24', 'Utilities'),
    p('sl25', 'STR operators pay all utilities — electric, gas, water, internet, streaming services, and often cable. This adds $250 to $400 per month depending on the property size and location. LTR tenants typically pay their own utilities, with the landlord only covering water or trash in some markets. This utility differential of $3,000 to $4,800 per year is often underestimated by new STR operators.'),

    // Tax Treatment Differences
    h2('sl26', 'Tax Treatment Differences'),
    p('sl27', 'The tax treatment of STRs and LTRs differs significantly, and understanding these differences can materially impact your after-tax returns.'),
    h3('sl28', 'Short-Term Rental Tax Treatment'),
    p('sl29', 'If your average guest stay is 7 days or fewer, the IRS does not consider the activity a rental — it is treated as a business. This means the income is subject to self-employment tax (15.3 percent on net income), which LTR income is not. However, business classification also opens the door to material participation, which can allow you to deduct rental losses against your ordinary income without needing Real Estate Professional Status. If you materially participate in your STR (at least 100 hours per year, and more hours than anyone else), losses from cost segregation and accelerated depreciation can offset your W-2 or business income.'),
    p('sl30', 'This "STR loophole" has made short-term rentals popular among high-income earners looking to reduce their tax bills. A cost segregation study on a $250,000 STR might generate $50,000 to $80,000 in first-year depreciation deductions, which at a 37 percent marginal tax rate saves $18,500 to $29,600 in taxes. This tax savings alone can cover the down payment or furnishing costs.'),
    h3('sl31', 'Long-Term Rental Tax Treatment'),
    p('sl32', 'LTR income is classified as passive income, which means losses can only offset other passive income — not your W-2 or active business income — unless you qualify as a Real Estate Professional (750+ hours per year in real estate, and more time in RE than any other activity). There is a partial exception: if your adjusted gross income is below $100,000, you can deduct up to $25,000 in passive rental losses against ordinary income. This phases out between $100,000 and $150,000 AGI.'),

    // Regulatory Risk 2026
    h2('sl33', 'Regulatory Risk in 2026'),
    p('sl34', 'The regulatory landscape for short-term rentals continues to tighten across the United States. Before investing in an STR, thorough research of local regulations is not optional — it is essential. Getting this wrong can turn a profitable investment into an illegal operation with significant fines.'),
    p('sl35', 'Common STR regulations in 2026 include licensing and registration requirements (annual fees ranging from $50 to several thousand dollars), primary residence requirements (some cities only allow STRs in your primary home, not investment properties), occupancy limits and caps on the total number of STR permits issued in a jurisdiction, minimum night requirements (some cities prohibit stays under 30 days), zoning restrictions that limit STRs to specific areas, transient occupancy taxes (similar to hotel taxes, typically 8 to 15 percent), and HOA restrictions that may prohibit short-term rentals entirely.'),
    p('sl36', 'Cities with particularly strict STR regulations include New York City (essentially banned in most buildings), San Francisco (primary residence only, 90-day annual cap for unhosted stays), Los Angeles (primary residence only with registration), Nashville (phasing out non-owner-occupied permits), and many mountain and beach resort towns. The trend is clearly toward more regulation, not less. If you are buying a property specifically for STR use, verify the current regulations AND consider the risk that regulations will tighten further after you purchase.'),

    // The Third Option: Mid-Term Rentals
    h2('sl37', 'The Third Option: Mid-Term Rentals'),
    p('sl38', 'Mid-term rentals — furnished properties rented for 30 to 90 days — have emerged as a compelling middle ground between STRs and LTRs. They offer higher revenue than long-term rentals, lower operating costs than short-term rentals, and face far fewer regulatory restrictions.'),
    h3('sl39', 'Who Rents Mid-Term?'),
    p('sl40', 'The primary mid-term rental demographics include traveling nurses and healthcare professionals (13-week assignments are standard), corporate relocations (employees moving to a new city while they find permanent housing), insurance displacement tenants (families whose homes are being repaired after fire, flood, or storm damage — insurance companies pay the rent), remote workers seeking temporary housing in new cities, and military personnel on temporary assignments. These tenant categories are generally excellent — insurance-funded tenants have guaranteed payment, traveling professionals are screened by their employers or staffing agencies, and corporate relocation tenants are typically high-income professionals.'),
    h3('sl41', 'Mid-Term Rental Economics'),
    p('sl42', 'Using our same $250,000 property, a mid-term rental might command $2,500 to $3,500 per month furnished — significantly more than the $1,500 unfurnished long-term rent. At $3,000 per month and 85 percent occupancy (accounting for turnover gaps between tenants), annual gross revenue would be $30,600. Operating expenses include utilities ($250/month: $3,000), cleaning between tenants (4 to 6 turnovers per year at $200: $800 to $1,200), insurance ($1,500), maintenance ($2,000), and property management if applicable (10 to 15 percent: $3,060 to $4,590). Net operating income: approximately $19,800 to $22,000 — significantly better than either the managed STR ($13,270) or the LTR ($11,940).'),
    h3('sl43', 'Mid-Term Rental Platforms'),
    p('sl44', 'Furnished Finder is the dominant platform for traveling healthcare professionals and is free for landlords — tenants pay the subscription fee. Airbnb allows filtering for 30-plus day stays and offers reduced service fees for monthly bookings. CHBO (Corporate Housing by Owner) targets corporate and government tenants. Facebook Marketplace and local Facebook groups for travel nurses can also generate quality leads with zero platform fees.'),

    // Decision Framework
    h2('sl45', 'Decision Framework: Which Strategy Is Right for You?'),
    p('sl46', 'Choosing between STR, MTR, and LTR is not about which strategy is objectively best — it is about which strategy is best for you given your specific circumstances. Here is how to think through the decision.'),
    p('sl47', 'Choose long-term rentals if you want maximum simplicity and predictability, you have limited time to manage the property, your local market has strong rental demand with low vacancy rates, you are building a large portfolio where simplicity at scale matters, or STR regulations in your area are restrictive or uncertain.'),
    p('sl48', 'Choose short-term rentals if you are in a proven STR market with strong tourist or business traveler demand, you enjoy hospitality and guest interaction (or can afford a co-host), local regulations clearly permit STRs in your property type and location, you want to maximize gross revenue and are willing to invest the time, or you want to use the STR tax loophole for accelerated depreciation deductions.'),
    p('sl49', 'Choose mid-term rentals if you want higher revenue than LTR without the intensity of STR, you are in a market with healthcare facilities, corporate offices, or military installations, you want to avoid most STR regulations (30-plus day stays are typically exempt), you prefer tenants who are professionally screened by their employers, or you want the best risk-adjusted return with moderate effort.'),
    p('sl50', 'Many experienced investors use a hybrid approach — starting a new property as an STR to maximize revenue, then converting to MTR or LTR if regulations change, the market becomes saturated, or they want to reduce their management burden. The flexibility to pivot between strategies is itself a valuable asset. Buy properties that work under multiple strategies, and you will always have options regardless of how the market or regulations evolve.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 4: 10 Real Estate Investing Mistakes
// ══════════════════════════════════════════════════════
const investingMistakes = {
  _type: 'post',
  title: '10 Real Estate Investing Mistakes That Cost Beginners Thousands',
  slug: { _type: 'slug', current: 'real-estate-investing-mistakes' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-beginner', _key: 'c1' },
  ],
  publishedAt: '2026-04-17T10:00:00Z',
  excerpt: 'The most expensive mistakes real estate investors make — and how to avoid each one with data, discipline, and the right analysis tools.',
  seo: {
    metaTitle: '10 Real Estate Investing Mistakes to Avoid in 2026 | ProInvestorHub',
    metaDescription: 'Avoid the 10 most costly real estate investing mistakes. Learn what beginners get wrong about deal analysis, financing, rehab costs, and tenant screening.',
  },
  body: [
    // Introduction
    p('mi01', 'Real estate investing has created more millionaires than any other asset class. It has also cost a lot of people a lot of money — not because real estate is inherently risky, but because investors make avoidable mistakes that turn good deals into expensive lessons. The difference between the investors who build wealth and the ones who lose their shirts almost always comes down to discipline, preparation, and a willingness to do the work before writing the check.'),
    p('mi02', 'After analyzing thousands of deals and working with investors at every experience level, the same mistakes come up again and again. These are not obscure edge cases — they are the ten most common, most expensive errors that beginners make. Every one of them is avoidable. Here is how.'),

    // Mistake 1: Not Running the Numbers
    h2('mi03', 'Mistake 1: Not Running the Numbers'),
    p('mi04', 'This is the number one mistake and it is not close. Too many beginning investors buy properties based on gut feeling, a real estate agent\'s enthusiasm, or a vague sense that "real estate always goes up." They do not calculate cap rate, cash-on-cash return, or even basic cash flow before making an offer. Then they are surprised when the property loses money every month.'),
    p('mi05', 'Every deal needs to be analyzed with actual numbers before you make an offer. What is the gross rental income? What are the real operating expenses — not the seller\'s claimed expenses, but what the property will actually cost you to own and operate? What is your debt service? What is your cash flow after all expenses and mortgage payments? What is your cash-on-cash return? What is the cap rate? These are not optional calculations. They are the foundation of every investment decision.'),
    p('mi06', 'Use a rental cash flow calculator for buy-and-hold deals, a cap rate calculator to compare properties and evaluate market pricing, a cash-on-cash calculator to measure your return relative to capital invested, a BRRRR calculator for value-add and refinance strategies, a fix-and-flip calculator for rehab projects, and a mortgage calculator to model different financing scenarios. Running the numbers takes 15 minutes per deal. Not running them can cost you $50,000 or more. Do the math on every single deal.'),

    // Mistake 2: Overpaying in a Flat Market
    h2('mi07', 'Mistake 2: Overpaying in a Flat Market'),
    p('mi08', 'From 2012 to 2022, it was hard to overpay for real estate. Prices rose so steadily that even mediocre deals eventually became profitable simply through appreciation. That era is over. In 2026, appreciation is modest in most markets, interest rates remain elevated, and buying a property that does not cash flow from day one is speculation — not investing.'),
    p('mi09', 'The investors who get hurt are the ones who pay retail pricing and bank on 5 to 10 percent annual appreciation to make the deal work. When appreciation comes in at 2 percent — or the market dips — they are stuck with a property that bleeds money every month. The solution is to buy based on cash flow, not speculation. Use cap rate to evaluate whether a property is priced fairly relative to its income. Use cash-on-cash return to determine whether the deal meets your minimum return threshold. If the numbers only work with aggressive appreciation assumptions, it is not a good deal — it is a gamble.'),

    // Mistake 3: Underestimating Rehab Costs
    h2('mi10', 'Mistake 3: Underestimating Rehab Costs'),
    p('mi11', 'Rehab cost estimation is the skill that separates profitable flippers and BRRRR investors from those who lose money. The average rehab project overruns its initial budget by 20 to 30 percent. For beginners, the overruns are often worse — 40 to 50 percent — because they lack the experience to anticipate hidden problems.'),
    p('mi12', 'The problems that blow budgets are the ones behind the walls: knob-and-tube wiring that needs full replacement, galvanized pipes that are corroding, foundation issues hidden by cosmetic patches, mold behind drywall, roof decking that is rotted under the shingles, and HVAC systems at the end of their useful life. A $30,000 cosmetic rehab turns into a $50,000 full renovation when you open the walls and find surprises.'),
    p('mi13', 'The fix is straightforward: always add a 15 to 20 percent contingency to your rehab budget, get at least three contractor bids before committing, walk the property with an experienced contractor or inspector before making your offer, and learn to estimate repair costs accurately using per-square-foot and per-unit cost benchmarks.'),

    // Mistake 4: Skipping the Inspection
    h2('mi14', 'Mistake 4: Skipping the Inspection'),
    p('mi15', 'In competitive markets, some investors waive the inspection contingency to make their offers more attractive. This is one of the most expensive shortcuts in real estate. A professional inspection costs $300 to $500. The average cost of surprise repairs that an inspection would have caught is $14,000. That is a 28-to-1 return on a $500 investment.'),
    p('mi16', 'An inspection is not just about finding deal-breakers — although it does that too. It is about understanding exactly what you are buying so you can budget accurately for future repairs and negotiate the purchase price or seller concessions based on the property\'s actual condition. Never skip an inspection on an investment property. If the seller will not allow one, that tells you everything you need to know.'),

    // Mistake 5: Ignoring Vacancy and CapEx Reserves
    h2('mi17', 'Mistake 5: Ignoring Vacancy and CapEx Reserves'),
    p('mi18', 'When new investors project cash flow, they often calculate rent minus mortgage minus taxes minus insurance and call the remainder their profit. They forget two critical line items: vacancy reserves and capital expenditure reserves. These are not theoretical costs — they are real, inevitable expenses that will occur. The only question is when.'),
    p('mi19', 'Budget 5 to 8 percent of gross rent for vacancy, even if your property is currently occupied. Tenants move, and you will have periods of zero income between tenants. Budget $200 to $300 per unit per month for CapEx reserves — the fund that covers major replacements like roofs ($8,000 to $15,000), HVAC systems ($5,000 to $10,000), water heaters ($1,200 to $2,500), appliances, flooring, and exterior painting. These expenses do not happen every year, but when they happen, they are expensive. If you have not been reserving for them, you are either paying out of pocket or going into debt to keep your property habitable.'),
    p('mi20', 'The investor who budgets for vacancy and CapEx will always outperform the investor who ignores them — because the first investor knows their true cash flow and makes decisions based on reality, while the second investor is surprised every time a major expense hits.'),

    // Mistake 6: Overleveraging
    h2('mi21', 'Mistake 6: Overleveraging'),
    p('mi22', 'Leverage is the most powerful tool in real estate investing. It is also the most dangerous. Using other people\'s money to buy appreciating assets is how most real estate fortunes are built. But leverage amplifies losses just as much as it amplifies gains. An investor who buys five properties with maximum leverage and then experiences one prolonged vacancy and one major repair can find their entire portfolio in jeopardy.'),
    p('mi23', 'Keep your portfolio loan-to-value ratio under 70 percent as a general rule. This means maintaining equity cushion across your properties so that a downturn in values or a string of unexpected expenses does not put you underwater. Hold cash reserves equal to at least 3 to 6 months of expenses for each property. Structure your portfolio so that one bad vacancy, one expensive repair, or one market dip does not threaten everything you have built. Conservative leverage is not exciting, but it is how you survive long enough to get wealthy.'),

    // Mistake 7: Skipping Tenant Screening
    h2('mi24', 'Mistake 7: Skipping Tenant Screening'),
    p('mi25', 'We covered tenant screening in detail in our complete screening guide, but it bears repeating here because skipping this step is one of the most common and most expensive mistakes landlords make. The average eviction costs $3,500 to $10,000. Professional screening drops eviction rates from 15.8 percent to 4.1 percent — a 74 percent reduction.'),
    p('mi26', 'The math is simple. A screening report costs $25 to $40 per applicant. An eviction costs 100 to 400 times that amount. Running credit checks, verifying income, contacting previous landlords, and conducting background checks takes about 45 to 60 minutes per applicant. Dealing with an eviction takes months and consumes dozens of hours. There is no scenario where skipping screening makes financial sense. Screen every applicant, every time, using consistent documented criteria.'),

    // Mistake 8: DIY Property Management at Scale
    h2('mi27', 'Mistake 8: DIY Property Management at Scale'),
    p('mi28', 'Self-managing your first one to three rental properties is a great idea. You learn the business from the ground up — how to screen tenants, handle maintenance requests, manage turnovers, and deal with the occasional difficult situation. This hands-on experience makes you a better investor and helps you evaluate property managers when you eventually hire one.'),
    p('mi29', 'The mistake is continuing to self-manage as you scale beyond 4 to 5 properties. At that point, the time cost of managing everything yourself — tenant calls, maintenance coordination, rent collection, lease renewals, turnover management, accounting — exceeds the 8 to 10 percent management fee you would pay a professional. More importantly, the time you spend managing properties is time you are not spending finding and analyzing new deals, negotiating acquisitions, and growing your portfolio.'),
    p('mi30', 'The most successful real estate investors treat property management as a cost of doing business, not an expense to avoid. A good property manager reduces vacancy, handles maintenance more efficiently (they have vendor relationships you do not), ensures legal compliance, and frees you to focus on the activities that actually grow your wealth. Know when to hire, and do not let false economy hold your portfolio back.'),

    // Mistake 9: Neglecting Tax Strategy
    h2('mi31', 'Mistake 9: Neglecting Tax Strategy'),
    p('mi32', 'Real estate offers the most generous tax treatment of any investment class, but these benefits do not happen automatically. You have to plan for them, structure your investments to capture them, and work with a CPA who specializes in real estate. The investors who build the most wealth are not just better at buying properties — they are better at keeping the money they make.'),
    p('mi33', 'Depreciation alone can shelter thousands of dollars in rental income from taxes every year. Cost segregation studies can accelerate those deductions dramatically, generating massive first-year write-offs. 1031 exchanges let you defer capital gains taxes indefinitely by reinvesting sale proceeds into new properties. Proper entity structuring (LLCs, series LLCs, or land trusts depending on your state) provides liability protection and can offer additional tax planning opportunities.'),
    p('mi34', 'The mistake is not learning about these strategies or assuming they are only for large investors. A single cost segregation study on a $200,000 rental property can save $15,000 to $25,000 in taxes. A single 1031 exchange on a property sale can save $50,000 or more. Not understanding and using these tools is leaving money on the table every single year.'),

    // Mistake 10: Analysis Paralysis
    h2('mi35', 'Mistake 10: Analysis Paralysis'),
    p('mi36', 'This is the counterpoint to Mistake 1 — and it is just as costly, though in a different way. Some investors run the numbers on every deal, read every book, listen to every podcast, attend every meetup, and never actually buy a property. They are perpetually "getting ready" to invest. They analyze deal after deal and always find a reason not to pull the trigger — the cap rate is half a point too low, the neighborhood is not quite right, the market might dip next quarter.'),
    p('mi37', 'Perfect deals do not exist. Every property has some flaw, some risk, some unknown. The skill is not finding a deal with zero risk — it is finding a deal where the risk is manageable, the numbers work with conservative assumptions, and you have enough reserves to handle surprises. At some point, you have done the research, you have run the numbers, you understand the market, and you need to act.'),
    p('mi38', 'The cost of analysis paralysis is invisible but enormous: it is the wealth you did not build, the cash flow you did not receive, the appreciation you did not capture, and the tax benefits you did not claim — all because you were waiting for a certainty that never comes. Set your criteria, analyze deals against those criteria, and when a deal meets your standards, move forward with confidence.'),

    // Conclusion
    h2('mi39', 'The Path Forward'),
    p('mi40', 'Every experienced investor has made at least one of these mistakes — probably several. The goal is not perfection. The goal is to minimize avoidable errors by educating yourself, running the numbers on every deal, building systems for screening and management, understanding your tax position, and maintaining the discipline to act when the numbers work and walk away when they do not.'),
    p('mi41', 'Real estate investing rewards preparation, patience, and action in roughly equal measure. Prepare by learning the fundamentals and building your analysis skills. Be patient enough to wait for deals that meet your criteria. And act decisively when you find them. The investors who follow this approach consistently build portfolios that generate lasting wealth, reliable income, and genuine financial freedom.'),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [sellerFinancing, tenantScreening, strVsLtr, investingMistakes]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 3E Content Seed: 4 blog posts\n')

  // Check for existing posts by slug to avoid duplicates
  const slugs = posts.map((p) => p.slug.current)
  const existing = await client.fetch(
    `*[_type == "post" && slug.current in $slugs]{ slug }`,
    { slugs }
  )
  const existingSlugs = new Set(existing.map((d) => d.slug.current))

  if (existingSlugs.size > 0) {
    console.log('Found existing posts (will skip):')
    for (const slug of existingSlugs) {
      console.log(`  - ${slug}`)
    }
    console.log()
  }

  const newPosts = posts.filter((p) => !existingSlugs.has(p.slug.current))

  if (newPosts.length === 0) {
    console.log('All posts already exist. Nothing to seed.')
    return
  }

  const transaction = client.transaction()

  for (const post of newPosts) {
    console.log(`  + ${post.title}`)
    transaction.create(post)
  }

  console.log(`\nCommitting ${newPosts.length} posts...`)
  const result = await transaction.commit()
  console.log(`Done! Created ${result.results.length} documents.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
