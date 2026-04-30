import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { resolveAssetUrl } from '../api/client';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import { FaPlay } from 'react-icons/fa';

const catLabels = {
  investissement: 'Investissement',
  partenariat: 'Partenariat',
  marche: 'Marché',
};

const mediaCatLabels = {
  terrain: 'Terrain',
  projets: 'Projets',
  evenements: 'Événements',
};

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function Actualites() {
  const [articles, setArticles] = useState([]);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mediaFilter, setMediaFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [aRes, mRes] = await Promise.all([
          api.get('/actualites'),
          api.get('/medias'),
        ]);
        if (!cancelled) {
          setArticles(Array.isArray(aRes.data) ? aRes.data : []);
          setMedias(Array.isArray(mRes.data) ? mRes.data : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message ||
              'Impossible de charger le contenu pour le moment.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMedias = useMemo(() => {
    if (mediaFilter === 'all') return medias;
    return medias.filter((m) => m.categorie === mediaFilter);
  }, [medias, mediaFilter]);

  const placeholderImg =
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80';
  const videoPoster =
    'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?auto=format&fit=crop&w=900&q=80';

  return (
    <>
      <Seo
        title="Actualités & médias"
        description="Dernières actualités sur l'investissement en Mauritanie, partenariats stratégiques et évolutions du marché. Galerie terrain, projets et événements — SMTS Group."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-premium-gradient opacity-30 " />
        <div className="absolute inset-0 bg-grid-slate opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
            Actualités & médias
          </div>
          <h1 className="mt-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-5xl lg:text-6xl drop-shadow-md">
            Dernières <span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent">actualités</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl font-medium leading-relaxed text-smts-muted">
            Nouveaux projets d&apos;investissement en Mauritanie, partenariats
            stratégiques et évolutions du marché.
          </p>
        </motion.div>

        {loading && (
          <div className="mt-20 flex justify-center">
            <Spinner />
          </div>
        )}

        {!loading && error && (
          <p className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {!loading && !error && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 glass-card rounded-[2rem] border border-white/10 px-8 py-16 text-center backdrop-blur-sm shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-50" />
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 relative z-10">
              Bientôt disponible
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-smts-muted font-medium leading-relaxed relative z-10">
              Nos équipes préparent des contenus exclusifs sur nos projets et
              l&apos;actualité économique en Mauritanie.
            </p>
          </motion.div>
        )}

        {!loading && articles.length > 0 && (
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((art, i) => (
              <motion.article
                key={art._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card flex flex-col overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-2 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Link to={`/actualites/${art._id}`} className="flex flex-col h-full relative z-20">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={resolveAssetUrl(art.image) || placeholderImg}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-smts-dark/20  group-hover:bg-transparent transition-colors duration-500" />
                    <span className="absolute left-4 top-4 rounded-full bg-smts-electric/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white shadow-lg border border-white/20">
                      {catLabels[art.categorie] || art.categorie}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-8 relative z-20">
                    <time className="text-[13px] font-bold text-white/40 tracking-wider uppercase">
                      {formatDate(art.createdAt)}
                    </time>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-white group-hover:text-smts-electric transition-colors duration-300">
                      {art.titre}
                    </h2>
                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-smts-electric transition-transform group-hover:translate-x-1">
                        Lire la suite 
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <section className="mt-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-smts-electric">
                Galerie & médias
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Photos terrain, projets réalisés, événements
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'terrain', label: 'Terrain' },
                { id: 'projets', label: 'Projets' },
                { id: 'evenements', label: 'Événements' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setMediaFilter(f.id)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition-all shadow-lg ${
                    mediaFilter === f.id
                      ? 'bg-smts-electric text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:border-smts-electric/50 hover:text-white hover:bg-smts-electric/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredMedias.length === 0 ? (
            <div className="mt-16 flex justify-center">
               <p className="text-center text-[15px] font-medium text-smts-muted px-6 py-3 rounded-full bg-white/5 border border-white/10 inline-block">
                 Aucun média dans cette catégorie pour le moment.
               </p>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {filteredMedias.map((m, i) => (
                <motion.figure
                  key={m._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#030712]/50 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {m.type === 'video' ? (
                    <a
                      href={resolveAssetUrl(m.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-[4/3] overflow-hidden bg-smts-dark"
                    >
                      <img
                        src={resolveAssetUrl(m.coverUrl) || videoPoster}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <span className="flex h-14 w-14 items-center justify-center rounded-full bg-smts-electric/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-sm transition-transform group-hover:scale-110">
                           <FaPlay className="ml-1 text-lg" />
                         </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                          <p className="truncate text-[15px] font-bold text-white drop-shadow-md">
                            {m.titre}
                          </p>
                          <p className="mt-1 text-[12px] font-semibold text-smts-electric uppercase tracking-wider">
                            Vidéo · {mediaCatLabels[m.categorie] || m.categorie}
                          </p>
                      </div>
                    </a>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden">
                       <img
                         src={resolveAssetUrl(m.url)}
                         alt={m.titre}
                         className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  {m.type !== 'video' && (
                    <figcaption className="p-4 bg-[#08101a] border-t border-white/5">
                      <p className="font-bold text-[14px] text-white/90 truncate">
                        {m.titre}
                      </p>
                      <p className="mt-1 text-[12px] font-bold text-smts-electric uppercase tracking-wider">
                        {mediaCatLabels[m.categorie] || m.categorie}
                      </p>
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
