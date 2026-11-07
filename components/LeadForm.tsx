"use client";

import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquareText, Phone } from "lucide-react";

import { trackEvent } from "@/components/VisitorTracker";

export function LeadForm() {
  const [step, setStep] = useState<"contact" | "details">("contact");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "Jaipur",
    checkIn: "",
    checkOut: "",
    guests: "2 Guests",
    budget: "INR 5,000 - INR 10,000",
    preference: "Luxury stay",
    message: "",
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === "contact") {
      const phone = form.phone.replace(/\D/g, "");
      trackEvent("lead_form_submitted", { name: form.name.trim(), phone, source: "travel_expert_form" });
      const message = `Hello EasyGo Hospitality!

I'm ${form.name.trim()} and I would like help planning a stay.

My phone number is ${form.phone.trim()}.

Please have a travel expert share suitable hotel options and available offers.

Thank you!`;
      window.location.href = `https://wa.me/918595661099?text=${encodeURIComponent(message)}`;
      return;
    }
    trackEvent("booking_inquiry");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-8 text-[#333333] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-[#fafafa]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-semibold">Your hotel shortlist is ready.</h3>
        <p className="mt-3 max-w-md text-sm text-[#444444]">
          A travel expert will contact you shortly with property options, pricing, and a personalized recommendation.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-6 text-[#333333] shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Travel expert</p>
          <h3 className="mt-2 text-2xl font-semibold">Tell us what feels right</h3>
        </div>
        <div className="rounded-full border border-[#d5d5d5] bg-[#ffffff] p-2 text-[#111111]">
          <MessageSquareText className="h-5 w-5" />
        </div>
      </div>

      {step === "contact" ? (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4 outline-none transition focus:border-[#111111]"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4 outline-none transition focus:border-[#111111]"
              placeholder="+91 98XXXXXXXX"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => trackEvent("lead_form_started")}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#111111] px-5 text-sm font-medium text-[#ffffff] transition hover:bg-[#444444]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Destination</label>
              <input value={form.destination} onChange={(event) => updateField("destination", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Budget</label>
              <select value={form.budget} onChange={(event) => updateField("budget", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4">
                <option>INR 5,000 - INR 10,000</option>
                <option>INR 10,000 - INR 20,000</option>
                <option>INR 20,000 - INR 40,000</option>
                <option>INR 40,000+</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Check-in</label>
              <input type="date" value={form.checkIn} onChange={(event) => updateField("checkIn", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Check-out</label>
              <input type="date" value={form.checkOut} onChange={(event) => updateField("checkOut", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Guests</label>
              <select value={form.guests} onChange={(event) => updateField("guests", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>Family of 5</option>
                <option>Group stay</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Property preference</label>
              <select value={form.preference} onChange={(event) => updateField("preference", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4">
                <option>Luxury stay</option>
                <option>Family-friendly</option>
                <option>Beachfront</option>
                <option>Heritage property</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email (optional)</label>
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" placeholder="you@example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={4} className="w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4 py-3" placeholder="Tell us what kind of stay you want." />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="button" onClick={() => setStep("contact")} className="rounded-full border border-[#444444] px-4 py-2 text-sm font-medium text-[#333333]">Back</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-[#ffffff] transition hover:bg-[#444444]">
              Get my shortlist
              <Phone className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </motion.form>
  );
}
