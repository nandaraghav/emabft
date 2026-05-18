import { motion } from 'framer-motion';

export default function PageShell({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className={`flex-1 ${className}`}
    >
      {children}
    </motion.div>
  );
}
