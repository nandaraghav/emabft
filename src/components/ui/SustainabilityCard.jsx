import { motion } from 'framer-motion';

export default function SustainabilityCard({ wasteSaved, co2Offset, waterSaved, compact = false }) {
  const metrics = [
    { label: 'Waste Diverted', value: wasteSaved, icon: '♻️', color: 'text-sage' },
    { label: 'CO₂ Offset', value: co2Offset, icon: '🌱', color: 'text-sage' },
    { label: 'Water Saved', value: waterSaved, icon: '💧', color: 'text-blue-500' },
  ];

  if (compact) {
    return (
      <div className="flex gap-4">
        {metrics.map(m => (
          <div key={m.label} className="text-center">
            <div className="text-lg mb-0.5">{m.icon}</div>
            <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
            <div className="text-[10px] text-warm-gray">{m.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-sage-pale/50 rounded-2xl p-5 border border-sage/10">
      <h3 className="font-serif text-lg font-semibold text-espresso mb-4">🌍 Your Impact</h3>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="text-center">
            <div className="text-2xl mb-1">{m.icon}</div>
            <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-espresso-light mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
