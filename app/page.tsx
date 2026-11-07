import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import { ExperienceSlider } from "@/components/ExperienceSlider";
import { DestinationHeroSlider } from "@/components/DestinationHeroSlider";
import { DestinationGridSlider } from "@/components/DestinationGridSlider";
import { LeadForm } from "@/components/LeadForm";
import { ExploreByExperience } from "@/components/ExploreByExperience";
import { HotDealsSection } from "@/components/HotDealsSection";
import { LastMinuteWeekendSection } from "@/components/LastMinuteWeekendSection";
import { HotelMoodCollection } from "@/components/HotelMoodCollection";
import { homepageDestinations } from "@/lib/homepageDestinations";
import { getRecommendations } from "@/lib/recommendationService";
import { OfferSection} from "@/components/hotels/offersection";
import { EventSection } from "@/components/events";

const recommendations = getRecommendations({ destination: "Jaipur" });

export default function Home() {
  return (
    <main className="pb-16">
      <DestinationHeroSlider />

      <ExperienceSlider />
      <ExploreByExperience />
      <OfferSection />
      <HotDealsSection />
      <EventSection />
      <HotelMoodCollection />
      <LastMinuteWeekendSection />

      <section id="travel-partners" className="editorial-shell mt-20 overflow-hidden rounded-[2.5rem] bg-[#111111] text-white">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">For travel agents and tour operators</p>
            <h2 className="mt-4 serif-display text-4xl leading-tight md:text-5xl">Your hospitality partner for every journey.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              Discover hotel and resort options, destination-based assistance, group accommodation enquiries, and wedding or event stays through one helpful hospitality partner.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Hotel and resort discovery",
                "Group accommodation enquiries",
                "Destination-based assistance",
                "Wedding and event accommodation",
              ].map((item) => (
                <div key={item} className="border-t border-white/15 pt-3 text-sm text-white/80">{item}</div>
              ))}
            </div>
            <Link href="/hotel-booking-partner" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-white/85">
              Become a travel partner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[300px] bg-[#222222]">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85"
              alt="Premium hotel lobby for EasyGo Hospitality travel partners"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-8 left-8 max-w-xs serif-display text-2xl">One point of contact. More ways to travel well.</p>
          </div>
        </div>
      </section>

      <section id="popular-destinations" className="editorial-shell mt-16 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Popular destinations</p>
            <h2 className="mt-2 serif-display text-4xl text-[#111111]">Trending Tourist Destinations</h2>
          </div>
          <Link href="/hotels" className="hidden items-center gap-2 text-sm font-medium text-[#111111] md:inline-flex">
            Browse all stays <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <DestinationGridSlider destinations={homepageDestinations} />
      </section>

      {/* <HotelMoodCollection /> */}

      {/* <HotDealsSection /> */}
      {/* <ExploreByExperience /> */}

      <section className="editorial-shell mt-20 rounded-[2.5rem] border border-[#dddddd] bg-[#f7f7f7] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#555555]">Personalized recommendations</p>
            <h2 className="mt-3 serif-display text-4xl leading-tight text-[#111111]">Hotels you may like.</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#666666]">
              Because you explored Jaipur, these stays mix signature experiences, elevated comfort, and value based on your recent search behavior.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-full bg-[#ffffff] px-4 py-2 text-sm text-[#333333]">
              <MapPinned className="h-4 w-4 text-[#333333]" />
              Recently viewed: Jaipur heritage escapes
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((hotel) => (
              <div key={hotel.slug} className="rounded-[1.75rem] border border-[#cccccc] bg-[#ffffff] p-3 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
                <div className="relative h-40 overflow-hidden rounded-[1.25rem]">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-[#111111]">{hotel.name}</h3>
                    <span className="text-xs font-medium text-[#333333]">{hotel.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#444444]">{hotel.area}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#111111]">INR {hotel.price.toLocaleString("en-IN")}</span>
                    <Link href={`/hotel/${hotel.slug}`} className="text-sm font-medium text-[#111111]">View stay</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-shell mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Why travelers choose us</p>
          <h2 className="mt-3 serif-display text-4xl text-[#111111]">A cleaner, calmer way to discover stays.</h2>
          <div className="mt-7 space-y-5">
            {[
              {
                title: "Transparent pricing",
                text: "See from-night pricing without noisy booking clutter, and reach the right hotel faster.",
              },
              {
                title: "Lead-first discovery",
                text: "Learn more, request a callback, compare a few choices or ask for the best price without friction.",
              },
              {
                title: "Built for local intent",
                text: "Search by city, destination, landmark, budget, property type, and travel date in a cleaner UX.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-4 shadow-[0_18px_30px_rgba(0,0,0,0.04)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dddddd] text-[#111111]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#111111]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#444444]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="lead-form" className="rounded-[2.25rem] border border-[#d5d5d5] bg-[#fafafa] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)] md:p-6">
          <LeadForm />
        </div>
      </section>

      <section className="editorial-shell mt-20">
        <div className="rounded-[2.5rem] border border-[#dddddd] bg-[#ffffff] px-6 py-8 shadow-[0_25px_60px_rgba(0,0,0,0.04)] md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#555555]">Travel content</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 className="serif-display text-4xl text-[#111111]">Travel inspiration for your next stay.</h2>
            <p className="text-base leading-7 text-[#666666]">
              Explore thoughtful destination insights, local recommendations, and neighborhoods built around real travel intent.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Best hotels in Jaipur",
              "Destination wedding stays in Jim Corbett",
              "Weekend stays for couples in Goa",
            ].map((title) => (
              <div key={title} className="rounded-[1.5rem] border border-[#dddddd] bg-[#f7f7f7] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#555555]">Editorial pick</p>
                <h3 className="mt-3 text-xl font-semibold text-[#111111]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#444444]">
                  Discover selective options that balance beauty, value, and convenience for your next trip.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="editorial-shell mt-20 border-t border-[#d5d5d5] pt-8 text-sm text-[#444444]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/Gemini_Generated_Image_z0ip15z0ip15z0ip.png"
              alt="Easygo Hospitality"
              width={170}
              height={96}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-1">Premium hotel discovery for India.</p>
          </div>
          <div className="grid gap-8 border-t border-[#d5d5d5] pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-[#111111]">Explore</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/hotels">Hotels and resorts</Link>
                <Link href="/#popular-destinations">Popular destinations</Link>
                <Link href="/#hot-deals">Signature stays</Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Plan</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/#travel-partners">Travel partnerships</Link>
                <Link href="/#lead-form">Request assistance</Link>
                <Link href="/click-tiger-den">Wedding and events</Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Destinations</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/hotels?destination=Jaipur">Jaipur</Link>
                <Link href="/hotels?destination=Jim%20Corbett">Jim Corbett</Link>
                <Link href="/hotels?destination=Varanasi">Varanasi</Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Contact</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="https://wa.me/918595661099" target="_blank" rel="noopener noreferrer">WhatsApp us</Link>
                <Link href="/#lead-form">Enquiry form</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 pt-5">
            <Link href="/hotels">Hotels</Link>
            <Link href="/hotels">Destinations</Link>
            <Link href="/hotels">Privacy</Link>
            <Link href="/hotels">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
