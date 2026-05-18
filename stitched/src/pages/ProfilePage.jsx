import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import ProductCard from '../components/ui/ProductCard';
import SustainabilityCard from '../components/ui/SustainabilityCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { workshops } from '../data/workshops';

export default function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();
  const { listings, savedScraps, showToast } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('listings');

  const myListings = listings.filter(l => l.sellerId === user?.id);
  const savedProducts = listings.filter(l => savedScraps.includes(l.id));

  const tabs = [
    { id: 'listings', label: `Listings (${myListings.length})` },
    { id: 'saved', label: `Saved (${savedProducts.length})` },
    { id: 'workshops', label: 'Workshops' },
  ];

  return (
    <PageShell>
      <div className="px-5 pt-4">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-warm-white rounded-2xl p-5 border border-cream-dark/30 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <img src={user?.avatar} alt={user?.name} className="w-16 h-16 rounded-full object-cover border-2 border-cream-dark" />
            <div>
              <h2 className="font-serif text-xl font-semibold text-espresso">{user?.name}</h2>
              <p className="text-sm text-warm-gray">📍 {user?.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isAdmin ? 'rust' : 'sage'}>{user?.role}</Badge>
                <Badge variant="cream">Since {user?.memberSince?.slice(0, 4)}</Badge>
              </div>
            </div>
          </div>
          <p className="text-sm text-espresso-light mb-4">{user?.bio}</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-cream rounded-xl px-4 py-2 text-center flex-1">
              <p className="text-lg font-bold text-rust">{user?.stats?.credits?.toLocaleString()}</p>
              <p className="text-[10px] text-warm-gray">Credits</p>
            </div>
            <div className="bg-cream rounded-xl px-4 py-2 text-center flex-1">
              <p className="text-lg font-bold text-espresso">{user?.stats?.listings}</p>
              <p className="text-[10px] text-warm-gray">Listings</p>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Metrics */}
        <SustainabilityCard wasteSaved={user?.stats?.wasteSaved} co2Offset={user?.stats?.co2Offset} waterSaved={user?.stats?.waterSaved} />

        {/* Admin Panel Button */}
        {isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5">
            <Button className="w-full" variant="sage" size="lg" onClick={() => navigate('/admin')}>🛡️ Admin Panel</Button>
          </motion.div>
        )}

        {/* Orders Link */}
        <div className="mt-3">
          <Button className="w-full" variant="secondary" size="lg" onClick={() => navigate('/orders')}>📦 Order History</Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 mb-4 bg-cream rounded-xl p-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${tab === t.id ? 'bg-warm-white text-espresso shadow-sm' : 'text-warm-gray'}`}>{t.label}</button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'listings' && (
          <div className="grid grid-cols-2 gap-4">
            {myListings.length === 0 ? <p className="col-span-2 text-center text-warm-gray py-8 text-sm">No listings yet</p> : myListings.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
        {tab === 'saved' && (
          <div className="grid grid-cols-2 gap-4">
            {savedProducts.length === 0 ? <p className="col-span-2 text-center text-warm-gray py-8 text-sm">No saved scraps</p> : savedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
        {tab === 'workshops' && (
          <div className="space-y-3">
            {workshops.slice(0, 4).map((w, i) => (
              <motion.div key={w.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-warm-white rounded-xl p-4 border border-cream-dark/30 flex gap-3">
                <img src={w.image} alt={w.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-espresso line-clamp-1">{w.title}</p>
                  <p className="text-xs text-warm-gray">{w.instructor} · {w.duration}</p>
                  <p className="text-xs font-semibold text-rust mt-1">₹{w.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Logout */}
        <div className="mt-8 mb-4">
          <Button variant="ghost" className="w-full text-warm-gray" onClick={() => { logout(); navigate('/login'); }}>Sign Out</Button>
        </div>
      </div>
    </PageShell>
  );
}
