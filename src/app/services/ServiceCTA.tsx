"use client";

import { useState } from "react";
import QuoteModal from "@/components/QuoteModal";

interface ServiceCTAProps {
  label: string;
}

export default function ServiceCTA({ label }: ServiceCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gold text-deep-black px-8 py-4 rounded font-semibold hover:bg-gold-soft transition duration-300 text-base"
      >
        {label}
      </button>
      <QuoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sourcePage="Services"
      />
    </>
  );
}
