import { VineDivider, VineBorder, VineCorner } from "@/components/vine-decoration"
import { FloatingShield } from "@/components/shield-logo"
import { 
  MessageSquare, 
  FileSearch, 
  FileCheck, 
  Search, 
  ClipboardCheck, 
  Key,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We start with a detailed conversation about your homeownership goals, financial situation, and timeline. This helps us understand exactly what you need.",
    details: [
      "Discuss your home buying goals and budget",
      "Review your current financial situation",
      "Explain all available loan options",
      "Answer any questions you have"
    ],
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Pre-Approval",
    description: "We pull your credit report ONE TIME, which is valid for all 100+ of our wholesale lenders. You'll receive a pre-approval letter showing sellers you're a serious buyer.",
    details: [
      "Single credit pull for all lenders",
      "Verify income and assets",
      "Calculate your buying power",
      "Issue pre-approval letter"
    ],
    icon: FileSearch,
    highlight: true,
  },
  {
    number: "03",
    title: "House Hunting",
    description: "Armed with your pre-approval, you can confidently shop for homes. We stay available to answer questions and adjust your pre-approval if needed.",
    details: [
      "Work with your real estate agent",
      "Make competitive offers",
      "Adjust approval for different homes",
      "Provide updated letters as needed"
    ],
    icon: Search,
  },
  {
    number: "04",
    title: "Loan Application",
    description: "Once you have an accepted offer, we shop your loan across our network of 100+ wholesale lenders to find you the best rate and terms.",
    details: [
      "Submit formal application",
      "Shop rates across 100+ lenders",
      "Lock in your best rate",
      "Collect required documentation"
    ],
    icon: FileCheck,
    highlight: true,
  },
  {
    number: "05",
    title: "Processing & Underwriting",
    description: "Our dedicated processors handle all the details while underwriters review and verify your loan. We keep you informed every step of the way.",
    details: [
      "Order appraisal and title work",
      "Verify all documentation",
      "Underwriter reviews your file",
      "Clear any conditions quickly"
    ],
    icon: ClipboardCheck,
  },
  {
    number: "06",
    title: "Clear to Close",
    description: "Once all conditions are satisfied, you receive the coveted 'Clear to Close' status. We prepare your final loan documents for signing.",
    details: [
      "Final approval from underwriting",
      "Prepare closing documents",
      "Review final numbers with you",
      "Schedule closing appointment"
    ],
    icon: CheckCircle2,
  },
  {
    number: "07",
    title: "Closing Day",
    description: "You sign your final documents at the title company, and the home is officially yours! We celebrate your achievement and remain available for any future needs.",
    details: [
      "Sign closing documents",
      "Fund your loan",
      "Transfer ownership",
      "Receive your keys!"
    ],
    icon: Key,
    highlight: true,
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Vine Decorations */}
      <VineBorder position="both" className="text-primary-foreground" />
      <VineCorner position="top-left" className="opacity-10" />
      <VineCorner position="bottom-right" className="opacity-10" />
      
      {/* Floating Shield Logos */}
      <FloatingShield position="top-right" size="xl" opacity={0.08} />
      <FloatingShield position="bottom-left" size="xl" opacity={0.08} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">Your Journey</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            The Mortgage <span className="text-secondary italic">Process</span>
          </h2>
          <VineDivider className="mt-6" />
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            From your first call to getting your keys, here is exactly what to expect. 
            We guide you through every step with honor and transparency.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vine line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/50" />
            {/* Vine nodes */}
            {steps.map((_, i) => (
              <div 
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-secondary/40"
                style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-8 ${
                  index % 2 === 0 ? '' : ''
                }`}
              >
                {/* Timeline Icon - Desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                    step.highlight 
                      ? 'bg-secondary' 
                      : 'bg-primary-foreground/10 border border-secondary/30'
                  }`}>
                    <step.icon className={`h-6 w-6 ${
                      step.highlight ? 'text-secondary-foreground' : 'text-secondary'
                    }`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-1 ${
                  index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:col-start-2 lg:pl-20'
                }`}>
                  <div 
                    className={`relative bg-primary-foreground/5 rounded-2xl p-8 border backdrop-blur-sm ${
                      step.highlight 
                        ? 'border-secondary/40 bg-secondary/10' 
                        : 'border-primary-foreground/10'
                    }`}
                  >
                    {/* Mobile Icon */}
                    <div className="lg:hidden flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                        step.highlight ? 'bg-secondary' : 'bg-primary-foreground/10 border border-secondary/30'
                      }`}>
                        <step.icon className={`h-6 w-6 ${
                          step.highlight ? 'text-secondary-foreground' : 'text-secondary'
                        }`} />
                      </div>
                      <span className="text-5xl font-serif font-bold text-secondary/30">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Number - Desktop */}
                    <span className={`hidden lg:block text-6xl font-serif font-bold text-secondary/20 mb-4 ${
                      index % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      {step.number}
                    </span>

                    <h3 className={`font-serif text-2xl font-bold mb-4 ${
                      index % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      {step.title}
                    </h3>

                    <p className={`text-primary-foreground/70 mb-6 leading-relaxed ${
                      index % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      {step.description}
                    </p>

                    <ul className={`space-y-3 ${
                      index % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      {step.details.map((detail, i) => (
                        <li 
                          key={i} 
                          className={`flex items-center gap-3 text-sm text-primary-foreground/60 ${
                            index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-secondary/10 rounded-3xl p-8 border border-secondary/30">
            <div className="text-center sm:text-left">
              <p className="font-serif text-2xl font-bold">Ready to Begin Your Journey?</p>
              <p className="text-primary-foreground/60 mt-1">Let us guide you home with honor.</p>
            </div>
            <a 
              href="https://lifetimepuyallup.my1003app.com?time=1773981427642" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-10 py-4 text-base font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
            >
              Start Your Application
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
