import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { users } from '../data/users';

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const { listings, deleteListing, toggleFeature } = useApp();
  const navigate = useNavigate();

  if (!isAdmin) { navigate('/'); return null; }

  const stats = useMemo(() => ({
    totalListings: listings.length,
    totalUsers: users.length,
    featured: listings.filter(l => l.featured).length,
    revenue: listings.reduce((sum, l) => sum + l.price, 0),
  }), [listings]);

  const chartData = [
    { label: 'Silk', value: listings.filter(l => l.category === 'silk').length },
    { label: 'Cotton', value: listings.filter(l => l.category === 'cotton').length },
    { label: 'Denim', value: listings.filter(l => l.category === 'denim').length },
    { label: 'Linen', value: listings.filter(l => l.category === 'linen').length },
    { label: 'Leather', value: listings.filter(l => l.category === 'leather').length },
    { label: 'Other', value: listings.filter(l => !['silk','cotton','denim','linen','leather'].includes(l.category)).length },
  ];
  const maxVal = Math.max(...chartData.map(d => d.value), 1);

  return (
    <PageShell>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 mb-5">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center shadow-soft">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </motion.button>
          <div><h2 className="font-serif text-2xl font-semibold text-espresso">Admin Panel</h2><p className="text-xs text-warm-gray">Manage the marketplace</p></div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Total Listings', value: stats.totalListings, icon: '📦', color: 'text-rust' },
            { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'text-sage' },
            { label: 'Featured', value: stats.featured, icon: '⭐', color: 'text-rust' },
            { label: 'Total Value', value: `₹${(stats.revenue/1000).toFixed(0)}K`, icon: '💰', color: 'text-sage' },
          ].map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-warm-white rounded-2xl p-5 border border-cream-dark/40 shadow-sm flex flex-col justify-between">
              <div className="text-3xl mb-3">{card.icon}</div>
              <div>
                <p className={`text-[26px] leading-none font-bold ${card.color} mb-1`}>{card.value}</p>
                <p className="text-[11px] uppercase tracking-wide text-warm-gray">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-warm-white rounded-3xl p-6 border border-cream-dark/40 shadow-sm mb-8">
          <h3 className="font-serif text-[18px] font-semibold text-espresso mb-6">Listings by Category</h3>
          <div className="flex items-end gap-3 h-36">
            {chartData.map(d => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / maxVal) * 100}%` }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full bg-rust/80 rounded-t-xl min-h-[4px]" />
                <span className="text-[10px] text-warm-gray text-center leading-tight line-clamp-1 w-full">{d.label}</span>
                <span className="text-[11px] font-bold text-espresso">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="mb-8">
          <h3 className="font-serif text-[18px] font-semibold text-espresso mb-4">Users</h3>
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="bg-warm-white rounded-2xl p-4 border border-cream-dark/40 flex items-center gap-4">
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1"><p className="font-semibold text-[15px] text-espresso leading-tight">{u.name}</p><p className="text-[12px] text-warm-gray">@{u.username}</p></div>
                <Badge variant={u.role === 'admin' ? 'rust' : 'sage'}>{u.role}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Listings Moderation */}
        <div className="mb-10">
          <h3 className="font-serif text-[18px] font-semibold text-espresso mb-4">Manage Listings</h3>
          <div className="space-y-3">
            {listings.slice(0, 15).map(l => (
              <div key={l.id} className="bg-warm-white rounded-2xl p-4 border border-cream-dark/40 flex items-center gap-3">
                <img src={l.images[0]} alt={l.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-espresso line-clamp-1 leading-tight mb-1">{l.title}</p>
                  <p className="text-[12px] text-warm-gray">₹{l.price.toLocaleString()} · {l.seller}</p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleFeature(l.id)} className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-semibold ${l.featured ? 'bg-rust/10 text-rust' : 'bg-cream text-warm-gray'}`}>
                    {l.featured ? '★' : '☆'}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteListing(l.id)} className="w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-semibold bg-red-50 text-red-500">✕</motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
