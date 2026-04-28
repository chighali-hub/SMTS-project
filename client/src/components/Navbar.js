import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
    'fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-transparent';
  const scrolled =
    solid || open
      ? 'border-white/10 bg-smts-navy/95 backdrop-blur-xl shadow-lg'
      : 'bg-transparent';

  return (
    <header className={`${baseNav} ${scrolled}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link to="/accueil" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-inner">
            <img
              src="/smts-logo.png"
              alt="SMTS Group"
              className="h-full w-full object-contain p-1"
              draggable="false"
            />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-white">
              SMTS
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Group
            </span>
          </div>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-smts-electric"
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
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-smts-electric px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-smts-electric/30 transition hover:bg-blue-600 md:inline-block"
          >
            Nous contacter
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg border border-white/15 p-2 text-white lg:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-smts-navy/98 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-sm font-medium ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-smts-electric py-3 text-center text-sm font-semibold text-white"
              >
                Nous contacter
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
