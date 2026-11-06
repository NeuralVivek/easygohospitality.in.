import { ExperienceCard } from "@/components/ExperienceCard";
import { homepageExperiences } from "@/lib/homepageExperiences";

export function ExploreByExperience() {
  return (
    <section className="editorial-shell mt-20" aria-labelledby="experience-heading">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]/60">EXPLORE BY EXPERIENCE</p>
        <h2 id="experience-heading" className="mt-2 serif-display text-4xl text-[#111111]">Find a Stay for Every Occasion</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#111111]/65">From peaceful retreats to memorable family holidays, discover stays that match the way you travel.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {homepageExperiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
      </div>
    </section>
  );
}
