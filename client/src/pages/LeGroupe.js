import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaLeaf, FaChartLine, FaFish } from 'react-icons/fa';
import Seo from '../components/Seo';
import api from '../api/client';

const DEFAULT_IMG = "https://scontent.fsvq4-1.fna.fbcdn.net/v/t39.30808-6/686196217_2028219524747649_207232292685776683_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeF26ApKKtwStmtZIA6uqzm5toKXUx8cT-e2gpdTHxxP59ZWejSBr0THgmou4kvZhpt8ptKoTY6Qi4_Suyx9zHrJ&_nc_ohc=NmaCoZMZkmQQ7kNvwF9bKvd&_nc_oc=Adp31BFV8jeMPMm3XqQ8Ub6AWnOTjI0zrJXdXWyumBfZvbeO5A1L5pJyPGHYlHmE708&_nc_zt=23&_nc_ht=scontent.fsvq4-1.fna&_nc_gid=rkFh59czFyWpW-OvwfuNJQ&_nc_ss=7b2a8&oh=00_Af5RU0Gb58fZDBhqawWQf8mhRpXxfKE0abKVaOlH5fr19A&oe=69FE33D5";

const filiales = [
  {
    title: 'Logistique & Transport',
    icon: FaTruck,
    text: 'Solutions complètes de transport, stockage, distribution et consignation des navires de commerce.',
    image: '/Logistique&Transport.jpeg.jpeg',
  },
  {
    title: 'Import/Export',
    icon: FaLeaf,
    text: 'Import/export et commercialisation de produits alimentaires (sucre, lait...).',
    image: '/ImportExport.jpeg',
  },
  {
    title: 'Solutions Business',
    icon: FaChartLine,
    text: 'Accompagnement stratégique, représentation commerciale et conseil.',
    image: '/smts-logo.png',
  },
  {
    title: 'Poissons frais',
    icon: FaFish,
    text: 'Exportation de poissons frais.',
    image: '/Poissons frais.jpeg',
  },
];

export default function LeGroupe() {
  const [img, setImg] = useState(DEFAULT_IMG);
  const [fImgs, setFimgs] = useState({ log: '/Logistique&Transport.jpeg.jpeg', imp: '/ImportExport.jpeg', sol: '/smts-logo.png', poi: '/Poissons frais.jpeg' });

  useEffect(() => {
    api.get('/settings').then((res) => {
      if (res.data?.groupeImg) setImg(res.data.groupeImg);
      if (res.data) {
        setFimgs({
          log: res.data.logistiqueImg || '/Logistique&Transport.jpeg.jpeg',
          imp: res.data.importExportImg || '/ImportExport.jpeg',
          sol: res.data.solutionsImg || '/smts-logo.png',
          poi: res.data.poissonsImg || '/Poissons frais.jpeg'
        });
      }
    }).catch(() => { });
  }, []);

  const dynamicFiliales = filiales.map(f => {
    let finalImg = f.image;
    if (f.title === 'Logistique & Transport') finalImg = fImgs.log;
    if (f.title === 'Import/Export') finalImg = fImgs.imp;
    if (f.title === 'Solutions Business') finalImg = fImgs.sol;
    if (f.title === 'Poissons frais') finalImg = fImgs.poi;
    return { ...f, image: finalImg };
  });

  return (
    <>
      <Seo
        title="Le Groupe"
        description="SMTS Group : entreprise mauritanienne de référence en investissement en Mauritanie, logistique Nouakchott et facilitation d'affaires."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-premium-gradient opacity-40 " />
        <div className="absolute inset-0 bg-grid-slate opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
            À propos de SMTS Group
          </div>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl drop-shadow-md">
            Une entreprise mauritanienne de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              référence
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl font-medium leading-relaxed text-smts-muted">
            SMTS Group est une entreprise mauritanienne de référence opérant dans
            plusieurs secteurs stratégiques. Notre mission est de faciliter les
            opérations commerciales et d&apos;investissement en offrant des
            solutions fiables, rapides et adaptées au marché local.
          </p>
        </motion.section>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
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
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-[2rem] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-2 group"
            >
              <h2 className="text-2xl font-bold text-smts-electric group-hover:text-white transition-colors">{item.k}</h2>
              <div className="mt-4 w-12 h-1 bg-gradient-to-r from-smts-electric to-smts-accent rounded-full transition-all group-hover:w-full" />
              <p className="mt-6 text-base font-medium leading-relaxed text-white/75 group-hover:text-white transition-colors">
                {item.v}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-32 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#151e2e]/80 to-[#030712]/90 shadow-2xl relative"
        >
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative min-h-[400px] md:min-h-[auto] group">
              <img
                src={img}
                alt="Présidence SMTS Group"
                className="absolute inset-0 h-full w-full object-cover opacity-80 filter grayscale-[30%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/50 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-16 relative z-10">
              <span className="absolute top-8 left-8 text-8xl font-serif leading-none text-smts-electric/20 select-none">
                “
              </span>
              <blockquote className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white tracking-wide">
                Chez SMTS Group, nous croyons fermement au potentiel économique
                de la Mauritanie. Notre ambition est de créer des ponts solides
                entre les investisseurs internationaux et les opportunités
                locales.
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-smts-electric/50" />
                <p className="text-sm font-bold uppercase tracking-widest text-smts-electric">
                  Mot du Président
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-smts-electric mb-4">
              Nos piliers économiques
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Nos filiales
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {dynamicFiliales.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -6 }}
                className="glass-card group rounded-3xl p-8 transition-all hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden relative flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-smts-electric/20 to-smts-accent/20 text-smts-electric shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                      <f.icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-smts-electric transition-colors">{f.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-smts-muted">
                      {f.text}
                    </p>
                  </div>
                  {f.image && (
                    <div className="mt-8 -mx-8 -mb-8 overflow-hidden rounded-b-3xl bg-white flex items-center justify-center p-6">
                      <img src={f.image} alt={f.title} className="w-full h-40 object-contain transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
