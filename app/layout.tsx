// SafeBite India — app/layout.tsx — Root Layout
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeBite India | AI Food Safety Scanner",
  description: "AI-powered food label scanner for biosafety, ethics, and FSSAI standards. Project for Biosafety Standards & Ethics.",
  keywords: ["food safety", "FSSAI", "GMO scanner", "biosafety", "Indian food additives", "food ethics"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "min-h-screen flex flex-col bg-white text-slate-900 antialiased")}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
