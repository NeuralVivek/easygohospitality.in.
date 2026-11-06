import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HotelsInLandingPage() {
  return (
    <main className="editorial-shell py-10 md:py-14">
      <h1 className="serif-display text-5xl text-[#111111]">Hotels in India</h1>
      <p className="mt-4 max-w-2xl text-lg text-[#444444]">
        Discover heritage hotels, beach resorts, villa stays and premium city addresses across India&apos;s best-loved destinations.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          "Jaipur",
          "Goa",
          "Delhi",
          "Gurugram",
          "Mumbai",
          "Bangalore",
          "Udaipur",
          "Manali",
        ].map((city) => (
          <Link
            key={city}
            href={`/hotels-in-${city.toLowerCase()}`}
            className="rounded-[1.5rem] border border-[#dddddd] bg-[#ffffff] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#111111]">{city}</span>
              <ArrowRight className="h-4 w-4 text-[#111111]" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

