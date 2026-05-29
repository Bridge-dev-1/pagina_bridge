"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function Attorneys() {
  const { tr } = useLang();
  const a = tr.attorneys;

  return (
    <section id="attorneys" className="py-16 md:py-24 gradient-section">
      <div className="max-w-6xl mx-auto px-6">

        <ScrollReveal className="text-center mb-10 md:mb-16">
          <span className="text-[#4A9FD4] text-sm font-semibold tracking-[0.25em] uppercase block mb-3">
            {a.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
            {a.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={100}>
            <motion.div
              className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(27,58,107,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-2 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]" />
              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-white select-none">T</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[#4A9FD4] text-sm font-semibold tracking-widest uppercase mb-2">
                      {a.role}
                    </p>
                    <h3 className="text-3xl font-bold text-[#1B3A6B] mb-1 font-[var(--font-noto)]">
                      高橋 ホセ
                    </h3>
                    <p className="text-gray-400 text-lg mb-6">Takahashi José</p>
                    <p className="text-gray-500 leading-relaxed font-[var(--font-noto)] text-sm">
                      {a.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-center text-xs text-gray-400 font-[var(--font-noto)]">
                {a.licenseText}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
