import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/client';
import Seo from '../../components/Seo';

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
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/admin/login', { username, password });
      localStorage.setItem('smts_admin_token', data.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-smts-navy px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.15),_transparent_50%)]" />
      <Seo title="Administration" description="Connexion administration SMTS Group." />
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 font-black text-white">
            S
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">Espace administration</h1>
          <p className="mt-1 text-sm text-white/50">SMTS Group</p>
        </div>
        <label className="block text-sm font-medium text-white/70">
          Identifiant
        </label>
        <input
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-smts-electric/60"
        />
        <label className="mt-4 block text-sm font-medium text-white/70">
          Mot de passe
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-smts-electric/60"
        />
        {error && (
          <p className="mt-4 text-sm text-red-300">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-smts-electric py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </motion.form>
    </div>
  );
}
