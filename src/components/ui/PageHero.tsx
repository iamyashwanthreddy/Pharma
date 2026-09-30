import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Marks, Photo } from './primitives';
import { Sprig } from './Botanical';

type Crumb = { label: string; to?: string };

type Props = {
  crumbs: Crumb[];
  idx: string; // e.g. "C-03" page id
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  caption?: string;
  variant?: 'split' | 'full' | 'type';
  meta?: { k: string; v: ReactNode }[];
  children?: ReactNode;
};

/**
 * Inner-page hero. A framed aubergine slab that recedes (scales + rounds)
 * as you scroll into the page, with a masked title intro.
 */
export default function PageHero({ crumbs, idx, title, intro, image, caption, variant = 'split', meta, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (reducedMotion()) return;
    gsap.to('.phero__slab', {
      scale: 0.965,
      yPercent: 4,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    if (variant === 'full') {
      gsap.fromTo('.phero__bg img', { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
    }
  }, ref);

  return (
    <section ref={ref} className={`phero phero--${variant}`} data-theme="dark">
      <div className="phero__slab slab slab--dark grain">
        <Marks />
        {variant === 'full' && image && (
          <div className="phero__bg" aria-hidden="true">
            <Photo name={image} eager sizes="100vw" alt="" />
          </div>
        )}
        {variant === 'type' && <Sprig className="phero__sprig" />}

        <div className="phero__inner">
          <div className="phero__top" data-fade="load">
            <nav aria-label="Breadcrumb" className="phero__crumbs t-mono">
              <Link to="/">Home</Link>
              {crumbs.map((c) => (
                <span key={c.label}>
                  <i aria-hidden="true">/</i>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </span>
              ))}
            </nav>
            <span className="t-mono phero__idx">{idx}</span>
          </div>

          <div className="phero__body">
            <div className="phero__text">
              <h1 className="t-display phero__title" data-split="load">
                {title}
              </h1>
              {intro && (
                <div className="phero__intro t-lead soft" data-fade="load" data-delay="0.15">
                  {intro}
                </div>
              )}
              {children && (
                <div className="phero__cta" data-fade="load" data-delay="0.3">
                  {children}
                </div>
              )}
            </div>

            {variant === 'split' && image && (
              <figure className="phero__figure">
                <div className="phero__media media" data-img="load">
                  <Photo name={image} eager sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                {caption && (
                  <figcaption className="fig t-mono" data-fade="load" data-delay="0.4">
                    <span>Fig. {idx.replace(/\D/g, '')}</span>
                    <span>{caption}</span>
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          {meta && (
            <dl className="phero__meta" data-fade="load" data-delay="0.45">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="t-mono">{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
