import { useEffect } from 'react';

const defaultKeywords =
  "Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie";

export default function Seo({ title, description, keywords }) {
  useEffect(() => {
    document.title = title ? `${title} | SMTS Group` : 'SMTS Group';
    const desc = description || '';
    const kw = keywords || defaultKeywords;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', kw);
  }, [title, description, keywords]);
  return null;
}
