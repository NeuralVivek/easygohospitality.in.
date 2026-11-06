import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { HotelCard } from "@/components/HotelCard";
import { getDestinationBySlug, hotels } from "@/lib/hotels";

export function generateStaticParams() {
  return [
    "jaipur",
    "goa",
    "delhi",
    "gurgaon",
    "mumbai",
    "bangalore",
    "udaipur",
    "manali",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination not found" };
  }

  return {
    title: `${destination.title} Hotels & Stays`,
    description: destination.intro,
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) notFound();

  const destinationHotels = hotels.filter(
    (hotel) => hotel.destination.toLowerCase() === destination.title.toLowerCase(),
  );

  return (
    <main className="editorial-shell py-10 md:py-14">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#666666]">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/hotels">Hotels</Link>
        <span>/</span>
        <span className="text-[#111111]">{destination.title}</span>
      </nav>

      <section className="overflow-hidden rounded-[2.5rem] border border-[#dddddd] bg-[#ffffff] shadow-[0_30px_80px_rgba(0,0,0,0.09)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Destination guide</p>
            <h1 className="serif-display mt-3 text-5xl text-[#111111]">{destination.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#666666]">{destination.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#444444]">
              <span className="rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-2">Luxury stays</span>
              <span className="rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-2">Budget options</span>
              <span className="rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-3 py-2">Family-friendly</span>
            </div>
          </div>
          <div className="relative h-[340px]">
            <Image src={destination.image} alt={destination.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Popular stays</p>
            <h2 className="mt-2 serif-display text-4xl text-[#111111]">Best hotels in {destination.title}</h2>
          </div>
          <Link href="/hotels" className="inline-flex items-center gap-2 text-sm font-medium text-[#111111]">
            See all stays <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {destinationHotels.length ? (
            destinationHotels.map((hotel) => <HotelCard key={hotel.slug} hotel={hotel} />)
          ) : (
            <div className="rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-6 text-[#444444]">No hotels available for this destination yet.</div>
          )}
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          "Best areas to stay",
          "Luxury stays",
          "Family-friendly picks",
        ].map((heading) => (
          <div key={heading} className="rounded-[1.75rem] border border-[#dddddd] bg-[#ffffff] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#555555]">Guide</p>
            <h3 className="mt-3 text-xl font-semibold text-[#111111]">{heading}</h3>
            <p className="mt-3 text-sm leading-6 text-[#444444]">
              Curated neighborhoods, travel timing tips, and premium options that balance comfort and convenience.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

