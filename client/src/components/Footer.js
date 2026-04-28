import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const quick = [
  { to: '/accueil', label: 'Accueil' },
  { to: '/le-groupe', label: 'Le Groupe' },
  { to: '/investir', label: 'Investir en Mauritanie' },
  { to: '/expertises', label: 'Nos Expertises' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050d18]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/5">
              <img
                src="/smts-logo.png"
                alt="SMTS Group"
                className="h-full w-full object-contain p-1"
                draggable="false"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">SMTS Group</p>
              <p className="text-xs text-white/50">
                Bâtissons l&apos;avenir de vos investissements
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Acteur stratégique en Mauritanie : commerce, logistique et
            facilitation d&apos;investissement pour entreprises et
            investisseurs internationaux.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-smts-electric">
            Liens rapides
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70">
            {quick.map((q) => (
              <li key={q.to}>
                <Link
                  to={q.to}
                  className="hover:text-white"
                >
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-smts-electric">
            Coordonnées
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-smts-electric" />
              <span>Nouakchott, Mauritanie</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="shrink-0 text-smts-electric" />
              <a
                href="mailto:contact@smtsgroup.com"
                className="hover:text-white"
              >
                contact@smtsgroup.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="shrink-0 text-smts-electric" />
              <span>+222 XX XX XX XX</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-white/40">
        © 2024 SMTS Group — Tous droits réservés.
      </div>
    </footer>
  );
}
