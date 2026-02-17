import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import BeforeAfter from "@/components/BeforeAfter";
import GalleryGrid from "./GalleryGrid";
import GalleryCTA from "./GalleryCTA";

export const metadata: Metadata = {
  title: "Our Work — Before & After Gallery",
  description:
    "See the Martin's Fine Painting difference — before and after. Browse our portfolio of luxury interior painting and cabinet refinishing projects across the Denver Metro Area.",
  alternates: {
    canonical: "https://martinsfinepainting.com/gallery",
  },
};

export default function GalleryPage() {
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
              Our Work
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              See the Martin&apos;s Fine Painting difference — before, during, and after.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-cream py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <GalleryGrid />
          </div>
        </section>

        {/* BEFORE/AFTER PAIRS */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="font-serif text-3xl md:text-4xl text-deep-black mb-4">
                  Before &amp; After Transformations
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Drag the slider to see the transformation.
                </p>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
            </FadeIn>
            <div className="space-y-16">
              <FadeIn>
                <div>
                  <h3 className="font-serif text-xl text-deep-black mb-4">Custom Built-In Bookshelf &amp; Fireplace</h3>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <BeforeAfter
                      beforeSrc="/images/gallery/bookshelf-brick-fireplace-before.jpg"
                      afterSrc="/images/gallery/bookshelf-brick-fireplace-after.jpg"
                      beforeAlt="Built-in bookshelf and brick fireplace before painting — raw wood and white brick in Denver home"
                      afterAlt="Built-in bookshelf and brick fireplace after Martin's Fine Painting two-tone finish in Denver"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Like what you see? Let&apos;s talk about your project.
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Every transformation begins with a free consultation.
              </p>
              <GalleryCTA />
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}