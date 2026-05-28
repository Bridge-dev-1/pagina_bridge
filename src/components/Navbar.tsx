"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "ja", label: "日本語", short: "JA" },
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
];

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLLIElement>(null);

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
            <p className={`font-bold text-sm tracking-wide ${scrolled ? "text-[#1B3A6B]" : "text-white"}`}>
              Bridge Service
            </p>
            <p className={`text-xs ${scrolled ? "text-[#4A9FD4]" : "text-[#7CC4E8]"}`}>
              株式会社ブリッジサービス
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav-link text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#1A1A2E] hover:text-[#1B3A6B]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Language dropdown */}
          <li className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                scrolled
                  ? "border-[#1B3A6B]/30 text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white"
                  : "border-white/30 text-white/80 hover:bg-white/10"
              }`}
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

          <li>
            <a
              href="#contact"
              className="bg-[#4A9FD4] hover:bg-[#1B3A6B] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300"
            >
              {tr.nav.cta}
            </a>
          </li>
          <li>
            <a
              href="/trabajo"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors duration-300 font-[var(--font-noto)]"
            >
              {tr.nav.jobs}
            </a>
          </li>
        </ul>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            className={`p-2 rounded-lg ${scrolled ? "text-[#1B3A6B]" : "text-white"}`}
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
          {/* Language selector row */}
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
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#4A9FD4] text-white font-medium px-5 py-2 rounded-full hover:bg-[#1B3A6B] transition-colors"
              >
                {tr.nav.cta}
              </a>
              <a
                href="/trabajo"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#25D366] text-white font-bold px-5 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-[var(--font-noto)]"
              >
                {tr.nav.jobs}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
