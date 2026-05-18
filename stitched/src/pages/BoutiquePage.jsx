import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { boutiques } from '../data/boutiques';
import { useApp } from '../context/AppContext';

export default function BoutiquePage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const hero = boutiques[0];

  return (
    <PageShell>
      <div className="px-5 pt-4">
        <h2 className="font-serif text-2xl font-semibold text-espresso mb-1">Boutique Hub</h2>
        <p className="text-sm text-warm-gray mb-5">Curated textile sourcing partners</p>
      </div>

      {/* Hero Featured Boutique */}
      <div className="px-5 mb-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: 220 }} onClick={() => navigate(`/boutique/${hero.id}`)}>
          <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="px-2.5 py-1 bg-rust text-white text-[10px] font-semibold rounded-full mb-2 inline-block">Featured Partner</span>
            <h3 className="font-serif text-2xl text-white font-semibold">{hero.name}</h3>
            <p className="text-white/70 text-sm mt-1">{hero.location}</p>
          </div>
        </motion.div>
      </div>

      {/* Material Categories */}
      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg font-semibold text-espresso mb-3">Source by Category</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Silk Sourcing', 'Organic Cotton', 'Artisan Weaves', 'Upcycled Materials'].map((cat, i) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-warm-white rounded-xl p-4 border border-cream-dark/30 hover:shadow-card transition-shadow cursor-pointer" onClick={() => showToast(`Exploring ${cat}`)}>
              <div className="text-2xl mb-2">{['🦋', '☁️', '🧶', '♻️'][i]}</div>
              <p className="font-medium text-sm text-espresso">{cat}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner Boutiques Grid */}
      <div className="px-5">
        <h3 className="font-serif text-lg font-semibold text-espresso mb-3">All Partners</h3>
        <div className="space-y-4">
          {boutiques.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-warm-white rounded-2xl overflow-hidden border border-cream-dark/30 hover:shadow-card transition-shadow cursor-pointer"
              onClick={() => navigate(`/boutique/${b.id}`)}
            >
              <div className="flex gap-4 p-4">
                <img src={b.image} alt={b.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-base font-semibold text-espresso mb-0.5">{b.name}</h4>
                  <p className="text-xs text-warm-gray mb-2">{b.location}</p>
                  <div className="flex flex-wrap gap-1">
                    {b.specialties.slice(0, 3).map(s => <Badge key={s} variant="sage">{s}</Badge>)}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <span className="text-sm font-semibold text-espresso">⭐ {b.rating}</span>
                  <span className="text-[10px] text-warm-gray">Since {b.partnerSince}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
