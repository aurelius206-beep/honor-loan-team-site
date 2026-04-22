"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VineDivider, VineCorner } from "@/components/vine-decoration"
import { FloatingShield } from "@/components/shield-logo"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Calculator, DollarSign, Percent, Calendar, TrendingDown, Info, Home, AlertCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Loan type configurations
const LOAN_CONFIGS = {
  fha: {
    name: "FHA",
    description: "Federal Housing Administration - Great for first-time buyers with lower credit scores",
    minDownPayment: 3.5,
    upfrontMIP: 1.75,
    annualMIP: {
      "30": { high: 0.85, low: 0.80 },
      "15": { high: 0.70, low: 0.45 },
    },
    maxLoanAmount: 472030,
  },
  va: {
    name: "VA",
    description: "Veterans Affairs - For eligible veterans and service members with no down payment required",
    minDownPayment: 0,
    fundingFee: {
      firstTime: { zero: 2.15, fivePercent: 1.50, tenPercent: 1.25 },
      subsequent: { zero: 3.30, fivePercent: 1.50, tenPercent: 1.25 },
    },
    maxLoanAmount: 766550,
  },
  conventional: {
    name: "Conventional",
    description: "Traditional financing with competitive rates - Best for buyers with good credit and 5%+ down",
    minDownPayment: 3,
    pmiRates: {
      "97": 1.1,
      "95": 0.9,
      "90": 0.5,
      "85": 0.3,
      "80": 0,
    },
    maxLoanAmount: 766550,
  },
  chattel: {
    name: "Chattel",
    description: "Manufactured/Mobile Home Loan - For homes on leased land or in mobile home parks. No PMI required.",
    minDownPayment: 5,
    maxTerm: 25,
    minCreditScore: 550,
    minHomeDate: "1976-06-15",
    // Chattel 300 (25yr) rates based on credit score and down payment
    // Format: creditScoreRange -> downPaymentPercent -> rate
    interestRates: {
      "775+": { "35": 8.33, "20": 8.33, "15": 8.33, "10": 8.33, "5": 8.33 },
      "740-774": { "35": 8.38, "20": 8.38, "15": 8.38, "10": 8.38, "5": 8.38 },
      "700-739": { "35": 8.60, "20": 8.63, "15": 8.66, "10": 8.69, "5": 8.72 },
      "650-699": { "35": 9.51, "20": 9.54, "15": 9.57, "10": 9.60, "5": 9.63 },
      "640-649": { "35": 9.90, "20": 9.93, "15": 9.96, "10": 9.99, "5": 10.02 },
      "620-639": { "35": 11.35, "20": 11.38, "15": 11.41, "10": 11.44, "5": 11.47 },
      "600-619": { "35": 11.50, "20": 11.53, "15": 11.56, "10": 11.59, "5": 11.62 },
      "575-599": { "35": 11.96, "20": 11.99, "15": 11.99, "10": null, "5": null },
      "550-574": { "35": 11.99, "20": 11.99, "15": 11.99, "10": null, "5": null },
    },
    // Chattel 240 (20yr) rates
    interestRates20yr: {
      "775+": { "35": 8.18, "20": 8.18, "15": 8.18, "10": 8.18, "5": 8.18 },
      "740-774": { "35": 8.25, "20": 8.25, "15": 8.25, "10": 8.25, "5": 8.25 },
      "700-739": { "35": 8.45, "20": 8.48, "15": 8.51, "10": 8.54, "5": 8.57 },
      "650-699": { "35": 9.36, "20": 9.39, "15": 9.42, "10": 9.45, "5": 9.48 },
      "640-649": { "35": 9.75, "20": 9.78, "15": 9.81, "10": 9.84, "5": 9.87 },
      "620-639": { "35": 11.35, "20": 11.38, "15": 11.41, "10": 11.44, "5": 11.47 },
      "600-619": { "35": 11.50, "20": 11.53, "15": 11.56, "10": 11.59, "5": 11.62 },
      "575-599": { "35": 11.96, "20": 11.97, "15": 11.97, "10": null, "5": null },
      "550-574": { "35": 11.97, "20": 11.97, "15": 11.97, "10": null, "5": null },
    },
  },
}

const TERM_OPTIONS = [
  { value: "30", label: "30 Years" },
  { value: "25", label: "25 Years" },
  { value: "20", label: "20 Years" },
  { value: "15", label: "15 Years" },
  { value: "10", label: "10 Years" },
]

const CHATTEL_TERM_OPTIONS = [
  { value: "25", label: "25 Years" },
  { value: "20", label: "20 Years" },
  { value: "15", label: "15 Years" },
  { value: "10", label: "10 Years" },
]

