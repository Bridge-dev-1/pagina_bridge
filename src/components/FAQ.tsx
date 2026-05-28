"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import ScrollReveal from "./ScrollReveal";

export default function FAQ() {
  const { tr } = useLang();
  const f = tr.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-20 gradient-section">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-[#4A9FD4] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              {f.label}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
              {f.title}
            </h2>
            <p className="text-gray-500 text-sm font-[var(--font-noto)] max-w-xl mx-auto leading-relaxed">
              {f.subtitle}
            </p>
            <div className="mt-5 w-12 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] rounded-full mx-auto" />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {f.items.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#1B3A6B] text-sm leading-snug font-[var(--font-noto)]">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-[#4A9FD4] transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-gradient-to-r from-[#4A9FD4]/30 to-transparent mb-4" />
                    <p className="text-gray-600 text-sm leading-relaxed font-[var(--font-noto)]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
