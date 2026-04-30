import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaTrophy,
  FaHandshake,
  FaBriefcase,
  FaGlobeAfrica,
  FaTruck,
  FaStore,
  FaChartLine,
  FaShieldAlt,
  FaNetworkWired,
  FaRoute,
  FaUserCheck,
} from 'react-icons/fa';
import { HiArrowRight, HiMail } from 'react-icons/hi';
import Seo from '../components/Seo';
import AnimatedCounter from '../components/AnimatedCounter';

const heroImg =
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=80';

const aboutImg =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80';

const poles = [
  {
    title: 'Logistique & Transport',
    icon: FaTruck,
    desc: 'Chaîne logistique intégrée pour vos flux régionaux et internationaux.',
  },
  {
    title: 'Commerce Général',
    icon: FaStore,
    desc: 'Approvisionnement, import-export et distribution structurée.',
  },
  {
    title: "Facilitation d'Investissement",
    icon: FaHandshake,
    desc: 'Accompagnement des investisseurs et structuration de projets.',
  },
  {
    title: 'Solutions Business',
    icon: FaChartLine,
    desc: 'Représentation, médiation et conseil orienté résultats.',
  },
];

const why = [
  {
    title: 'Expertise terrain en Mauritanie',
    text: 'Une connaissance fine des acteurs, des procédures et des enjeux locaux.',
    icon: FaShieldAlt,
  },
  {
    title: 'Réseau institutionnel solide',
    text: 'Relations de confiance avec les partenaires publics et privés.',
    icon: FaNetworkWired,
  },
  {
    title: 'Accompagnement de A à Z',
    text: 'De la veille à l’opérationnel, une chaîne de valeur unifiée.',
    icon: FaRoute,
  },
  {
    title: 'Approche personnalisée',
    text: 'Des équipes dédiées et une réactivité adaptée à chaque dossier.',
    icon: FaUserCheck,
  },
];

export default function Accueil() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <Seo
        title="Accueil"
        description="SMTS Group accompagne investisseurs et entreprises en Mauritanie : commerce, logistique Nouakchott, facilitation d’affaires et transport international."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <section
        ref={heroRef}
        className="relative min-h-[95vh] overflow-hidden flex items-center"
      >
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 scale-110"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          />
          <div className="absolute inset-0 bg-[#030712] opacity-80 " />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#08101a]/80 to-transparent" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pt-20 md:px-6 lg:px-8 z-10 hidden md:block" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pt-24 pb-32 md:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
              Bâtissons l&apos;avenir de vos investissements{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-2">
                en Mauritanie
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-smts-muted md:text-xl">
              SMTS Group accompagne les investisseurs et entreprises avec des
              solutions intégrées en commerce, logistique et facilitation
              d&apos;affaires sur toute la chaîne de valeur.
            </p>
            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to="/expertises"
                className="group btn-premium inline-flex items-center gap-3 px-8 py-4 text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-smts-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">Découvrir nos expertises</span>
                <HiArrowRight className="relative z-10 text-lg transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                <HiMail className="text-lg text-smts-electric" />
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-24 px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedCounter
            prefix="+"
            value={10}
            label="ans d'expérience"
            icon={FaTrophy}
          />
          <AnimatedCounter
            prefix="+"
            value={50}
            label="partenaires internationaux"
            icon={FaHandshake}
          />
          <AnimatedCounter
            prefix="+"
            value={100}
            label="projets accompagnés"
            icon={FaBriefcase}
          />
          <AnimatedCounter
            staticText="Multisectoriel"
            label="Présence en Mauritanie"
            icon={FaGlobeAfrica}
          />
        </div>
      </section>

      <section className="bg-smts-navy py-32 text-white relative overflow-hidden mt-12">
        <div className="absolute inset-0 bg-grid-slate opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-smts-electric/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:grid-cols-2 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
              À propos de nous
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight">
              Un acteur stratégique en Mauritanie
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-smts-muted">
              SMTS Group est un acteur stratégique en Mauritanie, spécialisé dans
              le commerce général, les services aux entreprises et la
              facilitation des investissements. Nous connectons les opportunités
              locales aux investisseurs internationaux à travers une expertise pointue.
            </p>
            <Link
              to="/le-groupe"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-smts-navy transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] shadow-lg"
            >
              Découvrir le groupe
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-smts-electric/20  z-10 group-hover:opacity-0 transition-opacity duration-700" />
            <img
              src={aboutImg}
              alt="Immeuble corporate SMTS Group — excellence et présence locale"
              className="h-full min-h-[400px] w-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <p className="text-white font-bold tracking-wide">SMTS Group — HQ</p>
                <p className="text-smts-electric text-xs font-semibold uppercase tracking-widest mt-1">Nouakchott</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 bg-[#030712] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(37,99,235,0.05),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-smts-electric mb-4">
              Nos pôles d&apos;activité
            </p>
            <h2 className="text-3xl font-extrabold md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Des expertises complémentaires prêtes à l'emploi
            </h2>
          </motion.div>
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {poles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                className="glass-card group relative p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-smts-electric/20 to-smts-accent/20 text-smts-electric shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                    <p.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-smts-electric transition-colors">{p.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-smts-muted">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/le-groupe"
              className="inline-flex rounded-full border border-smts-muted/30 bg-white/5 py-4 px-10 text-sm font-bold text-white transition-all hover:border-smts-electric hover:bg-smts-electric/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-xl backdrop-blur-sm"
            >
              Découvrir toutes les expertises
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/5 bg-gradient-to-b from-[#08101a] to-smts-dark py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-smts-electric/40 to-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-smts-electric mb-4">
              Pourquoi choisir SMTS Group
            </p>
            <h2 className="text-3xl font-extrabold md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Un partenaire engagé sur la durée
            </h2>
          </motion.div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {why.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", damping: 25 }}
                className="flex gap-5 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-smts-electric/10 hover:-translate-y-1 group"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-smts-electric/10 to-smts-accent/10 border border-white/5 text-smts-electric shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-smts-electric/20">
                  <w.icon size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-smts-electric transition-colors">{w.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-smts-muted">
                    {w.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
