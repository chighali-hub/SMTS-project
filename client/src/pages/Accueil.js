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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  return (
    <>
      <Seo
        title="Accueil"
        description="SMTS Group accompagne investisseurs et entreprises en Mauritanie : commerce, logistique Nouakchott, facilitation d’affaires et transport international."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <section
        ref={heroRef}
        className="relative min-h-[88vh] overflow-hidden"
      >
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 scale-110"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-smts-navy/95 via-smts-navy/88 to-smts-medium/90" />
        </motion.div>
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 pb-24 pt-10 md:px-6 lg:min-h-[88vh] lg:px-8 lg:pb-32 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Bâtissons l&apos;avenir de vos investissements{' '}
              <span className="text-smts-electric">en Mauritanie</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              SMTS Group accompagne les investisseurs et entreprises avec des
              solutions intégrées en commerce, logistique et facilitation
              d&apos;affaires.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/expertises"
                className="inline-flex items-center gap-2 rounded-full bg-smts-electric px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-smts-electric/30 transition hover:bg-blue-600"
              >
                Découvrir nos expertises
                <HiArrowRight className="text-lg" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/80 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <HiMail />
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-2 md:p-6 lg:grid-cols-4">
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
            staticText="Multisectorielle"
            label="Présence en Mauritanie"
            icon={FaGlobeAfrica}
          />
        </div>
      </section>

      <section className="bg-smts-light py-20 text-smts-navy">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
              À propos de nous
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Un acteur stratégique en Mauritanie
            </h2>
            <p className="mt-5 leading-relaxed text-smts-muted">
              SMTS Group est un acteur stratégique en Mauritanie, spécialisé dans
              le commerce général, les services aux entreprises et la
              facilitation des investissements. Nous connectons les opportunités
              locales aux investisseurs internationaux.
            </p>
            <Link
              to="/le-groupe"
              className="mt-8 inline-flex rounded-full bg-smts-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-smts-medium"
            >
              Découvrir le groupe
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl"
          >
            <img
              src={aboutImg}
              alt="Immeuble corporate SMTS Group — excellence et présence locale"
              className="h-full min-h-[280px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-smts-navy/50 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              SMTS Group — Nouakchott
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-[length:40px_40px] bg-grid-slate opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
              Nos pôles d&apos;activité
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              Des expertises complémentaires pour vos projets
            </h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {poles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 0 0 1px rgba(37,99,235,0.5)',
                }}
                className="glass rounded-2xl p-6 transition hover:bg-smts-electric/10"
              >
                <p.icon className="text-3xl text-smts-electric" />
                <h3 className="mt-4 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/le-groupe"
              className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:border-smts-electric hover:text-smts-electric"
            >
              Découvrir le groupe
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-b from-smts-navy to-[#050d18] py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
              Pourquoi choisir SMTS Group
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              Un partenaire engagé sur la durée
            </h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {why.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-smts-electric/15 text-smts-electric">
                  <w.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
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
