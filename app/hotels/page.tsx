import type { Metadata } from "next";

import { HotelResults } from "@/components/hotels/HotelResults";
import { hotelMatchesCategory, hotels } from "@/lib/hotels";

export const metadata: Metadata = {
  title: "Hotels in India",
  description: "Browse premium hotels, resorts, villas and heritage stays across India.",
};

export const instant = false;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HotelsPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const destination = first(query.destination)?.trim().toLowerCase() ?? "";
  const experience = first(query.experience)?.trim().toLowerCase() ?? "";
  const category = first(query.category)?.trim().toLowerCase() ?? "";
  const property = first(query.property)?.trim().toLowerCase() ?? "";
  const budget = Number(first(query.budget) ?? 0);
  const priceRange = first(query.price)?.trim() ?? "";
  const [priceMinimum, priceMaximum] = priceRange.split("-").map(Number);
  const rating = Number(first(query.rating) ?? 0);
  const guests = Number(first(query.guests) ?? 0);
  const sort = first(query.sort) ?? "recommended";
  const displayDestination = destination || "india";
  const destinationAliases: Record<string, string[]> = { gurugram: ["gurugram", "gurgaon"], gurgaon: ["gurugram", "gurgaon"] };
  const destinationValues = destinationAliases[displayDestination] ?? [displayDestination];
  const experienceTerms: Record<string, string[]> = {
    luxury: ["luxury", "premium", "high-end"],
    family: ["family", "family-friendly"],
    romantic: ["couple", "romantic", "honeymoon"],
    wildlife: ["wildlife", "jungle", "nature", "safari"],
    spiritual: ["spiritual", "pilgrimage", "sacred", "heritage"],
    weekend: ["weekend", "quick", "escape"],
    heritage: ["heritage", "royal", "historic"],
    adventure: ["adventure", "nature", "mountain", "wildlife"],
  };
  const selectedExperienceTerms = experienceTerms[experience] ?? (experience ? [experience] : []);

  const filtered = hotels
    .filter((hotel) => {
      const matchesDestination = !destination || destinationValues.some((value) => [hotel.city, hotel.destination, hotel.area].some((field) => field.toLowerCase().includes(value)));
      const matchesCategory = hotelMatchesCategory(hotel, category);
      const matchesProperty = !property || hotel.propertyType.toLowerCase().includes(property);
      const matchesBudget = !budget || hotel.price <= budget;
      const matchesPriceRange = !priceRange || (hotel.price >= priceMinimum && (!priceMaximum || hotel.price <= priceMaximum));
      const matchesRating = !rating || hotel.rating >= rating;
      const matchesGuests = !guests || (category === "family" || category === "family-stay" ? guests >= 4 : true);
      const searchableExperienceText = [hotel.name, hotel.propertyType, hotel.description, ...hotel.bestFor, ...hotel.tags, ...(hotel.categories ?? [])].join(" ").toLowerCase();
      const matchesExperience = !selectedExperienceTerms.length || selectedExperienceTerms.some((term) => searchableExperienceText.includes(term));
      return matchesDestination && matchesCategory && matchesProperty && matchesBudget && matchesPriceRange && matchesRating && matchesGuests && matchesExperience;
    })
    .sort((a, b) => (sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.rating - a.rating || b.reviews - a.reviews));

  const queryString = new URLSearchParams(
    Object.entries(query).flatMap(([key, value]) => value === undefined ? [] : [[key, first(value) ?? ""]]),
  ).toString();

  return (
    <main className="editorial-shell py-6 md:py-10">
      <HotelResults
        hotels={filtered}
        destination={displayDestination}
        initialSort={sort}
        initialRating={rating}
        initialProperty={property}
        initialBudget={budget}
        initialPriceRange={priceRange}
        initialAmenity={first(query.amenity) ?? ""}
        queryString={queryString}
      />
    </main>
  );
}
