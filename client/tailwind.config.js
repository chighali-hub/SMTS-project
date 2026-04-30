/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        smts: {
          dark: '#030712',
          navy: '#08101a',
          medium: '#151e2e',
          electric: '#3b82f6',
          accent: '#8b5cf6',
          gold: '#fbbf24',
          white: '#FFFFFF',
          muted: '#94a3b8',
          light: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-slate':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'premium-gradient': 'linear-gradient(to right, #08101a, #151e2e)',
      },
      transitionTimingFunction: {
        'smts-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        blob: 'blob 10s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -40px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
