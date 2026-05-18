import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;

  const colors = { success: 'bg-espresso text-white', error: 'bg-rust text-white', info: 'bg-espresso text-white' };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-[400px] px-5 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`toast-enter px-4 py-3 rounded-2xl shadow-elevated text-[13px] font-medium ${colors[t.type] || colors.success} pointer-events-auto text-center`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
