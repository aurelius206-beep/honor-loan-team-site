import Image from "next/image"

export function LogoBanner() {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0a] via-[#111] to-primary overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Gold corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-secondary/30 to-transparent transform -translate-x-24 -translate-y-24 rotate-45" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-secondary/30 to-transparent transform translate-x-24 -translate-y-24 -rotate-45" />
      </div>

      {/* Content */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Logo Container - Translucent & Floating */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full transform scale-75 group-hover:scale-90 transition-transform duration-700" />
              
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2024%2C%202026%2C%2001_01_10%20PM-458jhftAFdlDKLh1HzQwvnH61t2N5y.png"
                alt="Honor Loan Team - Powered by Lifetime Home Loans"
                width={900}
                height={600}
                loading="eager"
                className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl h-auto opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                style={{ 
                  filter: 'drop-shadow(0 20px 60px rgba(107, 142, 35, 0.25)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))'
                }}
                priority
              />
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <blockquote>
              <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/70 leading-relaxed font-light italic">
                &ldquo;Your ability to develop a reputation as a person of character &amp;{" "}
                <span style={{ fontFamily: 'var(--font-script)' }} className="text-secondary text-4xl sm:text-5xl lg:text-6xl font-bold not-italic">honor</span>{" "}
                is the highest achievement of both social &amp; business life&rdquo;
              </p>
              <footer className="mt-4 text-primary-foreground/60 text-base sm:text-lg tracking-wide font-medium">
                — Brian Tracy
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </section>
  )
}
