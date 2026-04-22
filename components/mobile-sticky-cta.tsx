"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 500px)
      setIsVisible(window.scrollY > 500)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  if (isDismissed || !isVisible) return null
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
      "bg-primary border-t border-secondary/30 shadow-lg",
      "transform transition-transform duration-300",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <a 
          href="tel:206-456-2571"
          className="flex items-center gap-2 text-primary-foreground hover:text-secondary transition-colors"
        >
          <div className="p-2 bg-secondary rounded-full">
            <Phone className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Call Now</p>
            <p className="text-xs text-primary-foreground/80">206-456-2571</p>
          </div>
        </a>
        
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            <a href="https://lifetimepuyallup.my1003app.com?time=1773981427642" target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
          
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-primary-foreground/60 hover:text-primary-foreground"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
