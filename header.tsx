"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

const SHIELD_LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TJtlkQyln7kyTQtRzLaIT6F7MyCQkN.png"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#team", label: "Our Team" },
  { href: "/tools", label: "Home Buyer Tools" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#products", label: "Products" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Large Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-secondary to-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Left Shield */}
            <div className="hidden sm:block flex-shrink-0">
              <Image
                src={SHIELD_LOGO_URL}
                alt="Honor Loan Team Shield"
                width={60}
                height={72}
                className="h-12 sm:h-16 w-auto drop-shadow-lg"
                style={{ width: 'auto' }}
              />
            </div>
            
            {/* Center Text */}
            <div className="text-center flex-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg">
                <span className="text-white">Honor</span>
                <span className="text-white/90"> Loan Team</span>
              </h1>
              <p className="text-white text-xs sm:text-sm md:text-base font-bold mt-0.5">
                Powered by Lifetime Home Loans
              </p>
            </div>
            
            {/* Right - Equal Housing Lender */}
            <div className="hidden sm:flex flex-shrink-0 items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-equal-housing-lender-11563505707hnlhk4vmff-p6SCD3xGZQ1YNs3kq68ghOlONEQKq8.png"
                alt="Equal Housing Lender"
                width={60}
                height={60}
                className="h-10 sm:h-14 w-auto invert drop-shadow-lg"
                style={{ width: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="fixed top-16 sm:top-20 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-primary-foreground/80 hover:text-secondary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Phone - Left on mobile */}
            <a 
              href="tel:206-456-2571" 
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">206-456-2571</span>
            </a>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center ml-8">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6"
              >
                <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-primary-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-secondary/20">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-primary-foreground/80 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a 
                  href="tel:206-456-2571" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>206-456-2571</span>
                </a>
                <Button
                  asChild
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold mt-2"
                >
                  <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
