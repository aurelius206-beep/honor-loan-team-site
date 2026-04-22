"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { 
  Receipt,
  FileText,
  Shield,
  Landmark,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface CostItem {
  name: string
  amount: number
  category: "origination" | "lender" | "title" | "prepaid"
  description: string
}

export function ClosingCostEstimator() {
  const [purchasePrice, setPurchasePrice] = useState("400000")
  const [downPaymentPercent, setDownPaymentPercent] = useState([20])
  const [loanType, setLoanType] = useState("conventional")
  const [state, setState] = useState("WA")
  const [isFirstHome, setIsFirstHome] = useState(true)
  const [showDetails, setShowDetails] = useState(true)
  
  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? value.replace(/[^0-9]/g, "") : value.toString()
    if (!num) return ""
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(parseInt(num))
  }
  
  const handleCurrencyInput = (setter: (v: string) => void, value: string) => {
    const num = value.replace(/[^0-9]/g, "")
    setter(num)
  }
  
  const calculations = useMemo(() => {
    const price = parseInt(purchasePrice) || 0
    if (price === 0) return null
    
    const dpPercent = downPaymentPercent[0] / 100
    const downPayment = price * dpPercent
    const loanAmount = price - downPayment
    const ltv = loanAmount / price
    
    const costs: CostItem[] = []
    
    // Origination Charges
    costs.push({
      name: "Underwriting Fee",
      amount: 1395,
      category: "origination",
      description: "Fee for reviewing and approving your loan"
    })
    
    // Lender Fees
    costs.push({
      name: "Credit Report",
      amount: 250,
      category: "lender",
      description: "Fee to pull your credit report"
    })
    
    costs.push({
      name: "Flood Certification",
      amount: 20,
      category: "lender",
      description: "Verify if property is in flood zone"
    })
    
    costs.push({
      name: "Tax Service Fee",
      amount: 85,
      category: "lender",
      description: "Monitor property tax payments"
    })
    
    // Loan-type specific fees
    if (loanType === "fha") {
      costs.push({
        name: "FHA Upfront MIP",
        amount: Math.round(loanAmount * 0.0175),
        category: "lender",
        description: "FHA mortgage insurance premium (1.75%)"
      })
    } else if (loanType === "va") {
      // VA Funding Fee (first time use, 0% down)
      const vaFundingFee = dpPercent >= 0.1 ? 0.0125 : dpPercent >= 0.05 ? 0.015 : 0.0215
      costs.push({
        name: "VA Funding Fee",
        amount: Math.round(loanAmount * vaFundingFee),
        category: "lender",
        description: `VA funding fee (${(vaFundingFee * 100).toFixed(2)}%) - may be exempt with disability`
      })
    } else if (loanType === "usda") {
      costs.push({
        name: "USDA Guarantee Fee",
        amount: Math.round(loanAmount * 0.01),
        category: "lender",
        description: "USDA upfront guarantee fee (1%)"
      })
    }
    
    // Appraisal
    costs.push({
      name: "Appraisal Fee",
      amount: 800,
      category: "lender",
      description: "Professional property valuation"
    })
    
    // Title & Escrow
    costs.push({
      name: "Title Search",
      amount: 200,
      category: "title",
      description: "Research property ownership history"
    })
    
    costs.push({
      name: "Title Insurance (Lender)",
      amount: Math.round(loanAmount * 0.0025),
      category: "title",
      description: "Protects lender against title issues"
    })
    
    costs.push({
      name: "Escrow/Settlement Fee",
      amount: 750,
      category: "title",
      description: "Third-party transaction management"
    })
    
    costs.push({
      name: "Notary Fee",
      amount: 150,
      category: "title",
      description: "Document notarization"
    })
    
    costs.push({
      name: "Recording Fees",
      amount: 150,
      category: "title",
      description: "Record deed with county"
    })
    
    // Prepaids
    costs.push({
      name: "Homeowner Insurance (1 Year)",
      amount: Math.round(price * 0.004),
      category: "prepaid",
      description: "First year homeowner's insurance"
    })
    
    costs.push({
      name: "Property Tax (2-6 Months)",
      amount: Math.round((price * 0.012) / 12 * 4),
      category: "prepaid",
      description: "Prepaid property taxes for escrow"
    })
    
    costs.push({
      name: "Prepaid Interest",
      amount: Math.round((loanAmount * 0.065 / 365) * 15),
      category: "prepaid",
      description: "Daily interest from closing to month-end"
    })
    
    costs.push({
      name: "Insurance Escrow (3 Months)",
      amount: Math.round((price * 0.004) / 12 * 3),
      category: "prepaid",
      description: "Insurance reserves for escrow account"
    })
    
    // Calculate totals
    const originationFees = costs.filter(c => c.category === "origination").reduce((sum, c) => sum + c.amount, 0)
    const lenderFees = costs.filter(c => c.category === "lender").reduce((sum, c) => sum + c.amount, 0)
    const titleFees = costs.filter(c => c.category === "title").reduce((sum, c) => sum + c.amount, 0)
    const prepaids = costs.filter(c => c.category === "prepaid").reduce((sum, c) => sum + c.amount, 0)
    
    const totalRequired = costs.reduce((sum, c) => sum + c.amount, 0)
    
    const cashToClose = downPayment + totalRequired
    
    return {
      price,
      downPayment,
      loanAmount,
      ltv: Math.round(ltv * 100),
      costs,
      totals: {
        originationFees,
        lenderFees,
        titleFees,
        prepaids,
        totalRequired
      },
      cashToClose
    }
  }, [purchasePrice, downPaymentPercent, loanType, state])
  
  const categoryIcons = {
    origination: Receipt,
    lender: Landmark,
    title: FileText,
    prepaid: Shield
  }
  
  const categoryNames = {
    origination: "Origination Charges",
    lender: "Lender Fees",
    title: "Title & Escrow",
    prepaid: "Prepaids & Escrow"
  }
  
  return (
    <section id="closing-costs" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Receipt className="h-3 w-3 mr-1" />
            Closing Costs
          </Badge>
          <h2 className="text-3xl font-bold mb-2">Closing Cost Estimator</h2>
          <p className="text-muted-foreground">Estimate your total cash needed at closing</p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Purchase Price</Label>
                <Input
                  placeholder="$400,000"
                  value={purchasePrice ? formatCurrency(purchasePrice) : ""}
                  onChange={(e) => handleCurrencyInput(setPurchasePrice, e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Down Payment</Label>
                  <span className="text-lg font-semibold">{downPaymentPercent[0]}%</span>
                </div>
                <Slider
                  value={downPaymentPercent}
                  onValueChange={setDownPaymentPercent}
                  min={0}
                  max={40}
                  step={0.5}
                />
                {calculations && (
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(calculations.downPayment)} down
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="fha">FHA</SelectItem>
                    <SelectItem value="va">VA</SelectItem>
                    <SelectItem value="usda">USDA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Property State</Label>
                <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                  <span className="text-sm font-medium">Washington (WA)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary Card */}
            <Card className="border-2 border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Closing Costs</p>
                    <p className="text-4xl font-bold text-primary">
                      {calculations ? formatCurrency(calculations.totals.totalRequired) : "$0"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ~2.5% of purchase price
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Cash to Close</p>
                    <p className="text-4xl font-bold">
                      {calculations ? formatCurrency(calculations.cashToClose) : "$0"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Including {downPaymentPercent[0]}% down payment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Cost Breakdown */}
            {calculations && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {showDetails ? "Hide" : "Show"} Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(["origination", "lender", "title", "prepaid"] as const).map(category => {
                      const Icon = categoryIcons[category]
                      const items = calculations.costs.filter(c => c.category === category)
                      const total = items.reduce((sum, c) => sum + c.amount, 0)
                      
                      if (items.length === 0) return null
                      
                      return (
                        <div key={category} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{categoryNames[category]}</span>
                            </div>
                            <span className="font-semibold">{formatCurrency(total)}</span>
                          </div>
                          
                          {showDetails && (
                            <div className="mt-3 space-y-2 text-sm">
                              {items.map((item, i) => (
                                <div key={i} className="flex items-start justify-between gap-2 text-muted-foreground">
                                  <div className="flex-1">
                                    <span>{item.name}</span>
                                  </div>
                                  <span className="shrink-0">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="bg-amber-50/50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-800">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Important Notes</p>
                    <ul className="text-amber-700 dark:text-amber-300 space-y-1 text-xs">
                      <li>This is an estimate only - actual costs vary by lender and location</li>
                      <li>Seller may contribute toward your closing costs (varies by loan type)</li>
                      <li>Some costs are negotiable (title services, lender fees)</li>
                      <li>Request a Loan Estimate from your lender for exact figures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
