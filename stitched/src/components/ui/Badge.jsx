export default function Badge({ children, variant = 'sage', className = '' }) {
  const variants = {
    sage: 'bg-sage-pale text-sage',
    rust: 'bg-rust/10 text-rust',
    cream: 'bg-cream text-espresso-light',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
