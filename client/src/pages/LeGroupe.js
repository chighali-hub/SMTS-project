import { motion } from 'framer-motion';
import { FaTruck, FaLeaf, FaChartLine } from 'react-icons/fa';
import Seo from '../components/Seo';

const filiales = [
  {
    title: 'Logistique & Transport',
    icon: FaTruck,
    text: 'Solutions complètes de transport, stockage et distribution.',
  },
  {
    title: 'Agro-industrie',
    icon: FaLeaf,
    text: 'Importation et distribution de produits alimentaires (huiles, sucre, légumes).',
  },
  {
    title: 'Solutions Business',
    icon: FaChartLine,
    text: 'Accompagnement stratégique, représentation commerciale et conseil.',
  },
];

export default function LeGroupe() {
  return (
    <>
      <Seo
        title="Le Groupe"
        description="SMTS Group : entreprise mauritanienne de référence en investissement en Mauritanie, logistique Nouakchott et facilitation d'affaires."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
            À propos de SMTS Group
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Une entreprise mauritanienne de référence
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/75">
            SMTS Group est une entreprise mauritanienne de référence opérant dans
            plusieurs secteurs stratégiques. Notre mission est de faciliter les
            opérations commerciales et d&apos;investissement en offrant des
            solutions fiables, rapides et adaptées au marché local.
          </p>
        </motion.section>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              k: 'Vision',
              v: "Devenir le partenaire incontournable pour tout projet d'investissement en Mauritanie.",
            },
            {
              k: 'Mission',
              v: 'Accompagner les entreprises et investisseurs en leur offrant des solutions complètes et sécurisées.',
            },
            {
              k: 'Valeurs',
              v: 'Intégrité, excellence, engagement, innovation.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-xl font-bold text-smts-electric">{item.k}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {item.v}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-smts-medium/40 to-smts-navy"
        >
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                alt="Présidence SMTS Group"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-smts-navy/90 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-14">
              <span className="text-6xl font-serif leading-none text-smts-electric/40">
                “
              </span>
              <blockquote className="text-xl font-medium leading-relaxed text-white md:text-2xl">
                Chez SMTS Group, nous croyons fermement au potentiel économique
                de la Mauritanie. Notre ambition est de créer des ponts solides
                entre les investisseurs internationaux et les opportunités
                locales.
              </blockquote>
              <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-white/50">
                Mot du Président
              </p>
            </div>
          </div>
        </motion.section>

        <section className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white"
          >
            Nos filiales
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {filiales.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-8 transition hover:border-smts-electric/40"
              >
                <f.icon className="text-3xl text-smts-electric" />
                <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
