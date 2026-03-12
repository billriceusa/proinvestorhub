# ProInvestorHub

The NerdWallet for Real Estate Investors. A content-first education platform built with Next.js and Sanity.io.

## Stack

- **Next.js 15** (App Router, React Server Components, static generation)
- **Sanity.io** (headless CMS, embedded Studio at `/studio`)
- **Tailwind CSS v4**
- **TypeScript**
- **Deployed on Vercel**

## Getting Started

### 1. Create a Sanity project

Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project. Note your **Project ID**.

Or use the CLI:

```bash
npx sanity@latest init
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Sanity project ID and dataset name (usually `production`).

### 3. Install and run

```bash
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Content Types

| Type | Description |
|------|-------------|
| **Post** | Blog articles and guides with rich text, images, categories |
| **Author** | Writer profiles with name, bio, image |
| **Category** | Content categories (Strategies, Markets, Education, etc.) |
| **Glossary Term** | Real estate investing terms with definitions and full explanations |
| **Site Settings** | Global site title, description, footer content |

## Project Structure

```
src/
├── app/
│   ├── (site)/             # Public site routes
│   │   ├── blog/           # Blog listing + [slug] detail
│   │   ├── calculators/    # Calculator tools (coming soon)
│   │   ├── glossary/       # A-Z glossary + [term] detail
│   │   └── guides/         # Guide listing
│   └── studio/             # Embedded Sanity Studio
├── components/             # Shared UI components
└── sanity/
    ├── lib/                # Client, queries, image helpers
    └── schemaTypes/        # Content model definitions
```

## Deployment

Deploy to Vercel with the following environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

Then deploy your Sanity schema:

```bash
npx sanity@latest deploy
```
