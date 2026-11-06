"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import { experiences } from "@/lib/experiences";

const AUTO_SCROLL_DURATION = 60;
const MANUAL_RESUME_DELAY = 900;
const festiveOfferUrl = `https://wa.me/918595661099?text=${encodeURIComponent("Hello, I need 25% off")}`;

function getExperienceWhatsAppUrl(experienceName: string) {
  const message = `Hello EasyGo Hospitality, I would like to enquire about a ${experienceName.toLowerCase()}. Please share available options and details.`;
  return `https://api.whatsapp.com/send?phone=918595661099&text=${encodeURIComponent(message)}`;
}

export function ExperienceSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({ startX: 0, startTransform: 0, moved: false });
  const manualTransformRef = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [manualTransform, setManualTransform] = useState<number | null>(null);
  const [animationDelay, setAnimationDelay] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setIsReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const getCurrentTransform = () => {
    const transform = trackRef.current ? getComputedStyle(trackRef.current).transform : "none";
    if (transform === "none") return 0;
    return new DOMMatrixReadOnly(transform).m41;
  };

  const getCycleWidth = () => (trackRef.current?.scrollWidth ?? 0) / 3;

  const normalizeTransform = (transform: number) => {
    const cycleWidth = getCycleWidth();
    if (!cycleWidth) return transform;

    let normalized = transform;
    while (normalized <= -cycleWidth) normalized += cycleWidth;
    while (normalized > 0) normalized -= cycleWidth;
    return normalized;
  };

  const pauseForInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsInteracting(true);
  };

  const scheduleAutoResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      const transform = manualTransformRef.current;
      const cycleWidth = getCycleWidth();
      if (transform !== null && cycleWidth) {
        setAnimationDelay(-(Math.abs(normalizeTransform(transform)) / cycleWidth) * AUTO_SCROLL_DURATION * 1000);
      }
      manualTransformRef.current = null;
      setManualTransform(null);
      setIsInteracting(false);
    }, MANUAL_RESUME_DELAY);
  };

  const move = (direction: "previous" | "next") => {
    pauseForInteraction();
    const card = trackRef.current?.querySelector<HTMLElement>("[data-experience-card]");
    const cardStep = card ? card.getBoundingClientRect().width + 16 : 320;
    const currentTransform = manualTransform ?? getCurrentTransform();
    const targetTransform = currentTransform + (direction === "next" ? -cardStep : cardStep);

    manualTransformRef.current = targetTransform;
    setManualTransform(targetTransform);
    scheduleAutoResume();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pauseForInteraction();
    viewportRef.current?.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startTransform: manualTransform ?? getCurrentTransform(),
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    const nextTransform = dragRef.current.startTransform + delta;
    manualTransformRef.current = nextTransform;
    setManualTransform(nextTransform);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
    const normalizedTransform = normalizeTransform(manualTransformRef.current ?? 0);
    manualTransformRef.current = normalizedTransform;
    setManualTransform(normalizedTransform);
    scheduleAutoResume();
  };

  return (
    <section aria-labelledby="experience-heading" className="editorial-shell mt-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Explore by experience</p>
          <h2 id="experience-heading" className="mt-2 serif-display text-4xl text-[#111111]">Find a Stay for Every Occasion</h2>
          <p className="mt-2 text-sm text-[#666666]">Discover hotels, resorts and stays perfect for your next plan.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => move("previous")} aria-label="Previous experiences" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d5d5d5] bg-[#ffffff] text-[#111111] transition hover:bg-[#f7f7f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => move("next")} aria-label="Next experiences" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d5d5d5] bg-[#ffffff] text-[#111111] transition hover:bg-[#f7f7f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className="overflow-hidden pb-4"
        tabIndex={0}
        aria-label="Stay experiences"
        onMouseEnter={pauseForInteraction}
        onMouseLeave={() => {
          if (!isDragging) scheduleAutoResume();
        }}
        onFocus={pauseForInteraction}
        onBlur={() => {
          if (!isDragging) scheduleAutoResume();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          ref={trackRef}
          className={`experience-marquee-track flex w-max ${isInteracting || isReducedMotion || manualTransform !== null ? "animation-paused" : ""}`}
          style={{
            animationDuration: `${AUTO_SCROLL_DURATION}s`,
            animationDelay: `${animationDelay}ms`,
            transform: manualTransform === null ? undefined : `translate3d(${manualTransform}px, 0, 0)`,
            transition: isDragging ? "none" : "transform 700ms ease",
          }}
        >
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy > 0}>
              {experiences.map((experience) => (
                <a
                  key={`${copy}-${experience.id}`}
                  data-experience-card
                  href={getExperienceWhatsAppUrl(experience.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${experience.name.toLowerCase()} on WhatsApp`}
                  tabIndex={copy > 0 ? -1 : undefined}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={(event) => {
                    if (dragRef.current.moved) {
                      event.preventDefault();
                      dragRef.current.moved = false;
                      return;
                    }

                    dragRef.current.moved = false;
                  }}
                  className="group w-[42vw] min-w-[42vw] snap-start overflow-hidden rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] shadow-[0_16px_35px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] sm:w-[29vw] sm:min-w-[29vw] md:w-[18vw] md:min-w-[18vw] lg:w-[15vw] lg:min-w-[15vw]"
                >
                  <div className="relative h-32 overflow-hidden"><Image src={experience.image} alt="" fill loading="lazy" className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 768px) 42vw, 18vw" /></div>
                  <div className="p-4"><h3 className="font-semibold text-[#111111]">{experience.name}</h3><p className="mt-1 text-xs text-[#666666]">{experience.label}</p></div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a
        href={festiveOfferUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Get 25 percent off your next hotel booking on WhatsApp"
        className="relative mx-auto mt-8 block aspect-[3.2/1] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#111111] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
      >
        <Image
          src="/festive-hotel-booking-banner.png"
          alt="Celebrate more and save 25 percent on your next hotel booking"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </a>
    </section>
  );
}
