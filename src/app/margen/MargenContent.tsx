"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const ja = {
  back: "トップへ戻る",
  title: "マージン率等の情報提供",
  desc: "労働者派遣法第23条の2の規定に基づき、情報を公開しております。",
  open: "PDFを開く",
};

const es = {
  back: "Volver al inicio",
  title: "Información de Tasas de Margen",
  desc: "Información divulgada conforme al Artículo 23-2 de la Ley de Despacho de Trabajadores.",
  open: "Abrir PDF",
};

export default function MargenContent() {
  const { lang } = useLang();
  const c = lang === "ja" ? ja : es;

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      {/* Top bar */}
      <div className="bg-[#0f2347] py-4 px-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
        </div>
      </div>

      {/* Mobile: open PDF in native viewer */}
      <div className="flex flex-col items-center justify-center flex-1 gap-6 px-8 gradient-section md:hidden">
        <div className="w-20 h-20 bg-[#1B3A6B]/10 rounded-2xl flex items-center justify-center">
          <FileText size={40} className="text-[#1B3A6B]" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#1B3A6B] font-[var(--font-noto)] mb-3">{c.title}</h1>
          <p className="text-gray-500 text-sm font-[var(--font-noto)] leading-relaxed">{c.desc}</p>
        </div>
        <a
          href="/porcentaje_de_margen.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#4A9FD4] text-white font-semibold px-8 py-4 rounded-full transition-colors"
        >
          <ExternalLink size={18} />
          {c.open}
        </a>
      </div>

      {/* Desktop: embedded PDF iframe */}
      <iframe
        src="/porcentaje_de_margen.pdf#toolbar=0&navpanes=0&scrollbar=0"
        title="マージン率"
        className="hidden md:block flex-1 w-full bg-white border-0"
      />
    </div>
  );
}
