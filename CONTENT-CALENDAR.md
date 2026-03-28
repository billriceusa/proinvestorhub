# ProInvestorHub Content Calendar

## Newsletter Infrastructure (LIVE)

### How It Works
The newsletter is fully automated via a Vercel cron job:
- **Cron:** Runs every Sunday at 8am UTC (`/api/cron/weekly-newsletter`)
- **AI:** Claude Sonnet 4.6 generates all content (via Anthropic SDK)
- **Preview:** Sent to bill@billricestrategy.com for review
- **Broadcast:** Scheduled to subscribers via Resend every Tuesday 2pm UTC
- **Archive:** Each issue committed to GitHub (`data/newsletter-archive/`)

### Newsletter Sections
1. **Personal Intro** — Bill's weekly commentary on markets
2. **Real Estate News & Lending Update** — 3-4 current market news items
3. **Featured Article** — Best blog post of the week
4. **Investor Tips From the Field** — 3 exclusive tips (newsletter only)
5. **RE Investing 101** — Progressive education (24-week curriculum, 6 phases)
6. **Market Insight** — Timely data point or trend
7. **Weekly Blog Digest** — One-liners for each new post
8. **CTA** — Drive to calculators/guides
9. **Closing Note** — Personal sign-off from Bill

### Education Curriculum (24 Weeks, Cyclical)
- Phase 1 (Wk 1-4): Foundations — cap rate, cash-on-cash, NOI, 1% rule
- Phase 2 (Wk 5-8): Deal Analysis — 50% rule, DSCR, pro forma, comps
- Phase 3 (Wk 9-12): Strategies — BRRRR, house hacking, cash flow vs appreciation, fix & flip
- Phase 4 (Wk 13-16): Financing — conventional vs DSCR, private money, seller financing, leverage
- Phase 5 (Wk 17-20): Advanced — IRR, cost segregation, 1031 exchanges, RE pro status
- Phase 6 (Wk 21-24): Portfolio — scaling, portfolio analysis, entity structures, wealth building

### Key Env Vars (all on Vercel)
| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude AI for newsletter generation |
| `RESEND_API_KEY` | Email delivery |
| `RESEND_AUDIENCE_ID` | Broadcast audience |
| `RESEND_FROM_EMAIL` | Sender address |
| `CRON_SECRET` | Cron job auth |

---

## Content Pillars

| Pillar | Topics | Target Keywords |
|--------|--------|-----------------|
| **Deal Analysis** | Cap rate, CoC return, NOI, pro forma, comps | "how to analyze rental property," "cap rate calculator" |
| **Investment Strategies** | BRRRR, house hacking, fix & flip, STR, MTR, buy & hold | "brrrr method explained," "house hacking guide" |
| **Financing** | DSCR loans, hard money, FHA, seller financing, refinance | "dscr loan requirements," "investment property loan" |
| **Tax & Legal** | 1031 exchange, depreciation, cost seg, LLC, RE pro status | "1031 exchange rules," "real estate depreciation" |
| **Market Analysis** | Emerging markets, cap rate trends, rent growth, supply | "best markets for rental properties 2026" |
| **Getting Started** | First property, mistakes to avoid, portfolio building | "how to start investing in real estate" |

---

## 12-Week Launch Calendar

### Week 1 (March 17, 2026)
**Blog:** "How to Analyze a Rental Property in Under 5 Minutes"
- Pillar: Deal Analysis
- Keywords: analyze rental property, deal analysis checklist
- Link to: Cap Rate Calculator, Cash-on-Cash Calculator

**Newsletter #1:** "The 3 Numbers That Make or Break Every Deal"
- Featured: The blog post above
- Tool Spotlight: Cap Rate Calculator
- Term: Net Operating Income (NOI)

---

### Week 2 (March 24, 2026)
**Blog:** "BRRRR Method: The Complete Step-by-Step Guide for 2026"
- Pillar: Investment Strategies
- Keywords: brrrr method, brrrr strategy guide
- Link to: BRRRR Calculator, glossary/brrrr-method

