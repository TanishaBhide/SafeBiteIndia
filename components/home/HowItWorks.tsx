// SafeBite India — components/home/HowItWorks.tsx — Step-by-step process
import { Upload, Cpu, BarChart4 } from "lucide-react"

const steps = [
  {
    title: "Upload Label",
    description: "Snap a photo of any packaged food ingredient list or enter the text manually.",
    icon: Upload,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI Analysis",
    description: "Our AI extracts ingredients and cross-references them with Indian safety standards.",
    icon: Cpu,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Get Safety Score",
    description: "Receive a detailed breakdown of nutrition, additives, GMO risks, and ethics.",
    icon: BarChart4,
    color: "bg-green-100 text-green-600",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our three-step process ensures you have all the information needed to make informed choices.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${step.color}`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-[-20px] top-[100px] text-muted-foreground/20">
                  <svg width="40" height="2" viewBox="0 0 40 2" fill="none">
                    <line x1="0" y1="1" x2="40" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
