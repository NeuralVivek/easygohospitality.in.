export type HomepageExperience = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  query: string;
};

export const homepageExperiences: HomepageExperience[] = [
  { id: "luxury", title: "Luxury Hotel Stays", subtitle: "Elevated comfort and thoughtful service.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85", query: "luxury" },
  { id: "weddings", title: "Destination Weddings", subtitle: "Beautiful stays for meaningful celebrations.", image: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1000&q=85", query: "wedding" },
  { id: "corporate", title: "Corporate Events", subtitle: "Resorts and hotels for focused gatherings.", image: "https://images.unsplash.com/photo-1505845753232-f74a87b62db6?auto=format&fit=crop&w=1000&q=85", query: "corporate" },
  { id: "groups", title: "Group Bookings", subtitle: "Coordinated stays for every kind of group.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85", query: "family" },
  { id: "weekend", title: "Weekend Getaways", subtitle: "Short escapes with lasting memories.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", query: "weekend" },
  { id: "wildlife", title: "Nature & Wildlife Stays", subtitle: "Wake up close to the wild.", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85", query: "wildlife" },
];
