import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

function useCountUp(end, durationMs, enabled) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setV(Math.floor(t * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, durationMs, enabled]);
  return v;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  icon: Icon,
  staticText,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const n = useCountUp(value ?? 0, 1600, inView && staticText == null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', damping: 25 }}
      className="glass-card group rounded-3xl p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {Icon && (
        <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-smts-electric/20 to-smts-accent/20 p-4 text-smts-electric transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-smts-electric/10">
          <Icon size={28} />
        </div>
      )}
      <p className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm ${
        staticText && staticText.length > 8 
          ? 'text-2xl md:text-3xl tracking-tight break-words' 
          : 'text-3xl md:text-4xl lg:text-5xl'
      }`}>
        {staticText != null ? (
          staticText
        ) : (
          <>
            {prefix}
            {n}
            {suffix}
          </>
        )}
      </p>
      <p className="mt-3 text-sm font-semibold tracking-wider text-smts-muted uppercase">{label}</p>
    </motion.div>
  );
}
