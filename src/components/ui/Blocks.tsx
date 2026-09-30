import { useRef, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Btn, Marks, Photo } from './primitives';
import { ArrowRight } from './Icon';

/* ---------- Closing CTA band ---------- */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
  image = 'berry-branch',
}: {
  title: ReactNode;
  body?: ReactNode;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
  image?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGsap(() => {
    if (reducedMotion()) return;
    gsap.fromTo(
      '.cta__media',
      { clipPath: 'inset(18% 22% 18% 22% round 2rem)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0rem)',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 20%', scrub: true },
      },
    );
    gsap.fromTo('.cta__media img', { scale: 1.3 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, ref);

  return (
    <section ref={ref} className="cta" data-theme="dark" data-hide-sticky>
      <div className="cta__slab slab slab--deep">
        <div className="cta__media" aria-hidden="true">
          <Photo name={image} sizes="100vw" alt="" />
        </div>
        <Marks />
        <div className="cta__inner container">
          <h2 className="t-h1 cta__title" data-split>
            {title}
          </h2>
          {body && (
            <p className="t-lead soft cta__body" data-fade>
              {body}
            </p>
          )}
          <div className="cta__actions" data-fade>
            <Btn to={primary.to} variant="light">
              {primary.label}
            </Btn>
            {secondary && (
              <Btn to={secondary.to} variant="ghost">
                {secondary.label}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Next page navigator ---------- */
export function NextPage({ to, label, kicker = 'Next', image }: { to: string; label: string; kicker?: string; image: string }) {
  return (
    <section className="next container" data-theme="light">
      <Link to={to} className="next__link" data-dest={label}>
        <span className="t-mono next__kicker">{kicker}</span>
        <span className="next__title t-display">
          {label}
          <span className="next__arrow" aria-hidden="true">
            <ArrowRight />
          </span>
        </span>
        <span className="next__img" aria-hidden="true">
          <Photo name={image} sizes="30vw" alt="" />
        </span>
      </Link>
    </section>
  );
}

/* ---------- Section sub navigation (siblings) ---------- */
export function SubNav({ items, label }: { items: { label: string; to: string }[]; label: string }) {
  return (
    <nav className="subnav container" aria-label={label}>
      <ul>
        {items.map((it) => (
          <li key={it.to}>
            <NavLink to={it.to} end className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Section heading (label + title + optional intro) ---------- */
export function Heading({
  idx,
  label,
  title,
  intro,
  align = 'split',
  className = '',
}: {
  idx?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'split' | 'stack' | 'center';
  className?: string;
}) {
  return (
    <header className={`heading heading--${align} ${className}`}>
      <span className="label" data-fade>
        {idx && <span className="label__idx">({idx})</span>}
        <span>{label}</span>
      </span>
      <h2 className="t-h2 heading__title" data-split>
        {title}
      </h2>
      {intro && (
        <div className="heading__intro t-lead soft" data-fade>
          {intro}
        </div>
      )}
    </header>
  );
}

/* ---------- Big statement paragraph with scroll-scrubbed word highlight ---------- */
export function Statement({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGsap(() => {
    const words = ref.current?.querySelectorAll('.stw');
    if (!words || reducedMotion()) return;
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  }, ref);
  return (
    <p ref={ref} className={`statement t-h2 ${className}`}>
      {children.split(' ').map((w, i) => (
        <span key={i} className="stw">
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
