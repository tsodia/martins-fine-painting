"use client";

import { useEffect, useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}

export default function FadeIn({ children, className = "", delay }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => { observer.disconnect(); };
  }, []);

  const delayClass = delay !== undefined && delay > 0 ? `fade-up-delay-${delay}` : "";

  return (
    <div ref={ref} className={`fade-up ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
