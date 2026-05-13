// SafeBite India — components/results/CriteriaScoreCard.tsx — Individual criterion view
"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, Zap, Shield, Microscope, Leaf, Scale } from "lucide-react"
import { CriterionScore, CriterionKey } from "@/lib/types"
import { cn } from "@/lib/utils"

const icons: Record<CriterionKey, any> = {
  nutrition: Zap,
  additives: AlertCircle,
  allergens: Shield,
  processing: Microscope,
  biosafety_gmo: Leaf,
  ethics: Scale,
}

export default function CriteriaScoreCard({ score, label, summary, flags, level, criterion }: CriterionScore) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = icons[criterion]

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/10 transition-all bg-white group">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={level} className="capitalize px-3 py-0.5">{level}</Badge>
        </div>
        <CardTitle className="text-lg font-bold">{label}</CardTitle>
        <p className="text-xs text-muted-foreground leading-relaxed min-h-[2.5rem] mt-1">{summary}</p>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold tabular-nums">
            <span className="text-muted-foreground uppercase tracking-wider">Rating</span>
            <span>{score}%</span>
          </div>
          <Progress 
            value={score} 
            className="h-2.5 bg-slate-100" 
          />
        </div>

        {flags.length > 0 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-bold py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <AlertTriangle className={cn("h-3.5 w-3.5", flags.some(f => f.severity === 'danger') ? "text-red-500" : "text-amber-500")} />
              {flags.length} {flags.length === 1 ? 'Concern' : 'Concerns'} Found
            </span>
            {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        )}

        {isExpanded && (
          <div className="space-y-2 animate-accordion-down">
            {flags.map((flag, i) => (
              <div key={i} className="p-2.5 rounded-lg border bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-900">{flag.ingredient}</span>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    flag.severity === 'danger' ? "bg-red-500" : 
                    flag.severity === 'warning' ? "bg-amber-500" : "bg-blue-500"
                  )} />
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight italic">"{flag.reason}"</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
