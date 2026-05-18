import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(username, password);
    setLoading(false);
    if (result.success) navigate('/');
    else setError(result.error);
  };

  return (
    <div className="min-h-[100dvh] bg-ivory flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="w-full max-w-[360px]">
        {/* Logo */}
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}>
            <div className="w-16 h-16 bg-rust/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🧵</span>
            </div>
            <h1 className="font-serif text-[40px] font-bold text-rust tracking-tight leading-none">Stitched</h1>
            <p className="text-espresso-light text-[13px] font-light tracking-[0.08em] mt-2 uppercase">NIFT Scrap & Material Exchange</p>
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-warm-white rounded-3xl p-7 shadow-card border border-cream-dark/20">
          <h2 className="font-serif text-[20px] font-semibold text-espresso mb-6">Welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-espresso-light mb-1.5 uppercase tracking-[0.1em]">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 bg-ivory rounded-xl text-[15px] border border-cream-dark/80 text-espresso placeholder:text-warm-gray/60 transition-all focus:border-rust outline-none focus:ring-1 focus:ring-rust" placeholder="Enter username" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-espresso-light mb-1.5 uppercase tracking-[0.1em]">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-ivory rounded-xl text-[15px] border border-cream-dark/80 text-espresso placeholder:text-warm-gray/60 transition-all focus:border-rust outline-none focus:ring-1 focus:ring-rust" placeholder="Enter password" required />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-[13px] text-rust font-medium bg-rust/5 px-4 py-2.5 rounded-xl border border-rust/10">{error}</motion.p>
            )}

            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="w-full py-4 bg-rust text-white font-semibold rounded-2xl text-[15px] hover:bg-rust-dark transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-4 shadow-sm">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-cream-dark/30">
            <p className="text-[11px] text-warm-gray text-center mb-3 uppercase tracking-wider font-medium">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setUsername('gopal'); setPassword('admin'); }}
                className="px-3 py-3 bg-ivory rounded-xl text-left hover:bg-cream transition-colors border border-cream-dark/20 active:scale-[0.98]">
                <span className="text-[12px] font-bold text-espresso block">🛡️ Admin</span>
                <span className="text-[11px] text-warm-gray">gopal / admin</span>
              </button>
              <button onClick={() => { setUsername('vaishnavi'); setPassword('useruser'); }}
                className="px-3 py-3 bg-ivory rounded-xl text-left hover:bg-cream transition-colors border border-cream-dark/20 active:scale-[0.98]">
                <span className="text-[12px] font-bold text-espresso block">👤 User</span>
                <span className="text-[11px] text-warm-gray">vaishnavi / useruser</span>
              </button>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[11px] text-warm-gray/60 mt-8 tracking-wide">Crafted with ♡ for sustainable fashion</p>
      </motion.div>
    </div>
  );
}
