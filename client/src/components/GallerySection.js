import { motion } from 'framer-motion';

export default function GallerySection({
  id,
  title,
  images,
  headline,
  paragraphs,
  reverse = false,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-smts-electric/10 to-transparent px-6 py-8 md:px-10">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">{title}</h2>
        </div>

        <div
          className={`grid gap-4 p-6 md:p-8 ${
            images.length === 2
              ? 'md:grid-cols-2'
              : images.length >= 4
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/30"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </motion.div>
          ))}
        </div>

        <div
          className={`border-t border-white/10 bg-[#030712]/40 px-6 py-8 md:px-10 md:py-10 ${
            reverse ? '' : ''
          }`}
        >
          {headline && (
            <p className="text-lg font-bold text-smts-electric md:text-xl">{headline}</p>
          )}
          <div className="mt-4 space-y-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-smts-muted font-medium md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
