const unsplashIds = [
  "photo-1582485565167-75055e5e6b5b", // 1. Denim
  "photo-1544816155-12df9643f363", // 2. Zippers
  "photo-1530587191325-3db32d826c18", // 3. Tan Leather
  "photo-1528459801416-a9e53bbf4e17", // 4. Muslin
  "photo-1563245372-f21724e3856d", // 5. Silk Swatches
  "photo-1590534247854-e97d5e3feef6", // 6. Hardware
  "photo-1506806732259-39c2d0268443", // 7. Thread
  "photo-1618220179428-22790b461013", // 8. Chanderi Silk
  "photo-1513542789411-b6a5d4f31634", // 9. Canvas
  "photo-1516962215378-7fa2e137ae93", // 10. Press Tool
  "photo-1584308666744-24d5c474f2ae", // 11. Lace Trims
  "photo-1598971861713-54ad16a7e72e", // 12. Organic Cotton
  "photo-1586075010923-2dd45e9b2d4f", // 13. Pattern Paper
  "photo-1603561591411-07134e71a2a9", // 14. Buttons
  "photo-1606744824163-985d376605aa", // 15. Printed Crepe
  "photo-1508962914676-134849a727f0", // 16. Suede
  "photo-1621939514649-280e2ee37f60", // 17. Webbing
  "photo-1582281486745-f09c6dc67d02", // 18. Fusing
  "photo-1549490349-8643362247b5", // 19. Wool Felt
  "photo-1617038260897-41a1f14a8ca0", // 20. Buckles
];

