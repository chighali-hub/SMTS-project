import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const links = [
  { to: '/accueil', label: 'Accueil' },
  { to: '/le-groupe', label: 'Le Groupe' },
  { to: '/investir', label: 'Investir en Mauritanie' },
  { to: '/expertises', label: 'Nos Expertises' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const baseNav =
    'fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b border-transparent';
  const scrolled =
    solid || open
      ? 'border-white/5 bg-smts-navy/95 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      : 'bg-transparent';

  return (
    <header className={`${baseNav} ${scrolled}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Logo />
        <ul className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg overflow-hidden ${
                    isActive ? 'text-white' : 'text-smts-muted hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{l.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-bg"
                        className="absolute inset-0 z-0 bg-white/10 rounded-lg border border-white/5"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden btn-premium px-6 py-2.5 text-sm lg:inline-block group"
          >
            <span className="relative z-10">Nous contacter</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-smts-electric via-smts-accent to-smts-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <button
            type="button"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-white/5 bg-smts-navy/95 backdrop-blur-sm lg:hidden shadow-2xl"
          >
            <ul className="flex flex-col px-4 py-6 space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-smts-electric/20 text-white border border-smts-electric/30'
                          : 'text-smts-muted hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-smts-electric to-smts-accent py-3 text-center text-sm font-bold text-white shadow-xl"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
