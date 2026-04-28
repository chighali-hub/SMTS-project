import { motion } from 'framer-motion';
import {
  FaBriefcase,
  FaBalanceScale,
  FaTruck,
  FaFileAlt,
  FaCarrot,
} from 'react-icons/fa';
import Seo from '../components/Seo';

const blocks = [
  {
    title: 'Représentation commerciale',
    icon: FaBriefcase,
    text: 'Nous représentons vos intérêts en Mauritanie et développons votre réseau local.',
    list: [],
  },
  {
    title: "Médiation d'affaires",
    icon: FaBalanceScale,
    text: "Facilitation des négociations et sécurisation des partenariats.",
    list: [],
  },
  {
    title: 'Logistique & Transport',
    icon: FaTruck,
    text: 'Chaîne logistique bout en bout pour sécuriser vos flux.',
    list: ['Fret international', 'Gestion des stocks', 'Distribution locale'],
  },
  {
    title: 'Courtage en douane',
    icon: FaFileAlt,
    text: 'Gestion complète des formalités douanières pour un dédouanement rapide et sécurisé.',
    list: [],
  },
  {
    title: 'Commerce de denrées alimentaires',
    icon: FaCarrot,
    text: 'Importation et distribution de produits alimentaires essentiels.',
    list: ['Légumes', 'Huiles', 'Sucre'],
  },
];

export default function Expertises() {
  return (
    <>
      <Seo
        title="Nos expertises"
        description="Représentation commerciale, médiation, logistique Nouakchott, courtage en douane et denrées alimentaires — SMTS Group, transport international Mauritanie."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
            Savoir-faire
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Nos expertises
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Des équipes dédiées pour structurer vos opérations en Mauritanie,
            de la représentation à la logistique opérationnelle.
          </p>
        </motion.div>

        <div className="mt-20 space-y-20">
          {blocks.map((b, i) => (
            <motion.section
              key={b.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className={`flex flex-col gap-8 md:flex-row md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex flex-1 justify-center md:justify-start">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-smts-electric/15 text-5xl text-smts-electric shadow-inner">
                  <b.icon />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{b.title}</h2>
                <p className="mt-4 leading-relaxed text-white/70">{b.text}</p>
                {b.list.length > 0 && (
                  <ul className="mt-6 space-y-2 text-sm text-white/80">
                    {b.list.map((li) => (
                      <li key={li} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-smts-electric" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </>
  );
}
