// SafeBite India — app/results/page.tsx — Detailed analysis report
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  Leaf, 
  ChevronRight,
  Printer,
  Share2,
  Info,
  ShieldX,
  Skull
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnalysisResult } from "@/lib/types"
import ECodeChip from "@/components/results/ECodeChip"
import RegulatoryPanel from "@/components/results/RegulatoryPanel"
import NutritionTable from "@/components/results/NutritionTable"
import SmartSwapsPanel from "@/components/results/SmartSwapsPanel"
import { cn } from "@/lib/utils"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('safebite_result')
    if (saved) {
      try {
        setResult(JSON.parse(saved))
      } catch (e) {
        router.push('/scanner')
      }
    } else {
      router.push('/scanner')
    }
  }, [router])

  if (!result) return null

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-green-500"
    if (score >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
        <div className="container px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push('/scanner')} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Scanner
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 py-8 space-y-12 max-w-5xl">

        {/* ── SPOILAGE DANGER BANNER (top priority) ── */}
        {result.isSpoiled && (
          <div
            className="relative overflow-hidden rounded-[32px] border-2 border-red-500 bg-gradient-to-br from-red-950 via-red-900 to-rose-950 p-8 shadow-2xl shadow-red-900/40"
            role="alert"
            aria-live="assertive"
          >
            <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-[32px]" />
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-16 h-16 rounded-3xl bg-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/50">
                <ShieldX className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-red-400">⚠ Critical Food Safety Warning</p>
                  <h2 className="text-2xl font-black text-white">This Food Is UNSAFE to Consume</h2>
                </div>
                <p className="text-sm text-red-200 leading-relaxed border-l-2 border-red-500 pl-4">
                  {result.spoilageWarning || 'Visible signs of spoilage, fungal contamination, or advanced decay were detected in this food item. Consuming it poses serious health risks including food poisoning, mycotoxin exposure, and gastrointestinal illness.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Discard Immediately', 'Do Not Consume', 'Wash Hands After Handling', 'Check Surrounding Items'].map(tip => (
                    <span key={tip} className="text-[10px] font-bold bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-1.5 rounded-full">
                      <Skull className="h-3 w-3 inline mr-1" />{tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Score Section */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
          <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - result.overallScore / 100)}
                strokeLinecap="round"
                className={cn("transition-all duration-1000", getScoreColor(result.overallScore).split(' ')[0])}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-black tracking-tighter">{result.overallScore}</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Safety Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">{result.productName}</h1>
                <Badge className={cn("px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest", getScoreColor(result.overallScore))}>
                  {result.overallLevel}
                </Badge>
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-2xl">
                <Leaf className="h-4 w-4 text-green-600" />
                {result.isGMO ? 'GMO Detected' : 'Non-GMO / Verified'}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-2xl">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                {result.productCategory}
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Context Panel */}
        <RegulatoryPanel 
          category={result.productCategory}
          findings={result.regulatoryFindings}
          hasLicense={result.hasFSSAILicense}
          fssaiNumber={result.fssaiNumber}
        />

        {/* AI-Powered Insights Paragraph */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-[32px] p-8 md:p-10 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> AI-Powered Safety Insights
          </h3>
          <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed italic">
            "{result.aiInsights}"
          </p>
        </div>

        {/* Main Grid: Nutrition & Ingredients */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Ingredients Analysis */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                Ingredients Analysis
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase">
                  {result.extractedIngredients.length} items
                </span>
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {result.extractedIngredients.map((ing, i) => (
                  <span 
                    key={i} 
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-xl border transition-all",
                      i < 3 
                        ? "bg-slate-900 text-white font-bold border-slate-900 shadow-md" 
                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                    )}
                  >
                    {ing}
                    {i < 3 && <span className="ml-2 text-[10px] opacity-50 font-black">#{(i+1)}</span>}
                  </span>
                ))}
              </div>

              {result.extractedIngredients.length > 0 && (
                <div className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4">
                  <Info className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    Ingredients are listed in order of predominance. The first three ingredients highlighted above make up the bulk of this product.
                  </p>
                </div>
              )}
            </div>

            {/* Additives & E-Codes */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">Additives & E-Codes</h3>
              <div className="flex flex-wrap gap-2">
                {result.detectedEcodes.map((code, i) => (
                  <ECodeChip key={i} code={code} />
                ))}
                {result.detectedEcodes.length === 0 && (
                  <div className="text-sm text-slate-400 italic py-2">No synthetic E-codes identified in ingredients list.</div>
                )}
              </div>
            </div>

            {/* Allergens */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">Allergens</h3>
              <div className="flex flex-wrap gap-3">
                {result.detectedAllergens.map((allergen, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-50 text-red-700 border border-red-100 text-xs font-black uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4" /> {allergen}
                  </div>
                ))}
                {result.detectedAllergens.length === 0 && (
                  <div className="text-sm text-green-600 flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4" /> No common allergens declared.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Nutrition Table */}
            <NutritionTable facts={result.nutritionFacts} />

            {/* Score Breakdown */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-xl font-bold">Safety Breakdown</h3>
              <div className="space-y-6">
                {result.criteria.map((c) => (
                  <div key={c.criterion} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-slate-700">{c.label}</span>
                      <span className="text-sm font-black tabular-nums">{c.score}%</span>
                    </div>
                    <Progress value={c.score} className="h-2" indicatorClassName={getProgressColor(c.score)} />
                    {c.flags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {c.flags.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {f.ingredient}
                          </span>
                        ))}
                        {c.flags.length > 3 && <span className="text-[10px] font-bold text-slate-300">+{c.flags.length - 3} more</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations & Alternatives */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-black tracking-tight">Smart Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-black shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white rounded-[40px] p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-black tracking-tight">Healthier Alternatives</h3>
            <div className="space-y-4">
              {result.alternatives.map((alt, i) => (
                <div key={i} className="group flex items-center justify-between p-5 rounded-3xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <span className="font-bold tracking-tight">{alt}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Ingredient Swaps */}
        {result.healthierSwaps && result.healthierSwaps.length > 0 && (
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-12">
            <SmartSwapsPanel swaps={result.healthierSwaps} />
          </div>
        )}

        {/* Final Notes */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-100 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ethical & Biosafety Notes</h4>
            <div className="grid gap-3">
              {result.ethicsNotes.map((note, i) => (
                <div key={i} className="flex gap-3 text-xs text-slate-600 leading-relaxed">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  {note}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Confidence</p>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - (result.confidence === 'high' ? 0.95 : 0.4))} strokeLinecap="round" className="text-primary" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-xs">
                {result.confidence === 'high' ? '95%' : '40%'}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-600 capitalize">{result.confidence} Confidence</p>
          </div>
        </div>
      </main>
    </div>
  )
}
