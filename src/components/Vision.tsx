"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function Vision() {
  const { tr } = useLang();
  const v = tr.vision;

  return (
    <section id="vision" className="py-16 md:py-24 gradient-section relative overflow-hidden">
      {/* Background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <Image
          src="/logo.png"
          alt=""
          width={480}
          height={480}
          className="opacity-[0.05] object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-16">
          <h2 className="text-sm font-bold gradient-text mb-4 font-[var(--font-noto)] tracking-wide text-balance break-keep">
            {v.title}
          </h2>
          <p className="text-[#1B3A6B] text-3xl md:text-5xl font-semibold whitespace-pre-line mb-4 font-[var(--font-noto)] break-keep">
            {v.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left */}
          <ScrollReveal direction="left">
            <blockquote className="relative">
              <span className="absolute -top-4 -left-4 text-8xl text-[#4A9FD4]/10 font-serif leading-none select-none">
                "
              </span>
              <p className="text-lg md:text-3xl font-bold text-[#1B3A6B] leading-relaxed mb-6 font-[var(--font-noto)] relative z-10 whitespace-pre-line">
                {v.quote}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-[var(--font-noto)]">
                {v.body}
              </p>
            </blockquote>

            <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm border border-blue-50">
              {v.detailLabel && (
                <p className="text-xs font-bold text-[#4A9FD4] tracking-widest uppercase mb-2">
                  {v.detailLabel}
                </p>
              )}
              <p className="text-gray-500 text-sm leading-relaxed font-[var(--font-noto)]">
                {v.detail}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {v.stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 100} direction="right">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-blue-50 card-hover text-center h-full">
                  <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{s.num}</p>
                  <p className="text-[#1B3A6B] font-semibold text-xs sm:text-sm font-[var(--font-noto)] text-balance break-keep">
                    {s.label}
                  </p>
                  <p className="text-gray-400 text-[0.65rem] sm:text-xs mt-0.5 text-balance break-keep">{s.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
