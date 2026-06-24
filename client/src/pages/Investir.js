import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGasPump, FaGem, FaFish, FaBroadcastTower } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';
import { SITE_IMAGES } from '../constants/siteImages';

export default function Investir() {
  const { t } = useTranslation();
  const img = SITE_IMAGES.investirProjets;
  const [expanded, setExpanded] = useState(null);

  const secteurs = [
    {
      key: 'gas',
      title: t('investir.secteurs.gasTitle'),
      icon: FaGasPump,
      text: t('investir.secteurs.gasText'),
      moreText: t('investir.secteurs.gasMore'),
    },
    {
      key: 'min',
      title: t('investir.secteurs.minTitle'),
      icon: FaGem,
      text: t('investir.secteurs.minText'),
      moreText: t('investir.secteurs.minMore'),
    },
    {
      key: 'fish',
      title: t('investir.secteurs.fishTitle'),
      icon: FaFish,
      text: t('investir.secteurs.fishText'),
      moreText: t('investir.secteurs.fishMore'),
    },
    {
      key: 'tel',
      title: t('investir.secteurs.telTitle'),
      icon: FaBroadcastTower,
      text: t('investir.secteurs.telText'),
      moreText: t('investir.secteurs.telMore'),
    },
  ];

  const steps = [
    {
      title: t('investir.steps.s1Title'),
      text: t('investir.steps.s1Text'),
    },
    {
      title: t('investir.steps.s2Title'),
      text: t('investir.steps.s2Text'),
    },
    {
      title: t('investir.steps.s3Title'),
      text: t('investir.steps.s3Text'),
    },
  ];

  return (
    <>
      <Seo
        title="Investir en Mauritanie"
        description="Pourquoi investir en Mauritanie : gaz, mines, pêche, télécommunications. SMTS Group, facilitation d'affaires et transport international Mauritanie."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(139,92,246,0.1),_transparent_40%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
              {t('investir.tag')}
            </div>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl drop-shadow-md leading-tight">
              {t('investir.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent">{t('investir.title2')}</span>
            </h1>
            <p className="mt-8 text-lg font-medium leading-relaxed text-smts-muted md:text-xl">
              {t('investir.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group h-full min-h-[400px]"
          >
            <div className="absolute inset-0 bg-smts-electric/10  z-10 group-hover:opacity-0 transition-opacity duration-700" />
            <img
              src={img}
              alt="Équipe sur site industriel — accompagnement de projets d'investissement"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
          </motion.div>
        </section>

        <section className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {t('investir.secTag')}
            </h2>
            <p className="mt-4 text-smts-muted font-medium">{t('investir.secSub')}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {secteurs.map((s, i) => {
              const isOpen = expanded === s.key;
              return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="glass-card group relative flex flex-col p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-smts-electric/20 to-smts-accent/20 text-smts-electric shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                    <s.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-smts-electric transition-colors">{s.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-smts-muted">
                    {s.text}
                  </p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        key="more"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden text-sm font-medium leading-relaxed text-white/80 border-t border-white/10 pt-4"
                      >
                        {s.moreText}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : s.key)}
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-smts-electric/30 bg-smts-electric/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-smts-electric transition-all hover:bg-smts-electric/20 hover:border-smts-electric/50"
                  >
                    {isOpen ? t('investir.learnLess') : t('investir.learnMore')}
                  </button>
                </div>
              </motion.div>
            );
            })}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#08101a]/80 to-[#030712]/90 p-8 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-smts-electric/5 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white md:text-4xl drop-shadow-md">
              {t('investir.roleTitle')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-medium text-smts-muted leading-relaxed">
              {t('investir.roleSub')}
            </p>
            <ol className="mt-12 space-y-10 border-l-2 border-smts-electric/30 pl-10 relative">
              {steps.map((st, i) => (
                <motion.li
                  key={st.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative group"
                >
                  <span className="absolute -left-[54px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-smts-dark border-2 border-smts-electric text-sm font-bold text-smts-electric group-hover:bg-smts-electric group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-smts-electric transition-colors">{st.title}</h3>
                  <p className="mt-3 text-base text-smts-muted max-w-2xl leading-relaxed">{st.text}</p>
                </motion.li>
              ))}
            </ol>
            <motion.div
              className="mt-16"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="group btn-premium inline-flex items-center gap-3 px-8 py-4 text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-smts-electric to-smts-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">{t('investir.btn')}</span>
                <HiArrowRight className="relative z-10 text-lg transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
