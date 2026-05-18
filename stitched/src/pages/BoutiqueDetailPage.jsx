import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { boutiques } from '../data/boutiques';
import { useApp } from '../context/AppContext';

export default function BoutiqueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const boutique = boutiques.find(b => b.id === id);

  if (!boutique) return <div className="min-h-screen flex items-center justify-center"><p className="font-serif text-lg text-espresso">Boutique not found</p></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-ivory pb-28">
      <div className="sticky top-0 z-30 px-4 py-3 bg-ivory/80 backdrop-blur-xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center shadow-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </motion.button>
      </div>
      <div className="px-4 mb-6"><div className="rounded-3xl overflow-hidden" style={{ height: 240 }}><img src={boutique.image} alt={boutique.name} className="w-full h-full object-cover" /></div></div>
      <div className="px-5 space-y-5">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-espresso mb-1">{boutique.name}</h1>
          <p className="text-sm text-warm-gray mb-3">📍 {boutique.location} · ⭐ {boutique.rating} · Partner since {boutique.partnerSince}</p>
          <p className="text-sm text-espresso-light leading-relaxed">{boutique.description}</p>
        </div>
        <div><h3 className="font-serif text-base font-semibold text-espresso mb-2">Specialties</h3><div className="flex flex-wrap gap-2">{boutique.specialties.map(s => <Badge key={s} variant="sage">{s}</Badge>)}</div></div>
        <div><h3 className="font-serif text-base font-semibold text-espresso mb-2">Featured Collections</h3>
          {boutique.featuredCollections.map(c => (
            <div key={c} className="bg-warm-white rounded-xl p-4 border border-cream-dark/30 mb-2 flex items-center justify-between">
              <span className="font-medium text-sm text-espresso">{c}</span><Badge variant="rust">New</Badge>
            </div>
          ))}
        </div>
        <Button className="w-full" size="lg" onClick={() => showToast('Sample request sent!')}>Request Samples</Button>
      </div>
    </motion.div>
  );
}
