export interface EducationTopic {
  week: number;
  phase: number;
  phaseTitle: string;
  topic: string;
  subtitle: string;
  keyConceptsToTeach: string[];
  linkedGlossaryTerms: string[];
  linkedCalculators: string[];
}

export const EDUCATION_PHASES = [
  "Foundations",
  "Deal Analysis",
  "Strategies",
  "Financing",
  "Advanced Concepts",
  "Portfolio Building",
] as const;

export const EDUCATION_CURRICULUM: EducationTopic[] = [
  // Phase 1: Foundations (Weeks 1-4)
  {
    week: 1,
    phase: 1,
    phaseTitle: "Foundations",
    topic: "What Is Cap Rate and Why It Matters",
    subtitle: "The single most important metric in real estate investing",
    keyConceptsToTeach: [
      "Cap rate formula: NOI / Purchase Price",
      "What a 'good' cap rate looks like in different markets",
      "How to use cap rate to compare properties quickly",
      "The relationship between cap rate and risk",
    ],
    linkedGlossaryTerms: ["cap-rate", "net-operating-income"],
    linkedCalculators: ["/calculators/cap-rate"],
  },
  {
    week: 2,
    phase: 1,
    phaseTitle: "Foundations",
    topic: "Cash-on-Cash Return Explained",
    subtitle: "How to measure what your actual dollars are earning",
    keyConceptsToTeach: [
      "Cash-on-cash formula: Annual Cash Flow / Total Cash Invested",
      "Why cash-on-cash matters more than cap rate for leveraged deals",
      "Target ranges for different strategies",
      "How leverage amplifies (or destroys) cash-on-cash return",
    ],
    linkedGlossaryTerms: ["cash-on-cash-return", "leverage"],
    linkedCalculators: ["/calculators/cash-on-cash"],
  },
  {
    week: 3,
    phase: 1,
    phaseTitle: "Foundations",
    topic: "Net Operating Income (NOI) — The Foundation of Every Deal",
    subtitle: "Learn to calculate the number that drives every investment decision",
    keyConceptsToTeach: [
      "NOI formula: Gross Income - Operating Expenses",
      "What counts as operating expenses (and what doesn't)",
      "Why mortgage payments are NOT included in NOI",
      "How to spot inflated NOI on listing sheets",
    ],
    linkedGlossaryTerms: ["net-operating-income", "operating-expense-ratio"],
    linkedCalculators: ["/calculators/cap-rate", "/calculators/rental-cashflow"],
  },
  {
    week: 4,
    phase: 1,
    phaseTitle: "Foundations",
    topic: "The 1% Rule and Quick Deal Screening",
    subtitle: "How to filter 100 properties down to 5 worth analyzing",
    keyConceptsToTeach: [
      "The 1% rule: monthly rent should be at least 1% of purchase price",
      "When the 1% rule works and when it breaks down",
      "Other quick-screen metrics: price-to-rent ratio, GRM",
      "Building a 60-second deal screening process",
    ],
    linkedGlossaryTerms: ["gross-rent-multiplier"],
    linkedCalculators: ["/calculators/rental-cashflow"],
  },

  // Phase 2: Deal Analysis (Weeks 5-8)
  {
    week: 5,
    phase: 2,
    phaseTitle: "Deal Analysis",
    topic: "The 50% Rule for Expense Estimation",
    subtitle: "A surprisingly accurate shortcut for estimating expenses",
    keyConceptsToTeach: [
      "The 50% rule: operating expenses will eat roughly half of gross rent",
      "What's included in the 50% (taxes, insurance, maintenance, vacancy, management)",
      "When the 50% rule overestimates vs underestimates",
      "Using the 50% rule to quickly estimate cash flow",
    ],
    linkedGlossaryTerms: ["operating-expense-ratio", "vacancy-rate"],
    linkedCalculators: ["/calculators/rental-cashflow"],
  },
  {
    week: 6,
    phase: 2,
    phaseTitle: "Deal Analysis",
    topic: "DSCR — The Metric Lenders Care About Most",
    subtitle: "Understanding Debt Service Coverage Ratio and why it unlocks financing",
    keyConceptsToTeach: [
      "DSCR formula: NOI / Annual Debt Service",
      "Why lenders require DSCR of 1.20-1.25 or higher",
      "How DSCR affects your loan terms and rates",
      "Strategies to improve DSCR on a borderline deal",
    ],
    linkedGlossaryTerms: ["dscr-loan", "debt-service"],
    linkedCalculators: ["/calculators/mortgage"],
  },
  {
    week: 7,
    phase: 2,
    phaseTitle: "Deal Analysis",
    topic: "Building a Pro Forma From Scratch",
    subtitle: "How to project income and expenses for any investment property",
    keyConceptsToTeach: [
      "Components of a pro forma: income schedule, expense breakdown, debt service, cash flow",
      "How to research realistic rent estimates",
      "Common expenses and realistic percentages to budget",
      "Stress-testing your pro forma with vacancy and rate scenarios",
    ],
    linkedGlossaryTerms: ["net-operating-income", "vacancy-rate"],
    linkedCalculators: ["/calculators/rental-cashflow", "/calculators/cap-rate"],
  },
  {
    week: 8,
    phase: 2,
    phaseTitle: "Deal Analysis",
    topic: "Running Comps and Estimating Value",
    subtitle: "How to determine what a property is actually worth",
    keyConceptsToTeach: [
      "What makes a good comparable sale (location, size, condition, timing)",
      "Price per square foot analysis",
      "Adjusting comps for differences in features and condition",
      "Using cap rate comps for income properties",
    ],
    linkedGlossaryTerms: ["after-repair-value", "cap-rate"],
    linkedCalculators: ["/calculators/cap-rate"],
  },

  // Phase 3: Strategies (Weeks 9-12)
  {
    week: 9,
    phase: 3,
    phaseTitle: "Strategies",
    topic: "The BRRRR Method Step by Step",
    subtitle: "Buy, Rehab, Rent, Refinance, Repeat — the wealth-building machine",
    keyConceptsToTeach: [
      "Each step of BRRRR explained with a real example",
      "How to calculate if a BRRRR deal will return all your capital",
      "The 70-75% refinance rule and why ARV matters so much",
      "Common BRRRR pitfalls and how to avoid them",
    ],
    linkedGlossaryTerms: ["brrrr-method", "after-repair-value"],
    linkedCalculators: ["/calculators/brrrr"],
  },
  {
    week: 10,
    phase: 3,
    phaseTitle: "Strategies",
    topic: "House Hacking — Your First Investment Strategy",
    subtitle: "How to live for free while building wealth",
    keyConceptsToTeach: [
      "House hacking models: duplex, room rental, ADU",
      "Using FHA loans with 3.5% down for house hacking",
      "How to analyze a house hack deal differently than a pure rental",
      "Tax advantages of living in your investment property",
    ],
    linkedGlossaryTerms: ["house-hacking", "fha-loan"],
    linkedCalculators: ["/calculators/rental-cashflow", "/calculators/mortgage"],
  },
  {
    week: 11,
    phase: 3,
    phaseTitle: "Strategies",
    topic: "Cash Flow vs Appreciation — Choosing Your Strategy",
    subtitle: "Two paths to wealth and when to prioritize each",
    keyConceptsToTeach: [
      "Cash flow strategy: steady income now, lower appreciation potential",
      "Appreciation strategy: lower cash flow, higher long-term wealth",
      "Hybrid approach: targeting both in the right markets",
      "How your financial situation and goals dictate the right strategy",
    ],
    linkedGlossaryTerms: ["cash-flow", "cap-rate-compression"],
    linkedCalculators: ["/calculators/cash-on-cash", "/calculators/rental-cashflow"],
  },
  {
    week: 12,
    phase: 3,
    phaseTitle: "Strategies",
    topic: "Fix and Flip Fundamentals",
    subtitle: "How to profit from buying, renovating, and selling properties",
    keyConceptsToTeach: [
      "The 70% rule: Maximum purchase price = ARV × 70% - Rehab costs",
      "How to estimate rehab costs accurately",
      "Holding costs most flippers forget to include",
      "When to flip vs when to hold and rent",
    ],
    linkedGlossaryTerms: ["fix-and-flip", "after-repair-value"],
    linkedCalculators: ["/calculators/fix-flip"],
  },

  // Phase 4: Financing (Weeks 13-16)
  {
    week: 13,
    phase: 4,
    phaseTitle: "Financing",
    topic: "Conventional vs DSCR Loans",
    subtitle: "Understanding your two main financing options for investment properties",
    keyConceptsToTeach: [
      "Conventional loans: requirements, rates, limits on properties",
      "DSCR loans: qualification based on property income, not personal income",
      "Side-by-side cost comparison on a typical rental property",
      "When to use each type based on your situation",
    ],
    linkedGlossaryTerms: ["dscr-loan", "conventional-loan"],
    linkedCalculators: ["/calculators/mortgage"],
  },
  {
    week: 14,
    phase: 4,
    phaseTitle: "Financing",
    topic: "Private Money and Hard Money Lending",
    subtitle: "Alternative financing for deals that don't fit traditional lending",
    keyConceptsToTeach: [
      "Private money vs hard money: key differences",
      "Typical hard money terms: rates, points, LTV, term length",
      "How to find and approach private money lenders",
      "When hard money makes sense despite the higher cost",
    ],
    linkedGlossaryTerms: ["hard-money-loan", "private-money"],
    linkedCalculators: ["/calculators/mortgage", "/calculators/fix-flip"],
  },
  {
    week: 15,
    phase: 4,
    phaseTitle: "Financing",
    topic: "Seller Financing and Creative Deal Structures",
    subtitle: "How to buy properties without traditional bank financing",
    keyConceptsToTeach: [
      "How seller financing works and why sellers agree to it",
      "Subject-to deals: taking over existing mortgages",
      "Lease options as an entry strategy",
      "Structuring win-win creative deals",
    ],
    linkedGlossaryTerms: ["seller-financing"],
    linkedCalculators: ["/calculators/mortgage"],
  },
  {
    week: 16,
    phase: 4,
    phaseTitle: "Financing",
    topic: "Understanding Leverage and Loan-to-Value",
    subtitle: "How borrowing amplifies returns — and risk",
    keyConceptsToTeach: [
      "How leverage works: a $100K investment controlling $400K of real estate",
      "LTV ratios and what lenders require for investment properties",
      "Positive vs negative leverage (when borrowing hurts returns)",
      "How to right-size leverage for your risk tolerance",
    ],
    linkedGlossaryTerms: ["leverage", "loan-to-value"],
    linkedCalculators: ["/calculators/mortgage", "/calculators/cash-on-cash"],
  },

  // Phase 5: Advanced Concepts (Weeks 17-20)
  {
    week: 17,
    phase: 5,
    phaseTitle: "Advanced Concepts",
    topic: "Internal Rate of Return (IRR)",
    subtitle: "The metric sophisticated investors use to compare investments",
    keyConceptsToTeach: [
      "What IRR measures and why it matters for time-value of money",
      "IRR vs cash-on-cash return: when each metric is more useful",
      "How to interpret IRR results (what's a good IRR for real estate?)",
      "Using IRR to compare real estate deals to stock market returns",
    ],
    linkedGlossaryTerms: ["internal-rate-of-return"],
    linkedCalculators: ["/calculators/cash-on-cash"],
  },
  {
    week: 18,
    phase: 5,
    phaseTitle: "Advanced Concepts",
    topic: "Cost Segregation and Accelerated Depreciation",
    subtitle: "The tax strategy that can save investors tens of thousands",
    keyConceptsToTeach: [
      "How depreciation works for rental properties (27.5-year schedule)",
      "What cost segregation does: reclassify components into 5, 7, and 15-year schedules",
      "When a cost segregation study is worth the cost",
      "Bonus depreciation and how it creates paper losses",
    ],
    linkedGlossaryTerms: ["depreciation", "cost-segregation"],
    linkedCalculators: [],
  },
  {
    week: 19,
    phase: 5,
    phaseTitle: "Advanced Concepts",
    topic: "1031 Exchanges — Tax-Deferred Wealth Building",
    subtitle: "How to sell an investment property without paying capital gains tax",
    keyConceptsToTeach: [
      "1031 exchange rules: like-kind, timelines (45-day ID, 180-day close)",
      "The role of a Qualified Intermediary",
      "Common 1031 exchange mistakes to avoid",
      "Reverse exchanges and improvement exchanges",
    ],
    linkedGlossaryTerms: ["1031-exchange", "qualified-intermediary"],
    linkedCalculators: ["/calculators/1031-exchange"],
  },
  {
    week: 20,
    phase: 5,
    phaseTitle: "Advanced Concepts",
    topic: "Real Estate Professional Status for Tax Benefits",
    subtitle: "How qualifying as a RE professional can offset W-2 income",
    keyConceptsToTeach: [
      "IRS requirements: 750 hours and material participation",
      "How RE Pro status lets you deduct rental losses against active income",
      "Documentation and time-tracking best practices",
      "Who benefits most from RE Pro status",
    ],
    linkedGlossaryTerms: ["depreciation"],
    linkedCalculators: [],
  },

  // Phase 6: Portfolio Building (Weeks 21-24)
  {
    week: 21,
    phase: 6,
    phaseTitle: "Portfolio Building",
    topic: "Scaling From 1 to 10 Properties",
    subtitle: "The systems and strategies for growing a portfolio",
    keyConceptsToTeach: [
      "The equity snowball: using appreciation and paydown to fund new purchases",
      "When to refinance vs save for the next down payment",
      "Financing challenges at 5 and 10 properties (Fannie Mae limits)",
      "Building a team: property manager, lender, contractor, agent",
    ],
    linkedGlossaryTerms: ["leverage", "cash-flow"],
    linkedCalculators: ["/calculators/mortgage", "/calculators/rental-cashflow"],
  },
  {
    week: 22,
    phase: 6,
    phaseTitle: "Portfolio Building",
    topic: "Portfolio Analysis and Optimization",
    subtitle: "How to review your portfolio performance quarterly",
    keyConceptsToTeach: [
      "Key portfolio metrics: total cash flow, average cap rate, total equity, ROE",
      "Return on equity: knowing when a property has served its purpose",
      "Identifying underperformers and deciding to sell, improve, or refinance",
      "Setting annual portfolio growth goals",
    ],
    linkedGlossaryTerms: ["cash-on-cash-return", "cap-rate"],
    linkedCalculators: ["/calculators/cap-rate", "/calculators/cash-on-cash"],
  },
  {
    week: 23,
    phase: 6,
    phaseTitle: "Portfolio Building",
    topic: "Entity Structures for Real Estate Investors",
    subtitle: "LLCs, partnerships, and holding companies explained",
    keyConceptsToTeach: [
      "Why investors use LLCs for liability protection",
      "Single-member LLC vs multi-member LLC vs Series LLC",
      "How lenders view LLCs (and the due-on-sale clause concern)",
      "When to add an LLC and how to structure it",
    ],
    linkedGlossaryTerms: [],
    linkedCalculators: [],
  },
  {
    week: 24,
    phase: 6,
    phaseTitle: "Portfolio Building",
    topic: "Building Long-Term Wealth Through Real Estate",
    subtitle: "The four wealth generators and your path to financial independence",
    keyConceptsToTeach: [
      "The 4 ways real estate builds wealth: cash flow, appreciation, principal paydown, tax benefits",
      "Setting a Freedom Number: how many properties until you replace your income",
      "The long-term compounding effect of reinvesting cash flow",
      "Creating a 5-year portfolio plan",
    ],
    linkedGlossaryTerms: ["cash-flow", "leverage"],
    linkedCalculators: ["/calculators/rental-cashflow", "/calculators/cash-on-cash"],
  },
];

export function getEducationTopicForWeek(weekNumber: number): EducationTopic {
  const index = ((weekNumber - 1) % EDUCATION_CURRICULUM.length + EDUCATION_CURRICULUM.length) % EDUCATION_CURRICULUM.length;
  return EDUCATION_CURRICULUM[index];
}
