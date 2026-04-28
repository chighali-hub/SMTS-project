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
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
            Actualités & médias
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Dernières actualités
          </h1>
          <p className="mt-5 text-lg text-white/70">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-16 text-center backdrop-blur-md"
          >
            <p className="text-xl font-semibold text-white">
              Bientôt disponible
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
              Nos équipes préparent des contenus exclusifs sur nos projets et
              l&apos;actualité économique en Mauritanie.
            </p>
          </motion.div>
        )}

        {!loading && articles.length > 0 && (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((art, i) => (
              <motion.article
                key={art._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl transition hover:border-smts-electric/40"
              >
                <Link to={`/actualites/${art._id}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={resolveAssetUrl(art.image) || placeholderImg}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-smts-electric/90 px-3 py-1 text-xs font-semibold text-white">
                      {catLabels[art.categorie] || art.categorie}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time className="text-xs text-white/50">
                      {formatDate(art.createdAt)}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-white group-hover:text-smts-electric">
                      {art.titre}
                    </h2>
                    <span className="mt-4 inline-flex text-sm font-semibold text-smts-electric">
                      Lire la suite →
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <section className="mt-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
                Galerie & médias
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">
                Photos terrain, projets réalisés, événements
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
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
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    mediaFilter === f.id
                      ? 'bg-smts-electric text-white'
                      : 'border border-white/15 text-white/70 hover:border-white/30'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredMedias.length === 0 ? (
            <p className="mt-10 text-center text-sm text-white/50">
              Aucun média dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {filteredMedias.map((m, i) => (
                <motion.figure
                  key={m._id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.03 }}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  {m.type === 'video' ? (
                    <a
                      href={resolveAssetUrl(m.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-square overflow-hidden bg-black/50"
                    >
                      <img
                        src={resolveAssetUrl(m.coverUrl) || videoPoster}
                        alt=""
                        className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white">
                            {m.titre}
                          </p>
                          <p className="text-[11px] text-white/70">
                            Vidéo · {mediaCatLabels[m.categorie] || m.categorie}
                          </p>
                        </div>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-smts-electric/90 text-white shadow-lg">
                          <FaPlay className="ml-0.5 text-xs" />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <img
                      src={resolveAssetUrl(m.url)}
                      alt={m.titre}
                      className="aspect-square w-full object-cover"
                    />
                  )}
                  {m.type !== 'video' && (
                    <figcaption className="p-2 text-xs text-white/60">
                      <span className="font-semibold text-white/90">
                        {m.titre}
                      </span>
                      <span className="ml-2 text-smts-electric">
                        {mediaCatLabels[m.categorie] || m.categorie}
                      </span>
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
