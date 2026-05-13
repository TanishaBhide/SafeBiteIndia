// SafeBite India — components/layout/Footer.tsx — Footer component
import { ShieldCheck } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-8 mt-auto">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>Built for Biosafety Standards & Ethics | Data is illustrative</span>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SafeBite India. Educational Project.
          </div>
        </div>
        <div className="mt-4 text-center text-[10px] text-muted-foreground/50 max-w-2xl mx-auto">
          Disclaimer: This application uses AI to analyze food labels based on rule-based logic and LLM extraction. 
          It is for educational purposes only and should not replace professional medical or nutritional advice.
        </div>
      </div>
    </footer>
  )
}
