"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Building2, 
  Shield, 
  Landmark, 
  TreeDeciduous,
  Building,
  FileText,
  CheckCircle2,
  XCircle,
  Minus,
  Scale,
  ArrowRight,
  X
} from "lucide-react"

interface LoanProgram {
  id: string
  name: string
  icon: React.ElementType
  color: string
  minDownPayment: string
  minCredit: string
  maxDTI: string
  upfrontFee: string
  monthlyMI: string
  maxLoanAmount: string
  occupancy: string[]
  propertyTypes: string[]
  incomeVerification: string
  reserves: string
  sellerConcessions: string
  giftFunds: string
  manualUW: string
  cashOut: string
  pros: string[]
  cons: string[]
}

const loanPrograms: LoanProgram[] = [
  {
    id: "conventional",
    name: "Conventional",
    icon: Home,
    color: "bg-blue-500",
    minDownPayment: "3%",
    minCredit: "No minimum*",
    maxDTI: "45-50%",
    upfrontFee: "None",
    monthlyMI: "PMI (removable at 80% LTV)",
    maxLoanAmount: "County limit ($766,550 base)",
    occupancy: ["Primary", "Second Home", "Investment"],
    propertyTypes: ["SFR", "Condo", "Townhome", "2-4 Units", "Manufactured"],
    incomeVerification: "Standard (W-2, tax returns)",
    reserves: "0-6 months (varies)",
    sellerConcessions: "3-9% (based on LTV)",
    giftFunds: "Allowed (100% at 20%+ down)",
    manualUW: "Limited",
    cashOut: "Up to 80% LTV",
    pros: ["PMI removable", "All occupancy types", "No upfront fee", "Higher loan limits in high-cost areas"],
    cons: ["Higher credit standards", "PMI until 80% LTV", "Stricter DTI limits"]
  },
  {
    id: "fha",
    name: "FHA",
    icon: Landmark,
    color: "bg-green-500",
    minDownPayment: "3.5% (580+ credit)",
    minCredit: "500 (10% down) / 580 (3.5%)",
    maxDTI: "43% (56.99% with AUS)",
    upfrontFee: "1.75% UFMIP (financeable)",
    monthlyMI: "0.55% annual MIP (life of loan*)",
    maxLoanAmount: "County limit ($498,257 base)",
    occupancy: ["Primary Only"],
    propertyTypes: ["SFR", "FHA Condo", "Townhome", "2-4 Units", "Manufactured"],
    incomeVerification: "Standard + Manual UW available",
    reserves: "1-3 months (varies)",
    sellerConcessions: "Up to 6%",
    giftFunds: "Allowed (100%)",
    manualUW: "Yes",
    cashOut: "Up to 80% LTV",
    pros: ["Lower credit requirements", "Manual underwriting", "DPA compatible", "Higher DTI allowed"],
    cons: ["MIP for life of loan", "Primary residence only", "Lower loan limits", "Property standards"]
  },
  {
    id: "va",
    name: "VA",
    icon: Shield,
    color: "bg-amber-600",
    minDownPayment: "0%",
    minCredit: "No minimum*",
    maxDTI: "No maximum (residual income)",
    upfrontFee: "1.25-3.3% Funding Fee*",
    monthlyMI: "None",
    maxLoanAmount: "No limit (with entitlement)",
    occupancy: ["Primary (some exceptions)"],
    propertyTypes: ["SFR", "VA Condo", "Townhome", "2-4 Units", "Manufactured"],
    incomeVerification: "Standard + Residual income",
    reserves: "Not required (varies)",
    sellerConcessions: "Up to 4%",
    giftFunds: "Allowed",
    manualUW: "Yes",
    cashOut: "Up to 90% LTV",
    pros: ["0% down payment", "No monthly MI", "No loan limit", "Residual income flexibility", "10%+ disabled exempt from fee"],
    cons: ["Veteran/military only", "Funding fee", "Primary residence (mostly)", "VA appraisal required"]
  },
  {
    id: "usda",
    name: "USDA",
    icon: TreeDeciduous,
    color: "bg-emerald-600",
    minDownPayment: "0%",
    minCredit: "580 (GUS) / 620 (manual)",
    maxDTI: "29/41% (waivers available)",
    upfrontFee: "1% Guarantee Fee",
    monthlyMI: "0.35% annual fee",
    maxLoanAmount: "No limit (income limits apply)",
    occupancy: ["Primary Only"],
    propertyTypes: ["SFR", "Condo", "Townhome", "Manufactured (multi-wide)"],
    incomeVerification: "Standard + Income limits",
    reserves: "Not required",
    sellerConcessions: "Up to 6%",
    giftFunds: "Allowed",
    manualUW: "Yes",
    cashOut: "Not available",
    pros: ["0% down payment", "Low fees", "No loan limit", "Below-market areas"],
    cons: ["Geographic restrictions", "Income limits", "No cash-out", "Primary only"]
  },
  {
    id: "jumbo",
    name: "Jumbo",
    icon: Building2,
    color: "bg-purple-600",
    minDownPayment: "10-20%",
    minCredit: "680-720+",
    maxDTI: "43% typical",
    upfrontFee: "None",
    monthlyMI: "Varies (or none with 20%+)",
    maxLoanAmount: "$3M+ (varies by lender)",
    occupancy: ["Primary", "Second Home", "Investment"],
    propertyTypes: ["SFR", "Condo", "Townhome", "2-4 Units"],
    incomeVerification: "Full doc (asset-based available)",
    reserves: "6-12+ months",
    sellerConcessions: "Varies (typically 3%)",
    giftFunds: "Limited",
    manualUW: "Manual review standard",
    cashOut: "Up to 75-80% LTV",
    pros: ["High loan amounts", "No loan limit", "Competitive rates for strong profiles"],
    cons: ["Higher down payment", "Higher credit required", "More reserves", "Stricter guidelines"]
  },
  {
    id: "dscr",
    name: "DSCR (Investor)",
    icon: Building,
    color: "bg-indigo-600",
    minDownPayment: "15-25%",
    minCredit: "620+",
    maxDTI: "N/A (rental income based)",
    upfrontFee: "None",
    monthlyMI: "None",
    maxLoanAmount: "$3M+",
    occupancy: ["Investment Only"],
    propertyTypes: ["SFR", "Condo", "2-4 Units", "Condotel", "STR"],
    incomeVerification: "None (property income only)",
    reserves: "3-12 months",
    sellerConcessions: "Varies",
    giftFunds: "Limited",
    manualUW: "N/A",
    cashOut: "Up to 75% LTV",
    pros: ["No income verification", "LLC/entity eligible", "STR/Airbnb OK", "Foreign nationals eligible"],
    cons: ["Investment only", "Higher rates", "Higher down payment", "Prepay penalties possible"]
  },
  {
    id: "bank-statement",
    name: "Bank Statement",
    icon: FileText,
    color: "bg-teal-600",
    minDownPayment: "10-20%",
    minCredit: "620+",
    maxDTI: "50%",
    upfrontFee: "None",
    monthlyMI: "Varies",
    maxLoanAmount: "$3M+",
    occupancy: ["Primary", "Second Home", "Investment"],
    propertyTypes: ["SFR", "Condo", "Townhome", "2-4 Units"],
    incomeVerification: "12-24 mo bank statements",
    reserves: "3-12 months",
    sellerConcessions: "Varies (typically 3%)",
    giftFunds: "Limited",
    manualUW: "Manual review standard",
    cashOut: "Up to 75-80% LTV",
    pros: ["No tax returns", "Self-employed friendly", "P&L/1099 options", "All occupancy types"],
    cons: ["Higher rates", "Higher down payment", "1-2 years self-employment required"]
  }
]

