import { motion } from 'framer-motion';

export default function BackgroundGlow({ className = '' }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden bg-smts-dark ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-premium-gradient opacity-40 " />
      <div className="absolute inset-0 bg-grid-slate opacity-20" />
      <motion.div
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-smts-electric/20 blur-3xl animate-blob "
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-smts-accent/20 blur-3xl animate-blob animation-delay-2000 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-smts-medium/30 blur-3xl animate-blob animation-delay-4000 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030712_80%)] opacity-80" />
    </div>
  );
}
