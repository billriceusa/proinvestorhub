#!/usr/bin/env node

/**
 * Migrate table blockquotes using sanity CLI auth (which has write access).
 * Uses `npx sanity documents create` or the Sanity client with the CLI token.
 *
 * Usage: node scripts/migrate-tables-mcp.mjs
 */

import { execSync } from 'child_process'

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

function makeTable(rows) {
  return {
    _type: 'simpleTable',
    _key: randomKey(),
    rows: rows.map(cells => ({ _type: 'row', _key: randomKey(), cells })),
  }
}

function makeBlock(key, style, text, markDefs = [], marks = []) {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs,
    children: [{ _type: 'span', _key: randomKey(), text, marks }],
  }
}

// Table definitions for "Hard Money vs. DSCR Loans" post
const tablesToReplace = {
  '2hdkflpv': makeTable([
    ['Feature', 'Details'],
    ['Loan-to-Value (LTV)', '60%–75% of ARV'],
    ['Interest Rate', '10%–13%'],
    ['Loan Term', '6–24 months'],
    ['Points (Origination)', '2–4 points'],
    ['Prepayment Penalty', 'Often none'],
    ['Amortization', 'Interest-only payments typical'],
  ]),
  'txsxwwmf': makeTable([
    ['Feature', 'Details'],
    ['Loan-to-Value (LTV)', '70%–80%'],
    ['Interest Rate', '7%–9%'],
    ['Loan Term', '30 years (fixed or ARM)'],
    ['Points (Origination)', '1–2 points'],
    ['Prepayment Penalty', '3–5 year step-down common'],
    ['Min. DSCR', '1.0–1.25'],
    ['Min. Credit Score', '620–680'],
  ]),
  '1e90j4jg': makeTable([
    ['Item', 'Amount'],
    ['ARV', '$220,000'],
    ['Hard money lender offers (70% of ARV)', '$154,000'],
    ['Purchase price', '$140,000'],
    ['Rehab draws', '$35,000 (funded in stages)'],
    ['Interest rate', '11.5% interest-only'],
    ['Monthly interest on $154,000', '~$1,479'],
    ['5-month carry cost', '~$7,395'],
    ['Origination (3 points)', '$4,620'],
    ['Total financing cost', '~$12,015'],
  ]),
  '0vltezr2': makeTable([
    ['Metric', 'Hard Money ($200K, 12%, IO, 3pts)', 'DSCR ($200K, 8%, 30yr, 1.5pts)'],
    ['Monthly Payment', '$2,000', '$1,468'],
    ['Year 1 Total Payments', '$24,000', '$17,616'],
    ['Origination', '$6,000', '$3,000'],
    ['Total Year 1 Cost', '$30,000', '$20,616'],
    ['Principal Paid Year 1', '$0', '~$1,800'],
  ]),
  '58dszpi2': makeTable([
    ['Feature', 'Hard Money', 'DSCR Loan'],
    ['Primary Use', 'Fix-and-flip, bridge, BRRRR phase 1', 'Long-term rental hold'],
    ['Loan Term', '6–24 months', '30 years'],
    ['Rate', '10%–13%', '7%–9%'],
    ['LTV', '60%–75% ARV', '70%–80%'],
    ['Qualifying Factor', 'Property value (ARV)', 'Property cash flow (DSCR)'],
    ['Income Verification', 'None', 'None (uses rent income)'],
    ['Credit Score Min', '550–620', '620–680'],
    ['Speed to Close', '5–14 days', '21–30 days'],
    ['Best Exit', 'Sale or refinance', 'Long-term hold'],
    ['Amortization', 'Interest-only', '30-year amortizing'],
  ]),
}

// Table definitions for "FHA Loans" post
const fhaTablesToReplace = {
  'k8haqfdf': makeTable([
    ['Item', 'FHA House Hack'],
    ['Purchase Price', '$380,000'],
    ['Down Payment (3.5%)', '$13,300'],
    ['Loan Amount', '$366,700'],
    ['Interest Rate (estimated)', '7.25%'],
    ['Monthly Principal & Interest', '~$2,502'],
    ['FHA Upfront MIP (1.75% financed)', '$6,417 added to loan'],
    ['Annual MIP (0.85% of loan)', '~$260/month'],
    ['Total Monthly PITI + MIP (est.)', '~$3,200'],
  ]),
  'ymb1l5ot': makeTable([
    ['Item', 'Conventional Investment Loan'],
    ['Purchase Price', '$380,000'],
    ['Down Payment (25%)', '$95,000'],
    ['Loan Amount', '$285,000'],
    ['Interest Rate (estimated)', '7.75% (investment property premium)'],
    ['Monthly Principal & Interest', '~$2,040'],
    ['MIP', 'No MIP, but higher rate and massive down payment'],
    ['Total Monthly PITI (estimated)', '~$2,500'],
  ]),
}

async function main() {
  // Get the Sanity CLI token from config
  const fs = await import('fs')
  const configPath = `${process.env.HOME}/.config/sanity/config.json`
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  const token = config.authToken
  if (!token) {
    console.error('No token found in Sanity config. Run: npx sanity login')
    process.exit(1)
  }

  console.log('Found Sanity auth token')

  const { createClient } = await import('@sanity/client')
  const client = createClient({
    projectId: 'eytfm25g',
    dataset: 'production',
    apiVersion: '2026-03-14',
    token,
    useCdn: false,
  })

  // Process Hard Money post
  console.log('\nProcessing: Hard Money vs. DSCR Loans...')
  const hmPost = await client.fetch(`*[_id == "PiQZ1crlvMFHJztcYA2C4D"][0]{ _id, _rev, body }`)
  if (!hmPost) {
    console.error('Hard Money post not found!')
    process.exit(1)
  }

  const hmBody = hmPost.body.map(block => {
    if (tablesToReplace[block._key]) {
      const table = tablesToReplace[block._key]
      table._key = block._key // preserve original key
      console.log(`  Replacing block ${block._key} with table`)
      return table
    }
    return block
  })

  await client.patch(hmPost._id).set({ body: hmBody }).commit()
  console.log('  ✓ Updated Hard Money post')

  // Process FHA post
  console.log('\nProcessing: FHA Loans for Investors...')
  const fhaPost = await client.fetch(`*[_id == "PiQZ1crlvMFHJztcYA26ky"][0]{ _id, _rev, body }`)
  if (!fhaPost) {
    console.error('FHA post not found!')
    process.exit(1)
  }

  const fhaBody = fhaPost.body.map(block => {
    if (fhaTablesToReplace[block._key]) {
      const table = fhaTablesToReplace[block._key]
      table._key = block._key
      console.log(`  Replacing block ${block._key} with table`)
      return table
    }
    return block
  })

  await client.patch(fhaPost._id).set({ body: fhaBody }).commit()
  console.log('  ✓ Updated FHA post')

  console.log('\nDone! Both posts updated with proper tables.')
}

main().catch(err => {
  console.error('Migration failed:', err.message || err)
  process.exit(1)
})
