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
];

const img = (id) => {
  const cleanId = unsplashIds[(id - 1) % unsplashIds.length];
  return `https://images.unsplash.com/${cleanId}?auto=format&fit=crop&w=300&h=300&q=80`;
};
export const orders = [
  { id:'ord-1', productId:'p1', productTitle:'Assorted Denim Scraps', productImage:img(1), seller:'Aarav - FD 3rd Year', price:50, status:'completed', orderedAt:'2026-05-10', preparedAt:'2026-05-11', pickedAt:'2026-05-12', completedAt:'2026-05-12', trackingId:'NIFT-2026-001' },
  { id:'ord-2', productId:'p2', productTitle:'Bulk Metal Zippers (YKK)', productImage:img(2), seller:'Ria - KD 2nd Year', price:120, status:'pickup', orderedAt:'2026-05-17', preparedAt:'2026-05-18', pickedAt:null, completedAt:null, trackingId:'NIFT-2026-002' },
  { id:'ord-3', productId:'p4', productTitle:'Muslin Yardage for Draping', productImage:img(4), seller:'Priya - FD 2nd Year', price:0, status:'prepared', orderedAt:'2026-05-18', preparedAt:'2026-05-18', pickedAt:null, completedAt:null, trackingId:'NIFT-2026-003' },
  { id:'ord-4', productId:'p6', productTitle:'Brass D-Rings & Rivets', productImage:img(6), seller:'Local Supplier', price:150, status:'ordered', orderedAt:'2026-05-18', preparedAt:null, pickedAt:null, completedAt:null, trackingId:'NIFT-2026-004' },
];
