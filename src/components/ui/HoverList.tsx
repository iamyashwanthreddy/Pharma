import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { gsap, isTouch, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { src } from '../../content/images';
import { ArrowRight } from './Icon';

export type HoverRow = {
  to: string;
  title: ReactNode;
  kicker?: ReactNode; // left mono column (index/date)
  meta?: ReactNode; // right column
  image?: string;
  aside?: ReactNode; // optional small tag
};

/**
 * Editorial list: large rows with hairlines. On hover-capable devices an
 * image preview follows the cursor and crossfades between rows.
 */
export default function HoverList({ rows, size = 'lg', dark }: { rows: HoverRow[]; size?: 'lg' | 'md'; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const hasImages = rows.some((r) => r.image);

  // Own entrance (self-contained so filtered lists that remount still animate)
  useGsap(() => {
    if (reducedMotion()) return;
    gsap.from('.hlist ul > li', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    });
  }, ref);

  useEffect(() => {
    const el = ref.current;
    const fl = floatRef.current;
    if (!el || !fl || !hasImages || isTouch() || reducedMotion()) return;
    const xTo = gsap.quickTo(fl, 'x', { duration: 0.65, ease: 'power3.out' });
    const yTo = gsap.quickTo(fl, 'y', { duration: 0.65, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, [hasImages]);

  return (
    <div
      ref={ref}
      className={`hlist hlist--${size} ${dark ? 'hlist--dark' : ''} ${active !== null ? 'has-active' : ''}`}
      onPointerLeave={() => setActive(null)}
    >
      <ul>
        {rows.map((r, i) => (
          <li key={r.to + i} className={active === i ? 'is-active' : ''} onPointerEnter={() => setActive(i)}>
            <Link to={r.to} className="hlist__row" onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
              {r.kicker && <span className="hlist__kicker t-mono">{r.kicker}</span>}
              <span className="hlist__title">
                {r.title}
                {r.aside && <span className="hlist__aside">{r.aside}</span>}
              </span>
              {r.meta && <span className="hlist__meta">{r.meta}</span>}
              <span className="hlist__arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {hasImages && (
        <div ref={floatRef} className={`hlist__float ${active !== null ? 'is-on' : ''}`} aria-hidden="true">
          <div className="hlist__float-inner">
            {rows.map((r, i) =>
              r.image ? <img key={i} src={src(r.image, 800)} alt="" className={active === i ? 'is-on' : ''} loading="lazy" /> : null,
            )}
          </div>
        </div>
      )}
    </div>
  );
}
