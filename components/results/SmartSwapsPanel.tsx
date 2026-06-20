// SafeBite India — components/results/SmartSwapsPanel.tsx — Healthier Ingredient Swaps Panel
import React from "react"
import { ArrowRight, Droplets, Wheat, Candy, Milk, ShoppingBag, Dumbbell, Leaf } from "lucide-react"

interface Swap {
  original: string
  swap: string
  reason: string
  category: 'oils' | 'grains' | 'sweeteners' | 'dairy' | 'snacks' | 'protein' | 'general'
}

interface SmartSwapsPanelProps {
  swaps: Swap[]
}

const categoryConfig: Record<string, { icon: React.ElementType; label: string; bg: string; border: string; iconColor: string; badge: string }> = {
  oils: {
    icon: Droplets,
    label: 'Oils & Fats',
    bg: 'from-amber-950/80 to-orange-950/80',
    border: 'border-amber-700/40',
    iconColor: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  grains: {
    icon: Wheat,
    label: 'Grains & Millets',
    bg: 'from-lime-950/80 to-green-950/80',
    border: 'border-lime-700/40',
    iconColor: 'text-lime-400',
    badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  },
  sweeteners: {
    icon: Candy,
    label: 'Sweeteners',
    bg: 'from-pink-950/80 to-rose-950/80',
    border: 'border-pink-700/40',
    iconColor: 'text-pink-400',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  },
  dairy: {
    icon: Milk,
    label: 'Dairy',
    bg: 'from-blue-950/80 to-indigo-950/80',
    border: 'border-blue-700/40',
    iconColor: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  snacks: {
    icon: ShoppingBag,
    label: 'Snacks',
    bg: 'from-purple-950/80 to-violet-950/80',
    border: 'border-purple-700/40',
    iconColor: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  protein: {
    icon: Dumbbell,
    label: 'Protein',
    bg: 'from-cyan-950/80 to-teal-950/80',
    border: 'border-cyan-700/40',
    iconColor: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  general: {
    icon: Leaf,
    label: 'General',
    bg: 'from-emerald-950/80 to-green-950/80',
    border: 'border-emerald-700/40',
    iconColor: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
}

export default function SmartSwapsPanel({ swaps }: SmartSwapsPanelProps) {
  if (!swaps || swaps.length === 0) return null

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <ArrowRight className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight text-white">Smart Ingredient Swaps</h3>
          <p className="text-xs text-slate-400 font-medium">Indian-context healthier alternatives, ingredient by ingredient</p>
        </div>
      </div>

      {/* Swap cards grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {swaps.map((swap, i) => {
          const config = categoryConfig[swap.category] || categoryConfig.general
          const Icon = config.icon

          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bg} border ${config.border} p-5 shadow-md group hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Category badge */}
              <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${config.badge}`}>
                <Icon className="h-3 w-3" />
                {config.label}
              </div>

              {/* Swap flow */}
              <div className="space-y-3">
                {/* Original — crossed out */}
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-0.5 shrink-0 w-14">Instead of</span>
                  <span className="text-sm font-bold text-slate-400 line-through leading-snug">{swap.original}</span>
                </div>

                {/* Arrow divider */}
                <div className="flex items-center gap-2 pl-16">
                  <ArrowRight className={`h-4 w-4 ${config.iconColor}`} />
                </div>

                {/* Swap — highlighted */}
                <div className="flex items-start gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-0.5 shrink-0 w-14 ${config.iconColor}`}>Choose</span>
                  <span className="text-sm font-black text-white leading-snug">{swap.swap}</span>
                </div>
              </div>

              {/* Reason */}
              <p className="mt-4 text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                {swap.reason}
              </p>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
        <Leaf className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
        <p className="text-xs text-emerald-700 leading-relaxed font-medium">
          These swaps are based on Indian traditional food wisdom (Ayurveda & FSSAI nutritional guidelines). 
          Small, consistent changes — like replacing refined oil with cold-pressed or maida with millet flour — 
          can significantly reduce disease risk over time.
        </p>
      </div>
    </div>
  )
}
