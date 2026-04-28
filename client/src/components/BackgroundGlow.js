import { motion } from 'framer-motion';

export default function BackgroundGlow({ className = '' }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-smts-electric/20 blur-[120px]"
        animate={{ x: [0, 40, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-smts-medium/40 blur-[100px]"
        animate={{ x: [0, -30, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.12),_transparent_55%)]" />
    </div>
  );
}
