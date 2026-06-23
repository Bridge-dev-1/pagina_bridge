"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Building2, Users } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

export default function Hero({ variant = "selector" }: { variant?: "selector" | "empresa" }) {
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A9FD4]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7CC4E8]/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(27,58,107,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,107,0.15) 1px, transparent 1px)",
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

        {variant === "selector" ? (
          <>
            <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/5 backdrop-blur-sm border border-[#1B3A6B]/15 rounded-full px-4 py-1.5 mb-6 animate-fadeIn max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#4A9FD4] animate-pulse flex-shrink-0" />
              <span className="text-[#1B3A6B] text-[0.65rem] sm:text-[0.9625rem] font-medium tracking-tight sm:tracking-widest whitespace-nowrap">
                人材派遣・職業紹介 · Recruitment Agency
              </span>
            </div>

            <h1 className="text-2xl sm:text-[3.375rem] md:text-[4.05rem] font-bold text-[#1B3A6B] mb-2 animate-fadeInUp leading-tight tracking-tight font-[var(--font-noto)] whitespace-nowrap">
              株式会社ブリッジサービス
            </h1>
            <p className="text-[#4A9FD4] text-lg sm:text-3xl mb-10 animate-fadeInUp tracking-widest whitespace-nowrap">
              Bridge Service Co., Ltd.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-200 max-w-2xl mx-auto">
              <a
                href="/empresa"
                className="group flex-1 bg-white hover:bg-white border border-gray-100 hover:border-[#4A9FD4]/60 shadow-sm hover:shadow-md rounded-2xl px-6 py-6 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A9FD4] transition-colors">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#1B3A6B] font-bold text-xl font-[var(--font-noto)]">企業様</p>
                    <p className="text-gray-500 text-xs">Para empresas · For companies</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-[var(--font-noto)] leading-relaxed">
                  採用・人材のご相談<br />
                  <span className="text-gray-400 text-xs">Contratar personal · Hire staff</span>
                </p>
              </a>

              <a
                href="/trabajo"
                className="group flex-1 bg-[#4A9FD4]/10 hover:bg-[#4A9FD4]/15 border border-[#4A9FD4]/30 hover:border-[#4A9FD4]/60 shadow-sm hover:shadow-md rounded-2xl px-6 py-6 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A9FD4] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1B3A6B] transition-colors">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#1B3A6B] font-bold text-xl font-[var(--font-noto)]">求職者</p>
                    <p className="text-gray-500 text-xs">Busco trabajo · Find a job · Procuro emprego</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-[var(--font-noto)] leading-relaxed">
                  お仕事を探している方<br />
                  <span className="text-gray-400 text-xs">Estoy buscando empleo · Looking for work</span>
                </p>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/5 backdrop-blur-sm border border-[#1B3A6B]/15 rounded-full px-4 py-1.5 mb-6 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-[#4A9FD4] animate-pulse" />
              <span className="text-[#1B3A6B] text-sm font-medium tracking-widest uppercase">
                {h.badge}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#1B3A6B] mb-4 animate-fadeInUp leading-tight tracking-tight whitespace-nowrap">
              {h.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]">
                {h.titleAccent}
              </span>
            </h1>

            <p className="text-base md:text-2xl text-gray-700 mb-3 animate-fadeInUp delay-100 font-[var(--font-noto)]">
              {h.subtitle}
            </p>

            <div className="mb-10 animate-fadeInUp delay-200 px-2">
              {h.desc.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-gray-600 text-[0.625rem] xs:text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-[var(--font-noto)] whitespace-nowrap"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
              <a
                href="#contact"
                className="btn-glow-blue bg-[#4A9FD4] hover:bg-[#1B3A6B] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#4A9FD4]/30"
              >
                {h.ctaPrimary}
              </a>
              <a
                href="#services"
                className="btn-glow-white border border-[#1B3A6B]/30 hover:bg-[#1B3A6B]/5 text-[#1B3A6B] font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm"
              >
                {h.ctaSecondary}
              </a>
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn delay-500">
        <div className="w-px h-10 bg-gradient-to-b from-[#1B3A6B]/30 to-transparent" />
      </div>
    </section>
  );
}
