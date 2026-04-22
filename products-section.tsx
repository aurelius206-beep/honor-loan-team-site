"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VineDivider, VineBorder, VineCorner } from "@/components/vine-decoration"
import { FloatingShield } from "@/components/shield-logo"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Home, 
  Building2, 
  RefreshCw, 
  Shield, 
  Landmark, 
  Banknote,
  Building,
  Key,
  TreeDeciduous,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Percent,
  Clock,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Gift,
  Heart,
  Hammer,
  HardHat,
  CreditCard,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LoanProduct {
  id: string
  name: string
  shortName: string
  tagline: string
  icon: React.ElementType
  color: string
  highlights: string[]
  eligibility: {
    label: string
    value: string
    icon: React.ElementType
  }[]
  keyFeatures: string[]
  idealFor: string[]
  restrictions?: string[]
  propertyTypes: string[]
}

const loanProducts: LoanProduct[] = [
  {
    id: "conventional",
    name: "Conventional Loans",
    shortName: "Conventional",
    tagline: "Flexible financing with competitive rates for qualified borrowers",
    icon: Home,
    color: "bg-blue-500",
    highlights: [
      "Down payments as low as 3%",
      "PMI removable at 80% LTV",
      "Primary, second home & investment",
      "Home Ready & Home Possible programs"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "No minimum (lender overlays vary)", icon: CheckCircle2 },
      { label: "Down Payment", value: "3% - 20%+", icon: DollarSign },
      { label: "Max DTI", value: "45% - 50%", icon: Percent },
      { label: "Max Loan Amount", value: "Based on County Loan Limit", icon: Banknote },
    ],
    keyFeatures: [
      "Fixed-rate terms: 10, 15, 20, 25, 30 years",
      "ARM options: 5/1, 7/1, 10/1",
      "No upfront mortgage insurance premium",
      "PMI cancellation available once you reach 20% equity",
      "Gift funds allowed for entire down payment with 20%+ down",
      "Non-occupant co-borrowers permitted"
    ],
    idealFor: [
      "Borrowers with good credit (680+)",
      "Those who can put 10-20% down",
      "Investment property buyers",
      "Second home purchasers",
      "Borrowers who want to avoid permanent MI"
    ],
    restrictions: [
      "Higher credit standards than government loans",
      "PMI required below 80% LTV",
      "Stricter DTI requirements than FHA"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "fha",
    name: "FHA Loans",
    shortName: "FHA",
    tagline: "Government-backed loans with flexible credit requirements",
    icon: Landmark,
    color: "bg-green-500",
    highlights: [
      "3.5% down with 580+ credit",
      "Credit scores down to 500",
      "Manual underwriting available",
      "Gift funds for full down payment"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "500 (580 for 3.5% down)", icon: CheckCircle2 },
      { label: "Down Payment", value: "3.5% - 10%", icon: DollarSign },
      { label: "Max DTI", value: "43% (up to 56.99% with AUS)", icon: Percent },
      { label: "Upfront MIP", value: "1.75% (can be financed)", icon: Banknote },
    ],
    keyFeatures: [
      "Lower credit score requirements than conventional",
      "Seller can contribute up to 6% toward closing costs",
      "Non-occupant co-borrowers allowed",
      "Streamline refinance available for existing FHA loans",
      "Down payment assistance programs compatible",
      "Manual underwriting option for complex scenarios"
    ],
    idealFor: [
      "First-time homebuyers",
      "Borrowers rebuilding credit",
      "Those with limited savings for down payment",
      "Buyers using gift funds",
      "Borrowers with recent credit events (2+ years BK/FC)"
    ],
    restrictions: [
      "Monthly MIP for life of loan (if less than 10% down)",
      "Primary residence only",
      "Minimum property standards required",
      "1-4 unit properties only"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo (FHA approved)", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "va",
    name: "VA Loans",
    shortName: "VA",
    tagline: "Zero down payment for those who served",
    icon: Shield,
    color: "bg-amber-600",
    highlights: [
      "0% down payment required",
      "No monthly mortgage insurance",
      "No minimum credit score",
      "Residual income considered"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "No minimum (residual income based)", icon: CheckCircle2 },
      { label: "Down Payment", value: "0%", icon: DollarSign },
      { label: "Max DTI", value: "No maximum (residual income based)", icon: Percent },
      { label: "Funding Fee", value: "1.25% - 3.3% (exempt if 10%+ disabled)", icon: Banknote },
    ],
    keyFeatures: [
      "No down payment required (100% financing)",
      "No monthly mortgage insurance ever",
      "Seller can pay up to 4% of closing costs",
      "VA appraisal protects buyer from overpaying",
      "IRRRL (Streamline) refinance available",
      "Residual income calculation helps more borrowers qualify",
      "Surviving spouses may be eligible"
    ],
    idealFor: [
      "Active duty service members",
      "Veterans with honorable discharge",
      "National Guard & Reserve members (6+ years or activated)",
      "Surviving spouses of veterans",
      "Those who want to maximize purchasing power"
    ],
    restrictions: [
      "Must have valid Certificate of Eligibility (COE)",
      "Primary residence only (with some exceptions)",
      "Funding fee applies unless exempt",
      "Property must meet VA minimum property requirements"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo (VA approved)", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "usda",
    name: "USDA Loans",
    shortName: "USDA",
    tagline: "100% financing for rural and suburban areas",
    icon: TreeDeciduous,
    color: "bg-emerald-600",
    highlights: [
      "0% down payment required",
      "Low guarantee fees",
      "Income limits apply",
      "Geographic eligibility required"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "580 GUS / 620 Manual", icon: CheckCircle2 },
      { label: "Down Payment", value: "0%", icon: DollarSign },
      { label: "Max DTI", value: "29% front / 41% back (waivers available)", icon: Percent },
      { label: "Guarantee Fee", value: "1% upfront + 0.35% annual", icon: Banknote },
    ],
    keyFeatures: [
      "No down payment required (100% financing)",
      "Lower guarantee fees than FHA MIP",
      "Closing costs can be financed up to appraised value",
      "Seller can contribute toward closing costs",
      "GUS automated underwriting system",
      "Compatible with down payment assistance"
    ],
    idealFor: [
      "Moderate-income buyers in eligible rural/suburban areas",
      "First-time and repeat homebuyers",
      "Those who want 0% down without military service",
      "Buyers in smaller towns and communities"
    ],
    restrictions: [
      "Property must be in USDA-eligible area",
      "Household income must be below 115% of area median",
      "Primary residence only",
      "No income-producing farms or excessive acreage",
      "Minimum loan amount $75,000"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "Multi-wide Manufactured"]
  },
  {
    id: "jumbo",
    name: "Jumbo Loans",
    shortName: "Jumbo",
    tagline: "Financing beyond conforming limits for high-value properties",
    icon: Building2,
    color: "bg-purple-600",
    highlights: [
      "Loan amounts up to $3M+",
      "Competitive rates available",
      "Multiple property types",
      "Flexible income documentation"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "680 - 720+", icon: CheckCircle2 },
      { label: "Down Payment", value: "10% - 20%+", icon: DollarSign },
      { label: "Max DTI", value: "43% typical", icon: Percent },
      { label: "Reserves", value: "6-12 months typically required", icon: Clock },
    ],
    keyFeatures: [
      "Loan amounts exceeding conforming limits",
      "Fixed and adjustable rate options",
      "Interest-only options available",
      "Primary, second home, and investment properties",
      "Asset-based qualification available",
      "Bank statement programs for self-employed"
    ],
    idealFor: [
      "Buyers of high-value properties",
      "Purchasers in high-cost areas",
      "High-income professionals",
      "Self-employed borrowers with complex income",
      "Real estate investors"
    ],
    restrictions: [
      "Higher credit score requirements",
      "Larger down payment typically required",
      "More extensive documentation",
      "Higher reserve requirements"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units"]
  },
  {
    id: "dscr",
    name: "DSCR Investor Loans",
    shortName: "DSCR",
    tagline: "Qualify based on property cash flow, not personal income",
    icon: Building,
    color: "bg-indigo-600",
    highlights: [
      "No personal income verification",
      "Rental income qualifies the loan",
      "Close in LLC or personal name",
      "Foreign nationals eligible"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "600 (620+ for best rates)", icon: CheckCircle2 },
      { label: "Down Payment", value: "15% - 40%", icon: DollarSign },
      { label: "DSCR Ratio", value: "0.75 - 1.0+ (No ratio available)", icon: Percent },
      { label: "Max Loan Amount", value: "$3,000,000", icon: Banknote },
    ],
    keyFeatures: [
      "No tax returns or pay stubs required",
      "Qualify based on property rental income",
      "Available for LLCs and entities",
      "Short-term rental (Airbnb) eligible",
      "Interest-only options available",
      "Cash-out refinance up to 75% LTV",
      "Foreign national and ITIN borrowers eligible"
    ],
    idealFor: [
      "Real estate investors",
      "Self-employed with complex tax returns",
      "Portfolio builders",
      "Short-term rental operators",
      "Foreign investors",
      "Those who want to keep personal finances separate"
    ],
    restrictions: [
      "Investment property only (no primary residence)",
      "First-time homebuyers ineligible",
      "Higher interest rates than conventional",
      "Prepayment penalties may apply",
      "Not available in AK, ND, SD"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "2-4 Units", "Condotel", "Manufactured"]
  },
  {
    id: "bank-statement",
    name: "Bank Statement Loans",
    shortName: "Bank Statement",
    tagline: "Alternative documentation for self-employed borrowers",
    icon: FileText,
    color: "bg-teal-600",
    highlights: [
      "12 or 24 month statements",
      "No tax returns required",
      "Self-employed friendly",
      "Up to $4M loan amount"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "600 (660+ preferred)", icon: CheckCircle2 },
      { label: "Down Payment", value: "10% - 35%", icon: DollarSign },
      { label: "Max DTI", value: "50% (55% with exceptions)", icon: Percent },
      { label: "Self-Employment", value: "1-2 years minimum", icon: Clock },
    ],
    keyFeatures: [
      "Use 12 or 24 months of bank statements as income",
      "Personal or business bank statements",
      "No tax returns or W-2s required",
      "Expense factor applied to business deposits",
      "1099 income documentation option",
      "P&L statements accepted with bank statement support",
      "Asset depletion qualification available"
    ],
    idealFor: [
      "Self-employed business owners",
      "Freelancers and consultants",
      "Those with significant write-offs",
      "Commission-based earners",
      "Gig economy workers",
      "Business owners with variable income"
    ],
    restrictions: [
      "Higher rates than full documentation loans",
      "Larger down payment often required",
      "Self-employment must be verified",
      "Not available in all states"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units"]
  },
  {
    id: "first-time",
    name: "First-Time Buyer Programs",
    shortName: "First-Time",
    tagline: "Special programs to help you achieve homeownership",
    icon: Key,
    color: "bg-rose-500",
    highlights: [
      "Down payment assistance available",
      "Reduced MI options",
      "Homebuyer education support",
      "Income limit programs"
    ],
    eligibility: [
      { label: "First-Time Buyer", value: "No ownership in past 3 years", icon: CheckCircle2 },
      { label: "Down Payment", value: "As low as 0-3%", icon: DollarSign },
      { label: "Income Limits", value: "80-115% AMI (varies by program)", icon: Percent },
      { label: "Education", value: "Homebuyer course often required", icon: Users },
    ],
    keyFeatures: [
      "Fannie Mae HomeReady: 3% down, reduced MI",
      "Freddie Mac Home Possible: 3% down, income limits",
      "Down payment assistance grants and loans",
      "State and local housing agency programs",
      "Reduced mortgage insurance premiums",
      "Non-borrower household income can help qualify",
      "Homebuyer education support"
    ],
    idealFor: [
      "First-time homebuyers",
      "Moderate-income buyers",
      "Those needing down payment help",
      "Buyers in targeted areas",
      "Multi-generational households"
    ],
    restrictions: [
      "Income limits apply for most programs",
      "Property location may be restricted",
      "Homebuyer education typically required",
      "Primary residence only"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units"]
  },
  {
    id: "refinance",
    name: "Refinance Options",
    shortName: "Refinance",
    tagline: "Lower your rate or access your equity",
    icon: RefreshCw,
    color: "bg-cyan-600",
    highlights: [
      "Rate & Term refinance",
      "Cash-out up to 80-90% LTV",
      "Streamline options (FHA/VA)",
      "Debt consolidation"
    ],
    eligibility: [
      { label: "Existing Loan", value: "Any loan type", icon: CheckCircle2 },
      { label: "Cash-Out LTV", value: "Up to 80-90%", icon: DollarSign },
      { label: "Seasoning", value: "6-12 months typical", icon: Clock },
      { label: "Credit Score", value: "Varies by program", icon: Percent },
    ],
    keyFeatures: [
      "Rate/Term: Lower rate or change loan term",
      "Cash-Out: Access equity for any purpose",
      "FHA Streamline: No appraisal, minimal docs",
      "VA IRRRL: 0.5% funding fee, no appraisal",
      "Consolidate high-interest debt",
      "Remove PMI with conventional refi",
      "Convert ARM to fixed rate"
    ],
    idealFor: [
      "Homeowners with higher interest rates",
      "Those wanting to tap home equity",
      "FHA borrowers seeking lower payments",
      "VA borrowers with rate reduction opportunity",
      "Homeowners wanting to remove PMI",
      "Those consolidating debt"
    ],
    restrictions: [
      "Cash-out requires equity in home",
      "Streamline programs require existing gov. loan",
      "Seasoning requirements may apply",
      "Net tangible benefit required for gov. loans"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "aurora-dpa",
    name: "Aurora DPA",
    shortName: "Aurora",
    tagline: "FHA Down Payment Assistance with flexible options",
    icon: Gift,
    color: "bg-pink-500",
    highlights: [
      "3.5% or 5% assistance options",
      "Repayable or Forgivable 2nd lien",
      "No income limits for repayable",
      "Manual underwriting allowed"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "600", icon: CheckCircle2 },
      { label: "DPA Amount", value: "3.5% or 5%", icon: DollarSign },
      { label: "Max DTI", value: "No overlays (per AUS)", icon: Percent },
      { label: "First-Time Buyer", value: "Not required", icon: Users },
    ],
    keyFeatures: [
      "Repayable 2nd: 10-year term, rate 2% higher than 1st mortgage",
      "Forgivable 2nd: 30-year term, 0% interest, forgiven after 36 on-time payments",
      "5% option includes 1.5% toward closing costs",
      "Gift funds allowed for remaining down payment & closing",
      "Non-occupant co-borrowers permitted",
      "DACA borrowers eligible",
      "Doublewide manufactured homes allowed (620 min FICO)",
      "Seller contributions up to 6%"
    ],
    idealFor: [
      "First-time or repeat homebuyers needing down payment help",
      "Borrowers with credit scores 600+",
      "Those who prefer forgivable assistance",
      "Buyers with limited savings",
      "DACA recipients"
    ],
    restrictions: [
      "FHA loans only",
      "Forgivable option has income limits (160% AMI)",
      "No subordination within first 36 months",
      "Loan amounts: $55,000 - County limit"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units", "Manufactured (Doublewide)"]
  },
  {
    id: "boost-dpa",
    name: "Boost DPA",
    shortName: "Boost",
    tagline: "FHA & USDA Down Payment Assistance nationwide",
    icon: Heart,
    color: "bg-red-500",
    highlights: [
      "FHA & USDA eligible",
      "3.5% or 5% repayable options",
      "Forgivable after 60 payments",
      "No income limits for FHA"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "640", icon: CheckCircle2 },
      { label: "DPA Amount", value: "3.5% or 5% (FHA)", icon: DollarSign },
      { label: "Max DTI", value: "Per AUS (no overlays)", icon: Percent },
      { label: "Homebuyer Education", value: "Required", icon: Users },
    ],
    keyFeatures: [
      "Repayable 2nd: 15-year term, rate 2% higher than 1st lien",
      "Forgivable 2nd: 30-year term, 0% rate, forgiven after 60 on-time payments",
      "LPC (Lender Paid Compensation) available",
      "2/1 and 1/0 buydowns available",
      "No minimum LTV or maximum CLTV",
      "Manual underwriting allowed",
      "Gift funds allowed for down payment & closing costs",
      "Non-occupant co-borrowers allowed (FHA)"
    ],
    idealFor: [
      "FHA or USDA borrowers needing assistance",
      "Borrowers with 640+ credit scores",
      "Those who can complete homebuyer education",
      "Buyers wanting forgivable assistance option"
    ],
    restrictions: [
      "Washington state not eligible",
      "Min $5,000 second lien in AK & SC",
      "Max 8% rate on 2nd lien in Kentucky",
      "5% option only for FHA conforming limits"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2 Units (FHA only)"]
  },
  {
    id: "chenoa-dpa",
    name: "Chenoa Fund DPA",
    shortName: "Chenoa",
    tagline: "FHA Down Payment Assistance with repayable or forgivable options",
    icon: Sparkles,
    color: "bg-violet-500",
    highlights: [
      "3.5% or 5% assistance",
      "Forgivable after 36 payments",
      "Min 600 credit score",
      "Available in most states"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "600 (AUS Approval)", icon: CheckCircle2 },
      { label: "DPA Amount", value: "3.5% or 5%", icon: DollarSign },
      { label: "Max DTI", value: "Per AUS findings", icon: Percent },
      { label: "Homebuyer Education", value: "Required for 600-639 FICO", icon: Users },
    ],
    keyFeatures: [
      "Repayable 2nd: 10-year term, rate 1% higher than 1st mortgage",
      "Forgivable 2nd: 30-year term, 0% interest, forgiven after 36 on-time payments",
      "Non-occupant co-borrowers permitted (except manufactured homes)",
      "Doublewide manufactured homes eligible",
      "2-unit properties allowed (primary residence)",
      "Impounds/escrows required on first mortgage",
      "Seller contributions allowed per FHA guidelines"
    ],
    idealFor: [
      "First-time or repeat homebuyers",
      "Borrowers with credit scores 600+",
      "Those preferring forgivable assistance",
      "Buyers with limited down payment funds",
      "FHA-eligible borrowers"
    ],
    restrictions: [
      "FHA loans only",
      "Not available in New York",
      "5% DPA forgivable not available for FHA High Balance",
      "Manual underwriting ineligible",
      "No construction-to-perm or proposed construction"
    ],
    propertyTypes: ["SFR", "2 Units", "Townhome", "Condo (FHA approved)", "PUD", "Manufactured (Doublewide)"]
  },
  {
    id: "otc-construction",
    name: "FHA/VA One-Time Close",
    shortName: "OTC Construction",
    tagline: "Build your dream home with one closing - construction + permanent financing",
    icon: HardHat,
    color: "bg-orange-600",
    highlights: [
      "Single close for construction & permanent",
      "FHA 96.5% LTV / VA 100% LTV",
      "No requalifying after construction",
      "Site built, manufactured, modular"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "650 (AUS Approval)", icon: CheckCircle2 },
      { label: "Down Payment", value: "3.5% FHA / 0% VA", icon: DollarSign },
      { label: "Construction Term", value: "12 months max", icon: Clock },
      { label: "Property Types", value: "Site built, manufactured, modular", icon: Home },
    ],
    keyFeatures: [
      "One loan, one closing - construction and permanent combined",
      "No payments during construction (interest accrued)",
      "Up to 5 draws for site-built, 3 for manufactured",
      "Fixed rate 15 or 30-year after construction",
      "Borrower does not return to close after construction complete",
      "Float down option available within 30 days of modification",
      "Barndominiums eligible (with concrete slab, no steel exterior)"
    ],
    idealFor: [
      "Buyers wanting to build custom homes",
      "Veterans building new construction",
      "Those purchasing land and building",
      "Buyers wanting manufactured/modular new construction",
      "Borrowers who want rate certainty during build"
    ],
    restrictions: [
      "Fixed price contracts only (no cost-plus)",
      "Builder must be approved and licensed",
      "Homes must be manufactured after June 15, 1976",
      "No log homes, bamboo, metal, or container homes",
      "Borrower cannot do any construction work"
    ],
    propertyTypes: ["Site Built", "Manufactured", "Modular", "Barndominium (restrictions apply)"]
  },
  {
    id: "fha-203k",
    name: "FHA 203(k) Renovation",
    shortName: "203(k)",
    tagline: "Finance your home purchase and renovations in one loan",
    icon: Hammer,
    color: "bg-yellow-600",
    highlights: [
      "Up to $75K repairs (Limited)",
      "Full 203(k) for major renovations",
      "3.5% down payment",
      "Based on after-improved value"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "580+ (AUS Approval)", icon: CheckCircle2 },
      { label: "Down Payment", value: "3.5%", icon: DollarSign },
      { label: "Repair Limit", value: "$75,000 (Limited) / No max (Full)", icon: Banknote },
      { label: "LTV", value: "Up to 110% of after-improved value", icon: Percent },
    ],
    keyFeatures: [
      "Limited 203(k): Up to $75,000 in repairs, 6-month timeline",
      "Full 203(k): Major structural work, up to 6 months with extensions",
      "Finance repairs based on after-improved appraised value",
      "10-15% contingency reserve included",
      "Up to 6 months PITI escrowed if home vacated during construction",
      "Existing structures only (no new builds)",
      "Accessory Dwelling Units (ADUs) eligible"
    ],
    idealFor: [
      "Buyers of fixer-uppers",
      "Homeowners wanting to renovate existing home",
      "Those who found a great location but home needs work",
      "Buyers wanting to add accessibility features",
      "Investors purchasing HUD homes"
    ],
    restrictions: [
      "Primary residence only",
      "Manual underwriting not allowed",
      "Contractor must be approved",
      "Work must start within 30 days of closing",
      "1-4 units only"
    ],
    propertyTypes: ["SFR", "2-4 Units", "Manufactured", "Condo", "Existing ADU"]
  },
  {
    id: "homestyle",
    name: "HomeStyle Renovation",
    shortName: "HomeStyle",
    tagline: "Conventional renovation loan for any property type",
    icon: Hammer,
    color: "bg-lime-600",
    highlights: [
      "Primary, 2nd home, investment",
      "Up to 97% LTV primary",
      "No repair dollar limit",
      "Luxury improvements allowed"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "650", icon: CheckCircle2 },
      { label: "Down Payment", value: "3% primary / 10% 2nd / 15% investment", icon: DollarSign },
      { label: "Max LTV", value: "97% primary / 90% 2nd / 85% invest", icon: Percent },
      { label: "Property Types", value: "1-4 units, investment eligible", icon: Building },
    ],
    keyFeatures: [
      "Finance virtually any renovation including luxury improvements",
      "Primary residence, second home, and investment properties",
      "10% contingency reserve required",
      "3-5 draws based on project cost",
      "Based on after-improved appraised value",
      "Can combine with DPA programs (not SmartBuy)",
      "Pool, outdoor kitchen, landscaping all eligible"
    ],
    idealFor: [
      "Buyers wanting conventional financing for renovations",
      "Investment property buyers needing rehab funds",
      "Second home purchasers wanting updates",
      "Borrowers wanting luxury improvements",
      "Those who want to avoid FHA MIP"
    ],
    restrictions: [
      "DPA (SmartBuy) not allowed",
      "AUS Approve/Eligible required (no manual UW)",
      "Contractor must be approved",
      "Transferred appraisals not allowed"
    ],
    propertyTypes: ["SFR", "2-4 Units", "Townhome", "Condo", "PUD", "Second Home", "Investment"]
  },
  {
    id: "heloc",
    name: "HELOC (Home Equity Line)",
    shortName: "HELOC",
    tagline: "Access your home equity with a flexible line of credit",
    icon: CreditCard,
    color: "bg-sky-600",
    highlights: [
      "5-day funding process",
      "No appraisal under $400K",
      "Payoff debt at closing",
      "Primary & investment properties"
    ],
    eligibility: [
      { label: "Property Types", value: "Primary & Investment", icon: Home },
      { label: "Credit Pull", value: "Soft until terms selected", icon: CheckCircle2 },
      { label: "Income Verification", value: "Automated via payroll/bank", icon: FileText },
      { label: "Origination Fee", value: "1.99% - 2.99% (financed)", icon: DollarSign },
    ],
    keyFeatures: [
      "No appraisal required for loans under $400,000",
      "5-day funding from application to close",
      "Pay off personal loans, auto loans, mortgages at closing",
      "Can be used as bridge loan on properties listed for sale",
      "Automatic recast with 10%+ one-time payment",
      "No prepayment penalties",
      "eNotary process - sign via video conference in ~10 minutes",
      "First lien available on paid-off properties"
    ],
    idealFor: [
      "Homeowners needing quick access to equity",
      "Those consolidating high-interest debt",
      "Bridge loan for selling/buying homes",
      "Home improvement projects",
      "Investment property owners",
      "Self-employed with automated income verification"
    ],
    restrictions: [
      "Property cannot be in FEMA disaster area",
      "Experian credit report used",
      "Solar liens must be disclosed",
      "Some states require wet ink signature"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "Investment Property"]
  },
  {
    id: "fha-streamline",
    name: "FHA Streamline Refinance",
    shortName: "FHA Streamline",
    tagline: "Simplified refinance for existing FHA loan holders",
    icon: RefreshCw,
    color: "bg-emerald-500",
    highlights: [
      "No appraisal required",
      "Minimal documentation",
      "No income verification",
      "Net tangible benefit required"
    ],
    eligibility: [
      { label: "Existing Loan", value: "Must have current FHA loan", icon: CheckCircle2 },
      { label: "Payment History", value: "6 months on-time payments", icon: Clock },
      { label: "Seasoning", value: "210 days from closing", icon: Clock },
      { label: "Net Benefit", value: "5%+ reduction in P&I + MIP", icon: DollarSign },
    ],
    keyFeatures: [
      "No appraisal needed in most cases",
      "No income or employment verification required",
      "No credit score requirement (non-credit qualifying)",
      "Reduced upfront MIP (0.01% for timely payments)",
      "Can include closing costs in new loan",
      "Typically faster closing than full refinance",
      "Available for all property types with existing FHA loan"
    ],
    idealFor: [
      "FHA borrowers with higher interest rates",
      "Those wanting to lower monthly payments quickly",
      "Borrowers who may not qualify for traditional refi",
      "Homeowners who want minimal paperwork",
      "Those with reduced income since original loan"
    ],
    restrictions: [
      "Must have existing FHA loan",
      "No cash-out (max $500 to borrower)",
      "Must show net tangible benefit",
      "Cannot add co-borrower (exceptions apply)",
      "6 payments must be made on existing loan"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "bbys",
    name: "Buy Before You Sell+",
    shortName: "BBYS+",
    tagline: "Buy your new home before selling - unlock equity with no contingencies",
    icon: Key,
    color: "bg-indigo-600",
    highlights: [
      "Unlock up to 70% CLTV equity",
      "Interest-free down payment loan",
      "No home sale contingency",
      "180-day home sale guarantee"
    ],
    eligibility: [
      { label: "Equity Access", value: "Up to 70% CLTV", icon: DollarSign },
      { label: "Program Fee", value: "2.4% of departing home sale price", icon: Percent },
      { label: "Timeline", value: "5-9 business days approval", icon: Clock },
      { label: "Home Sale Guarantee", value: "180 days", icon: CheckCircle2 },
    ],
    keyFeatures: [
      "Access equity in your current home for down payment on new home",
      "Interest-free down payment loan provided at closing",
      "Make strong, non-contingent offers on your dream home",
      "List departing home within 30 days after new home purchase",
      "If home doesn't sell in 180 days, Calque purchases it directly",
      "100% of net sale proceeds returned if sold on open market",
      "Works with Conventional, Flex Non-QM, and Jumbo loans"
    ],
    idealFor: [
      "Homeowners needing equity for down payment",
      "Buyers in competitive markets who can't wait to sell first",
      "Those wanting to avoid bridge loans",
      "Families who need to move before current home sells",
      "Buyers wanting to maximize departing home value"
    ],
    restrictions: [
      "Not available in HI, AK, DE, FL, LA, PA, NY",
      "Cook County, IL has specific restrictions",
      "Primary residence only for departing home",
      "Must list departing home within 30 days of new home closing"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD"]
  },
  {
    id: "byoc",
    name: "Bring Your Own Cash+",
    shortName: "BYOC+",
    tagline: "Buy before you sell with your own funds - faster, lower fees",
    icon: Banknote,
    color: "bg-teal-600",
    highlights: [
      "Lower fees than BBYS+",
      "1-2 day approval turnaround",
      "Use your own funds",
      "Removes departing mortgage from DTI"
    ],
    eligibility: [
      { label: "Admin Fee", value: "$2,000 + 1% of backup offer", icon: DollarSign },
      { label: "Inspection Fee", value: "$500", icon: Percent },
      { label: "Timeline", value: "1-2 business days approval", icon: Clock },
      { label: "Funding", value: "Borrower's own funds", icon: Banknote },
    ],
    keyFeatures: [
      "Faster approval than BBYS+ (1-2 days vs 5-9 days)",
      "Lower program fees for financially prepared buyers",
      "Guaranteed Backup Offer removes departing mortgage from DTI",
      "Make non-contingent offers without equity unlock",
      "Sell departing residence at full market value without rush",
      "Fee deducted from sale proceeds - no upfront payment",
      "Works with Conventional, Flex Non-QM, and Jumbo loans"
    ],
    idealFor: [
      "Financially prepared buyers with funds for down payment",
      "Those who want faster approval process",
      "Buyers wanting lower fees than BBYS+",
      "Clients who don't need to unlock equity",
      "Those wanting to eliminate home sale contingency"
    ],
    restrictions: [
      "Must have own funds for down payment/closing",
      "Primary residence for departing home",
      "Subject to Calque eligibility guidelines",
      "$1,500 LO incentive not available (BBYS+ only)"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD"]
  },
  {
    id: "va-irrrl",
    name: "VA IRRRL (Streamline)",
    shortName: "VA IRRRL",
    tagline: "Reduce your VA loan rate with minimal documentation",
    icon: RefreshCw,
    color: "bg-amber-600",
    highlights: [
      "No appraisal required",
      "No income verification",
      "No credit score requirement",
      "Lower rate/payment guaranteed"
    ],
    eligibility: [
      { label: "Existing Loan", value: "Must have current VA loan", icon: Shield },
      { label: "Payment History", value: "0x30x12 required", icon: Clock },
      { label: "Seasoning", value: "6 payments + 210 days from closing", icon: Clock },
      { label: "Cash Back", value: "Max $500", icon: DollarSign },
    ],
    keyFeatures: [
      "No appraisal, income docs, or credit report required",
      "Must result in lower interest rate (exception: ARM to fixed)",
      "Can add new borrowers (original must stay on loan)",
      "Funding fee: 0.5% (exempt if 10%+ disabled)",
      "Surviving spouse of veteran may be eligible",
      "Can finance closing costs and up to 2 discount points",
      "Primary, second home, AND investment properties eligible"
    ],
    idealFor: [
      "VA borrowers with higher interest rates",
      "Veterans wanting quick, easy refinance",
      "Those who may not qualify for traditional refi",
      "Borrowers wanting minimal paperwork",
      "Veterans with reduced income since original loan"
    ],
    restrictions: [
      "Must have existing VA-guaranteed loan",
      "Net tangible benefit required (5%+ P&I reduction)",
      "No cash-out beyond $500",
      "Cannot refinance VA loan with Texas 50(a)(6) equity",
      "6 payments must be made on existing loan"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2-4 Units", "Manufactured"]
  },
  {
    id: "temp-buydown",
    name: "Temporary Buydown",
    shortName: "2-1 / 1-0 Buydown",
    tagline: "Lower payments for the first 1-2 years - seller paid",
    icon: DollarSign,
    color: "bg-cyan-600",
    highlights: [
      "2-1 or 1-0 buydown options",
      "Seller pays buydown cost",
      "FHA, VA, USDA, Conventional",
      "Primary & second homes"
    ],
    eligibility: [
      { label: "Loan Purpose", value: "Purchase only", icon: Home },
      { label: "Funded By", value: "100% seller contribution", icon: DollarSign },
      { label: "Qualifying Rate", value: "Note rate (not buydown rate)", icon: Percent },
      { label: "Terms", value: "15, 20, or 30-year fixed", icon: Clock },
    ],
    keyFeatures: [
      "2-1 Buydown: Rate reduced 2% year 1, 1% year 2, full rate year 3+",
      "1-0 Buydown: Rate reduced 1% year 1, full rate year 2+",
      "Seller pays 100% of buydown cost as contribution",
      "Borrower qualifies at full note rate",
      "Works with FHA, VA, USDA, Fannie Mae, Freddie Mac",
      "HomeReady and Home Possible eligible",
      "Undisbursed funds apply to principal if paid off early"
    ],
    idealFor: [
      "Buyers expecting income to increase",
      "Those wanting lower initial payments",
      "Buyers in markets with motivated sellers",
      "First-time homebuyers easing into ownership",
      "Buyers who want to maximize seller concessions"
    ],
    restrictions: [
      "Purchase transactions only (no refinance)",
      "Investment properties not eligible",
      "Lender-funded buydowns not permitted",
      "Borrower cannot pay buydown funds",
      "Jumbo loans not eligible"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "2 Units (Primary)", "Manufactured"]
  },
  {
    id: "alt-doc",
    name: "Non-QM Alt Doc",
    shortName: "Alt Doc",
    tagline: "Alternative documentation for self-employed and unique income situations",
    icon: FileText,
    color: "bg-purple-600",
    highlights: [
      "Bank statement income",
      "12-month P&L acceptable",
      "Up to 90% LTV",
      "Loan amounts to $2M"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "660", icon: CheckCircle2 },
      { label: "Max LTV", value: "Up to 90% (FICO/loan amt based)", icon: Percent },
      { label: "Max DTI", value: "50% (55% with compensating factors)", icon: Percent },
      { label: "Reserves", value: "3-9 months based on loan amount", icon: Banknote },
    ],
    keyFeatures: [
      "12 or 24-month bank statement income qualification",
      "12-month P&L from CPA acceptable",
      "Primary, second home, and investment properties",
      "Cash-out allowed (up to $750K above 60% LTV)",
      "Foreign nationals eligible with additional requirements",
      "Asset utilization income accepted",
      "Non-warrantable condos eligible up to 80% LTV"
    ],
    idealFor: [
      "Self-employed borrowers with complex income",
      "Business owners who write off expenses",
      "Those with non-traditional income sources",
      "Investors wanting flexible documentation",
      "Borrowers who don't fit agency guidelines"
    ],
    restrictions: [
      "Manual underwriting required",
      "Clean housing history 36-48 months required",
      "No recent bankruptcy or foreclosure",
      "Rural properties limited to 75% LTV",
      "First-time buyers have payment shock limits"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "Non-Warrantable Condo", "PUD", "2-4 Units", "Investment"]
  },
  {
    id: "legacy-builder-dpa",
    name: "Legacy Builder FHA DPA",
    shortName: "Legacy Builder",
    tagline: "FHA down payment assistance with forgivable and repayable options",
    icon: Gift,
    color: "bg-rose-500",
    highlights: [
      "3.5% or 5% assistance",
      "Forgivable after 36 payments",
      "Manual underwriting allowed",
      "No income limits"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "580 (600 for manual UW)", icon: CheckCircle2 },
      { label: "DPA Amount", value: "3.5% or 5%", icon: DollarSign },
      { label: "Income Limits", value: "No cap on qualifying income", icon: Percent },
      { label: "First-Time Buyer", value: "Not required", icon: Users },
    ],
    keyFeatures: [
      "3.5% DPA: Forgivable OR Repayable (Standard & High Balance)",
      "5% DPA: Repayable only (10-year term, rate = note rate + 2%)",
      "Forgivable: 30-year term, 0% interest, forgiven after 36 on-time payments",
      "Non-occupant co-borrowers allowed",
      "FHA Standard and High Balance loan amounts",
      "2-1 Buydown available on 3.5% DPA (seller/builder paid)",
      "DPA can be used for down payment AND closing costs"
    ],
    idealFor: [
      "First-time or repeat homebuyers",
      "Borrowers with credit scores 580+",
      "Those who prefer forgivable assistance",
      "Buyers wanting 2-1 buydown combined with DPA",
      "Non-occupant co-borrower situations"
    ],
    restrictions: [
      "FHA loans only",
      "5% DPA not available with 2-1 buydown",
      "DPA 2nd lien may not be resubordinated",
      "Max 2% origination/discount points on 1st TD only",
      "Homeowner education required from HUD-approved agency"
    ],
    propertyTypes: ["SFR", "2 Units", "Townhome", "Condo (FHA approved)", "PUD", "Manufactured (Doublewide)"]
  },
  {
    id: "dreambuilder",
    name: "DreamBuilder Program",
    shortName: "DreamBuilder",
    tagline: "Pathway to homeownership for non-traditional borrowers including ITIN & DACA",
    icon: Sparkles,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    highlights: [
      "ITIN & DACA eligible",
      "Bank statement income OK",
      "580+ credit score",
      "Alternative credit accepted"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "580 (case-by-case below)", icon: CheckCircle2 },
      { label: "Down Payment", value: "3.5% minimum", icon: DollarSign },
      { label: "Max DTI", value: "50% PTI / 60% DTI", icon: Percent },
      { label: "Borrower Types", value: "US Citizen, DACA, ITIN", icon: Users },
    ],
    keyFeatures: [
      "Multiple income documentation options accepted",
      "Bank statement only (3 months), P&L + bank statements, 1099s",
      "Asset depletion and automated cashflow qualification",
      "WVOE (written verification of employment) accepted",
      "Alternative credit tradelines may be acceptable",
      "Non-occupant co-borrowers permitted",
      "30-year fixed rate, standard and high balance"
    ],
    idealFor: [
      "DACA recipients and ITIN holders",
      "Self-employed with non-traditional income documentation",
      "Those with limited traditional credit history",
      "Borrowers who need alternative credit consideration",
      "Non-permanent resident aliens"
    ],
    restrictions: [
      "Primary residence only",
      "Must use approved title company",
      "12-month housing history verification required",
      "Program fees apply ($1,250 UW fee + 0.5% management fee)",
      "High Balance requires prior approval"
    ],
    propertyTypes: ["SFR", "2 Units", "Townhome", "Condo (FHA approved)", "PUD", "Manufactured (Multi-Wide)", "Modular"]
  },
  {
    id: "wayfinder-nqm",
    name: "WayFinder Non-QM",
    shortName: "WayFinder",
    tagline: "Comprehensive Non-QM with loans up to $3.5M and flexible income documentation",
    icon: Building2,
    color: "bg-slate-700",
    highlights: [
      "Up to $3.5M loan amounts",
      "Up to 90% LTV on purchase",
      "Foreign nationals eligible",
      "Interest only available"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "640-760 (varies by LTV/amount)", icon: CheckCircle2 },
      { label: "Max LTV", value: "Up to 90% (primary purchase)", icon: Percent },
      { label: "Max DTI", value: "50% (55% at lower LTV)", icon: Percent },
      { label: "Loan Amount", value: "$150K - $3.5M", icon: Banknote },
    ],
    keyFeatures: [
      "Full doc, 1-year full doc, 12/24-month bank statements",
      "1-2 year 1099, P&L only, P&L + bank statements, WVOE",
      "Asset depletion income accepted",
      "Primary, second home, AND investment properties",
      "Foreign nationals up to 75% LTV (second home)",
      "Interest only available to 80% LTV",
      "40-year fixed and 5/6 ARM options",
      "2-1 Buydown available on purchase"
    ],
    idealFor: [
      "High net worth borrowers needing jumbo financing",
      "Self-employed with complex income documentation",
      "Foreign nationals purchasing second homes",
      "Investors needing Non-QM investment property loans",
      "Borrowers with recent credit events (12+ months seasoned)"
    ],
    restrictions: [
      "No ITIN borrowers",
      "Entities (LLC, Corp) not eligible",
      "Log homes and mixed-use ineligible",
      "Max 20 acres",
      "Declining markets: 5% LTV reduction"
    ],
    propertyTypes: ["SFR", "2-4 Units (primary)", "Condo", "Non-Warrantable Condo", "Condotel", "Cooperative", "Manufactured (Doublewide)", "PUD"]
  },
  {
    id: "home-advantage-dpa",
    name: "Home Advantage DPA",
    shortName: "Home Advantage",
    tagline: "Washington State 0% interest DPA - no first-time buyer requirement",
    icon: Gift,
    color: "bg-green-600",
    highlights: [
      "0% interest second mortgage",
      "Up to 5% of loan amount",
      "No first-time buyer requirement",
      "CLTV up to 105%"
    ],
    eligibility: [
      { label: "Program Type", value: "0% Interest Community Second", icon: Percent },
      { label: "DPA Amount", value: "3%, 4%, or 5% of 1st mortgage", icon: DollarSign },
      { label: "First-Time Buyer", value: "Not required", icon: Users },
      { label: "State", value: "Washington only", icon: Home },
    ],
    keyFeatures: [
      "0% interest deferred second mortgage",
      "Due on sale, refinance, or transfer",
      "FHA CLTV up to 100% of acquisition cost",
      "Fannie Mae/Freddie Mac CLTV up to 105%",
      "VA CLTV up to 100% of lesser of price or NOV",
      "Works with Home Advantage or House Key first mortgage",
      "Needs assessment not required for 0% option",
      "No prepayment penalty"
    ],
    idealFor: [
      "Washington state homebuyers",
      "Repeat buyers (no first-time requirement)",
      "Those wanting 0% interest assistance",
      "FHA, VA, USDA, Conventional borrowers",
      "Buyers needing up to 5% assistance"
    ],
    restrictions: [
      "Washington state only",
      "Must use Commission first mortgage",
      "DPA not assumable",
      "Subordination only with Commission first mortgage",
      "Income limits may apply for 1% Needs Based option"
    ],
    propertyTypes: ["SFR", "2 Units", "Townhome", "Condo", "PUD", "Manufactured"]
  },
  {
    id: "homestart-dpa",
    name: "EPM HomeStart DPA",
    shortName: "HomeStart",
    tagline: "FHA DPA with no income limits and 620 minimum FICO",
    icon: Gift,
    color: "bg-orange-500",
    highlights: [
      "3.5% DPA for FHA loans",
      "No income limits",
      "620 minimum FICO",
      "Repayable 10-year term"
    ],
    eligibility: [
      { label: "Min. Credit Score", value: "620 (lowest middle)", icon: CheckCircle2 },
      { label: "DPA Amount", value: "3.5%", icon: DollarSign },
      { label: "Max DTI", value: "43%", icon: Percent },
      { label: "Income Limits", value: "None", icon: Users },
    ],
    keyFeatures: [
      "Repayable: 10-year term, fixed rate 2% higher than first mortgage",
      "First mortgage must be 30-year fixed FHA",
      "No first-time buyer requirement",
      "1-2 unit properties eligible",
      "MCCs (Mortgage Credit Certificates) allowed",
      "Non-occupant co-borrowers allowed (family only)",
      "Manufactured homes allowed (620+ FICO)",
      "No subordination within first 36 months"
    ],
    idealFor: [
      "FHA borrowers with 620+ credit",
      "Those who exceed income limits for other DPA",
      "Repeat homebuyers",
      "Buyers with non-occupant co-borrowers",
      "Those comfortable with repayable assistance"
    ],
    restrictions: [
      "FHA loans only",
      "Not available in New York",
      "High Balance loans not allowed",
      "Manual underwriting not allowed",
      "No cash back to borrower (earnest money refund only)"
    ],
    propertyTypes: ["SFR", "2 Units", "Townhome", "Condo (FHA approved)", "PUD", "Manufactured (Doublewide)"]
  },
  {
    id: "vacant-land",
    name: "Vacant Land Loans",
    shortName: "Land Loans",
    tagline: "Non-QM financing for vacant land - unlimited acreage, all 50 states",
    icon: TreeDeciduous,
    color: "bg-emerald-700",
    highlights: [
      "Available in all 50 states",
      "Unlimited acreage",
      "Purchase or refinance",
      "Non-traditional borrowers OK"
    ],
    eligibility: [
      { label: "Loan Purpose", value: "Purchase or Refinance", icon: Home },
      { label: "Acreage", value: "No limit", icon: TreeDeciduous },
      { label: "Availability", value: "All 50 states", icon: Building2 },
      { label: "Documentation", value: "Flexible (Non-QM)", icon: FileText },
    ],
    keyFeatures: [
      "Non-QM program with flexible credit requirements",
      "Alternative income documentation accepted",
      "Individual buildable lots",
      "Investment and income-producing land",
      "Recreational properties (hunting land, etc.)",
      "Agricultural land eligible",
      "Customized financing approach",
      "No acreage restrictions"
    ],
    idealFor: [
      "Investors purchasing land",
      "Buyers of recreational property",
      "Agricultural land purchases",
      "Self-employed with non-traditional income",
      "Those planning future construction",
      "Hunters and outdoor enthusiasts"
    ],
    restrictions: [
      "Non-QM guidelines apply",
      "Higher rates than traditional financing",
      "Down payment requirements vary by risk",
      "Flood zone properties may have restrictions"
    ],
    propertyTypes: ["Vacant Land", "Buildable Lots", "Agricultural", "Recreational", "Investment Land"]
  },
  {
    id: "flexfirst-heloc",
    name: "FlexFirst HELOC",
    shortName: "FlexFirst",
    tagline: "1st lien HELOC with sweep feature - pay off your home faster",
    icon: CreditCard,
    color: "bg-blue-700",
    highlights: [
      "1st lien HELOC",
      "Sweep feature for faster payoff",
      "Primary & investment properties",
      "$10K - $500K lines"
    ],
    eligibility: [
      { label: "Line Amount", value: "$10,000 - $500,000", icon: DollarSign },
      { label: "Rate Type", value: "Variable (WSJ Prime +/-)", icon: Percent },
      { label: "Draw Period", value: "10 years (5 for investment)", icon: Clock },
      { label: "Repayment", value: "20-year amortization", icon: Clock },
    ],
    keyFeatures: [
      "Daily sweep of checking account funds to reduce balance",
      "Interest-only payments during draw period",
      "Consolidate all finances into one account",
      "Real-time balance reduction from excess cash flow",
      "Can pay off mortgage years faster",
      "Access equity for improvements, debt consolidation, investments",
      "Primary residence: 10-year draw, Investment: 5-year draw",
      "No transaction fees"
    ],
    idealFor: [
      "Cash-flow positive households",
      "Those with strong financial discipline",
      "Debt consolidation goals",
      "Homeowners wanting accelerated payoff",
      "Those valuing flexibility and control",
      "Investment property owners"
    ],
    restrictions: [
      "$75 annual fee",
      "1% early closure fee if closed within 3 years",
      "APR range 8.50% - 10.25% (as of recent rates)",
      "Min APR 3.25%, Max APR 18.00%"
    ],
    propertyTypes: ["SFR", "Townhome", "Condo", "PUD", "Investment Property"]
  }
]

