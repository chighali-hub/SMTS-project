export default function Spinner({ className = '' }) {
  return (
    <div
      className={`h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-smts-electric ${className}`}
      role="status"
      aria-label="Chargement"
    />
  );
}
