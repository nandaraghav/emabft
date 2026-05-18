const unsplashShopIds = [
  "photo-1607400201585-545b7c25d1db", // Rakesh Hardware
  "photo-1595079676339-1534801ad6cf", // Masterji Tailor
  "photo-1441986300917-64674bd600d8", // Export Surplus
  "photo-1490424418208-e865af88993c", // Dharavi Leather
  "photo-1558591710-4b4a1ae0f04d", // TD Lab Supply
];

const img = (id, w=800, h=500) => {
  const cleanId = unsplashShopIds[(id - 1) % unsplashShopIds.length];
  return `https://images.unsplash.com/${cleanId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};
export const boutiques = [
  { id:'b1', name:'Rakesh Hardware Shop', description:'Local supplier for zips, rivets, D-rings, and heavy duty threads. Always gives a student discount.', location:'Nehru Place, Delhi', image:img(1), specialties:['Metal Hardware','Zippers','Tools'], rating:4.9, partnerSince:'2024', featuredCollections:['Bag Making Kits','Bulk Zips'] },
  { id:'b2', name:'Masterji Tailor Shop', description:'Local tailor near campus clearing out canvas scraps, fusing, and old linings.', location:'Hauz Khas Village', image:img(2), specialties:['Canvas','Fusing','Linings'], rating:4.5, partnerSince:'2025', featuredCollections:['Scrap Bins','Toile Canvas'] },
  { id:'b3', name:'Export Surplus Hub', description:'Deadstock fabrics and trims from local export houses. Great for cheap yardage.', location:'Okhla Phase 2', image:img(3), specialties:['Export Surplus','Trims','Synthetic'], rating:4.2, partnerSince:'2024', featuredCollections:['Printed Poly','Lace Rolls'] },
  { id:'b4', name:'Dharavi Leather Scraps', description:'Leftover hides and leather strips from bag manufacturers.', location:'Dharavi, Mumbai', image:img(4), specialties:['Leather','Suede','Veg Tan'], rating:4.7, partnerSince:'2025', featuredCollections:['Scrap Bundles','Suede Squares'] },
  { id:'b5', name:'NIFT TD Lab Supply', description:'Official campus supply for basic muslin and standard dyes. (Administered by lab techs)', location:'Campus Block C', image:img(5), specialties:['Muslin','Basic Dyes','Stationery'], rating:5.0, partnerSince:'2024', featuredCollections:['Draping Muslin','Lab Kits'] },
];
