export type Hotel = {
  slug: string;
  name: string;
  city: string;
  destination: string;
  area: string;
  propertyType: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  distance: string;
  bestFor: string[];
  tags: string[];
  latitude?: number;
  longitude?: number;
  categories?: string[];
  isDemo?: boolean;
};

const coreHotels: Hotel[] = [
  {
    slug: "click-collection-ayodhya",
    name: "# Click Collection Ayodhya",
    city: "Ayodhya",
    destination: "Ayodhya",
    area: "Ayodhya",
    propertyType: "Hotel",
    price: 4200,
    rating: 4.7,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Breakfast", "Wi-Fi", "Room service", "Parking"],
    description: "A welcoming Ayodhya stay with comfortable rooms, inviting dining spaces and thoughtful essentials for pilgrims and leisure travellers.",
    distance: "Near Ayodhya city centre",
    bestFor: ["Pilgrimage stays", "Family trips", "City breaks"],
    tags: ["Ayodhya", "Comfortable stay", "Dining"],
  },
  {
    slug: "amber-palace-jaipur",
    name: "Amber Palace Retreat",
    city: "Jaipur",
    destination: "Jaipur",
    area: "Near Amber Fort",
    propertyType: "Heritage Hotel",
    price: 6200,
    rating: 4.8,
    reviews: 236,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Pool", "Spa", "Free breakfast", "Airport transfer"],
    description:
      "A heritage-inspired hideaway with warm courtyards, marble interiors, and a slow luxury feel inspired by Jaipur's old-world charm.",
    distance: "5 km from Amber Fort",
    bestFor: ["Couples", "Luxury stays", "City heritage"],
    tags: ["Sunrise views", "Private dining", "Royal experience"],
  },
  {
    slug: "saffron-haven-goa",
    name: "Saffron Haven",
    city: "Goa",
    destination: "Goa",
    area: "North Goa",
    propertyType: "Beach Resort",
    price: 5400,
    rating: 4.7,
    reviews: 319,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Private beach access", "Infinity pool", "Yoga deck", "Sea-view rooms"],
    description:
      "Laid-back luxury for people who want the rhythm of the sea with easy access to vibrant cafes, shacks, and sunset evenings.",
    distance: "1.2 km from Baga Beach",
    bestFor: ["Beach lovers", "Family escapes", "Weekend getaways"],
    tags: ["Sunset deck", "Beachfront", "Wellness"],
  },
  {
    slug: "the-lotus-suite-delhi",
    name: "The Lotus Suite",
    city: "Delhi",
    destination: "Delhi",
    area: "South Delhi",
    propertyType: "Boutique Hotel",
    price: 4900,
    rating: 4.6,
    reviews: 204,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Business lounge", "24x7 room service", "Gym", "Airport transfer"],
    description:
      "An elegant city address for business travelers and urban explorers who want refined comfort in central Delhi.",
    distance: "3.8 km from India Gate",
    bestFor: ["Business travel", "Couples", "Transit stays"],
    tags: ["Business-friendly", "Fine dining", "Quiet luxury"],
  },
  {
    slug: "quality-inn-gurgaon",
    name: "Quality inn Gurgaon",
    city: "Gurugram",
    destination: "Gurgaon",
    area: "Gurgaon",
    propertyType: "City Hotel",
    price: 4700,
    rating: 4.5,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1468824357306-a439d58f4c10?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Meeting rooms", "High-speed Wi-Fi", "Breakfast", "Easy airport access"],
    description:
      "A comfortable Gurgaon stay with convenient access to the city's business districts, dining and transport links.",
    distance: "Near central Gurgaon",
    bestFor: ["Business stays", "City breaks", "Quick city deals"],
    tags: ["Comfortable rooms", "Easy access", "City stay"],
  },
  {
    slug: "horizon-villa-mumbai",
    name: "Horizon Villa Residences",
    city: "Mumbai",
    destination: "Mumbai",
    area: "Bandra West",
    propertyType: "Serviced Villa",
    price: 7600,
    rating: 4.9,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Chef on call", "Private terrace", "Concierge", "Housekeeping"],
    description:
      "A stylish villa experience for travelers seeking privacy, warm hospitality, and a polished city escape with big skyline views.",
    distance: "4 km from Bandra Beach",
    bestFor: ["Family stays", "Luxury weekend", "Private hosting"],
    tags: ["Skyline", "Private stay", "Design-led"],
  },
  {
    slug: "the-garden-loom-bangalore",
    name: "The Garden Loom",
    city: "Bangalore",
    destination: "Bangalore",
    area: "Indiranagar",
    propertyType: "Design Hotel",
    price: 5100,
    rating: 4.7,
    reviews: 286,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Rooftop lounge", "Cafe", "Fitness centre", "Smart check-in"],
    description:
      "A contemporary city stay balancing warm textures, calm rooms, and the energy of Bangalore's creative neighbourhoods.",
    distance: "2 km from Indiranagar",
    bestFor: ["Design lovers", "Weekend city break", "Remote work"],
    tags: ["Artful stay", "Foodie area", "Urban calm"],
  },
  {
    slug: "lakefront-reserve-udaipur",
    name: "Lakefront Reserve",
    city: "Udaipur",
    destination: "Udaipur",
    area: "Lake Pichola",
    propertyType: "Lake View Hotel",
    price: 6100,
    rating: 4.8,
    reviews: 265,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Lake views", "Sunset deck", "Boat service", "Private dining"],
    description:
      "A serene lakeside retreat where rooftop evenings, soft light, and palace-inspired details create an unforgettable stay.",
    distance: "0.8 km from Lake Pichola",
    bestFor: ["Luxury couples", "Honeymoon", "Lakefront views"],
    tags: ["Sunset dinners", "Royal ambiance", "Romantic"],
  },
  {
    slug: "himalayan-bloom-manali",
    name: "Himalayan Bloom Stay",
    city: "Manali",
    destination: "Manali",
    area: "Old Manali",
    propertyType: "Mountain Lodge",
    price: 4400,
    rating: 4.6,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Mountain views", "Bonfire", "Healthy breakfast", "Local guides"],
    description:
      "A cozy mountain escape tucked near the pines, delivering scenic comfort for chilled-out mountain weekends.",
    distance: "7 km from Mall Road",
    bestFor: ["Nature lovers", "Family mountain trip", "Winter escapes"],
    tags: ["Alpine air", "Proximity to trails", "Cabin feel"],
  },
];

