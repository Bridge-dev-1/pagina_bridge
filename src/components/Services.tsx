"use client";

import Image from "next/image";
import { Users, Handshake, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import ScrollReveal from "@/components/ScrollReveal";

const icons = [Users, Handshake];
const colors = ["from-[#1B3A6B] to-[#2a5298]", "from-[#2a5298] to-[#4A9FD4]"];

export default function Services() {
  const { tr } = useLang();
  const s = tr.services;

  return (
    <section id="services" className="py-16 md:py-24 section-light-glass relative overflow-hidden">
      {/* Background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <Image
          src="/logo.png"
          alt=""
          width={520}
          height={520}
          className="opacity-[0.04] object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <ScrollReveal className="text-center mb-10 md:mb-16">
          <span className="text-[#4A9FD4] text-sm font-semibold tracking-[0.25em] uppercase block mb-3">
            {s.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
            {s.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
          <p className="mt-6 text-gray-500 max-w-xl mx-auto font-[var(--font-noto)] whitespace-pre-line">
            {s.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <ScrollReveal key={item.num} delay={i * 150} direction={i === 0 ? "left" : "right"}>
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 h-full"
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(27,58,107,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`h-2 bg-gradient-to-r ${color}`} />
                  <div className="p-5 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-6xl font-black text-gray-50 select-none leading-none">
                        {item.num}
                      </span>
                      <div className={`bg-gradient-to-br ${color} p-3 rounded-2xl shadow-lg`}>
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B3A6B] mb-1 font-[var(--font-noto)]">
                      {item.title}
                    </h3>
                    <p className="text-[#4A9FD4] text-sm font-medium mb-2">{item.titleEn}</p>
                    {item.license && (
                      <p className="text-xs text-gray-400 mb-4 font-[var(--font-noto)]">
                        {item.license}
                      </p>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-6 font-[var(--font-noto)] text-sm whitespace-pre-line">
                      {item.desc}
                    </p>
                    <ul className="space-y-2">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-gray-600 font-[var(--font-noto)]">
                          <CheckCircle size={16} className="text-[#4A9FD4] flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {item.tags.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-blue-50">
                        <p className="text-xs font-bold text-[#4A9FD4] tracking-widest uppercase mb-3">
                          {item.tagsLabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-[#4A9FD4]/10 text-[#1B3A6B] text-xs font-medium font-[var(--font-noto)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
