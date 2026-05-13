// SafeBite India — components/results/EthicsPanel.tsx — Biosafety & Regulations
import React from "react"
import { ShieldCheck, Scale, Globe, FlaskConical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EthicsPanelProps {
  notes: string[]
}

export default function EthicsPanel({ notes }: EthicsPanelProps) {
  return (
    <div className="space-y-8 py-8 border-t">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl font-bold">Biosafety & Ethical Analysis</h3>
        <p className="text-muted-foreground">Detailed observations based on Indian regulatory frameworks and international protocols.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Specific observations */}
        <div className="space-y-4">
          <h4 className="font-bold flex items-center gap-2 text-primary">
            <FlaskConical className="h-5 w-5" /> Product Observations
          </h4>
          <ul className="space-y-3">
            {notes.map((note, i) => (
              <li key={i} className="text-sm p-4 rounded-xl bg-white border border-slate-100 shadow-sm leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Regulatory Context (Syllabus Integration) */}
        <div className="space-y-4">
          <h4 className="font-bold flex items-center gap-2 text-slate-700">
            <ShieldCheck className="h-5 w-5" /> Regulatory Framework
          </h4>
          <div className="grid gap-4">
            <Card className="border-none shadow-sm bg-slate-50">
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-white text-primary shadow-sm shrink-0">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">EPA 1986</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Governs the manufacture, use, import, export and storage of hazardous microorganisms/genetically engineered organisms or cells in India.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50">
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-white text-primary shadow-sm shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Cartagena Protocol</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    India is a signatory to this international treaty on biosafety, which regulates the movement of Living Modified Organisms (LMOs).
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Precautionary Principle</p>
              <p className="text-[11px] italic text-slate-500">
                "Where there are threats of serious or irreversible damage, lack of full scientific certainty shall not be used as a reason for postponing cost-effective measures to prevent environmental degradation."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
