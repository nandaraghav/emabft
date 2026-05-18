import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function TopNav() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { cart } = useApp();
  if (!isLoggedIn) return null;

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-2xl border-b border-cream-dark/20">
      <div className="flex items-center justify-between px-5 py-3.5">
        <motion.h1
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="font-serif text-[22px] font-semibold text-rust cursor-pointer tracking-tight"
        >
          Stitched
        </motion.h1>
        <div className="flex items-center gap-1.5">
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('/search')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream/60 active:bg-cream transition-colors" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </motion.button>
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('/orders')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream/60 active:bg-cream transition-colors relative" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-rust text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">{cart.length}</span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
