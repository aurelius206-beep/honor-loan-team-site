"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  HelpCircle,
  Search,
  ChevronDown,
  Home,
  CreditCard,
  FileText,
  DollarSign,
  Users,
  Shield
} from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  // First-Time Buyer
  {
    id: "ftb-1",
    category: "first-time",
    question: "What qualifies as a first-time homebuyer?",
    answer: "A first-time homebuyer is typically defined as someone who has not owned a home in the past 3 years. This includes someone who has never owned a home, as well as someone who owned a home more than 3 years ago. Interestingly, if you only owned a home with a former spouse during marriage, you may still qualify as a first-time buyer."
  },
  {
    id: "ftb-2",
    category: "first-time",
    question: "How much do I need for a down payment?",
    answer: "Down payment requirements vary by loan type. VA and USDA loans offer 0% down. FHA requires 3.5% down with a 580+ credit score. Conventional loans can go as low as 3% down. Down payment assistance programs can help cover part or all of your down payment - we offer several DPA options that could reduce your out-of-pocket costs significantly."
  },
  {
    id: "ftb-3",
    category: "first-time",
    question: "What is PMI and can I avoid it?",
    answer: "Private Mortgage Insurance (PMI) protects the lender if you default on your loan. It's typically required on conventional loans with less than 20% down. You can avoid PMI by: putting 20% or more down, using a VA loan (no MI regardless of down payment), or using a lender-paid MI option where the cost is built into your rate. FHA loans have MIP which works similarly but has different rules."
  },
  {
    id: "ftb-4",
    category: "first-time",
    question: "How long does the mortgage process take?",
    answer: "The typical mortgage process takes between 21 to 30 days from application to closing. In a perfect situation with excellent preparation, quick document submission, and no complications, it can close in as fast as 14 days. Key factors affecting timeline include: how quickly you provide documents, property appraisal scheduling, title search completion, and underwriting complexity. Pre-approval before house hunting can significantly streamline the process."
  },
  // Credit & Income
  {
    id: "credit-1",
    category: "credit",
    question: "What credit score do I need for a mortgage?",
    answer: "Credit score requirements vary by loan type. Conventional loans have no minimum credit score requirement per guidelines - lender overlays may vary. VA loans also have no minimum credit score and qualify based on residual income. FHA allows scores as low as 500 (with 10% down) or 580 (with 3.5% down). Higher scores get better rates - aim for 740+ for the best pricing. We can help borrowers with various credit profiles find the right program."
  },
  {
    id: "credit-2",
    category: "credit",
    question: "Can I get a mortgage with recent bankruptcy or foreclosure?",
    answer: "Yes, you can get a mortgage with a recent bankruptcy. In fact, if you are in an active Chapter 13 bankruptcy, you could potentially qualify right away with court trustee approval. For discharged bankruptcies, waiting periods apply: FHA requires 2 years after Chapter 7 discharge, VA requires 2 years. Conventional typically requires 4 years after Chapter 7. Foreclosure waiting periods: FHA 3 years, VA 2 years, Conventional 7 years (3 years with documented extenuating circumstances). Manual underwriting may provide more flexibility for FHA and VA loans."
  },
  {
    id: "credit-3",
    category: "credit",
    question: "What is DTI and why does it matter?",
    answer: "Debt-to-Income ratio (DTI) compares your monthly debt payments to your gross monthly income. There are two types: Front-end (housing costs only) and Back-end (all debts). Maximum DTI limits vary by loan type: Conventional caps at 49.99%, FHA allows up to 56.99% with compensating factors, and VA can go as high as 80% on a case-by-case basis since VA primarily uses residual income rather than strict DTI caps. Lower DTI = easier approval and potentially better rates."
  },
  {
    id: "credit-4",
    category: "credit",
    question: "How do lenders verify self-employed income?",
    answer: "Self-employed borrowers typically provide 2 years of personal and business tax returns, year-to-date profit & loss statement, business license, and bank statements. Lenders average your income over 2 years, so declining income can hurt qualification. Non-QM options like bank statement loans allow qualification using 12-24 months of deposits instead of tax returns - great if you have significant write-offs."
  },
  // Loan Types
  {
    id: "loan-1",
    category: "loans",
    question: "What's the difference between FHA and Conventional loans?",
    answer: "FHA loans are government-insured, allowing lower credit scores (500+) and smaller down payments (3.5%), but require mortgage insurance for the life of the loan. Conventional loans require higher credit (typically 620+) but allow PMI removal at 80% LTV, work for investment properties, and have no upfront mortgage insurance. FHA is often better for lower credit scores; Conventional is typically better for good credit with 10%+ down."
  },
  {
    id: "loan-2",
    category: "loans",
    question: "Who qualifies for a VA loan?",
    answer: "VA loans are available to: Active duty service members (90+ days), Veterans with honorable discharge, National Guard/Reserve members (6+ years or called to active duty), and surviving spouses of service members who died in service or from service-connected disability. You'll need a Certificate of Eligibility (COE) which we can help obtain. VA offers 0% down with no monthly MI - it's the best loan benefit available."
  },
  {
    id: "loan-3",
    category: "loans",
    question: "How do I know if I'm eligible for USDA?",
    answer: "USDA eligibility has two main requirements: 1) Property must be in a USDA-eligible area (typically rural/suburban, but many areas near cities qualify), and 2) Household income must be below 115% of the area median income. Use the USDA eligibility maps at eligibility.sc.egov.usda.gov to check property and income limits. USDA offers 0% down like VA."
  },
  {
    id: "loan-4",
    category: "loans",
    question: "What is a DSCR loan?",
    answer: "Debt Service Coverage Ratio (DSCR) loans qualify based on the property's rental income rather than your personal income. If the property's rent covers the mortgage payment (DSCR of 1.0 or higher), you can qualify - no tax returns needed. Great for investors with complex income, self-employed borrowers, or those building a portfolio. Available for LLCs, short-term rentals (Airbnb), and foreign nationals."
  },
  // DPA & Assistance
  {
    id: "dpa-1",
    category: "dpa",
    question: "What is down payment assistance (DPA)?",
    answer: "Down payment assistance programs provide funds to help cover your down payment and/or closing costs. They come in several forms: forgivable grants (no repayment if you stay in home for set period), deferred loans (due when you sell/refinance), and repayable second mortgages (with low interest rates). We offer 7+ DPA programs including Aurora, Boost, and Chenoa Fund - many work with FHA loans and some have no income limits."
  },
  {
    id: "dpa-2",
    category: "dpa",
    question: "Do I have to be a first-time buyer for DPA?",
    answer: "No! Many of our DPA programs (Aurora, Boost, Chenoa, Legacy Builder, Home Advantage, HomeStart) are available to repeat buyers - first-time buyer status is not required. Income limits and geographic restrictions vary by program. Contact us to see which programs you may qualify for based on your situation."
  },
  {
    id: "dpa-3",
    category: "dpa",
    question: "What's the difference between forgivable and repayable DPA?",
    answer: "Forgivable DPA becomes a grant if you meet program requirements (typically staying in the home and making on-time payments for 36-60 months). If you sell or refinance early, you may have to repay part or all. Repayable DPA is a second mortgage with a set term (usually 10-15 years) and interest rate (typically 1-2% above your first mortgage). Forgivable is better if you plan to stay; repayable often has fewer restrictions."
  },
  // Process
  {
    id: "process-1",
    category: "process",
    question: "What's the difference between pre-qualification and pre-approval?",
    answer: "Pre-qualification is a quick estimate based on self-reported information - useful for initial budgeting but not verified. Pre-approval involves a full application, credit check, and income/asset documentation review. A pre-approval letter carries much more weight with sellers and shows you're a serious, verified buyer. We recommend getting fully pre-approved before house hunting."
  },
  {
    id: "process-2",
    category: "process",
    question: "What documents do I need for a mortgage?",
    answer: "Standard documents include: ID (driver's license, SSN), income (pay stubs, W-2s, tax returns), assets (bank statements, investment accounts), and property (purchase contract, insurance quote). Self-employed borrowers need business tax returns and P&L statements. VA borrowers need DD-214 or Statement of Service. Our Document Checklist tool generates a personalized list based on your situation."
  },
  {
    id: "process-3",
    category: "process",
    question: "Can I change jobs during the mortgage process?",
    answer: "Job changes during the mortgage process can complicate things. Staying in the same field with equal or higher pay is usually fine. Switching from W-2 to self-employment is problematic (typically need 2 years self-employment history). Always inform your loan officer before making any employment changes. If possible, wait until after closing to change jobs."
  },
  {
    id: "process-4",
    category: "process",
    question: "What happens after I'm under contract?",
    answer: "After your offer is accepted: 1) Submit full application and documents, 2) Lender orders appraisal and title work, 3) Underwriter reviews everything for approval, 4) Receive Clear to Close, 5) Final walk-through and signing, 6) Funding and recording. Throughout, you'll receive a Loan Estimate (within 3 days of application) and Closing Disclosure (at least 3 days before closing) detailing your costs and terms."
  }
]

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "first-time", label: "First-Time Buyers", icon: Home },
  { id: "credit", label: "Credit & Income", icon: CreditCard },
  { id: "loans", label: "Loan Types", icon: FileText },
  { id: "dpa", label: "Down Payment Help", icon: DollarSign },
  { id: "process", label: "The Process", icon: Users }
]

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  
  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common mortgage questions</p>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-1"
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </Button>
            )
          })}
        </div>
        
        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No questions found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map(faq => {
              const isExpanded = expandedItems.has(faq.id)
              return (
                <Card 
                  key={faq.id} 
                  className={cn(
                    "transition-all cursor-pointer",
                    isExpanded && "ring-1 ring-primary/30"
                  )}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-4 text-left flex items-start gap-3"
                  >
                    <div className={cn(
                      "mt-0.5 p-1 rounded-full shrink-0 transition-colors",
                      isExpanded ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-180"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-left">{faq.question}</h3>
                      {isExpanded && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </button>
                </Card>
              )
            })
          )}
        </div>
        
        <Card className="mt-8 bg-muted/30">
          <CardContent className="py-6 text-center">
            <h3 className="font-semibold mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our loan specialists are ready to help with your specific situation.
            </p>
            <Button asChild>
              <a href="#contact">Contact Us</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
