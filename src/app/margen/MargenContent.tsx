"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const ja = {
  back: "トップへ戻る",
};

const es = {
  back: "Volver al inicio",
};

export default function MargenContent() {
  const { lang } = useLang();
  const c = lang === "ja" ? ja : es;

  return (
    <div className="min-h-screen gradient-section flex flex-col">
      <div className="bg-[#0f2347] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe
          src="/porcentaje_de_margen.pdf#toolbar=0&navpanes=0&scrollbar=0"
          title="マージン率"
          className="w-full h-full bg-white border-0"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