const comparisonRows = [
  { key: "minDownPayment", label: "Min Down Payment" },
  { key: "minCredit", label: "Min Credit Score" },
  { key: "maxDTI", label: "Max DTI" },
  { key: "upfrontFee", label: "Upfront Fee/MIP" },
  { key: "monthlyMI", label: "Monthly MI/Fee" },
  { key: "maxLoanAmount", label: "Max Loan Amount" },
  { key: "occupancy", label: "Occupancy Types", isArray: true },
  { key: "incomeVerification", label: "Income Verification" },
  { key: "reserves", label: "Reserves Required" },
  { key: "sellerConcessions", label: "Seller Concessions" },
  { key: "giftFunds", label: "Gift Funds" },
  { key: "manualUW", label: "Manual Underwriting" },
  { key: "cashOut", label: "Cash-Out Refi" }
]

export function LoanComparisonTool() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(["conventional", "fha", "va"])
  
  const toggleProgram = (id: string) => {
    setSelectedPrograms(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id)
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id]
      }
      return [...prev, id]
    })
  }
  
  const selectedLoanData = loanPrograms.filter(p => selectedPrograms.includes(p.id))
  
  return (
    <section id="loan-comparison" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Scale className="h-3 w-3 mr-1" />
            Compare
          </Badge>
          <h2 className="text-3xl font-bold mb-2">Loan Program Comparison</h2>
          <p className="text-muted-foreground">Select up to 4 programs to compare side-by-side</p>
        </div>
        
        {/* Program Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {loanPrograms.map(program => {
            const Icon = program.icon
            const isSelected = selectedPrograms.includes(program.id)
            return (
              <button
                key={program.id}
                onClick={() => toggleProgram(program.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
                  isSelected 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn("p-1.5 rounded", program.color)}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">{program.name}</span>
                {isSelected && (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            )
          })}
        </div>
        
        {selectedLoanData.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select at least one loan program to compare</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-muted/50 rounded-tl-lg w-48">
                    <span className="font-semibold">Feature</span>
                  </th>
                  {selectedLoanData.map((program, index) => {
                    const Icon = program.icon
                    return (
                      <th 
                        key={program.id} 
                        className={cn(
                          "p-4 bg-muted/50 text-center",
                          index === selectedLoanData.length - 1 && "rounded-tr-lg"
                        )}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={cn("p-2 rounded-lg", program.color)}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold">{program.name}</span>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr key={row.key} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="p-4 font-medium text-sm">{row.label}</td>
                    {selectedLoanData.map(program => {
                      const value = program[row.key as keyof LoanProgram]
                      return (
                        <td key={program.id} className="p-4 text-center text-sm">
                          {row.isArray && Array.isArray(value) ? (
                            <div className="flex flex-wrap justify-center gap-1">
                              {(value as string[]).map((v, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {v}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span>{value as string}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                
                {/* Pros row */}
                <tr className="bg-green-50 dark:bg-green-950/20">
                  <td className="p-4 font-medium text-sm text-green-700 dark:text-green-400">Advantages</td>
                  {selectedLoanData.map(program => (
                    <td key={program.id} className="p-4 text-sm">
                      <ul className="space-y-1">
                        {program.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-1 text-left">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-xs">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                
                {/* Cons row */}
                <tr className="bg-amber-50 dark:bg-amber-950/20">
                  <td className="p-4 font-medium text-sm text-amber-700 dark:text-amber-400 rounded-bl-lg">Considerations</td>
                  {selectedLoanData.map((program, index) => (
                    <td 
                      key={program.id} 
                      className={cn(
                        "p-4 text-sm",
                        index === selectedLoanData.length - 1 && "rounded-br-lg"
                      )}
                    >
                      <ul className="space-y-1">
                        {program.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-1 text-left">
                            <Minus className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground text-center mt-6">
          * Guidelines shown are general. Credit score minimums may vary by lender overlay. VA funding fee exempt for 10%+ service-connected disability. FHA MIP removable with 10%+ down after 11 years.
        </p>
      </div>
    </section>
  )
}
