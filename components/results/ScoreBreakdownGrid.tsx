// SafeBite India — components/results/ScoreBreakdownGrid.tsx — 2x3 Grid Layout
import React from "react"
import CriteriaScoreCard from "./CriteriaScoreCard"
import { CriterionScore } from "@/lib/types"

interface ScoreBreakdownGridProps {
  criteria: CriterionScore[]
}

export default function ScoreBreakdownGrid({ criteria }: ScoreBreakdownGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {criteria.map((item) => (
        <CriteriaScoreCard key={item.criterion} {...item} />
      ))}
    </div>
  )
}
