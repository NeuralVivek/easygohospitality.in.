"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { HotelDealCard } from "@/components/HotelDealCard";
import { dealCities, hotDeals } from "@/lib/hotDeals";

export function HotDealsSection() {
  const [cityIndex, setCityIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const city = dealCities[cityIndex];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => setCityIndex((current) => (current + 1) % dealCities.length), 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const moveCity = (direction: number) => setCityIndex((current) => (current + direction + dealCities.length) % dealCities.length);

  return (
    <section id="hot-deals" className="editorial-shell mt-20 scroll-mt-24" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} aria-labelledby="hot-deals-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]">HOT DEALS ON HOTELS</p> */}
          <h2 id="hot-deals-heading" className="mt-2 serif-display text-4xl text-[#111111]">Explore Our Signature Stays</h2>
          {/* <p className="mt-2 max-w-2xl text-sm text-[#111111]/65">Discover exclusive hotel offers and the best stays across India&apos;s most popular destinations.</p> */}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#111111]">{city} stays</span>
          <button type="button" onClick={() => moveCity(-1)} aria-label="Previous deal destination" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#111111]/15 text-[#111111] transition hover:bg-[#111111] hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => moveCity(1)} aria-label="Next deal destination" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#111111]/15 text-[#111111] transition hover:bg-[#111111] hover:text-white"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div key={city} className="grid animate-[hero-copy-in_500ms_ease-out_both] gap-5 md:grid-cols-2 xl:grid-cols-4">
        {hotDeals[city].map((deal) => <HotelDealCard key={deal.id} deal={deal} />)}
      </div>
    </section>
  );
}
