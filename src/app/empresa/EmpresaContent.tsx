"use client";

import { useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import Attorneys from "@/components/Attorneys";
import MapContact from "@/components/MapContact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import LineButton from "@/components/LineButton";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee from "@/components/Marquee";
export default function EmpresaContent() {
  const { setLang } = useLang();

  useEffect(() => {
    setLang("ja");
  }, [setLang]);

  return (
    <>
      <Navbar mode="empresa" />
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero variant="empresa" />
        <Marquee jaOnly />
        <SectionDivider />
        <Vision />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Attorneys />
        <SectionDivider />
        <MapContact hideChat />
      </main>
      <Footer />
      <BackToTop />
      <LineButton />
      <ScrollProgress />
    </>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#4A9FD4]/25 to-transparent" />
    </div>
  );
}
