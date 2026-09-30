import { useEffect } from 'react';

const BASE = 'Pharmatoka';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-page title, description and Open Graph tags. */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    const full = title === BASE ? title : `${title} — ${BASE}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
  }, [title, description]);
}
