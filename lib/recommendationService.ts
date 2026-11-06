import { getHotelListByDestination, hotels } from "@/lib/hotels";

export type RecommendationContext = {
  destination?: string;
  budget?: number;
  propertyType?: string;
};

export function getRecommendations(context: RecommendationContext = {}) {
  const baseList = [...hotels];

  let filtered = baseList;

  if (context.destination) {
    filtered = getHotelListByDestination(context.destination);
  }

  if (context.propertyType) {
    filtered = filtered.filter((hotel) =>
      hotel.propertyType.toLowerCase().includes(context.propertyType!.toLowerCase()),
    );
  }

  if (context.budget) {
    filtered = filtered.filter((hotel) => hotel.price <= context.budget! + 2000);
  }

  if (filtered.length < 3) {
    filtered = [...baseList]
      .filter((hotel) => !filtered.some((item) => item.slug === hotel.slug))
      .slice(0, 3);
  }

  return filtered.slice(0, 3);
}