const demoHotelSeed = [
  ["pink-city-house", "Pink City House", "Jaipur", "C-Scheme", "Boutique Hotel", 3800, "weekend-getaway"],
  ["amer-sunset-courtyard", "Amer Sunset Courtyard", "Jaipur", "Amer", "Heritage Hotel", 6900, "wedding"],
  ["coconut-grove-escape", "Coconut Grove Escape", "Goa", "Candolim", "Beach Resort", 4600, "resort"],
  ["monsoon-bay-villas", "Monsoon Bay Villas", "Goa", "Morjim", "Villa", 8200, "honeymoon"],
  ["old-delhi-residences", "Old Delhi Residences", "Delhi", "Central Delhi", "Boutique Hotel", 3300, "budget"],
  ["comfort-inn-dhaliwals-gurgaon", "Comfort inn Dhaliwal's Gurgaon", "Gurugram", "Gurgaon", "City Hotel", 5200, "business"],
  ["lake-palace-lane", "Lake Palace Lane", "Udaipur", "Rani Road", "Lake View Hotel", 7400, "couple"],
  ["blue-city-terrace", "Blue City Terrace", "Jodhpur", "Old City", "Heritage Hotel", 4100, "weekend-getaway"],
  ["sea-breeze-studios", "Sea Breeze Studios", "Mumbai", "Colaba", "Serviced Villa", 6800, "luxury"],
  ["pine-view-shimla", "Pine View Shimla", "Shimla", "Chotta Shimla", "Mountain Lodge", 3900, "family"],
  ["riverstone-rishikesh", "Riverstone Rishikesh", "Rishikesh", "Tapovan", "Resort", 3600, "pet-friendly"],
  ["taj-view-agora", "Taj View Agora", "Agra", "Taj Ganj", "Boutique Hotel", 3500, "couple"],
  ["backwater-calm", "Backwater Calm", "Kerala", "Alleppey", "Resort", 5900, "resort"],
  ["garden-city-loft", "Garden City Loft", "Bangalore", "Indiranagar", "Design Hotel", 4300, "business"],
  ["charminar-courtyard", "Charminar Courtyard", "Hyderabad", "Banjara Hills", "Boutique Hotel", 3700, "budget"],
  ["rose-city-retreat", "Rose City Retreat", "Chandigarh", "Sector 17", "Business Hotel", 3200, "family"],
  ["desert-moon-jodhpur", "Desert Moon Jodhpur", "Jodhpur", "Mandore", "Heritage Hotel", 5600, "luxury"],
] as const;

