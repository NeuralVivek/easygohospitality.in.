import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { PartnerLeadForm } from "@/components/PartnerLeadForm";
import { hotDeals } from "@/lib/hotDeals";
import { offerDeals } from "@/lib/offerhot";

export const metadata: Metadata = {
  title: "Hotel Booking Partner in India for Travel Agents",
  description: "Partner with EasyGo Hospitality for hotel bookings across India, group accommodation and personalised assistance for travel agents and tour operators.",
  alternates: { canonical: "/hotel-booking-partner" },
  openGraph: {
    title: "Hotel Booking Partner in India | EasyGo Hospitality",
    description: "Hotel booking support for travel agents, tour operators, businesses and travellers across India.",
    url: "https://easygohospitality.in/hotel-booking-partner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking Partner in India | EasyGo Hospitality",
    description: "Hotel booking support for travel agents, tour operators, businesses and travellers across India.",
  },
};

const audiences = [
  ["Travel Agents", "Find suitable accommodation for your clients with personalised booking assistance."],
  ["Tour Operators", "Explore stays for itineraries, tour packages and group travel requirements."],
  ["Corporate Planners", "Source accommodation for business trips, teams, meetings and events."],
  ["Wedding Planners", "Discover wedding resorts, destination venues and guest accommodation."],
  ["Event Organisers", "Coordinate hotel stays for conferences, celebrations and group requirements."],
  ["Individual Travellers", "Discover hotels and resorts for holidays, weekends and leisure travel."],
];

const descriptions: Record<string, string> = {
  "Surya Golden Palace": "A Pushkar stay for leisure escapes, celebrations and planned group accommodation.",
  "Click Collection Jaipur": "A Jaipur hotel option for individual stays, city visits and group enquiries.",
  "Click Resort Corbett Tiger Den": "A nature-led Jim Corbett stay for family holidays, events and group requirements.",
  "Click Collection Ayodhya": "An Ayodhya stay to consider for family travel, pilgrimage visits and group planning.",
};

export default function HotelBookingPartnerPage() {
  const propertyDeals = [offerDeals[0], offerDeals[1], offerDeals[2], hotDeals.Ayodhya[0]];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hotel Booking Partner in India",
    url: "https://easygohospitality.in/hotel-booking-partner",
    description: metadata.description,
  };

  return (
    <main className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="editorial-shell mt-8 overflow-hidden rounded-[2.5rem] bg-[#111111] text-white">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="p-8 md:p-14">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">For travel businesses and travellers</p>
            <h1 className="mt-4 max-w-3xl serif-display text-5xl leading-tight md:text-6xl">Your trusted hotel booking &amp; hospitality partner in India.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">From individual hotel reservations to group accommodation, EasyGo Hospitality helps travel businesses and travellers find suitable stays across India.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#booking-enquiry" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111111]">Become a partner <ArrowRight className="h-4 w-4" /></a>
              <Link href="/hotels" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white">Explore hotels</Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/50">Hotel bookings · Group accommodation · Corporate stays · Wedding venues</p>
          </div>
          <div className="relative min-h-[360px]">
            <Image src={propertyDeals[2].image} alt="Hospitality stay in India for EasyGo booking partners" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover opacity-80" />
          </div>
        </div>
      </section>

      <section className="editorial-shell mt-16">
        <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Who we support</p>
        <h2 className="mt-2 serif-display text-4xl text-[#111111]">Hospitality solutions for every booking requirement.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {audiences.map(([title, text]) => <article key={title} className="rounded-[1.5rem] border border-[#dddddd] bg-white p-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#666666]">{text}</p></article>)}
        </div>
      </section>

      <section className="editorial-shell mt-16">
        <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Our hotel collection</p>
        <h2 className="mt-2 serif-display text-4xl text-[#111111]">Explore our handpicked hotel &amp; resort collection.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {propertyDeals.map((deal) => (
            <article key={deal.id} className="overflow-hidden rounded-[1.5rem] border border-[#dddddd] bg-white">
              <div className="relative h-52"><Image src={deal.image} alt={`${deal.name} in ${deal.city}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" /></div>
              <div className="p-5"><p className="text-xs uppercase tracking-[0.18em] text-[#666666]">{deal.city}</p><h3 className="mt-2 text-lg font-semibold">{deal.name}</h3><p className="mt-2 text-sm leading-6 text-[#666666]">{descriptions[deal.name] ?? `A considered stay in ${deal.city} for individual, family and group travel.`}</p><div className="mt-5 flex flex-wrap gap-2"><Link href={deal.name.includes("Tiger Den") ? "/click-tiger-den" : `/hotels?destination=${encodeURIComponent(deal.city)}`} className="inline-flex items-center gap-1 text-sm font-semibold">Explore property <ArrowRight className="h-4 w-4" /></Link><a href={`https://wa.me/918595661099?text=${encodeURIComponent(`Hello EasyGo Hospitality, I am interested in ${deal.name} in ${deal.city}. Please share availability and suitable booking options.`)}`} target="_blank" rel="noreferrer" className="w-full rounded-full bg-[#111111] px-4 py-2.5 text-center text-xs font-semibold text-white">Enquire on WhatsApp</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-shell mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#f7f7f7] p-7 md:p-10"><p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Booking solutions</p><h2 className="mt-3 serif-display text-4xl">Hotel booking support for travel businesses.</h2><p className="mt-5 text-base leading-7 text-[#666666]">Use one helpful point of contact for individual reservations, multiple-room enquiries, group accommodation, corporate stays, weddings, events and tour package requirements.</p><ul className="mt-6 space-y-3 text-sm text-[#444444]">{["Individual and family stays", "Multiple-room and group enquiries", "Corporate and event accommodation", "Travel agent and tour operator assistance"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4" />{item}</li>)}</ul></div>
        <div id="booking-enquiry"><PartnerLeadForm mode="booking" /></div>
      </section>
    </main>
  );
}
