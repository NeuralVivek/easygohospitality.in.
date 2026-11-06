import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Car,
  Clock3,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Users,
  Wifi,
} from "lucide-react";

import { HotelCard, MiniRecommendationCard } from "@/components/HotelCard";
import { HotelLeadActions, HotelLeadPopup, HotelMobileActions, HotelWhatsAppButton } from "@/components/HotelLeadPopup";
import { getHotelBySlug, hotels } from "@/lib/hotels";
import { getRecommendations } from "@/lib/recommendationService";

export async function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);

  if (!hotel) {
    return { title: "Hotel not found" };
  }

  return {
    title: `${hotel.name} - Rooms, Pricing & Stay Information`,
    description: hotel.description,
    alternates: {
      canonical: `/hotel/${hotel.slug}`,
    },
  };
}

export default async function HotelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);

  if (!hotel) notFound();

  const recommendations = getRecommendations({ destination: hotel.destination, budget: hotel.price });
  const similarHotels = hotels.filter((item) => item.slug !== hotel.slug).slice(0, 3);
  const hotelContext = {
    hotelId: hotel.slug,
    hotelSlug: hotel.slug,
    hotelName: hotel.name,
    hotelCity: hotel.city,
  };

  return (
    <main className="editorial-shell py-10 md:py-14">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#666666]">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/hotels">Hotels</Link>
        <span>/</span>
        <span className="text-[#111111]">{hotel.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">{hotel.area}</p>
              <h1 className="serif-display mt-2 text-5xl text-[#111111]">{hotel.name}</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d5d5d5] bg-[#ffffff] px-3 py-2 text-sm text-[#444444]">
              <Star className="h-4 w-4 fill-[#333333] text-[#333333]" />
              {hotel.rating.toFixed(1)}  |  {hotel.reviews} reviews
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {hotel.gallery.map((image, index) => (
              <div key={image} className={`${index === 0 ? "md:col-span-2" : ""} relative h-60 overflow-hidden rounded-[1.8rem] border border-[#dddddd]`}>
                <Image src={image} alt={`${hotel.name} gallery ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: BedDouble, label: "Rooms" },
              { icon: Wifi, label: "High-speed Wi-Fi" },
              { icon: Bath, label: "Private baths" },
              { icon: Car, label: "Airport transfer" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-4 text-[#444444]">
                <Icon className="h-5 w-5 text-[#333333]" />
                <p className="mt-3 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="self-start rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">from</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="serif-display text-4xl text-[#111111]">INR {hotel.price.toLocaleString("en-IN")}</span>
            <span className="pb-1 text-sm text-[#666666]">/ night</span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-[#444444]">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#333333]" /> {hotel.distance}</div>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-[#333333]" /> Natural fit for couple / family stays</div>
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#333333]" /> Free cancellation available</div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-5 py-3 text-sm font-medium text-[#444444]">Check availability</button>
            <HotelLeadActions hotel={hotelContext} />
          </div>
        </aside>
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">Overview</p>
          <h2 className="mt-3 serif-display text-4xl text-[#111111]">A stay that feels curated, not crowded.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#666666]">{hotel.description}</p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#111111]">Amenities</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-2 text-sm text-[#333333]">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">Why choose this stay</p>
          <div className="mt-4 space-y-3">
            {hotel.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-3 rounded-full border border-[#dddddd] bg-[#f3f3f3] px-3 py-2 text-sm text-[#444444]">
                <Sparkles className="h-4 w-4 text-[#333333]" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {similarHotels.map((item) => (
          <MiniRecommendationCard key={item.slug} hotel={item} />
        ))}
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">Nearby attractions</p>
          <h3 className="mt-3 serif-display text-3xl text-[#111111]">What to explore around {hotel.city}</h3>
          <ul className="mt-5 space-y-3 text-sm text-[#666666]">
            <li>-  Heritage walks and sunset viewpoints</li>
            <li>-  Popular local markets and cafe districts</li>
            <li>-  Easy access to airport, rail, and city landmarks</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#555555]">Quick contact</p>
          <div className="mt-4 space-y-3 text-sm text-[#666666]">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#333333]" /> +91 98765 43210</div>
            <HotelWhatsAppButton hotel={hotelContext} className="inline-flex items-center gap-2 text-[#111111]" />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Recommended for you</p>
          <h2 className="mt-2 serif-display text-4xl text-[#111111]">Similar stays you may like.</h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {recommendations.map((item) => (
            <HotelCard key={item.slug} hotel={item} />
          ))}
        </div>
      </section>

      <HotelLeadPopup hotel={hotelContext} />
      <HotelMobileActions hotel={hotelContext} />
    </main>
  );
}

