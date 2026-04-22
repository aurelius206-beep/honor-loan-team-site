"use client"

import { Button } from "@/components/ui/button"
import { Play, CheckCircle } from "lucide-react"
import { VineBorder, VineCorner } from "@/components/vine-decoration"

// Video URL - Honor Loan Team custom video with autoplay
const HERO_VIDEO_URL = "https://www.youtube.com/embed/A4D7hxmVYXA?autoplay=1&mute=1&loop=1&playlist=A4D7hxmVYXA"

const benefits = [
  "Over 100 Wholesale Lenders",
  "One Credit Pull for All Lenders",
  "Local Broker - Personal Service",
]

export function HeroSection() {
  return (
    <section id="home" className="relative bg-primary pt-8 pb-20 lg:pb-32">
      {/* Vine Decorations */}
      <VineBorder position="both" />
      <VineCorner position="top-left" className="opacity-10" />
      <VineCorner position="top-right" className="opacity-10" />
      
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Elegant Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary text-sm font-medium tracking-wide uppercase">Strength & Honor</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tight">
              <span className="block">Home Loans</span>
              <span className="block mt-2">
                <span className="text-secondary italic">With</span>{" "}
                <span className="relative">
                  Honor
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/40" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 6 Q50 0 100 6 T200 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
            </h1>
            
            <p className="mt-8 text-lg sm:text-xl text-primary-foreground/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              We shop your loan across over <span className="text-secondary font-semibold">100+ wholesale lenders</span> with just one credit pull. 
              Experience the difference of working with a local mortgage broker who puts your interests first.
            </p>

            {/* Benefits */}
            <ul className="mt-10 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-center lg:justify-start gap-4 text-primary-foreground/80">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-lg tracking-wide">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-10 py-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
                  Start Your Application
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-10 py-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                <a href="#calculator">
                  Calculate Payment
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-transparent to-secondary/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-primary-foreground/5 rounded-2xl overflow-hidden shadow-2xl border border-secondary/30">
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-secondary/40 to-transparent transform -translate-x-14 -translate-y-14 rotate-45" />
              </div>
              
              {/* Video Container */}
              <div className="aspect-video relative">
                <iframe
                  src={HERO_VIDEO_URL}
                  title="Strength and Honor - Honor Loan Team"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            </div>

            {/* Video Note */}
            <p className="mt-6 text-center text-primary-foreground/50 text-sm flex items-center justify-center gap-2 font-light italic">
              <Play className="h-4 w-4" />
              &ldquo;Strength and Honor&rdquo; - Our guiding principle
            </p>
          </div>
        </div>

        </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
        </svg>
      </div>
    </section>
  )
}
