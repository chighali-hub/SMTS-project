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

function ImageField({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
        {label}
      </label>
      <div className="flex flex-col gap-3">
        <input
          placeholder="URL de l'image (ex: https://images.unsplash.com/...)"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-smts-electric/50 transition-colors"
        />
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40 group">
          {value ? (
            <img 
              src={value} 
              alt="Preview" 
              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x450?text=Lien+invalide'; }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white/20 font-medium italic">
              Aucune image sélectionnée
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-[10px] font-bold uppercase tracking-tighter text-white/50">Aperçu en direct</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dash');
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ phone: '', email: '', location: '', heroImg: '', aboutImg: '', investirImg: '', groupeImg: '' });
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
      setSettingsForm(sRes.data || { phone: '', email: '', location: '', heroImg: '', aboutImg: '', investirImg: '', groupeImg: '' });
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
    navigate('/accueil', { replace: true });
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/lu`, {}, { headers: authHeaders() });
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Action impossible.');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Supprimer ce message définitivement ?')) return;
    try {
      await api.delete(`/contacts/${id}`, { headers: authHeaders() });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Suppression impossible.');
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
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!c.lu && (
                          <button
                            type="button"
                            onClick={() => markRead(c._id)}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
                          >
                            Marquer comme lu
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteContact(c._id)}
                          className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'settings' && (
              <div className="space-y-10 pb-20">
                {settingsMsg.text && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-4 text-sm font-medium ${settingsMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                  >
                    {settingsMsg.text}
                  </motion.p>
                )}

                <form onSubmit={saveSettings} className="grid gap-8 lg:grid-cols-2">
                  {/* Left Column: Global & Home Page */}
                  <div className="space-y-8">
                    {/* Global Info Section */}
                    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-smts-electric rounded-full" />
                        <h2 className="text-xl font-bold">Informations Générales</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-white/50 mb-1 ml-1">Téléphone</label>
                          <input
                            placeholder="Téléphone"
                            value={settingsForm.phone || ''}
                            onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-smts-electric/50 transition-colors bg-white/5"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/50 mb-1 ml-1">Email</label>
                          <input
                            placeholder="Email"
                            type="email"
                            value={settingsForm.email || ''}
                            onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-smts-electric/50 transition-colors bg-white/5"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/50 mb-1 ml-1">Localisation</label>
                          <input
                            placeholder="Ex: Nouakchott, Mauritanie"
                            value={settingsForm.location || ''}
                            onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-smts-electric/50 transition-colors bg-white/5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Home Page Section */}
                    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-smts-electric rounded-full" />
                        <h2 className="text-xl font-bold">Page d'Accueil</h2>
                      </div>
                      <div className="space-y-6">
                        <ImageField 
                          label="Image Hero (Haut de page)" 
                          value={settingsForm.heroImg} 
                          onChange={(val) => setSettingsForm({ ...settingsForm, heroImg: val })}
                        />
                        <ImageField 
                          label="Image À Propos" 
                          value={settingsForm.aboutImg} 
                          onChange={(val) => setSettingsForm({ ...settingsForm, aboutImg: val })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Other Pages */}
                  <div className="space-y-8">
                    {/* Investir Section */}
                    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-smts-electric rounded-full" />
                        <h2 className="text-xl font-bold">Page Investir</h2>
                      </div>
                      <div className="space-y-6">
                        <ImageField 
                          label="Image Principale" 
                          value={settingsForm.investirImg} 
                          onChange={(val) => setSettingsForm({ ...settingsForm, investirImg: val })}
                        />
                      </div>
                    </div>

                    {/* Le Groupe Section */}
                    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-smts-electric rounded-full" />
                        <h2 className="text-xl font-bold">Page Le Groupe</h2>
                      </div>
                      <div className="space-y-6">
                        <ImageField 
                          label="Image du Président" 
                          value={settingsForm.groupeImg} 
                          onChange={(val) => setSettingsForm({ ...settingsForm, groupeImg: val })}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={saving} 
                      className="btn-premium w-full py-4 text-base font-bold shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.5)] transition-all disabled:opacity-50"
                    >
                      {saving ? 'Enregistrement...' : 'Sauvegarder toute la configuration'}
                    </button>
                  </div>
                </form>

                <div className="border-t border-white/10 pt-10">
                  <div className="max-w-2xl">
                    <form onSubmit={updatePassword} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-red-500 rounded-full" />
                        <h2 className="text-xl font-bold">Sécurité du Compte</h2>
                      </div>
                      <div className="space-y-4">
                        <input
                          placeholder="Mot de passe actuel"
                          type="password"
                          value={pwdForm.currentPassword}
                          onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                          required
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-red-500/50 transition-colors bg-white/5"
                        />
                        <input
                          placeholder="Nouveau mot de passe"
                          type="password"
                          value={pwdForm.newPassword}
                          onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                          required
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-red-500/50 transition-colors bg-white/5"
                        />
                        <button type="submit" disabled={saving} className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50">
                          Mettre à jour le mot de passe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
