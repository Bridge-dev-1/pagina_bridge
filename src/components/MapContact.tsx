"use client";

import Link from "next/link";
import { MapPin, Mail, MessageCircle, Bot } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function MapContact() {
  const { tr } = useLang();
  const c = tr.contact;

  return (
    <section id="contact" className="py-16 md:py-24 gradient-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#4A9FD4] text-sm font-semibold tracking-[0.25em] uppercase block mb-3">
            {c.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
            {c.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: info + map */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 md:p-8 space-y-5">
              <h3 className="text-xl font-bold text-[#1B3A6B] font-[var(--font-noto)] mb-6">
                {c.companyInfo}
              </h3>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0">
                  <MapPin size={18} className="text-[#4A9FD4]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1 font-[var(--font-noto)]">{c.addressLabel}</p>
                  <p className="text-[#1A1A2E] font-medium font-[var(--font-noto)] text-sm leading-relaxed whitespace-pre-line">
                    {c.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0">
                  <Mail size={18} className="text-[#4A9FD4]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <a href="mailto:info@bridgeservice.co.jp" className="text-[#1B3A6B] font-medium hover:text-[#4A9FD4] transition-colors text-sm">
                    info@bridgeservice.co.jp
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <a
                  href="https://www.facebook.com/bridge.servic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 hover:bg-[#1B3A6B] hover:text-white text-[#1B3A6B] text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 h-56">
              <iframe
                src="https://maps.google.com/maps?q=神奈川県相模原市南区東林間5-18-13&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bridge Service Location"
              />
            </div>
          </div>

          {/* Right: chatbot CTA */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 md:p-10 flex flex-col items-center justify-center text-center gap-7">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] rounded-3xl flex items-center justify-center shadow-xl shadow-[#4A9FD4]/30">
              <Bot size={46} className="text-white" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-[#1B3A6B] font-[var(--font-noto)]">
                {c.chatTitle}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-[var(--font-noto)] whitespace-pre-line max-w-xs mx-auto">
                {c.chatDesc}
              </p>
            </div>

            <Link
              href="/trabajo"
              className="w-full bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] hover:from-[#4A9FD4] hover:to-[#1B3A6B] text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#4A9FD4]/20 text-base"
            >
              <MessageCircle size={20} />
              {c.chatBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
