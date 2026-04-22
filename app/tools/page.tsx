import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageVines } from "@/components/vine-decoration"
import { LoanComparisonTool } from "@/components/loan-comparison-tool"
import { AffordabilityCalculator } from "@/components/affordability-calculator"
import { ClosingCostEstimator } from "@/components/closing-cost-estimator"
import { FAQSection } from "@/components/faq-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Zap, 
  Scale, 
  Calculator, 
  Receipt, 
  HelpCircle,
  ChevronDown
} from "lucide-react"

export const metadata = {
  title: "Mortgage Tools & Calculators | Guardian Lending Group",
  description: "Free mortgage tools including loan eligibility finder, DPA checker, affordability calculator, closing cost estimator, and more."
}

const tools = [
  { id: "loan-comparison", name: "Compare Loans", icon: Scale, description: "Side-by-side comparison" },
  { id: "affordability", name: "Affordability", icon: Calculator, description: "How much can you afford?" },
  { id: "closing-costs", name: "Closing Costs", icon: Receipt, description: "Estimate cash to close" },
  { id: "faq", name: "FAQ", icon: HelpCircle, description: "Common questions" }
]

export default function ToolsPage() {
  return (
    <main className="relative">
      <PageVines>
        <Header />
        
        {/* Spacer for fixed header (banner h-16/h-20 + nav h-14) */}
        <div className="h-[120px] sm:h-[136px]" />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Free Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mortgage Tools & Calculators</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to make informed mortgage decisions. All tools are free and require no sign-up.
            </p>
            
            {/* Quick Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {tools.map(tool => {
                const Icon = tool.icon
                return (
                  <a
                    key={tool.id}
                    href={`#${tool.id}`}
                    className="p-4 rounded-xl border bg-card hover:bg-accent transition-colors group"
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <p className="font-medium text-sm">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </a>
                )
              })}
            </div>
            
            <div className="mt-8 animate-bounce">
              <ChevronDown className="h-6 w-6 mx-auto text-muted-foreground" />
            </div>
          </div>
        </section>
        
        {/* All Tools */}
        <LoanComparisonTool />
        <AffordabilityCalculator />
        <ClosingCostEstimator />
        <FAQSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our tools are a great starting point, but nothing beats personalized advice. Talk to one of our loan specialists for guidance tailored to your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/#contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <Footer />
      </PageVines>
    </main>
  )
}
