import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import { VineDivider, VineCorner } from "@/components/vine-decoration"
import { FloatingShield, ShieldDivider } from "@/components/shield-logo"

const teamMembers = [
  {
    name: "Marques Johnson",
    role: "Branch Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MY%20LOGO-kQczavjSbkdWEycLRkU5lGVmyvJZsk.jpg",
    email: "mjohnson@LT.mortgage",
    phone: "206-456-2571",
    featured: true,
  },
  {
    name: "Gene Anderson",
    role: "Loan Officer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20220918-hAEiDonURQSTs5Oc2kwHrAYJWEbPZf.png",
    email: "danderson@lt.mortgage",
    phone: "360-949-6284",
  },
  {
    name: "Jamie Miller",
    role: "Business Development Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AQcHVfAk196a6a-lKG7IwXMpPr5bWIExbUPXVVstiFOBkDMy-L7lBTlCN3javQ7oQp-x6sSsKmBOut1UE1I5ILiMxJ2TpSquMZvK68CKC3WsIrA0arj2GW8ig07PykBT2V1iwblJwrfm3-SFd2tQLHdJnI5kL7XbR-s%3Ds0-7db5FMSvsw9xzZN6MpQIHPcnEThoop.png",
    email: "jamie@honorhomelending.com",
    phone: "206-945-8341",
  },
  {
    name: "Michelle Cables",
    role: "Business Development Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cc6d345f-3883-431a-9b9f-8e105c249faa-pWTKlOwTaEPMgJwWXZ4aCmgFquJRYy.jpeg",
    email: "mcables@lt.mortgage",
    phone: "253-285-6128",
    language: "Hablo Espanol",
  },
  {
    name: "Marcia Lanoie",
    role: "Senior Processor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-J7PIoKSLOHXobbVZDZp3ZEYYJTNSgT.png",
    email: "marcia@lt.mortgage",
    phone: "916-412-8208",
  },
  {
    name: "Rheana Foster",
    role: "Loan Officer Assistant",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z04xNczaduCVYdOBYK5UsBMHZNdcVF.png",
    email: "rheana@honorhomelending.com",
    phone: "(555) 567-8901",
  },
  {
    name: "Natalie Polasek",
    role: "Loan Manager",
    image: null,
    email: "npolasek@lt.mortgage",
    phone: "405-513-4797",
  },
]

export function TeamSection() {
  const featuredMember = teamMembers.find(m => m.featured)
  const otherMembers = teamMembers.filter(m => !m.featured)

  return (
    <section id="team" className="relative py-24 bg-background overflow-hidden">
      {/* Vine Corner Decorations */}
      <VineCorner position="top-left" className="text-foreground" />
      <VineCorner position="bottom-right" className="text-foreground" />
      
      {/* Floating Shield Logos */}
      <FloatingShield position="top-right" size="xl" opacity={0.04} />
      <FloatingShield position="bottom-left" size="lg" opacity={0.03} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">Our Professionals</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Meet Our <span className="text-secondary italic">Team</span>
          </h2>
          <VineDivider className="mt-6" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dedicated professionals committed to helping you achieve your homeownership dreams with honor and integrity.
          </p>
        </div>

        {/* Featured Team Member */}
        {featuredMember && (
          <div className="mb-20">
            <Card className="overflow-hidden border-0 shadow-2xl max-w-5xl mx-auto bg-primary rounded-3xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 relative flex items-center justify-center p-8">
                    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-secondary/30 shadow-xl">
                      <Image
                        src={featuredMember.image || "/placeholder.svg"}
                        alt={featuredMember.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 p-10 lg:p-14 flex flex-col justify-center text-primary-foreground relative">
                    {/* Decorative vine in corner */}
                    <VineCorner position="top-right" className="opacity-10" />
                    
                    <span className="text-secondary font-medium tracking-widest uppercase text-sm">Branch Manager</span>
                    <h3 className="mt-2 font-serif text-4xl lg:text-5xl font-bold tracking-tight">{featuredMember.name}</h3>
                    
                    <div className="mt-6 w-16 h-0.5 bg-secondary/50" />
                    
                    <p className="mt-6 text-primary-foreground/80 leading-relaxed text-lg">
                      With 13 years of experience in the mortgage industry, Honor Loan Team is a division 
                      of Lifetime Home Loans LLC, located in Puyallup, Washington. We shop your loan across 
                      100+ wholesale lenders with just one credit pull. Experience the difference of working 
                      with a local mortgage broker who puts your interests first.
                    </p>
                    <p className="mt-3 text-primary-foreground/60 text-sm">
                      NMLS# 493389
                    </p>
                    
                    {/* Equal Housing Lender */}
                    <div className="mt-6 flex items-center gap-3">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-equal-housing-lender-11563505707hnlhk4vmff-p6SCD3xGZQ1YNs3kq68ghOlONEQKq8.png"
                        alt="Equal Housing Lender"
                        width={50}
                        height={50}
                        className="h-12 w-auto invert opacity-80"
                        style={{ width: 'auto' }}
                      />
                    </div>
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-6">
                      <a href={`mailto:${featuredMember.email}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                          <Mail className="h-5 w-5" />
                        </div>
                        <span>{featuredMember.email}</span>
                      </a>
                      <a href={`tel:${featuredMember.phone}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                          <Phone className="h-5 w-5" />
                        </div>
                        <span>{featuredMember.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Section Subheader */}
        <ShieldDivider className="mb-12" />
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl font-bold text-foreground">Supporting Team</h3>
          <p className="mt-2 text-muted-foreground">The dedicated professionals behind your smooth mortgage experience</p>
        </div>

        {/* Other Team Members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-2xl bg-card">
              <CardContent className="p-0">
                <div className="py-8 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                  {member.image ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary/20 shadow-lg group-hover:border-secondary/40 transition-all duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 scale-[0.7]"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-secondary/20 flex items-center justify-center">
                      <span className="font-serif text-3xl font-bold text-secondary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium text-sm tracking-wide">{member.role}</p>
                  {member.language && (
                    <p className="mt-1 text-xs text-muted-foreground italic">{member.language}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-2 text-sm text-muted-foreground">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a href={`tel:${member.phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