const CREDIT_SCORE_OPTIONS = [
  { value: "775+", label: "775+ (Excellent - Gold)", tier: "Gold" },
  { value: "740-774", label: "740-774 (Very Good - Gold)", tier: "Gold" },
  { value: "700-739", label: "700-739 (Good - Gold)", tier: "Gold" },
  { value: "650-699", label: "650-699 (Fair - Gold)", tier: "Gold" },
  { value: "640-649", label: "640-649 (Gold)", tier: "Gold" },
  { value: "620-639", label: "620-639 (Silver)", tier: "Silver" },
  { value: "600-619", label: "600-619 (Silver)", tier: "Silver" },
  { value: "575-599", label: "575-599 (Bronze)", tier: "Bronze" },
  { value: "550-574", label: "550-574 (Bronze - Minimum)", tier: "Bronze" },
]

const DOWN_PAYMENT_OPTIONS = [
  { value: "35", label: "35% Down" },
  { value: "20", label: "20% Down" },
  { value: "15", label: "15% Down" },
  { value: "10", label: "10% Down" },
  { value: "5", label: "5% Down (Minimum)" },
]

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
  totalInterest: number
  totalPrincipal: number
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCurrencyExact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function MortgageCalculator() {
  // Shared state
  const [calculatorType, setCalculatorType] = useState<"traditional" | "chattel">("traditional")
  
  // Traditional loan state
  const [loanType, setLoanType] = useState<"fha" | "va" | "conventional">("conventional")
  const [homePrice, setHomePrice] = useState(400000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(10)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState("30")
  const [propertyTaxType, setPropertyTaxType] = useState<"percent" | "exact">("percent")
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(1)
  const [propertyTaxExact, setPropertyTaxExact] = useState(4000)
  const [homeInsurance, setHomeInsurance] = useState(1200)
  const [hoaMonthly, setHoaMonthly] = useState(0)
  const [isVeteranFirstTime, setIsVeteranFirstTime] = useState<boolean | "disabled">(true)
  const [showAmortization, setShowAmortization] = useState(false)
  const [extraPayment, setExtraPayment] = useState(0)

  // Chattel loan state
  const [chattelHomePrice, setChattelHomePrice] = useState(150000)
  const [chattelDownPaymentPercent, setChattelDownPaymentPercent] = useState("5")
  const [chattelLoanTerm, setChattelLoanTerm] = useState("25")
  const [chattelCreditScore, setChattelCreditScore] = useState<string>("700-739")
  const [chattelPropertyTaxType, setChattelPropertyTaxType] = useState<"percent" | "exact">("percent")
  const [chattelPropertyTaxPercent, setChattelPropertyTaxPercent] = useState(1)
  const [chattelPropertyTaxExact, setChattelPropertyTaxExact] = useState(1500)
  const [chattelInsurance, setChattelInsurance] = useState(1000)
  const [lotSpaceRent, setLotSpaceRent] = useState(800)
  const [chattelExtraPayment, setChattelExtraPayment] = useState(0)
  const [showChattelAmortization, setShowChattelAmortization] = useState(false)

  // Calculate property tax based on type selection
  const propertyTax = propertyTaxType === "percent" 
    ? homePrice * (propertyTaxPercent / 100) 
    : propertyTaxExact

  const chattelPropertyTax = chattelPropertyTaxType === "percent"
    ? chattelHomePrice * (chattelPropertyTaxPercent / 100)
    : chattelPropertyTaxExact

  // Traditional loan calculations
  const calculations = useMemo(() => {
    const config = LOAN_CONFIGS[loanType]
    const downPayment = homePrice * (downPaymentPercent / 100)
    const baseLoanAmount = homePrice - downPayment
    const ltv = ((homePrice - downPayment) / homePrice) * 100
    const monthlyRate = interestRate / 100 / 12
    const numPayments = parseInt(loanTerm) * 12

    let upfrontFee = 0
    let monthlyMI = 0
    let finalLoanAmount = baseLoanAmount

    if (loanType === "fha") {
      upfrontFee = baseLoanAmount * (config.upfrontMIP / 100)
      finalLoanAmount = baseLoanAmount + upfrontFee
      
      const mipConfig = config.annualMIP[loanTerm as "30" | "15"] || config.annualMIP["30"]
      const annualMIPRate = ltv > 95 ? mipConfig.high : mipConfig.low
      monthlyMI = (baseLoanAmount * (annualMIPRate / 100)) / 12
    } else if (loanType === "va") {
      // 10% or more disabled veterans are exempt from VA funding fee
      if (isVeteranFirstTime === "disabled") {
        upfrontFee = 0
        finalLoanAmount = baseLoanAmount
      } else {
        const feeType = isVeteranFirstTime ? config.fundingFee.firstTime : config.fundingFee.subsequent
        let feeRate = feeType.zero
        if (downPaymentPercent >= 10) feeRate = feeType.tenPercent
        else if (downPaymentPercent >= 5) feeRate = feeType.fivePercent
        
        upfrontFee = baseLoanAmount * (feeRate / 100)
        finalLoanAmount = baseLoanAmount + upfrontFee
      }
    } else {
      if (ltv > 80) {
        let pmiRate = 0
        if (ltv > 95) pmiRate = config.pmiRates["97"]
        else if (ltv > 90) pmiRate = config.pmiRates["95"]
        else if (ltv > 85) pmiRate = config.pmiRates["90"]
        else pmiRate = config.pmiRates["85"]
        
        monthlyMI = (baseLoanAmount * (pmiRate / 100)) / 12
      }
    }

    const monthlyPI = finalLoanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    const monthlyTax = propertyTax / 12
    const monthlyInsurance = homeInsurance / 12
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyMI + hoaMonthly

    const amortization: AmortizationRow[] = []
    let balance = finalLoanAmount
    let totalInterestPaid = 0
    let totalPrincipalPaid = 0

    for (let month = 1; month <= numPayments && balance > 0; month++) {
      const interestPayment = balance * monthlyRate
      let principalPayment = monthlyPI - interestPayment + extraPayment
      
      if (principalPayment > balance) {
        principalPayment = balance
      }
      
      totalInterestPaid += interestPayment
      totalPrincipalPaid += principalPayment
      balance -= principalPayment

      if (balance < 0) balance = 0

      amortization.push({
        month,
        payment: monthlyPI + extraPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance,
        totalInterest: totalInterestPaid,
        totalPrincipal: totalPrincipalPaid,
      })

      if (balance <= 0) break
    }

    const actualPayoffMonths = amortization.length
    const monthsSaved = numPayments - actualPayoffMonths
    const standardTotalInterest = amortization.length > 0 ? 
      (monthlyPI * numPayments) - finalLoanAmount : 0
    const actualTotalInterest = totalInterestPaid
    const interestSaved = extraPayment > 0 ? standardTotalInterest - actualTotalInterest : 0

    return {
      homePrice,
      downPayment,
      baseLoanAmount,
      upfrontFee,
      finalLoanAmount,
      ltv,
      monthlyPI,
      monthlyMI,
      monthlyTax,
      monthlyInsurance,
      monthlyHOA: hoaMonthly,
      totalMonthly,
      amortization,
      totalInterest: totalInterestPaid,
      actualPayoffMonths,
      monthsSaved,
      interestSaved,
    }
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance, hoaMonthly, loanType, isVeteranFirstTime, extraPayment])

  // Chattel loan calculations
  const chattelCalculations = useMemo(() => {
    const config = LOAN_CONFIGS.chattel
    
    // Get rate based on term (25yr vs 20yr), credit score, and down payment
    const rateTable = parseInt(chattelLoanTerm) <= 20 
      ? config.interestRates20yr 
      : config.interestRates
    
    const creditScoreRates = rateTable[chattelCreditScore as keyof typeof rateTable]
    const downPaymentKey = chattelDownPaymentPercent as keyof typeof creditScoreRates
    const interestRateValue = creditScoreRates?.[downPaymentKey]
    
    // Check if this combination is available
    const isRateAvailable = interestRateValue !== null && interestRateValue !== undefined
    
    const downPaymentAmount = chattelHomePrice * (parseInt(chattelDownPaymentPercent) / 100)
    const loanAmount = chattelHomePrice - downPaymentAmount
    const effectiveRate = isRateAvailable ? interestRateValue : 10 // Default rate if not available
    const monthlyRate = effectiveRate / 100 / 12
    const numPayments = parseInt(chattelLoanTerm) * 12

    const monthlyPI = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    const monthlyTax = chattelPropertyTax / 12
    const monthlyInsurance = chattelInsurance / 12
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + lotSpaceRent

    const amortization: AmortizationRow[] = []
    let balance = loanAmount
    let totalInterestPaid = 0
    let totalPrincipalPaid = 0

    for (let month = 1; month <= numPayments && balance > 0; month++) {
      const interestPayment = balance * monthlyRate
      let principalPayment = monthlyPI - interestPayment + chattelExtraPayment
      
      if (principalPayment > balance) {
        principalPayment = balance
      }
      
      totalInterestPaid += interestPayment
      totalPrincipalPaid += principalPayment
      balance -= principalPayment

      if (balance < 0) balance = 0

      amortization.push({
        month,
        payment: monthlyPI + chattelExtraPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance,
        totalInterest: totalInterestPaid,
        totalPrincipal: totalPrincipalPaid,
      })

      if (balance <= 0) break
    }

    const actualPayoffMonths = amortization.length
    const monthsSaved = numPayments - actualPayoffMonths
    const standardTotalInterest = amortization.length > 0 ? 
      (monthlyPI * numPayments) - loanAmount : 0
    const actualTotalInterest = totalInterestPaid
    const interestSaved = chattelExtraPayment > 0 ? standardTotalInterest - actualTotalInterest : 0

    return {
      homePrice: chattelHomePrice,
      downPayment: downPaymentAmount,
      loanAmount,
      interestRate: effectiveRate,
      isRateAvailable,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      lotSpaceRent,
      totalMonthly,
      amortization,
      totalInterest: totalInterestPaid,
      actualPayoffMonths,
      monthsSaved,
      interestSaved,
    }
  }, [chattelHomePrice, chattelDownPaymentPercent, chattelLoanTerm, chattelCreditScore, chattelPropertyTax, chattelInsurance, lotSpaceRent, chattelExtraPayment])

  return (
    <section id="calculator" className="relative py-24 bg-muted/30 overflow-hidden">
      <VineCorner position="top-left" className="text-foreground" />
      <VineCorner position="bottom-right" className="text-foreground" />
      <FloatingShield position="top-right" size="xl" opacity={0.04} />
      <FloatingShield position="bottom-left" size="lg" opacity={0.03} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">Plan Your Future</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Mortgage <span className="text-secondary italic">Calculator</span>
          </h2>
          <VineDivider className="mt-6" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calculate your monthly payment for FHA, VA, Conventional, or Chattel loans. 
            Includes mortgage insurance, taxes, and a full amortization schedule.
          </p>
        </div>

        {/* Main Calculator Type Tabs */}
        <Tabs value={calculatorType} onValueChange={(v) => setCalculatorType(v as "traditional" | "chattel")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-14">
            <TabsTrigger value="traditional" className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Home className="h-5 w-5 mr-2" />
              Traditional Loans
            </TabsTrigger>
            <TabsTrigger value="chattel" className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Home className="h-5 w-5 mr-2" />
              Chattel Loans
            </TabsTrigger>
          </TabsList>

          {/* Traditional Loan Calculator */}
          <TabsContent value="traditional">
            <Card className="border-0 shadow-2xl overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <Tabs value={loanType} onValueChange={(v) => setLoanType(v as typeof loanType)} className="w-full">
                  <TabsList className="w-full rounded-none h-auto p-0 bg-primary">
                    <TabsTrigger 
                      value="fha" 
                      className="flex-1 py-4 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/70"
                    >
                      FHA Loan
                    </TabsTrigger>
                    <TabsTrigger 
                      value="va" 
                      className="flex-1 py-4 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/70"
                    >
                      VA Loan
                    </TabsTrigger>
                    <TabsTrigger 
                      value="conventional" 
                      className="flex-1 py-4 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/70"
                    >
                      Conventional
                    </TabsTrigger>
                  </TabsList>

                  <div className="bg-muted/50 p-4 border-b">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary" />
                      {LOAN_CONFIGS[loanType].description}
                    </p>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column - Inputs */}
                      <div className="space-y-6">
                        <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-secondary" />
                          Loan Details
                        </h3>

                        {/* Home Price */}
                        <div className="space-y-2">
                          <Label htmlFor="homePrice" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-secondary" />
                            Home Price
                          </Label>
                          <Input
                            id="homePrice"
                            type="number"
                            value={homePrice}
                            onChange={(e) => setHomePrice(Number(e.target.value))}
                            className="text-lg"
                          />
                        </div>

                        {/* Down Payment */}
                        <div className="space-y-2">
                          <Label htmlFor="downPayment" className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-secondary" />
                            Down Payment (%)
                          </Label>
                          <div className="flex gap-4 items-center">
                            <Input
                              id="downPayment"
                              type="number"
                              value={downPaymentPercent}
                              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                              min={LOAN_CONFIGS[loanType].minDownPayment}
                              max={50}
                              step={0.5}
                              className="flex-1"
                            />
                            <span className="text-muted-foreground whitespace-nowrap">
                              = {formatCurrency(homePrice * (downPaymentPercent / 100))}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Minimum: {LOAN_CONFIGS[loanType].minDownPayment}%
                          </p>
                        </div>

                        {/* Interest Rate */}
                        <div className="space-y-2">
                          <Label htmlFor="interestRate" className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-secondary" />
                            Interest Rate (%)
                          </Label>
                          <Input
                            id="interestRate"
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            step={0.125}
                            min={0}
                            max={15}
                          />
                          <p className="text-xs text-muted-foreground/80 italic leading-relaxed">
                            *This rate is for calculation purposes ONLY. Its availability does not guarantee it is available for you.
                          </p>
                        </div>

                        {/* Loan Term */}
                        <div className="space-y-2">
                          <Label htmlFor="loanTerm" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-secondary" />
                            Loan Term
                          </Label>
                          <Select value={loanTerm} onValueChange={setLoanTerm}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TERM_OPTIONS.map(term => (
                                <SelectItem key={term.value} value={term.value}>
                                  {term.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* VA-specific: First-time use */}
                        {loanType === "va" && (
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">VA Loan Usage</Label>
                            <Select 
                              value={isVeteranFirstTime === "disabled" ? "disabled" : isVeteranFirstTime ? "first" : "subsequent"} 
                              onValueChange={(v) => setIsVeteranFirstTime(v === "first" ? true : v === "disabled" ? "disabled" : false)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="first">First-time VA Loan</SelectItem>
                                <SelectItem value="subsequent">Subsequent VA Loan</SelectItem>
                                <SelectItem value="disabled">10% Disabled Vet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Property Tax - with options */}
                        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                          <Label className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-secondary" />
                            Annual Property Tax
                          </Label>
                          <RadioGroup 
                            value={propertyTaxType} 
                            onValueChange={(v) => setPropertyTaxType(v as "percent" | "exact")}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="percent" id="tax-percent" />
                              <Label htmlFor="tax-percent" className="font-normal cursor-pointer">% of Home Price</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="exact" id="tax-exact" />
                              <Label htmlFor="tax-exact" className="font-normal cursor-pointer">Exact Amount</Label>
                            </div>
                          </RadioGroup>
                          
                          {propertyTaxType === "percent" ? (
                            <div className="flex gap-4 items-center">
                              <Input
                                type="number"
                                value={propertyTaxPercent}
                                onChange={(e) => setPropertyTaxPercent(Number(e.target.value))}
                                step={0.1}
                                min={0}
                                max={5}
                                className="flex-1"
                              />
                              <span className="text-muted-foreground whitespace-nowrap">
                                = {formatCurrency(homePrice * (propertyTaxPercent / 100))}/year
                              </span>
                            </div>
                          ) : (
                            <Input
                              type="number"
                              value={propertyTaxExact}
                              onChange={(e) => setPropertyTaxExact(Number(e.target.value))}
                              placeholder="Annual property tax amount"
                            />
                          )}
                        </div>

                        {/* Home Insurance */}
                        <div className="space-y-2">
                          <Label htmlFor="homeInsurance" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-secondary" />
                            Annual Home Insurance
                          </Label>
                          <Input
                            id="homeInsurance"
                            type="number"
                            value={homeInsurance}
                            onChange={(e) => setHomeInsurance(Number(e.target.value))}
                          />
                          <p className="text-xs text-muted-foreground">
                            = {formatCurrency(homeInsurance / 12)}/month
                          </p>
                        </div>

                        {/* HOA */}
                        <div className="space-y-2">
                          <Label htmlFor="hoa" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-secondary" />
                            Monthly HOA Dues (if applicable)
                          </Label>
                          <Input
                            id="hoa"
                            type="number"
                            value={hoaMonthly}
                            onChange={(e) => setHoaMonthly(Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>

                        {/* Extra Payment */}
                        <div className="space-y-2 p-4 bg-secondary/10 rounded-lg">
                          <Label htmlFor="extraPayment" className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-secondary" />
                            Extra Monthly Payment (Optional)
                          </Label>
                          <Input
                            id="extraPayment"
                            type="number"
                            value={extraPayment}
                            onChange={(e) => setExtraPayment(Number(e.target.value))}
                            min={0}
                            placeholder="0"
                          />
                          <p className="text-xs text-muted-foreground">
                            Add extra principal payments to pay off your loan faster.
                          </p>
                        </div>
                      </div>

                      {/* Right Column - Results */}
                      <div className="space-y-6">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          Your Estimated Payment
                        </h3>

                        <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
                          <p className="text-sm opacity-80 mb-1">Total Monthly Payment</p>
                          <p className="font-serif text-5xl font-bold">
                            {formatCurrency(calculations.totalMonthly)}
                          </p>
                          <p className="text-sm opacity-80 mt-2">
                            P&I + Taxes + Insurance + MI{hoaMonthly > 0 ? " + HOA" : ""}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-foreground">Payment Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">Principal & Interest</span>
                              <span className="font-medium">{formatCurrencyExact(calculations.monthlyPI)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">Property Tax</span>
                              <span className="font-medium">{formatCurrencyExact(calculations.monthlyTax)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">Home Insurance</span>
                              <span className="font-medium">{formatCurrencyExact(calculations.monthlyInsurance)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">
                                {loanType === "fha" ? "Monthly MIP" : loanType === "va" ? "VA MI" : "PMI"}
                              </span>
                              <span className="font-medium">{formatCurrencyExact(calculations.monthlyMI)}</span>
                            </div>
                            {hoaMonthly > 0 && (
                              <div className="flex justify-between py-2 border-b border-border">
                                <span className="text-muted-foreground">HOA Dues</span>
                                <span className="font-medium">{formatCurrencyExact(hoaMonthly)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <h4 className="font-medium text-foreground">Loan Summary</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Home Price</span>
                              <span>{formatCurrency(calculations.homePrice)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Down Payment</span>
                              <span>{formatCurrency(calculations.downPayment)} ({downPaymentPercent}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Base Loan Amount</span>
                              <span>{formatCurrency(calculations.baseLoanAmount)}</span>
                            </div>
                            {calculations.upfrontFee > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  {loanType === "fha" ? "Upfront MIP (1.75%)" : "VA Funding Fee"}
                                </span>
                                <span>{formatCurrency(calculations.upfrontFee)}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-medium pt-2 border-t">
                              <span>Total Loan Amount</span>
                              <span>{formatCurrency(calculations.finalLoanAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan-to-Value (LTV)</span>
                              <span>{calculations.ltv.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Interest Over Life</span>
                              <span>{formatCurrency(calculations.totalInterest)}</span>
                            </div>
                          </div>
                        </div>

                        {extraPayment > 0 && (
                          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 space-y-2">
                            <h4 className="font-medium text-secondary flex items-center gap-2">
                              <TrendingDown className="h-4 w-4" />
                              Early Payoff Savings
                            </h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payoff Time</span>
                                <span>
                                  {Math.floor(calculations.actualPayoffMonths / 12)} years, {calculations.actualPayoffMonths % 12} months
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Time Saved</span>
                                <span className="text-secondary font-medium">
                                  {Math.floor(calculations.monthsSaved / 12)} years, {calculations.monthsSaved % 12} months
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Interest Saved</span>
                                <span className="text-secondary font-medium">
                                  {formatCurrency(calculations.interestSaved)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                        >
                          <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                      <Button
                        onClick={() => setShowAmortization(!showAmortization)}
                        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        {showAmortization ? "Hide" : "Show"} Amortization Schedule
                      </Button>
                    </div>

                    {showAmortization && (
                      <div className="mt-6 space-y-6">
                        <AmortizationExplanation />
                        <AmortizationTable amortization={calculations.amortization} />
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chattel Loan Calculator */}
          <TabsContent value="chattel">
            <Card className="border-0 shadow-2xl overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <div className="bg-primary p-4">
                  <h3 className="text-lg font-semibold text-primary-foreground text-center">
                    Chattel Loan Calculator
                  </h3>
                </div>

                <div className="bg-muted/50 p-4 border-b">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary" />
                    {LOAN_CONFIGS.chattel.description}
                  </p>
                </div>

                {/* Chattel Loan Requirements Notice */}
                <div className="bg-amber-50 border-b border-amber-200 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-1">Chattel Loan Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Minimum 5% down payment (15%+ required for credit scores below 600)</li>
                        <li>Maximum 25-year term (lower rates available for 20yr term)</li>
                        <li>Minimum credit score: 550</li>
                        <li>Home must be manufactured after June 15, 1976</li>
                        <li>No PMI required</li>
                        <li>Rates: 8.18% - 11.99% based on credit score, down payment, and term</li>
                        <li>Max DTI: 50% (Gold/Silver tiers)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Inputs */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-secondary" />
                        Loan Details
                      </h3>

                      {/* Home Price */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-secondary" />
                          Manufactured Home Price
                        </Label>
                        <Input
                          type="number"
                          value={chattelHomePrice}
                          onChange={(e) => setChattelHomePrice(Number(e.target.value))}
                          className="text-lg"
                        />
                      </div>

                      {/* Credit Score */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          Credit Score Range
                        </Label>
                        <Select value={chattelCreditScore} onValueChange={setChattelCreditScore}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CREDIT_SCORE_OPTIONS.map(score => (
                              <SelectItem key={score.value} value={score.value}>
                                {score.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {chattelCalculations.isRateAvailable ? (
                          <p className="text-xs text-muted-foreground">
                            Your rate: <span className="font-semibold text-secondary">{chattelCalculations.interestRate}%</span> based on credit score, down payment, and term
                          </p>
                        ) : (
                          <p className="text-xs text-red-600 font-medium">
                            This down payment is not available for your credit score. Please increase down payment to 15%+.
                          </p>
                        )}
                      </div>

                      {/* Down Payment */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-secondary" />
                          Down Payment
                        </Label>
                        <Select value={chattelDownPaymentPercent} onValueChange={setChattelDownPaymentPercent}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DOWN_PAYMENT_OPTIONS.map(dp => (
                              <SelectItem key={dp.value} value={dp.value}>
                                {dp.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-muted-foreground text-sm">
                          = {formatCurrency(chattelHomePrice * (parseInt(chattelDownPaymentPercent) / 100))}
                        </p>
                      </div>

                      {/* Loan Term */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-secondary" />
                          Loan Term (Max 25 Years)
                        </Label>
                        <Select value={chattelLoanTerm} onValueChange={setChattelLoanTerm}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CHATTEL_TERM_OPTIONS.map(term => (
                              <SelectItem key={term.value} value={term.value}>
                                {term.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Property Tax */}
                      <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-secondary" />
                          Annual Property Tax
                        </Label>
                        <RadioGroup 
                          value={chattelPropertyTaxType} 
                          onValueChange={(v) => setChattelPropertyTaxType(v as "percent" | "exact")}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="percent" id="chattel-tax-percent" />
                            <Label htmlFor="chattel-tax-percent" className="font-normal cursor-pointer">% of Home Price</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="exact" id="chattel-tax-exact" />
                            <Label htmlFor="chattel-tax-exact" className="font-normal cursor-pointer">Exact Amount</Label>
                          </div>
                        </RadioGroup>
                        
                        {chattelPropertyTaxType === "percent" ? (
                          <div className="flex gap-4 items-center">
                            <Input
                              type="number"
                              value={chattelPropertyTaxPercent}
                              onChange={(e) => setChattelPropertyTaxPercent(Number(e.target.value))}
                              step={0.1}
                              min={0}
                              max={5}
                              className="flex-1"
                            />
                            <span className="text-muted-foreground whitespace-nowrap">
                              = {formatCurrency(chattelHomePrice * (chattelPropertyTaxPercent / 100))}/year
                            </span>
                          </div>
                        ) : (
                          <Input
                            type="number"
                            value={chattelPropertyTaxExact}
                            onChange={(e) => setChattelPropertyTaxExact(Number(e.target.value))}
                            placeholder="Annual property tax amount"
                          />
                        )}
                      </div>

                      {/* Insurance */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-secondary" />
                          Annual Home Insurance
                        </Label>
                        <Input
                          type="number"
                          value={chattelInsurance}
                          onChange={(e) => setChattelInsurance(Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">
                          = {formatCurrency(chattelInsurance / 12)}/month
                        </p>
                      </div>

                      {/* Lot Space Rent */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-secondary" />
                          Monthly Lot/Space Rent
                        </Label>
                        <Input
                          type="number"
                          value={lotSpaceRent}
                          onChange={(e) => setLotSpaceRent(Number(e.target.value))}
                          placeholder="Monthly lot or space rent"
                        />
                        <p className="text-xs text-muted-foreground">
                          Monthly rent for the land/space where the manufactured home sits
                        </p>
                      </div>

                      {/* Extra Payment */}
                      <div className="space-y-2 p-4 bg-secondary/10 rounded-lg">
                        <Label className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-secondary" />
                          Extra Monthly Payment (Optional)
                        </Label>
                        <Input
                          type="number"
                          value={chattelExtraPayment}
                          onChange={(e) => setChattelExtraPayment(Number(e.target.value))}
                          min={0}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        Your Estimated Payment
                      </h3>

                      {!chattelCalculations.isRateAvailable && (
                        <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-center mb-4">
                          <p className="text-red-700 font-medium">
                            This combination is not available. Credit scores below 600 require at least 15% down payment.
                          </p>
                        </div>
                      )}
                      <div className={`rounded-xl p-6 text-center ${chattelCalculations.isRateAvailable ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'}`}>
                        <p className="text-sm opacity-80 mb-1">Total Monthly Payment</p>
                        <p className="font-serif text-5xl font-bold">
                          {chattelCalculations.isRateAvailable ? formatCurrency(chattelCalculations.totalMonthly) : 'N/A'}
                        </p>
                        <p className="text-sm opacity-80 mt-2">
                          P&I + Taxes + Insurance + Lot Rent
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Payment Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Principal & Interest</span>
                            <span className="font-medium">{formatCurrencyExact(chattelCalculations.monthlyPI)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Property Tax</span>
                            <span className="font-medium">{formatCurrencyExact(chattelCalculations.monthlyTax)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Home Insurance</span>
                            <span className="font-medium">{formatCurrencyExact(chattelCalculations.monthlyInsurance)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Lot/Space Rent</span>
                            <span className="font-medium">{formatCurrencyExact(lotSpaceRent)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border bg-green-50 px-2 -mx-2">
                            <span className="text-green-700 font-medium">PMI</span>
                            <span className="font-medium text-green-700">$0.00 (Not Required)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <h4 className="font-medium text-foreground">Loan Summary</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Home Price</span>
                            <span>{formatCurrency(chattelCalculations.homePrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Down Payment</span>
                            <span>{formatCurrency(chattelCalculations.downPayment)} ({chattelDownPaymentPercent}%)</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Loan Amount</span>
                            <span>{formatCurrency(chattelCalculations.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Interest Rate</span>
                            <span>{chattelCalculations.interestRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Interest Over Life</span>
                            <span>{formatCurrency(chattelCalculations.totalInterest)}</span>
                          </div>
                        </div>
                      </div>

                      {chattelExtraPayment > 0 && (
                        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 space-y-2">
                          <h4 className="font-medium text-secondary flex items-center gap-2">
                            <TrendingDown className="h-4 w-4" />
                            Early Payoff Savings
                          </h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payoff Time</span>
                              <span>
                                {Math.floor(chattelCalculations.actualPayoffMonths / 12)} years, {chattelCalculations.actualPayoffMonths % 12} months
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time Saved</span>
                              <span className="text-secondary font-medium">
                                {Math.floor(chattelCalculations.monthsSaved / 12)} years, {chattelCalculations.monthsSaved % 12} months
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Interest Saved</span>
                              <span className="text-secondary font-medium">
                                {formatCurrency(chattelCalculations.interestSaved)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                      >
                        <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <Button
                      onClick={() => setShowChattelAmortization(!showChattelAmortization)}
                      className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      {showChattelAmortization ? "Hide" : "Show"} Amortization Schedule
                    </Button>
                  </div>

                  {showChattelAmortization && (
                    <div className="mt-6 space-y-6">
                      <AmortizationExplanation />
                      <AmortizationTable amortization={chattelCalculations.amortization} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function AmortizationTable({ amortization }: { amortization: AmortizationRow[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Month</TableHead>
            <TableHead className="text-right">Payment</TableHead>
            <TableHead className="text-right">Principal</TableHead>
            <TableHead className="text-right">Interest</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">Total Interest</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {amortization.filter((_, i) => 
            i < 12 || i === amortization.length - 1 || (i + 1) % 12 === 0
          ).map((row) => (
            <TableRow key={row.month}>
              <TableCell className="text-center font-medium">
                {row.month}
                {row.month % 12 === 0 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    (Year {row.month / 12})
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">{formatCurrencyExact(row.payment)}</TableCell>
              <TableCell className="text-right text-secondary">{formatCurrencyExact(row.principal)}</TableCell>
              <TableCell className="text-right">{formatCurrencyExact(row.interest)}</TableCell>
              <TableCell className="text-right">{formatCurrency(row.balance)}</TableCell>
              <TableCell className="text-right">{formatCurrency(row.totalInterest)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Showing first year monthly, then yearly summaries. Full schedule available upon request.
      </p>
    </div>
  )
}

function AmortizationExplanation() {
  return (
    <Accordion type="single" collapsible className="bg-muted/30 rounded-lg">
      <AccordionItem value="explanation" className="border-none">
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="flex items-center gap-2 font-serif text-lg">
            <Info className="h-5 w-5 text-secondary" />
            Understanding Your Amortization Schedule
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">What is an Amortization Schedule?</strong><br />
              An amortization schedule shows how each mortgage payment is split between paying down your loan (principal) 
              and paying interest to the lender. Over time, more of your payment goes toward principal and less toward interest.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg">
                <strong className="text-foreground block mb-2">Early Payments</strong>
                Most of your payment goes toward interest. This is why paying extra early in your loan saves the most money.
              </div>
              <div className="bg-background p-4 rounded-lg">
                <strong className="text-foreground block mb-2">Later Payments</strong>
                Most of your payment goes toward principal. Your equity builds faster as you pay down the balance.
              </div>
            </div>

            <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
              <strong className="text-secondary block mb-2">Pro Tip: Pay Extra When You Can</strong>
              Even small extra payments toward principal can save thousands in interest and help you pay off your mortgage years early.
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
