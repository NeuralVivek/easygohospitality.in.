"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type TouchEvent, useEffect, useRef, useState } from "react";

type HotelImageCarouselProps = {
  name: string;
  images: string[];
};

export function HotelImageCarousel({ name, images }: HotelImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {images.map((image, index) => (
        <Image key={`${image}-${index}`} src={image} alt={`${name} view ${index + 1}`} fill className={`object-cover transition duration-500 ${activeIndex === index ? "scale-105 opacity-100" : "scale-100 opacity-0"}`} sizes="(max-width: 768px) 85vw, 25vw" />
      ))}
      <button type="button" onClick={() => move(-1)} aria-label={`Previous ${name} image`} className="absolute left-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] transition hover:bg-white"><ChevronLeft className="h-4 w-4" /></button>
      <button type="button" onClick={() => move(1)} aria-label={`Next ${name} image`} className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] transition hover:bg-white"><ChevronRight className="h-4 w-4" /></button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((image, index) => <button key={`${image}-dot`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${name} image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/70"}`} />)}
      </div>
    </div>
  );
}
