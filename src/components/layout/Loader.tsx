import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { LOADER_DURATION } from '../../lib/intro';
import { stopScroll } from '../../lib/smooth';
import { Wordmark } from '../ui/primitives';

/**
 * First-visit loader: a specimen counter runs 000 → 100 while the
 * wordmark resolves, then the aubergine panel lifts away like a curtain.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    stopScroll(true);
    const counter = el.querySelector<HTMLElement>('.loader__count');
    const n = { v: 0 };
    const count = LOADER_DURATION - 0.9;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          stopScroll(false);
          setGone(true);
          onDone();
        },
      });
      tl.from('.loader__wm', { opacity: 0, y: 24, filter: 'blur(8px)', duration: 1, ease: 'power3.out' }, 0.1)
        .from('.loader__meta', { opacity: 0, duration: 0.6 }, 0.2)
        .to(n, {
          v: 100,
          duration: count,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(n.v)).padStart(3, '0');
          },
        }, 0)
        .fromTo('.loader__bar i', { scaleX: 0 }, { scaleX: 1, duration: count, ease: 'power2.inOut' }, 0)
        .to('.loader__inner', { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }, count - 0.05)
        .to(el, {
          yPercent: -100,
          borderBottomLeftRadius: '50% 12vh',
          borderBottomRightRadius: '50% 12vh',
          duration: 0.95,
          ease: 'power4.inOut',
        }, count + 0.1);
    }, el);
    return () => {
      ctx.revert();
      stopScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <div className="loader__inner">
        <Wordmark tone="white" className="loader__wm" />
        <div className="loader__meta">
          <span className="t-mono">Botanical science — since 2004</span>
          <span className="loader__count t-mono">000</span>
        </div>
        <div className="loader__bar">
          <i />
        </div>
      </div>
    </div>
  );
}
