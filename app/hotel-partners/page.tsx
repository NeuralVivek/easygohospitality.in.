import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { PartnerLeadForm } from "@/components/PartnerLeadForm";

export const metadata: Metadata = {
  title: "Hotel Partnership Opportunities in India",
  description: "Connect your hotel or resort with EasyGo Hospitality to explore listing, travel agent connections and hospitality booking opportunities across India.",
  alternates: { canonical: "/hotel-partners" },
  openGraph: {
    title: "Hotel Partnership Opportunities in India | EasyGo Hospitality",
    description: "Explore a potential partnership for your hotel, resort or destination property.",
    url: "https://easygohospitality.in/hotel-partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Partnership Opportunities in India | EasyGo Hospitality",
    description: "Explore a potential partnership for your hotel, resort or destination property.",
  },
};

export default function HotelPartnersPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Hotel Partnership Opportunities in India", url: "https://easygohospitality.in/hotel-partners", description: metadata.description };
  return (
    <main className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="editorial-shell mt-8 overflow-hidden rounded-[2.5rem] bg-[#111111] text-white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="p-8 md:p-14"><p className="text-xs uppercase tracking-[0.25em] text-white/60">For hotels and resorts</p><h1 className="mt-4 serif-display text-5xl leading-tight md:text-6xl">Grow your hotel business with EasyGo Hospitality.</h1><p className="mt-6 max-w-xl text-base leading-7 text-white/70">Are you a hotel owner, resort operator or hospitality business looking to expand your booking opportunities? Connect with EasyGo Hospitality to explore a potential partnership.</p><a href="#partner-enquiry" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111111]">Partner with EasyGo <ArrowRight className="h-4 w-4" /></a></div>
          <div className="relative min-h-[360px]"><Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85" alt="Hotel partnership opportunity with EasyGo Hospitality" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-80" /></div>
        </div>
      </section>
      <section className="editorial-shell mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div><p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Who can enquire</p><h2 className="mt-2 serif-display text-4xl">A considered route to new booking conversations.</h2><p className="mt-5 text-base leading-7 text-[#666666]">We welcome enquiries from hotels, resorts, boutique properties, wedding resorts, corporate accommodation providers and destination stays.</p><div className="mt-6 space-y-3">{["Hotels and resorts", "Boutique and destination properties", "Wedding and event accommodation", "Corporate stay providers"].map((item) => <div key={item} className="flex items-center gap-2 text-sm text-[#444444]"><Check className="h-4 w-4" />{item}</div>)}</div><Link href="/hotel-booking-partner" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Explore booking solutions <ArrowRight className="h-4 w-4" /></Link></div>
        <div id="partner-enquiry"><PartnerLeadForm /></div>
      </section>
    </main>
  );
}
