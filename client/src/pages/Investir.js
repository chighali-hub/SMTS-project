import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGasPump, FaGem, FaFish, FaBroadcastTower } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Seo from '../components/Seo';

const secteurs = [
  {
    title: 'Gaz',
    icon: FaGasPump,
    text: 'Un secteur en pleine croissance avec des projets internationaux majeurs.',
  },
  {
    title: 'Mines (Or & Fer)',
    icon: FaGem,
    text: "La Mauritanie est l'un des principaux producteurs de ressources minières en Afrique.",
  },
  {
    title: 'Pêche',
    icon: FaFish,
    text: 'Un des secteurs les plus dynamiques grâce à des ressources maritimes abondantes.',
  },
  {
    title: 'Télécommunications',
    icon: FaBroadcastTower,
    text: 'Un marché en expansion avec une forte demande en innovation.',
  },
];

const steps = [
  {
    title: 'Démarches administratives',
    text: 'Structuration des dossiers et coordination avec les administrations concernées.',
  },
  {
    title: 'Mises en relation institutionnelles',
    text: 'Accès ciblé aux décideurs et partenaires clés sur le territoire.',
  },
  {
    title: 'Lancement opérationnel',
    text: "Accompagnement jusqu'à la mise en service et le pilotage des premières phases.",
  },
];

export default function Investir() {
  return (
    <>
      <Seo
        title="Investir en Mauritanie"
        description="Pourquoi investir en Mauritanie : gaz, mines, pêche, télécommunications. SMTS Group, facilitation d'affaires et transport international Mauritanie."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
              Opportunités
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
              Pourquoi investir en Mauritanie ?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              La Mauritanie offre un environnement riche en ressources naturelles
              et en opportunités économiques. SMTS Group agit comme passerelle
              stratégique entre investisseurs et décideurs locaux.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
              alt="Vue aérienne — littoral et territoire mauritanien"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-extrabold text-white md:text-4xl">
            Secteurs clés
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {secteurs.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl p-6 transition hover:bg-white/[0.07]"
              >
                <s.icon className="text-3xl text-smts-electric" />
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-14">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            Notre rôle
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            SMTS Group agit comme une passerelle stratégique entre investisseurs
            et décideurs locaux. Nous facilitons :
          </p>
          <ol className="mt-10 space-y-8 border-l border-smts-electric/40 pl-8">
            {steps.map((st, i) => (
              <motion.li
                key={st.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-smts-electric text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{st.title}</h3>
                <p className="mt-2 text-sm text-white/65">{st.text}</p>
              </motion.li>
            ))}
          </ol>
          <motion.div
            className="mt-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-smts-electric px-8 py-4 text-sm font-semibold text-white shadow-lg"
            >
              Lancer votre projet
              <HiArrowRight />
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}
