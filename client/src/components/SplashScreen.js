import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DURATION_MS = 3000;

export default function SplashScreen({ onDone }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(p);
      if (elapsed < DURATION_MS) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/accueil', { replace: true });
      try {
        sessionStorage.setItem('smts_splash_seen', '1');
      } catch {
        /* ignore */
      }
      onDone?.();
    }, DURATION_MS);
    return () => clearTimeout(t);
  }, [navigate, onDone]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-smts-navy px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-smts-navy via-[#0b1a32] to-smts-navy" />
      <motion.div
        className="absolute bottom-[18%] left-1/2 h-px w-[min(90vw,520px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-smts-electric to-transparent opacity-90 shadow-[0_0_40px_rgba(37,99,235,0.9)]"
        initial={{ scaleX: 0.3, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 to-white/5 p-3 shadow-2xl backdrop-blur-sm">
            <img
              src={sessionStorage.getItem('smts_logoImg') || "/smts-logo.png"}
              alt="SMTS Group"
              className="h-full w-full object-contain"
              draggable="false"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            SMTS
          </h1>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-white/30" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
              Group
            </p>
            <span className="h-px w-10 bg-white/30" />
          </div>
        </motion.div>
        <motion.p
          className="mt-8 max-w-xl text-sm font-medium uppercase leading-relaxed tracking-wide text-white/90 md:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Bâtissons l&apos;avenir de vos investissements
        </motion.p>
      </div>
      <div className="absolute bottom-10 left-0 right-0 z-10 px-8">
        <div className="mx-auto h-1 max-w-md overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-smts-electric shadow-[0_0_20px_rgba(37,99,235,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
          />
        </div>
        <motion.p
          className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Chargement...
        </motion.p>
      </div>
    </div>
  );
}
