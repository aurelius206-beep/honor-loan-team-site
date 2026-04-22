"use client"

import Image from "next/image"

const SHIELD_LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-19%20222030-lb0RX0lUqBelOoitbhN1fRmw1GFsJo.png"

interface ShieldLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  opacity?: number
}

const sizeMap = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 120,
}

export function ShieldLogo({ size = "md", className = "", opacity = 1 }: ShieldLogoProps) {
  const dimension = sizeMap[size]
  
  return (
    <div 
      className={`relative flex-shrink-0 ${className}`}
      style={{ opacity, width: dimension, height: dimension }}
    >
      <Image
        src={SHIELD_LOGO_URL}
        alt="Honor Loan Team Shield"
        fill
        sizes={`${dimension}px`}
        className="object-contain"
      />
    </div>
  )
}

// Decorative shield for section headers
export function SectionShield({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <ShieldLogo size="lg" opacity={0.15} />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldLogo size="md" opacity={0.3} />
        </div>
      </div>
    </div>
  )
}

// Shield divider for between sections
export function ShieldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-secondary/50" />
      <ShieldLogo size="sm" opacity={0.5} />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-secondary/30 to-secondary/50" />
    </div>
  )
}

// Floating shield decorations for backgrounds
export function FloatingShield({ 
  position, 
  size = "lg",
  opacity = 0.05 
}: { 
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right"
  size?: "sm" | "md" | "lg" | "xl"
  opacity?: number
}) {
  const positionClasses = {
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "center-left": "top-1/2 -translate-y-1/2 left-8",
    "center-right": "top-1/2 -translate-y-1/2 right-8",
  }

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none`}>
      <ShieldLogo size={size} opacity={opacity} />
    </div>
  )
}
