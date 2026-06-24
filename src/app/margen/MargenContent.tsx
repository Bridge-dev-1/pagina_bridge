"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const ja = { back: "トップへ戻る" };
const es = { back: "Volver al inicio" };

export default function MargenContent() {
  const { lang } = useLang();
  const c = lang === "ja" ? ja : es;
  const [src, setSrc] = useState("");

  useEffect(() => {
    const pdf = encodeURIComponent(`${window.location.origin}/porcentaje_de_margen.pdf`);
    setSrc(`https://docs.google.com/viewer?url=${pdf}&embedded=true`);
  }, []);

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      {/* Top bar */}
      <div className="bg-[#0f2347] py-4 px-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
        </div>
      </div>

      {/* Viewer — Google Docs renders the PDF on all devices including mobile */}
      {src ? (
        <iframe
          src={src}
          title="マージン率"
          className="flex-1 w-full border-0 bg-white"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center gradient-section">
          <div className="w-8 h-8 border-4 border-[#4A9FD4] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
