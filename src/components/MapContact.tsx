"use client";

import { useState } from "react";
import { MapPin, Mail, Send } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function MapContact() {
  const { tr } = useLang();
  const c = tr.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`お問い合わせ: ${form.name}`);
    const body = encodeURIComponent(
      `お名前: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:info@bridgeservice.co.jp?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 gradient-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#4A9FD4] text-sm font-semibold tracking-[0.25em] uppercase block mb-3">
            {c.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-[var(--font-noto)]">
            {c.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: info + map */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 space-y-5">
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
                  href="https://www.facebook.com/bridgeservice.co.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 hover:bg-[#1B3A6B] hover:text-white text-[#1B3A6B] text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  <FacebookIcon />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/bridgeservice.co.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 hover:bg-[#1B3A6B] hover:text-white text-[#1B3A6B] text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.8!2d139.4283!3d35.5561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTUuNTU2MSwgMTM5LjQyODM!5e0!3m2!1sja!2sjp!4v1"
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

          {/* Right: form */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-[#1B3A6B] font-[var(--font-noto)] mb-6">
              {c.formTitle}
            </h3>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <Send size={28} className="text-green-500" />
                </div>
                <p className="text-[#1B3A6B] font-bold text-lg font-[var(--font-noto)]">
                  {c.successTitle}
                </p>
                <p className="text-gray-400 text-sm text-center font-[var(--font-noto)] whitespace-pre-line">
                  {c.successMsg}
                </p>
                <button onClick={() => setSent(false)} className="text-[#4A9FD4] text-sm hover:underline">
                  {c.back}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-[var(--font-noto)]">
                    {c.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.namePlaceholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#4A9FD4] focus:ring-2 focus:ring-[#4A9FD4]/20 transition-all font-[var(--font-noto)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    {c.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={c.emailPlaceholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#4A9FD4] focus:ring-2 focus:ring-[#4A9FD4]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-[var(--font-noto)]">
                    {c.msgLabel}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={c.msgPlaceholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#4A9FD4] focus:ring-2 focus:ring-[#4A9FD4]/20 transition-all resize-none font-[var(--font-noto)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] hover:from-[#4A9FD4] hover:to-[#1B3A6B] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#4A9FD4]/20"
                >
                  <Send size={16} />
                  {c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
