import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { toggleSave, isSaved, addToCart } = useApp();
  const saved = isSaved(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl bg-cream mb-2.5" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
          onError={(e) => { e.target.style.display='none'; }}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Top tags */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {product.featured && (
            <span className="px-2 py-[3px] bg-rust text-white text-[10px] font-semibold rounded-full backdrop-blur-sm">★ Featured</span>
          )}
        </div>

        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={(e) => { e.stopPropagation(); toggleSave(product.id); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-warm-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm"
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? 'var(--color-rust)' : 'none'} stroke={saved ? 'var(--color-rust)' : 'var(--color-espresso-light)'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </motion.button>

        {/* Quick Reserve - bottom of image */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
          className="absolute bottom-2.5 left-2.5 right-2.5 py-2 bg-warm-white/90 backdrop-blur-md text-espresso text-[11px] font-semibold rounded-xl text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-sm"
        >
          Reserve · ₹{product.price.toLocaleString()}
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-0.5 space-y-1">
        <h3 className="font-serif text-[14px] font-semibold text-espresso leading-snug line-clamp-1">{product.title}</h3>
        <p className="text-[12px] text-espresso-light leading-none">{product.seller}</p>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-[2px] bg-sage-pale text-sage text-[9px] font-semibold rounded-full">{product.sellerType}</span>
          <span className="text-[9px] text-warm-gray">{product.size}</span>
        </div>
        <div className="flex items-baseline gap-1.5 pt-0.5">
          <span className="text-[14px] font-bold text-espresso">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-warm-gray line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
