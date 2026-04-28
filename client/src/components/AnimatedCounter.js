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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass group rounded-2xl p-6 transition hover:border-smts-electric/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
    >
      {Icon && (
        <div className="mb-4 inline-flex rounded-xl bg-smts-electric/15 p-3 text-smts-electric transition group-hover:bg-smts-electric/25">
          <Icon size={26} />
        </div>
      )}
      <p className="text-3xl font-extrabold text-white md:text-4xl">
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
      <p className="mt-2 text-sm leading-snug text-white/65">{label}</p>
    </motion.div>
  );
}
