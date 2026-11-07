import type { MetadataRoute } from "next";

import { getDestinationList, hotels } from "@/lib/hotels";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://easygohospitality.in";
  const destinations = getDestinationList();

  const routes = [
    "",
    "/hotels",
    "/hotels-in",
    "/hotel-booking-partner",
    "/hotel-partners",
    "/click-tiger-den",
    "/destinations/jaipur",
    "/destinations/goa",
    "/destinations/delhi",
    "/destinations/gurgaon",
    "/destinations/mumbai",
    "/destinations/bangalore",
    "/destinations/udaipur",
    "/destinations/manali",
  ];

  const hotelRoutes = hotels.map((hotel) => `/hotel/${hotel.slug}`);
  const destinationRoutes = destinations.map((destination) => `/destinations/${destination.slug}`);

  return [...routes, ...hotelRoutes, ...destinationRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
