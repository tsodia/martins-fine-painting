import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import AboutCTA from "./AboutCTA";
import StatCounter from "./StatCounter";

export const metadata: Metadata = {
  title: "About Martin Sodia — 35+ Years of Bespoke Craftsmanship",
  description:
    "35 years. Thousands of projects. One master painter. Meet Martin Sodia — the one-man custom artist behind Denver's most trusted luxury painting company.",
  alternates: {
    canonical: "https://martinsfinepainting.com/about",
  },
};

const values = [
  {
    title: "Craftsmanship Over Speed",
    description:
      "We never rush. Every coat, every edge, every detail gets the time it deserves.",
  },
  {
    title: "Honesty in Every Estimate",
    description:
      "No bait-and-switch. No hidden fees. The price we quote is the price you pay.",
  },
  {
    title: "Your Home, Our Reputation",
    description:
      "Every project carries our name. That's why we treat your home like our legacy.",
  },
];

const stats = [
  { value: "35+", label: "Years in Business" },
  { value: "5,000+", label: "Homes Painted" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "500+", label: "5-Star Reviews" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="relative flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28"
          style={{
            background: "linear-gradient(135deg, #1a2744 0%, #243356 50%, #1a2744 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              About Martin&apos;s Fine Painting
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              35 years. Thousands of projects. One standard: perfection.
            </p>
          </div>
        </section>

        {/* FOUNDER STORY */}
        <section className="bg-cream py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                <div className="lg:col-span-2">
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                    <Image
                      src="/images/martin-portrait.jpg"
                      alt="Martin Sodia, founder of Martin's Fine Painting, with over 35 years of experience in luxury painting across the Denver Metro Area"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="w-12 h-0.5 bg-gold mb-6" />
                  <h2 className="font-serif text-3xl md:text-4xl text-deep-black mb-6">
                    Meet Martin
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                    <p>
                      Martin Sodia started Martin&apos;s Fine Painting over 35 years ago with a simple
                      belief — every surface deserves a craftsman&apos;s touch. What began as a one-man
                      operation remains one to this day. Martin does all the work himself — no
                      subcontractors, no rotating crews. Just one master painter with 35 years of
                      bespoke craftsmanship, trusted by Denver&apos;s most discerning homeowners.
                    </p>
                    <p>
                      Martin personally handles every project from start to finish — the consultation,
                      the prep, the paint, the final walkthrough. His white-glove, detail-obsessed
                      approach means you&apos;re never dealing with a faceless company. You&apos;re
                      working directly with the craftsman whose reputation is on the line with every
                      brushstroke.
                    </p>
                    <p className="text-deep-black font-medium italic">
                      &ldquo;When you hire Martin&apos;s, you&apos;re not getting a crew off Craigslist.
                      You&apos;re getting a custom artist who has dedicated his life to this craft.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="font-serif text-3xl md:text-4xl text-deep-black mb-4">
                  What We Stand For
                </h2>
                <div className="w-16 h-0.5 bg-gold mx-auto" />
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((value, i) => (
                <FadeIn key={value.title} delay={i as 0 | 1 | 2}>
                  <div>
                    <div className="w-12 h-0.5 bg-gold mb-4" />
                    <h3 className="font-serif text-xl text-deep-black mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* BY THE NUMBERS */}
        <section className="bg-navy py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  By the Numbers
                </h2>
                <div className="w-16 h-0.5 bg-gold mx-auto" />
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i as 0 | 1 | 2 | 3}>
                  <div className="text-center">
                    <StatCounter value={stat.value} />
                    <p className="text-white/70 text-sm font-medium tracking-wide mt-2">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Ready to see the Martin&apos;s difference?
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Every project begins with a free, no-pressure consultation.
              </p>
              <AboutCTA />
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