const demoImages = [
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
];

const additionalHotels: Hotel[] = demoHotelSeed.map(([slug, name, city, area, propertyType, price, category], index) => ({
  slug,
  name,
  city,
  destination: city,
  area,
  propertyType,
  price,
  rating: Number((4.4 + (index % 6) / 10).toFixed(1)),
  reviews: 96 + index * 17,
  image: demoImages[index % demoImages.length],
  gallery: demoImages,
  amenities: ["Breakfast", "Wi-Fi", "24x7 support"],
  description: `${name} is a fictional demo stay curated for exploring ${city} with thoughtful comfort and local character.`,
  distance: `Near ${area}`,
  bestFor: ["Demo stay", "Leisure travel"],
  tags: [category, "Fictional demo property"],
  categories: [category],
  isDemo: true,
}));

const hotelCoordinates: Record<string, [number, number]> = {
  "amber-palace-jaipur": [26.9855, 75.8513],
  "saffron-haven-goa": [15.5528, 73.7517],
  "the-lotus-suite-delhi": [28.5535, 77.2291],
  "rosewood-gurugram": [28.4595, 77.0266],
  "horizon-villa-mumbai": [19.0596, 72.8295],
  "the-garden-loom-bangalore": [12.9784, 77.6408],
  "lakefront-reserve-udaipur": [24.5765, 73.6835],
  "himalayan-bloom-manali": [32.2396, 77.1887],
  "pink-city-house": [26.9124, 75.7873],
  "amer-sunset-courtyard": [27.0587, 75.8513],
  "coconut-grove-escape": [15.5173, 73.7626],
  "monsoon-bay-villas": [15.6308, 73.7397],
  "old-delhi-residences": [28.6415, 77.2167],
  "skyline-workstay": [28.4675, 77.0946],
  "lake-palace-lane": [24.5726, 73.6804],
  "blue-city-terrace": [26.2918, 73.0246],
  "sea-breeze-studios": [18.9982, 72.8234],
  "pine-view-shimla": [31.1048, 77.1734],
  "riverstone-rishikesh": [30.1261, 78.3026],
  "taj-view-agora": [27.1715, 78.0421],
  "backwater-calm": [9.4981, 76.3388],
  "garden-city-loft": [17.385, 78.4867],
  "charminar-courtyard": [17.3616, 78.4747],
  "rose-city-retreat": [30.7333, 76.7794],
  "desert-moon-jodhpur": [26.2737, 73.0199],
};

export const hotels: Hotel[] = [...coreHotels, ...additionalHotels].map((hotel) => {
  const coordinates = hotelCoordinates[hotel.slug];
  return coordinates ? { ...hotel, latitude: coordinates[0], longitude: coordinates[1] } : hotel;
});

export const destinationSummaries: Record<
  string,
  { title: string; intro: string; image: string; keyword: string }
