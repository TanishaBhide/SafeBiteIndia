// SafeBite India — components/results/NutritionTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface NutritionFacts {
  calories?: number;
  protein?: number;
  carbs?: number;
  sugar?: number;
  fat?: number;
  saturatedFat?: number;
  transFat?: number;
  sodium?: number;
  fibre?: number;
}

interface NutritionTableProps {
  facts: NutritionFacts;
}

export default function NutritionTable({ facts }: NutritionTableProps) {
  const rows = [
    { label: 'Energy', value: facts.calories, unit: 'kcal' },
    { label: 'Protein', value: facts.protein, unit: 'g' },
    { label: 'Total Carbohydrates', value: facts.carbs, unit: 'g' },
    { label: '  of which Sugar', value: facts.sugar, unit: 'g', indent: true },
    { label: '  Dietary Fibre', value: facts.fibre, unit: 'g', indent: true },
    { label: 'Total Fat', value: facts.fat, unit: 'g' },
    { label: '  Saturated Fat', value: facts.saturatedFat, unit: 'g', indent: true },
    { label: '  Trans Fat', value: facts.transFat, unit: 'g', indent: true, hazard: (facts.transFat || 0) > 0 },
    { label: 'Sodium', value: facts.sodium, unit: 'mg' },
  ].filter(r => r.value !== undefined);

  if (rows.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Nutritional Information</h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Typical values per 100g</p>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-900">Nutrient</TableHead>
              <TableHead className="text-right font-bold text-slate-900">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="hover:bg-slate-50/50">
                <TableCell className={cn(
                  row.indent ? 'pl-8 text-slate-500 italic' : 'font-medium text-slate-700',
                  (row as any).hazard && 'text-red-600 font-black not-italic'
                )}>
                  {row.label}
                </TableCell>
                <TableCell className={cn(
                  "text-right font-bold text-slate-900",
                  (row as any).hazard && 'text-red-600'
                )}>
                  {row.value}{row.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed italic">
        *Data extracted from product label by AI. Actual values may vary. Refer to physical packaging for final confirmation.
      </p>
    </div>
  );
}
