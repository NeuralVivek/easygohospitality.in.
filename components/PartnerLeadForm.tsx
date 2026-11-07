"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";

import { trackEvent } from "@/components/VisitorTracker";

const initialForm = {
  name: "",
  property: "",
  email: "",
  phone: "",
  location: "",
  rooms: "",
  requirement: "",
  message: "",
};

export function PartnerLeadForm({ mode = "hotel" }: { mode?: "hotel" | "booking" }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = mode === "hotel"
      ? `Hello EasyGo Hospitality!

I would like to explore becoming a hotel partner.

Contact person: ${form.name}
Property: ${form.property}
Email: ${form.email}
Phone: ${form.phone}
Location: ${form.location}
Number of rooms: ${form.rooms}
Partnership requirement: ${form.requirement}
Additional message: ${form.message || "Not specified"}

Thank you!`
      : `Hello EasyGo Hospitality!

I need hotel booking assistance.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not specified"}
Requirement: ${form.requirement}
Message: ${form.message || "Not specified"}

Thank you!`;

    trackEvent(mode === "hotel" ? "hotel_partner_enquiry_submitted" : "booking_partner_enquiry_submitted", {
      name: form.name,
      phone: form.phone,
      source: mode === "hotel" ? "hotel_partners_page" : "hotel_booking_partner_page",
    });
    setSubmitted(true);
    window.location.href = `https://wa.me/918595661099?text=${encodeURIComponent(message)}`;
  };

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-6">
        <CheckCircle2 className="h-7 w-7 text-[#111111]" />
        <h3 className="mt-4 text-xl font-semibold">Your enquiry is ready.</h3>
        <p className="mt-2 text-sm leading-6 text-[#666666]">WhatsApp is opening with your details for the EasyGo team.</p>
      </div>
    );
  }

  const isHotel = mode === "hotel";
  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">{isHotel ? "Hotel partnership" : "Booking assistance"}</p>
      <h2 className="mt-2 serif-display text-3xl text-[#111111]">{isHotel ? "Start a partnership conversation." : "Tell us what you need."}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder={isHotel ? "Contact person name" : "Your name"} className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />
        {isHotel ? (
          <input required value={form.property} onChange={(event) => update("property", event.target.value)} placeholder="Hotel or property name" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />
        ) : (
          <input required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" inputMode="tel" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />
        )}
        <input type="email" required={isHotel} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="Business email" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />
        {isHotel && <input required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" inputMode="tel" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />}
        {isHotel && <input required value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Property location" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />}
        {isHotel && <input required value={form.rooms} onChange={(event) => update("rooms", event.target.value)} placeholder="Number of rooms" inputMode="numeric" className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]" />}
        <select required value={form.requirement} onChange={(event) => update("requirement", event.target.value)} className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-[#111111]">
          <option value="">Select requirement</option>
          <option>Individual stays</option>
          <option>Group accommodation</option>
          <option>Corporate travel</option>
          <option>Wedding or event accommodation</option>
          {isHotel && <option>Hotel partnership enquiry</option>}
        </select>
        <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Additional message (optional)" rows={3} className="sm:col-span-2 rounded-xl border border-[#d5d5d5] bg-white px-4 py-3 text-sm outline-none focus:border-[#111111]" />
      </div>
      <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#333333]">
        <MessageCircle className="h-4 w-4" /> {isHotel ? "Become Our Hotel Partner" : "Enquire on WhatsApp"}
      </button>
    </form>
  );
}
