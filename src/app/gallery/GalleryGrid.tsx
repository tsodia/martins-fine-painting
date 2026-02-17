"use client";

import { useState } from "react";
import Image from "next/image";

type Category = "All" | "Built-Ins" | "Interior" | "Cabinets";

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  label: string;
  area?: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/bookshelf-brick-fireplace-after.jpg",
    alt: "Custom built-in bookshelf and brick fireplace with two-tone finish by Martin's Fine Painting in Denver",
    category: "Built-Ins",
    label: "Custom Built-In & Fireplace",
    area: "Denver",
  },
  {
    src: "/images/gallery/library-shelves-after.jpg",
    alt: "Library shelving after custom lacquer finish by Martin's Fine Painting in Cherry Hills Village",
    category: "Built-Ins",
    label: "Library Shelving",
    area: "Cherry Hills Village",
  },
  {
    src: "/images/gallery/fireplace-builtins-after.jpg",
    alt: "Fireplace entertainment center built-ins with premium paint finish in Highlands Ranch",
    category: "Built-Ins",
    label: "Fireplace Built-Ins",
    area: "Highlands Ranch",
  },
  {
    src: "/images/gallery/window-bench-shelves-after.jpg",
    alt: "Window bench and built-in shelves with custom refinishing in Greenwood Village",
    category: "Built-Ins",
    label: "Window Bench & Shelves",
    area: "Greenwood Village",
  },
  {
    src: "/images/gallery/basement-builtins-after.jpg",
    alt: "Basement built-in cabinetry after flawless professional finish in Littleton",
    category: "Built-Ins",
    label: "Basement Built-Ins",
    area: "Littleton",
  },
  {
    src: "/images/gallery/sage-builtin-cabinets.jpg",
    alt: "Sage green built-in cabinets with custom lacquer finish in Cherry Hills Village",
    category: "Cabinets",
    label: "Sage Built-In Cabinets",
    area: "Cherry Hills Village",
  },
  {
    src: "/images/gallery/mudroom-bench-twotone.jpg",
    alt: "Mudroom bench with elegant two-tone paint finish in Parker, Colorado",
    category: "Built-Ins",
    label: "Mudroom Bench — Two-Tone",
    area: "Parker",
  },
  {
    src: "/images/gallery/white-wall-shelving.jpg",
    alt: "White wall shelving with clean professional paint finish in Denver",
    category: "Built-Ins",
    label: "White Wall Shelving",
    area: "Denver",
  },
  {
    src: "/images/gallery/modern-shelves-dark-accent.jpg",
    alt: "Modern built-in shelves with dark accent wall painting in Greenwood Village",
    category: "Interior",
    label: "Modern Shelves & Dark Accent",
    area: "Greenwood Village",
  },
  {
    src: "/images/gallery/luxury-bathroom-navy.jpg",
    alt: "Luxury bathroom with navy accent wall painting in Cherry Hills Village",
    category: "Interior",
    label: "Luxury Bathroom",
    area: "Cherry Hills Village",
  },
];

const categories: Category[] = ["All", "Built-Ins", "Interior", "Cabinets"];

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === active);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              active === cat
                ? "bg-gold text-deep-black shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.src}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  {item.category}
                </span>
                {item.area && (
                  <>
                    <span className="text-gray-300">&middot;</span>
                    <span className="text-xs text-gray-400">{item.area}</span>
                  </>
                )}
              </div>
              <h3 className="font-serif text-deep-black font-medium">{item.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No projects in this category yet. Check back soon!
        </p>
      )}
    </>
  );
}
