import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

/** En-têtes JWT — à fusionner uniquement sur les requêtes protégées (admin). */
export function authHeaders() {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('smts_admin_token')
      : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function apiBase() {
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
}

function serverOriginFromApiBase() {
  const base = apiBase();
  // ex: http://localhost:5000/api  -> http://localhost:5000
  return base.replace(/\/api\/?$/, '');
}

/** Résout les URLs /uploads/... vers le serveur (port 5000). */
export function resolveAssetUrl(url) {
  if (!url) return '';
  if (typeof url !== 'string') return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/uploads/')) return `${serverOriginFromApiBase()}${url}`;
  return url;
}

export default api;
