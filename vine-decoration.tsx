"use client"

// John 15:5 - "I am the vine; you are the branches. If you remain in me and I in you, 
// you will bear much fruit; apart from me you can do nothing."

const VINE_IMAGE_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2020%2C%202026%2C%2010_52_55%20AM-fARkjKhYXO3HPtYo95GYs4DJL9umNB.png"

// Watermark-style vines - subtle background that never covers content
export function PageVines({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Content first - always on top and fully readable */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Vine watermark - behind everything, subtle and decorative */}
      <div 
        className="fixed inset-0 pointer-events-none hidden md:block"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        {/* Left vine watermark */}
        <div 
          className="absolute left-0 top-0 h-full w-32 lg:w-40 xl:w-48"
          style={{ 
            backgroundImage: `url(${VINE_IMAGE_URL})`,
            backgroundPosition: 'left center',
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            filter: 'grayscale(20%)'
          }}
        />
        
        {/* Right vine watermark - mirrored */}
        <div 
          className="absolute right-0 top-0 h-full w-32 lg:w-40 xl:w-48"
          style={{ 
            backgroundImage: `url(${VINE_IMAGE_URL})`,
            backgroundPosition: 'right center',
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            transform: 'scaleX(-1)',
            opacity: 0.15,
            filter: 'grayscale(20%)'
          }}
        />
      </div>
    </div>
  )
}

// Simple horizontal divider
export function VineDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-6 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>
    </div>
  )
}

// Backwards compatibility exports
export const VineSectionDivider = VineDivider
export const VineHorizontalDivider = VineDivider
export const VineBackground = PageVines
export const RealisticVine = PageVines
export const Vine3D = PageVines
export const VineBorder = PageVines
export const VineCorner = VineDivider
