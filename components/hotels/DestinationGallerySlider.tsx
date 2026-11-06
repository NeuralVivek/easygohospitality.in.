"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import type { Hotel } from "@/lib/hotels";

type DestinationGallerySliderProps = {
  destination: string;
  hotels: Hotel[];
};

type DestinationGallery = {
  title: string;
  description: string;
  images: string[];
};

const destinationGalleries: Record<string, DestinationGallery> = {
  jaipur: {
    title: "The colours of Jaipur",
    description: "Palaces, pink-hued streets and unforgettable heritage moments.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  delhi: {
    title: "Discover Delhi",
    description: "Monuments, gardens and the vibrant stories of India's capital.",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  goa: {
    title: "Goa, your way",
    description: "Sunlit beaches, palm-lined escapes and slow coastal days.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  mumbai: {
    title: "The energy of Mumbai",
    description: "Coastal sunsets, iconic streets and a city that never pauses.",
    images: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  udaipur: {
    title: "A stay by the lakes",
    description: "Romantic waterside views, royal architecture and golden evenings.",
    images: [
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
    ],
  },
};

export function DestinationGallerySlider({ destination, hotels }: DestinationGallerySliderProps) {
  const fallbackImages = hotels.map((hotel) => hotel.image).filter((image, index, images) => images.indexOf(image) === index);
  const gallery = destinationGalleries[destination] ?? {
    title: `Explore ${destination === "india" ? "India" : destination}`,
    description: "Find a beautiful base for your next memorable stay.",
    images: fallbackImages,
  };
  const images = gallery.images.length ? gallery.images : ["/Gemini_Generated_Image_e7r21ge7r21ge7r2.png"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const moveSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] shadow-[0_20px_55px_rgba(0,0,0,0.12)]" aria-label={`${destination} highlights`}>
      {images.map((image, index) => (
        <div key={`${image}-${index}`} className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === index ? "opacity-100" : "opacity-0"}`}>
          <Image src={image} alt={`${destination} travel highlight ${index + 1}`} fill priority={index === 0} className={`object-cover transition-transform duration-[7000ms] ease-out ${activeIndex === index ? "scale-105" : "scale-100"}`} sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          <MapPin className="h-4 w-4" /> {destination}
        </div>
        <h2 className="mt-2 serif-display text-3xl">{gallery.title}</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/85">{gallery.description}</p>
        {images.length > 1 && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {images.map((image, index) => (
                <button key={`${image}-dot`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${destination} highlight ${index + 1}`} className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous destination image" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111111]"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => moveSlide(1)} aria-label="Next destination image" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111111]"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
