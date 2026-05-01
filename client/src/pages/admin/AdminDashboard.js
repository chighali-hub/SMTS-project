import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { authHeaders } from '../../api/client';
import Spinner from '../../components/Spinner';
import Seo from '../../components/Seo';
import Logo from '../../components/Logo';

const tabs = [
  { id: 'dash', label: 'Tableau de bord' },
  { id: 'msg', label: 'Messages' },
  { id: 'settings', label: 'Configuration' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dash');
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ phone: '', email: '', location: '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '' });
  const [settingsMsg, setSettingsMsg] = useState({ type: '', text: '' });

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('smts_admin_token');
    if (!token) {
      navigate('/portail-smts/login', { replace: true });
      return;
    }
    try {
      const h = { headers: authHeaders() };
      const [cRes, sRes] = await Promise.all([
        api.get('/contacts', h),
        api.get('/settings')
      ]);
      setContacts(cRes.data || []);
      setSettingsForm(sRes.data || { phone: '', email: '', location: '' });
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('smts_admin_token');
        navigate('/portail-smts/login', { replace: true });
        return;
      }
      setError(e.response?.data?.message || 'Erreur de chargement.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const logout = () => {
    const ok = window.confirm('Confirmer la déconnexion ?');
    if (!ok) return;
    localStorage.removeItem('smts_admin_token');
    navigate('/portail-smts/login', { replace: true });
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/lu`, {}, { headers: authHeaders() });
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Action impossible.');
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSettingsMsg({ type: '', text: '' });
    try {
      await api.put('/settings', settingsForm, { headers: authHeaders() });
      setSettingsMsg({ type: 'success', text: 'Paramètres mis à jour.' });
    } catch (err) {
      setSettingsMsg({ type: 'error', text: 'Erreur lors de la mise à jour.' });
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSettingsMsg({ type: '', text: '' });
    try {
      await api.put('/admin/password', pwdForm, { headers: authHeaders() });
      setPwdForm({ currentPassword: '', newPassword: '' });
      setSettingsMsg({ type: 'success', text: 'Mot de passe mis à jour.' });
    } catch (err) {
      setSettingsMsg({ type: 'error', text: err.response?.data?.message || 'Erreur du mot de passe.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-smts-dark text-white relative font-sans">
      <Seo title="Administration" description="Gestion du contenu SMTS Group." />
      
      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-premium-gradient opacity-20 " />
        <div className="absolute inset-0 bg-grid-slate opacity-10" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-sm shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6 relative z-10">
          <Logo admin />
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t.id
                    ? 'bg-smts-electric text-white'
                    : 'border border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                {t.label}
              </button>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-6">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : (
          <>
            {error && (
              <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            {tab === 'dash' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 md:grid-cols-3"
              >
                {[
                  { label: 'Messages lus', n: contacts.filter((c) => c.lu).length },
                  { label: 'Messages non lus', n: contacts.filter((c) => !c.lu).length },
                  { label: 'Total messages', n: contacts.length },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="glass-card rounded-[2rem] border border-white/10 p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]"
                  >
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-smts-electric/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-smts-electric/10 transition-colors" />
                    <p className="text-sm font-bold uppercase tracking-wider text-white/50">{s.label}</p>
                    <p className="mt-2 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-white drop-shadow-md">
                      {s.n}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === 'msg' && (
              <div className="space-y-3">
                {contacts.length === 0 && (
                  <p className="text-white/50">Aucun message.</p>
                )}
                {contacts.map((c) => (
                  <div
                    key={c._id}
                    className={`glass-card rounded-[1.5rem] border p-6 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] ${
                      c.lu
                        ? 'border-white/10 bg-[#030712]/50'
                        : 'border-smts-electric/40 bg-smts-electric/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden'
                    }`}
                  >
                    {!c.lu && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-smts-electric to-smts-accent" />}
                    <div className="flex flex-wrap items-start justify-between gap-2 relative z-10">
                      <div>
                        <p className="font-semibold">
                          {c.nom}{' '}
                          <span className="text-xs font-normal text-white/50">
                            ({c.type})
                          </span>
                        </p>
                        <p className="text-sm text-white/60">{c.email}</p>
                        <p className="text-sm text-white/60">{c.telephone}</p>
                        <p className="mt-2 text-sm font-medium">{c.sujet}</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-white/70">
                          {c.message}
                        </p>
                      </div>
                      {!c.lu && (
                        <button
                          type="button"
                          onClick={() => markRead(c._id)}
                          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
                        >
                          Marquer comme lu
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'settings' && (
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-6">
                  {settingsMsg.text && (
                    <p className={`rounded-xl p-4 text-sm font-medium ${settingsMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {settingsMsg.text}
                    </p>
                  )}
                  <form onSubmit={saveSettings} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <h2 className="text-lg font-bold">Informations globales</h2>
                    <p className="mb-4 mt-1 text-xs text-white/50">Ces informations s'affichent sur le site public.</p>
                    <div className="space-y-4">
                      <input
                        placeholder="Téléphone"
                        value={settingsForm.phone || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        value={settingsForm.email || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Emplacement"
                        value={settingsForm.location || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      />
                      <button type="submit" disabled={saving} className="btn-premium px-5 py-2 text-sm disabled:opacity-50">
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>

                <form onSubmit={updatePassword} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)] h-fit">
                  <h2 className="text-lg font-bold">Sécurité du compte</h2>
                  <p className="mb-4 mt-1 text-xs text-white/50">Modifiez votre mot de passe administrateur.</p>
                  <div className="space-y-4">
                    <input
                      placeholder="Mot de passe actuel"
                      type="password"
                      value={pwdForm.currentPassword}
                      onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    />
                    <input
                      placeholder="Nouveau mot de passe"
                      type="password"
                      value={pwdForm.newPassword}
                      onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    />
                    <button type="submit" disabled={saving} className="btn-premium px-5 py-2 text-sm disabled:opacity-50">
                      Mettre à jour le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
