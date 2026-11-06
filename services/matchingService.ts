import type { Hotel } from "@/lib/hotels";
import { hotels } from "@/lib/hotels";

export type StayCriteria = {
  occasion: string;
  destination: string;
  budget: string;
  date: string;
  guests: string;
};

const budgetLimit: Record<string, number> = {
  "under-2000": 2000,
  "2000-5000": 5000,
  "5000-10000": 10000,
  "10000-20000": 20000,
};

export function findMatches(criteria: StayCriteria): Hotel[] {
  const destination = criteria.destination.trim().toLowerCase();
  const limit = budgetLimit[criteria.budget];
  const matches = hotels.filter((hotel) => {
    const locationMatch = !destination || [hotel.city, hotel.destination, hotel.area].some((value) => value.toLowerCase().includes(destination));
    const budgetMatch = criteria.budget === "20000-plus" ? hotel.price >= 20000 : !limit || hotel.price <= limit;
    const occasion = criteria.occasion;
    const occasionMatch = !occasion || hotelMatchesOccasion(hotel, occasion);
    return locationMatch && budgetMatch && occasionMatch;
  });

  return matches.slice(0, 20);
}

function hotelMatchesOccasion(hotel: Hotel, occasion: string) {
  const text = `${hotel.propertyType} ${hotel.bestFor.join(" ")} ${hotel.tags.join(" ")}`.toLowerCase();
  const terms: Record<string, string[]> = {
    wedding: ["heritage", "luxury", "wedding"],
    "birthday-party": ["resort", "villa", "celebrate"],
    engagement: ["heritage", "luxury"],
    "kitty-party": ["resort", "boutique"],
    corporate: ["business", "corporate"],
    "family-function": ["family"],
    "couple-stay": ["couple", "romantic", "honeymoon"],
    "weekend-getaway": ["weekend", "escape", "beach"],
    "resort-stay": ["resort"],
    "business-stay": ["business", "corporate"],
  };
  return terms[occasion]?.some((term) => text.includes(term)) ?? true;
}

