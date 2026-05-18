export default function SearchBar({ value, onChange, onFocus, placeholder = 'Search textiles, fabrics, artisans...', autoFocus = false }) {
  return (
    <div className="relative">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-gray)" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-cream rounded-2xl text-sm text-espresso placeholder:text-warm-gray border border-cream-dark focus:border-rust/40 focus:bg-warm-white transition-all"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-espresso">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  );
}
