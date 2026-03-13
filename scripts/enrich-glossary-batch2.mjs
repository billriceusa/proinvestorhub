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

/* ─── helpers ──────────────────────────────────────────────── */
const h2 = (slug, n, text) => ({
  _type: 'block',
  _key: `${slug}-b${n}`,
  style: 'h2',
  children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
})

const p = (slug, n, text) => ({
  _type: 'block',
  _key: `${slug}-b${n}`,
  style: 'normal',
  children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ─── term content ─────────────────────────────────────────── */
const termContent = {

  'dscr-loan': (s) => [
    h2(s, 1, 'What Is a DSCR Loan?'),
    p(s, 2, 'A DSCR loan is a mortgage product designed specifically for real estate investors. Unlike conventional loans that require W-2 income, tax returns, and employment verification, DSCR loans qualify borrowers based on the property\'s income relative to its debt obligations. If the property generates enough rental income to cover the mortgage payment, you qualify. It is that straightforward, and it has fundamentally changed how investors scale portfolios.'),
    h2(s, 3, 'How DSCR Loan Qualification Works'),
    p(s, 4, 'Lenders calculate the debt service coverage ratio by dividing the property\'s gross rental income (or projected market rent from an appraisal) by the total monthly mortgage payment, which includes principal, interest, taxes, insurance, and any HOA fees. Most lenders require a minimum DSCR of 1.0 to 1.25. A ratio of 1.0 means the rent exactly covers the payment. A ratio of 1.25 means the property generates 25% more income than needed, providing a cushion that lenders want to see.'),
    h2(s, 5, 'Rates, Terms, and Costs'),
    p(s, 6, 'DSCR loan rates typically run 1 to 2 percentage points higher than conventional investment property rates. In mid-2026, expect rates in the 7.5% to 9.5% range depending on your DSCR ratio, credit score, LTV, and loan amount. Down payments usually range from 20% to 25%. Closing costs may include 1 to 2 origination points. While the cost of capital is higher, the trade-off is speed, flexibility, and the ability to scale without income documentation bottlenecks.'),
    h2(s, 7, 'DSCR Loans vs. Conventional Loans'),
    p(s, 8, 'Conventional loans through Fannie Mae and Freddie Mac offer better rates, but they cap you at 10 financed properties, require full income documentation, and count each property\'s debt against your DTI ratio. DSCR loans have no property count limit and no DTI calculation. A self-employed investor who writes off most income on tax returns may not qualify conventionally but can close DSCR loans all day long on cash-flowing properties.'),
    h2(s, 9, 'Who DSCR Loans Are Best For'),
    p(s, 10, 'DSCR loans are ideal for self-employed investors, business owners with complex tax returns, full-time investors who have moved beyond W-2 income, and anyone who has maxed out their conventional loan slots. They are also excellent for investors buying in LLCs, since most DSCR lenders allow entity vesting without requiring a personal guarantee on the loan qualification itself, though a personal guarantee is still common.'),
    h2(s, 11, 'Scaling Your Portfolio with DSCR Financing'),
    p(s, 12, 'The real power of DSCR loans is unlimited scalability. Because qualification is property-based, your 20th rental is no harder to finance than your 2nd. Focus on buying properties where the market rent comfortably exceeds the mortgage payment by at least 25%. Build relationships with multiple DSCR lenders since rates and terms vary significantly. Keep your credit score above 720 for the best pricing, and target LTV at 75% or lower to unlock the most competitive programs.'),
  ],

  'dscr': (s) => [
    h2(s, 1, 'What Is Debt Service Coverage Ratio?'),
    p(s, 2, 'Debt Service Coverage Ratio, or DSCR, is the most important financial metric for evaluating whether a rental property can sustain its own financing. The ratio measures the relationship between a property\'s income and its debt obligations. Lenders, underwriters, and experienced investors rely on DSCR to make lending and purchasing decisions because it answers the fundamental question: does this property pay for itself?'),
    h2(s, 3, 'The DSCR Formula'),
    p(s, 4, 'DSCR is calculated by dividing Net Operating Income by Annual Debt Service. NOI equals gross rental income minus operating expenses such as property taxes, insurance, maintenance, vacancy allowance, and property management fees. Annual Debt Service is the total of all mortgage payments over 12 months, including principal and interest. For example, a property with $36,000 in annual NOI and $28,800 in annual mortgage payments has a DSCR of 1.25.'),
    h2(s, 5, 'What DSCR Numbers Mean'),
    p(s, 6, 'A DSCR of 1.25 or higher is considered strong. It means the property generates 25% more income than needed to cover debt, providing a comfortable margin for unexpected expenses or vacancy. A DSCR between 1.0 and 1.24 is acceptable to many lenders but offers a thinner margin. A DSCR below 1.0 means the property operates at negative cash flow and the investor must cover the shortfall out of pocket each month. Most DSCR lenders require a minimum of 1.0, and better ratios unlock better rates.'),
    h2(s, 7, 'Why DSCR Matters to Lenders'),
    p(s, 8, 'Lenders use DSCR as a primary risk indicator. A property with a high DSCR is less likely to default because the income cushion can absorb rent decreases, vacancy, or unexpected repairs without the borrower missing payments. Commercial lenders and DSCR loan programs set minimum DSCR requirements as underwriting criteria. The higher your DSCR, the more favorable your loan terms will be in terms of rate, points, and LTV allowances.'),
    h2(s, 9, 'How to Improve Your DSCR'),
    p(s, 10, 'You can improve DSCR from the income side or the debt side. To increase NOI, raise rents to market rate, add income streams like laundry or parking fees, reduce vacancy with better tenant screening, and negotiate lower insurance premiums. To reduce debt service, make a larger down payment to lower the loan amount, secure a lower interest rate through rate shopping or buying down points, or extend the amortization period to reduce monthly payments.'),
    h2(s, 11, 'Using DSCR in Your Investment Analysis'),
    p(s, 12, 'Run DSCR calculations on every potential acquisition before making an offer. Use conservative assumptions: actual market rents rather than pro forma projections, a 5% to 8% vacancy rate, and realistic operating expenses. Compare DSCR across properties in your pipeline to identify which deals are strongest. Track DSCR annually on properties you own so you catch deteriorating performance before it becomes a cash flow problem. Strong investors treat DSCR as a living metric, not a one-time calculation.'),
  ],

  'ltv': (s) => [
    h2(s, 1, 'What Is Loan-to-Value Ratio?'),
    p(s, 2, 'Loan-to-Value ratio, commonly abbreviated as LTV, expresses the size of a mortgage loan as a percentage of the property\'s appraised value or purchase price, whichever is lower. LTV is one of the first numbers lenders look at when evaluating a loan application because it directly measures how much skin the borrower has in the deal. The formula is simple: divide the loan amount by the property value and multiply by 100.'),
    h2(s, 3, 'How LTV Is Calculated'),
    p(s, 4, 'If you purchase an investment property appraised at $300,000 and borrow $225,000, your LTV is 75%. The remaining 25% represents your equity, which comes from your down payment. In a refinance scenario, LTV is calculated using the current appraised value rather than the original purchase price. This distinction matters enormously in the BRRRR strategy, where forced appreciation through renovations can dramatically change your LTV position.'),
    h2(s, 5, 'Typical LTV Requirements for Investment Properties'),
    p(s, 6, 'Investment property loans carry stricter LTV limits than primary residence loans. Conventional lenders typically allow 75% to 80% LTV on single-family investment properties, meaning you need 20% to 25% down. Multi-family properties of 2 to 4 units often require 25% down. DSCR loans commonly cap at 75% to 80% LTV. Hard money lenders may go to 70% to 75% of the after-repair value. FHA loans on owner-occupied properties allow up to 96.5% LTV, which is why house hacking is such a powerful entry strategy.'),
    h2(s, 7, 'Why Lower LTV Gets You Better Terms'),
    p(s, 8, 'Lower LTV means less risk for the lender. If a borrower defaults, the lender needs to recover their money through foreclosure and sale. A property with 75% LTV gives the lender a 25% equity cushion. As a result, lower LTV loans earn better interest rates, lower fees, and more flexible terms. The difference between 80% LTV and 70% LTV on a DSCR loan can easily be half a percentage point in rate, which translates to thousands over the life of the loan.'),
    h2(s, 9, 'LTV and Down Payment Relationship'),
    p(s, 10, 'LTV and down payment are two sides of the same coin. An 80% LTV requires a 20% down payment. A 75% LTV requires 25% down. When comparing loan programs, always translate LTV into actual cash required. On a $400,000 property, the difference between 75% LTV and 80% LTV is $20,000 in additional capital. Weigh that against the interest rate savings and decide which deployment of capital generates the best return across your entire portfolio.'),
    h2(s, 11, 'Strategic LTV Considerations for Investors'),
    p(s, 12, 'Experienced investors think about LTV dynamically, not just at purchase. Your LTV changes as property values shift and as you pay down principal. In appreciating markets, your LTV drops naturally, building equity you can access through cash-out refinancing. When analyzing deals, model your LTV at purchase, at the refinance point if doing BRRRR, and at your projected exit. Keep combined LTV across your portfolio at a level where a market correction will not put you underwater on multiple properties simultaneously.'),
  ],

  'hard-money-loan': (s) => [
    h2(s, 1, 'What Is a Hard Money Loan?'),
    p(s, 2, 'A hard money loan is a short-term, asset-based loan secured by real property. Unlike conventional mortgages that focus on borrower income and creditworthiness, hard money lenders primarily evaluate the property itself, specifically its current value and after-repair value. Hard money loans are funded by private investors or lending companies and are designed for speed, typically closing in 7 to 14 days compared to 30 to 45 days for conventional loans.'),
    h2(s, 3, 'When to Use Hard Money'),
    p(s, 4, 'Hard money loans are the tool of choice for fix-and-flip projects, the BRRRR strategy, and bridge financing situations where speed matters. If you find a distressed property at auction that needs to close in 10 days, hard money is likely your only option. If you are executing a BRRRR and need acquisition plus rehab funding before refinancing into permanent financing, hard money fills that gap. The common thread is short-term deals where the exit strategy is clearly defined.'),
    h2(s, 5, 'Typical Rates, Points, and Terms'),
    p(s, 6, 'Hard money loans typically carry interest rates between 10% and 14%, with origination fees of 2 to 4 points. Loan terms range from 6 to 24 months. Most lenders will fund 65% to 75% of the after-repair value, which often covers the purchase price and a portion of renovation costs. Some lenders also escrow rehab funds and release them in draws as work is completed. Monthly payments are usually interest-only, keeping carrying costs manageable during the renovation period.'),
    h2(s, 7, 'The Exit Strategy Is Everything'),
    p(s, 8, 'Every hard money lender will ask about your exit strategy, and you need a clear answer. For flips, the exit is selling the renovated property. For BRRRR, the exit is refinancing into a long-term loan. For bridge situations, the exit is selling another asset or securing permanent financing. Hard money loans that go past their term trigger extensions, penalties, and higher rates. Investors who fail to plan their exit strategy get crushed by carrying costs.'),
    h2(s, 9, 'Evaluating Hard Money Lenders'),
    p(s, 10, 'Not all hard money lenders are created equal. Compare total cost of capital, not just the interest rate. A lender charging 11% with 2 points and a 12-month term may be cheaper than one charging 10% with 4 points and a 6-month term if your project timeline is uncertain. Ask about extension policies, draw processes, and prepayment penalties. Check references from other investors. The best hard money lenders are partners who want to fund your next deal, not adversaries looking for a default.'),
    h2(s, 11, 'Hard Money vs. Other Financing Options'),
    p(s, 12, 'Hard money is more expensive than conventional or DSCR financing, but it serves a different purpose. Compare it to private money lending, which may offer similar flexibility at potentially lower rates but requires personal relationships to source. Compare it to bridge loans from banks, which are cheaper but slower and harder to qualify for. Hard money wins on speed, flexibility, and availability. Use it strategically for short-term projects where the profit margin is large enough to absorb the higher cost of capital, and always have your long-term financing lined up before the hard money term expires.'),
  ],

  'amortization': (s) => [
    h2(s, 1, 'What Is Amortization?'),
    p(s, 2, 'Amortization is the process of paying off a loan through scheduled, periodic payments that include both principal and interest. Each payment reduces the outstanding loan balance, but the split between principal and interest changes over time. In the early years of a mortgage, the majority of each payment goes toward interest. As the loan matures, a progressively larger portion goes toward principal reduction. Understanding amortization is essential for real estate investors because it directly impacts cash flow, equity building, and refinancing decisions.'),
    h2(s, 3, 'How an Amortization Schedule Works'),
    p(s, 4, 'An amortization schedule is a table showing every payment over the life of the loan, breaking each one into its principal and interest components. On a $200,000 loan at 7% over 30 years, the monthly payment is approximately $1,331. In month one, about $1,167 goes to interest and only $164 to principal. By year 15, the split is roughly even. In the final year, nearly the entire payment reduces principal. This front-loading of interest is why early payoff strategies and refinancing timing matter so much.'),
    h2(s, 5, '30-Year vs. 15-Year Amortization'),
    p(s, 6, 'A 30-year amortization keeps monthly payments low, maximizing cash flow on rental properties. A 15-year amortization has significantly higher monthly payments but builds equity faster and costs far less in total interest. On a $200,000 loan at 7%, the 30-year schedule costs about $279,000 in total interest while the 15-year schedule costs about $123,000. Most investors choose 30-year amortization to preserve cash flow and deploy capital into additional properties, accepting slower equity build in exchange for scalability.'),
    h2(s, 7, 'Interest-Only Periods'),
    p(s, 8, 'Some loan products offer interest-only periods, typically for the first 5 to 10 years. During this time, payments cover only interest and no principal is repaid. Monthly payments are lower, which improves cash flow, but you build zero equity through amortization. Interest-only periods are common in commercial loans, bridge loans, and some DSCR products. They work well for investors focused on cash flow who plan to sell or refinance before the interest-only period ends and payments reset higher.'),
    h2(s, 9, 'Amortization and the BRRRR Strategy'),
    p(s, 10, 'In the BRRRR method, understanding amortization helps you model your long-term hold accurately. After the refinance step, you will have a new amortization schedule based on the refinanced loan amount, rate, and term. Your tenants are effectively paying down your mortgage through rent. Over a 30-year hold, the property goes from being leveraged to being free and clear, and the equity build from amortization alone on a $200,000 loan is $200,000 in wealth creation, not counting appreciation.'),
    h2(s, 11, 'Amortization Impact on Investment Decisions'),
    p(s, 12, 'When analyzing deals, model the amortization schedule alongside your cash flow projections. Calculate how much equity you will build through principal paydown over your expected hold period. Compare different amortization periods and their impact on monthly cash flow versus total cost. If you plan to hold a property for 5 years, the difference in equity build between a 15-year and 30-year amortization may influence your decision. Factor amortization into your total return calculation alongside cash flow, appreciation, and tax benefits for a complete picture of investment performance.'),
  ],

  'adjustable-rate-mortgage': (s) => [
    h2(s, 1, 'What Is an Adjustable Rate Mortgage?'),
    p(s, 2, 'An adjustable rate mortgage, or ARM, is a loan with an interest rate that changes periodically based on market conditions. The rate is composed of two parts: an index, which is a benchmark rate like the Secured Overnight Financing Rate (SOFR), and a margin, which is a fixed percentage the lender adds on top. When the index rises, your rate rises. When it falls, your rate falls. ARMs contrast with fixed-rate mortgages where the rate never changes over the entire loan term.'),
    h2(s, 3, 'ARM Structures Explained'),
    p(s, 4, 'ARMs are described by their adjustment schedule. A 5/1 ARM has a fixed rate for the first 5 years, then adjusts annually. A 7/1 ARM is fixed for 7 years with annual adjustments after. A 5/6 ARM is fixed for 5 years, then adjusts every 6 months. The initial fixed period almost always offers a lower rate than a comparable 30-year fixed mortgage, which is the primary attraction. The trade-off is uncertainty about future payments once the adjustable period begins.'),
    h2(s, 5, 'Rate Caps and Payment Limits'),
    p(s, 6, 'ARMs include cap structures that limit how much the rate can change. A typical cap structure might be 2/2/5, meaning the rate cannot increase more than 2% at the first adjustment, 2% at any subsequent adjustment, and 5% over the life of the loan. If your initial rate is 6%, the lifetime cap means it can never exceed 11%. These caps provide some protection, but investors must model worst-case scenarios to ensure the property remains cash flow positive even at the maximum rate.'),
    h2(s, 7, 'When ARMs Make Sense for Investors'),
    p(s, 8, 'ARMs are strategically valuable when you plan to sell or refinance before the fixed period ends. If you are executing a 3 to 5 year value-add strategy on a multifamily property, a 5/1 ARM gives you a lower rate during your entire hold period. If you believe rates will decline in coming years, an ARM lets you benefit from falling rates without refinancing. The key is matching the ARM\'s fixed period to your investment timeline. Never use an ARM on a long-term hold unless you are comfortable with payment variability.'),
    h2(s, 9, 'ARM Risks and Mitigation'),
    p(s, 10, 'The primary risk is payment shock when the rate adjusts upward. If your rate jumps from 6% to 8% on a $300,000 loan, your monthly payment increases by roughly $400. On a thin-margin rental property, this can flip you from positive to negative cash flow overnight. Mitigate this risk by only using ARMs on properties with substantial cash flow cushion, maintaining reserves to cover potential payment increases, and having a refinance or sale plan well before the adjustment date.'),
    h2(s, 11, 'Comparing ARMs to Fixed-Rate Options'),
    p(s, 12, 'Run the numbers both ways on every deal. Calculate your total interest cost and cash flow using the ARM rate for your planned hold period versus a 30-year fixed rate. If a 5/1 ARM saves you 0.75% on rate for a property you plan to hold for 4 years, that savings compounds across every monthly payment. On a $250,000 loan, that could mean $1,500 to $2,000 per year in improved cash flow. But if your plans change and you hold past the fixed period, model the worst case to ensure you can absorb adjustments without distress.'),
  ],

  'balloon-payment': (s) => [
    h2(s, 1, 'What Is a Balloon Payment?'),
    p(s, 2, 'A balloon payment is a large, lump-sum payment due at the end of a loan term that has not been fully amortized. Balloon loans feature lower monthly payments during the term because the loan is not designed to be paid off through regular payments alone. Instead, the remaining balance comes due all at once on a specified date. Balloon payments are common in commercial real estate lending, hard money loans, and seller-financed transactions.'),
    h2(s, 3, 'How Balloon Loans Are Structured'),
    p(s, 4, 'A typical balloon loan might have a 5-year term with payments calculated on a 25-year amortization schedule. The monthly payments are based on the longer 25-year schedule, keeping them manageable, but the entire remaining balance is due after 5 years. On a $300,000 loan at 7% with 5-year balloon and 25-year amortization, monthly payments are approximately $2,120. After 5 years of payments, you still owe roughly $275,000, which is due as the balloon payment.'),
    h2(s, 5, 'Where You Encounter Balloon Payments'),
    p(s, 6, 'Commercial real estate loans commonly include balloons because lenders want to limit their long-term rate exposure. A bank might offer a 5 or 7-year term on a commercial property with the expectation that you refinance at maturity. Hard money loans are essentially all balloon since the entire principal is due at the end of a 6 to 24 month term. Seller-financed deals frequently include 3 to 5-year balloons because sellers want their capital back within a reasonable timeframe.'),
    h2(s, 7, 'The Refinance Risk'),
    p(s, 8, 'The biggest risk with balloon payments is refinance risk. When the balloon comes due, you must either pay it in cash, refinance into a new loan, or sell the property. If interest rates have risen significantly, your new loan may have much higher payments. If the property has declined in value, you may not qualify for sufficient refinancing. If credit conditions have tightened, you may struggle to find a lender at all. Investors have lost properties to balloon payments they could not refinance during economic downturns.'),
    h2(s, 9, 'Managing Balloon Payment Risk'),
    p(s, 10, 'Start planning your exit strategy the day you close a balloon loan, not six months before it matures. Monitor your property value and build equity through improvements to ensure refinancing is viable. Maintain strong credit and lender relationships. Begin the refinance process at least 6 months before the balloon date. Negotiate extension options in the original loan documents that give you additional time if refinancing falls through. Keep cash reserves specifically earmarked for balloon scenarios.'),
    h2(s, 11, 'When Balloon Loans Make Strategic Sense'),
    p(s, 12, 'Balloon loans work well for investors with clear, time-bound strategies. If you are buying a property to renovate and sell within 18 months, a balloon term aligns perfectly with your exit. If you are acquiring a value-add apartment building and plan to stabilize it and refinance into permanent agency debt within 3 years, a balloon term covers your business plan. The key is matching the balloon maturity to your actual timeline and having contingency plans. Never take a balloon loan without a defined, realistic exit strategy.'),
  ],

  'bridge-loan': (s) => [
    h2(s, 1, 'What Is a Bridge Loan?'),
    p(s, 2, 'A bridge loan is short-term financing designed to bridge the gap between two transactions. In real estate investing, bridge loans typically cover the period between acquiring a property and securing permanent long-term financing, or between buying a new property and selling an existing one. They are called bridge loans because they create a financial bridge that allows investors to act quickly without waiting for slower, permanent financing to close.'),
    h2(s, 3, 'Common Bridge Loan Use Cases'),
    p(s, 4, 'Investors use bridge loans in several scenarios. The most common is acquiring a property that needs renovation before it qualifies for conventional financing. A lender will not approve a standard mortgage on a property with a damaged roof or non-functional systems, but a bridge lender will fund the acquisition and rehab. Other use cases include buying a new investment before selling an existing one, acquiring a commercial property that needs lease-up to stabilize income, and purchasing auction properties that require fast closing.'),
    h2(s, 5, 'Typical Bridge Loan Terms'),
    p(s, 6, 'Bridge loans carry higher costs reflecting their short-term, higher-risk nature. Interest rates typically range from 8% to 12%, with 1 to 3 origination points. Terms run from 6 to 24 months, with most falling in the 12-month range. Payments are usually interest-only, which keeps monthly carrying costs lower during the transition period. Some bridge lenders will fund up to 80% of the purchase price or 70% of the after-repair value, and many will escrow renovation funds released as draws.'),
    h2(s, 7, 'Bridge Loans vs. Hard Money Loans'),
    p(s, 8, 'Bridge loans and hard money loans overlap significantly, and the terms are sometimes used interchangeably. Generally, bridge loans from institutional lenders or banks carry lower rates and more favorable terms than hard money from private lenders. Banks may offer bridge loans at 8% to 10% to established borrowers with strong track records. Hard money lenders serve borrowers who need faster closings, have less experience, or are working with properties that banks will not touch. The distinction matters when shopping for financing.'),
    h2(s, 9, 'The Critical Exit Strategy'),
    p(s, 10, 'Bridge loans demand a clear exit strategy because the clock starts ticking at closing. Your exit might be refinancing into a DSCR loan after stabilizing the property, selling the renovated property to a retail buyer, or securing a conventional loan once the property meets standard lending requirements. Whatever your plan, model it with conservative timelines. If you think renovations will take 4 months, plan for 6. If you think the sale will take 2 months, plan for 4. Bridge loan extensions are expensive and sometimes unavailable.'),
    h2(s, 11, 'Maximizing Bridge Loan Effectiveness'),
    p(s, 12, 'Use bridge loans as a competitive advantage, not a crutch. The ability to close quickly with bridge financing lets you negotiate better purchase prices from motivated sellers who need fast closings. Have your permanent financing pre-approved and ready to execute before taking the bridge loan so the transition is seamless. Build relationships with bridge lenders before you need them. The best time to negotiate bridge loan terms is when you do not urgently need the money. Keep detailed records of completed projects to build a track record that earns you better terms on future bridge deals.'),
  ],

  'conventional-loan': (s) => [
    h2(s, 1, 'What Is a Conventional Loan?'),
    p(s, 2, 'A conventional loan is a mortgage that conforms to guidelines set by Fannie Mae or Freddie Mac and is not insured or guaranteed by a government agency. Conventional loans are the most common financing used by real estate investors because they offer the lowest interest rates and best terms available for investment properties. However, they come with stricter qualification requirements than alternative options like DSCR or hard money loans.'),
    h2(s, 3, 'Down Payment and LTV Requirements'),
    p(s, 4, 'Conventional loans for investment properties require a minimum down payment of 15% for single-family properties and 25% for 2 to 4 unit properties, though many lenders require 20% to 25% across the board. This translates to 75% to 85% LTV. The down payment requirement is significantly higher than for primary residences because investment properties carry higher default risk. Putting more down, say 25% to 30%, can earn you a meaningfully better interest rate and eliminate the need for private mortgage insurance.'),
    h2(s, 5, 'The 10-Property Limit'),
    p(s, 6, 'Fannie Mae allows individual borrowers to have up to 10 financed properties, including their primary residence. This is a hard limit that many scaling investors eventually hit. Once you reach 10 conventionally financed properties, you must turn to alternative products like DSCR loans, portfolio loans, or commercial financing. Some investors use their 10 conventional slots strategically, reserving them for their best properties with the strongest cash flow to maximize the benefit of lower conventional rates.'),
    h2(s, 7, 'Income and DTI Qualification'),
    p(s, 8, 'Conventional lenders evaluate your debt-to-income ratio, typically requiring it to stay below 43% to 45%. Your total monthly debt payments, including all mortgage payments on all properties, must stay within this threshold relative to your gross monthly income. Rental income from existing investment properties can help by offsetting mortgage payments, but lenders typically only count 75% of rental income to account for vacancy and expenses. Self-employed borrowers need two years of tax returns showing sufficient income.'),
    h2(s, 9, 'Credit Score Requirements'),
    p(s, 10, 'Most conventional investment property loans require a minimum credit score of 680, with 740 or higher earning the best rates. The rate difference between a 680 score and a 760 score can be 0.5% to 1.0%, which translates to hundreds of dollars per month on a typical investment property loan. Before applying, review your credit report, dispute any errors, pay down revolving balances below 30% utilization, and avoid opening new credit accounts. A few months of credit optimization can save thousands over the loan term.'),
    h2(s, 11, 'Strategic Use of Conventional Financing'),
    p(s, 12, 'Maximize your conventional loan slots by using them on your strongest, longest-hold properties where the rate advantage compounds over decades. Use alternative financing like DSCR loans for shorter-term holds where the rate premium matters less. If buying with a spouse, consider how titling and loan applications affect your combined 10-property allotment. Work with a mortgage broker experienced in investment properties who understands how to structure applications to maximize your borrowing capacity while staying within DTI limits across your entire portfolio.'),
  ],

  'fha-loan': (s) => [
    h2(s, 1, 'What Is an FHA Loan?'),
    p(s, 2, 'An FHA loan is a mortgage insured by the Federal Housing Administration that allows borrowers to purchase a home with as little as 3.5% down. While FHA loans are designed for owner-occupied primary residences, they have become one of the most powerful tools in the real estate investor\'s toolkit through a strategy called house hacking. FHA loans can be used on 1 to 4 unit properties as long as the borrower lives in one of the units, making them the lowest-cost entry point into rental property ownership.'),
    h2(s, 3, 'House Hacking with FHA'),
    p(s, 4, 'House hacking with an FHA loan means purchasing a duplex, triplex, or fourplex, living in one unit, and renting the others. On a $400,000 fourplex, your FHA down payment is just $14,000 compared to $80,000 to $100,000 with a conventional investment loan. The rental income from the other three units can cover most or all of your mortgage payment, meaning you live for free or near-free while building equity and landlord experience. This is how many successful investors acquire their first property.'),
    h2(s, 5, 'MIP: The Cost of Low Down Payment'),
    p(s, 6, 'FHA loans require Mortgage Insurance Premium, or MIP. There is an upfront MIP of 1.75% of the loan amount, typically rolled into the loan, plus an annual MIP of 0.55% to 1.05% paid monthly. On a $380,000 loan, the upfront MIP adds about $6,650 and the monthly MIP adds roughly $175 to $330 to your payment. For loans with less than 10% down, MIP lasts the entire loan term. This is a real cost, but when compared to the capital you did not have to put down, the trade-off often favors FHA for new investors.'),
    h2(s, 7, 'The Occupancy Requirement'),
    p(s, 8, 'FHA loans require you to occupy the property as your primary residence within 60 days of closing and for a minimum of one year. This is a legal requirement, not a suggestion. Occupancy fraud is taken seriously and can result in loan acceleration, fines, and criminal charges. After the one-year occupancy period, you are free to move out and convert the property to a full rental while keeping the FHA loan in place. Many investors execute this strategy repeatedly, buying a new house hack each year.'),
    h2(s, 9, 'FHA Loan Limits and Property Requirements'),
    p(s, 10, 'FHA loan limits vary by county and property type. In 2026, the standard limit for a single-family home is around $524,000, with higher limits in high-cost areas reaching over $1,100,000. Multifamily limits are higher. A fourplex in a standard area may qualify for an FHA loan up to approximately $1,000,000. The property must meet FHA minimum property standards, which means it needs to be in livable condition. Properties needing significant repair may require an FHA 203(k) rehabilitation loan instead.'),
    h2(s, 11, 'Using FHA Strategically to Build a Portfolio'),
    p(s, 12, 'The FHA house hack is the best first move for most aspiring investors. Start with a duplex or fourplex using 3.5% down. Live there for one year while learning property management firsthand with minimal risk. After the occupancy period, move into your next house hack using another owner-occupied loan product such as conventional 5% down. Repeat this cycle. Within 3 to 4 years, you can own multiple multifamily properties with minimal capital invested. Each property builds equity, generates cash flow, and provides the experience and track record you need to scale into larger commercial deals.'),
  ],

  'private-money-lending': (s) => [
    h2(s, 1, 'What Is Private Money Lending?'),
    p(s, 2, 'Private money lending involves borrowing capital from individual investors rather than banks, credit unions, or institutional lenders. These individuals might be friends, family members, business associates, self-directed IRA holders, or high-net-worth individuals looking for returns that exceed what they can earn in the stock market or savings accounts. Private money fills a critical niche in real estate investing by offering flexibility and speed that traditional financing cannot match.'),
    h2(s, 3, 'Private Money vs. Hard Money'),
    p(s, 4, 'While both are non-institutional lending sources, private money and hard money differ in important ways. Hard money comes from professional lending companies with standardized products, set rates, and formal processes. Private money comes from individuals and the terms are almost entirely negotiable. A private lender might offer 8% interest with no points because they value the relationship and the consistent return, while a hard money lender charges 12% plus 3 points because they operate as a business with overhead and profit margins.'),
    h2(s, 5, 'How to Find Private Lenders'),
    p(s, 6, 'Private lenders are found through relationships, not marketing. Start with your existing network: real estate investor meetups, local REI clubs, professional contacts, and even family members with retirement funds earning minimal returns. Share your track record and deal results. Once you successfully complete a few projects, word spreads. Many experienced investors have a stable of private lenders who proactively ask to fund their next deal. Self-directed IRA holders are an excellent target audience because they are already seeking alternative investments with better returns.'),
    h2(s, 7, 'Structuring Private Money Deals'),
    p(s, 8, 'Private money terms are negotiated deal by deal. Common structures include first-position mortgages at 8% to 12% interest with monthly interest-only payments and a balloon at 6 to 24 months, second-position notes behind a primary mortgage, and equity participation where the lender receives a share of profits instead of or in addition to interest. The key is structuring a deal where both parties benefit: the investor gets flexible, accessible capital and the lender earns a strong, secured return backed by real property.'),
    h2(s, 9, 'Legal Considerations'),
    p(s, 10, 'Private money lending must be handled with proper legal documentation. Every loan needs a promissory note outlining the terms, a mortgage or deed of trust recorded against the property giving the lender a secured position, and ideally a title insurance policy protecting the lender\'s interest. Use a real estate attorney to draft documents. Securities laws may apply if you are raising money from multiple passive investors, which crosses into syndication territory and requires compliance with SEC regulations. Never skip the legal work to save a few hundred dollars.'),
    h2(s, 11, 'Building Long-Term Private Lending Relationships'),
    p(s, 12, 'The best private money relationships are built on transparency, reliability, and mutual benefit. Send your lenders monthly updates on the project. Pay interest on time, every time. Return their capital when promised. Share your deal pipeline so they can plan their capital deployment. Over time, these relationships become your competitive advantage. Investors with reliable private money sources can move faster, bid more confidently, and close more deals than competitors dependent on institutional lending timelines and approval processes.'),
  ],

  'seller-financing': (s) => [
    h2(s, 1, 'What Is Seller Financing?'),
    p(s, 2, 'Seller financing is a transaction structure where the property seller acts as the lender, allowing the buyer to make payments directly to the seller instead of obtaining a bank mortgage. The seller retains a lien on the property through a mortgage or deed of trust and receives monthly payments of principal and interest according to negotiated terms. Seller financing eliminates the bank from the equation, creating a direct financial relationship between buyer and seller that offers flexibility unavailable through traditional lending.'),
    h2(s, 3, 'Why Sellers Offer Financing'),
    p(s, 4, 'Sellers offer financing for several strategic reasons. They may want to spread capital gains tax over multiple years through an installment sale rather than recognizing the entire gain at closing. They may want steady monthly income secured by property they know well. The property may be difficult to sell conventionally due to condition, zoning, or market challenges. Or they may want a higher sale price in exchange for favorable terms. Retired property owners with free-and-clear properties are the most common seller-financing candidates.'),
    h2(s, 5, 'Negotiating Seller Financing Terms'),
    p(s, 6, 'Everything is negotiable in a seller-financed deal: purchase price, down payment, interest rate, loan term, amortization period, and balloon payment date. Typical structures include 10% to 20% down payment, 5% to 8% interest rate, 5 to 10-year terms with a balloon payment, and payments amortized over 20 to 30 years. The seller often wants a higher price in exchange for favorable terms, and the buyer wants lower payments in exchange for paying that premium. Find the structure where both parties get what matters most to them.'),
    h2(s, 7, 'The Due-on-Sale Clause Risk'),
    p(s, 8, 'If the seller has an existing mortgage, it almost certainly contains a due-on-sale clause that gives the lender the right to demand full repayment when the property is transferred. Seller financing on a property with an existing mortgage creates a wrap-around structure where the seller collects payments from you while continuing to pay their mortgage. While lenders do not always enforce due-on-sale clauses, the risk exists. If the lender calls the loan, the seller must pay it off immediately. Understand and discuss this risk openly with the seller and get legal counsel.'),
    h2(s, 9, 'Seller Financing on No-Qualify Deals'),
    p(s, 10, 'One of the biggest advantages of seller financing is that there is no bank qualification. No credit check, no income verification, no DTI calculation, no underwriting. The seller decides whether to extend financing based on the deal structure, your down payment, and whatever criteria they choose. This makes seller financing invaluable for investors who cannot qualify conventionally due to recent self-employment, too many financed properties, or credit challenges. The property and the deal terms are the qualification.'),
    h2(s, 11, 'Finding and Structuring Seller-Financed Deals'),
    p(s, 12, 'Target properties that have been on the market for extended periods, especially those owned free and clear by older sellers. Look for listings that mention "owner will carry" or "flexible terms." When making offers, present seller financing as a benefit to the seller, emphasizing tax advantages, steady income, and a secured position backed by their property. Use a real estate attorney to draft all documents, including a promissory note, mortgage or deed of trust, and an escrow agreement for payment collection. Properly structured seller-financed deals are among the most creative and profitable tools in an investor\'s financing toolkit.'),
  ],

  'dti': (s) => [
    h2(s, 1, 'What Is Debt-to-Income Ratio?'),
    p(s, 2, 'Debt-to-income ratio, or DTI, is a financial metric that compares your total monthly debt payments to your gross monthly income, expressed as a percentage. Lenders use DTI as a primary measure of your ability to manage monthly payments and repay borrowed money. For real estate investors, DTI is often the limiting factor in conventional loan qualification because each investment property adds both income and debt to the calculation, and lenders are conservative about how they count rental income.'),
    h2(s, 3, 'The DTI Formula'),
    p(s, 4, 'DTI is calculated by dividing total monthly debt obligations by gross monthly income. Total debt includes all mortgage payments on all properties, car payments, student loans, minimum credit card payments, and any other recurring debt obligations. Gross monthly income includes salary, self-employment income, rental income, and other documented income sources. If your monthly debts total $5,000 and your gross income is $12,000, your DTI is 41.7%.'),
    h2(s, 5, 'Front-End vs. Back-End DTI'),
    p(s, 6, 'Lenders evaluate two types of DTI. Front-end DTI, also called the housing ratio, includes only housing-related expenses such as mortgage principal, interest, taxes, and insurance divided by gross income. The typical maximum front-end DTI is 28% to 31%. Back-end DTI includes all monthly debt obligations divided by gross income. The typical maximum back-end DTI is 43% to 45% for conventional loans, though some programs allow up to 50% with compensating factors like strong reserves or excellent credit.'),
    h2(s, 7, 'How Rental Income Counts in DTI'),
    p(s, 8, 'This is where things get tricky for investors. Conventional lenders typically count only 75% of rental income when calculating DTI, applying a 25% vacancy and maintenance haircut. So if a property rents for $2,000 per month, the lender credits you with $1,500 in income. Meanwhile, the full mortgage payment of perhaps $1,800 counts as debt. This means a cash-flowing property can actually increase your DTI on paper. You need two years of rental income on tax returns, or an appraisal showing market rent for new acquisitions, for lenders to include this income.'),
    h2(s, 9, 'DTI Strategies for Investors'),
    p(s, 10, 'To improve your DTI, work both sides of the equation. Increase income by documenting all rental income on tax returns, showing maximum W-2 or self-employment income, and considering adding a co-borrower with income. Reduce debt by paying off car loans, student loans, and credit cards before applying. Avoid taking on new debt in the months before mortgage applications. If your DTI is borderline, paying off a $300 per month car payment can free up enough room to qualify for an investment property mortgage.'),
    h2(s, 11, 'When DTI Becomes a Ceiling'),
    p(s, 12, 'Most scaling investors eventually hit the DTI wall with conventional lending. Each property adds a full mortgage payment to the debt side while only contributing 75% of rent to the income side. After 4 to 6 properties, even well-paid borrowers often exceed the 45% threshold. This is the point where alternative financing becomes essential. DSCR loans completely bypass DTI by qualifying on property income alone. Portfolio loans from local banks may use more flexible DTI calculations. Understanding when you will hit the DTI ceiling helps you plan your financing strategy and reserve your conventional loan slots for the deals where they matter most.'),
  ],

  'points': (s) => [
    h2(s, 1, 'What Are Points in Real Estate Lending?'),
    p(s, 2, 'In mortgage lending, points are fees paid to a lender at closing, where each point equals 1% of the loan amount. On a $250,000 loan, one point costs $2,500. There are two distinct types of points that serve different purposes: origination points, which are lender fees for processing and funding the loan, and discount points, which are prepaid interest used to buy down the interest rate. Understanding the difference between these two types is essential for evaluating the true cost of any loan.'),
    h2(s, 3, 'Origination Points: The Lender Fee'),
    p(s, 4, 'Origination points are the lender\'s fee for making the loan. They compensate the lender for underwriting, processing, and funding. Conventional and DSCR loans typically charge 0 to 1 origination point. Hard money lenders commonly charge 2 to 4 origination points because their loans involve more risk and shorter terms. Origination points are a cost of borrowing and are factored into the total cost of the loan. When comparing lenders, add origination points to all other fees for an apples-to-apples comparison.'),
    h2(s, 5, 'Discount Points: Buying Down Your Rate'),
    p(s, 6, 'Discount points allow you to pay upfront interest at closing in exchange for a lower interest rate over the loan term. Typically, one discount point reduces your rate by 0.25%, though this varies by lender and market conditions. On a $300,000 30-year loan, one discount point costs $3,000 and might reduce your rate from 7.25% to 7.0%, saving about $50 per month. The question is whether that $3,000 upfront investment is worth the ongoing monthly savings.'),
    h2(s, 7, 'Break-Even Analysis on Discount Points'),
    p(s, 8, 'The break-even point is how long you need to hold the loan before the monthly savings from discount points exceed the upfront cost. If one point costs $3,000 and saves $50 per month, the break-even is 60 months or 5 years. If you plan to hold the property and the loan for 10 years, buying points is profitable. If you plan to sell or refinance in 3 years, buying points loses money. Always run this calculation before paying for discount points. For short-term holds and BRRRR properties you plan to refinance, paying discount points rarely makes financial sense.'),
    h2(s, 9, 'Points in Hard Money and Bridge Lending'),
    p(s, 10, 'Points take on outsized importance in hard money and bridge loans because the terms are short and the point charges are high. A hard money loan with 3 origination points on a $200,000 loan costs $6,000 at closing. If the loan term is only 12 months, those 3 points are effectively adding 3% to your annual cost of borrowing. When comparing hard money lenders, model the total cost including points, interest, fees, and expected hold period. A lender charging lower points but a higher rate may be cheaper or more expensive depending on how long you hold the loan.'),
    h2(s, 11, 'Strategic Thinking About Points'),
    p(s, 12, 'Points are a lever in loan negotiation. Some lenders will reduce points in exchange for a higher rate, or vice versa. Ask for both options and calculate which is better for your specific situation. On long-term holds, lower rates usually win. On short-term deals, lower points usually win. When analyzing investment property deals, always include point costs in your total acquisition cost calculation. They reduce your initial return and affect your cash-on-cash metrics. Never overlook points when comparing financing options, and always push back because points are often negotiable.'),
  ],

  'pre-approval': (s) => [
    h2(s, 1, 'What Is Mortgage Pre-Approval?'),
    p(s, 2, 'A mortgage pre-approval is a lender\'s conditional commitment to lend you a specific dollar amount based on a thorough review of your financial situation. Unlike a pre-qualification, which is a rough estimate based on self-reported information, a pre-approval involves the lender pulling your credit, verifying your income and assets, and running your information through their underwriting guidelines. A pre-approval letter carries real weight with sellers and listing agents because it demonstrates you are a serious, capable buyer.'),
    h2(s, 3, 'Pre-Qualification vs. Pre-Approval'),
    p(s, 4, 'Pre-qualification is an informal assessment where a lender estimates how much you might borrow based on a conversation about your finances. No documents are verified and no credit is pulled. Pre-approval is a formal process where the lender reviews pay stubs, tax returns, bank statements, and credit reports to issue a conditional approval. In competitive markets, a pre-qualification letter is nearly worthless while a pre-approval letter can be the difference between winning and losing a deal. Always get fully pre-approved before making offers.'),
    h2(s, 5, 'What Lenders Check During Pre-Approval'),
    p(s, 6, 'The pre-approval process evaluates your credit score and history, two years of income documentation including tax returns and W-2s or 1099s, bank and investment account statements showing reserves and down payment funds, current debt obligations, and employment verification. For investors, lenders also review rental income from existing properties using lease agreements and tax returns. The underwriter is building a picture of your total financial capacity and risk profile.'),
    h2(s, 7, 'How Long Pre-Approval Lasts'),
    p(s, 8, 'Most pre-approval letters are valid for 60 to 90 days. After that, the lender needs to re-pull credit and verify that your financial situation has not changed. Keep your pre-approval current if you are actively looking at deals. Avoid making major financial changes during the pre-approval period: do not open new credit accounts, make large purchases, change jobs, or move money between accounts in ways that create sourcing questions. Any of these can jeopardize your approval when you go to close.'),
    h2(s, 9, 'Investment Property Pre-Approval Specifics'),
    p(s, 10, 'Pre-approval for investment properties differs from primary residence pre-approval in several ways. Lenders require larger reserves, typically 6 months of mortgage payments per financed property. Down payment requirements are higher at 20% to 25%. Your existing rental income is credited at only 75%. And each additional financed property adds scrutiny. If you own 5 or more financed properties, expect the pre-approval process to take longer and require more documentation. Work with a lender experienced in investor lending, not a retail lender focused on owner-occupied purchases.'),
    h2(s, 11, 'Using Pre-Approval as a Competitive Advantage'),
    p(s, 12, 'In competitive markets, a strong pre-approval letter separates serious investors from tire-kickers. Get pre-approved with multiple lenders so you can choose the best terms at closing. Include your pre-approval letter with every offer, and make sure it matches or exceeds the offer price. For investment properties, consider getting pre-approved with a DSCR lender in addition to a conventional lender so you have flexibility depending on the property. The investor who can close quickly and reliably wins deals, and pre-approval is the foundation of that capability.'),
  ],

  'refinance': (s) => [
    h2(s, 1, 'What Is Refinancing?'),
    p(s, 2, 'Refinancing is the process of replacing an existing mortgage with a new loan, typically to obtain a lower interest rate, change the loan term, or access accumulated equity through a cash-out refinance. For real estate investors, refinancing is not just a financial optimization tool but a core strategy for scaling. The cash-out refinance is the critical final step in the BRRRR method and the primary mechanism for recycling capital from one investment into the next.'),
    h2(s, 3, 'Rate-and-Term Refinance'),
    p(s, 4, 'A rate-and-term refinance replaces your existing loan with a new one at a different interest rate or loan term without taking out additional cash. The goal is to reduce monthly payments, lower total interest costs, or both. This makes sense when interest rates have dropped significantly since your original loan, when you want to switch from an adjustable rate to a fixed rate, or when you want to shorten the loan term to build equity faster. The new loan pays off the old one, and you continue with the new, more favorable terms.'),
    h2(s, 5, 'Cash-Out Refinance: The Scaling Engine'),
    p(s, 6, 'A cash-out refinance lets you borrow against your property\'s equity, receiving the difference between the new loan amount and the old loan balance as cash at closing. If your property is worth $300,000 and you owe $150,000, a 75% LTV cash-out refinance gives you a new $225,000 loan and $75,000 in cash after paying off the old mortgage. That $75,000 becomes your down payment on the next investment property. This is how BRRRR investors recycle capital to buy property after property without bringing new money to each deal.'),
    h2(s, 7, 'Seasoning Requirements'),
    p(s, 8, 'Seasoning is the minimum time you must own a property before refinancing. Conventional lenders typically require 6 to 12 months of seasoning before allowing a cash-out refinance based on a new appraised value rather than the original purchase price. DSCR lenders may have shorter seasoning periods, sometimes as little as 3 to 6 months. Hard money to permanent refinance transitions can sometimes happen with no seasoning at all if the loan is structured as a rate-and-term refinance. Understand the seasoning requirements before you buy so your BRRRR timeline is realistic.'),
    h2(s, 9, 'Break-Even Analysis'),
    p(s, 10, 'Every refinance has costs: appraisal fees, origination charges, title insurance, and closing costs typically totaling 2% to 5% of the loan amount. Calculate how many months of payment savings it takes to recoup these costs. If refinancing saves $200 per month and costs $6,000, your break-even is 30 months. If you plan to hold the property for 10 years, the refinance is clearly worthwhile. If you might sell in 2 years, it may not be. For cash-out refinances in BRRRR, the break-even calculation is different: you are evaluating the return on the capital you are extracting versus the cost of the new, larger loan.'),
    h2(s, 11, 'When to Refinance Investment Properties'),
    p(s, 12, 'Refinance when rates drop at least 0.75% to 1.0% below your current rate and you plan to hold long term. Refinance when you have completed value-add improvements and the property appraises significantly higher, unlocking equity. Refinance when transitioning from hard money or bridge financing to permanent financing. Refinance when you need capital for your next acquisition and the property has sufficient equity. Do not refinance just because rates dipped slightly or because a lender called with an offer. Run the numbers every time and make sure the refinance serves your portfolio strategy, not just one property in isolation.'),
  ],

  'underwriting': (s) => [
    h2(s, 1, 'What Is Mortgage Underwriting?'),
    p(s, 2, 'Underwriting is the process by which a lender evaluates the risk of making a loan by thoroughly analyzing the borrower, the property, and the deal structure. The underwriter is the gatekeeper between your loan application and the funded mortgage. Their job is to verify that everything in your application is accurate, assess the risk of default, and ensure the loan meets the lender\'s guidelines and any regulatory requirements. Understanding what underwriters look for helps you prepare stronger applications and avoid common pitfalls that delay or derail closings.'),
    h2(s, 3, 'The Four Pillars of Underwriting'),
    p(s, 4, 'Underwriters evaluate four core areas: credit, income, assets, and the property itself. Credit analysis looks at your score, payment history, and overall credit profile. Income analysis verifies your ability to make payments through W-2s, tax returns, or property income for DSCR loans. Asset analysis confirms you have sufficient funds for the down payment, closing costs, and reserves. Property analysis ensures the collateral supports the loan through an appraisal and property condition assessment. Weakness in any one area can sink the deal.'),
    h2(s, 5, 'Automated vs. Manual Underwriting'),
    p(s, 6, 'Most conventional loans go through automated underwriting systems like Fannie Mae\'s Desktop Underwriter or Freddie Mac\'s Loan Product Advisor. These systems provide an initial approval or denial in minutes based on your credit, income, and the property data. Loans that do not pass automated underwriting may be manually reviewed by a human underwriter who can consider compensating factors. Investment properties, especially for borrowers with multiple financed properties, are more likely to require manual underwriting because the complexity exceeds what automated systems handle well.'),
    h2(s, 7, 'Common Reasons for Underwriting Denial'),
    p(s, 8, 'Investment property loans are denied for several recurring reasons: DTI ratio exceeds the maximum threshold, insufficient reserves to cover 6 months of payments on all properties, unexplained large deposits in bank statements that create sourcing concerns, the appraisal comes in lower than the purchase price, rental income cannot be verified with lease agreements or tax returns, or the borrower changed jobs or took on new debt during the process. Most denials are preventable with proper preparation.'),
    h2(s, 9, 'How to Prepare for Underwriting Success'),
    p(s, 10, 'Start preparing 60 to 90 days before applying. Ensure all rental income appears on your most recent tax returns. Stabilize your bank accounts by avoiding large transfers or deposits that cannot be easily explained. Do not open or close credit accounts. Gather two years of tax returns, two months of bank statements, and current lease agreements for all rental properties. Prepare a real estate owned schedule listing every property, its value, mortgage balance, payment, and rental income. The more organized your documentation, the faster and smoother underwriting will be.'),
    h2(s, 11, 'Underwriting for Different Loan Types'),
    p(s, 12, 'Underwriting intensity varies by loan type. Conventional investment property loans receive the most scrutiny on borrower income and DTI. DSCR loans focus underwriting on the property\'s rental income relative to the mortgage payment, with less emphasis on personal income. Hard money underwriting prioritizes the property value and the borrower\'s exit strategy over personal financial documentation. Portfolio loans fall somewhere in between, with the bank\'s own criteria applying. Knowing what each loan type\'s underwriting emphasizes helps you choose the right product and prepare the right documentation for the fastest approval.'),
  ],

  'portfolio-loan': (s) => [
    h2(s, 1, 'What Is a Portfolio Loan?'),
    p(s, 2, 'A portfolio loan is a mortgage that the originating bank or credit union holds on its own books rather than selling to Fannie Mae, Freddie Mac, or the secondary market. Because the bank retains the loan, it can set its own underwriting guidelines instead of following standardized agency rules. This flexibility makes portfolio loans invaluable for real estate investors who do not fit neatly into conventional lending boxes, particularly those who have exceeded the 10-property Fannie Mae limit or have complex income structures.'),
    h2(s, 3, 'Why Portfolio Loans Exist'),
    p(s, 4, 'Banks offer portfolio loans because they want to build relationships with profitable customers. A real estate investor with 15 properties and strong cash flow is an attractive client even if they do not meet Fannie Mae guidelines. By portfolio lending, the bank earns interest income on the loan, earns deposits from the investor\'s business accounts, and builds a long-term banking relationship. The bank accepts the risk of holding the loan because the borrower and the deal are strong on their own merits.'),
    h2(s, 5, 'Portfolio Loan Terms and Trade-Offs'),
    p(s, 6, 'Portfolio loans typically carry interest rates 0.5% to 1.5% higher than conventional loans because the bank is holding the risk. Terms are often 5 to 10-year balloons with 25 to 30-year amortization, requiring refinancing at maturity. Down payment requirements are similar to conventional at 20% to 25%. The trade-off is clear: you pay more in rate and accept balloon risk in exchange for qualification flexibility, no property count limits, and the ability to finance deals that conventional lenders decline.'),
    h2(s, 7, 'Building Relationships with Portfolio Lenders'),
    p(s, 8, 'Portfolio lending is relationship banking. Start by identifying community banks and credit unions in your market that do portfolio lending, as not all of them do. Open business and personal deposit accounts. Meet with a commercial loan officer and share your investment portfolio, track record, and acquisition plan. Show them your rent rolls, financial statements, and business plan. Portfolio lenders want to see a professional investor who manages properties well and has a clear strategy. Once you establish a relationship and successfully close the first deal, subsequent loans become faster and easier.'),
    h2(s, 9, 'When to Use Portfolio Loans'),
    p(s, 10, 'Portfolio loans make the most sense when you have exceeded your 10 conventional loan slots, when your income documentation is too complex for automated underwriting, when you want to finance properties in an LLC without a personal guarantee on the note, or when the property type does not meet conventional standards such as mixed-use or commercial-residential hybrid properties. They also work well for blanket mortgages covering multiple properties under one loan. Reserve conventional financing for your strongest, longest-hold properties and use portfolio loans to continue scaling beyond conventional limits.'),
    h2(s, 11, 'Portfolio Loans vs. DSCR Loans'),
    p(s, 12, 'Both portfolio loans and DSCR loans serve investors beyond conventional limits, but they differ in important ways. DSCR loans are standardized products from specialized lenders with clear qualification criteria based on property income. Portfolio loans are custom products from relationship banks with more subjective underwriting. DSCR loans are generally available without an existing banking relationship, while portfolio loans require one. DSCR rates and portfolio rates can be similar, but portfolio loans may offer better terms for experienced investors with strong banking relationships and significant deposits. Many scaling investors use both products strategically across different properties in their portfolio.'),
  ],

  'blanket-mortgage': (s) => [
    h2(s, 1, 'What Is a Blanket Mortgage?'),
    p(s, 2, 'A blanket mortgage is a single loan that covers multiple properties under one financing agreement. Instead of managing separate mortgages for each property, an investor can consolidate several properties under one loan with one payment, one set of terms, and one lender relationship. Blanket mortgages are commonly used by investors who own multiple rental properties, developers with several lots, and commercial investors building or managing a portfolio of properties in the same market.'),
    h2(s, 3, 'How Blanket Mortgages Work'),
    p(s, 4, 'The lender evaluates the combined value and income of all properties covered by the blanket mortgage and issues a single loan secured by all of them. The loan amount is typically based on the combined LTV of the property portfolio, usually 65% to 75%. Terms often mirror commercial loans: 5 to 10-year terms with 20 to 25-year amortization and a balloon at maturity. Interest rates vary but generally fall in the portfolio loan range of 0.5% to 1.5% above conventional rates. One monthly payment covers the entire portfolio.'),
    h2(s, 5, 'The Release Clause'),
    p(s, 6, 'The release clause is the most important feature of any blanket mortgage. It specifies the conditions under which individual properties can be released from the blanket lien, typically by paying a predetermined release price. Without a release clause, you cannot sell one property without paying off the entire blanket mortgage. For example, a blanket mortgage covering five properties might allow you to sell any individual property by paying 110% to 125% of that property\'s allocated loan balance. Always negotiate a release clause before signing.'),
    h2(s, 7, 'Cross-Collateralization Risk'),
    p(s, 8, 'The primary risk of blanket mortgages is cross-collateralization. All properties secure the same loan, meaning a default on the blanket mortgage puts every property at risk of foreclosure, not just one. If your portfolio experiences a downturn and you struggle to make the single large payment, the lender can foreclose on any or all of the properties. With individual mortgages, a default on one property does not directly threaten the others. This concentration of risk is the most important factor to weigh when considering a blanket mortgage.'),
    h2(s, 9, 'When Blanket Mortgages Make Sense'),
    p(s, 10, 'Blanket mortgages work well when you are acquiring multiple properties simultaneously, such as a small portfolio sale. They simplify management when you have many properties and want to consolidate from numerous individual loans into one streamlined payment. They can also help when individual properties do not qualify for loans on their own but the combined portfolio is strong. Developers building multiple lots in a subdivision commonly use blanket construction loans. The efficiency of one loan, one closing, one set of costs, and one payment can be operationally valuable for larger portfolios.'),
    h2(s, 11, 'Finding Blanket Mortgage Lenders'),
    p(s, 12, 'Blanket mortgages are specialty products not offered by every lender. Community banks and credit unions that do portfolio lending are the most common source. Some DSCR lenders offer blanket products for rental portfolios. Commercial mortgage brokers can connect you with lenders who specialize in blanket financing. When evaluating lenders, compare total costs including rates, points, and fees across the entire portfolio. Negotiate the release clause terms carefully and ensure the balloon payment timeline aligns with your long-term strategy. A blanket mortgage should simplify your operations and improve your terms, not create additional risk through cross-collateralization that outweighs the convenience.'),
  ],
}

/* ─── main ─────────────────────────────────────────────────── */
const slugs = Object.keys(termContent)

async function main() {
  console.log(`\nEnrich Glossary Batch 2 — ${slugs.length} financing terms\n`)

  const existing = await client.fetch(
    `*[_type == "glossaryTerm" && slug.current in $slugs && !defined(body)]{ _id, term, "slug": slug.current }`,
    { slugs },
  )

  if (existing.length === 0) {
    console.log('No terms found without body content. They may already be enriched.')
    // Show which terms exist at all
    const all = await client.fetch(
      `*[_type == "glossaryTerm" && slug.current in $slugs]{ _id, term, "slug": slug.current, "hasBody": defined(body) }`,
      { slugs },
    )
    console.log(`\nFound ${all.length} matching terms total:`)
    for (const t of all) {
      console.log(`  ${t.hasBody ? '✓' : '✗'} ${t.term} (${t.slug})`)
    }
    const missing = slugs.filter((s) => !all.find((t) => t.slug === s))
    if (missing.length > 0) {
      console.log(`\nMissing from Sanity entirely: ${missing.join(', ')}`)
    }
    return
  }

  console.log(`Found ${existing.length} terms to enrich:\n`)

  let updated = 0
  for (const term of existing) {
    const contentFn = termContent[term.slug]
    if (!contentFn) {
      console.log(`  ⚠ No content defined for "${term.slug}", skipping`)
      continue
    }

    const body = contentFn(term.slug)

    try {
      await client.patch(term._id).set({ body }).commit()
      console.log(`  ✓ ${term.term} (${term.slug}) — ${body.length} blocks`)
      updated++
    } catch (err) {
      console.error(`  ✗ ${term.term} (${term.slug}) — ${err.message}`)
    }

    await sleep(500)
  }

  console.log(`\nDone. Updated ${updated}/${existing.length} terms.\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
