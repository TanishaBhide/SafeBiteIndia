// SafeBite India — app/scanner/page.tsx — Scanner Page
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import ScannerTabs from "@/components/scanner/ScannerTabs"
import { ScanInput, AnalysisResult } from "@/lib/types"

export default function ScannerPage() {
  const router = useRouter()

  const handleAnalyze = async (input: ScanInput & { isSpoiled?: boolean; spoilageWarning?: string }) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        throw new Error('Analysis request failed')
      }

      const result: AnalysisResult = await response.json()

      // Store result in sessionStorage to pass to results page
      sessionStorage.setItem('safebite_result', JSON.stringify(result))

      router.push('/results')
    } catch (error) {
      console.error('Error during analysis:', error)
      throw error
    }
  }

  return (
    <div className="container px-4 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Food Safety Scanner</h1>
        <p className="text-muted-foreground text-lg">
          Upload an image of the ingredient label or enter it manually to get a comprehensive safety and ethics report.
        </p>
      </div>

      <ScannerTabs onAnalyze={handleAnalyze} />

      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
        <div className="space-y-2">
          <div className="text-xl font-bold text-primary">01. Scan</div>
          <p className="text-sm text-muted-foreground">High quality photos work best for AI extraction.</p>
        </div>
        <div className="space-y-2">
          <div className="text-xl font-bold text-primary">02. Verify</div>
          <p className="text-sm text-muted-foreground">Check identified ingredients against Indian standards.</p>
        </div>
        <div className="space-y-2">
          <div className="text-xl font-bold text-primary">03. Choose</div>
          <p className="text-sm text-muted-foreground">Make informed decisions based on biosafety scores.</p>
        </div>
      </div>
    </div>
  )
}
