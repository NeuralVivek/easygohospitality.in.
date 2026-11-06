"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { trackEvent } from "@/components/VisitorTracker";

type HotelContext = {
  hotelId: string;
  hotelSlug: string;
  hotelName: string;
  hotelCity: string;
};

const WHATSAPP_NUMBER = "918595661099";
const OPEN_EVENT = "easyhospitality:open-hotel-lead";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function directMessage(hotel: HotelContext) {
  return `Hi, I'm interested in ${hotel.hotelName}. Please help me with availability and pricing.`;
}

function openWhatsApp(hotel: HotelContext, message: string, eventName: "whatsapp_expert_clicked" | "whatsapp_redirect") {
  trackEvent(eventName, { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
  if (eventName === "whatsapp_expert_clicked") {
    trackEvent("whatsapp_redirect", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
  }
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

export function requestHotelLead() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function HotelLeadForm({ hotel, onClose, onSubmitted }: { hotel: HotelContext; onClose: () => void; onSubmitted: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", travelDate: "", guests: "2", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phone = form.phone.replace(/\D/g, "").replace(/^91/, "");
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(phone)) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!form.travelDate || new Date(`${form.travelDate}T00:00:00`) < new Date(new Date().toDateString())) nextErrors.travelDate = "Choose today or a future date.";
    if (!/^[1-9]\d?$|^20$/.test(form.guests)) nextErrors.guests = "Choose between 1 and 20 guests.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const visitorId = document.cookie.match(/(?:^|; )eh_visitor_id=([^;]*)/)?.[1] ?? "anonymous";
    const sessionId = sessionStorage.getItem("eh_session_id") ?? "browser-session";
    const message = [
      `Hi, I'm interested in ${hotel.hotelName}.`,
      "",
      `Name: ${form.name.trim()}`,
      `Travel Date: ${form.travelDate}`,
      `Guests: ${form.guests}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
      "",
      "I'd like to know the availability and best available price.",
    ].filter(Boolean).join("\n");

    trackEvent("hotel_lead_submitted", {
      hotelId: hotel.hotelId,
      hotelSlug: hotel.hotelSlug,
      hotelName: hotel.hotelName,
      hotelCity: hotel.hotelCity,
      visitorId,
      sessionId,
      source: "hotel_detail_popup",
      landingPage: window.location.pathname,
    });
    onSubmitted();
    window.location.href = whatsappUrl(message);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.2em] text-[#555555]">Talk to an expert</p><h2 className="mt-2 serif-display text-3xl text-[#111111]">Plan your stay at {hotel.hotelName}</h2></div>
        <button type="button" onClick={onClose} aria-label="Close lead form" className="rounded-full p-2 text-[#666666] hover:bg-[#f7f7f7]"><X className="h-5 w-5" /></button>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-[#444444]" htmlFor="lead-name">Name</label><input id="lead-name" value={form.name} onChange={(event) => update("name", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-3 outline-none focus:border-[#111111]" placeholder="Your full name" />{errors.name && <p className="mt-1 text-xs text-[#555555]">{errors.name}</p>}</div>
      <div><label className="mb-1 block text-sm font-medium text-[#444444]" htmlFor="lead-phone">Phone number</label><input id="lead-phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-3 outline-none focus:border-[#111111]" placeholder="+91 98XXXXXXXX" inputMode="tel" />{errors.phone && <p className="mt-1 text-xs text-[#555555]">{errors.phone}</p>}</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-[#444444]" htmlFor="lead-date">Travel date</label><input id="lead-date" type="date" value={form.travelDate} onChange={(event) => update("travelDate", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-3 outline-none focus:border-[#111111]" />{errors.travelDate && <p className="mt-1 text-xs text-[#555555]">{errors.travelDate}</p>}</div>
        <div><label className="mb-1 block text-sm font-medium text-[#444444]" htmlFor="lead-guests">Guests</label><input id="lead-guests" type="number" min="1" max="20" value={form.guests} onChange={(event) => update("guests", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-3 outline-none focus:border-[#111111]" />{errors.guests && <p className="mt-1 text-xs text-[#555555]">{errors.guests}</p>}</div>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-[#444444]" htmlFor="lead-message">Message <span className="font-normal text-[#555555]">(optional)</span></label><textarea id="lead-message" value={form.message} onChange={(event) => update("message", event.target.value)} rows={3} className="w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-3 py-2 outline-none focus:border-[#111111]" placeholder="Anything we should know?" /></div>
      <button type="submit" className="w-full rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#ffffff] transition hover:bg-[#444444]">Continue to WhatsApp</button>
      <p className="text-center text-xs text-[#666666]">Quick response -  No obligation</p>
    </form>
  );
}

export function HotelLeadPopup({ hotel }: { hotel: HotelContext }) {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const stateRef = useRef<"IDLE" | "WAITING_INITIAL" | "OPEN" | "DISMISSED" | "WAITING_REPROMPT" | "SUBMITTED">("IDLE");

  useEffect(() => {
    trackEvent("hotel_view", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
    const submittedKey = `hotel_lead_submitted_${hotel.hotelId}`;
    if (sessionStorage.getItem(submittedKey)) {
      stateRef.current = "SUBMITTED";
      return;
    }
    stateRef.current = "WAITING_INITIAL";
    const schedule = (delay: number, nextState: "OPEN" | "WAITING_REPROMPT") => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      stateRef.current = nextState === "OPEN" ? stateRef.current : "WAITING_REPROMPT";
      timerRef.current = window.setTimeout(() => {
        if (stateRef.current === "SUBMITTED") return;
        stateRef.current = "OPEN";
        setOpen(true);
        trackEvent("hotel_lead_popup_shown", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
      }, delay);
    };
    const openFromAction = () => {
      if (stateRef.current !== "SUBMITTED") {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        stateRef.current = "OPEN";
        setOpen(true);
      }
    };
    window.addEventListener(OPEN_EVENT, openFromAction);
    schedule(20_000, "OPEN");
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      window.removeEventListener(OPEN_EVENT, openFromAction);
    };
  }, [hotel.hotelId, hotel.hotelName, hotel.hotelSlug]);

  const submitLead = () => {
    stateRef.current = "SUBMITTED";
    setSubmitted(true);
    sessionStorage.setItem(`hotel_lead_submitted_${hotel.hotelId}`, "true");
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  };

  const close = () => {
    setOpen(false);
    setFormOpen(false);
    if (stateRef.current !== "SUBMITTED") {
      stateRef.current = "DISMISSED";
      timerRef.current = window.setTimeout(() => {
        stateRef.current = "OPEN";
        setOpen(true);
        trackEvent("hotel_lead_popup_shown", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
      }, 40_000);
    }
    trackEvent("hotel_lead_popup_dismissed", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug, hotelName: hotel.hotelName });
  };

  if (!open || submitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="hotel-lead-title">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
        {formOpen ? <HotelLeadForm hotel={hotel} onClose={() => setFormOpen(false)} onSubmitted={submitLead} /> : <div className="space-y-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-[#555555]">A thoughtful next step</p><h2 id="hotel-lead-title" className="mt-2 serif-display text-4xl text-[#111111]">Planning to stay here?</h2></div><button type="button" onClick={close} aria-label="Close popup" className="rounded-full p-2 text-[#666666] hover:bg-[#f7f7f7]"><X className="h-5 w-5" /></button></div><p className="text-sm leading-6 text-[#666666]">Let our stay experts help you find the best available option for {hotel.hotelName}.</p><div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => { setFormOpen(true); trackEvent("hotel_lead_form_started", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug }); }} className="rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#ffffff]">Talk to an Expert</button><button type="button" onClick={() => { setFormOpen(true); trackEvent("get_best_price_clicked", { hotelId: hotel.hotelId, hotelSlug: hotel.hotelSlug }); }} className="rounded-full border border-[#d5d5d5] bg-[#f7f7f7] px-5 py-3 text-sm font-medium text-[#444444]">Get Best Price</button></div><button type="button" onClick={close} className="w-full text-sm text-[#666666] underline underline-offset-4">Maybe later</button><p className="text-center text-xs text-[#555555]">Quick response -  No obligation</p></div>}
      </div>
    </div>
  );
}

export function HotelWhatsAppButton({ hotel, className = "" }: { hotel: HotelContext; className?: string }) {
  return <button type="button" onClick={() => openWhatsApp(hotel, directMessage(hotel), "whatsapp_expert_clicked")} className={className}><MessageCircle className="h-4 w-4" /> Chat with an Expert</button>;
}

export function HotelLeadActions({ hotel }: { hotel: HotelContext }) {
  const openLead = (eventName: "get_best_price_clicked" | "hotel_lead_form_started") => {
    trackEvent(eventName, hotel);
    requestHotelLead();
  };

  return (
    <>
      <button type="button" onClick={() => openLead("get_best_price_clicked")} className="w-full rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#ffffff]">Get best price</button>
      <button type="button" onClick={() => openLead("hotel_lead_form_started")} className="w-full rounded-full border border-[#d5d5d5] px-5 py-3 text-sm font-medium text-[#444444]">Request callback</button>
      <HotelWhatsAppButton hotel={hotel} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#cccccc] bg-[#f2f2f2] px-5 py-3 text-sm font-medium text-[#111111]" />
    </>
  );
}

export function HotelMobileActions({ hotel }: { hotel: HotelContext }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-[#d5d5d5] bg-[#ffffff]/95 p-3 shadow-[0_-12px_30px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
      <button type="button" onClick={() => { trackEvent("get_best_price_clicked", hotel); requestHotelLead(); }} className="flex-1 rounded-full bg-[#111111] px-3 py-3 text-xs font-medium text-[#ffffff]">Get Best Price</button>
      <HotelWhatsAppButton hotel={hotel} className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[#cccccc] bg-[#f2f2f2] px-3 py-3 text-xs font-medium text-[#111111]" />
    </div>
  );
}

