import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import ProductCard from '../components/ui/ProductCard';
import FilterChips from '../components/ui/FilterChips';
import SearchBar from '../components/ui/SearchBar';
import { categories } from '../data/categories';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { listings } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let results = listings;
    if (activeFilter !== 'all') results = results.filter(p => p.category === activeFilter || p.tags?.some(t => t.toLowerCase() === activeFilter));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(p => p.title.toLowerCase().includes(q) || p.material.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q));
    }
    return results;
  }, [listings, activeFilter, searchQuery]);

  const featured = useMemo(() => listings.filter(p => p.featured).slice(0, 3), [listings]);

  return (
    <PageShell>
      {/* Welcome + Search */}
      <div className="px-5 pt-5 pb-3">
        <div className="mb-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] text-espresso-light font-light">Welcome back to campus,</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-[26px] font-semibold text-espresso leading-tight -mt-0.5">
            {user?.name?.split(' ')[0]} <span className="text-[20px]">✨</span>
          </motion.h2>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} onFocus={() => navigate('/search')} placeholder="Search scraps, hardware, canvas..." />
      </div>

      {/* Filter Chips */}
      <div className="mb-4">
        <FilterChips categories={categories} active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Featured Banner */}
      {featured.length > 0 && !searchQuery && activeFilter === 'all' && (
        <div className="px-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
            style={{ height: 200 }}
            onClick={() => navigate(`/product/${featured[0].id}`)}
          >
            <img src={featured[0].images[0]} alt={featured[0].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="px-2.5 py-1 bg-rust/90 text-white text-[10px] font-semibold rounded-full mb-2 inline-block backdrop-blur-sm">★ Featured Drop</span>
              <h3 className="font-serif text-[22px] text-white font-semibold leading-tight">{featured[0].title}</h3>
              <p className="text-white/70 text-[13px] mt-1 font-light">
                {featured[0].price === 0 ? 'Free / Donate' : `₹${featured[0].price}`} · {featured[0].sellerType}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Section Title */}
      {!searchQuery && activeFilter === 'all' && (
        <div className="px-5 mb-3 flex items-center justify-between">
          <h3 className="font-serif text-[18px] font-semibold text-espresso">Recent Campus Listings</h3>
          <span className="text-[12px] text-rust font-medium">{filtered.length} items</span>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-4 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🧶</div>
            <p className="font-serif text-lg text-espresso mb-1">No scraps found</p>
            <p className="text-[13px] text-warm-gray">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