**Newsletter #2:** "The Strategy That Lets You Recycle Capital Infinitely"
- Featured: BRRRR guide
- Tool Spotlight: BRRRR Calculator
- Term: After Repair Value (ARV)

---

### Week 3 (March 31, 2026)
**Blog:** "DSCR Loans Explained: How to Qualify Without W-2 Income"
- Pillar: Financing
- Keywords: dscr loan, investment property loan without income
- Link to: Mortgage/DSCR Calculator, glossary/dscr-loan

**Newsletter #3:** "The Loan Product That Changed the Game for Investors"
- Featured: DSCR article
- Tool Spotlight: Mortgage/DSCR Calculator
- Term: Debt Service Coverage Ratio (DSCR)

---

### Week 4 (April 7, 2026)
**Blog:** "House Hacking 101: Live for Free While Building Wealth"
- Pillar: Getting Started
- Keywords: house hacking, live for free real estate
- Link to: Rental Cash Flow Calculator, glossary/house-hacking

**Newsletter #4:** "Your Housing Payment Could Be $0 — Here's How"
- Featured: House hacking guide
- Tool Spotlight: Rental Cash Flow Calculator
- Term: FHA Loan

---

### Week 5 (April 14, 2026)
**Blog:** "Fix and Flip: A Realistic Guide to Flipping Houses in 2026"
- Pillar: Investment Strategies
- Keywords: house flipping guide, fix and flip
- Link to: Fix & Flip Calculator, glossary/fix-and-flip

**Newsletter #5:** "Is Flipping Still Profitable? The Numbers Don't Lie"
- Featured: Fix & flip guide
- Tool Spotlight: Fix & Flip Calculator
- Term: The 70% Rule

---

### Week 6 (April 21, 2026)
**Blog:** "1031 Exchange Rules: How to Defer Capital Gains Legally"
- Pillar: Tax & Legal
- Keywords: 1031 exchange rules, tax deferred exchange
- Link to: glossary/1031-exchange, glossary/qualified-intermediary

**Newsletter #6:** "The Tax Strategy That Saves Investors Six Figures"
- Featured: 1031 Exchange guide
- Also: Link to depreciation glossary entry
- Term: Qualified Intermediary (QI)

---

### Week 7 (April 28, 2026)
**Blog:** "Cash-on-Cash Return vs. Cap Rate: Which Metric Matters More?"
- Pillar: Deal Analysis
- Keywords: cash on cash return vs cap rate, real estate metrics
- Link to: Both calculators

**Newsletter #7:** "The Metric Debate: Why You Need Both Numbers"
- Featured: Cash-on-Cash vs Cap Rate comparison
- Tool Spotlight: Cash-on-Cash Calculator
- Term: Leverage

---

### Week 8 (May 5, 2026)
**Blog:** "Real Estate Depreciation: The Tax Benefit Most Investors Overlook"
- Pillar: Tax & Legal
- Keywords: real estate depreciation, cost segregation
- Link to: glossary/depreciation, glossary/cost-segregation

**Newsletter #8:** "This Tax Deduction Doesn't Cost You a Dime"
- Featured: Depreciation article
- Also: Link to cost segregation glossary
- Term: Cost Segregation

---

### Week 9 (May 12, 2026)
**Blog:** "Short-Term Rentals vs. Long-Term Rentals: Which Is Right for You?"
- Pillar: Investment Strategies
- Keywords: airbnb vs long term rental, short term rental investing
- Link to: glossary/short-term-rental, Rental Cash Flow Calculator

**Newsletter #9:** "The Airbnb vs. Traditional Rental Debate, Settled"
- Featured: STR vs LTR comparison
- Tool Spotlight: Rental Cash Flow Calculator
- Term: Midterm Rental (MTR)

---

