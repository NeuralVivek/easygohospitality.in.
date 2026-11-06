"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { hotelMoods } from "@/lib/hotelMoods";

export function HotelMoodCollection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const groups = [hotelMoods.slice(0, 3), hotelMoods.slice(3, 6)];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groups.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [groups.length, isPaused]);

  return (
    <section className="editorial-shell mt-20" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} aria-labelledby="hotel-moods-heading">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#555555]">Curated escapes</p>
        <h2 id="hotel-moods-heading" className="mt-3 serif-display text-4xl leading-tight text-[#000000] md:text-5xl">
          Book Hotels For Every Mood
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#555555]">
          Every journey has a feeling. Discover the perfect stay for every kind of escape.
        </p>
      </div>

      <div className="relative min-h-[320px] overflow-hidden">
        {groups.map((group, groupIndex) => (
          <div
            key={`mood-group-${groupIndex}`}
            aria-hidden={activeGroup !== groupIndex}
            className={`grid gap-4 sm:grid-cols-3 ${activeGroup === groupIndex ? "relative" : "pointer-events-none absolute inset-0"} transition-all duration-700 ease-out ${activeGroup === groupIndex ? "translate-x-0 opacity-100" : groupIndex < activeGroup ? "-translate-x-6 opacity-0" : "translate-x-6 opacity-0"}`}
          >
        {group.map((mood, index) => (
          <Link
            key={mood.id}
            href={`/hotels?experience=${mood.query}`}
            tabIndex={activeGroup === groupIndex ? undefined : -1}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#000000] transition duration-700 ease-out ${activeGroup === groupIndex ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            <Image
              src={mood.image}
              alt={mood.title}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/45 transition duration-500 group-hover:bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{mood.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-5 text-white/80">{mood.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em]">
                    Explore stays <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
          </div>
        ))}
      </div>
    </section>
  );
}
