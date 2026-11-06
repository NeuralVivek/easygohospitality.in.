"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { HomepageDestination } from "@/lib/homepageDestinations";

const DISPLAY_COUNT = 6;
const SLIDE_DURATION = 6000;

export function DestinationGridSlider({ destinations }: { destinations: HomepageDestination[] }) {
  const pages = Array.from({ length: Math.ceil(destinations.length / DISPLAY_COUNT) }, (_, pageIndex) =>
    destinations.slice(pageIndex * DISPLAY_COUNT, (pageIndex + 1) * DISPLAY_COUNT),
  );
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (pages.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pages.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [pages.length]);

  return (
    <div>
      <div className="relative min-h-[536px]">
        {pages.map((page, pageIndex) => (
          <div
            key={`destination-page-${pageIndex}`}
            aria-hidden={activePage !== pageIndex}
            className={`grid gap-5 transition-all duration-700 md:grid-cols-2 xl:grid-cols-3 ${activePage === pageIndex ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-0 translate-y-3 opacity-0"}`}
          >
            {page.map((destination) => (
              <Link
                key={destination.name}
                href={`/hotels?destination=${encodeURIComponent(destination.name)}`}
                tabIndex={activePage === pageIndex ? undefined : -1}
                className="group overflow-hidden rounded-[2rem] border border-[#dddddd] bg-[#ffffff] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(0,0,0,0.12)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={destination.image} alt={destination.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-[#111111]/35 transition group-hover:bg-[#111111]/25" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="serif-display text-3xl">{destination.name}</h3>
                    <p className="mt-2 text-sm text-white/80">Curated Experiences</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {pages.length > 1 && (
        <div className="mt-5 flex justify-center gap-2" aria-label="Popular destinations slides">
          {pages.map((page, pageIndex) => (
            <button
              key={`destination-dot-${pageIndex}`}
              type="button"
              onClick={() => setActivePage(pageIndex)}
              aria-label={`Show popular destinations ${pageIndex + 1}`}
              aria-current={activePage === pageIndex}
              className={`h-1.5 rounded-full transition-all ${activePage === pageIndex ? "w-8 bg-[#111111]" : "w-1.5 bg-[#bdbdbd]"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
