export interface NewsletterPlan {
  week: number;
  sendDate: string;
  theme: string;
  focusVertical: string;
  exclusiveTipTopics: string[];
  specialHook?: string;
  status: "sent" | "scheduled" | "planned";
}

export const NEWSLETTER_THEMES = [
  "Deal Analysis Deep Dive",
  "Market Watch",
  "Financing Strategies",
  "Landlord Success",
  "BRRRR Breakdown",
  "Tool Spotlight",
  "New Investor Essentials",
  "Cash Flow Focus",
  "Flip or Hold",
  "Portfolio Growth",
] as const;

export const NEWSLETTER_CALENDAR: NewsletterPlan[] = [
  {
    week: 1,
    sendDate: "2026-03-17",
    theme: "New Investor Essentials",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "The one spreadsheet formula that tells you if a deal works in 30 seconds",
      "Why your first rental property should be boring (and how boring beats sexy every time)",
      "The 3 bank accounts every rental investor needs from day one",
    ],
    specialHook: "Launch issue — welcome readers and set expectations for weekly value",
    status: "planned",
  },
  {
    week: 2,
    sendDate: "2026-03-24",
    theme: "Deal Analysis Deep Dive",
    focusVertical: "Multi-family",
    exclusiveTipTopics: [
      "The 50% rule: a quick-and-dirty expense estimation that's surprisingly accurate",
      "Why you should never trust a seller's pro forma (and what to use instead)",
      "Three red flags in a listing that signal a deal worth pursuing",
    ],
    status: "planned",
  },
  {
    week: 3,
    sendDate: "2026-03-31",
    theme: "Financing Strategies",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "How to get pre-approved for investment properties (it's different from primary residence)",
      "The rate buydown trick that cash-flowing investors are using in 2026",
      "DSCR vs conventional: a side-by-side cost comparison on a $200K rental",
    ],
    status: "planned",
  },
  {
    week: 4,
    sendDate: "2026-04-07",
    theme: "Cash Flow Focus",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "The hidden expense that kills cash flow on your first 3 rentals (and how to budget for it)",
      "How to add $150/month to any rental without spending a dime (lease clause strategy)",
      "The rent increase conversation script that keeps tenants and raises revenue",
    ],
    status: "planned",
  },
  {
    week: 5,
    sendDate: "2026-04-14",
    theme: "BRRRR Breakdown",
    focusVertical: "Fix-and-Flip",
    exclusiveTipTopics: [
      "The BRRRR deal that went wrong: a post-mortem on a $12K lesson",
      "How to estimate ARV without an appraiser (the 3-comp method)",
      "The refinance timing trick that leaves more cash in your pocket",
    ],
    status: "planned",
  },
  {
    week: 6,
    sendDate: "2026-04-21",
    theme: "Landlord Success",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "The tenant welcome package that reduces maintenance calls by 40%",
      "Why Saturday showings fill vacancies faster (and the exact listing schedule that works)",
      "The 3 lease violations you should address immediately (and 3 you can let slide)",
    ],
    status: "planned",
  },
  {
    week: 7,
    sendDate: "2026-04-28",
    theme: "Market Watch",
    focusVertical: "Multi-family",
    exclusiveTipTopics: [
      "3 markets where cap rates are expanding right now (and what that means for buyers)",
      "The population data source that predicts rental demand 2 years out",
      "How to spot a market turning from seller's to buyer's before everyone else",
    ],
    status: "planned",
  },
  {
    week: 8,
    sendDate: "2026-05-05",
    theme: "Tool Spotlight",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "The free tool that shows you comparable rents in any zip code in 60 seconds",
      "How I use Google Sheets to track 10 properties (template included)",
      "The 3 apps every landlord should have on their phone",
    ],
    status: "planned",
  },
  {
    week: 9,
    sendDate: "2026-05-12",
    theme: "Flip or Hold",
    focusVertical: "Fix-and-Flip",
    exclusiveTipTopics: [
      "The 'flip or keep' decision matrix: 5 questions that give you the answer",
      "How to analyze a property for BOTH strategies before you buy",
      "The tax math that often makes holding better than flipping (even when the flip profit looks juicy)",
    ],
    status: "planned",
  },
  {
    week: 10,
    sendDate: "2026-05-19",
    theme: "Portfolio Growth",
    focusVertical: "Commercial",
    exclusiveTipTopics: [
      "The equity snowball: how your 3rd property funds your 4th faster than you think",
      "When to refinance vs save for the next down payment (the break-even calculation)",
      "The portfolio analysis I do every quarter (30 minutes that save thousands)",
    ],
    status: "planned",
  },
  {
    week: 11,
    sendDate: "2026-05-26",
    theme: "Financing Strategies",
    focusVertical: "Wholesale",
    exclusiveTipTopics: [
      "Private money 101: how to have the 'invest with me' conversation without being awkward",
      "The promissory note template that protects both parties",
      "Creative financing win: how I structured a $0-down deal using seller carry",
    ],
    status: "planned",
  },
  {
    week: 12,
    sendDate: "2026-06-02",
    theme: "New Investor Essentials",
    focusVertical: "Residential",
    exclusiveTipTopics: [
      "Quarter 1 review: the metrics that tell you if your investing is working",
      "The 90-day plan for going from zero to your first rental property under contract",
      "The one mindset shift that separates people who talk about investing from people who do it",
    ],
    specialHook: "End-of-quarter review — recap key lessons and set Q3 goals",
    status: "planned",
  },
];
