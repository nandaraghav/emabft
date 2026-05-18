import { motion } from 'framer-motion';

const steps = ['Ordered', 'Prepared', 'Pickup', 'Completed'];

export default function ProgressTracker({ status }) {
  const currentIndex = steps.findIndex(s => s.toLowerCase() === status);

  return (
    <div className="flex items-center justify-between gap-1 px-2">
      {steps.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="flex items-center w-full">
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.1 : 1, backgroundColor: done ? 'var(--color-rust)' : 'var(--color-cream-dark)' }}
                className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
              >
                {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-1">
                  <motion.div initial={false} animate={{ width: done && i < currentIndex ? '100%' : '0%' }} className="h-full bg-rust rounded-full" transition={{ duration: 0.5 }} style={{ width: i < currentIndex ? '100%' : '0%' }} />
                  <div className="h-full bg-cream-dark rounded-full -mt-0.5" />
                </div>
              )}
            </div>
            <span className={`text-[9px] font-medium text-center leading-tight mt-1 ${done ? 'text-rust' : 'text-warm-gray'}`}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
