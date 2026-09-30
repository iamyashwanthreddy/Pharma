import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Statement } from '../ui/Blocks';
import { ArrowRight, ArrowUpRight } from '../ui/Icon';
import { ellura } from '../../content/site';

const routes = [
  {
    n: '01',
    k: 'Established brand',
    title: 'ellura',
    body: 'Cranberry science for urinary tract health.',
    href: ellura.external,
    external: true,
    cta: ellura.externalLabel,
  },
  {
    n: '02',
    k: 'Emerging brand',
    title: 'Vondberi',
    body: 'A new chapter in botanical wellbeing.',
    to: '/brands#vondberi',
    cta: 'Discover Vondberi',
  },
  {
    n: '03',
    k: 'Healthcare professionals',
    title: 'HCP portal',
    body: 'Scientific information for clinicians and pharmacists.',
    to: '/science/research',
    cta: 'Research & evidence',
    soon: true,
  },
  {
    n: '04',
    k: 'Corporate',
    title: 'Pharmatoka',
    body: 'Our story, leadership and global presence.',
    to: '/about',
    cta: 'About us',
  },
];

/** Intro statement + the four routes the home page must offer (CSV C-01). */
export default function Routes() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className="routes section" data-theme="light">
      <div className="container">
        <div className="routes__head">
          <span className="label" data-fade>
            <span className="label__idx">(01)</span>
            <span>Who we are</span>
          </span>
          <Statement>
            Pharmatoka is a French company specialising in botanical supplements for urogenital health — built on more than twenty years of cranberry research, and now arriving in India.
          </Statement>
        </div>

        <nav className="routes__grid" aria-label="Where would you like to go?" data-stagger>
          {routes.map((r) => {
            const inner = (
              <>
                <span className="routes__top t-mono">
                  <span>{r.n}</span>
                  <span>{r.k}</span>
                </span>
                <span className="routes__title">
                  {r.title}
                  {r.soon && <span className="routes__soon t-mono">Coming soon</span>}
                </span>
                <span className="routes__body">{r.body}</span>
                <span className="routes__cta">
                  {r.cta}
                  {r.external ? <ArrowUpRight /> : <ArrowRight />}
                </span>
              </>
            );
            return r.external ? (
              <a key={r.n} href={r.href} className="routes__item" target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={r.n} to={r.to!} className="routes__item">
                {inner}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
