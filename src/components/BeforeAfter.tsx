"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className = "",
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPositionFromEvent = useCallback(
    (clientX: number): number => {
      if (!containerRef.current) return position;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = (x / rect.width) * 100;
      return Math.min(100, Math.max(0, pct));
    },
    [position]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setPosition(getPositionFromEvent(e.clientX));
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [getPositionFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setPosition(getPositionFromEvent(e.clientX));
    },
    [isDragging, getPositionFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => { document.body.style.userSelect = ""; };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison slider. Use left and right arrow keys to adjust."
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Showing ${Math.round(position)}% before image and ${Math.round(100 - position)}% after image`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setPosition((prev) => Math.max(0, prev - 2));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setPosition((prev) => Math.min(100, prev + 2));
        } else if (e.key === "Home") {
          e.preventDefault();
          setPosition(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setPosition(100);
        }
      }}
      style={{ cursor: "ew-resize", touchAction: "pan-y" }}
    >
      {/* After Image (full container, always visible behind) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 800px"
          draggable={false}
        />
      </div>

      {/* Before Image (full container, clipped by clip-path — no reframing) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 800px"
          draggable={false}
        />
      </div>

      {/* Handle Line */}
      <div
        className="absolute top-0 z-10 h-full w-1 bg-gold"
        style={{ left: `calc(${position}% - 2px)` }}
      >
        <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-3 border-white bg-gold shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 -ml-1">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 z-20 rounded bg-black/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-3 top-3 z-20 rounded bg-black/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        After
      </span>

    </div>
  );
}
