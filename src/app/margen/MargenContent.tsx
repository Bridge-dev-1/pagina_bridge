"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const ja = {
  back: "トップへ戻る",
  download: "PDFダウンロード",
};

const es = {
  back: "Volver al inicio",
  download: "Descargar PDF",
};

export default function MargenContent() {
  const { lang, setLang } = useLang();
  const c = lang === "ja" ? ja : es;
  const otherLang: Lang = lang === "ja" ? "es" : "ja";

  return (
    <div className="min-h-screen gradient-section flex flex-col">
      <div className="bg-[#0f2347] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(otherLang)}
              className="text-xs font-semibold border border-white/30 text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              {lang === "ja" ? "ES" : "日本語"}
            </button>
            <a
              href="/porcentaje_de_margen.pdf"
              download
              className="flex items-center gap-2 bg-[#4A9FD4] hover:bg-[#7CC4E8] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <Download size={13} />
              <span>{c.download}</span>
            </a>
          </div>
        </div>
      </div>

      <iframe
        src="/porcentaje_de_margen.pdf"
        title="マージン率"
        className="flex-1 w-full bg-white"
      />
    </div>
  );
}
