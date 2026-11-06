export type HotelDeal = {
  id: string;
  city: string;
  name: string;
  locality: string;
  image: string;
  gallery: string[];
  stars: number;
  guestRating: number;
  reviews: number;
  originalPrice: number;
  dealPrice: number;
  discount: number;
};

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
];

const clickCollectionAyodhyaImages = [
  "/clickcollectionayodhaya/WhatsApp%20Image%202026-11-02%20at%2022.01.57.jpeg",
  "/clickcollectionayodhaya/WhatsApp%20Image%202026-11-02%20at%2022.01.58.jpeg",
  "/clickcollectionayodhaya/WhatsApp%20Image%202026-11-02%20at%2022.01.59.jpeg",
  "/clickcollectionayodhaya/WhatsApp%20Image%202026-11-02%20at%2022.02.00.jpeg",
  "/clickcollectionayodhaya/WhatsApp%20Image%202026-11-02%20at%2022.02.01.jpeg",
];

const cityHotels: Record<string, string[]> = {
  Gurugram: ["Quality Inn Gurgaon", "Comfort Inn Dhaliwal's Gurgaon", "Rosewood Courtyard", "Skyline Workstay"],
  Ayodhya: ["Click Collection Ayodhya", "Saryu Heritage House", "Ramprastha Retreat", "Awadh Courtyard"],
  Varanasi: ["Ganges View Residency", "Kashi Heritage Stay", "Ghatside Courtyard", "Banaras Riverside"],
  Jaipur: ["Amber Palace Retreat", "Pink City House", "Amer Sunset Courtyard", "Royal Hawa Mahal Stay"],
  "Jim Corbett": ["Jungle Edge Resort", "Corbett Wild Trails", "Riverbank Safari Lodge", "Sal Forest Retreat"],
  Delhi: ["The Lotus Suite", "Old Delhi Residences", "Capital Garden Hotel", "India Gate House"],
  // Kochi: []
};

export const dealCities = Object.keys(cityHotels);

export const hotDeals: Record<string, HotelDeal[]> = Object.fromEntries(
  dealCities.map((city, cityIndex) => [
    city,
    cityHotels[city].map((name, hotelIndex) => {
      const imageIndex = (cityIndex * 2 + hotelIndex) % hotelImages.length;
      const originalPrice = 5200 + cityIndex * 450 + hotelIndex * 600;
      const discount = 18 + ((cityIndex + hotelIndex) % 4) * 3;
      const isClickCollectionAyodhya = city === "Ayodhya" && hotelIndex === 0;
      return {
        id: `${city.toLowerCase().replaceAll(" ", "-")}-${hotelIndex}`,
        city,
        name,
        locality: city === "Gurugram" ? ["Sector 29", "Golf Course Road", "Cyber City", "MG Road"][hotelIndex] : ["City Centre", "Old Town", "Heritage Quarter", "Riverside"][hotelIndex],
        image: isClickCollectionAyodhya ? clickCollectionAyodhyaImages[0] : hotelImages[imageIndex],
        gallery: isClickCollectionAyodhya
          ? clickCollectionAyodhyaImages
          : [0, 1, 2].map((offset) => hotelImages[(imageIndex + offset) % hotelImages.length]),
        stars: 4 + (hotelIndex % 2),
        guestRating: Number((4.3 + ((cityIndex + hotelIndex) % 6) / 10).toFixed(1)),
        reviews: 86 + cityIndex * 31 + hotelIndex * 42,
        originalPrice,
        dealPrice: Math.round(originalPrice * (1 - discount / 100)),
        discount,
      };
    }),
  ]),
) as Record<string, HotelDeal[]>;
