"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function Footer() {
  const { lang, tr } = useLang();
  const f = tr.footer;

  const navLinks = [
    { label: tr.nav.home, href: "#home" },
    { label: tr.nav.vision, href: "#vision" },
    { label: tr.nav.services, href: "#services" },
    { label: tr.nav.attorneys, href: "#attorneys" },
    { label: tr.nav.faq, href: "/faq" },
    { label: tr.nav.margin, href: "/margen" },
    { label: tr.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="section-dark-glass text-white relative z-[1]">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14 grid md:grid-cols-3 gap-8 md:gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="Bridge Service" width={44} height={44} className="object-contain" />
            <div>
              <p className="font-bold text-sm">Bridge Service</p>
              <p className="text-[#7CC4E8] text-xs">株式会社ブリッジサービス</p>
            </div>
          </div>
          <p className="text-white/50 text-xs leading-relaxed font-[var(--font-noto)] whitespace-pre-line">
            {f.tagline}
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://www.facebook.com/bridge.servic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 hover:bg-[#4A9FD4] rounded-full flex items-center justify-center transition-colors"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-semibold text-[#4A9FD4] tracking-widest uppercase mb-4">
            {f.nav}
          </p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/60 hover:text-white text-sm transition-colors font-[var(--font-noto)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold text-[#4A9FD4] tracking-widest uppercase mb-4">
            {f.contact}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-white/60 text-sm">
              <span className="mt-0.5">📍</span>
              <span className="font-[var(--font-noto)] leading-relaxed whitespace-pre-line">
                {f.address}
              </span>
            </li>
            <li>
              <a href="mailto:info@bridgeservice.co.jp" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                <Mail size={13} />
                info@bridgeservice.co.jp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p className="font-[var(--font-noto)]">
            {f.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <div className="flex items-center gap-4">
            <p>{f.license}</p>
            <span className="text-white/10">|</span>
            <a href="/privacy" className="text-white/30 hover:text-white/60 transition-colors font-[var(--font-noto)]">
              {lang === "ja" ? "個人情報保護方針" : "Política de Privacidad"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
