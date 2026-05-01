import { Link } from 'react-router-dom';

export default function Logo({ className = '', admin = false }) {
  return (
    <Link to={admin ? "/portail-smts" : "/"} className={`group flex items-center gap-3 ${className}`}>
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg transition-transform group-hover:scale-105">
        <img
          src="/smts-logo.png"
          alt="SMTS Group"
          className="h-full w-full object-contain p-1"
          draggable="false"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-smts-light">
          SMTS<span className="text-smts-electric">.</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Group
        </span>
      </div>
    </Link>
  );
}
