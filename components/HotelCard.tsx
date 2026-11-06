"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, MapPin, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { trackEvent } from "@/components/VisitorTracker";
import type { Hotel } from "@/lib/hotels";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const images = [hotel.image, ...hotel.gallery].filter((image, index, allImages) => allImages.indexOf(image) === index);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const moveImage = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#dddddd] bg-[#ffffff] shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.1)]">
      <div className="relative h-72 overflow-hidden">
        {images.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={image}
            alt={`${hotel.name} view ${index + 1}`}
            fill
            className={`object-cover transition duration-700 ${activeImage === index ? "scale-105 opacity-100" : "scale-100 opacity-0"}`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}
        <div className="absolute inset-0 bg-[#111111]/25" />
        <button
          type="button"
          onClick={() => trackEvent("property_save")}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#111111] backdrop-blur-sm transition hover:bg-white"
          aria-label={`Save ${hotel.name}`}
        >
          <Heart className="h-4 w-4" />
        </button>
        {images.length > 1 && (
          <>
            <div className="absolute left-4 top-4 flex gap-1">
              {images.map((image, index) => (
                <button key={`${image}-dot`} type="button" onClick={() => setActiveImage(index)} aria-label={`Show ${hotel.name} image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${activeImage === index ? "w-5 bg-white" : "w-1.5 bg-white/60"}`} />
              ))}
            </div>
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              <button type="button" onClick={() => moveImage(-1)} aria-label="Previous hotel image" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-[#111111]"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => moveImage(1)} aria-label="Next hotel image" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-[#111111]"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#eeeeee]">{hotel.area}</p>
            <h3 className="mt-1 text-xl font-semibold">{hotel.name}</h3>
          </div>
          <span className="rounded-full border border-white/40 bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-sm">
            {hotel.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {hotel.isDemo && <span className="inline-flex rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#666666]">Fictional demo stay</span>}
        <div className="flex items-center justify-between gap-3 text-sm text-[#666666]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#555555]" />
            {hotel.city}
          </div>
          <div className="flex items-center gap-1 text-[#333333]">
            <Star className="h-4 w-4 fill-current" />
            {hotel.reviews} reviews
          </div>
        </div>

        <p className="text-sm leading-6 text-[#666666]">{hotel.description}</p>

        <div className="flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-[11px] font-medium text-[#444444]">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#dddddd] pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#555555]">From</p>
            <p className="text-2xl font-semibold text-[#111111]">INR {hotel.price.toLocaleString("en-IN")}</p>
            <p className="text-xs text-[#666666]">/ night</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => trackEvent("compare_add")}
              className="rounded-full border border-[#d5d5d5] px-3 py-2 text-xs font-medium text-[#222222] transition hover:bg-[#f2f2f2]"
            >
              Compare
            </button>
            <Link
              href={`/hotel/${hotel.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-[#fafafa] transition hover:bg-[#444444]"
            >
              View details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MiniRecommendationCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-[#555555]">Recommended</p>
        <TrendingUp className="h-4 w-4 text-[#555555]" />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
          <Image src={hotel.image} alt={hotel.name} fill className="object-cover" sizes="80px" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#111111]">{hotel.name}</h4>
          <p className="mt-1 text-sm text-[#666666]">{hotel.area}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#111111]">INR {hotel.price.toLocaleString("en-IN")}</span>
            <Link href={`/hotel/${hotel.slug}`} className="text-xs font-medium text-[#111111]">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
