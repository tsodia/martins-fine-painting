"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "@/components/QuoteModal";

export default function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #1a2744 0%, #243356 50%, #1a2744 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          <Image
            src="/images/logo.png"
            alt="Martin's Fine Painting logo"
            width={610}
            height={230}
            className="mx-auto mb-8 w-[240px] sm:w-[280px] md:w-[360px] lg:w-[420px] max-w-[85vw] h-auto"
            priority
          />
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Denver&apos;s Luxury Painting
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Where Craftsmanship Meets Perfection &mdash; 35 years of
            Denver&apos;s finest brushwork, trusted by the homes and businesses
            that demand nothing less.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gold text-deep-black px-8 py-4 rounded font-semibold hover:bg-gold-soft transition duration-300 text-base"
            >
              Request a Free Consultation
            </button>

            <Link
              href="/gallery"
              className="border border-white text-white px-8 py-4 rounded font-semibold hover:bg-white/10 transition duration-300 text-base"
            >
              View Our Work
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream/10 to-transparent" />
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourcePage="Home - Hero"
      />
    </>
  );
}
