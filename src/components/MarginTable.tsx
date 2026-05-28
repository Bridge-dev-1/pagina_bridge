"use client";

import { Info } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function MarginTable() {
  const { tr } = useLang();
  const m = tr.margin;

  return (
    <section id="margin" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <ScrollReveal className="text-center mb-16">
          <span className="text-[#4A9FD4] text-sm font-semibold tracking-[0.25em] uppercase block mb-3">
            {m.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
            {m.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8">
            <Info size={18} className="text-[#4A9FD4] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#1B3A6B] font-[var(--font-noto)] leading-relaxed">
              {m.notice}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298]">
                  <th className="text-left text-white font-semibold px-6 py-4 font-[var(--font-noto)]">
                    {m.colItem}
                  </th>
                  <th className="text-left text-white font-semibold px-6 py-4 font-[var(--font-noto)]">
                    {m.colAmount}
                  </th>
                  <th className="text-left text-white/70 font-normal px-6 py-4 font-[var(--font-noto)] hidden md:table-cell">
                    {m.colNote}
                  </th>
                </tr>
              </thead>
              <tbody>
                {m.rows.map((row, i) => (
                  <tr
                    key={row.category}
                    className={`border-b border-gray-50 transition-colors hover:bg-blue-50/50 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-6 py-4 text-[#1B3A6B] font-medium font-[var(--font-noto)]">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-[var(--font-noto)]">
                      {row.amount}
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden md:table-cell font-[var(--font-noto)]">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 font-[var(--font-noto)]">
            {m.footNote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