function ProductCard({ product, isExpanded, onToggle }: { 
  product: LoanProduct
  isExpanded: boolean
  onToggle: () => void 
}) {
  return (
    <Card 
      className={cn(
        "border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card rounded-2xl overflow-hidden",
        isExpanded && "shadow-xl ring-2 ring-secondary/20"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", product.color)}>
              <product.icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <CardTitle className="font-serif text-xl">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{product.tagline}</p>
            </div>
          </div>
        </div>
        
        {/* Quick Highlights */}
        <div className="flex flex-wrap gap-2 mt-4">
          {product.highlights.map((highlight, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs font-normal">
              {highlight}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Eligibility Grid */}
        <div className="grid grid-cols-2 gap-3">
          {product.eligibility.map((item, idx) => (
            <div key={idx} className="bg-muted/50 rounded-xl p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
              <div className="font-semibold text-sm">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="space-y-5 pt-4 border-t border-border animate-in fade-in duration-200">
            {/* Key Features */}
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {product.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Ideal For
              </h4>
              <ul className="space-y-2">
                {product.idealFor.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Restrictions */}
            {product.restrictions && (
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Important Considerations
                </h4>
                <ul className="space-y-2">
                  {product.restrictions.map((restriction, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Property Types */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Eligible Property Types</h4>
              <div className="flex flex-wrap gap-2">
                {product.propertyTypes.map((type, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors pt-2"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View Full Details <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </CardContent>
    </Card>
  )
}

export function ProductsSection() {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState("all")

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const purchaseProducts = loanProducts.filter(p => 
    ["conventional", "fha", "va", "usda", "jumbo", "first-time", "otc-construction", "temp-buydown"].includes(p.id)
  )
  const investorProducts = loanProducts.filter(p => 
    ["dscr", "bank-statement", "heloc", "alt-doc", "wayfinder-nqm", "vacant-land", "flexfirst-heloc"].includes(p.id)
  )
  const refinanceProducts = loanProducts.filter(p => 
    ["refinance", "fha-streamline", "va-irrrl", "heloc"].includes(p.id)
  )
  const dpaProducts = loanProducts.filter(p => 
    ["aurora-dpa", "boost-dpa", "chenoa-dpa", "legacy-builder-dpa", "dreambuilder", "home-advantage-dpa", "homestart-dpa"].includes(p.id)
  )
  const renovationProducts = loanProducts.filter(p => 
    ["fha-203k", "homestyle", "otc-construction"].includes(p.id)
  )
  const bridgeProducts = loanProducts.filter(p => 
    ["bbys", "byoc", "heloc"].includes(p.id)
  )

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "purchase":
        return purchaseProducts
      case "investor":
        return investorProducts
      case "refinance":
        return refinanceProducts
      case "dpa":
        return dpaProducts
      case "renovation":
        return renovationProducts
      case "bridge":
        return bridgeProducts
      default:
        return loanProducts
    }
  }

  return (
    <section id="products" className="relative py-24 bg-background overflow-hidden">
      {/* Vine Decorations */}
      <VineBorder position="left" className="text-foreground" />
      <VineBorder position="right" className="text-foreground" />
      
      {/* Floating Shield Logos */}
      <FloatingShield position="center-left" size="xl" opacity={0.03} />
      <FloatingShield position="center-right" size="xl" opacity={0.03} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">Loan Programs</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Our Loan <span className="text-secondary italic">Products</span>
          </h2>
          <VineDivider className="mt-6" />
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With access to over 100 wholesale lenders, we offer comprehensive mortgage solutions 
            tailored to your unique situation. Click any product below to see detailed requirements 
            and eligibility criteria.
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="flex flex-wrap justify-center gap-1 w-full max-w-5xl mx-auto h-auto p-1">
            <TabsTrigger value="all" className="text-sm px-3 py-2">All Programs</TabsTrigger>
            <TabsTrigger value="purchase" className="text-sm px-3 py-2">Purchase</TabsTrigger>
            <TabsTrigger value="dpa" className="text-sm px-3 py-2">Down Payment Assist</TabsTrigger>
            <TabsTrigger value="renovation" className="text-sm px-3 py-2">Renovation / Build</TabsTrigger>
            <TabsTrigger value="bridge" className="text-sm px-3 py-2">Buy Before You Sell</TabsTrigger>
            <TabsTrigger value="investor" className="text-sm px-3 py-2">Investor</TabsTrigger>
            <TabsTrigger value="refinance" className="text-sm px-3 py-2">Refinance</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredProducts().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isExpanded={expandedProducts.has(product.id)}
              onToggle={() => toggleProduct(product.id)}
            />
          ))}
        </div>

        {/* Quick Comparison Note */}
        <div className="mt-16 bg-muted/30 rounded-3xl p-8 border border-border">
          <h3 className="font-serif text-2xl font-bold text-center mb-6">Quick Program Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Program</th>
                  <th className="text-center py-3 px-4 font-semibold">Min. Down</th>
                  <th className="text-center py-3 px-4 font-semibold">Min. Credit</th>
                  <th className="text-center py-3 px-4 font-semibold">MI/Fees</th>
                  <th className="text-center py-3 px-4 font-semibold">Occupancy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 font-medium">Conventional</td>
                  <td className="text-center py-3 px-4">3%</td>
                  <td className="text-center py-3 px-4">None*</td>
                  <td className="text-center py-3 px-4">PMI (removable)</td>
                  <td className="text-center py-3 px-4">All types</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">FHA</td>
                  <td className="text-center py-3 px-4">3.5%</td>
                  <td className="text-center py-3 px-4">580</td>
                  <td className="text-center py-3 px-4">1.75% + annual MIP</td>
                  <td className="text-center py-3 px-4">Primary only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">VA</td>
                  <td className="text-center py-3 px-4">0%</td>
                  <td className="text-center py-3 px-4">None*</td>
                  <td className="text-center py-3 px-4">Funding fee only</td>
                  <td className="text-center py-3 px-4">Primary only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">USDA</td>
                  <td className="text-center py-3 px-4">0%</td>
                  <td className="text-center py-3 px-4">580</td>
                  <td className="text-center py-3 px-4">1% + 0.35% annual</td>
                  <td className="text-center py-3 px-4">Primary only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">DSCR</td>
                  <td className="text-center py-3 px-4">15%</td>
                  <td className="text-center py-3 px-4">600</td>
                  <td className="text-center py-3 px-4">None</td>
                  <td className="text-center py-3 px-4">Investment only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            *Conventional and VA have no minimum credit score requirement per guidelines. Lender overlays may vary. VA qualification is based on residual income, not DTI ratio.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block relative">
            <VineCorner position="top-left" className="opacity-20 -left-8 -top-8" />
            <VineCorner position="bottom-right" className="opacity-20 -right-8 -bottom-8" />
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-10 border border-secondary/10">
              <p className="text-muted-foreground mb-6 text-lg">
                Not sure which loan is right for you? Let us analyze your situation and find the perfect fit.
              </p>
              <a 
                href="https://lifetimepuyallup.my1003app.com?time=1773981427642" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-secondary px-10 py-4 text-base font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                Get Pre-Approved Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
