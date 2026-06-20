// SafeBite India — app/page.tsx — Home Page
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Heart, ArrowRight, ScanLine, Leaf, Globe } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <main className="flex-1 flex flex-col relative z-10">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-primary/10 via-emerald-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-40 -right-20 w-[30rem] h-[30rem] bg-teal-400/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="container px-4 py-24 md:py-32 mx-auto max-w-6xl flex flex-col items-center text-center space-y-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-slate-200/60 shadow-sm backdrop-blur-md text-sm font-bold text-slate-700 animate-fade-in-up">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Protecting India's Health, One Bite At A Time</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] animate-fade-in-up animation-delay-100">
            What's really in your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">
              daily food?
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-600 font-medium leading-relaxed animate-fade-in-up animation-delay-200">
            Decode complex food labels, detect harmful additives, and ensure the safety of your meals instantly with our AI-powered food inspector built specifically for Indian standards.
          </p>

          <div className="pt-4 animate-fade-in-up animation-delay-300">
            <button
              onClick={() => router.push('/scanner')}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-white bg-slate-900 rounded-full overflow-hidden shadow-2xl shadow-slate-900/30 hover:scale-[1.02] hover:shadow-slate-900/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ScanLine className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Scan My Meal</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Free forever • No sign-up required
            </p>
          </div>
        </div>

        {/* ── MISSION & OBJECTIVE SECTION ── */}
        <div className="container px-4 py-24 mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Objective Card */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-[40px] p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Globe className="w-32 h-32 text-primary" />
              </div>
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Our Objective</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                To empower consumers with complete transparency about the food they consume. We cut through the marketing jargon, confusing E-codes, and hidden sugars to provide a clear, unbiased safety rating for every packaged product and cooked meal.
              </p>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-slate-900 backdrop-blur-xl rounded-[40px] p-10 md:p-14 shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Leaf className="w-32 h-32 text-white" />
              </div>
              {/* Decorative gradient inside the dark card */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/30 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-8 text-white relative z-10">
                <Leaf className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-white mb-6 relative z-10">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed text-lg font-medium relative z-10">
                To foster a healthier society by making food safety accessible to everyone. By highlighting ultra-processed foods and suggesting traditional, healthier Indian alternatives, we aim to combat the rising tide of lifestyle diseases.
              </p>
            </div>

          </div>
        </div>

        {/* ── THE "SOMETHING NICE" / PHILOSOPHY SECTION ── */}
        <div className="container px-4 py-24 mx-auto max-w-4xl text-center">
          <div className="relative">
            <span className="text-8xl font-serif absolute -top-12 -left-8 text-primary/10 select-none">"</span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Food is meant to nourish, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                not harm.
              </span>
            </h3>
            <span className="text-8xl font-serif absolute -bottom-16 -right-8 text-orange-500/10 select-none">"</span>
          </div>
          <p className="mt-8 text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We believe that every individual deserves the right to know exactly what goes into their body. This project is dedicated to bringing awareness back to our plates, bridging the gap between ancient dietary wisdom and modern convenience.
          </p>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full py-8 mt-auto border-t border-slate-200/60 bg-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <p className="flex items-center gap-2 text-slate-600 font-bold text-sm tracking-wide">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> for India
          </p>
          <p className="text-xs text-slate-400 font-medium">
            SafeBite India © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Basic animations for the hero section */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
      `}} />
    </div>
  )
}