import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShow(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-[85px] left-1/2 -translate-x-1/2 z-50 bg-warm-white rounded-2xl shadow-elevated p-4 flex items-center gap-4 border border-cream-dark w-[calc(100%-2rem)] max-w-[440px]"
        >
          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl shrink-0">🧵</div>
          <div className="flex-1 min-w-0">
            <p className="font-serif font-semibold text-espresso">Install Stitched</p>
            <p className="text-xs text-warm-gray">Add to your home screen</p>
          </div>
          <button onClick={install} className="px-4 py-2 bg-rust text-white text-sm font-medium rounded-full shrink-0">Install</button>
          <button onClick={() => setShow(false)} className="text-warm-gray text-lg">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
