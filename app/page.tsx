import { Header } from "@/components/header"
import { LogoBanner } from "@/components/logo-banner"
import { HeroSection } from "@/components/hero-section"
import { TeamSection } from "@/components/team-section"
import { MortgageCalculator } from "@/components/mortgage-calculator"
import { ProductsSection } from "@/components/products-section"
import { ProcessSection } from "@/components/process-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { PageVines } from "@/components/vine-decoration"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function HomePage() {
  return (
    <main className="relative">
      {/* Vines as underlay - visible behind all content */}
      <PageVines>
        <Header />
        <LogoBanner />
        <HeroSection />
        <TeamSection />
        <MortgageCalculator />
        <ProductsSection />
        <ProcessSection />
        <NewsletterSection />
        <Footer />
      </PageVines>
      <MobileStickyCTA />
    </main>
  )
}
