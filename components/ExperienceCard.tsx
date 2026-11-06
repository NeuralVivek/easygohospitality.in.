import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { HomepageExperience } from "@/lib/homepageExperiences";

export function ExperienceCard({ experience }: { experience: HomepageExperience }) {
  const message = `Hello EasyGo Hospitality, I would like to enquire about a ${experience.title.toLowerCase()}. Please share available options and details.`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=918595661099&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      aria-label={`Enquire about ${experience.title.toLowerCase()} on WhatsApp`}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      className="group relative min-h-56 overflow-hidden rounded-2xl bg-[#111111]"
    >
      <Image src={experience.image} alt={experience.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-xl font-semibold">{experience.title}</h3>
        <p className="mt-1 text-sm text-white/80">{experience.subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em]">Explore now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </a>
  );
}
