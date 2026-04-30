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
      <div className="flex min-h-[70vh] items-center justify-center bg-smts-dark">
        <Spinner />
      </div>
    );
  }

  if (error || !art) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-smts-dark">
        <div className="mx-auto max-w-lg px-4 py-20 text-center glass-card rounded-3xl p-10 border border-white/10">
          <p className="text-xl font-bold text-red-400">{error || 'Article introuvable.'}</p>
          <Link
            to="/actualites"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-smts-electric hover:bg-smts-electric/10 hover:text-smts-electric"
          >
            ← Retour aux actualités
          </Link>
        </div>
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
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-premium-gradient opacity-20 " />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-smts-electric/20 to-transparent opacity-30" />
      </div>

      <article className="mx-auto max-w-4xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-10">
            <Link
              to="/actualites"
              className="inline-flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-white/50 hover:text-smts-electric transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Toutes les actualités
            </Link>
          </div>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-smts-electric/20 border border-smts-electric/30 text-smts-electric text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            {catLabels[art.categorie] || art.categorie}
          </div>
          
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
            {art.titre}
          </h1>
          
          <time className="mt-6 block text-[15px] font-bold text-smts-muted tracking-wide flex items-center gap-2">
            <svg className="w-5 h-5 text-smts-electric/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Publié le {formatDate(art.createdAt)}
          </time>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 z-10" />
            <img
              src={resolveAssetUrl(art.image) || placeholderImg}
              alt=""
              className="max-h-[500px] w-full object-cover"
            />
          </motion.div>
          
          <div className="glass-card mt-16 rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-smts-electric/5 blur-3xl rounded-full pointer-events-none" />
            <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap leading-loose text-[#cbd5e1] relative z-10 
              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-gray-400
              prose-a:text-smts-electric prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold">
              {art.contenu}
            </div>
          </div>
        </motion.div>
      </article>
    </>
  );
}
