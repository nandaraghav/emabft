import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { path: '/', label: 'Home', icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?"var(--color-rust)":"none"} stroke={a?"var(--color-rust)":"var(--color-warm-gray)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-8 9 8"/><path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10"/></svg> },
  { path: '/search', label: 'Search', icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?"var(--color-rust)":"var(--color-warm-gray)"} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg> },
  { path: '/list', label: 'List', icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?"var(--color-rust)":"none"} stroke={a?"var(--color-rust)":"var(--color-warm-gray)"} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg> },
  { path: '/boutique', label: 'Boutique', icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?"var(--color-rust)":"none"} stroke={a?"var(--color-rust)":"var(--color-warm-gray)"} strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-6 9 6"/><path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9"/><path d="M9 21V13h6v8"/></svg> },
  { path: '/profile', label: 'Profile', icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?"var(--color-rust)":"none"} stroke={a?"var(--color-rust)":"var(--color-warm-gray)"} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg> },
];

export default function BottomNav() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  if (location.pathname.startsWith('/product/') || location.pathname.startsWith('/boutique/') || location.pathname === '/orders' || location.pathname === '/admin') return null;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 bg-warm-white border-t border-cream-dark/40" style={{ boxShadow: 'var(--shadow-nav)' }}>
      <div className="flex items-center justify-around px-2 pt-2 pb-3" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)' }}>
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <NavLink key={tab.path} to={tab.path} className="flex flex-col items-center gap-1 px-4 py-1 relative">
              <motion.div whileTap={{ scale: 0.82 }} className="relative flex items-center justify-center w-8 h-8">
                {tab.icon(active)}
              </motion.div>
              <span className={`text-[10px] tracking-wide ${active ? 'text-rust font-semibold' : 'text-warm-gray font-medium'}`}>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