const img = (id, w=600, h=800) => {
  const cleanId = unsplashIds[(id - 1) % unsplashIds.length];
  return `https://images.unsplash.com/${cleanId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};

const img2 = (id, w=600, h=800) => {
  const cleanId = unsplashIds[id % unsplashIds.length];
  return `https://images.unsplash.com/${cleanId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};

export const products = [
  { id:'p1', title:'Assorted Denim Scraps', material:'Denim', seller:'Aarav - FD 3rd Year', sellerId:'user-1', sellerType:'Student', price:50, originalPrice:150, images:[img(1), img2(1)], size:'Various small cuts', gsm:340, composition:'98% Cotton', texture:'Raw selvedge and washed pieces', dimensions:'Mostly 10x10cm to 30x20cm', category:'fabric', tags:['Zero Waste Project'], sustainability:'Leftover from my final term garment construction assignment.', featured:true, createdAt:'2026-05-10' },
  { id:'p2', title:'Bulk Metal Zippers (YKK)', material:'Metal Hardware', seller:'Ria - KD 2nd Year', sellerId:'user-2', sellerType:'Student', price:120, originalPrice:300, images:[img(2), img2(2)], size:'15cm to 30cm', gsm:0, composition:'Brass and Nylon', texture:'Smooth zip', dimensions:'10 pieces', category:'hardware', tags:['Sample Collection'], sustainability:'Bought too many for my knitwear project. Selling at bulk cost.', featured:true, createdAt:'2026-05-12' },
  { id:'p3', title:'Tan Leather Offcuts', material:'Leather', seller:'Karan - LD 4th Year', sellerId:'user-1', sellerType:'Student', price:80, originalPrice:0, images:[img(3), img2(3)], size:'Half a hide of scraps', gsm:800, composition:'Veg Tanned Buffalo', texture:'Smooth with some grain marks', dimensions:'Various strips', category:'leather', tags:['Upcycled'], sustainability:'Scraps from my graduation project bag collection. Good for small accessories or testing.', featured:false, createdAt:'2026-05-14' },
  { id:'p4', title:'Muslin Yardage for Draping', material:'Cotton', seller:'Priya - FD 2nd Year', sellerId:'user-2', sellerType:'Student', price:0, originalPrice:200, images:[img(4)], size:'1.5 meters', gsm:90, composition:'100% Unbleached Cotton', texture:'Basic draping muslin', dimensions:'150cm x 110cm', category:'free', tags:['Free for Students', 'Leftover Metre'], sustainability:'Donating leftover muslin. Pick up from hostel block B.', featured:true, createdAt:'2026-05-15' },
  { id:'p5', title:'Fabric Science Silk Swatches', material:'Silk', seller:'Amit - TD 3rd Year', sellerId:'user-1', sellerType:'Student', price:100, originalPrice:250, images:[img(5)], size:'10x10cm squares', gsm:0, composition:'Various silks (Tussar, Mulberry)', texture:'Mixed', dimensions:'20 swatches', category:'swatches', tags:['Sample Collection'], sustainability:'Perfect for 1st/2nd year Fabric Science submissions. Already labeled.', featured:false, createdAt:'2026-05-16' },
  { id:'p6', title:'Brass D-Rings & Rivets', material:'Metal Hardware', seller:'Local Supplier', sellerId:'b1', sellerType:'Boutique/Shop', price:150, originalPrice:0, images:[img(6)], size:'Pack of 50', gsm:0, composition:'Solid Brass', texture:'Antiqued finish', dimensions:'1 inch rings', category:'hardware', tags:['Deadstock'], sustainability:'Deadstock from a local leather workshop closing down.', featured:true, createdAt:'2026-05-17' },
  { id:'p7', title:'Half Spool of Gutermann Thread', material:'Synthetic / Nylon', seller:'Neha - FC 4th Year', sellerId:'user-2', sellerType:'Student', price:0, originalPrice:100, images:[img(7)], size:'Half spool', gsm:0, composition:'100% Polyester', texture:'Strong thread', dimensions:'~500m', category:'free', tags:['Free for Students'], sustainability:'Black heavy duty thread. Just take it.', featured:false, createdAt:'2026-05-18' },
  { id:'p8', title:'Chanderi Silk Scrap Bundle', material:'Silk', seller:'Rohan - TD 2nd Year', sellerId:'user-1', sellerType:'Student', price:200, originalPrice:500, images:[img(8)], size:'Various large cuts', gsm:60, composition:'Silk Cotton Blend', texture:'Sheer with zari', dimensions:'0.5m to 1m pieces', category:'fabric', tags:['Upcycled'], sustainability:'Leftovers from my traditional textiles cluster project.', featured:false, createdAt:'2026-05-09' },
  { id:'p9', title:'Canvas Offcuts for Toiles', material:'Cotton', seller:'Tailor Shop near Campus', sellerId:'b2', sellerType:'Tailor', price:50, originalPrice:0, images:[img(9)], size:'Large bin', gsm:300, composition:'Heavy Cotton Canvas', texture:'Stiff', dimensions:'Various', category:'fabric', tags:['Deadstock'], sustainability:'Masterji is clearing out old canvas scraps. Good for structured toiles.', featured:false, createdAt:'2026-05-11' },
  { id:'p10', title:'Grommets & Eyelet Press Tool', material:'Metal Hardware', seller:'Vaishnavi - FD 3rd Year', sellerId:'user-2', sellerType:'Student', price:300, originalPrice:800, images:[img(10)], size:'1 Tool + 100 Eyelets', gsm:0, composition:'Steel', texture:'Smooth', dimensions:'Standard size', category:'hardware', tags:['Exchange Only'], sustainability:'Will also exchange for good quality pattern making paper.', featured:true, createdAt:'2026-05-13' },
  { id:'p11', title:'Leftover Lace Trims', material:'Synthetic / Nylon', seller:'Simran - KD 4th Year', sellerId:'user-1', sellerType:'Student', price:60, originalPrice:150, images:[img(11)], size:'3 meters total', gsm:0, composition:'Nylon/Cotton', texture:'Scalloped edge', dimensions:'3m x 5cm', category:'trims', tags:['Leftover Metre'], sustainability:'White and ivory lace trims from a bridal project.', featured:false, createdAt:'2026-05-08' },
  { id:'p12', title:'Organic Cotton Swatch Book', material:'Cotton', seller:'Textile Dept', sellerId:'user-1', sellerType:'Dept', price:0, originalPrice:0, images:[img(12)], size:'A5 Booklet', gsm:0, composition:'100% Organic', texture:'Various weaves', dimensions:'A5', category:'swatches', tags:['Free for Students'], sustainability:'Surplus swatch books from last year\'s industry visit. Collect from TD lab.', featured:true, createdAt:'2026-05-18' },
  { id:'p13', title:'Pattern Making Paper Roll (Half)', material:'Mixed Media', seller:'Arjun - FD 1st Year', sellerId:'user-2', sellerType:'Student', price:100, originalPrice:300, images:[img(13)], size:'Half roll', gsm:120, composition:'Brown Kraft Paper', texture:'Smooth', dimensions:'~10 meters left', category:'fabric', tags:['Leftover Metre'], sustainability:'Bought too much. Dropping out of FD, switching to FC. Take it.', featured:false, createdAt:'2026-05-01' },
  { id:'p14', title:'Magnetic Snaps / Buttons', material:'Metal Hardware', seller:'LD Senior', sellerId:'user-1', sellerType:'Student', price:80, originalPrice:200, images:[img(14)], size:'20 pairs', gsm:0, composition:'Brass/Magnet', texture:'Polished', dimensions:'18mm', category:'hardware', tags:['Sample Collection'], sustainability:'Extra hardware from bag making module.', featured:false, createdAt:'2026-05-05' },
  { id:'p15', title:'Printed Crepe Scraps', material:'Synthetic / Nylon', seller:'Boutique Surplus', sellerId:'b3', sellerType:'Boutique/Shop', price:40, originalPrice:0, images:[img(15)], size:'Small strips', gsm:100, composition:'Poly Crepe', texture:'Fluid', dimensions:'Mostly bias cut strips', category:'fabric', tags:['Zero Waste Project'], sustainability:'Good for making bias binding or small patchwork.', featured:false, createdAt:'2026-05-07' },
  { id:'p16', title:'Suede Leather Squares', material:'Leather', seller:'Karan - LD 4th Year', sellerId:'user-1', sellerType:'Student', price:150, originalPrice:400, images:[img(16)], size:'15x15cm', gsm:600, composition:'Goat Suede', texture:'Velvety soft', dimensions:'10 squares', category:'leather', tags:['Upcycled'], sustainability:'Precision cut squares for a modular bag project that I never finished.', featured:true, createdAt:'2026-05-02' },
  { id:'p17', title:'Nylon Webbing Straps', material:'Synthetic / Nylon', seller:'Aditi - FC 2nd Year', sellerId:'user-2', sellerType:'Student', price:0, originalPrice:0, images:[img(17)], size:'2 meters each', gsm:0, composition:'Nylon', texture:'Ribbed', dimensions:'Black and Neon Green', category:'free', tags:['Free for Students'], sustainability:'Leftover from a styling shoot props. Free to whoever needs them.', featured:false, createdAt:'2026-05-04' },
  { id:'p18', title:'Fusing / Interfacing Scraps', material:'Mixed Media', seller:'FD Lab Tech', sellerId:'user-1', sellerType:'Staff', price:20, originalPrice:0, images:[img(18)], size:'Large bag', gsm:50, composition:'Fusible Poly-cotton', texture:'Stiff, glue backed', dimensions:'Various irregular cuts', category:'fabric', tags:['Zero Waste Project'], sustainability:'Collected from the pattern lab floor. Good enough for small collars/cuffs.', featured:false, createdAt:'2026-05-18' },
  { id:'p19', title:'Wool Felt Swatches', material:'Wool', seller:'Knitwear Dept', sellerId:'user-2', sellerType:'Dept', price:100, originalPrice:0, images:[img(19)], size:'Binder', gsm:400, composition:'100% Wool', texture:'Felted', dimensions:'A4 pages of swatches', category:'swatches', tags:['Sample Collection'], sustainability:'Archived swatch books being cleared out.', featured:true, createdAt:'2026-05-10' },
  { id:'p20', title:'Buckles and Sliders', material:'Metal Hardware', seller:'Rakesh Hardware Shop', sellerId:'b1', sellerType:'Supplier', price:180, originalPrice:0, images:[img(20)], size:'Mixed Bag', gsm:0, composition:'Alloy', texture:'Mixed finishes', dimensions:'Various sizes', category:'hardware', tags:['Deadstock'], sustainability:'Old stock clearance for students.', featured:false, createdAt:'2026-05-15' }
];
// Pad to 30 with similar items if needed, but 20 is enough for a rich mockup. I'll just duplicate some to reach 30.
for(let i=21; i<=30; i++) {
  products.push({...products[i-21], id: `p${i}`, title: products[i-21].title + ' (More)'});
}
