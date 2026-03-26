export type CategoryHubContent = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  faqs: Array<{ question: string; answer: string }>
  relatedCalculators: Array<{
    href: string
    label: string
    description: string
  }>
  relatedGlossaryCategory: string
}

export const categoryHubContent: CategoryHubContent[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Real Estate Investing',
    metaTitle:
      'Getting Started with Real Estate Investing — Guides & Resources | ProInvestorHub',
    metaDescription:
      'Everything you need to begin your real estate investing journey. Beginner guides, first deal checklists, and foundational concepts explained by an industry veteran.',
    description:
      'Real estate investing is one of the most proven paths to building long-term wealth — but getting started can feel overwhelming. This collection covers everything from understanding your first deal to building the foundational knowledge you need to invest with confidence. Whether you are evaluating your first rental property, learning how to analyze deals, or trying to understand which strategy fits your goals, these guides will help you take the first step.',
    faqs: [
      {
        question: 'How much money do I need to start investing in real estate?',
        answer:
          'You can start with as little as 3.5% down using an FHA loan on a house hack (owner-occupied 2-4 unit property). For a $200,000 duplex, that is about $7,000. Conventional investment property loans typically require 20-25% down. Some strategies like wholesaling require little to no capital upfront.',
      },
      {
        question: 'What is the best real estate investing strategy for beginners?',
        answer:
          'House hacking — buying a 2-4 unit property, living in one unit, and renting the others — is widely considered the best first move. It lets you use owner-occupied financing (lower rates, lower down payment) while learning to be a landlord with built-in training wheels.',
      },
      {
        question: 'Do I need a real estate license to invest?',
        answer:
          'No. You do not need a license to buy, own, or rent out investment properties. However, having a license can save you commission costs and give you direct MLS access. Many investors operate without one.',
      },
      {
        question: 'How do I find my first investment property?',
        answer:
          'Start by choosing a target market based on your strategy (cash flow vs appreciation), then use tools like the MLS, Zillow, or local wholesalers. Analyze every potential deal with a calculator to verify the numbers work before making offers.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/rental-cashflow',
        label: 'Rental Cash Flow Calculator',
        description: 'See if a property will generate positive monthly income',
      },
      {
        href: '/calculators/cap-rate',
        label: 'Cap Rate Calculator',
        description: 'Calculate the unlevered return on any property',
      },
      {
        href: '/calculators/mortgage',
        label: 'Mortgage Calculator',
        description: 'Estimate monthly payments and DSCR ratios',
      },
    ],
    relatedGlossaryCategory: 'general',
  },
  {
    slug: 'deal-analysis',
    title: 'Deal Analysis for Real Estate Investors',
    metaTitle:
      'Real Estate Deal Analysis — Guides & Calculators | ProInvestorHub',
    metaDescription:
      'Learn how to analyze real estate investment deals like a pro. Cap rate, cash-on-cash return, NOI, rent-to-price ratio, and more explained with examples.',
    description:
      'Deal analysis is the single most important skill in real estate investing. A great deal in the wrong market still beats a bad deal in a hot market — but only if you can tell the difference. These guides cover every metric and method you need to evaluate rental properties, flips, and BRRRR deals. From cap rate and cash-on-cash return to NOI and the 1% rule, learn how to run the numbers like an experienced investor.',
    faqs: [
      {
        question: 'What is a good cap rate for rental properties?',
        answer:
          'Generally, 6-10% is considered a good cap rate for rental properties. Above 8% is strong for cash flow, while 4-6% is typical in appreciation-focused markets. The "right" cap rate depends on your strategy and risk tolerance.',
      },
      {
        question: 'What is the 1% rule in real estate?',
        answer:
          'The 1% rule states that monthly rent should equal at least 1% of the purchase price. A $200,000 property should rent for at least $2,000/month. It is a quick screening tool, not a definitive analysis — always run full numbers.',
      },
      {
        question: 'How do I calculate cash-on-cash return?',
        answer:
          'Cash-on-cash return = Annual Pre-Tax Cash Flow / Total Cash Invested. If you invest $50,000 (down payment + closing costs) and earn $5,000/year in cash flow after all expenses and debt service, your cash-on-cash return is 10%.',
      },
      {
        question: 'What is NOI and why does it matter?',
        answer:
          'Net Operating Income (NOI) = Gross Rental Income - Operating Expenses (excluding debt service). It measures a property\'s profitability before financing, making it useful for comparing properties regardless of how they are financed.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/cap-rate',
        label: 'Cap Rate Calculator',
        description: 'Calculate cap rate from income and expenses',
      },
      {
        href: '/calculators/cash-on-cash',
        label: 'Cash-on-Cash Return Calculator',
        description: 'Measure your return on actual cash invested',
      },
      {
        href: '/calculators/rental-cashflow',
        label: 'Rental Cash Flow Calculator',
        description: 'Full income and expense analysis',
      },
      {
        href: '/calculators/compare',
        label: 'Deal Comparison Tool',
        description: 'Compare two deals side by side',
      },
    ],
    relatedGlossaryCategory: 'analysis',
  },
  {
    slug: 'financing',
    title: 'Real Estate Investment Financing',
    metaTitle:
      'Real Estate Financing for Investors — Loans, DSCR & More | ProInvestorHub',
    metaDescription:
      'Understand real estate investment financing options: conventional loans, DSCR loans, hard money, FHA, and creative financing. Expert guidance from a 30+ year lending veteran.',
    description:
      'Financing is where deals are made or broken. Understanding your options — from conventional mortgages to DSCR loans, hard money, and creative structures — gives you a competitive edge. These guides draw on 30+ years of mortgage lending experience to explain how real estate financing actually works, what lenders look for, and how to structure deals that get funded. Whether you are buying your first property or scaling a portfolio, the right financing strategy amplifies your returns.',
    faqs: [
      {
        question: 'What is a DSCR loan?',
        answer:
          'A Debt Service Coverage Ratio (DSCR) loan qualifies based on the property\'s rental income rather than your personal income. If the property generates enough rent to cover the mortgage payment (typically 1.0-1.25x), you can qualify regardless of your W-2 income. Popular with portfolio investors.',
      },
      {
        question: 'Can I use an FHA loan for an investment property?',
        answer:
          'Not directly — FHA loans require owner occupancy. However, you can buy a 2-4 unit property with an FHA loan (3.5% down), live in one unit, and rent the others. This is the basis of house hacking and is one of the most powerful strategies for new investors.',
      },
      {
        question: 'What is hard money lending?',
        answer:
          'Hard money loans are short-term (6-18 months), asset-based loans from private lenders. They fund quickly (days vs weeks), focus on the property\'s value rather than borrower credit, and are commonly used for fix-and-flip or BRRRR deals. Interest rates are typically 10-15%.',
      },
      {
        question: 'How many investment properties can I finance?',
        answer:
          'Conventional lenders typically allow up to 10 financed properties. Beyond that, you will need portfolio lenders, DSCR loans, or commercial financing. Many investors use a mix of loan types as they scale.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/mortgage',
        label: 'Mortgage/DSCR Calculator',
        description: 'Calculate payments and DSCR ratios',
      },
      {
        href: '/calculators/cash-on-cash',
        label: 'Cash-on-Cash Return Calculator',
        description: 'See how leverage affects returns',
      },
      {
        href: '/calculators/brrrr',
        label: 'BRRRR Calculator',
        description: 'Model the full BRRRR financing cycle',
      },
    ],
    relatedGlossaryCategory: 'financing',
  },
  {
    slug: 'markets',
    title: 'Real Estate Market Analysis',
    metaTitle:
      'Real Estate Market Analysis — Data & City Rankings | ProInvestorHub',
    metaDescription:
      'Data-driven real estate market analysis for investors. City rankings, cap rate comparisons, population trends, and market selection guides across 52 US markets.',
    description:
      'Market selection can make or break your investment returns. A mediocre deal in a great market often outperforms a great deal in a declining one. These guides cover how to evaluate markets, what metrics matter most, and where the opportunities are right now. We track 52 US markets with detailed data on cap rates, rent-to-price ratios, vacancy, population growth, and property taxes — and rank them across four investment strategies.',
    faqs: [
      {
        question: 'What makes a good real estate investment market?',
        answer:
          'It depends on your strategy. Cash flow markets need high rent-to-price ratios and low taxes. Appreciation markets need population growth and income growth. The best markets combine multiple factors — affordable entry, strong rents, low vacancy, and positive demographic trends.',
      },
      {
        question: 'Should I invest locally or out of state?',
        answer:
          'Both can work. Local investing gives you hands-on control but limits your market options. Out-of-state investing opens access to better numbers but requires strong property management. Many successful investors start local, then expand to markets with better fundamentals.',
      },
      {
        question: 'How many markets do you track?',
        answer:
          'We track 52 US markets across 29 states, ranked across four strategies: cash flow, BRRRR, house hacking, and appreciation. Each market is analyzed using 10+ metrics including cap rates, rent-to-price ratios, vacancy rates, population growth, and property taxes.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/cap-rate',
        label: 'Cap Rate Calculator',
        description: 'Compare returns across markets',
      },
      {
        href: '/calculators/rental-cashflow',
        label: 'Rental Cash Flow Calculator',
        description: 'Test deals in your target market',
      },
    ],
    relatedGlossaryCategory: 'general',
  },
  {
    slug: 'strategies',
    title: 'Real Estate Investing Strategies',
    metaTitle:
      'Real Estate Investing Strategies — BRRRR, Cash Flow & More | ProInvestorHub',
    metaDescription:
      'Explore real estate investing strategies: BRRRR, buy-and-hold, house hacking, fix-and-flip, wholesaling, and more. Learn which strategy fits your goals.',
    description:
      'There is no single "right" way to invest in real estate — the best strategy depends on your capital, goals, risk tolerance, and timeline. These guides break down every major strategy: buy-and-hold for passive income, BRRRR for rapid portfolio growth, house hacking for your first deal, fix-and-flip for active income, and wholesaling for no-money-down dealmaking. Each guide covers how the strategy works, who it is best for, and how to execute it.',
    faqs: [
      {
        question: 'What is the BRRRR strategy?',
        answer:
          'BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. You buy a distressed property below market value, renovate it, rent it out, refinance at the new higher value to recover your capital, then repeat with the next deal. It lets you scale with limited capital.',
      },
      {
        question: 'What is the difference between cash flow and appreciation investing?',
        answer:
          'Cash flow investing prioritizes monthly income — buying properties that generate positive cash after all expenses. Appreciation investing bets on property values increasing over time. The best strategies often combine both, but your market choice determines which one dominates.',
      },
      {
        question: 'Is wholesaling real estate investing?',
        answer:
          'Wholesaling is more of a deal-sourcing business than traditional investing — you contract properties and assign the contract to a buyer for a fee without ever owning the property. It requires minimal capital but significant hustle and marketing spend.',
      },
      {
        question: 'Which strategy builds wealth fastest?',
        answer:
          'BRRRR typically builds a portfolio fastest because you recycle capital on each deal. However, it requires active management and renovation expertise. House hacking with forced appreciation (buying, renovating, renting) is the fastest path for beginners with limited capital.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/brrrr',
        label: 'BRRRR Calculator',
        description: 'Model the full BRRRR cycle',
      },
      {
        href: '/calculators/fix-flip',
        label: 'Fix & Flip Calculator',
        description: 'Estimate flip profits and ROI',
      },
      {
        href: '/calculators/wholesale',
        label: 'Wholesale Calculator',
        description: 'Calculate assignment fees and MAO',
      },
      {
        href: '/calculators/rental-cashflow',
        label: 'Rental Cash Flow Calculator',
        description: 'Analyze buy-and-hold deals',
      },
    ],
    relatedGlossaryCategory: 'strategies',
  },
  {
    slug: 'tax-legal',
    title: 'Tax & Legal for Real Estate Investors',
    metaTitle:
      'Real Estate Tax Strategies & Legal Guide | ProInvestorHub',
    metaDescription:
      'Real estate tax strategies, legal structures, and compliance guides for investors. Depreciation, 1031 exchanges, LLCs, and more.',
    description:
      'Tax strategy is often where investors leave the most money on the table. Real estate offers more tax advantages than almost any other asset class — from depreciation and mortgage interest deductions to 1031 exchanges and cost segregation studies. These guides cover the tax and legal fundamentals every investor needs: how to structure ownership, minimize tax liability, and protect your assets. Note: Always consult a qualified CPA or attorney for advice specific to your situation.',
    faqs: [
      {
        question: 'What is a 1031 exchange?',
        answer:
          'A 1031 exchange lets you defer capital gains taxes by reinvesting sale proceeds into a "like-kind" property within specific timelines (45 days to identify, 180 days to close). It is one of the most powerful tax tools for real estate investors building long-term wealth.',
      },
      {
        question: 'Should I use an LLC for my rental properties?',
        answer:
          'An LLC provides liability protection by separating your personal assets from your rental business. Most investors use an LLC for each property or small group of properties. However, LLC structure can complicate financing — consult both an attorney and lender before deciding.',
      },
      {
        question: 'What is depreciation in real estate?',
        answer:
          'The IRS allows you to depreciate residential rental property over 27.5 years, deducting a portion of the property value from your taxable income each year. This "paper loss" can offset rental income and even other income in some cases, significantly reducing your tax bill.',
      },
      {
        question: 'What is cost segregation?',
        answer:
          'Cost segregation is an engineering study that reclassifies building components (flooring, fixtures, landscaping) into shorter depreciation schedules (5, 7, or 15 years instead of 27.5). Combined with bonus depreciation, it can generate massive first-year tax deductions.',
      },
    ],
    relatedCalculators: [
      {
        href: '/calculators/1031-exchange',
        label: '1031 Exchange Calculator',
        description: 'Model tax-deferred exchange scenarios',
      },
      {
        href: '/calculators/rental-cashflow',
        label: 'Rental Cash Flow Calculator',
        description: 'See after-tax cash flow impact',
      },
    ],
    relatedGlossaryCategory: 'tax',
  },
]
