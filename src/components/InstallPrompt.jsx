import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    
    if (ios && !isStandalone) {
      setIsIOS(true);
      // Only show iOS prompt if user hasn't dismissed it in this session
      const dismissed = sessionStorage.getItem('stitched_ios_prompt_dismissed');
      if (!dismissed) {
        setShow(true);
      }
    } else {
      const handler = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShow(true);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  const dismissIOS = () => {
    sessionStorage.setItem('stitched_ios_prompt_dismissed', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-[85px] left-1/2 -translate-x-1/2 z-50 bg-warm-white rounded-2xl shadow-elevated p-4 flex flex-col gap-3 border border-cream-dark w-[calc(100%-2rem)] max-w-[440px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl shrink-0">🧵</div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-semibold text-espresso">Install Stitched</p>
              <p className="text-xs text-warm-gray">Add to your home screen for quick access</p>
            </div>
            {isIOS ? (
              <button onClick={dismissIOS} className="text-warm-gray text-lg p-1">✕</button>
            ) : (
              <button onClick={() => setShow(false)} className="text-warm-gray text-lg p-1">✕</button>
            )}
          </div>

          {isIOS ? (
            <div className="pt-2 border-t border-cream-dark text-xs text-espresso flex items-center gap-2">
              <span>On your iPhone: Tap</span>
              <span className="bg-cream px-2 py-1 rounded font-semibold flex items-center gap-1">
                Share <span className="text-sm">⎋</span>
              </span>
              <span>then scroll down and select</span>
              <span className="font-semibold text-rust">"Add to Home Screen"</span>
            </div>
          ) : (
            <div className="flex justify-end gap-2 pt-2 border-t border-cream-dark">
              <button 
                onClick={() => setShow(false)} 
                className="px-4 py-1.5 text-xs font-semibold text-warm-gray rounded-full"
              >
                Later
              </button>
              <button 
                onClick={install} 
                className="px-4 py-1.5 bg-rust text-white text-xs font-semibold rounded-full"
              >
                Install Now
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
