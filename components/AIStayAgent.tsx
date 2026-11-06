"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

import { destinationSuggestions } from "@/lib/destinations";
import { findMatches, type StayCriteria } from "@/services/matchingService";
import { trackEvent } from "@/components/VisitorTracker";

const AIAgentScene = dynamic(() => import("@/components/AIAgentScene"), { ssr: false });

const occasions = [
  ["wedding", "Wedding"], ["birthday-party", "Birthday Party"], ["engagement", "Engagement"], ["kitty-party", "Kitty Party"],
  ["corporate", "Corporate Event"], ["family-function", "Family Function"], ["couple-stay", "Couple Stay"], ["weekend-getaway", "Weekend Getaway"],
  ["resort-stay", "Resort Stay"], ["business-stay", "Business Stay"], ["other", "Other"],
];
const budgets = [["under-2000", "Under INR 2,000"], ["2000-5000", "INR 2,000-INR 5,000"], ["5000-10000", "INR 5,000-INR 10,000"], ["10000-20000", "INR 10,000-INR 20,000"], ["20000-plus", "INR 20,000+"]];

type Props = { onClose: () => void };

export function AIStayAgent({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [criteria, setCriteria] = useState<StayCriteria>({ occasion: "", destination: "", budget: "", date: "", guests: "2" });
  const [phase, setPhase] = useState<"questions" | "matching" | "result" | "lead">("questions");
  const [matchCount, setMatchCount] = useState(0);
  const [lead, setLead] = useState({ name: "", phone: "", whatsapp: true });
  const [error, setError] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  const matchTimers = useRef<number[]>([]);

  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    trackEvent("ai_agent_opened");
    return () => {
      matchTimers.current.forEach((timer) => window.clearTimeout(timer));
      returnFocus.current?.focus();
    };
  }, []);

  const update = (key: keyof StayCriteria, value: string) => setCriteria((current) => ({ ...current, [key]: value }));
  const complete = () => {
    const matches = findMatches(criteria);
    setMatchCount(matches.length);
    setPhase("matching");
    matchTimers.current = [
      window.setTimeout(() => setPhase("result"), 2600),
      window.setTimeout(() => setPhase("lead"), 7600),
    ];
  };
  const submitLead = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phone = lead.phone.replace(/\D/g, "").replace(/^91/, "");
    if (lead.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Enter a valid 10-digit Indian mobile number.");
    trackEvent("ai_agent_lead_submitted", { name: lead.name.trim(), phone, occasion: criteria.occasion, destination: criteria.destination, budget: criteria.budget, date: criteria.date, guests: criteria.guests, source: "homepage_ai_agent" });
    const message = `Hi, I am looking for ${criteria.occasion || "a stay"} in ${criteria.destination || "India"}.\n\nGuests: ${criteria.guests}\nBudget: ${criteria.budget}\nDate: ${criteria.date || "Flexible"}\n\nName: ${lead.name.trim()}\n\nPlease help me with the matching options.`;
    window.location.href = `https://wa.me/918595661099?text=${encodeURIComponent(message)}`;
  };

  const next = () => {
    if (step === 4) return complete();
    setStep((current) => current + 1);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#111111]/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="ai-agent-title">
      <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-[#d5d5d5] bg-[#fafafa] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:rounded-[2rem] sm:p-7">
        <div className="mb-5 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.22em] text-[#555555]">Stay expert  |  {phase === "questions" ? `${String(step + 1).padStart(2, "0")} / 05` : "MATCHING"}</p><button type="button" onClick={onClose} aria-label="Close stay expert" className="rounded-full p-2 hover:bg-[#eeeeee]"><X className="h-5 w-5" /></button></div>
        <AIAgentScene />
        {phase === "questions" && <div className="mt-6">
          <h2 id="ai-agent-title" className="serif-display text-4xl text-[#111111]">Tell me what you&apos;re looking for.</h2>
          <p className="mt-2 text-sm text-[#666666]">I&apos;ll help you find stays that match your plans.</p>
          <div className="mt-6">
            {step === 0 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{occasions.map(([value, label]) => <button key={value} type="button" onClick={() => update("occasion", value)} className={`rounded-xl border px-3 py-3 text-left text-sm transition ${criteria.occasion === value ? "border-[#111111] bg-[#eeeeee]" : "border-[#d5d5d5] bg-[#ffffff]"}`}>{criteria.occasion === value && <Check className="mb-1 h-4 w-4 text-[#111111]" />}{label}</button>)}</div>}
            {step === 1 && <div><label className="text-sm font-medium" htmlFor="agent-destination">Where are you looking?</label><input id="agent-destination" value={criteria.destination} onChange={(event) => update("destination", event.target.value)} list="agent-destinations" className="mt-2 h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4 outline-none focus:border-[#111111]" placeholder="Destination, city or area" /><datalist id="agent-destinations">{destinationSuggestions.map((item) => <option key={item} value={item} />)}</datalist></div>}
            {step === 2 && <div className="grid gap-2 sm:grid-cols-2">{budgets.map(([value, label]) => <button key={value} type="button" onClick={() => update("budget", value)} className={`rounded-xl border px-4 py-3 text-left text-sm ${criteria.budget === value ? "border-[#111111] bg-[#eeeeee]" : "border-[#d5d5d5] bg-[#ffffff]"}`}>{label}</button>)}</div>}
            {step === 3 && <div><label className="text-sm font-medium" htmlFor="agent-date">When are you planning?</label><input id="agent-date" type="date" value={criteria.date} onChange={(event) => update("date", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" /></div>}
            {step === 4 && <div><label className="text-sm font-medium" htmlFor="agent-guests">How many people?</label><input id="agent-guests" type="number" min="1" value={criteria.guests} onChange={(event) => update("guests", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" /></div>}
          </div>
          <div className="mt-6 flex justify-between"><button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-[#d5d5d5] px-4 py-2 text-sm disabled:opacity-40"><ArrowLeft className="h-4 w-4" /> Back</button><button type="button" onClick={next} disabled={(step === 0 && !criteria.occasion) || (step === 2 && !criteria.budget)} className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40">{step === 4 ? "Find matches" : "Continue"}<ArrowRight className="h-4 w-4" /></button></div>
        </div>}
        {phase === "matching" && <div className="py-12 text-center"><h2 className="serif-display text-4xl text-[#111111]">Finding stays for you...</h2><p className="mt-4 text-sm text-[#666666]">Understanding your preferences  |  checking demo properties  |  comparing locations</p><div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-[#d5d5d5]"><div className="h-full w-2/3 animate-pulse rounded-full bg-[#333333]" /></div></div>}
        {phase === "result" && <div className="py-12 text-center"><p className="text-xs uppercase tracking-[0.2em] text-[#555555]">Demo matching complete</p><p className="mt-3 serif-display text-7xl text-[#111111]">{matchCount}</p><h2 className="mt-2 text-xl font-semibold text-[#111111]">matches found</h2><p className="mt-2 text-sm text-[#666666]">We found stays that match your preferences.</p></div>}
        {phase === "lead" && <form onSubmit={submitLead} className="mt-6 space-y-4"><h2 className="serif-display text-4xl text-[#111111]">Where should we send your matches?</h2><input value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" placeholder="Full name" /><input value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-[#ffffff] px-4" placeholder="+91 98XXXXXXXX" inputMode="tel" />{error && <p className="text-xs text-[#555555]">{error}</p>}<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lead.whatsapp} onChange={(event) => setLead((current) => ({ ...current, whatsapp: event.target.checked }))} /> Send updates on WhatsApp</label><button className="w-full rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white">Show My Matches</button></form>}
      </div>
    </div>
  );
}
