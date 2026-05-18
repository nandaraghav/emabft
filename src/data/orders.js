const img = (id) => `https://picsum.photos/seed/scrap${id}/300/300`;
export const orders = [
  { id:'ord-1', productId:'p1', productTitle:'Assorted Denim Scraps', productImage:img(1), seller:'Aarav - FD 3rd Year', price:50, status:'completed', orderedAt:'2026-05-10', preparedAt:'2026-05-11', pickedAt:'2026-05-12', completedAt:'2026-05-12', trackingId:'NIFT-2026-001' },
  { id:'ord-2', productId:'p2', productTitle:'Bulk Metal Zippers (YKK)', productImage:img(2), seller:'Ria - KD 2nd Year', price:120, status:'pickup', orderedAt:'2026-05-17', preparedAt:'2026-05-18', pickedAt:null, completedAt:null, trackingId:'NIFT-2026-002' },
  { id:'ord-3', productId:'p4', productTitle:'Muslin Yardage for Draping', productImage:img(4), seller:'Priya - FD 2nd Year', price:0, status:'prepared', orderedAt:'2026-05-18', preparedAt:'2026-05-18', pickedAt:null, completedAt:null, trackingId:'NIFT-2026-003' },
  { id:'ord-4', productId:'p6', productTitle:'Brass D-Rings & Rivets', productImage:img(6), seller:'Local Supplier', price:150, status:'ordered', orderedAt:'2026-05-18', preparedAt:null, pickedAt:null, completedAt:null, trackingId:'NIFT-2026-004' },
];
