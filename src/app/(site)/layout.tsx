import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StickyCTA } from '@/components/sticky-cta'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
