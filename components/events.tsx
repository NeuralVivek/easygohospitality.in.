import { HotelDealCard } from "@/components/HotelDealCard";
import { offerDeals } from "@/lib/eventdeal";

export function EventSection() {
  return (
    <section className="editorial-shell mt-20" aria-labelledby="events-heading">
      <div className="mb-6">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]/60">WEDDING & BUSINESS CELEBRATIONS</p> */}
        <h2 id="events-heading" className="mt-2 serif-display text-4xl text-[#111111]">Weddings & Business Celebrations</h2>
        {/* <p className="mt-2 max-w-2xl text-sm text-[#111111]/65">Enquire about wedding celebrations and business events. Contact us on WhatsApp for availability and event packages.</p> */}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {offerDeals.map((deal) => <HotelDealCard key={deal.id} deal={deal} showWhatsApp eventMode />)}
      </div>
    </section>
  );
}
