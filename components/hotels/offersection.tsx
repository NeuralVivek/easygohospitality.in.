import { HotelDealCard } from "@/components/HotelDealCard";
import { offerDeals} from "@/lib/offerhot";

export function OfferSection() {
  return (
    <section className="editorial-shell mt-20" aria-labelledby="last-minute-weekend-heading">
      <div className="mb-6">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]">WEEKEND GETAWAYS</p> */}
        <h2 id="last-minute-weekend-heading" className="mt-2 serif-display text-4xl text-[#111111]">Hot Deals on Hotels</h2>
        {/* <p className="mt-2 max-w-2xl text-sm text-[#111111]/65">Find a comfortable stay for your next spontaneous weekend escape.</p> */}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {offerDeals.map((deal) => <HotelDealCard key={deal.id} deal={deal} showWhatsApp />)}
      </div>
    </section>
  );
}
