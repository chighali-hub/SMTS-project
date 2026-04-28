import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { resolveAssetUrl } from '../api/client';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';

const catLabels = {
  investissement: 'Investissement',
  partenariat: 'Partenariat',
  marche: 'Marché',
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

export default function ActualiteDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/actualites/${id}`);
        if (!cancelled) setArt(data);
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.status === 404
              ? 'Article introuvable.'
              : e.response?.data?.message || 'Erreur de chargement.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const placeholderImg =
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80';

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !art) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-white/80">{error || 'Article introuvable.'}</p>
        <Link
          to="/actualites"
          className="mt-6 inline-block text-smts-electric hover:underline"
        >
          ← Retour aux actualités
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={art.titre}
        description={`${art.titre} — SMTS Group, investissement en Mauritanie, logistique Nouakchott.`}
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/actualites"
            className="text-sm font-medium text-smts-electric hover:underline"
          >
            ← Actualités
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-smts-electric">
            {catLabels[art.categorie] || art.categorie}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            {art.titre}
          </h1>
          <time className="mt-4 block text-sm text-white/50">
            {formatDate(art.createdAt)}
          </time>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={resolveAssetUrl(art.image) || placeholderImg}
              alt=""
              className="max-h-[420px] w-full object-cover"
            />
          </div>
          <div className="prose prose-invert prose-lg mt-10 max-w-none whitespace-pre-wrap leading-relaxed text-white/80">
            {art.contenu}
          </div>
        </motion.div>
      </article>
    </>
  );
}
