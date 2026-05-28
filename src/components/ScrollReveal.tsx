"use client";

import { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: Props) {
  const { ref, inView } = useInView();

  const translate = {
    up: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };

  const style: CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: "750ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translate(0,0)" : translate[direction],
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
