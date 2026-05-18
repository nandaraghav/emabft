import { motion } from 'framer-motion';

export default function FilterChips({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-5">
      {categories.map(cat => {
        const isActive = active === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-rust text-white border-rust shadow-sm'
                : 'bg-warm-white text-espresso-light border-cream-dark hover:border-rust/30 hover:bg-cream'
            }`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
