/**
 * Seed neighborhood data for top investment markets.
 * Run: node --env-file=.env.local scripts/seed-neighborhoods.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-12',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const neighborhoods = {
  'detroit-mi': [
    { name: 'Corktown', description: 'Detroit\'s oldest neighborhood, rapidly gentrifying with new restaurants and Ford\'s mobility campus. Renovated properties command premium rents with strong appreciation.', investorProfile: 'brrrr' },
    { name: 'Midtown', description: 'Anchored by Wayne State University and the Detroit Medical Center. Lowest vacancy in the city with consistent tenant demand from students and medical professionals.', investorProfile: 'cash-flow' },
    { name: 'Grandmont-Rosedale', description: 'Stable residential neighborhood with well-maintained housing stock. Lower entry prices than Corktown/Midtown with solid long-term tenant base.', investorProfile: 'cash-flow' },
    { name: 'Woodbridge', description: 'Historic district adjacent to Midtown with strong renovation activity. Victorian-era homes offer excellent BRRRR potential with rising ARVs.', investorProfile: 'brrrr' },
  ],
  'cleveland-oh': [
    { name: 'Tremont', description: 'Walkable arts district south of downtown. Strong rent growth and institutional investor activity confirm the market. Higher entry prices but lower vacancy risk.', investorProfile: 'appreciation' },
    { name: 'Ohio City', description: 'West Side Market anchor draws young professionals. Duplexes and multifamily properties support house hacking with strong rental demand.', investorProfile: 'house-hacking' },
    { name: 'Lakewood', description: 'Inner-ring suburb with excellent schools and walkability. Strong tenant quality with lower turnover. Cap rates lower than city proper but more stable.', investorProfile: 'cash-flow' },
    { name: 'Detroit Shoreway', description: 'Emerging neighborhood between Ohio City and Edgewater Park. Lower acquisition costs with active renovation creating BRRRR opportunities.', investorProfile: 'brrrr' },
  ],
  'indianapolis-in': [
    { name: 'Fountain Square', description: 'Arts and entertainment district with rapid appreciation. Renovated properties rent quickly to young professionals. Strong BRRRR market with reliable comps.', investorProfile: 'brrrr' },
    { name: 'Irvington', description: 'Historic east-side neighborhood with character homes. Affordable multifamily properties perfect for house hacking with FHA-friendly pricing.', investorProfile: 'house-hacking' },
    { name: 'Broad Ripple', description: 'Entertainment and nightlife hub near Butler University. Premium rents supported by student and young professional tenant base. Strong appreciation trajectory.', investorProfile: 'appreciation' },
    { name: 'Speedway', description: 'Affordable entry point near the Indianapolis Motor Speedway. Stable blue-collar tenant base with consistent cash flow and low vacancy.', investorProfile: 'cash-flow' },
  ],
  'memphis-tn': [
    { name: 'Cooper-Young', description: 'Eclectic midtown neighborhood with walkable restaurants and shops. Higher-end rentals attract quality tenants. Appreciation play within a cash flow city.', investorProfile: 'appreciation' },
    { name: 'Whitehaven', description: 'South Memphis neighborhood near Graceland with affordable single-family rentals. Established turnkey market with reliable property management options.', investorProfile: 'cash-flow' },
    { name: 'Binghampton', description: 'Rapidly developing east Memphis neighborhood. Active renovation creates BRRRR opportunities with improving ARVs as the area transforms.', investorProfile: 'brrrr' },
    { name: 'Frayser', description: 'Lowest entry prices in Memphis with high cap rates. Requires experienced property management but delivers strong cash flow for investors comfortable with the area.', investorProfile: 'cash-flow' },
  ],
  'birmingham-al': [
    { name: 'Southside/UAB', description: 'University of Alabama at Birmingham medical district. Strong medical professional and student tenant demand. Ultra-low property taxes amplify cash flow.', investorProfile: 'cash-flow' },
    { name: 'Avondale', description: 'Brewery district with active gentrification. Renovation projects see strong ARV appreciation. Best BRRRR opportunities in the Birmingham metro.', investorProfile: 'brrrr' },
    { name: 'Crestwood', description: 'Family-oriented neighborhood with good schools. Stable long-term tenants and low vacancy. Modest appreciation with reliable income.', investorProfile: 'mixed' },
    { name: 'Woodlawn', description: 'Emerging neighborhood east of downtown with very affordable entry. Early-stage gentrification creates value-add opportunity for patient investors.', investorProfile: 'brrrr' },
  ],
  'huntsville-al': [
    { name: 'Research Park', description: 'Adjacent to Cummings Research Park (second largest in US). Aerospace and defense professionals drive premium rent demand. Fastest appreciation in Alabama.', investorProfile: 'appreciation' },
    { name: 'Five Points', description: 'Historic walkable district near downtown. Character homes attract young professionals. Strong house hacking potential with duplex availability.', investorProfile: 'house-hacking' },
    { name: 'Madison', description: 'Suburban growth corridor with new construction. Family-oriented renters with high income levels. Lower cap rates but excellent appreciation trajectory.', investorProfile: 'appreciation' },
  ],
  'columbus-oh': [
    { name: 'Short North', description: 'Premier arts and dining district between downtown and OSU. Highest rents in Columbus with strong appreciation driven by continued development.', investorProfile: 'appreciation' },
    { name: 'Clintonville', description: 'Tree-lined residential neighborhood with strong schools. Premium tenant quality with low turnover. House hacking duplexes are competitive but profitable.', investorProfile: 'house-hacking' },
    { name: 'Linden', description: 'Affordable east-side neighborhood with active rehab activity. Intel chip plant proximity is driving investor interest. Strong BRRRR fundamentals.', investorProfile: 'brrrr' },
    { name: 'Hilltop', description: 'West-side neighborhood with lowest entry prices in Columbus metro. High cap rates for experienced investors comfortable with active property management.', investorProfile: 'cash-flow' },
  ],
  'kansas-city-mo': [
    { name: 'Crossroads', description: 'Arts district south of downtown experiencing rapid development. Former warehouse conversions and new construction command premium rents.', investorProfile: 'appreciation' },
    { name: 'Westport', description: 'Entertainment hub with strong duplex and fourplex inventory. Excellent house hacking neighborhood with walkability and nightlife drawing younger tenants.', investorProfile: 'house-hacking' },
    { name: 'Waldo', description: 'South Kansas City neighborhood with strong community identity. Affordable entry for the quality of tenant — professionals and families with stable employment.', investorProfile: 'cash-flow' },
    { name: 'Northeast KC', description: 'Diverse neighborhood with very affordable acquisition costs. Active artist and creative community driving gradual gentrification. Early-stage value play.', investorProfile: 'brrrr' },
  ],
  'oklahoma-city-ok': [
    { name: 'Plaza District', description: 'Walkable entertainment district with strong millennial rental demand. Higher rents than metro average with consistent occupancy.', investorProfile: 'appreciation' },
    { name: 'Paseo Arts District', description: 'Historic arts neighborhood with character homes. Affordable multifamily properties support house hacking with growing tenant demand.', investorProfile: 'house-hacking' },
    { name: 'Capitol Hill', description: 'South OKC neighborhood with very affordable entry prices. Active renovation activity creating BRRRR opportunities as the area improves.', investorProfile: 'brrrr' },
    { name: 'Edmond', description: 'Northern suburb with UCO campus and excellent schools. Premium family rentals with low vacancy. More expensive entry but stronger tenant quality.', investorProfile: 'cash-flow' },
  ],
  'atlanta-ga': [
    { name: 'West Midtown', description: 'Former industrial area transformed into mixed-use hub. Explosive appreciation driven by corporate relocations and development. Top appreciation play in Atlanta.', investorProfile: 'appreciation' },
    { name: 'East Atlanta Village', description: 'Eclectic neighborhood with strong rental demand. Good balance of cash flow and appreciation. Duplexes available for house hacking.', investorProfile: 'mixed' },
    { name: 'Reynoldstown', description: 'BeltLine-adjacent neighborhood with rapid price growth. Renovation projects see strong returns. Premium rents from walkability to BeltLine trail.', investorProfile: 'brrrr' },
    { name: 'College Park', description: 'South metro near the airport with affordable entry. Strong cash flow driven by airport and logistics employment. Stable blue-collar tenant base.', investorProfile: 'cash-flow' },
  ],
  'raleigh-nc': [
    { name: 'Downtown/Warehouse District', description: 'New development and tech office expansion driving premium rents. Strong appreciation as Raleigh\'s urban core densifies.', investorProfile: 'appreciation' },
    { name: 'Southeast Raleigh', description: 'Rapid gentrification with affordable entry relative to other Raleigh neighborhoods. Strong BRRRR potential with improving ARVs.', investorProfile: 'brrrr' },
    { name: 'North Hills', description: 'Upscale mixed-use area with walkable amenities. Premium tenant quality — tech professionals with high incomes and low default risk.', investorProfile: 'appreciation' },
  ],
  'charlotte-nc': [
    { name: 'NoDa (North Davidson)', description: 'Arts district with breweries and galleries. Strong millennial rental demand. Appreciation driven by ongoing development and light rail proximity.', investorProfile: 'appreciation' },
    { name: 'South End', description: 'Charlotte\'s hottest neighborhood along the Blue Line. Premium rents from banking and fintech professionals. Top appreciation play.', investorProfile: 'appreciation' },
    { name: 'Plaza Midwood', description: 'Established neighborhood with character homes and walkable retail. Duplexes support house hacking with strong tenant demand from young professionals.', investorProfile: 'house-hacking' },
  ],
}

async function seed() {
  const slugs = Object.keys(neighborhoods)
  console.log(`Seeding neighborhoods for ${slugs.length} cities...`)
  let success = 0

  for (const [slug, hoods] of Object.entries(neighborhoods)) {
    const hoodsWithKeys = hoods.map((h, i) => ({
      ...h,
      _type: 'neighborhood',
      _key: `hood${i}`,
    }))

    try {
      await client
        .patch(`marketCity-${slug}`)
        .set({ neighborhoods: hoodsWithKeys })
        .commit()
      console.log(`  ✓ ${slug} (${hoods.length} neighborhoods)`)
      success++
    } catch (err) {
      console.error(`  ✗ ${slug}:`, err.message)
    }
  }
  console.log(`\nDone: ${success}/${slugs.length} cities updated`)
}

seed().catch(console.error)
