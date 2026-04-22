"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { VineDivider, VineCorner } from "@/components/vine-decoration"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    
    // Simulate API call - replace with actual newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStatus("success")
    setEmail("")
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Vine Decorations */}
      <VineCorner position="top-left" className="text-foreground opacity-10" />
      <VineCorner position="bottom-right" className="text-foreground opacity-10" />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative inline-block">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
            <Mail className="h-10 w-10 text-secondary" />
          </div>
        </div>
        
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Stay <span className="text-secondary italic">Informed</span>
        </h2>
        
        <VineDivider className="mt-6 mb-6" />
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Get the latest mortgage rates, market updates, and homebuying tips delivered to your inbox. 
          No spam, just valuable information to help you make smart decisions.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 h-14 text-lg rounded-xl border-border/50 focus:border-secondary"
          />
          <Button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="h-14 px-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-xl text-lg shadow-lg shadow-secondary/20 transition-all hover:shadow-xl hover:shadow-secondary/30"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status === "success" ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
