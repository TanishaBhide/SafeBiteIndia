// SafeBite India — components/layout/Navbar.tsx — Navigation Bar
"use client"

import Link from "next/link"
import { Leaf, Scan, Home, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Leaf className="h-6 w-6 text-score-good" />
          <span>SafeBite <span className="text-foreground">India</span></span>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/scanner" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Scan className="h-4 w-4" />
            <span className="hidden sm:inline">Scanner</span>
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">About</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
