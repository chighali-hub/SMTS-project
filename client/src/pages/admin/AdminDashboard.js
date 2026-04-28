import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { authHeaders } from '../../api/client';
import Spinner from '../../components/Spinner';
import Seo from '../../components/Seo';

const tabs = [
  { id: 'dash', label: 'Tableau de bord' },
  { id: 'news', label: 'Actualités' },
  { id: 'media', label: 'Médias' },
  { id: 'msg', label: 'Messages' },
];

const emptyArticle = {
  titre: '',
  contenu: '',
  image: '',
  categorie: 'investissement',
  publie: true,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dash');
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [actualites, setActualites] = useState([]);
  const [medias, setMedias] = useState([]);
  const [error, setError] = useState('');
  const [articleForm, setArticleForm] = useState(emptyArticle);
  const [articleImageFile, setArticleImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [mediaForm, setMediaForm] = useState({
    titre: '',
    type: 'photo',
    categorie: 'terrain',
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaCover, setMediaCover] = useState(null);
  const [mediaUrlFallback, setMediaUrlFallback] = useState('');
  const [saving, setSaving] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('smts_admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    try {
      const h = { headers: authHeaders() };
      const [cRes, aRes, mRes] = await Promise.all([
        api.get('/contacts', h),
        api.get('/actualites', h),
        api.get('/medias', h),
      ]);
      setContacts(cRes.data || []);
      setActualites(aRes.data || []);
      setMedias(mRes.data || []);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('smts_admin_token');
        navigate('/admin/login', { replace: true });
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
    navigate('/admin/login', { replace: true });
  };

  const saveArticle = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('titre', articleForm.titre);
      fd.append('contenu', articleForm.contenu);
      fd.append('categorie', articleForm.categorie);
      fd.append('publie', String(Boolean(articleForm.publie)));
      if (articleForm.image) fd.append('image', articleForm.image);
      if (articleImageFile) fd.append('imageFile', articleImageFile);

      const h = {
        headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
      };
      if (editingId) await api.put(`/actualites/${editingId}`, fd, h);
      else await api.post('/actualites', fd, h);

      setArticleForm(emptyArticle);
      setArticleImageFile(null);
      setEditingId(null);
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Enregistrement impossible.');
    } finally {
      setSaving(false);
    }
  };

  const editArticle = (a) => {
    setEditingId(a._id);
    setArticleForm({
      titre: a.titre,
      contenu: a.contenu,
      image: a.image || '',
      categorie: a.categorie,
      publie: Boolean(a.publie),
    });
    setArticleImageFile(null);
    setTab('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Supprimer cette actualité ?')) return;
    try {
      await api.delete(`/actualites/${id}`, { headers: authHeaders() });
      if (editingId === id) {
        setEditingId(null);
        setArticleForm(emptyArticle);
      }
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Suppression impossible.');
    }
  };

  const saveMedia = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('titre', mediaForm.titre);
      fd.append('type', mediaForm.type);
      fd.append('categorie', mediaForm.categorie);
      if (mediaFile) fd.append('file', mediaFile);
      if (mediaCover) fd.append('cover', mediaCover);
      if (!mediaFile && mediaUrlFallback) fd.append('url', mediaUrlFallback);

      await api.post('/medias', fd, {
        headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
      });
      setMediaForm({
        titre: '',
        type: 'photo',
        categorie: 'terrain',
      });
      setMediaFile(null);
      setMediaCover(null);
      setMediaUrlFallback('');
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Ajout impossible.');
    } finally {
      setSaving(false);
    }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm('Supprimer ce média ?')) return;
    try {
      await api.delete(`/medias/${id}`, { headers: authHeaders() });
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Suppression impossible.');
    }
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/lu`, {}, { headers: authHeaders() });
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Action impossible.');
    }
  };

  return (
    <div className="min-h-screen bg-smts-navy text-white">
      <Seo title="Administration" description="Gestion du contenu SMTS Group." />
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-smts-electric/20 font-bold">
              S
            </span>
            <div>
              <p className="text-sm font-semibold">Administration</p>
              <p className="text-xs text-white/50">SMTS Group</p>
            </div>
          </div>
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

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
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
                  { label: 'Messages reçus', n: contacts.length },
                  { label: 'Actualités', n: actualites.length },
                  { label: 'Médias', n: medias.length },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <p className="text-sm text-white/60">{s.label}</p>
                    <p className="mt-2 text-4xl font-extrabold text-smts-electric">
                      {s.n}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === 'news' && (
              <div className="grid gap-10 lg:grid-cols-2">
                <form
                  onSubmit={saveArticle}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h2 className="text-lg font-bold">
                    {editingId ? 'Modifier une actualité' : 'Nouvelle actualité'}
                  </h2>
                  <div className="mt-4 space-y-3">
                    <input
                      placeholder="Titre"
                      value={articleForm.titre}
                      onChange={(e) =>
                        setArticleForm((f) => ({ ...f, titre: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      required
                    />
                    <textarea
                      placeholder="Contenu"
                      rows={8}
                      value={articleForm.contenu}
                      onChange={(e) =>
                        setArticleForm((f) => ({
                          ...f,
                          contenu: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      required
                    />
                    <input
                      placeholder="URL de l'image"
                      value={articleForm.image}
                      onChange={(e) =>
                        setArticleForm((f) => ({ ...f, image: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    />
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Image depuis votre appareil (recommandé)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setArticleImageFile(e.target.files?.[0] || null)
                        }
                        className="mt-2 w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/20"
                      />
                      {(articleImageFile || articleForm.image) && (
                        <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                          <img
                            alt=""
                            src={
                              articleImageFile
                                ? URL.createObjectURL(articleImageFile)
                                : articleForm.image
                            }
                            className="max-h-40 w-full object-cover"
                          />
                        </div>
                      )}
                      <p className="mt-2 text-xs text-white/50">
                        Si vous choisissez un fichier, il sera utilisé à la place de l’URL.
                      </p>
                    </div>
                    <select
                      value={articleForm.categorie}
                      onChange={(e) =>
                        setArticleForm((f) => ({
                          ...f,
                          categorie: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                      <option value="investissement">Investissement</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="marche">Marché</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={articleForm.publie}
                        onChange={(e) =>
                          setArticleForm((f) => ({
                            ...f,
                            publie: e.target.checked,
                          }))
                        }
                      />
                      Publié
                    </label>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-full bg-smts-electric px-5 py-2 text-sm font-semibold disabled:opacity-50"
                    >
                      {saving ? '...' : editingId ? 'Mettre à jour' : 'Créer'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setArticleForm(emptyArticle);
                          setArticleImageFile(null);
                        }}
                        className="rounded-full border border-white/20 px-5 py-2 text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
                <div className="space-y-3">
                  <h3 className="font-semibold text-white/80">Liste</h3>
                  {actualites.map((a) => (
                    <div
                      key={a._id}
                      className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">{a.titre}</p>
                        <p className="text-xs text-white/50">
                          {a.publie ? 'Publié' : 'Brouillon'} · {a.categorie}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => editArticle(a)}
                          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteArticle(a._id)}
                          className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'media' && (
              <div className="grid gap-10 lg:grid-cols-2">
                <form
                  onSubmit={saveMedia}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h2 className="text-lg font-bold">Ajouter un média</h2>
                  <div className="mt-4 space-y-3">
                    <input
                      placeholder="Titre"
                      value={mediaForm.titre}
                      onChange={(e) =>
                        setMediaForm((f) => ({ ...f, titre: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      required
                    />
                    <select
                      value={mediaForm.type}
                      onChange={(e) =>
                        setMediaForm((f) => ({ ...f, type: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Vidéo</option>
                    </select>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Fichier (recommandé)
                      </p>
                      <input
                        type="file"
                        accept={mediaForm.type === 'photo' ? 'image/*' : 'video/*'}
                        onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                        className="mt-2 w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/20"
                      />
                      {mediaForm.type === 'video' && (
                        <>
                          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Image de couverture (optionnel)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setMediaCover(e.target.files?.[0] || null)
                            }
                            className="mt-2 w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/20"
                          />
                        </>
                      )}
                      <p className="mt-3 text-xs text-white/50">
                        Si vous ne pouvez pas uploader, vous pouvez coller une URL ci-dessous.
                      </p>
                      <input
                        placeholder="URL (fallback)"
                        value={mediaUrlFallback}
                        onChange={(e) => setMediaUrlFallback(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      />
                    </div>
                    <select
                      value={mediaForm.categorie}
                      onChange={(e) =>
                        setMediaForm((f) => ({
                          ...f,
                          categorie: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                      <option value="terrain">Terrain</option>
                      <option value="projets">Projets</option>
                      <option value="evenements">Événements</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="mt-4 rounded-full bg-smts-electric px-5 py-2 text-sm font-semibold disabled:opacity-50"
                  >
                    Ajouter
                  </button>
                </form>
                <div className="space-y-3">
                  {medias.map((m) => (
                    <div
                      key={m._id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{m.titre}</p>
                        <p className="text-xs text-white/50">
                          {m.type} · {m.categorie}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteMedia(m._id)}
                        className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs text-red-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'msg' && (
              <div className="space-y-3">
                {contacts.length === 0 && (
                  <p className="text-white/50">Aucun message.</p>
                )}
                {contacts.map((c) => (
                  <div
                    key={c._id}
                    className={`rounded-xl border p-4 ${
                      c.lu
                        ? 'border-white/5 bg-white/[0.02]'
                        : 'border-smts-electric/30 bg-smts-electric/5'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
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
          </>
        )}
      </main>
    </div>
  );
}
