// SafeBite India — app/page.tsx — Home Page
import HeroSection from "@/components/home/HeroSection"
import HowItWorks from "@/components/home/HowItWorks"
import WhySafeBite from "@/components/home/WhySafeBite"
import SampleFoodCards from "@/components/home/SampleFoodCards"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      <WhySafeBite />
      <SampleFoodCards />
      
      {/* Educational Footer Banner */}
      <section className="py-12 bg-score-good text-white">
        <div className="container px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Empowering Indian Consumers</h3>
          <p className="max-w-2xl mx-auto opacity-90 leading-relaxed">
            SafeBite India is part of a college initiative to improve food transparency and biosafety awareness. 
            Join us in making India healthier, one scan at a time.
          </p>
        </div>
      </section>
    </div>
  )
}
