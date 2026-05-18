import { createContext, useContext, useState, useCallback } from 'react';
import { products as defaultProducts } from '../data/products';

const AppContext = createContext(null);

function loadFromStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }) {
  const [listings, setListings] = useState(() => loadFromStorage('stitched_listings_v5', defaultProducts));
  const [savedScraps, setSavedScraps] = useState(() => loadFromStorage('stitched_saved_v5', []));
  const [cart, setCart] = useState(() => loadFromStorage('stitched_cart_v5', []));
  const [recentSearches, setRecentSearches] = useState(() => loadFromStorage('stitched_searches_v5', []));
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const addListing = useCallback((listing) => {
    const newListing = { ...listing, id: 'p-' + Date.now(), createdAt: new Date().toISOString().slice(0, 10), featured: false };
    setListings(prev => { const next = [newListing, ...prev]; saveToStorage('stitched_listings_v5', next); return next; });
    showToast('Listing published successfully!');
    return newListing;
  }, [showToast]);

  const deleteListing = useCallback((id) => {
    setListings(prev => { const next = prev.filter(p => p.id !== id); saveToStorage('stitched_listings_v5', next); return next; });
    showToast('Listing deleted', 'info');
  }, [showToast]);

  const toggleFeature = useCallback((id) => {
    setListings(prev => {
      const next = prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
      saveToStorage('stitched_listings_v5', next);
      return next;
    });
  }, []);

  const toggleSave = useCallback((productId) => {
    setSavedScraps(prev => {
      const next = prev.includes(productId) ? prev.filter(x => x !== productId) : [...prev, productId];
      saveToStorage('stitched_saved_v5', next);
      return next;
    });
  }, []);

  const isSaved = useCallback((productId) => savedScraps.includes(productId), [savedScraps]);

  const addToCart = useCallback((productId) => {
    setCart(prev => {
      if (prev.includes(productId)) return prev;
      const next = [...prev, productId];
      saveToStorage('stitched_cart_v5', next);
      return next;
    });
    showToast('Reserved successfully!');
  }, [showToast]);

  const addRecentSearch = useCallback((query) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const next = [query, ...prev.filter(s => s !== query)].slice(0, 8);
      saveToStorage('stitched_searches_v5', next);
      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    saveToStorage('stitched_searches_v5', []);
  }, []);

  return (
    <AppContext.Provider value={{
      listings, addListing, deleteListing, toggleFeature,
      savedScraps, toggleSave, isSaved,
      cart, addToCart,
      recentSearches, addRecentSearch, clearRecentSearches,
      toasts, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
