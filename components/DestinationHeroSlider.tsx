"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { type TouchEvent, useEffect, useRef, useState } from "react";

import { SearchPanel } from "@/components/SearchPanel";
import { homepageDestinations } from "@/lib/homepageDestinations";

const AUTOPLAY_MS = 5000;

export function DestinationHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homepageDestinations.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setActiveIndex((index + homepageDestinations.length) % homepageDestinations.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(distance) > 48) goToSlide(activeIndex + (distance < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const activeSlide = homepageDestinations[activeIndex];
  const Heading = activeIndex === 0 ? "h1" : "h2";

  return (
    <section className="relative" aria-label="Featured destinations">
      <div
        className="relative h-[40vh] min-h-[360px] overflow-hidden bg-[#111111] sm:h-[45vh] sm:min-h-[420px] lg:h-[50vh] lg:min-h-[480px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {homepageDestinations.map((slide, index) => (
          <div
            key={slide.name}
            aria-hidden={activeIndex !== index}
            className={`absolute inset-0 transition-opacity duration-1000 ${activeIndex === index ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={`${slide.name} destination`}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-[7000ms] ease-out ${activeIndex === index ? "scale-105" : "scale-100"}`}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}

        <div className="editorial-shell relative z-20 flex h-full items-center pb-28 pt-24 text-white">
          <div className="max-w-2xl">
            <p key={`eyebrow-${activeIndex}`} className="animate-[hero-copy-in_700ms_ease-out_both] text-xs font-semibold uppercase tracking-[0.3em] text-white">
              {activeSlide.eyebrow} · {activeSlide.name}
            </p>
            <Heading key={`title-${activeIndex}`} className="serif-display mt-5 max-w-3xl animate-[hero-copy-in_700ms_100ms_ease-out_both] text-5xl leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              {activeSlide.title}
            </Heading>
            <p key={`subtitle-${activeIndex}`} className="mt-6 max-w-xl animate-[hero-copy-in_700ms_180ms_ease-out_both] text-base leading-7 text-white sm:text-lg">
              {activeSlide.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-[hero-copy-in_700ms_260ms_ease-out_both]">
              <a
                href={activeSlide.ctaHref ?? `/hotels?destination=${encodeURIComponent(activeSlide.name)}`}
                target={activeSlide.ctaHref?.startsWith("https://") ? "_blank" : undefined}
                rel={activeSlide.ctaHref?.startsWith("https://") ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#f7f7f7] hover:shadow-[0_16px_34px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-[0.98]"
              >
                {activeSlide.ctaLabel ?? "Explore hotels"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </a>
              {activeSlide.secondaryCtaLabel && activeSlide.secondaryCtaHref && (
                <a
                  href={activeSlide.secondaryCtaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#111111]"
                >
                  {activeSlide.secondaryCtaLabel}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-30 mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center justify-between gap-4 sm:bottom-8">
          <button type="button" onClick={() => goToSlide(activeIndex - 1)} aria-label="Previous destination" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/45 bg-black/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111111] sm:h-11 sm:w-11"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {homepageDestinations.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Show ${slide.name} slide`}
                aria-current={activeIndex === index}
                className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/55 hover:bg-white/85"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => goToSlide(activeIndex + 1)} aria-label="Next destination" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/45 bg-black/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111111] sm:h-11 sm:w-11"><ChevronRight className="h-5 w-5" /></button>
            <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume destination autoplay" : "Pause destination autoplay"} className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111111] sm:inline-flex">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-30 mx-auto -mt-10 w-[min(1200px,calc(100%-2rem))]">
        <SearchPanel />
      </div>
    </section>
  );
}
