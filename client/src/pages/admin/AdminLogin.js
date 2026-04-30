import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/client';
import Seo from '../../components/Seo';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('smts_admin_token')
      : null;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/portail-smts" replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/admin/login', { username, password });
      localStorage.setItem('smts_admin_token', data.token);
      navigate('/portail-smts', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-smts-dark px-4 font-sans">
      <Seo title="Administration" description="Connexion administration SMTS Group." />
      
      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-premium-gradient opacity-30 " />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15),_transparent_60%)]" />
      </div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onSubmit={onSubmit}
        className="glass-card relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="mb-10 text-center flex flex-col items-center">
          <Logo className="mb-6 pointer-events-none" admin />
          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
            Espace <span className="text-smts-electric">administration</span>
          </h1>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Identifiant
            </label>
            <input
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3 text-[15px] text-white outline-none transition-all focus:border-smts-electric focus:bg-smts-electric/5 focus:ring-1 focus:ring-smts-electric/50"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3 text-[15px] text-white outline-none transition-all focus:border-smts-electric focus:bg-smts-electric/5 focus:ring-1 focus:ring-smts-electric/50"
            />
          </div>
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-[13px] font-semibold text-red-400 text-center"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-smts-electric to-smts-electric/80 py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {loading ? (
             <span className="flex items-center justify-center gap-2">
               <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
               </svg>
               Connexion en cours...
             </span>
          ) : (
             'Se connecter'
          )}
        </button>
      </motion.form>
    </div>
  );
}
