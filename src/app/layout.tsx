import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://martinsfinepainting.com"),
  title: {
    default: "Martin's Fine Painting — Denver's Premier Luxury Painting Company",
    template: "%s | Martin's Fine Painting",
  },
  description:
    "Where Craftsmanship Meets Perfection. 35+ years of Denver's finest brushwork — luxury interior painting, custom built-in refinishing, and specialty finishes. One master painter, zero shortcuts.",
  keywords: [
    "Denver painting company",
    "luxury painter Denver",
    "interior painting Denver",

    "cabinet painting Denver",
    "built-in painting",
    "custom cabinetry painting",
    "Martin's Fine Painting",
    "Denver Metro painter",
    "specialty finishes Denver",
  ],
  openGraph: {
    title: "Martin's Fine Painting — Denver's Premier Luxury Painting Company",
    description:
      "Where Craftsmanship Meets Perfection. 35+ years of bespoke craftsmanship from a one-man custom artist.",
    url: "https://martinsfinepainting.com",
    siteName: "Martin's Fine Painting",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://martinsfinepainting.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Painter"],
  name: "Martin's Fine Painting",
  description:
    "Denver's Premier Luxury Painting Company — 35+ years of bespoke craftsmanship from a one-man custom artist. White-glove interior painting and cabinet refinishing.",
  url: "https://martinsfinepainting.com",
  telephone: "(303) 555-0135",
  email: "msodia@live.com",
  founder: {
    "@type": "Person",
    name: "Martin Sodia",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.7392",
    longitude: "-104.9903",
  },
  areaServed: "Denver Metro Area",
  priceRange: "$$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "500",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Painting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Interior Painting" },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cabinet & Built-In Refinishing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Commercial Painting" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Specialty Finishes" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