### Week 10 (May 19, 2026)
**Blog:** "How to Calculate NOI: The Foundation of Every Real Estate Deal"
- Pillar: Deal Analysis
- Keywords: net operating income calculation, noi formula
- Link to: Cap Rate Calculator, glossary/noi

**Newsletter #10:** "Master This One Number and Every Deal Gets Easier"
- Featured: NOI deep-dive
- Also: Link to operating expense ratio glossary
- Term: Effective Gross Income (EGI)

---

### Week 11 (May 26, 2026)
**Blog:** "10 Biggest Mistakes First-Time Real Estate Investors Make"
- Pillar: Getting Started
- Keywords: real estate investing mistakes, beginner mistakes
- Link to: Multiple calculators and glossary entries

**Newsletter #11:** "We've Seen These Mistakes Destroy Deals — Don't Be Next"
- Featured: Mistakes article
- Also: Link to due diligence glossary
- Term: Due Diligence

---

### Week 12 (June 2, 2026)
**Blog:** "The Best Real Estate Markets for Cash Flow in 2026"
- Pillar: Market Analysis
- Keywords: best markets for rental property, cash flow markets 2026
- Link to: Cap Rate Calculator, glossary/cap-rate-compression

**Newsletter #12:** "Where Smart Money Is Flowing in 2026"
- Featured: Market analysis article
- Also: Link to absorption rate glossary
- Term: Cap Rate Compression

---

## Completed (March 21, 2026)

### Blog Posts — All 10 Published
- [x] "How to Build a Real Estate Portfolio from Scratch"
- [x] "Seller Financing: The Creative Deal Structure Most Investors Miss"
- [x] "Property Management: DIY vs. Hiring a Manager"
- [x] "How to Use the BRRRR Calculator to Vet Deals Faster"
- [x] "FHA Loans for Investors: The House Hacker's Secret Weapon"
- [x] "Understanding Cap Rate Compression: What It Means for Your Portfolio"
- [x] "Real Estate vs. Stocks: A Data-Driven Comparison"
- [x] "How to Find Off-Market Deals in Any Market"
- [x] "The Ultimate Guide to Tenant Screening"
- [x] "Hard Money vs. DSCR Loans: Which Is Right for Your Deal?"

### Glossary Expansion — Done
- [x] All 150 glossary terms have rich body content (500-800 words each)

### Calculator Enhancements — All Done
- [x] Amortization schedule visualization (mortgage calculator)
- [x] PDF export for all 9 calculators
- [x] Save/share deal analysis links (all 9 calculators)
- [x] Comparison mode — side-by-side deals at `/calculators/compare`

### E-E-A-T & Author Pages — Done
- [x] `/about` — Bill Rice bio, 30+ years lending, BRSG, why he built the site
- [x] `/authors/bill-rice` — Author profile with all articles, credentials, LinkedIn
- [x] JSON-LD Person schema on all articles with sameAs/URL
- [x] Blog post author sections link to profile with credentials
- [x] `/start-here` — 4-step learning roadmap, 24-week curriculum preview, FAQ

### Affiliate Expansion — Done
- [x] 8 tools with UTM tracking: DealCheck, Baselane, RentRedi, Landlord Studio, Stessa, Kiavi, Buildium, Roofstock
- [x] Contextual placement across calculators and blog posts

### Infrastructure — Done
- [x] All AI migrated from OpenAI to Claude (Anthropic SDK)
- [x] Sanity write token regenerated
- [x] Google Search Console verified
- [x] Bing Webmaster set up
- [x] All Vercel env vars configured

---

## Lender Directory (SHIPPED March 28, 2026)

### What's Live
- [x] `/lenders` hub — 12 loan types, 20 curated lenders, comparison table, FAQs
- [x] `/lenders/[loanType]` — 12 loan type guide pages with filtered lender listings
- [x] `/lenders/reviews/[slug]` — 20 individual lender profiles with editorial reviews
- [x] `/lenders/[loanType]/[state]` — 600 programmatic state × loan type pages
- [x] `/lenders/compare` — Side-by-side comparison tool (select 2-3 lenders)
- [x] `/lenders/finder` — Interactive scenario matcher (credit, experience, strategy)
- [x] UTM tracking on all outbound lender links (partners see proinvestorhub referral)
- [x] GA4 `lender_cta_click` event on all outbound CTAs
- [x] Sanity schemas + seed script — all data editable in Studio
- [x] Nav consolidated: Blog/Glossary/Guides under "Learn" dropdown, Lenders top-level

