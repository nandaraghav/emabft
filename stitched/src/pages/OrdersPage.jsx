import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import ProgressTracker from '../components/ui/ProgressTracker';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { orders } from '../data/orders';

const statusColors = { ordered: 'rust', prepared: 'rust', pickup: 'sage', completed: 'sage' };

export default function OrdersPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 mb-5">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center shadow-soft">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </motion.button>
          <h2 className="font-serif text-2xl font-semibold text-espresso">Orders</h2>
        </div>

        <div className="space-y-4 mb-8">
          {orders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-warm-white rounded-3xl border border-cream-dark/40 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex gap-4 mb-5">
                  <img src={order.productImage} alt={order.productTitle} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-serif text-[15px] font-semibold text-espresso line-clamp-1 mb-0.5">{order.productTitle}</p>
                    <p className="text-[12px] text-warm-gray">{order.seller}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[14px] font-bold text-rust">₹{order.price.toLocaleString()}</span>
                      <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                    </div>
                  </div>
                </div>
                <ProgressTracker status={order.status} />
                <div className="mt-4 pt-4 border-t border-cream-dark/30 flex items-center justify-between">
                  <div className="text-[11px] text-warm-gray flex flex-col gap-0.5">
                    <span className="font-medium text-espresso-light">{order.trackingId}</span>
                    <span>{order.orderedAt}</span>
                  </div>
                  {order.status === 'pickup' && (
                    <div className="flex items-center gap-1 text-[12px] text-sage font-semibold bg-sage-pale/40 px-3 py-1.5 rounded-full">
                      <span>📱</span> QR Ready
                    </div>
                  )}
                </div>
              </div>
              {order.status === 'pickup' && (
                <div className="bg-sage-pale/20 px-5 py-4 border-t border-cream-dark/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warm-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-cream-dark/20">📦</div>
                    <div><p className="text-[13px] font-semibold text-espresso">Ready for Pickup</p><p className="text-[11px] text-warm-gray mt-0.5">Show QR at collection point</p></div>
                  </div>
                  <div className="w-11 h-11 bg-espresso rounded-xl flex items-center justify-center shadow-sm"><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="19" y="14" width="2" height="2"/><rect x="14" y="19" width="2" height="2"/><rect x="19" y="19" width="2" height="2"/></svg></div>
                </div>
              )}
              {order.status === 'completed' && (
                <div className="px-5 py-3 border-t border-cream-dark/20 bg-cream/30">
                  <Button variant="ghost" size="md" className="w-full text-[13px] font-semibold text-espresso hover:bg-cream" onClick={() => navigate(`/product/${order.productId}`)}>Reorder Item</Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
