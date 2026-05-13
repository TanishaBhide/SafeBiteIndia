// SafeBite India — components/home/WhySafeBite.tsx — Key value propositions
import { ShieldCheck, HeartPulse, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Biosafety Aware",
    description: "Evaluates GMO ingredients and biosafety protocols under EPA 1986 and Cartagena Protocol.",
    icon: Globe,
  },
  {
    title: "FSSAI Aligned",
    description: "Built strictly around the Food Safety and Standards Authority of India (FSSAI) Act 2006.",
    icon: ShieldCheck,
  },
  {
    title: "Ethics Conscious",
    description: "Scores products on ethical sourcing, transparency, and environmental impact like palm oil usage.",
    icon: HeartPulse,
  },
]

export default function WhySafeBite() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SafeBite?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Standard nutrition labels don't tell the whole story. We bridge the gap between compliance and ethics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
