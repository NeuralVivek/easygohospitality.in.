import Link from "next/link";
import { Star } from "lucide-react";

import { HotelImageCarousel } from "@/components/HotelImageCarousel";
import type { HotelDeal } from "@/lib/hotDeals";
import { weddingCeremonyImage } from "@/lib/eventdeal";

const weekendBookingMessage = "Hello EasyGo Hospitality, I am interested in a last-minute weekend booking";
const weekendBookingUrl = `https://wa.me/918595661099?text=${encodeURIComponent(weekendBookingMessage)}`;
const weddingImage = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85";

export function HotelDealCard({ deal, showWhatsApp = false, eventMode = false }: { deal: HotelDeal; showWhatsApp?: boolean; eventMode?: boolean }) {
  const eventMessage = `Hello EasyGo Hospitality, I would like to enquire about hosting a wedding or business celebration at ${deal.name} in ${deal.city}. Please share availability and event packages.`;
  const eventUrl = `https://api.whatsapp.com/send?phone=918595661099&text=${encodeURIComponent(eventMessage)}`;
  const gallery = eventMode ? [weddingImage, weddingCeremonyImage] : deal.gallery;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#111111]/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
      <div className="relative">
        <HotelImageCarousel name={eventMode ? `${deal.name} wedding venue` : deal.name} images={gallery} />
        {!eventMode && <span className="absolute left-3 top-3 rounded bg-[#111111] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">{deal.discount}% OFF</span>}
        {showWhatsApp && (
          <a
            href={eventMode ? eventUrl : weekendBookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contact EasyGo Hospitality on WhatsApp about ${deal.name}`}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111111] shadow-md transition hover:bg-[#111111] hover:text-white"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M12 2a9.9 9.9 0 0 0-8.58 14.85L2 22l5.3-1.39A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-3.15.83.84-3.07-.19-.31A8 8 0 1 1 12 20Zm4.39-5.92c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.55 6.55 0 0 1-1.94-1.2 7.24 7.24 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6.57.25 1.01.4 1.36.51.57.18 1.09.16 1.5.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </a>
        )}
        {eventMode && <span className="absolute left-3 top-3 rounded bg-[#111111] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Weddings & Events</span>}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-[#111111]">{deal.name}</h3>
          <p className="mt-1 text-xs text-[#111111]/60">{deal.locality}, {deal.city}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#111111]/70">
          <span className="flex items-center gap-1 font-semibold text-[#111111]"><Star className="h-3.5 w-3.5 fill-[#111111]" /> {deal.stars} star</span>
          <span className="rounded bg-[#111111] px-1.5 py-0.5 font-semibold text-white">{deal.guestRating}</span>
          <span>{deal.reviews} reviews</span>
        </div>
        {!eventMode && <div className="border-t border-[#111111]/10 pt-3">
          <span className="text-xs text-[#111111]/50 line-through">INR {deal.originalPrice.toLocaleString("en-IN")}</span>
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="text-xl font-bold text-[#111111]">INR {deal.dealPrice.toLocaleString("en-IN")}</span>
              <p className="text-[11px] text-[#111111]/55">per night + taxes and fees</p>
            </div>
            <Link href={`/hotels?destination=${encodeURIComponent(deal.city)}`} className="rounded-lg bg-[#111111] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#111111]">View Deal</Link>
          </div>
        </div>
        }
        {eventMode ? (
          <a href={eventUrl} target="_blank" rel="noreferrer" className="block rounded-lg bg-[#111111] px-3 py-3 text-center text-xs font-semibold text-white transition hover:bg-[#333333]">
            Enquire on WhatsApp
          </a>
        ) : (
          <p className="text-[11px] font-semibold text-[#111111]">Special offer · Sample deal, not a live verified rate</p>
        )}
      </div>
    </article>
  );
}
