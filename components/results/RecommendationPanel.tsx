// SafeBite India — components/results/RecommendationPanel.tsx — Advice & Alternatives
import React from "react"
import { CheckCircle2, RefreshCw, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RecommendationPanelProps {
  recommendations: string[]
  alternatives: string[]
}

export default function RecommendationPanel({ recommendations, alternatives }: RecommendationPanelProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Actionable Advice */}
      <Card className="border-none shadow-md bg-slate-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Safety Advice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Healthy Alternatives */}
      <Card className="border-none shadow-md bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Healthier Alternatives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {alternatives.map((alt, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {alt}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Syllabus Integration - Info Card */}
      <div className="md:col-span-2 bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <BookOpen className="h-8 w-8 text-score-good" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-lg font-bold">Educational Context: Codex Alimentarius</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            International food standards are governed by the <strong>Codex Alimentarius</strong>. India, as a member, aligns its FSSAI regulations with these global standards to ensure consumer protection and fair practices in the food trade.
          </p>
        </div>
      </div>
    </div>
  )
}
