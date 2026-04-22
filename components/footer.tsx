import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import { VineCorner, VineBorder } from "@/components/vine-decoration"
import { FloatingShield, ShieldLogo } from "@/components/shield-logo"

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#team", label: "Our Team" },
  { href: "#calculator", label: "Calculator" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
]

const legalLinks = [
  { href: "https://lifetimehomeloans.com/privacy-policy/", label: "Privacy Policy", external: true },
  { href: "https://lifetimehomeloans.com/disclosure/", label: "Disclosures", external: true },
  { href: "https://nmlsconsumeraccess.org/", label: "NMLS Consumer Access", external: true },
  { href: "https://lifetimehomeloans.com/", label: "Lifetime Home Loans", external: true },
]

const loanTypes = [
  "Conventional Loans",
  "FHA Loans",
  "VA Loans",
  "USDA Loans",
  "Jumbo Loans",
  "Refinancing",
]

export function Footer() {
  return (
    <footer id="contact" className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Vine Decorations */}
      <VineBorder position="both" className="text-primary-foreground" />
      <VineCorner position="top-left" className="opacity-5" />
      <VineCorner position="top-right" className="opacity-5" />
      
      {/* Floating Shield Logos */}
      <FloatingShield position="center-right" size="xl" opacity={0.05} />
      
      {/* Main CTA Section */}
      <div className="relative border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="text-secondary font-medium tracking-widest uppercase text-sm">Take the Next Step</span>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight">Ready to Get Started?</h2>
              <p className="mt-3 text-primary-foreground/70 text-lg">
                Apply now and let us find you the best rate from over 100 lenders.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-12 py-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
            >
              <a 
                href="https://lifetimepuyallup.my1003app.com?time=1773981427642" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                Apply Here
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2024%2C%202026%2C%2001_01_10%20PM-458jhftAFdlDKLh1HzQwvnH61t2N5y.png"
                alt="Honor Loan Team Logo"
                width={240}
                height={100}
                className="opacity-90"
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Located in Puyallup, Washington. We shop your loan across 100+ wholesale lenders 
              with just one credit pull. Experience the difference of working with a local 
              mortgage broker who puts your interests first.
            </p>
            <p className="mt-4 text-secondary text-lg font-bold tracking-wide">
              A Division of Lifetime Home Loans LLC
            </p>
            <p className="mt-1 text-primary-foreground/50 text-xs">
              Marques Johnson NMLS# 493389
            </p>
            <p className="mt-1 text-primary-foreground/50 text-xs">
              Lifetime Home Loans NMLS# 1861406
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-secondary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-secondary transition-all group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Loan Programs</h4>
            <ul className="space-y-3">
              {loanTypes.map((type) => (
                <li key={type}>
                  <span className="text-primary-foreground/60 text-sm">
                    {type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:206-456-2571" 
                  className="flex items-start gap-3 text-primary-foreground/60 hover:text-secondary transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Phone className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="pt-1.5">206-456-2571</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mjohnson@LT.mortgage" 
                  className="flex items-start gap-3 text-primary-foreground/60 hover:text-secondary transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Mail className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="pt-1.5">mjohnson@LT.mortgage</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="pt-1.5">
                    Puyallup, WA<br />
                    <span className="text-primary-foreground/40">Serving the Greater Seattle Area</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-primary-foreground/40 text-sm">
              &copy; {new Date().getFullYear()} Honor Loan Team. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              {legalLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/40 hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Lifetime Home Loans - Parent Brokerage */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col items-center gap-6">
              {/* Lifetime Home Loans Logo - on white background for visibility */}
              <a 
                href="https://lifetimehomeloans.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity bg-white rounded-lg px-6 py-4 shadow-lg"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lifetime-Home-Loans-Main-Logo-wEqual-NMLS-aroEHerCivrdpjOArKKsg0p1Qdxw7o.png"
                  alt="Lifetime Home Loans - Your Lender For Life - NMLS# 1861406 - Equal Housing Lender"
                  width={400}
                  height={150}
                  className="h-24 md:h-32 w-auto"
                  style={{ width: 'auto', height: 'auto', maxHeight: '128px' }}
                />
              </a>

              {/* Corporate Address */}
              <div className="text-center text-primary-foreground/40 text-xs">
                <p className="mt-1">
                  6955 S. Union Park Center #40, Salt Lake City, UT 84047
                </p>
                <p className="mt-1">
                  <a href="tel:800-206-1003" className="hover:text-secondary transition-colors">800-206-1003</a>
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-primary-foreground/10">
            <p className="text-primary-foreground/40 text-xs text-center max-w-4xl mx-auto leading-relaxed">
              <strong className="text-primary-foreground/50">Honor Loan Team</strong> is a team operating under <strong className="text-primary-foreground/50">Lifetime Home Loans LLC</strong>, 
              a licensed mortgage brokerage. Marques Johnson NMLS# 493389. Lifetime Home Loans NMLS# 1861406. Equal Housing Lender.
            </p>
            <p className="mt-3 text-primary-foreground/30 text-xs text-center max-w-4xl mx-auto leading-relaxed">
              This is not a commitment to lend. Programs, rates, terms and conditions are subject to change without notice.
              All loans are subject to credit approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
