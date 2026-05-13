// SafeBite India — components/home/HeroSection.tsx — Hero Section
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ScanLine } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Abstract Background SVG Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-score-good" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-6">
        <div className="inline-block rounded-full bg-score-good-bg border border-score-good-border px-3 py-1 text-sm font-medium text-score-good animate-fade-in">
          Biosafety Standards & Ethics Project
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl">
          Know What's In Your Food With <span className="text-score-good">AI-Powered</span> Scanning
        </h1>
        <p className="max-w-[700px] text-slate-600 md:text-xl lg:text-2xl leading-relaxed">
          Instantly evaluate packaged food for FSSAI compliance, harmful additives, GMO safety, and ethical sourcing standards using advanced biosafety protocols.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="h-14 px-8 text-lg gap-2 rounded-full shadow-lg hover:shadow-xl transition-all">
            <Link href="/scanner">
              Start Scanning <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg gap-2 rounded-full border-2">
            <Link href="/about" className="flex items-center gap-2">
              <ScanLine className="h-5 w-5" /> How it Works
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 flex items-center gap-8 grayscale opacity-50 overflow-hidden select-none">
          <div className="font-bold text-2xl tracking-widest italic">FSSAI</div>
          <div className="font-bold text-2xl tracking-widest italic">GEAC</div>
          <div className="font-bold text-2xl tracking-widest italic">EPA 1986</div>
        </div>
      </div>
    </section>
  )
}
