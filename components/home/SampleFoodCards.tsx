// SafeBite India — components/home/SampleFoodCards.tsx — Illustrative demo cards
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SAMPLE_RESULTS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function SampleFoodCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sample Analysis</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how common Indian products score across our biosafety axes. (Illustrative data)
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SAMPLE_RESULTS.map((product, i) => (
            <Card key={i} className="group overflow-hidden border-2 hover:border-primary/20 transition-all">
              <CardHeader className="bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-white">Sample</Badge>
                  <Badge variant={product.overallLevel} className="capitalize">
                    {product.overallLevel}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {product.productName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Safety Score</span>
                    <span className={cn(
                      "font-bold text-lg",
                      product.overallLevel === 'good' ? "text-score-good" : 
                      product.overallLevel === 'moderate' ? "text-score-moderate" : "text-score-poor"
                    )}>
                      {product.overallScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        product.overallLevel === 'good' ? "bg-score-good" : 
                        product.overallLevel === 'moderate' ? "bg-score-moderate" : "bg-score-poor"
                      )}
                      style={{ width: `${product.overallScore}%` }}
                    />
                  </div>
                  <ul className="text-xs space-y-2 text-muted-foreground mt-4">
                    {product.recommendations.slice(0, 2).map((rec: string, j: number) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-primary">•</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
