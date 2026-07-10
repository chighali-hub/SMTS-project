import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import GallerySection from '../components/GallerySection';

const SECTIONS = [
  {
    id: 'poissons',
    images: [
      '/galerie/poissons/peche-1.png',
      '/galerie/poissons/peche-2.png',
      '/galerie/poissons/peche-3.png',
    ],
    i18nKey: 'poissons',
  },
  {
    id: 'sucre',
    images: [
      '/galerie/sucre/sucre-1.png',
      '/galerie/sucre/sucre-2.png',
      '/galerie/sucre/sucre-3.png',
      '/galerie/sucre/sucre-4.png',
    ],
    i18nKey: 'sucre',
  },
  {
    id: 'legumes',
    images: [
      '/galerie/legumes/legume-1.png',
      '/galerie/legumes/legume-2.png',
      '/galerie/legumes/legume-3.png',
      '/galerie/legumes/legume-4.png',
      '/galerie/legumes/legume-5.png',
    ],
    i18nKey: 'legumes',
  },
  {
    id: 'huiles',
    images: [
      '/galerie/huiles/huile-1.png',
      '/galerie/huiles/huile-2.png',
    ],
    i18nKey: 'huiles',
  },
  {
    id: 'lait',
    images: [
      '/galerie/lait/lait-1.png',
      '/galerie/lait/lait-2.png',
      '/galerie/lait/lait-3.png',
    ],
    i18nKey: 'lait',
  },
];

export default function Galerie() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Seo
        title={t('galerie.seoTitle', 'Galerie')}
        description={t(
          'galerie.seoDescription',
          'Poissons frais et surgelés, sucre, légumes, huiles végétales et lait en poudre — SMTS Group.'
        )}
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />

      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-premium-gradient opacity-40" />
        <div className="absolute inset-[0_auto_auto_auto] w-[800px] h-[800px] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15),_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse" />
            {t('galerie.tag', 'Produits & export')}
          </div>
          <h1 className="text-5xl font-extrabold md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-md">
            {t('galerie.title1', 'Notre ')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent">
              {t('galerie.title2', 'Galerie')}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-smts-muted font-medium">
            {t(
              'galerie.subtitle',
              'Découvrez nos gammes de produits alimentaires et nos solutions d’exportation vers les marchés internationaux.'
            )}
          </p>
        </motion.div>

        <div className="mt-20 space-y-16 md:space-y-24">
          {SECTIONS.map((section, index) => (
            <GallerySection
              key={section.id}
              id={section.id}
              title={t(`galerie.sections.${section.i18nKey}.title`)}
              images={section.images}
              headline={t(`galerie.sections.${section.i18nKey}.headline`)}
              paragraphs={t(`galerie.sections.${section.i18nKey}.paragraphs`, {
                returnObjects: true,
              })}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
