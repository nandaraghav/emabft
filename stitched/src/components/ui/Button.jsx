import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', loading = false, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 disabled:opacity-50';
  const variants = {
    primary: 'bg-rust text-white hover:bg-rust-dark shadow-sm',
    secondary: 'bg-transparent text-rust border-2 border-rust hover:bg-rust/5',
    ghost: 'bg-transparent text-espresso hover:bg-cream',
    sage: 'bg-sage text-white hover:bg-sage/90',
  };
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-3.5 text-base' };

  return (
    <motion.button whileTap={{ scale: 0.97 }} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>
      {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : null}
      {children}
    </motion.button>
  );
}
