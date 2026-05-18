import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" onClick={onClose}>
          <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-warm-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto p-6 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-cream-dark rounded-full mx-auto mb-4 sm:hidden" />
            {title && <h2 className="font-serif text-xl font-semibold text-espresso mb-4">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
