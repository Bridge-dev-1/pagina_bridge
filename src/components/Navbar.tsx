"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "ja", label: "日本語", short: "JA" },
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
];

export default function Navbar({ mode }: { mode?: "empresa" }) {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLLIElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const links = [
    { label: tr.nav.home, href: "#home" },
    { label: tr.nav.vision, href: "#vision" },
    { label: tr.nav.services, href: "#services" },
    { label: tr.nav.attorneys, href: "#attorneys" },
    { label: tr.nav.faq, href: "/faq" },
    { label: tr.nav.margin, href: "/margen" },
    { label: tr.nav.contact, href: "#contact" },
  ];

  const currentLang = LANG_OPTIONS.find((o) => o.code === lang)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Back button — empresa only */}
        {mode === "empresa" && (
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium mr-3 transition-colors text-[#1B3A6B]/60 hover:text-[#1B3A6B]"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline font-[var(--font-noto)]">戻る</span>
          </a>
        )}

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Bridge Service Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="leading-tight">
            <p className="font-bold text-sm tracking-wide text-[#1B3A6B]">
              株式会社ブリッジサービス
            </p>
            <p className="text-xs text-[#4A9FD4]">
              Bridge Service
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm font-medium transition-colors text-[#1A1A2E] hover:text-[#1B3A6B]"
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Language dropdown — hidden on empresa pages */}
          {!mode && (
            <li className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all border-[#1B3A6B]/30 text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white"
                aria-label="Select language"
              >
                <Globe size={12} />
                {currentLang.short}
                <ChevronDown size={11} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[130px] z-50">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-blue-50 ${
                        lang === opt.code
                          ? "text-[#1B3A6B] font-semibold"
                          : "text-[#1A1A2E]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          )}

          <li>
            <a
              href={mode === "empresa" ? "#contact" : "/trabajo"}
              className="btn-glow-blue bg-[#4A9FD4] hover:bg-[#1B3A6B] text-white text-sm font-medium px-5 py-2 rounded-full"
            >
              {tr.nav.cta}
            </a>
          </li>
          {!mode && (
            <li>
              <a
                href="/trabajo"
                className="btn-glow-green bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-5 py-2 rounded-full font-[var(--font-noto)]"
              >
                {tr.nav.jobs}
              </a>
            </li>
          )}
        </ul>

        {/* Mobile: lang dropdown + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {!mode && (
            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all border-[#1B3A6B]/30 text-[#1B3A6B]"
                aria-label="Select language"
              >
                <Globe size={12} />
                {currentLang.short}
                <ChevronDown size={11} className={`transition-transform ${mobileLangOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[130px] z-50">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setMobileLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 ${
                        lang === opt.code ? "text-[#1B3A6B] font-semibold" : "text-[#1A1A2E]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            className="p-2 rounded-lg text-[#1B3A6B]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {/* Language selector row — hidden on empresa pages */}
          {!mode && (
            <div className="flex gap-2 px-6 pt-4 pb-1">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    lang === opt.code
                      ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                      : "border-[#1B3A6B]/30 text-[#1B3A6B] hover:bg-blue-50"
                  }`}
                >
                  {opt.short}
                </button>
              ))}
            </div>
          )}
          <ul className="flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-[#1A1A2E] hover:bg-blue-50 hover:text-[#1B3A6B] font-medium transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-6 pt-2 space-y-2">
              <a
                href={mode === "empresa" ? "#contact" : "/trabajo"}
                onClick={() => setOpen(false)}
                className="block text-center bg-[#4A9FD4] text-white font-medium px-5 py-2 rounded-full hover:bg-[#1B3A6B] transition-colors"
              >
                {tr.nav.cta}
              </a>
              {!mode && (
                <a
                  href="/trabajo"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-[#25D366] text-white font-bold px-5 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-[var(--font-noto)]"
                >
                  {tr.nav.jobs}
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
