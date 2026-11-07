"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/components/VisitorTracker";
import { destinationSuggestions } from "@/lib/destinations";

export function SearchPanel() {
  const [query, setQuery] = useState("Jaipur");
  const [budget, setBudget] = useState("INR 10,000");
  const [guests, setGuests] = useState("2");
  const [mealPlan, setMealPlan] = useState("");
  const [checkIn, setCheckIn] = useState("2026-11-12");
  const [checkOut, setCheckOut] = useState("2026-11-15");
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    return !isMounted || value.length < 2 ? [] : destinationSuggestions.filter((item) => item.toLowerCase().includes(value)).slice(0, 6);
  }, [isMounted, query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formatDate = (value: string) => {
      const [year, month, day] = value.split("-");
      return year && month && day ? `${day}-${month}-${year}` : value;
    };
    const guestLabel = guests === "5" ? "Family of 5" : `${guests} Guests`;
    const mealPlanLabel = mealPlan || "Not specified";
    const message = [
      "Hello Team EasyGo Hospitality,",
      "",
      "I am looking for a stay with these details:",
      `Destination: ${query.trim() || "Not specified"}`,
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Guests: ${guestLabel}`,
      `Meal plan: ${mealPlanLabel}`,
      `Budget: ${budget}`,
    ].join("\n");

    trackEvent("search_performed", {
      destination: query.trim(),
      guests,
      checkIn,
      checkOut,
      mealPlan: mealPlanLabel,
      budget,
    });
    window.location.href = `https://wa.me/918595661099?text=${encodeURIComponent(message)}`;
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      onSubmit={handleSubmit}
      className="relative z-10 mx-auto mt-8 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#d5d5d5] bg-[#ffffff]/86 p-3 shadow-[0_40px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_auto]">
        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Destination</span>
          <div className="relative">
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-[#111111] outline-none" placeholder="Delhi, Goa, Jaipur" autoComplete="off" />
            {suggestions.length > 0 && <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#ffffff] p-1 shadow-xl">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="block w-full rounded-xl px-3 py-2 text-left text-sm text-[#444444] hover:bg-[#f7f7f7]">{suggestion}</button>)}</div>}
          </div>
        </label>

        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Check-in</span>
          <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-[#111111] outline-none" />
        </label>

        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Check-out</span>
          <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-[#111111] outline-none" />
        </label>

        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Guests</span>
          <select value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-[#111111] outline-none">
            <option value="2">2 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">Family of 5</option>
          </select>
        </label>

        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Meal plan</span>
          <select value={mealPlan} onChange={(event) => setMealPlan(event.target.value)} className="mt-2 w-full min-w-0 bg-transparent text-sm font-medium text-[#111111] outline-none">
            <option value="">Select meal plan</option>
            <option value="EP">EP</option>
            <option value="CP">CP</option>
            <option value="MAP">MAP</option>
            <option value="AP">AP</option>
          </select>
        </label>

        <label className="rounded-[1.4rem] border border-[#dddddd] bg-[#ffffff] px-4 py-3 text-left">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#555555]">Budget</span>
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-[#111111] outline-none">
            <option>INR 10,000</option>
            <option>INR 20,000</option>
            <option>INR 40,000</option>
            <option>INR 80,000</option>
          </select>
        </label>

        <button type="submit" className="inline-flex whitespace-nowrap items-center justify-center gap-1.5 rounded-[1.4rem] bg-[#111111] px-3 text-xs font-medium text-[#f5f5f5] transition hover:bg-[#444444]">
          <Search className="h-4 w-4" />
          Check Best Price
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 pb-1 text-sm text-[#444444]">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-[#555555]">
          <span>Delhi</span>
          <span>Gurugram</span>
          <span>Jaipur</span>
          <span>Goa</span>
          <span>Mumbai</span>
          <span>Bangalore</span>
        </div>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#cccccc] px-3 py-1.5 text-xs font-medium text-[#222222]">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          More filters
        </button>
      </div>
    </motion.form>
  );
}
