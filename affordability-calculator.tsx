"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { 
  Calculator,
  Home,
  DollarSign,
  Percent,
  TrendingUp,
  PiggyBank,
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react"

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState("")
  const [monthlyDebts, setMonthlyDebts] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [interestRate, setInterestRate] = useState([6.5])
  const [loanTerm, setLoanTerm] = useState("30")
  const [propertyTaxRate, setPropertyTaxRate] = useState([1.2])
  const [insuranceAnnual, setInsuranceAnnual] = useState("1800")
  const [includesMI, setIncludesMI] = useState(true)
  
  const formatCurrency = (value: string) => {
    const num = value.replace(/[^0-9]/g, "")
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
    const income = parseInt(annualIncome) || 0
    const debts = parseInt(monthlyDebts) || 0
    const dp = parseInt(downPayment) || 0
    const rate = interestRate[0] / 100 / 12
    const months = parseInt(loanTerm) * 12
    const taxRate = propertyTaxRate[0] / 100
    const insurance = parseInt(insuranceAnnual) || 0
    
    if (income === 0) {
      return null
    }
    
    const monthlyIncome = income / 12
    
    // Calculate max payment using DTI ratios
    const maxFrontEndPayment = monthlyIncome * 0.28 // Front-end ratio (housing only)
    const maxBackEndPayment = (monthlyIncome * 0.43) - debts // Back-end ratio (all debts)
    
    // Use the lower of the two
    const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment)
    
    if (maxMonthlyPayment <= 0) {
      return {
        maxHomePrice: 0,
        maxLoanAmount: 0,
        monthlyPayment: 0,
        monthlyIncome,
        frontEndDTI: 0,
        backEndDTI: (debts / monthlyIncome) * 100,
        breakdown: { principal: 0, tax: 0, insurance: 0, mi: 0 },
        isAffordable: false,
        warnings: ["Your current debt payments exceed recommended limits"]
      }
    }
    
    // Estimate taxes, insurance, and MI as percentage of payment
    // Typical breakdown: ~75% P&I, ~15% taxes, ~7% insurance, ~3% MI
    const estimatedPIPayment = maxMonthlyPayment * 0.75
    
    // Calculate max loan amount from P&I payment
    // P&I = L * [r(1+r)^n] / [(1+r)^n-1]
    const maxLoanAmount = rate > 0 
      ? estimatedPIPayment * (Math.pow(1 + rate, months) - 1) / (rate * Math.pow(1 + rate, months))
      : estimatedPIPayment * months
    
    // Calculate max home price
    const maxHomePrice = maxLoanAmount + dp
    
    // Calculate actual payment breakdown
    const loanAmount = maxHomePrice - dp
    const principalAndInterest = rate > 0
      ? loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      : loanAmount / months
    
    const monthlyTax = (maxHomePrice * taxRate) / 12
    const monthlyInsurance = insurance / 12
    
    // Estimate MI (0.5% of loan amount annually for PMI if <20% down)
    const ltv = loanAmount / maxHomePrice
    const monthlyMI = includesMI && ltv > 0.8 
      ? (loanAmount * 0.005) / 12 
      : 0
    
    const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyMI
    
    const frontEndDTI = (totalMonthlyPayment / monthlyIncome) * 100
    const backEndDTI = ((totalMonthlyPayment + debts) / monthlyIncome) * 100
    
    const warnings: string[] = []
    if (frontEndDTI > 28) warnings.push("Front-end DTI exceeds 28% guideline")
    if (backEndDTI > 43) warnings.push("Back-end DTI exceeds 43% guideline")
    if (ltv > 0.97) warnings.push("LTV exceeds most program limits")
    
    return {
      maxHomePrice: Math.round(maxHomePrice),
      maxLoanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(totalMonthlyPayment),
      monthlyIncome: Math.round(monthlyIncome),
      frontEndDTI: Math.round(frontEndDTI * 10) / 10,
      backEndDTI: Math.round(backEndDTI * 10) / 10,
      breakdown: {
        principal: Math.round(principalAndInterest),
        tax: Math.round(monthlyTax),
        insurance: Math.round(monthlyInsurance),
        mi: Math.round(monthlyMI)
      },
      isAffordable: frontEndDTI <= 28 && backEndDTI <= 43,
      warnings
    }
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, propertyTaxRate, insuranceAnnual, includesMI])
  
  return (
    <section id="affordability" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Calculator className="h-3 w-3 mr-1" />
            Affordability
          </Badge>
          <h2 className="text-3xl font-bold mb-2">How Much Home Can You Afford?</h2>
          <p className="text-muted-foreground">Calculate your maximum home purchase price based on your income and debts</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Financial Profile</CardTitle>
              <CardDescription>Enter your income and expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Annual Gross Income
                </Label>
                <Input
                  placeholder="$100,000"
                  value={annualIncome ? formatCurrency(annualIncome) : ""}
                  onChange={(e) => handleCurrencyInput(setAnnualIncome, e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Total household income before taxes</p>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Monthly Debt Payments
                </Label>
                <Input
                  placeholder="$500"
                  value={monthlyDebts ? formatCurrency(monthlyDebts) : ""}
                  onChange={(e) => handleCurrencyInput(setMonthlyDebts, e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Car payments, student loans, credit cards (minimum payments)</p>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" />
                  Down Payment Available
                </Label>
                <Input
                  placeholder="$50,000"
                  value={downPayment ? formatCurrency(downPayment) : ""}
                  onChange={(e) => handleCurrencyInput(setDownPayment, e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Interest Rate
                  </Label>
                  <span className="text-lg font-semibold">{interestRate[0]}%</span>
                </div>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={3}
                  max={10}
                  step={0.125}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Loan Term</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Property Tax Rate</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={propertyTaxRate[0]}
                      onChange={(e) => setPropertyTaxRate([parseFloat(e.target.value) || 0])}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Annual Home Insurance</Label>
                <Input
                  placeholder="$1,800"
                  value={insuranceAnnual ? formatCurrency(insuranceAnnual) : ""}
                  onChange={(e) => handleCurrencyInput(setInsuranceAnnual, e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Results Section */}
          <div className="space-y-6">
            <Card className={cn(
              "border-2 transition-colors",
              calculations?.isAffordable 
                ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/10" 
                : calculations?.warnings.length 
                  ? "border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/10"
                  : "border-border"
            )}>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">You can afford a home up to</p>
                  <p className="text-5xl font-bold text-primary">
                    {calculations?.maxHomePrice 
                      ? formatCurrency(calculations.maxHomePrice.toString())
                      : "$0"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-semibold">
                      {calculations?.maxLoanAmount 
                        ? formatCurrency(calculations.maxLoanAmount.toString())
                        : "$0"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Monthly Payment</p>
                    <p className="text-lg font-semibold">
                      {calculations?.monthlyPayment 
                        ? formatCurrency(calculations.monthlyPayment.toString())
                        : "$0"}
                    </p>
                  </div>
                </div>
                
                {calculations?.breakdown && (
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium">Monthly Payment Breakdown</p>
                    <div className="space-y-2">
                      {[
                        { label: "Principal & Interest", value: calculations.breakdown.principal, color: "bg-blue-500" },
                        { label: "Property Tax", value: calculations.breakdown.tax, color: "bg-green-500" },
                        { label: "Home Insurance", value: calculations.breakdown.insurance, color: "bg-amber-500" },
                        ...(calculations.breakdown.mi > 0 ? [{ label: "Mortgage Insurance", value: calculations.breakdown.mi, color: "bg-purple-500" }] : [])
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={cn("w-3 h-3 rounded", item.color)} />
                          <span className="text-sm flex-1">{item.label}</span>
                          <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {calculations && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Front-End DTI</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        calculations.frontEndDTI <= 28 ? "text-green-600" : "text-amber-600"
                      )}>
                        {calculations.frontEndDTI}%
                      </p>
                      <p className="text-xs text-muted-foreground">Target: 28% max</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Back-End DTI</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        calculations.backEndDTI <= 43 ? "text-green-600" : "text-amber-600"
                      )}>
                        {calculations.backEndDTI}%
                      </p>
                      <p className="text-xs text-muted-foreground">Target: 43% max</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {calculations?.warnings && calculations.warnings.length > 0 && (
              <Card className="border-amber-500/50">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Considerations</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {calculations.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="bg-muted/30">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">About This Calculator</p>
                    <ul className="space-y-1 text-xs">
                      <li>Uses standard 28% front-end and 43% back-end DTI ratios</li>
                      <li>FHA/VA may allow higher DTI ratios with compensating factors</li>
                      <li>Actual approval depends on credit, assets, and full underwriting</li>
                      <li>This is an estimate only - get pre-approved for accurate amounts</li>
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
