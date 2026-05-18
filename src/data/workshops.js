const unsplashWorkshopIds = [
  "photo-1556905055-8f358a7a47b2", // Draping Lab
  "photo-1506806732259-39c2d0268443", // Hardware Attachment
  "photo-1529156069898-49953e39b3ac", // Campus Scrap Exchange Meetup
];

const img = (id, w=600, h=400) => {
  const cleanId = unsplashWorkshopIds[(id - 1) % unsplashWorkshopIds.length];
  return `https://images.unsplash.com/${cleanId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};
export const workshops = [
  { id:'w1', title:'Draping Lab Zero Waste Session', instructor:'Prof. Sharma', date:'2026-05-25', duration:'2 hours', description:'Learn how to drape using only scrap muslin and offcuts.', image:img(1), price:0, tags:['Campus','Draping'], spots:30 },
  { id:'w2', title:'Hardware Attachment Basics', instructor:'Rakesh (Supplier)', date:'2026-05-28', duration:'3 hours', description:'Hands-on session using the eyelet press and setting rivets properly.', image:img(2), price:100, tags:['Hardware','Workshop'], spots:15 },
  { id:'w3', title:'Campus Scrap Exchange Meetup', instructor:'Zero Waste Club', date:'2026-06-01', duration:'4 hours', description:'Bring your leftover materials from last term and exchange them with juniors/seniors.', image:img(3), price:0, tags:['Meetup','Exchange'], spots:100 },
];
