import { redirect } from 'next/navigation'
import { strategies } from '@/data/market-strategies'

export function generateStaticParams() {
  return strategies.map((s) => ({ strategy: s.slug }))
}

export default async function BestCitiesStrategyRedirect({
  params,
}: {
  params: Promise<{ strategy: string }>
}) {
  const { strategy } = await params
  redirect(`/markets/${strategy}`)
}
