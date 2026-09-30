import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import StickyBox from './StickyBox';
import { gsap, ScrollTrigger, reducedMotion, isTouch } from '../../lib/gsap';
import { initSmoothScroll, scrollToTop, scrollToEl } from '../../lib/smooth';
import { setLoaderActive } from '../../lib/intro';
import { Wordmark } from '../ui/primitives';

const SESSION_KEY = 'ptk-intro-seen';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const busy = useRef(false);
  const [dest, setDest] = useState('');

  // Decide during render (before child effects run) whether the loader plays.
  const [showLoader, setShowLoader] = useState(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* storage unavailable */
    }
    const show = !seen && !reducedMotion();
    setLoaderActive(show);
    if (!reducedMotion()) document.documentElement.classList.add('motion');
    return show;
  });

  /* Smooth scroll */
  useEffect(() => initSmoothScroll(), []);

  /* Page transitions: intercept internal link clicks, cover, navigate, reveal */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) {
        e.preventDefault();
        if (url.hash) {
          const el = document.querySelector<HTMLElement>(url.hash);
          if (el) scrollToEl(el);
        } else scrollToTop(false);
        return;
      }
      e.preventDefault();
      if (busy.current) return;
      const to = url.pathname + url.search + url.hash;
      if (reducedMotion() || !curtain.current) {
        navigate(to);
        return;
      }
      busy.current = true;
      setDest(a.dataset.dest || a.textContent?.trim().slice(0, 48) || '');
      gsap
        .timeline({
          onComplete: () => {
            covering.current = true;
            navigate(to);
          },
        })
        .set(curtain.current, { display: 'flex' })
        .fromTo(
          curtain.current,
          { yPercent: 100, borderTopLeftRadius: '50% 14vh', borderTopRightRadius: '50% 14vh' },
          { yPercent: 0, borderTopLeftRadius: '0% 0vh', borderTopRightRadius: '0% 0vh', duration: 0.75, ease: 'power4.inOut' },
        )
        .fromTo('.curtain__inner', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.35);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  /* On route change: reset scroll, reveal the curtain, refresh triggers */
  useLayoutEffect(() => {
    scrollToTop(true);
    const hash = location.hash;
    if (covering.current && curtain.current) {
      covering.current = false;
      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
            gsap.set(curtain.current, { display: 'none' });
          },
        })
        .to('.curtain__inner', { opacity: 0, y: -24, duration: 0.3, ease: 'power2.in' }, 0.05)
        .to(
          curtain.current,
          { yPercent: -100, borderBottomLeftRadius: '50% 14vh', borderBottomRightRadius: '50% 14vh', duration: 0.85, ease: 'power4.inOut' },
          0.1,
        )
        .set(curtain.current, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 });
    } else {
      busy.current = false;
    }
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const el = document.querySelector<HTMLElement>(hash);
        if (el) scrollToEl(el);
      }
    }, hash ? 900 : 250);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  /* Magnetic buttons (hover devices only) */
  useEffect(() => {
    if (reducedMotion() || isTouch()) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
      gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out', overwrite: true });
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]');
      if (!el || el.contains(e.relatedTarget as Node)) return;
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)', overwrite: true });
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {showLoader && (
        <Loader
          onDone={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, '1');
            } catch {
              /* ignore */
            }
            setShowLoader(false);
            setLoaderActive(false);
          }}
        />
      )}
      <Header />
      <main id="main" tabIndex={-1}>
        <div key={location.pathname} className="route">
          <Outlet />
        </div>
      </main>
      <Footer />
      <StickyBox />
      <div ref={curtain} className="curtain" aria-hidden="true">
        <div className="curtain__inner">
          <Wordmark tone="white" />
          {dest && <span className="t-mono">{dest}</span>}
        </div>
      </div>
    </>
  );
}
