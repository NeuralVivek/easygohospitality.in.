"use client";

import { MapPin, MessageCircle, Star } from "lucide-react";

import { HotelImageCarousel } from "@/components/HotelImageCarousel";
import { trackEvent } from "@/components/VisitorTracker";
import type { HotelDeal } from "@/lib/hotDeals";
import { weddingCeremonyImage } from "@/lib/eventdeal";

const weddingImage = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85";

function getPropertyBadge(deal: HotelDeal) {
  if (deal.name.toLowerCase().includes("tiger den")) return "Nature Retreat";
  if (deal.stars >= 5) return "Luxury Stay";
  if (deal.city === "Pushkar" || deal.city === "Jim Corbett") return "Popular Stay";
  return "Handpicked Property";
}

function getPropertyDescription(deal: HotelDeal) {
  if (deal.name === "Surya Golden Palace") {
    return `A refined Pushkar stay for leisurely escapes, celebrations and group stays.`;
  }
  if (deal.name === "Click Resort Corbett Tiger Den") {
    return `A nature-led Corbett escape for family holidays, events and group stays.`;
  }
  return `A considered stay in ${deal.city} for individual, family and group travel.`;
}

export function HotelDealCard({ deal, showWhatsApp = false, eventMode = false }: { deal: HotelDeal; showWhatsApp?: boolean; eventMode?: boolean }) {
  const location = deal.locality.toLowerCase().includes(deal.city.toLowerCase()) ? deal.locality : `${deal.locality}, ${deal.city}`;
  const enquiryMessage = `Hello EasyGo Hospitality!

I'm interested in ${deal.name}, ${location}.

I'm looking for the best available hotel offers.

My requirement is for:

- Individual / Family Stay
- Group Booking
- Travel Agency / Tour Operator
- Corporate / Wedding Booking
Please share suitable accommodation options, availability and competitive rates.

Thank you!`;
  const enquiryUrl = `https://wa.me/918595661099?text=${encodeURIComponent(enquiryMessage)}`;
  const gallery = eventMode ? [weddingImage, weddingCeremonyImage] : deal.gallery;
  const badge = eventMode ? "Weddings & Events" : getPropertyBadge(deal);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#111111]/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
      <div className="relative">
        <HotelImageCarousel name={eventMode ? `${deal.name} wedding venue` : deal.name} images={gallery} />
        <span className="absolute left-3 top-3 rounded bg-[#111111] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">{badge}</span>
        {(showWhatsApp || eventMode) && (
          <a
            href={enquiryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contact EasyGo Hospitality on WhatsApp about ${deal.name}`}
            onClick={() => trackEvent(eventMode ? "event_whatsapp_click" : "hotel_whatsapp_click", { hotel: deal.name, destination: deal.city })}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111111] shadow-md transition hover:bg-[#111111] hover:text-white"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        )}
      </div>
      <div className="flex min-h-[285px] flex-col space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-[#111111]">{deal.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#111111]/60"><MapPin className="h-3.5 w-3.5 shrink-0" />{location}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#111111]/70">
          <span className="flex items-center gap-1 font-semibold text-[#111111]"><Star className="h-3.5 w-3.5 fill-[#111111]" /> {deal.stars} star</span>
          <span className="rounded bg-[#111111] px-1.5 py-0.5 font-semibold text-white">{deal.guestRating}</span>
          <span>{deal.reviews} reviews</span>
        </div>
        <p className="min-h-[48px] text-sm leading-6 text-[#111111]/70">{getPropertyDescription(deal)}</p>
        <div className="mt-auto border-t border-[#111111]/10 pt-3">
          <p className="text-sm font-semibold text-[#111111]">Planning a stay or booking for clients?</p>
          <p className="mt-1 text-xs leading-5 text-[#111111]/60">Personalised options for stays, groups and travel partners.</p>
          <a
            href={enquiryUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent(eventMode ? "event_enquiry_submitted" : "hotel_enquiry_submitted", { hotel: deal.name, destination: deal.city })}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#111111] px-3 py-3 text-center text-xs font-semibold text-white transition hover:bg-[#333333]"
          >
            <MessageCircle className="h-4 w-4" />
            {eventMode ? "Enquire on WhatsApp" : "Enquire for Best Available Offer"}
          </a>
          <p className="mt-2 text-center text-[11px] text-[#111111]/55">Thoughtful assistance for every journey.</p>
        </div>
      </div>
    </article>
  );
}
