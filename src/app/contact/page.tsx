import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Request Your Free Consultation",
  description:
    "Request your free consultation — Martin will come to you, assess your space, and deliver a no-surprises proposal. Serving the entire Denver Metro Area for 35+ years.",
  alternates: {
    canonical: "https://martinsfinepainting.com/contact",
  },
};

export default function ContactPage() {
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
              Let&apos;s Get Started
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Request your free consultation — we&apos;ll come to you, assess your space, and deliver a no-surprises proposal.
            </p>
          </div>
        </section>

        {/* TWO-COLUMN LAYOUT */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
              {/* LEFT: Contact Form */}
              <div className="lg:col-span-3">
                <FadeIn>
                  <h2 className="font-serif text-2xl md:text-3xl text-deep-black mb-8">
                    Request Your Free Consultation
                  </h2>
                  <ContactForm />
                </FadeIn>
              </div>

              {/* RIGHT: Contact Details */}
              <div className="lg:col-span-2">
                <FadeIn>
                  <div className="space-y-8">
                    {/* Phone */}
                    <div>
                      <h3 className="font-semibold text-deep-black mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gold">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Phone
                      </h3>
                      <a href="tel:+13035550135" className="text-lg text-gray-600 hover:text-gold transition-colors">
                        (303) 555-0135
                      </a>
                    </div>

                    {/* Email */}
                    <div>
                      <h3 className="font-semibold text-deep-black mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gold">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Email
                      </h3>
                      <a href="mailto:msodia@live.com" className="text-lg text-gray-600 hover:text-gold transition-colors">
                        msodia@live.com
                      </a>
                    </div>

                    {/* Service Area */}
                    <div>
                      <h3 className="font-semibold text-deep-black mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gold">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Service Area
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Proudly serving the entire Denver Metro Area including Denver, Lakewood, Littleton, Englewood, Cherry Hills, Highlands Ranch, Parker, Castle Rock, Boulder, and surrounding communities.
                      </p>
                    </div>

                    {/* Business Hours */}
                    <div>
                      <h3 className="font-semibold text-deep-black mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gold">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Business Hours
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday – Friday: 7:00 AM – 6:00 PM</p>
                        <p>Saturday: 8:00 AM – 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gold">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          Licensed
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gold">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          Insured
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gold">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          35+ Years
                        </span>
                      </div>
                    </div>

                    {/* Google Maps Placeholder */}
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center">
                        <div className="text-center p-6">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-12 h-12 text-gray-300 mx-auto mb-3">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <p className="text-gray-400 text-sm font-medium">Google Maps Embed</p>
                          <p className="text-gray-300 text-xs mt-1">Denver Metro Area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="font-serif text-3xl md:text-4xl text-deep-black mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="w-16 h-0.5 bg-gold mx-auto" />
              </div>
            </FadeIn>
            <FAQ />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
