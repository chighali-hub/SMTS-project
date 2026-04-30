import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import Logo from './Logo';
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
  const [settings, setSettings] = useState({
    location: 'Nouakchott, Mauritanie',
    email: 'contact@smtsgroup.com',
    phone: '+222 XX XX XX XX'
  });

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data) {
        setSettings(s => ({ ...s, ...res.data }));
      }
    }).catch(e => console.error("Could not fetch settings", e));
  }, []);

  return (
    <footer className="relative mt-20 overflow-hidden bg-smts-dark">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-smts-electric/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3 md:px-6 lg:px-8 relative z-10">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-smts-muted">
            Acteur stratégique en Mauritanie : commerce, logistique et
            facilitation d&apos;investissement pour entreprises et
            investisseurs internationaux.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-smts-electric/50"></span>
            Liens rapides
          </p>
          <ul className="grid grid-cols-2 gap-4 text-sm font-medium text-smts-muted">
            {quick.map((q) => (
              <li key={q.to}>
                <Link
                  to={q.to}
                  className="transition-colors hover:text-smts-electric flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-smts-electric/0 group-hover:bg-smts-electric/100 transition-colors"></span>
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-smts-electric/50"></span>
            Coordonnées
          </p>
          <ul className="space-y-4 text-sm font-medium text-smts-muted">
            <li className="flex items-start gap-3 group cursor-default">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-smts-electric transition-colors group-hover:bg-smts-electric/10">
                <FaMapMarkerAlt />
              </div>
              <span className="mt-1.5">{settings.location}</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-smts-electric transition-colors group-hover:bg-smts-electric/10">
                <FaEnvelope />
              </div>
              <a
                href={`mailto:${settings.email}`}
                className="transition-colors hover:text-white mt-0.5"
              >
                {settings.email}
              </a>
            </li>
            <li className="flex items-center gap-3 group cursor-default">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-smts-electric transition-colors group-hover:bg-smts-electric/10">
                <FaPhone />
              </div>
              <span className="mt-0.5">{settings.phone}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/5 bg-smts-navy/50 py-6 text-center text-xs font-medium tracking-wide text-smts-muted">
        © {new Date().getFullYear()} SMTS Group — Tous droits réservés.
      </div>
    </footer>
  );
}
