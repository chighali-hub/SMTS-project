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
    title: 'Déclarant en douane',
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
        description="Représentation commerciale, médiation, logistique Nouakchott, déclarant en douane et denrées alimentaires — SMTS Group, transport international Mauritanie."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-premium-gradient opacity-40 " />
        <div className="absolute inset-[0_auto_auto_auto] w-[800px] h-[800px] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15),_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
             <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
             Savoir-faire
          </div>
          <h1 className="mt-3 text-5xl font-extrabold md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-md">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent">expertises</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-smts-muted font-medium">
            Des équipes dédiées pour structurer vos opérations en Mauritanie,
            de la représentation à la logistique opérationnelle.
          </p>
        </motion.div>

        <div className="mt-32 space-y-24">
          {blocks.map((b, i) => (
            <motion.section
              key={b.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, type: "spring", damping: 25 }}
              className={`flex flex-col gap-10 md:gap-16 md:flex-row md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex flex-1 justify-center md:justify-end lg:justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-smts-electric to-smts-accent rounded-[3rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#151e2e]/90 to-[#030712] text-6xl text-smts-electric shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                    <b.icon className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  </div>
                </div>
              </div>
              <div className="flex-1 glass-card p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-extrabold text-white group-hover:text-smts-electric transition-colors duration-300 drop-shadow-md">{b.title}</h2>
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-smts-muted font-medium">{b.text}</p>
                  {b.list.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {b.list.map((li) => (
                        <li key={li} className="flex items-center gap-3 text-[15px] font-semibold text-white/80 group-hover:text-white transition-colors">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-smts-electric/20 text-smts-electric shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                            <span className="h-2 w-2 rounded-full bg-smts-electric" />
                          </span>
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </>
  );
}