> = {
  jaipur: {
    title: "Jaipur",
    intro:
      "Royal heritage, vibrant bazaars, and thoughtfully curated stays for travelers wanting a deep cultural experience.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    keyword: "Jaipur stays",
  },
  goa: {
    title: "Goa",
    intro:
      "Sun-drenched beaches, laid-back luxury, and design-led stays with easy access to shacks, nightlife, and quiet escapes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    keyword: "Goa resort stays",
  },
  delhi: {
    title: "Delhi",
    intro:
      "A mix of heritage, contemporary city living, and premium accommodation built for business and leisure travelers.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    keyword: "Hotels in Delhi",
  },
  gurgaon: {
    title: "Gurugram",
    intro:
      "Designed for smoother business trips, short city stays, and polished hotel experiences close to major business districts.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    keyword: "Hotels in Gurugram",
  },
  mumbai: {
    title: "Mumbai",
    intro:
      "A fast-moving metropolis with elevated comfort, city views, and curated stays near the coast and key commercial hubs.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    keyword: "Mumbai hotels",
  },
  bangalore: {
    title: "Bangalore",
    intro:
      "A design-forward destination for business, leisure, and digitally savvy travelers who like their stay to feel polished.",
    image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=80",
    keyword: "Bangalore stays",
  },
  udaipur: {
    title: "Udaipur",
    intro:
      "A romantic city of lakes and palaces, known for timeless architecture, sunset views, and immersive luxury stays.",
    image:
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&w=1200&q=80",
    keyword: "Udaipur palace hotels",
  },
  manali: {
    title: "Manali",
    intro:
      "High-altitude calm, pine-covered valleys, and warm mountain lodges that balance adventure with comfort.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    keyword: "Manali mountain stays",
  },
};

export function getHotelBySlug(slug: string) {
  return hotels.find((hotel) => hotel.slug === slug) ?? null;
}

const categorySlugs: Record<string, string[]> = {
  "weekend-getaway": ["saffron-haven-goa", "lakefront-reserve-udaipur", "himalayan-bloom-manali"],
  "luxury-stay": ["amber-palace-jaipur", "horizon-villa-mumbai", "lakefront-reserve-udaipur"],
  resort: ["saffron-haven-goa", "amber-palace-jaipur", "lakefront-reserve-udaipur"],
  "family-stay": ["saffron-haven-goa", "horizon-villa-mumbai", "himalayan-bloom-manali"],
  "couple-stay": ["amber-palace-jaipur", "lakefront-reserve-udaipur", "saffron-haven-goa"],
  birthday: ["horizon-villa-mumbai", "saffron-haven-goa"],
  wedding: ["amber-palace-jaipur", "lakefront-reserve-udaipur"],
  honeymoon: ["lakefront-reserve-udaipur", "saffron-haven-goa"],
  "business-stay": ["the-lotus-suite-delhi", "rosewood-gurugram", "the-garden-loom-bangalore"],
  "pool-stay": ["amber-palace-jaipur", "saffron-haven-goa", "horizon-villa-mumbai"],
  "pet-friendly": ["himalayan-bloom-manali", "horizon-villa-mumbai"],
  "budget-stay": ["the-lotus-suite-delhi", "rosewood-gurugram", "himalayan-bloom-manali"],
};

const categoryAliases: Record<string, string> = {
  luxury: "luxury-stay",
  family: "family-stay",
  couple: "couple-stay",
  business: "business-stay",
  pool: "pool-stay",
  budget: "budget-stay",
};

export function hotelMatchesCategory(hotel: Hotel, category: string) {
  if (!category) return true;
  const normalizedCategory = categoryAliases[category] ?? category;
  return hotel.categories?.includes(category) || hotel.categories?.includes(normalizedCategory) || categorySlugs[normalizedCategory]?.includes(hotel.slug) || false;
}

export function getHotelListByDestination(destination: string) {
  return hotels.filter((hotel) => hotel.destination.toLowerCase() === destination.toLowerCase());
}

export function getDestinationList() {
  return Object.entries(destinationSummaries).map(([slug, item]) => ({
    slug,
    ...item,
  }));
}

export function getDestinationBySlug(slug: string) {
  return destinationSummaries[slug] ?? null;
}
