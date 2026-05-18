import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import FilterChips from '../components/ui/FilterChips';
import { categories, searchSuggestions } from '../data/categories';
import { useApp } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { listings, recentSearches, addRecentSearch, clearRecentSearches } = useApp();
  const debouncedQuery = useDebounce(query, 250);

  const results = useMemo(() => {
    if (!debouncedQuery && activeFilter === 'all') return [];
    let r = listings;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      r = r.filter(p => p.title.toLowerCase().includes(q) || p.material.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)));
    }
    if (activeFilter !== 'all') r = r.filter(p => p.category === activeFilter);
    return r;
  }, [listings, debouncedQuery, activeFilter]);

  const handleSearch = (q) => { setQuery(q); if (q.trim()) addRecentSearch(q.trim()); };

  return (
    <PageShell>
      <div className="px-5 pt-4 pb-2">
        <h2 className="font-serif text-2xl font-semibold text-espresso mb-4">Discover</h2>
        <SearchBar value={query} onChange={setQuery} autoFocus placeholder="Search textiles, fabrics, artisans..." />
      </div>
      <FilterChips categories={categories} active={activeFilter} onChange={setActiveFilter} />

      <div className="px-5 mt-2">
        {!debouncedQuery && activeFilter === 'all' ? (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base font-semibold text-espresso">Recent Searches</h3>
                  <button onClick={clearRecentSearches} className="text-xs text-rust font-medium">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button key={s} onClick={() => handleSearch(s)} className="px-3.5 py-2 bg-cream rounded-full text-sm text-espresso-light hover:bg-cream-dark transition-colors">🕐 {s}</button>
                  ))}
                </div>
              </div>
            )}
            {/* Suggestions */}
            <div>
              <h3 className="font-serif text-base font-semibold text-espresso mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map(s => (
                  <button key={s} onClick={() => handleSearch(s)} className="px-3.5 py-2 bg-sage-pale text-sage rounded-full text-sm font-medium hover:bg-sage/20 transition-colors">{s}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-warm-gray mb-4">{results.length} result{results.length !== 1 ? 's' : ''}</p>
            {results.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-serif text-lg text-espresso mb-1">No results found</p>
                <p className="text-sm text-warm-gray">Try different keywords or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}
