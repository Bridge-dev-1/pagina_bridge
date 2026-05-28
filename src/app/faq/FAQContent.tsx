"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, HelpCircle } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

export default function FAQContent() {
  const { lang, setLang, tr } = useLang();
  const f = tr.faq;
  const otherLang: Lang = lang === "ja" ? "es" : "ja";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen gradient-section">
      {/* Top bar */}
      <div className="bg-[#0f2347] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{lang === "ja" ? "トップへ戻る" : "Volver al inicio"}</span>
          </Link>
          <button
            onClick={() => setLang(otherLang)}
            className="text-xs font-semibold border border-white/30 text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-colors"
          >
            {lang === "ja" ? "ES" : "日本語"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <HelpCircle size={22} className="text-white" />
            </div>
            <div>
              <span className="text-[#4A9FD4] text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
                {f.label}
              </span>
              <h1 className="text-3xl font-bold gradient-text font-[var(--font-noto)]">
                {f.title}
              </h1>
            </div>
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] rounded-full mb-4" />
          <p className="text-gray-500 text-sm font-[var(--font-noto)] leading-relaxed">
            {f.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {f.items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400 font-[var(--font-noto)] mb-4">
            {lang === "ja"
              ? "その他ご不明な点はお気軽にお問い合わせください。"
              : "Para otras consultas, no dude en contactarnos."}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#4A9FD4] hover:bg-[#1B3A6B] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {lang === "ja" ? "お問い合わせ" : "Contáctenos"}
          </Link>
        </div>
      </div>
    </div>
  );
}
