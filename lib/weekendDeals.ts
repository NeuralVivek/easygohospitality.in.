import type { HotelDeal } from "@/lib/hotDeals";

const weekendImages = [
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
];

export const weekendDeals: HotelDeal[] = [
 {
  id: "weekend-comfort-hotel",
  city: "Jaipur",
  name: "Comfort Hotel",
  locality: "Jaipur, Rajasthan",

  image: "/Comfort/841944947.jpg",

  gallery: [
    "/Comfort/841944947.jpg",
    "/Comfort/841945531.jpg",
    "/Comfort/841947692.jpg",
    "/Comfort/841950144.jpg",
    "/Comfort/841963495.jpg",
    "/Comfort/883864762.jpg",
  ],

  stars: 4,
  guestRating: 4.5,
  reviews: 173,
  originalPrice: 4500,
  dealPrice: 3600,
  discount: 20,
},
 {
  id: "weekend-click-collection-jaipur",
  city: "Jaipur",
  name: "Click Collection Jaipur",
  locality: "Jaipur, Rajasthan",

  image: "/clickcollectionjaipur/329622595.jpg",

  gallery: [
    "/clickcollectionjaipur/329622595.jpg",
    "/clickcollectionjaipur/329624934.jpg",
    "/clickcollectionjaipur/329638555%20(1).jpg",
    "/clickcollectionjaipur/339172535.jpg",
    "/clickcollectionjaipur/339172710.jpg",
    "/clickcollectionjaipur/339172928.jpg",
    "/clickcollectionjaipur/750819023.jpg",
  ],

  stars: 4,
  guestRating: 4.5,
  reviews: 173,
  originalPrice: 4500,
  dealPrice: 3600,
  discount: 20,
},
  
 
{
  id: "weekend-clarion-kochi",
  city: "Kochi",
  name: "Clarion Hotel Kochi",
  locality: "Kakkanad, Kochi",

  image: "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.34.58.jpeg",

  gallery: [
    "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.34.58.jpeg",
    "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.34.59.jpeg",
    "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.35.00.jpeg",
    "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.35.01.jpeg",
    "/Clarion%20Hotel%20Kochi/WhatsApp%20Image%202026-11-01%20at%2023.35.02.jpeg",
  ],

  stars: 5,
  guestRating: 4.8,
  reviews: 173,
  originalPrice: 5000,
  dealPrice: 4250,
  discount: 15,
},
{
  id: "weekend-click-collection-varanasi",
  city: "Varanasi",
  name: "Click Collection Varanasi",
  locality: "Varanasi, Uttar Pradesh",

  image: "/clickcollectionvaranasi/image.png",

  gallery: [
    "/clickcollectionvaranasi/image.png",
    "/clickcollectionvaranasi/image1.png",
    "/clickcollectionvaranasi/image10.png",
    "/clickcollectionvaranasi/image100.png",
    "/clickcollectionvaranasi/image12.png",
    "/clickcollectionvaranasi/image199.png",
  ],

  stars: 4,
  guestRating: 4.5,
  reviews: 173,
  originalPrice: 4500,
  dealPrice: 3600,
  discount: 20,
},





 
];
