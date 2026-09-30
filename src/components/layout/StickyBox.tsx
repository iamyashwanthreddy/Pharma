import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, reducedMotion } from '../../lib/gsap';
import { src } from '../../content/images';
import { ArrowRight, Close } from '../ui/Icon';

const HIDDEN_ON = ['/partners', '/contact', '/report-concern'];

/**
 * Floating partner card (reference: "Meet our business team" sticky box).
 * Appears after the hero, scales away when a [data-hide-sticky] block
 * (closing CTA or footer) comes into view.
 */
export default function StickyBox() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const disabled = dismissed || HIDDEN_ON.includes(pathname);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const instant = reducedMotion();
    const show = (on: boolean) =>
      gsap.to(el, {
        scale: on ? 1 : 0,
        opacity: on ? 1 : 0,
        duration: instant ? 0 : 0.45,
        ease: on ? 'back.out(1.6)' : 'power3.in',
        transformOrigin: 'bottom right',
        overwrite: true,
      });
    gsap.set(el, { scale: 0, opacity: 0 });

    // Stateless: visibility is re-derived from every trigger's live state.
    let hero: ScrollTrigger | null = null;
    const hiders: ScrollTrigger[] = [];
    let visible = false;
    const update = () => {
      const want = !!hero?.isActive && !hiders.some((h) => h.isActive);
      if (want !== visible) {
        visible = want;
        show(want);
      }
    };

    const triggers: ScrollTrigger[] = [];
    const t = window.setTimeout(() => {
      hero = ScrollTrigger.create({ start: () => window.innerHeight * 0.9, end: 'max', onToggle: update });
      triggers.push(hero);
      document.querySelectorAll<HTMLElement>('[data-hide-sticky]').forEach((block) => {
        // a pinned section only measures its own height; its pin-spacer spans the full pin
        const parent = block.parentElement;
        const target = parent?.classList.contains('pin-spacer') ? parent : block;
        const h = ScrollTrigger.create({ trigger: target, start: 'top 85%', end: 'bottom 15%', onToggle: update });
        hiders.push(h);
        triggers.push(h);
      });
      update();
    }, 400);
    return () => {
      window.clearTimeout(t);
      triggers.forEach((s) => s.kill());
    };
  }, [pathname, disabled]);

  if (disabled) return null;
  return (
    <div ref={ref} className="sticky-box" role="complementary" aria-label="Partner with Pharmatoka">
      <Link to="/partners" className="sticky-box__link">
        <img src={src('pharmacist', 800)} alt="" loading="lazy" />
        <span className="sticky-box__txt">
          <span className="t-mono">Distributors · Pharmacies · Hospitals</span>
          <strong>Partner with Pharmatoka</strong>
        </span>
        <span className="sticky-box__arrow">
          <ArrowRight />
        </span>
      </Link>
      <button className="sticky-box__close" onClick={() => setDismissed(true)} aria-label="Dismiss">
        <Close size={12} />
      </button>
    </div>
  );
}
