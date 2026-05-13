// SafeBite India — components/results/IngredientFlags.tsx — Consolidated flags list
import React from "react"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Flag } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IngredientFlagsProps {
  flags: Flag[]
}

export default function IngredientFlags({ flags }: IngredientFlagsProps) {
  if (flags.length === 0) return null

  // Sort flags by severity: danger > warning > info
  const sortedFlags = [...flags].sort((a, b) => {
    const order = { danger: 0, warning: 1, info: 2 }
    return order[a.severity] - order[b.severity]
  })

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        Ingredient Alerts & Flags
      </h3>
      
      <div className="grid gap-3">
        {sortedFlags.map((flag, i) => (
          <div 
            key={i} 
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all",
              flag.severity === 'danger' ? "bg-red-50 border-red-500 border-y border-r" : 
              flag.severity === 'warning' ? "bg-amber-50 border-amber-500 border-y border-r" : 
              "bg-blue-50 border-blue-500 border-y border-r"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg shrink-0",
              flag.severity === 'danger' ? "bg-red-100 text-red-600" : 
              flag.severity === 'warning' ? "bg-amber-100 text-amber-600" : 
              "bg-blue-100 text-blue-600"
            )}>
              {flag.severity === 'danger' ? <AlertCircle className="h-5 w-5" /> : 
               flag.severity === 'warning' ? <AlertTriangle className="h-5 w-5" /> : 
               <Info className="h-5 w-5" />}
            </div>
            
            <div className="space-y-1">
              <p className="font-bold text-slate-900 uppercase tracking-tight">{flag.ingredient}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{flag.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
