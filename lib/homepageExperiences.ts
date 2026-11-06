export type HomepageExperience = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  query: string;
};

export const homepageExperiences: HomepageExperience[] = [
  { id: "luxury", title: "Luxury Stays", subtitle: "Elevated comfort and thoughtful service.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85", query: "luxury" },
  { id: "family", title: "Family Getaways", subtitle: "Room to relax, play and reconnect.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=85", query: "family" },
  { id: "romantic", title: "Romantic Escapes", subtitle: "Beautiful stays made for two.", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1000&q=85", query: "romantic" },
  { id: "wildlife", title: "Nature & Wildlife", subtitle: "Wake up close to the wild.", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85", query: "wildlife" },
  { id: "spiritual", title: "Spiritual Retreats", subtitle: "Quiet places for a slower pace.", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85", query: "spiritual" },
  { id: "weekend", title: "Weekend Getaways", subtitle: "Short escapes with lasting memories.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", query: "weekend" },
  { id: "heritage", title: "Heritage Hotels", subtitle: "Stay inside stories worth remembering.", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85", query: "heritage" },
  { id: "adventure", title: "Adventure Stays", subtitle: "Make every day a little bolder.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85", query: "adventure" },
];
