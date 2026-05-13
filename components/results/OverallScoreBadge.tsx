// SafeBite India — components/results/OverallScoreBadge.tsx — Summary score display
"use client"

import React, { useEffect, useState } from "react"
import { cn, scoreLevelHex, scoreLevelColors, formatTimestamp } from "@/lib/utils"
import { ScoreLevel } from "@/lib/types"

interface OverallScoreBadgeProps {
  score: number
  level: ScoreLevel
  productName: string
  analyzedAt: string
}

export default function OverallScoreBadge({ score, level, productName, analyzedAt }: OverallScoreBadgeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 500)
    return () => clearTimeout(timer)
  }, [score])

  const colors = scoreLevelColors(level)
  const hex = scoreLevelHex(level)
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center text-center gap-6 p-8 rounded-3xl bg-white shadow-xl border border-slate-100">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Ring */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          {/* Animated Progress Ring */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={hex}
            strokeWidth="12"
            strokeDasharray={circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1.5s ease-out' }}
            strokeLinecap="round"
            fill="transparent"
            className="drop-shadow-md"
          />
        </svg>
        
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-black tracking-tighter tabular-nums" style={{ color: hex }}>
            {animatedScore}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Score</span>
        </div>
        
        {/* Pulsing Outer Glow */}
        <div className={cn("absolute inset-0 rounded-full animate-pulse-ring opacity-20", colors.bg)} />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{productName}</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className={cn("px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest border-2", colors.bg, colors.text, colors.border)}>
            {level} Safety Rating
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Analyzed {formatTimestamp(analyzedAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
