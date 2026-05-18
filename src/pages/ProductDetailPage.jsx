import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, toggleSave, isSaved, addToCart, showToast } = useApp();
  const product = listings.find(p => p.id === id);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center"><div className="text-5xl mb-4">🧵</div><p className="font-serif text-xl text-espresso">Product not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-rust font-medium">Go home</button></div>
    </div>
  );

  const related = listings.filter(p => p.id !== id && p.category === product.category).slice(0, 4);
  const saved = isSaved(product.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-ivory pb-28">
      {/* Back button */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-ivory/80 backdrop-blur-xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center shadow-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleSave(product.id)} className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center shadow-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={saved?'var(--color-rust)':'none'} stroke={saved?'var(--color-rust)':'var(--color-espresso)'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </motion.button>
      </div>

      {/* Hero Image */}
      <div className="px-4 mb-6">
        <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <motion.img layoutId={`img-${product.id}`} src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        {/* Gallery dots */}
        {product.images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {product.images.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i===0?'bg-rust':'bg-cream-dark'}`} />)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 space-y-6">
        {/* Title & Price */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.tags?.map(t => <Badge key={t} variant="sage">{t}</Badge>)}
          </div>
          <h1 className="font-serif text-3xl font-semibold text-espresso leading-tight mb-2">{product.title}</h1>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-rust">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && <span className="text-lg text-warm-gray line-through">₹{product.originalPrice.toLocaleString()}</span>}
            {product.originalPrice && <span className="text-sm font-medium text-sage">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>}
          </div>
        </div>

        {/* Material Specs */}
        <div className="bg-warm-white rounded-2xl p-5 border border-cream-dark/30">
          <h3 className="font-serif text-lg font-semibold text-espresso mb-3">Material Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Composition', product.composition],
              ['GSM', product.gsm],
              ['Texture', product.texture],
              ['Dimensions', product.dimensions],
              ['Size', product.size],
              ['Material', product.material],
            ].map(([label, value]) => value && (
              <div key={label}>
                <p className="text-[11px] uppercase tracking-wider text-warm-gray mb-0.5">{label}</p>
                <p className="text-sm text-espresso font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Story */}
        {product.sustainability && (
          <div className="bg-sage-pale/40 rounded-2xl p-5 border border-sage/10">
            <h3 className="font-serif text-lg font-semibold text-espresso mb-2">🌿 Origin Story</h3>
            <p className="text-sm text-espresso-light leading-relaxed">{product.sustainability}</p>
          </div>
        )}

        {/* Seller Card */}
        <div className="bg-warm-white rounded-2xl p-5 border border-cream-dark/30 flex items-center gap-4">
          <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-2xl shrink-0">🧑‍🎨</div>
          <div className="flex-1">
            <p className="font-semibold text-espresso">{product.seller}</p>
            <Badge variant="sage">{product.sellerType}</Badge>
          </div>
          <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); showToast('Message sent!'); }}>Message</Button>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1" size="lg" onClick={() => { addToCart(product.id); }}>Reserve Material</Button>
          <Button variant="secondary" size="lg" onClick={() => showToast('Message sent to seller!')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </Button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="font-serif text-lg font-semibold text-espresso mb-3">More Like This</h3>
            <div className="grid grid-cols-2 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
