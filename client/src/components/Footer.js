import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();

  const quick = [
    { to: '/accueil', label: t('nav.accueil') },
    { to: '/le-groupe', label: t('nav.groupe') },
    { to: '/investir', label: t('nav.investir') },
    { to: '/expertises', label: t('nav.expertises') },
    { to: '/galerie', label: t('nav.galerie') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const settings = {
    location: t('footer.loc'),
    email: 'info@smts-group.com',
    phone: '+222 22 94 88 88'
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-smts-dark">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-smts-electric/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3 md:px-6 lg:px-8 relative z-10">
        <div>
          <Logo />
            <p className="mt-6 max-w-sm text-[15px] font-medium leading-relaxed text-smts-muted group-hover/logo:text-white/70 transition-colors">
              {t('footer.intro')}
            </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-smts-electric/50"></span>
            {t('footer.quick')}
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
            {t('footer.coord')}
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
            <li className="flex items-center gap-3 group cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] transition-colors group-hover:bg-[#25D366]/20">
                <FaPhone />
              </div>
              <a
                href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Bonjour, je vous contacte depuis le site SMTS Group.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 transition-colors hover:text-[#25D366]"
              >
                {settings.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/5 bg-smts-navy/50 py-6 text-center text-xs font-medium tracking-wide text-smts-muted">
          <p className="text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} SMTS Group — {t('footer.rights')}
          </p>
      </div>
    </footer>
  );
}
