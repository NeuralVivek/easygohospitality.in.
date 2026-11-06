export type HotelMood = {
  id: string;
  title: string;
  description: string;
  image: string;
  query: string;
  size: "feature" | "standard";
};

export const hotelMoods: HotelMood[] = [
  {
    id: "honeymoon",
    title: "Honeymoon Escapes",
    description: "Romantic stays, private villas and intimate getaways.",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1400&q=85",
    query: "honeymoon",
    size: "feature",
  },
  {
    id: "beach",
    title: "Beach Retreats",
    description: "Beautiful beachfront resorts and coastal escapes.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    query: "beach",
    size: "feature",
  },
  {
    id: "wildlife",
    title: "Wildlife Adventures",
    description: "Jungle resorts, safari stays and nature retreats.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85",
    query: "wildlife",
    size: "feature",
  },
  {
    id: "mountains",
    title: "Mountain Getaways",
    description: "Peaceful mountain resorts and scenic hill stays.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
    query: "mountain",
    size: "standard",
  },
  {
    id: "heritage",
    title: "Heritage & Culture",
    description: "Royal palaces, heritage hotels and historic destinations.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    query: "heritage",
    size: "standard",
  },
  {
    id: "spiritual",
    title: "Spiritual Retreats",
    description: "Peaceful stays near temples, ghats and sacred destinations.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    query: "spiritual",
    size: "standard",
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description: "Premium hotels, private pools and exclusive experiences.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    query: "luxury",
    size: "standard",
  },
  {
    id: "family",
    title: "Family Holidays",
    description: "Comfortable family-friendly hotels and resorts.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
    query: "family",
    size: "standard",
  },
];
