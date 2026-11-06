"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Hotel } from "@/lib/hotels";
import { DestinationGallerySlider } from "@/components/hotels/DestinationGallerySlider";

type HotelResultsProps = {
  hotels: Hotel[];
  destination: string;
  initialSort: string;
  initialRating: number;
  initialProperty: string;
  initialBudget: number;
  initialPriceRange: string;
  initialAmenity: string;
  queryString: string;
};

function ResultCard({
  hotel,
  selected,
  onSelect,
  cardRef,
}: {
  hotel: Hotel;
  selected: boolean;
  onSelect: () => void;
  cardRef: (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      onClick={onSelect}
      className={`hotel-result-card group grid gap-4 rounded-[1.5rem] border bg-[#ffffff] p-3 shadow-[0_14px_38px_rgba(0,0,0,0.05)] transition md:grid-cols-[190px_1fr_auto] ${selected ? "border-[#333333] ring-1 ring-[#333333]/30" : "border-[#dddddd] hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)]"}`}
    >
      <div className="relative min-h-44 overflow-hidden rounded-[1.15rem]">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="190px" />
        <button type="button" onClick={(event) => event.stopPropagation()} aria-label={`Save ${hotel.name}`} className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#111111] backdrop-blur-sm">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-w-0 flex-col justify-between py-1">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#555555]">{hotel.propertyType}</p>
          <h2 className="mt-1 text-xl font-semibold text-[#111111]">{hotel.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#666666]">
            <span className="inline-flex items-center gap-1 text-[#333333]"><Star className="h-4 w-4 fill-current" /> {hotel.rating.toFixed(1)} ({hotel.reviews})</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.city}  |  {hotel.distance}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#666666]">{hotel.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">{hotel.amenities.slice(0, 3).map((amenity) => <span key={amenity} className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-[11px] text-[#444444]">{amenity}</span>)}</div>
        </div>
      </div>
      <div className="flex min-w-32 flex-row items-end justify-between gap-3 border-t border-[#dddddd] pt-3 md:flex-col md:border-l md:border-t-0 md:pl-4 md:pt-1">
        <div><p className="text-[10px] uppercase tracking-[0.18em] text-[#555555]">From</p><p className="mt-1 text-xl font-semibold text-[#111111]">INR {hotel.price.toLocaleString("en-IN")}</p><p className="text-xs text-[#666666]">per night</p></div>
        <Link href={`/hotel/${hotel.slug}`} onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1 rounded-full bg-[#111111] px-3 py-2 text-xs font-medium text-white">View Stay <ArrowRight className="h-3.5 w-3.5" /></Link>
      </div>
    </article>
  );
}

export function HotelResults({
  hotels,
  destination,
  initialSort,
  initialRating,
  initialProperty,
  initialBudget,
  initialPriceRange,
  initialAmenity,
  queryString,
}: HotelResultsProps) {
  const router = useRouter();
  const [sort, setSort] = useState(initialSort);
  const [rating, setRating] = useState(initialRating);
  const [property, setProperty] = useState(initialProperty);
  const [budget] = useState(initialBudget);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [amenity, setAmenity] = useState(initialAmenity);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const filteredHotels = useMemo(() => {
    const [minimum, maximum] = priceRange.split("-").map(Number);
    const result = hotels.filter((hotel) => (
      (!rating || hotel.rating >= rating) &&
      (!property || hotel.propertyType.toLowerCase().includes(property)) &&
      (!budget || hotel.price <= budget) &&
      (!priceRange || (hotel.price >= minimum && (!maximum || hotel.price <= maximum))) &&
      (!amenity || hotel.amenities.some((item) => item.toLowerCase().includes(amenity)))
    ));

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "distance") return a.distance.localeCompare(b.distance, undefined, { numeric: true });
      return b.rating - a.rating || b.reviews - a.reviews;
    });
  }, [amenity, budget, hotels, priceRange, property, rating, sort]);

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(queryString);
    if (value) params.set(key, value); else params.delete(key);
    router.push(`/hotels?${params.toString()}`);
  };

  const selectHotel = (slug: string) => {
    setSelectedSlug(slug);
    cardRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="hotel-results-page">
      <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const params = new URLSearchParams(queryString); params.set("destination", String(data.get("destination") ?? "").trim().toLowerCase()); router.push(`/hotels?${params.toString()}`); }} className="hotel-search-bar grid gap-2 rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-3 shadow-[0_14px_38px_rgba(0,0,0,0.05)] md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <input name="destination" defaultValue={destination === "india" ? "" : destination} placeholder="Destination" className="rounded-xl border border-[#d5d5d5] bg-[#f7f7f7] px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#111111]" />
        <input name="checkin" type="date" defaultValue="2026-10-08" className="rounded-xl border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-3 text-sm outline-none" />
        <input name="checkout" type="date" defaultValue="2026-10-10" className="rounded-xl border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-3 text-sm outline-none" />
        <select name="guests" defaultValue="2" className="rounded-xl border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-3 text-sm outline-none"><option value="2">2 Guests, 1 Room</option><option value="4">4 Guests, 2 Rooms</option><option value="5">Family of 5</option></select>
        <button className="rounded-xl bg-[#111111] px-5 py-3 text-sm font-medium text-white">Search</button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
        <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} className="hidden rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:block"><option value="">Price</option><option value="0-2000">Under INR 2,000</option><option value="2000-5000">INR 2,000-INR 5,000</option><option value="5000-10000">INR 5,000-INR 10,000</option><option value="10000-">INR 10,000+</option></select>
        <select value={rating || ""} onChange={(event) => setRating(Number(event.target.value))} className="hidden rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:block"><option value="">Rating</option><option value="4.5">4.5+</option><option value="4">4.0+</option><option value="3.5">3.5+</option></select>
        <select value={property} onChange={(event) => setProperty(event.target.value)} className="hidden rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:block"><option value="">Property Type</option><option value="hotel">Hotel</option><option value="resort">Resort</option><option value="villa">Villa</option><option value="guest">Guest House</option><option value="boutique">Boutique Stay</option></select>
        <select value={amenity} onChange={(event) => setAmenity(event.target.value)} className="hidden rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:block"><option value="">Amenities</option><option value="wifi">WiFi</option><option value="breakfast">Breakfast</option><option value="pool">Pool</option><option value="parking">Parking</option><option value="spa">Spa</option><option value="pet">Pet Friendly</option></select>
        <button type="button" onClick={() => setShowFilters(true)} className="hidden rounded-full border border-[#d5d5d5] bg-[#ffffff] px-4 py-2 text-sm md:inline-flex">More filters</button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,1fr)]">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.2em] text-[#555555]">Hotel results</p><p className="mt-1 text-sm text-[#666666]">{filteredHotels.length} stays near {destination === "india" ? "India" : destination}</p></div><label className="flex items-center gap-2 text-sm text-[#666666]">Sort by <select value={sort} onChange={(event) => { setSort(event.target.value); updateUrl("sort", event.target.value); }} className="rounded-full border border-[#d5d5d5] bg-[#ffffff] px-3 py-2 outline-none"><option value="recommended">Recommended</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Highest Rated</option><option value="distance">Closest to Destination</option></select></label></div>
          <div className="space-y-4">{filteredHotels.map((hotel) => <ResultCard key={hotel.slug} hotel={hotel} selected={hotel.slug === selectedSlug} onSelect={() => selectHotel(hotel.slug)} cardRef={(node) => { cardRefs.current[hotel.slug] = node; }} />)}</div>
        </section>
        <aside className="block h-[420px] lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]"><DestinationGallerySlider key={destination} destination={destination} hotels={filteredHotels} /></aside>
      </div>

      {showFilters && <div className="fixed inset-0 z-50 flex items-end bg-[#111111]/30 md:items-center md:justify-center"><div className="w-full rounded-t-[2rem] bg-[#ffffff] p-5 md:max-w-md md:rounded-[2rem]"><div className="flex items-center justify-between"><h2 className="serif-display text-2xl text-[#111111]">More filters</h2><button type="button" onClick={() => setShowFilters(false)} aria-label="Close filters"><X className="h-5 w-5" /></button></div><label className="mt-5 block text-sm text-[#666666]">Amenity<select value={amenity} onChange={(event) => setAmenity(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-3"><option value="">Any amenity</option><option value="wifi">WiFi</option><option value="breakfast">Breakfast</option><option value="pool">Pool</option><option value="parking">Parking</option><option value="spa">Spa</option><option value="pet">Pet Friendly</option></select></label><button type="button" onClick={() => setShowFilters(false)} className="mt-5 w-full rounded-xl bg-[#111111] px-4 py-3 text-sm font-medium text-white">Apply filters</button></div></div>}
    </div>
  );
}
