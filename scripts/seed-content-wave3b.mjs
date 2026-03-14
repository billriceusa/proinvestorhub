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

/**
 * Build a paragraph block with inline links.
 * segments: array of { text } or { text, href }
 */
function pLink(key, segments) {
  const children = []
  const markDefs = []
  segments.forEach((seg, i) => {
    const spanKey = `${key}s${i}`
    if (seg.href) {
      const markKey = `${key}m${i}`
      markDefs.push({ _type: 'link', _key: markKey, href: seg.href })
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [markKey] })
    } else {
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [] })
    }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children }
}

// ══════════════════════════════════════════════════════
// House Flipping: The Complete Guide for 2026
// ══════════════════════════════════════════════════════
const houseFlippingGuide = {
  _type: 'post',
  title: 'House Flipping: The Complete Guide for 2026',
  slug: { _type: 'slug', current: 'house-flipping-complete-guide' },
  publishedAt: '2026-03-27T10:00:00Z',
  excerpt: 'A data-driven guide to flipping houses in 2026 — from finding deals and estimating rehab costs to financing, managing renovations, and maximizing profit.',
  seo: {
    metaTitle: 'House Flipping Guide 2026: How to Flip Houses Profitably | ProInvestorHub',
    metaDescription: 'Complete guide to flipping houses in 2026. Learn the 70% rule, rehab cost estimation, financing options, and how to maximize profit with our free calculators.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    p('hf01', 'House flipping has made more headlines, spawned more TV shows, and created more misconceptions than any other real estate investing strategy. The reality in 2026 is more nuanced than the glossy before-and-after photos suggest. Flipping is a legitimate business that rewards careful analysis, disciplined execution, and relentless attention to holding costs. It is also a business that punishes guessing, emotional buying, and sloppy project management.'),
    p('hf02', 'The numbers tell the story. According to ATTOM Data, the average gross ROI on house flips in 2025 was approximately 25 to 30 percent, down from the 40-plus percent margins common during the pandemic era. Average project timelines have stretched to about 161 days from purchase to sale. Hard money interest rates sit between 10 and 14 percent. Margins are tighter than they were three years ago, but profitable flips are absolutely still happening every day — for investors who run the numbers before they run the renovation.'),
    pLink('hf03', [
      { text: 'This guide is built for the 2026 market. We will cover how to evaluate deals using the ' },
      { text: '70% rule', href: '/blog/70-percent-rule-house-flipping' },
      { text: ', how to find properties, estimate ' },
      { text: 'rehab costs', href: '/glossary/rehab-costs' },
      { text: ', finance your flip, manage the renovation, and sell for maximum profit. We will also cover the tax implications that many new flippers overlook and introduce you to the tools that take the guesswork out of deal analysis. Whether this is your first flip or your fiftieth, the principles here will sharpen your edge.' },
    ]),

    // ── Section 1: Is House Flipping Still Profitable in 2026? ──
    h2('hf04', 'Is House Flipping Still Profitable in 2026?'),
    p('hf05', 'Let us start with an honest assessment. The house flipping landscape in 2026 looks fundamentally different from 2021 or 2022. During the pandemic boom, almost any property purchased at a reasonable price could be flipped for a profit because home values were rising 15 to 20 percent annually. That tide has receded. Home price appreciation has normalized to 3 to 5 percent in most markets, which means your profit now comes from buying right and renovating efficiently — not from a rising market bailing out your mistakes.'),
    p('hf06', 'The average gross profit on a flip in late 2025 was roughly $67,000 to $73,000 per project, with a gross ROI around 25 to 30 percent. But gross profit is not net profit. Once you subtract buying costs (closing costs, inspection, title), holding costs (interest, insurance, taxes, utilities), renovation costs, and selling costs (agent commissions, seller concessions, transfer taxes), the net margin on a typical flip is closer to 10 to 15 percent. On a $300,000 sale, that is $30,000 to $45,000 in your pocket — solid money, but not the six-figure windfalls that television likes to portray.'),
    p('hf07', 'The flippers who are thriving in 2026 share common traits. They buy at steep discounts through off-market channels. They have reliable contractor relationships that keep renovation costs predictable. They manage timelines aggressively because they understand that every day of holding cost erodes profit. And they run every deal through a disciplined analysis framework before making an offer — not after.'),
    pLink('hf08', [
      { text: 'The bottom line: house flipping is absolutely still profitable in 2026, but only for investors who treat it as a business with real numbers, not a hobby with hopeful projections. Use our ' },
      { text: 'fix and flip calculator', href: '/calculators/fix-flip' },
      { text: ' to stress-test every deal before you commit capital.' },
    ]),

    // ── Section 2: The 70% Rule Explained ──
    h2('hf09', 'The 70% Rule Explained'),
    pLink('hf10', [
      { text: 'The 70% rule is the most widely used quick-analysis formula in house flipping. It gives you a maximum purchase price that, if followed, should leave enough margin for renovation costs, holding costs, selling costs, and profit. The formula is simple: Maximum Purchase Price equals the ' },
      { text: 'ARV', href: '/glossary/arv' },
      { text: ' (After Repair Value) multiplied by 70 percent, minus estimated repair costs.' },
    ]),
    bq('hf11', 'Maximum Purchase Price = (ARV x 70%) - Repair Costs'),
    p('hf12', 'Let us walk through a worked example. You identify a distressed property in a neighborhood where comparable renovated homes sell for $300,000. That $300,000 is your ARV. Your contractor estimates the renovation will cost $50,000. Applying the 70% rule: $300,000 times 0.70 equals $210,000, minus $50,000 in repairs, equals a maximum purchase price of $160,000.'),
    p('hf13', 'At that $160,000 purchase price, your all-in cost would be roughly $210,000 (purchase plus rehab). If you sell at $300,000 and pay approximately 8 to 10 percent in total transaction costs (buying and selling), you net around $60,000 to $66,000 before holding costs. Subtract three to five months of holding costs at $3,000 to $4,000 per month, and your net profit lands between $45,000 and $54,000. That is a healthy margin.'),
    h3('hf14', 'When to Bend the 70% Rule'),
    p('hf15', 'The 70% rule is a guideline, not a law. In expensive coastal markets where ARVs exceed $600,000, many successful flippers work with 75 to 80 percent of ARV because the absolute dollar margin is still large. On a $900,000 ARV property, even at 80 percent minus $100,000 in repairs, you are buying at $620,000 with a potential gross profit of $180,000 — plenty of room for error. Conversely, in lower-priced markets with ARVs under $200,000, you may need to stick with 65 percent to protect yourself because the absolute dollar margins are thin and a single cost overrun can wipe out your profit.'),
    pLink('hf16', [
      { text: 'For a deep dive into applying this formula across different scenarios, read our complete guide to the ' },
      { text: '70% rule for house flipping', href: '/blog/70-percent-rule-house-flipping' },
      { text: '.' },
    ]),

    // ── Section 3: Finding Flip Properties ──
    h2('hf17', 'Finding Flip Properties'),
    p('hf18', 'Finding deals at the right price is the single biggest challenge in house flipping. The best flips are rarely found on the MLS at retail asking prices. They come from motivated sellers, distressed situations, and channels where you face less competition. Building multiple deal-finding pipelines is essential for consistent deal flow.'),
    h3('hf19', 'Foreclosures and Bank-Owned Properties'),
    p('hf20', 'Foreclosures and REO (Real Estate Owned) properties are classic flip targets. Banks want these off their books and are often willing to sell below market value. Track foreclosure filings in your target counties, attend courthouse auctions if your state allows them, and build relationships with asset managers at local banks and credit unions. Auction purchases typically require cash and no inspection contingency, so this channel is best for experienced flippers who can estimate repair costs by walking the exterior.'),
    h3('hf21', 'Off-Market Deals'),
    pLink('hf22', [
      { text: 'Off-market properties — deals that never hit the MLS — offer the least competition and typically the best prices. Direct mail campaigns targeting absentee owners with high equity, ' },
      { text: 'driving for dollars', href: '/blog/how-to-find-off-market-deals' },
      { text: ' (physically searching neighborhoods for distressed properties), cold calling, and door knocking are all proven strategies. Pre-foreclosure lists, probate filings, and code violation records are goldmines for finding motivated sellers who need to move quickly.' },
    ]),
    h3('hf23', 'Wholesalers'),
    p('hf24', 'Wholesalers find deals, put them under contract, and assign the contract to a flipper for an assignment fee (typically $5,000 to $15,000). A good wholesaler becomes a reliable deal pipeline. The key is verifying their numbers independently — never take a wholesaler\'s ARV or repair estimate at face value. Always run your own comps, walk the property with your contractor, and apply the 70% rule before agreeing to a price.'),
    h3('hf25', 'MLS Opportunities'),
    p('hf26', 'While the MLS is the most competitive channel, opportunities still exist. Look for listings with 60-plus days on market, multiple price reductions, estate sales, or listings with terrible photos and descriptions that are scaring away retail buyers. Work with an investor-friendly agent who can set up automated searches based on your criteria and alert you within minutes of new listings that fit your buy box.'),

    // ── Section 4: Estimating Rehab Costs ──
    h2('hf27', 'Estimating Rehab Costs'),
    pLink('hf28', [
      { text: 'Accurate ' },
      { text: 'rehab cost estimation', href: '/blog/brrrr-rehab-cost-estimation' },
      { text: ' is what separates profitable flippers from those who lose money. Underestimating rehab costs is the number one reason flips fail. Every dollar you miss in your estimate comes directly out of your profit. Overestimating, while safer, means you pass on deals that could have been profitable.' },
    ]),
    h3('hf29', 'Cost Categories by Renovation Level'),
    p('hf30', 'Cosmetic renovations — paint, flooring, fixtures, landscaping, and minor updates — typically cost $15 to $30 per square foot. These are the fastest, simplest flips with the least risk. A 1,500-square-foot home needing only cosmetic work might cost $22,500 to $45,000 to renovate. These projects can often be completed in four to six weeks.'),
    p('hf31', 'Moderate renovations add kitchen and bathroom remodels, new HVAC, updated electrical panels, roof repairs, and window replacement to the cosmetic scope. Budget $30 to $60 per square foot. A 1,500-square-foot moderate rehab runs $45,000 to $90,000 and typically takes eight to twelve weeks.'),
    p('hf32', 'Full gut renovations — stripping the property to studs, replacing all mechanical systems, reconfiguring layouts, and building essentially new construction inside an existing shell — cost $60 to $120 per square foot or more. A 1,500-square-foot gut rehab runs $90,000 to $180,000 and takes four to six months. These projects carry the highest risk but can also generate the largest margins when purchased correctly.'),
    h3('hf33', 'Getting Accurate Bids'),
    p('hf34', 'Never rely on a single contractor estimate. Get at least three bids for every project, and make sure each contractor is bidding on the same detailed scope of work. Create a line-item budget that breaks the project into specific categories: demolition, framing, electrical, plumbing, HVAC, drywall, flooring, kitchen, bathrooms, paint, landscaping, and permits. This line-item approach makes it easy to compare bids and identify which contractor is over or under on specific trades.'),
    h3('hf35', 'The Contingency Buffer'),
    p('hf36', 'Always add a contingency buffer of 10 to 20 percent to your total estimated rehab cost. On a $60,000 rehab, budget $66,000 to $72,000. The contingency covers surprises that are invisible until demolition begins: termite damage, mold behind walls, faulty wiring, cracked foundations, and plumbing issues. If you do not use the contingency, it becomes additional profit. If you need it and do not have it, you are funding the overage out of your margin — or worse, out of pocket.'),
    pLink('hf37', [
      { text: 'For detailed cost breakdowns by trade and a rehab budgeting framework, see our guide to ' },
      { text: 'BRRRR rehab cost estimation', href: '/blog/brrrr-rehab-cost-estimation' },
      { text: ' — the cost principles apply equally to flips.' },
    ]),

    // ── Section 5: The Daily Burn Rate ──
    h2('hf38', 'The Daily Burn Rate: The Number Most Flippers Ignore'),
    p('hf39', 'Here is the concept that separates amateur flippers from professionals: your daily burn rate. Every single day you own a flip property, you are spending money — whether construction is happening or not. This daily cost is relentless, invisible to casual analysis, and the single biggest threat to your profit margin.'),
    pLink('hf40', [
      { text: 'Let us break down the daily costs on a typical $300,000 property financed with a ' },
      { text: 'hard money loan', href: '/glossary/hard-money-loan' },
      { text: ' at 12 percent interest. The interest alone is $300,000 times 12 percent divided by 365, which equals approximately $98.63 per day. Add property insurance at roughly $5 per day, property taxes at roughly $8 per day, utilities (electric, water, gas to keep the property serviceable) at roughly $7 per day, and lawn care or HOA fees at roughly $3 per day. Your total daily burn rate is approximately $122 per day.' },
    ]),
    bq('hf41', 'At $122 per day, every week of delay costs you $854. Every month costs $3,660. A two-month timeline overrun wipes out $7,320 in profit.'),
    p('hf42', 'This is why timeline management is not just a project management concern — it is a financial survival skill. The best flippers track their daily burn rate obsessively and structure every decision around minimizing the total number of days they own the property. Material selections are made before closing. Permits are pulled the day after purchase. Contractors are scheduled weeks in advance. The listing agent is chosen and staging is planned before the final coat of paint dries.'),
    p('hf43', 'The daily burn rate also changes how you think about renovation scope. That extra bathroom remodel that adds $8,000 in value but takes an additional three weeks? It is not a $8,000 decision. It is an $8,000 revenue gain minus the $8,000 in renovation cost minus $2,562 in additional holding costs — making it a $2,562 net loss. Run every scope decision through the burn rate filter.'),

    // ── Section 6: Financing Your Flip ──
    h2('hf44', 'Financing Your Flip'),
    pLink('hf45', [
      { text: 'How you finance your flip dramatically impacts your profit. The cost of capital varies widely, and each financing option has tradeoffs between speed, cost, flexibility, and qualification requirements. Understanding your options lets you match the right financing to each deal. Your ' },
      { text: 'LTV', href: '/glossary/ltv' },
      { text: ' (loan-to-value) ratio and exit strategy will determine which options are available.' },
    ]),
    h3('hf46', 'Hard Money Loans'),
    pLink('hf47', [
      { text: '' },
      { text: 'Hard money loans', href: '/glossary/hard-money-loan' },
      { text: ' are the most common financing for house flips. These are short-term (6 to 18 months), asset-based loans funded by private lending companies. They typically cover 70 to 85 percent of the purchase price and 100 percent of rehab costs (funded through a draw schedule). Interest rates run 10 to 14 percent with 1 to 3 points (origination fees). The advantage is speed — hard money can close in 7 to 14 days — and qualification is based primarily on the deal, not your personal income.' },
    ]),
    p('hf48', 'The downside is cost. On a $200,000 loan at 12 percent with 2 points, you are paying $4,000 in origination fees plus approximately $66 per day in interest. Over a 5-month project, your total financing cost is roughly $14,000. That is money coming directly out of your profit. Still, for most flippers, the speed and accessibility of hard money makes it the default choice.'),
    h3('hf49', 'DSCR Bridge Loans'),
    p('hf50', 'Some DSCR lenders offer short-term bridge products designed for fix-and-flip projects. These often have lower rates than traditional hard money (8 to 11 percent) but may require more documentation, higher credit scores, and longer closing timelines (14 to 30 days). If you have experience and strong credit, bridge loans can save thousands in interest over the life of a project.'),
    h3('hf51', 'Private Money'),
    p('hf52', 'Private money comes from individuals — friends, family, colleagues, or investors in your network — who lend their own capital secured by the property. Terms are fully negotiable, making private money potentially the most flexible and cost-effective financing available. A common structure is 8 to 10 percent interest with no points and interest-only payments. Building a private lending network takes time but can become your greatest competitive advantage.'),
    h3('hf53', 'Conventional Financing'),
    p('hf54', 'Conventional bank loans offer the lowest interest rates (6 to 8 percent) but the slowest closing timelines (30 to 45 days), stricter qualification requirements, and they often will not lend on properties in poor condition. Some investors use conventional financing for light cosmetic flips where the property is habitable and the timeline allows for a longer close. This approach works best when you are not competing against cash buyers or hard money speed.'),
    h3('hf55', 'Partnership and Joint Ventures'),
    p('hf56', 'When you have the skills but not the capital — or the capital but not the time — a joint venture partnership can be the solution. A common structure is one partner provides all the capital and the other handles all the work, with profits split 50/50. JV agreements should be formalized in writing with clear terms covering capital contributions, responsibilities, decision-making authority, dispute resolution, and exit procedures. Never flip with a partner on a handshake deal.'),

    // ── Section 7: Managing the Rehab ──
    h2('hf57', 'Managing the Rehab'),
    p('hf58', 'Renovation management is where house flipping lives or dies. A perfectly purchased property with a beautifully estimated budget can still lose money if the renovation runs over time, over budget, or results in subpar work that does not command the target ARV. Treat every renovation like a business project with defined scope, timeline, budget, and quality standards.'),
    h3('hf59', 'General Contractor vs. Self-Managing'),
    p('hf60', 'Hiring a general contractor (GC) means paying a markup of 15 to 25 percent on all subcontractor work, but you gain a single point of accountability, permit management, scheduling coordination, and (hopefully) quality control. Self-managing — hiring and coordinating individual subcontractors yourself — saves the GC markup but requires significantly more time, knowledge, and project management skill. Most new flippers should start with a GC. As you gain experience and build relationships with reliable subs, you can transition to self-managing and capture the margin.'),
    h3('hf61', 'Creating a Detailed Scope of Work'),
    p('hf62', 'The scope of work (SOW) is the most important document in your renovation. It specifies exactly what will be done, what materials will be used, and what the finished product should look like — room by room, trade by trade. A detailed SOW eliminates misunderstandings, prevents scope creep, and gives you a legal basis for holding contractors accountable. Include specific material selections (tile model numbers, paint colors, fixture SKUs), quality standards (level 4 drywall finish, for example), and completion dates for each phase.'),
    h3('hf63', 'Timeline Management'),
    p('hf64', 'Create a Gantt chart or critical path schedule that shows which tasks can run in parallel and which are sequential. Demolition must happen before rough-in. Rough-in must happen before drywall. Drywall must happen before painting and finish work. But while interior trades are working, exterior work (roofing, siding, landscaping) can often proceed simultaneously. Identify the critical path — the longest chain of sequential tasks — and focus your management attention there, because any delay on the critical path delays the entire project.'),
    h3('hf65', 'Draw Schedules and Payments'),
    p('hf66', 'Never pay a contractor the full amount upfront. Structure payments as draws tied to completed milestones: 10 percent at signing, 25 percent at completion of demolition and rough-in, 25 percent at drywall completion, 25 percent at finish work completion, and 15 percent after final walkthrough and punch list completion. This draw schedule keeps the contractor motivated to finish and protects you from paying for work that has not been done. Hard money lenders typically fund rehab draws on a similar milestone basis after their inspector verifies completed work.'),
    h3('hf67', 'Handling Scope Creep'),
    p('hf68', 'Scope creep — the gradual expansion of work beyond the original plan — is a profit killer. Once demolition begins, you will inevitably discover issues that were not visible during your initial walkthrough: rotted subfloor, outdated wiring that does not meet code, plumbing that needs replacement, or structural issues requiring engineering. This is why the contingency buffer exists. When scope changes arise, evaluate each one against your burn rate and profit margin. Ask three questions: Is this change required by code or safety? Does this change increase the ARV enough to justify the cost plus the additional holding time? Can this change be deferred or done more cheaply? Not every discovered problem needs a gold-plated solution.'),
    h3('hf69', 'Inspection Checkpoints'),
    p('hf70', 'Schedule inspection checkpoints at each major phase transition. Walk the property after demolition to assess hidden conditions. Inspect rough-in work (framing, electrical, plumbing, HVAC) before drywall closes the walls. Check drywall quality before painting begins. Do a detailed walkthrough before final payment. And conduct a comprehensive punch list inspection before listing the property. Each checkpoint is an opportunity to catch problems when they are cheap to fix rather than after the next phase of work has covered them up.'),

    // ── Section 8: Selling Strategy ──
    h2('hf71', 'Selling Strategy'),
    p('hf72', 'Your selling strategy should be planned before the renovation begins, not after it ends. The target buyer profile, listing price, staging approach, and marketing plan all influence renovation decisions. A flip targeting first-time buyers in the $250,000 range needs a different finish level than one targeting move-up buyers at $600,000.'),
    h3('hf73', 'Listing Agent Selection'),
    p('hf74', 'Choose a listing agent who specializes in your target neighborhood and price range. Review their recent sales data: how many days on market, what percentage of list price they achieve, and how they market properties. The best agents for flips understand investor timelines and price to sell within 15 to 30 days rather than testing the market at aspirational prices. Interview at least three agents and ask for a marketing plan specific to your property. A strong agent should be identified and consulted before renovation finishes so they can advise on final finish selections that appeal to your target buyer.'),
    h3('hf75', 'Staging and Presentation'),
    p('hf76', 'Professional staging typically costs $2,000 to $5,000 for a single-family home and consistently delivers a return on investment of 3 to 5 times the cost. Staged homes sell faster and for more money — studies show an average of 5 to 10 percent higher sale prices and 50 percent fewer days on market. At your daily burn rate of $122, cutting 30 days off the market time saves $3,660 in holding costs alone. Factor staging into your renovation budget from day one, not as an afterthought.'),
    h3('hf77', 'Pricing Strategy'),
    p('hf78', 'Price your flip based on recent comparable sales within a half-mile radius, adjusted for condition, features, and market trend. Price to sell, not to test. In the current market, listing at or slightly below the most comparable recent sale generates the most showings, the most offers, and the fastest closing. An overpriced flip that sits on the market for 60 days costs you $7,320 in holding costs and signals to buyers that something is wrong with the property. Strategic underpricing to generate a bidding war can work in hot markets but carries risk in balanced or cooling markets.'),
    h3('hf79', 'When to Wholesale Exit vs. Retail Sale'),
    p('hf80', 'Sometimes the smartest exit is not a retail sale. If your renovation uncovers problems that would be too expensive to fix profitably, or if the market shifts during your project, consider assigning or selling the property to another investor at a reduced price. Taking a small profit or even breaking even is always better than pouring more capital into a deal that has turned against you. Know your walk-away number before you start and monitor it throughout the project.'),

    // ── Section 9: Tax Implications ──
    h2('hf81', 'Tax Implications of House Flipping'),
    pLink('hf82', [
      { text: 'Here is the tax reality that surprises many new flippers: profits from house flipping are typically taxed as ordinary income, not ' },
      { text: 'capital gains', href: '/glossary/capital-gains' },
      { text: '. The IRS considers frequent flippers to be "dealers" in real estate rather than "investors." This distinction has significant financial consequences.' },
    ]),
    h3('hf83', 'Dealer vs. Investor Status'),
    p('hf84', 'If you are classified as a dealer — someone who buys properties primarily for resale rather than for investment — your flip profits are treated as ordinary business income. This means you pay your full marginal income tax rate (up to 37 percent federally in 2026) plus self-employment tax of 15.3 percent on the first $168,600 of net earnings and 2.9 percent above that threshold. On a $50,000 flip profit, a dealer in the 32 percent tax bracket could owe approximately $23,650 in combined federal taxes. That same $50,000, if treated as long-term capital gains for an investor, would be taxed at 15 to 20 percent with no self-employment tax — roughly $7,500 to $10,000.'),
    h3('hf85', 'How Holding Period Affects Tax Treatment'),
    p('hf86', 'Holding period is one factor the IRS considers when determining dealer vs. investor status, but it is not the only one. Properties held for less than twelve months are almost always treated as dealer inventory if flipping is your primary activity. Properties held for more than twelve months have a stronger argument for investor treatment, especially if you rented them during the hold period. Some flippers use a hybrid strategy: buy, renovate, rent for twelve-plus months, then sell to potentially qualify for long-term capital gains treatment. This strategy has its own risks and should be discussed with a CPA.'),
    h3('hf87', 'Structuring Your Flipping Business'),
    pLink('hf88', [
      { text: 'Most professional flippers operate through an LLC or S-Corporation for liability protection and potential tax benefits. An S-Corp structure can reduce self-employment tax by allowing you to pay yourself a reasonable salary and take additional profits as distributions, which are not subject to self-employment tax. However, the IRS scrutinizes unreasonably low salaries, so work with a tax professional to find the right balance. For a comprehensive overview of real estate tax strategies, including entity structuring and depreciation benefits for properties you hold rather than flip, read our ' },
      { text: 'real estate tax strategies guide', href: '/blog/real-estate-tax-strategies-guide' },
      { text: '.' },
    ]),

    // ── Section 10: Your Flip Analysis Tool ──
    h2('hf89', 'Your Flip Analysis Tool'),
    pLink('hf90', [
      { text: 'Every concept in this guide comes together when you sit down to analyze a specific deal. Our ' },
      { text: 'fix and flip calculator', href: '/calculators/fix-flip' },
      { text: ' lets you plug in the purchase price, ARV, estimated rehab costs, financing terms, and holding period to see your projected profit instantly. It accounts for buying costs, selling costs, financing costs, and holding costs — the complete picture that back-of-napkin math misses.' },
    ]),
    pLink('hf91', [
      { text: 'Use the calculator to run multiple scenarios. What happens if rehab costs come in 20 percent over budget? What if the property takes 60 extra days to sell? What if you can negotiate the purchase price down by $10,000? Scenario analysis is how professionals make decisions. Our ' },
      { text: 'mortgage calculator', href: '/calculators/mortgage' },
      { text: ' can also help you model conventional financing scenarios, and our ' },
      { text: 'BRRRR calculator', href: '/calculators/brrrr' },
      { text: ' is useful if you are considering a BRRRR exit (renovate, rent, refinance, hold) instead of a retail sale.' },
    ]),
    p('hf92', 'The cardinal rule of house flipping has not changed since the first investor swung a hammer: you make your money when you buy, not when you sell. The 70% rule, accurate rehab estimates, a realistic daily burn rate, and disciplined execution are not optional. They are the foundation of every profitable flip.'),
    pLink('hf93', [
      { text: 'Get familiar with the numbers, start with the ' },
      { text: 'fix and flip calculator', href: '/calculators/fix-flip' },
      { text: ', and run at least ten deals on paper before you buy your first property. For broader context on value-add real estate strategies, explore our ' },
      { text: 'BRRRR method complete guide', href: '/blog/brrrr-method-complete-guide' },
      { text: ' — the BRRRR approach shares many fundamentals with flipping but substitutes a refinance-and-hold exit for a retail sale. Understanding both strategies gives you maximum flexibility in any market.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [houseFlippingGuide]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 3b Content Seed: House Flipping Complete Guide\n')

  // Look up author by name
  const author = await client.fetch(
    `*[_type == "author" && name == "Bill Rice"][0]{ _id }`
  )
  if (!author) {
    console.error('Author "Bill Rice" not found in Sanity. Create the author first.')
    process.exit(1)
  }
  console.log(`Found author: ${author._id}`)

  // Look up "Strategies" category by title
  const strategiesCat = await client.fetch(
    `*[_type == "category" && title == "Strategies"][0]{ _id }`
  )
  if (!strategiesCat) {
    console.error('Category "Strategies" not found in Sanity.')
    process.exit(1)
  }
  console.log(`Found category "Strategies": ${strategiesCat._id}`)

  // Assign author and category refs to posts
  for (const post of posts) {
    post.author = { _type: 'reference', _ref: author._id }
    post.categories = [
      { _type: 'reference', _ref: strategiesCat._id, _key: 'c1' },
    ]
  }

  // Check for existing posts by slug to avoid duplicates
  const slugs = posts.map((p) => p.slug.current)
  const existing = await client.fetch(
    `*[_type == "post" && slug.current in $slugs]{ slug }`,
    { slugs }
  )
  const existingSlugs = new Set(existing.map((d) => d.slug.current))

  if (existingSlugs.size > 0) {
    console.log('\nFound existing posts (will skip):')
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
