"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLang } from "@/contexts/LangContext";

export default function Hero() {
  const { tr } = useLang();
  const h = tr.hero;
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center hero-overlay overflow-hidden"
    >
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform z-[1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A9FD4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7CC4E8]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8 animate-float">
          <Image
            src="/logo.png"
            alt="Bridge Service"
            width={100}
            height={100}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#7CC4E8] animate-pulse" />
          <span className="text-[#7CC4E8] text-sm font-medium tracking-widest uppercase">
            {h.badge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 animate-fadeInUp leading-tight tracking-tight">
          {h.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CC4E8] to-[#4A9FD4]">
            {h.titleAccent}
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-white/70 mb-3 animate-fadeInUp delay-100 font-[var(--font-noto)]">
          {h.subtitle}
        </p>

        <p className="max-w-2xl mx-auto text-white/60 text-base md:text-lg mb-10 animate-fadeInUp delay-200 leading-relaxed font-[var(--font-noto)]">
          {h.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
          <a
            href="#contact"
            className="btn-glow-blue bg-[#4A9FD4] hover:bg-white hover:text-[#1B3A6B] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#4A9FD4]/30"
          >
            {h.ctaPrimary}
          </a>
          <a
            href="#services"
            className="btn-glow-white border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm"
          >
            {h.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn delay-500">
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
