"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "300ms",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 bg-[#1B3A6B] hover:bg-[#4A9FD4] text-white rounded-full shadow-xl flex items-center justify-center"
    >
      <ChevronUp size={20} />
    </button>
  );
}
