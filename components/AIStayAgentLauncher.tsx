"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const AIStayAgent = dynamic(() => import("@/components/AIStayAgent").then((module) => module.AIStayAgent), { ssr: false });

export function AIStayAgentLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 5_000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#444444] bg-[#ffffff] px-4 py-2 text-sm font-medium text-[#111111] transition hover:-translate-y-0.5 hover:bg-[#f7f7f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]">
        <Sparkles className="h-4 w-4 text-[#333333]" />
        Find My Perfect Stay
      </button>
      {open && <AIStayAgent onClose={() => setOpen(false)} />}
    </>
  );
}

