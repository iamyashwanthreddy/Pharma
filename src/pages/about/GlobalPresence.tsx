import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { NextPage, SubNav } from '../../components/ui/Blocks';
import { Clock } from '../../components/ui/Extras';
import { Label, Photo, Todo } from '../../components/ui/primitives';
import { offices } from '../../content/site';
import { aboutNav } from './sections';

const tz: Record<string, string> = { fr: 'Europe/Paris', us: 'America/New_York', in: 'Asia/Kolkata' };

export default function GlobalPresence() {
  useMeta('Global Presence', 'Pharmatoka: headquarters in Rueil-Malmaison, France; Pharmatoka Inc. in Atlanta, US; and operations in India.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="france"
        crumbs={[{ label: 'About Us', to: '/about' }, { label: 'Global Presence' }]}
        idx="C-06"
        title={
          <>
            One company, <span className="serif hl">three chapters.</span>
          </>
        }
        intro="French headquarters, the American home of ellura, and a new chapter in India."
      />
      <SubNav items={aboutNav} label="About section" />

      {/* Route strip with live local times */}
      <section className="section section--tight" data-theme="light" data-draw-trigger>
        <div className="container">
          <div className="route">
            <svg className="route__line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M10 20 H 990" className="route__bg" />
              <path d="M10 20 H 990" className="route__fg" data-draw />
            </svg>
            <ol className="route__nodes" data-stagger>
              {offices.map((o) => (
                <li key={o.id}>
                  <span className="route__dot" aria-hidden="true" />
                  <span className="route__code">{o.code}</span>
                  <span className="t-mono muted">{o.city === o.country ? o.country : o.city}</span>
                  <span className="route__time">
                    <Clock tz={tz[o.id]} /> <span className="t-mono muted">local</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {offices.map((o, i) => (
        <section key={o.id} className="section section--tight" data-theme="light">
          <div className={`container loc ${i % 2 ? 'loc--rev' : ''}`}>
            <div className="loc__media media" data-img>
              <Photo name={o.image} sizes="(max-width: 900px) 100vw, 55vw" />
              <span className="loc__code" aria-hidden="true">
                {o.code}
              </span>
            </div>
            <div className="loc__text">
              <Label idx={`0${i + 1}`} fade>
                {o.role}
              </Label>
              <h2 className="t-h1" data-split>
                {o.city === o.country ? o.country : o.city}
              </h2>
              <p className="t-lead soft" data-fade>
                {o.body}
              </p>
              <dl className="loc__dl" data-stagger>
                <div>
                  <dt className="t-mono">Entity</dt>
                  <dd>{o.entity}</dd>
                </div>
                <div>
                  <dt className="t-mono">Address</dt>
                  <dd>
                    {o.confirmed ? o.lines.map((l) => <span key={l}>{l}</span>) : <Todo>Registered office address</Todo>}
                  </dd>
                </div>
                <div>
                  <dt className="t-mono">Coordinates</dt>
                  <dd>{o.coords}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      ))}

      <NextPage to="/brands" label="Our Brands" image="cranberry-cut" />
    </div>
  );
}