---

## Lender Directory Backlog

### High Priority — Revenue & Traffic

- [ ] **Lender-vs-lender comparison pages** (`/lenders/compare/kiavi-vs-lima-one`)
  - Programmatic head-to-head pages for meaningful lender pairings
  - Captures branded search: "Kiavi vs Lima One" — no one owns these keywords
  - ~50-100 pages, mostly templated from existing structured data

- [ ] **"Best lenders for [strategy]" pages** (`/lenders/best-for/brrrr`, `/lenders/best-for/first-time-investor`)
  - 8-10 pages targeting strategy-specific financing queries
  - "best lenders for BRRRR strategy", "loans for first-time real estate investors"
  - Filter existing lender data by bestForTags

- [ ] **Blog content linking to lender directory**
  - Update existing financing articles (DSCR, hard money) to link to directory pages
  - Write 3-4 new financing comparison articles that feed into directory
  - Newsletter Phase 4 (Financing) should reference directory

- [ ] **Direct lender affiliate relationships**
  - Kiavi affiliate link already exists in tool-links.ts
  - Reach out to Lima One, RCN Capital, New Silver — all have affiliate programs
  - Swap `affiliateUrl` into lender profiles as partnerships are established

### Medium Priority — Engagement & Conversion

- [ ] **Homepage update**
  - Add "Find Your Lender" CTA to hero alongside "Try Our Calculators"
  - Update tagline to mention financing/lender directory
  - Add lender directory section below fold

- [ ] **Email drip for lender directory visitors**
  - Lead magnet: "Investor Financing Cheat Sheet" (PDF comparing all loan types)
  - Downloadable from `/lenders` hub, gates with email
  - 5-email drip sequence on financing education → drives back to directory

- [ ] **Lender directory newsletter integration**
  - Add "Financing Update" section to weekly newsletter
  - Highlight a lender of the week or rate changes
  - Drive newsletter subscribers back to directory

- [ ] **User reviews / testimonials**
  - Add `reviews` array to lender Sanity schema
  - Start with your own network — investors you know who use these lenders
  - Social proof dramatically increases outbound click-through

### Lower Priority — Scale & Polish

- [ ] **Lender logo images in Sanity**
  - Upload logos for all 20 lenders through Sanity Studio
  - Display on cards, profile pages, and comparison tables

- [ ] **Rate monitoring / freshness cron**
  - Cron job that flags lender data older than 90 days
  - Add `lastVerified` field to lender schema
  - Rates change — stale data hurts credibility

- [ ] **City-level lender pages** (`/lenders/hard-money/texas/houston`)
  - City-level pages for top 50 markets
  - Cross-link with existing market city pages
  - Captures "[loan type] lenders in [city]" local search

- [ ] **Interactive rate comparison chart**
  - Visual chart showing rate ranges across all lenders for a loan type
  - Embedded on loan type pages
  - More engaging than tables for visual learners

---

## Deferred

- **Google Analytics/Search Console API integration** — blocked by GCP org policy (daily performance + SEO audit crons)
- **Affiliate monetization** — add affiliate IDs once traffic justifies partnerships
- Video content integration
- Community/comments on blog posts

## SEO Strategy Notes
- Every blog post should link to 2-3 glossary terms and 1 calculator
- Every calculator page includes educational content below the tool
- Target 1 primary keyword + 2-3 secondary keywords per post
- Meta descriptions should include a call-to-action ("Free calculator included")
- Internal linking between related content is critical for authority building
- Lender directory pages should link to related calculators, glossary terms, and market pages
