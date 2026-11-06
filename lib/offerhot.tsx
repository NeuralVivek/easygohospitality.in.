


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
export const offerDeals: HotelDeal[] = [
 {
  id: "weekend-surya-golden-palace",
  city: "Pushkar",
  name: "Surya Golden Palace",
  locality: "Pushkar, Rajasthan",

  image: "/suryagolden/escape-to-a-world-of.jpg",

  gallery: [
    "/suryagolden/escape-to-a-world-of.jpg",
    "/suryagolden/Family-Plunge-Pool-Villa-image.webp",
    "/suryagolden/Hill-View-Grand-Suite-with-Jacuzzi-imge.webp",
    "/suryagolden/Plunge-Pool-Grand-Villa-image.webp",
    "/suryagolden/Restaurant-Image-SGP-2.webp",
  ],

  stars: 5,
  guestRating: 4.8,
  reviews: 173,
  originalPrice: 12000,
  dealPrice: 9000,
  discount: 25,
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
  id: "weekend-corbett-tiger-den",
  city: "Jim Corbett",
  name: "Click Resort Corbett Tiger Den",
  locality: "Ramnagar, Uttarakhand",

  image: "/Tiger/317108064.jpg",

  gallery: [
    "/Tiger/317108064.jpg",
    "/Tiger/360759545.jpg",
    "/Tiger/561700692.jpg",
    "/Tiger/658979360.jpg",
    "/Tiger/658979827.jpg",
    "/Tiger/658988244.jpg",
    "/Tiger/658989248.jpg",
  ],

  stars: 4,
  guestRating: 4.5,
  reviews: 173,
  originalPrice: 6500,
  dealPrice: 5200,
  discount: 20,
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
